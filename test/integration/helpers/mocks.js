/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const Candidate = require('../../../app/repository/mongo/models/candidate');

const mocks = [
  {
    name: 'foo',
    birthDate: '1990-07-27',
    gender: 'M',
    city: 'Madrid',
    photo: 'http://photo1.jpg',
    coordinates: {
      lat: 40.4,
      long: -3.6834,
    },
  },
  {
    name: 'bar',
    birthDate: '1991-05-02',
    gender: 'F',
    city: 'Madrid',
    photo: 'http://photo2.jpg',
    coordinates: {
      lat: 40.4,
      long: -3.6834,
    },
  },
  {
    name: 'bar1',
    birthDate: '1991-05-02',
    gender: 'F',
    city: 'Palma',
    photo: 'http://photo2.jpg',
    coordinates: {
      lat: 39.5743,
      long: 2.6542,
    },
  },
  {
    name: 'bar2',
    birthDate: '1991-05-02',
    gender: 'F',
    city: 'Palma',
    photo: 'http://photo2.jpg',
    coordinates: {
      lat: 39.5743,
      long: 2.6542,
    },
  },
];

const createMany = async () => {
  const results = [];
  for (let i = 0; i < mocks.length; i++) {
    const created = await Candidate.create(mocks[i]);
    results.push(created);
  }
  return results;
};

const deleteAll = async () => {
  await Candidate.deleteMany({});
};

module.exports = {
  createMany,
  deleteAll,
  mocks,
};
