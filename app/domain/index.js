const candidatesRepository = require('../repository/mongo/candidates');
const candidates = require('./candidates');
const { getCities } = require('../services/cities');

const getCandidates = async ({ offset, limit }) => candidates.getCandidates(candidatesRepository.get)({ offset, limit });

const create = async (data) => candidates.create(candidatesRepository.insert, getCities)(data);

module.exports = {
  getCandidates,
  create,
};
