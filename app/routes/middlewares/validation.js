const validator = require('../../libs/validator');
const { AppError, HttpErrorBuilder } = require('../../errors');

const validationMiddleware = (validationSchema, path) => async (req, res, next) => {
  const errors = await validator(validationSchema, req[path]);
  if (errors) {
    next(new AppError(HttpErrorBuilder.BAD_REQUEST(1), { errors }));
  }
  next();
};

module.exports = validationMiddleware;
