const express = require('express');
const bodyparser = require('body-parser');

const router = require('./routes');
const swagger = require('./libs/swagger');
const log = require('./libs/log');
const middlewares = require('./routes/middlewares');

const port = process.env.PORT;

let app;

const init = () => {
  app = express();

  app.use(bodyparser.json());

  app.use('/', router);

  if (process.env.NODE_ENV === 'development') {
    swagger.addSwaggerRoute(app, '/api-docs');
  }

  app.use(middlewares.errorHandler);

  return app;
};

const listen = () => {
  app.listen(port, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
};

module.exports = {
  listen,
  init,
};
