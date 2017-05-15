let serverConfig = require('./server.config.json');
let databaseConfig = require('./database.config.json');

let environments = {
  development: "dev",
  production: "prod",
  test: "test"
};

let environment = environments.production; // change environment for the application

let url = serverConfig[environment].host;

if(serverConfig[environment].port){
  url += `:${serverConfig[environment].port}`;
}

module.exports = {
  host: process.env.HOST || serverConfig[environment].host,
  port: process.env.PORT || serverConfig[environment].port,
  url: url,
  morganEnabled: serverConfig[environment].morganEnabled,
  morganMode: serverConfig[environment].morganMode,
  client: serverConfig[environment].client,
  database: databaseConfig[environment]
};
