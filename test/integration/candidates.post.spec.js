const request = require('supertest');
const nock = require('nock');

const { setup, mocks, teardown } = require('./helpers');

const mockCities = require('./mocks/cities');

const path = '/candidates';

describe('POST', () => {
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
      mockCities.getCities();
    });

    afterEach(async () => {
      nock.cleanAll();
      nock.abortPendingRequests();
      jest.resetAllMocks();
      await mocks.deleteAll();
    });

    it('should throw a 400 BAD REQUEST error when body is wrong', async (done) => {
      const resp = await request(app)
        .post(path)
        .set('Accept', 'application/json')
        .send({
          name: 5,
          photo: 5,
          birthDate: 'wrong',
          gender: 'wrong',
          city: 5,
          foo: 'bar',
        });
      expect(resp.status).toEqual(400);
      expect(resp.body.data.errors.length).toEqual(6);
      done();
    });

    it('should return created candidate if succeed', async (done) => {
      const body = {
        name: 'foo',
        photo: 'foo',
        birthDate: '1991-11-11',
        gender: 'M',
        city: 'Madrid',
      };
      const resp = await request(app)
        .post(path)
        .set('Accept', 'application/json')
        .send(body);
      expect(resp.status).toEqual(200);
      expect(/^[0-9a-fA-F]{24}$/.test(resp.body.data._id)).toEqual(true);
      expect(resp.body.data.coordinates).toBeDefined();
      done();
    });
  });
});
