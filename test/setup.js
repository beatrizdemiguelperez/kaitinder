const nock = require('nock');

const allowedHosts = ['fastdl.mongodb.org', '127.0.0.1', 'localhost'];

const disableNetwork = () => {
  nock.disableNetConnect();
  // Allow localhost connections so we can test local routes and mock servers.
  // add "fastdl.mongodb.org" because mongoMemoryServer setup version if different at postInstall version, and try to download
  nock.enableNetConnect((host) => allowedHosts.some((i) => host.includes(i)));
};

disableNetwork();
