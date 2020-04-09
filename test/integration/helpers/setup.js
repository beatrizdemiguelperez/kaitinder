const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoose = require('mongoose');

const server = require('../../../app/server');

async function initMongoServer() {
  const mongoMemoryServer = new MongoMemoryServer({
    binary: {
      version: '4.2.2',
    },
    debug: false,
    autoStart: false,
  });
  await mongoMemoryServer.start();

  const url = await mongoMemoryServer.getUri();
  const opts = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.Promise = global.Promise;
  await mongoose.connect(url, opts);

  return { mongoMemoryServer, mongoDriver: mongoose.connection };
}

const setup = async () => {
  const mongoServer = await initMongoServer();
  const expressServer = { app: server.init() };
  const env = { ...expressServer, ...mongoServer };
  return env;
};

module.exports = setup;
