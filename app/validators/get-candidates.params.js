const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  offset: Joi.string().regex(/^\d+$/),
  limit: Joi.string().regex(/^\d+$/),
});

module.exports = schema;
