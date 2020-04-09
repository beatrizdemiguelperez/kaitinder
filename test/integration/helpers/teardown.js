const stopMongoMemoryServer = (server) => server.stop();

const teardown = async (env) => {
  const { mongoMemoryServer, mongoDriver } = env;
  await mongoDriver.close();
  await stopMongoMemoryServer(mongoMemoryServer);
};

module.exports = teardown;
