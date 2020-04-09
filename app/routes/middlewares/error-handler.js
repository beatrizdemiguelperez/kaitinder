const log = require('../../libs/log');
const { AppError, HttpErrorBuilder } = require('../../errors');

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

module.exports = errorHandler;
