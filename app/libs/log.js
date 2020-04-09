const bunyan = require('bunyan');
const bformat = require('bunyan-format');

const logger = (config) => bunyan.createLogger(config);

const config = {
  name: 'Kaitinder',
  stream: bformat({ outputMode: 'short' }),
  level: process.env.LOG_LEVEL,
  serializers: bunyan.stdSerializers,
};

module.exports = logger(config);
