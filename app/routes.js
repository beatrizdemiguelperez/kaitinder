const { Router } = require('express');
const mongoose = require('mongoose');
const getCandidatesValidator = require('./validators/get-candidates.params');
const validator = require('./libs/validator');
const { AppError, HttpErrorBuilder } = require('./errors');

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: false },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: false },
      long: { type: Number, required: false },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const defaultProjection = {
  name: 1,
  photo: 1,
  gender: 1,
  city: 1,
  coordinates: 1,
  birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
};

const Candidate = mongoose.model('Candidate', schema);

const validationMiddleware = async (req, res, next) => {
  const errors = await validator(getCandidatesValidator, req.query);
  if (errors) {
    next(new AppError(HttpErrorBuilder.BAD_REQUEST(1), { errors }));
  }
  next();
};
const router = new Router();

router.get(
  '/candidates',
  validationMiddleware,
  async (req, res, next) => {
    const { offset = 0, limit = 0 } = req.query;
    const aggregation = [{ $sort: { createdAt: 1 } }, { $skip: parseInt(offset) }];
    const $limit = parseInt(limit);

    if ($limit !== 0) {
      aggregation.push({ $limit });
    }

    aggregation.push({
      $project: defaultProjection,
    });
    const data = await Candidate.aggregate(aggregation).exec();
    res.send({ data });
    next();
  },
);

module.exports = router;
module.exports._CandidateModel = Candidate;
