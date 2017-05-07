var serverConfig = require('./server.config.json');
var databaseConfig = require('./database.config.json');

var environments = {
  "development": "development",
  "production": "production",
  "test": "test"
};

var environment = environments.development; // change environment for the application

module.exports = {
  host: serverConfig[environment].host,
  port: serverConfig[environment].port,
  morganMode: serverConfig[environment].morganMode,
  database: databaseConfig[environment]
};
