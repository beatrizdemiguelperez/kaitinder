const request = require('supertest');
const nock = require('nock');

const { setup, mocks, teardown } = require('./helpers');

const mockedCandidates = mocks.mocks;
const path = '/candidates';

describe('GET', () => {
  let env;
  let app;

  beforeAll(async () => {
    env = await setup();
    ({ app } = env);
  });

  afterAll(async () => {
    await teardown();
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

    it('should throw a 400 BAD REQUEST error when query params are wrong', async (done) => {
      const resp = await request(app)
        .get(path)
        .set('Accept', 'application/json')
        .query({
          offset: 'wrong',
          limit: 'wrong',
        })
        .send();
      expect(resp.status).toEqual(400);
      expect(resp.body.data.errors.length).toEqual(2);
      done();
    });

    describe.each([
      [{ limit: 0, offset: 0 }, mockedCandidates],
      [{ limit: 1, offset: 0 }, [mockedCandidates[0]]],
      [{ limit: 1, offset: 1 }, [mockedCandidates[1]]],
      [{ limit: 2, offset: 0 }, [mockedCandidates[0], mockedCandidates[1]]],
    ])('%s', ({ limit, offset }, expected) => {
      it(`should return candidates with limit ${limit} and offset ${offset}`, async (done) => {
        const resp = await request(app)
          .get(path)
          .set('Accept', 'application/json')
          .query({
            offset,
            limit,
          })
          .send();
        expect(resp.status).toEqual(200);
        expect(resp.body.data.map((i) => i.name)).toEqual(expected.map((i) => i.name));
        done();
      });
    });
  });
});
