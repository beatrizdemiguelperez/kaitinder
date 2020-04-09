const request = require('supertest');
const nock = require('nock');

const { setup, mocks } = require('./helpers');

const mockedCandidates = mocks.mocks;
const path = '/candidates';

describe('GET', () => {
  let env;
  let app;

  beforeAll(async () => {
    env = await setup();
    ({ app } = env);
  });

  describe(path, () => {
    beforeEach(async () => {
      await mocks.createMany();
    });

    afterEach(async () => {
      nock.cleanAll();
      nock.abortPendingRequests();
      jest.resetAllMocks();
      await mocks.deleteAll();
    });

    it('exists', async () => {
      // @TODO: challenge-2 Implementa los casos de test
      expect(true).toEqual(true);
    });
  });
});
