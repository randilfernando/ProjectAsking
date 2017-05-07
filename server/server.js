var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');
var apiRouter = require('./routes/api.router.js');
var mainConfig = require('./config/main.config');

const SERVER_HOST = mainConfig.host;
const SERVER_PORT = mainConfig.port;
const MORGAN_MODE = mainConfig.morganMode;
const MONGO_STRING = mainConfig.database;

//configure passport
require('./config/passport.config')(passport);

mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_STRING);

var app = express();
app.use(bodyParser.json());
app.use(morgan(MORGAN_MODE));
app.use(passport.initialize());

// point static path to client
app.use(express.static(path.join(__dirname, '../client')));

// point api routes
app.use('/api', apiRouter);

// catch all other routes and return the index file
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../client/index.html')); });

app.listen(SERVER_PORT, function(){
    console.log(`server is running on ${SERVER_HOST}:${SERVER_PORT}`);
});
