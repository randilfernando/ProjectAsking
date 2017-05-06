var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');
var serverConfig = require('./config/server.config').development;
var apiRouter = require('./routes/api.router.js');

const SERVER_HOST = process.env.HOST || serverConfig.host;
const SERVER_PORT = process.env.PORT || serverConfig.port;
const MONGO_STRING = require('./config/database.config').production;

//configure passport
require('./config/passport.config')(passport);

mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_STRING);

var app = express();
app.use(bodyParser.json());
app.use(morgan(serverConfig.morganMode));
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
