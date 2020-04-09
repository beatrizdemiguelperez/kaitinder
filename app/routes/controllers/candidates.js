const getCandidates = (getCandidatesDomain) => async (req, res, next) => {
  try {
    const { offset = 0, limit = 0 } = req.query;
    const data = await getCandidatesDomain({ offset, limit });
    res.send({ data });
    next();
  } catch (e) {
    next(e);
  }
};

const create = (createDomain) => async (req, res, next) => {
  try {
    const data = await createDomain(req.body);
    res.send({ data });
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCandidates,
  create,
};
