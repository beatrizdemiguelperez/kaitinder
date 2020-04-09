/* eslint-disable consistent-return */
const mapError = (error) => ({
  field: error.context.key,
  type: error.type,
  message: error.message,
});

const validate = async (schema, value, options = { abortEarly: false }) => {
  try {
    await schema.validateAsync(value, options);
  } catch (e) {
    const errors = e.details || [];
    return errors.map(mapError);
  }
};

module.exports = validate;
