"use strict";

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const apiRouter = require('./routes/api.router.js');
const mainConfig = require('./config/main.config');

const SERVER_HOST = mainConfig.host;
const SERVER_PORT = mainConfig.port;
const MORGAN_MODE = mainConfig.morganMode;
const CLIENT_LOCATION = '../' + mainConfig.client;
const MONGO_STRING = mainConfig.database;

//configure passport
require('./config/passport.config')(passport);

mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_STRING);

let app = express();
app.use(bodyParser.json());

if(mainConfig.morganEnabled){
  app.use(morgan(MORGAN_MODE));
}

app.use(passport.initialize());

// point static path to client
app.use(express.static(path.join(__dirname, CLIENT_LOCATION)));

// point api routes
app.use('/api', apiRouter);

// catch all other routes and return the index file
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, CLIENT_LOCATION + '/index.html')); });

app.listen(SERVER_PORT, function(){
    console.log(`server is running on ${SERVER_HOST} : ${SERVER_PORT}`);
});

module.exports = app;
