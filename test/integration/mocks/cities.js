const nock = require('nock');

const { env } = process;

const URL = env.CITIES_HOST;
const path = env.CITIES_PATH;

const cities = [
  {
    city: 'Madrid',
    lat: 40.4,
    long: -3.6834,
  },
  {
    city: 'Palma',
    lat: 39.5743,
    long: 2.6542,
  },
];

const getCitiesNotFound = () => nock(URL)
  .get(path)
  .reply(404);

const getCities = () => nock(URL)
  .get(path)
  .reply(200, cities);

module.exports = {
  getCitiesNotFound,
  getCities,
  cities,
};
