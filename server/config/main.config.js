var serverConfig = require('./server.config.json');
var databaseConfig = require('./database.config.json');

var environments = {
  "development": "development",
  "production": "production",
  "test": "test"
};

var environment = environments.production; // change environment for the application

module.exports = {
  host: process.env.HOST || serverConfig[environment].host,
  port: process.env.PORT || serverConfig[environment].port,
  morganMode: serverConfig[environment].morganMode,
  database: databaseConfig[environment]
};
