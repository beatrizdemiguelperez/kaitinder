const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const path = require('path');
const fs = require('fs');

const log = require('./log');

const openapiPath = path.resolve(__dirname, '../../api', 'openapi.yml');

const addSwaggerRoute = async (app, swaggerPath) => {
  try {
    const swaggerDocument = YAML.safeLoad(fs.readFileSync(openapiPath));
    app.use(swaggerPath, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (e) {
    log.error(`Swagger failed with error: ${e}`);
    throw e;
  }
};

module.exports = {
  addSwaggerRoute,
};
