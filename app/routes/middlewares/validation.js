const validator = require('../../libs/validator');
const { AppError, HttpErrorBuilder } = require('../../errors');
const getCandidatesValidator = require('../../validators/get-candidates.params');

const validationMiddleware = async (req, res, next) => {
  const errors = await validator(getCandidatesValidator, req.query);
  if (errors) {
    next(new AppError(HttpErrorBuilder.BAD_REQUEST(1), { errors }));
  }
  next();
};

module.exports = validationMiddleware;
