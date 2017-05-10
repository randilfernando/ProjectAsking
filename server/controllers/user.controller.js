var mailController = require('./mail.controller');
var generator = require('generate-password');

var userController = function (User, Module, passport) {

  var getByEmail = function (req, res) {
    User.findById(req.body.token._id)
      .populate('subscribedModules', '_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function(user){
        res.status(200);
        res.send(user);
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          "message": "Internal server error"
        })
      });
  };

  var register = function (req, res) {
    var user = new User();

    user.name = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save()
      .then(function () {
        res.status(200);
        res.json({
          "message": 'Success'
        });
      })
      .catch(function (err) {
        res.status(500);
        res.json({
          "message": 'Internal server error'
        });
        console.log('error: ', err);
      })

  };

  var login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      var token;

      // If Passport throws/catches an error
      if (err) {
        res.status(404);
        res.json({
          "message": 'Internal server error'
        });
        return;
      }

      // If a user is found
      if (user) {
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token": token,
          "username": user.name,
          "accessLevel": user.accessLevel
        });
      } else {
        // If user is not found
        res.status(404);
        res.json({
          "message": 'User not found'
        });
      }
    })(req, res);

  };

  var resetPassword = function (req, res) {
    User.findOne({'email': req.body.email})
      .exec()
      .then(function (user) {
        var password = generator.generate({
          length: 10,
          numbers: true
        });
        user.setPassword(password);
        user.save()
          .then(function () {
            mailController.passwordResetMail(user.email, password);
            res.status(200);
            res.json({
              "message": 'Success'
            });
          })
          .catch(function (err) {
            res.status(500);
            res.json({
              "message": 'Internal server error'
            });
            console.log('error: ', err);
          })
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'User not found'
        })
      })
  };

  var add = function (req, res) {
    var user = new User();

    user.name = req.body.username;
    user.email = req.body.email;
    user.accessLevel = req.body.accessLevel;
    user.setPassword(req.body.password);

    user.save()
      .then(function () {
        res.status(200);
        res.json({
          "message": 'Success'
        });
      })
      .catch(function (err) {
        res.status(500);
        res.json({
          "message": 'Internal server error'
        });
        console.log('error: ', err);
      })
  };

  var del = function (req, res) {

  };

  var update = function (req, res) {

  };

  var patch = function (req, res) {

  };

  var subscribe = function (req, res) {
    User.findById(req.body.token._id)
      .exec()
      .then(function (user) {
        if (user.accessLevel > 1){
          res.status(203);
          res.send({
            message: 'User can not subscribe for modules'
          })
        }else {
          Module.findById(req.body.id)
            .exec()
            .then(function (module) {
              var count = user.subscribedModules.length;
              user.subscribedModules.addToSet(module._id);
              user.save()
                .then(function () {
                  if (count < user.subscribedModules.length) {
                    res.status(200);
                    res.send({
                      "message": "Success"
                    });
                  } else {
                    res.status(304);
                    res.send({
                      "message": "Already subscribed"
                    });
                  }
                })
                .catch(function (err) {
                  res.status(500);
                  res.send({
                    "message": "Internal server error"
                  });
                })
            })
            .catch(function (err) {
              res.status(404);
              res.send({
                "message": "Module not found"
              });
            });
        }
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          "message": "User not found"
        });
      });
  };

  var unsubscribe = function (req, res) {
      User.findById(req.body.token._id)
        .exec()
        .then(function (user) {
          if (user.accessLevel > 1){
            res.status(203);
            res.send({
              message: 'User can not unsubscribe for modules'
            })
          }else{
            var index = user.subscribedModules.indexOf(req.body.id);
            if (index > -1) {
              user.subscribedModules.splice(index, 1);
            }
            user.save()
              .then(function () {
                res.status(200);
                res.send({
                  "message": "Success"
                });
              })
              .catch(function (err) {
                res.status(500);
                res.send({
                  "message": "Internal server error"
                });
                console.log('error', err);
              });
          }
        })
        .catch(function (err) {
          res.status(404);
          res.send({
            "message": "User not found"
          });
        });
    };

  return {
    getByEmail: getByEmail,
    register: register,
    login: login,
    resetPassword: resetPassword,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };
}

module.exports = userController;
