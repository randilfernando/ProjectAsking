var mailController = require('./mail.controller');
var generator = require('generate-password');

var userController = function (User, TempUser, Module, passport) {

  var getByEmail = function (req, res) {
    User.findById(req.body.token._id)
      .populate('subscribedModules', '_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function (user) {
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

    console.log(req.body);

    User.findOne({email: req.body.email})
      .exec()
      .then(function (user) {
        if (user) {
          res.status(409);
          res.send({
            message: 'User account already exist'
          });
        } else {
          TempUser.findOne({email: req.body.email})
            .exec()
            .then(function (tempUser) {
              if (tempUser) {
                res.status(203);
                res.send({
                  message: 'Confirmation pending'
                });
              } else {
                var user = new User();
                user.setPassword(req.body.password);

                var tempUser = new TempUser();
                tempUser.name = req.body.name;
                tempUser.email = req.body.email;
                tempUser.password = user.password;

                tempUser.save()
                  .then(function (savedUser) {
                    mailController.accountConfirmationMail(savedUser.email, savedUser._id);
                    res.status(200);
                    res.send({
                      message: 'Confirmation message sent to email address'
                    });
                  })
                  .catch(function (err) {
                    res.status(500);
                    res.send({
                      message: 'Internal server error'
                    });
                    console.log(err);
                  });
              }
            })
            .catch(function (err) {
              res.status(500);
              res.send({
                message: 'Internal server error'
              });
              console.log(err);
            });
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
        console.log(err);
      });
  };

  var verification = function (req, res) {
    TempUser.findById(req.params.id)
      .exec()
      .then(function (tempUser) {
        var user = new User();
        user.email = tempUser.email;
        user.name = tempUser.name;
        user.password = tempUser.password;

        user.save()
          .then(function () {
            tempUser.remove();
            res.status(200);
            res.redirect('/login');
          })
          .catch(function (err) {
            res.status(500);
            res.send({
              message: 'Internal server error'
            });
            console.log(err);
          })
      })
  };

  var resend = function (req, res) {
    TempUser.findOne({email: req.body.email})
      .exec()
      .then(function (tempUser) {
        if (tempUser) {
          mailController.accountConfirmationMail(tempUser.email, tempUser._id);
        } else {
          res.status(404);
          res.send({
            message: 'No pending users found'
          });
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
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
    User.findById(req.body.token._id)
      .exec()
      .then(function (user) {
        if (req.body.name) {
          user.name = req.body.name;
        }
        if (req.body.newPassword) {
          user.setPassword(req.body.newPassword);
        }
        user.save()
          .then(function () {
            res.status(200);
            res.send({
              message: 'Success'
            });
          })
          .catch(function (err) {
            res.status(500);
            res.send({
              message: 'Internal server error'
            });
            console.log('Error', err);
          })
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'User not found'
        });
        console.log('Error', err);
      })
  };

  var subscribe = function (req, res) {
    User.findById(req.body.token._id)
      .exec()
      .then(function (user) {
        if (user.accessLevel > 1) {
          res.status(203);
          res.send({
            message: 'User can not subscribe for modules'
          })
        } else {
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
        if (user.accessLevel > 1) {
          res.status(203);
          res.send({
            message: 'User can not unsubscribe for modules'
          })
        } else {
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
    verification: verification,
    resend: resend,
    login: login,
    update: update,
    resetPassword: resetPassword,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };
}

module.exports = userController;
