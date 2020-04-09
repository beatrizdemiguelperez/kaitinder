const { Router } = require('express');
const middlewares = require('./middlewares');
const candidatesController = require('./controllers/candidates');
const domain = require('../domain');
const validationSchemas = require('../validators');

const router = new Router();

router.get(
  '/candidates',
  middlewares.validationMiddleware(validationSchemas.getParams, 'query'),
  candidatesController.getCandidates(domain.getCandidates),
);

router.post(
  '/candidates',
  middlewares.validationMiddleware(validationSchemas.postBody, 'body'),
  candidatesController.create(domain.create),
);

module.exports = router;
