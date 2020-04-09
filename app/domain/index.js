const candidatesRepository = require('../repository/mongo/candidates');
const candidates = require('./candidates');

const getCandidates = async ({ offset, limit }) => candidates.getCandidates(candidatesRepository.get)({ offset, limit });

module.exports = {
  getCandidates,
};
