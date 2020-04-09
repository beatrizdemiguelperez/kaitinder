const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

module.exports = {
  user,
  pass,
  socketTimeoutMS: 0,
  keepAlive: true,
  poolSize: 30,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
