var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');
var config = require('./config/config').config;
var apiRouter = require('./routes/api.router.js');

const SERVER_HOST = config.server.host;
const SERVER_PORT = config.server.port;
const MONGO_STRING = config.database;

//configure passport
require('./config/passport');

mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_STRING);

var app = express();
app.use(bodyParser.json());
app.use(morgan(config.morganMode));
app.use(passport.initialize());

// point static path to client
app.use(express.static(path.join(__dirname, '../client')));

// point api routes
app.use('/api', apiRouter);

// catch all other routes and return the index file
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../client/index.html')); });

app.listen(SERVER_PORT, function(){
    console.log(`server is ${SERVER_HOST}:${SERVER_PORT}`);
});
