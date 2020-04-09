const express = require('express');

const swagger = require('./libs/swagger');
const log = require('./libs/log');

const port = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello KaiTinder!');
});

if (process.env.NODE_ENV === 'development') {
  swagger.addSwaggerRoute(app, '/api-docs');
}

app.listen(port, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
