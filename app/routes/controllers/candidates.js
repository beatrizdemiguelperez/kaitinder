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

module.exports = {
  getCandidates,
};
