const express = require('express');
const mongoose = require('mongoose');

const swagger = require('./libs/swagger');
const log = require('./libs/log');

const port = process.env.PORT;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

const mongoConfig = {
  user,
  pass,
  socketTimeoutMS: 0,
  keepAlive: true,
  poolSize: 30,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const initServer = () => {
  const app = express();

  app.get('/candidates', (req, res) => {
    // @TODO: challenge-1 implementa la logica del endpoint
  });

  if (process.env.NODE_ENV === 'development') {
    swagger.addSwaggerRoute(app, '/api-docs');
  }

  app.listen(port, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
};

const { MONGO_HOST, MONGO_DB_NAME } = process.env;
const mongoUri = `${MONGO_HOST}/${MONGO_DB_NAME}`;

const mongoConnect = async () => {
  try {
    log.info(`Connecting to ${mongoUri}`);
    // @TODO: challenge-1 implementa la conexión con mongo
  } catch (e) {
    log.error(`Error trying to connect Mongo database [${mongoUri}]: ${e}`, 'error');
    throw e;
  }
};

mongoConnect().then(() => {
  initServer();
});
