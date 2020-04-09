const log = require('./libs/log');

const mongo = require('./repository/mongo/connection');
const server = require('./server');

const killProcess = (err) => {
  log.error(`Process ${process.pid} fail`, err);
  process.exit(0);
};

const start = async () => {
  try {
    await mongo.connect();
    server.init();
    server.listen();
  } catch (e) {
    log.error(e);
    process.exit(-1);
  }
};

start();

process.on('SIGTERM', killProcess);
process.on('SIGINT', killProcess);
process.on('uncaughtException', killProcess);
