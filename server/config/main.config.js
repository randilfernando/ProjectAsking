var serverConfig = require('./server.config.json');
var databaseConfig = require('./database.config.json');

var environments = {
  development: "dev",
  production: "prod",
  test: "test"
};

var environment = process.env.NODE_ENV || environments.production; // change environment for the application

module.exports = {
  port: process.env.PORT || serverConfig[environment].port,
  morganMode: serverConfig[environment].morganMode,
  client: serverConfig[environment].client,
  database: databaseConfig[environment]
};
