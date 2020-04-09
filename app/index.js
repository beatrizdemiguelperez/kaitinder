const express = require('express');
const mongoose = require('mongoose');

const swagger = require('./libs/swagger');
const log = require('./libs/log');

const port = process.env.PORT;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

const mongoConfig = {
  user,
  pass,
  socketTimeoutMS: 0,
  keepAlive: true,
  poolSize: 30,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: false },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: false },
      long: { type: Number, required: false },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const defaultProjection = {
  name: 1,
  photo: 1,
  gender: 1,
  city: 1,
  coordinates: 1,
  birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
};

const Candidate = mongoose.model('Candidate', schema);

const initServer = () => {
  const app = express();

  app.get('/candidates', async (req, res, next) => {
    // @TODO: challenge-2
    const aggregation = [{ $project: defaultProjection }];
    const data = await Candidate.aggregate(aggregation).exec();
    res.send({ data });
    next();
  });

  if (process.env.NODE_ENV === 'development') {
    swagger.addSwaggerRoute(app, '/api-docs');
  }

  app.listen(port, (error) => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));
};

const { MONGO_HOST, MONGO_DB_NAME } = process.env;
const mongoUri = `${MONGO_HOST}/${MONGO_DB_NAME}`;

const mongoConnect = async () => {
  try {
    log.info(`Connecting to ${mongoUri}`);
    await mongoose.connect(mongoUri, mongoConfig);
  } catch (e) {
    log.error(`Error trying to connect Mongo database [${mongoUri}]: ${e}`, 'error');
    throw e;
  }
};

mongoConnect().then(() => {
  initServer();
});
