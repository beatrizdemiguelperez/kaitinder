const getCandidates = (getAll) => async ({ offset, limit }) => getAll({ offset, limit });

const create = (insert, getCities) => async (data) => {
  // consultar a la api
  const cities = await getCities();
  const currentCity = cities.find((i) => i.city === data.city);
  const coordinates = {
    lat: currentCity.lat,
    long: currentCity.long,
  };
  const created = await insert({
    ...data,
    coordinates,
  });
  return created;
};

module.exports = {
  getCandidates,
  create,
};
