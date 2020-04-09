const { create } = require('../../../app/domain/candidates');

describe('Unit tests for candidates domain', () => {
  describe('createCandidate function', () => {
    it('should call functions and return persist result', async () => {
      const insertFn = jest.fn().mockReturnValue({
        city: 'Madrid',
        name: 'Yo',
        _id: '123123',
      });

      const getCitiesFn = jest.fn().mockReturnValue([
        {
          city: 'Madrid',
          lat: 40.4,
          long: -3.6834,
        },
      ]);
      const candidate = {
        city: 'Madrid',
        name: 'Yo',
      };
      const result = await create(insertFn, getCitiesFn)(candidate);
      expect(getCitiesFn).toBeCalledWith();
      expect(insertFn).toBeCalledWith({
        city: 'Madrid',
        name: 'Yo',
        coordinates: {
          lat: 40.4,
          long: -3.6834,
        },
      });
      expect(result).toEqual({
        city: 'Madrid',
        name: 'Yo',
        _id: '123123',
      });
    });
  });
});
