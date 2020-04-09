const candidatesIndex = require('../../../app/domain');
const candidatesDomain = require('../../../app/domain/candidates');
const Candidate = require('../../../app/repository/mongo/candidates');
const cities = require('../../../app/services/cities');

describe('Unit tests for candidates domain', () => {
  describe('createCandidate route tests', () => {
    it('should call candidates createCandidate with all parameters', async () => {
      const secondFn = jest.fn().mockReturnValue('responseData');
      candidatesDomain.create = jest.fn().mockReturnValue(secondFn);

      const result = await candidatesIndex.create('newCandidate');

      expect(candidatesDomain.create).toBeCalledWith(Candidate.insert, cities.getCities);
      expect(secondFn).toBeCalledWith('newCandidate');
      expect(result).toBe('responseData');
    });
  });
});
