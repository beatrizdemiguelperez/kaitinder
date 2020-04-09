const { Router } = require('express');
const middlewares = require('./middlewares');
const candidatesController = require('./controllers/candidates');
const domain = require('../domain');

const router = new Router();

router.get('/candidates', middlewares.validationMiddleware, candidatesController.getCandidates(domain.getCandidates));

module.exports = router;
