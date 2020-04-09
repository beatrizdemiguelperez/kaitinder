const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  name: Joi.string(),
  photo: Joi.string(),
  birthDate: Joi.date(),
  gender: Joi.string().valid('M', 'F'),
  city: Joi.string(),
});

module.exports = schema;
