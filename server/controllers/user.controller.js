var passport = require('passport');
var mongoose = require('mongoose');
var User = require('./../model/user.model').User;

var getById = function (req, res) {
    res.send('Not implemented');
};

var register = function (req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save()
        .then(function () {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        })
        .catch(function (err) {
            res.status(500);
            res.send('Internal server error');
            console.log('error: ', err);
        })

};

var login = function (req, res) {
    passport.authenticate('local', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports = {
    getById: getById,
    register: register,
    login: login
};