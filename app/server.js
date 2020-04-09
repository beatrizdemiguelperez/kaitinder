const express = require('express');

const router = require('./routes');
const swagger = require('./libs/swagger');
const log = require('./libs/log');
const { AppError, HttpErrorBuilder } = require('./errors');

const port = process.env.PORT;

let app;

const errorHandler = (err, req, res, next) => {
  const error = err instanceof AppError ? err : new AppError(HttpErrorBuilder.SERVICE_UNAVAILABLE());

  log.error(err.stack);

  res.status(error.status).send({
    status: error.status,
    message: error.message,
    code: error.code,
    data: error.data,
  });

  next();
};

const init = () => {
  app = express();

  app.use('/', router);

  if (process.env.NODE_ENV === 'development') {
    swagger.addSwaggerRoute(app, '/api-docs');
  }

  app.use(errorHandler);

  return app;
};

const listen = () => {
  app.listen(port, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
};

module.exports = {
  listen,
  init,
};
