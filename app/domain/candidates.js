const getCandidates = (getAll) => async ({ offset, limit }) => getAll({ offset, limit });

module.exports = {
  getCandidates,
};
