const mongoose = require('mongoose');
const config = require('../../config');
const log = require('../../libs/log');

const { MONGO_HOST, MONGO_DB_NAME } = process.env;

const mongoUri = `${MONGO_HOST}/${MONGO_DB_NAME}`;

const connect = async () => {
  try {
    log.info(`Connecting to ${mongoUri}`);
    mongoose.connect(mongoUri, config.mongo);
  } catch (e) {
    log.error(`Error trying to connect Mongo database [${mongoUri}]: ${e}`, 'error');
    throw e;
  }
};

module.exports = {
  connect,
};
