const Candidate = require('./models/candidate');

const defaultProjection = {
  name: 1,
  photo: 1,
  gender: 1,
  city: 1,
  coordinates: 1,
  birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
};

const get = async ({ offset, limit }) => {
  const aggregation = [{ $sort: { createdAt: 1 } }, { $skip: parseInt(offset) }];
  const $limit = parseInt(limit);

  if ($limit !== 0) {
    aggregation.push({ $limit });
  }

  aggregation.push({
    $project: defaultProjection,
  });
  const data = await Candidate.aggregate(aggregation).exec();
  return data;
};

module.exports = {
  get,
};
