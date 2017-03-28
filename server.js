var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookieparser');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./server/config/config').config;
var apiRouter = require('./server/routes/api.router');

//configure passport
require('./server/config/passport');

const SERVER_PORT = config.server.port;
const MONGO_STRING = config.database;
mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_STRING);
var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

// point static path to client
app.use(express.static(path.join(__dirname, 'client')));

// point api routes
app.use('/api', apiRouter);

// catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/client/index.html'));
});

app.listen(SERVER_PORT, function(){
    console.log(`server is running on port: ${SERVER_PORT}`);
});
