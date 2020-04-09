const axios = require('axios');

const { CITIES_HOST, CITIES_PATH } = process.env;

const getCities = async () => {
  const cities = await axios.get(`${CITIES_HOST}${CITIES_PATH}`);
  return cities != null ? cities.data : [];
};

module.exports = {
  getCities,
};
