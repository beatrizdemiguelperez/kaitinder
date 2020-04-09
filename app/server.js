const express = require('express');

const swagger = require('./libs/swagger');
const log = require('./libs/log');

const port = process.env.PORT;

let app;

const init = () => {
  app = express();

  app.get('/candidates', (req, res) => {
    // @TODO: challenge-1 implementa la logica del endpoint
  });

  if (process.env.NODE_ENV === 'development') {
    swagger.addSwaggerRoute(app, '/api-docs');
  }

  return app;
};

const listen = () => {
  app.listen(port, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
};

module.exports = {
  listen,
  init,
};
