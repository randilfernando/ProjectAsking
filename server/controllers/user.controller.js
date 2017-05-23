const mailController = require('./mail.controller');
const generator = require('generate-password');
const passport = require('passport');

const userController = function (User, TempUser, Module) {

  const get = function (req, res) {
    User.find({})
      .select('email name accessLevel')
      .exec()
      .then(function (users) {
        if (users.length > 0) {
          res.status(200);
          res.send(users);
        } else {
          res.status(203);
          res.send({
            message: 'No users'
          })
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      });
  };

  const getByEmail = function (req, res) {
    User.findById(req.body.token._id)
      .populate('subscribedModules', '_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function (user) {
        res.status(200);
        res.send(user);
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      });
  };

  const register = function (req, res) {
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
                let user = new User();
                user.setPassword(req.body.password);

                let tempUser = new TempUser();
                tempUser.name = req.body.name;
                tempUser.email = req.body.email;
                tempUser.password = user.password;

                tempUser.save()
                  .then(function (savedUser) {
                    mailController.accountConfirmationMail(savedUser.email, savedUser._id, savedUser.name);
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
              res.send(err);
              console.log('Error', err);
            });
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
        console.log('Error', err);
      });
  };

  const verification = function (req, res) {
    TempUser.findById(req.params.id)
      .exec()
      .then(function (tempUser) {
        let user = new User();
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
            res.send(err);
          });
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Pending user not found'
        });
      })
  };

  const resend = function (req, res) {
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
        res.send(err);
        console.log('Error', err);
      })
  };

  const login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      let token;

      // If Passport throws/catches an error
      if (err) {
        res.status(404);
        res.send(err);
        return;
      }

      // If a user is found
      if (user) {
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token": token,
          "name": user.name,
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

  const resetPassword = function (req, res) {
    User.findOne({'email': req.body.email})
      .exec()
      .then(function (user) {
        let password = generator.generate({
          length: 10,
          numbers: true
        });
        user.setPassword(password);
        user.save()
          .then(function () {
            mailController.passwordResetMail(user.email, password, user.name);
            res.status(200);
            res.json({
              "message": 'Success'
            });
          })
          .catch(function (err) {
            res.status(500);
            res.send(err);
          })
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'User not found'
        })
      })
  };

  const add = function (req, res) {
    let user = new User(req.body);
    let password = generator.generate({
      length: 10,
      numbers: true
    });
    user.setPassword(password);

    user.save()
      .then(function () {
        mailController.passwordResetMail(user.email, password);
        res.status(200);
        res.send({
          "message": 'Success'
        });
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      })
  };

  const update = function (req, res) {
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
            res.send(err);
          })
      })
      .catch(function (err) {
        res.status(404);
        res.send(err);
      })
  };

  const changeAccess = function (req, res) {
    User.findOne({'email': req.body.email})
      .exec()
      .then(function (user) {
        if(user.email === req.body.token.email){
          console.log(user.email, req.body.email);
          res.status(203);
          res.send({
            message: 'You cant downgrade your own account'
          })
        }else{
          user.accessLevel = req.body.accessLevel;
          user.save()
            .then(function () {
              res.status(200);
              res.send({
                message: 'Success'
              });
            })
            .catch(function (err) {
              res.status(500);
              res.send(err);
            })
        }
      })
      .catch(function (err) {
        res.status(404);
        res.send(err);
      })
  };

  const subscribe = function (req, res) {
    User.findById(req.body.token._id)
      .exec()
      .then(function (user) {
        if (user.accessLevel > 1) {
          res.status(204);
          res.send({
            message: 'User can not subscribe for modules'
          })
        } else {
          Module.findById(req.body.id)
            .exec()
            .then(function (module) {
              let count = user.subscribedModules.length;
              user.subscribedModules.addToSet(module._id);
              user.save()
                .then(function () {
                  if (count < user.subscribedModules.length) {
                    res.status(200);
                    res.send({
                      "message": "Success"
                    });
                  } else {
                    res.status(204);
                    res.send({
                      "message": "Already subscribed"
                    });
                  }
                })
                .catch(function (err) {
                  res.status(500);
                  res.send(err);
                })
            })
            .catch(function (err) {
              res.status(404);
              res.send({
                message: 'Module not found'
              });
            });
        }
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'User not found'
        });
      });
  };

  const unsubscribe = function (req, res) {
    User.findById(req.body.token._id)
      .exec()
      .then(function (user) {
        if (user.accessLevel > 1) {
          res.status(203);
          res.send({
            message: 'User can not unsubscribe for modules'
          })
        } else {
          let index = user.subscribedModules.indexOf(req.body.id);
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
              res.send(err);
            });
        }
      })
      .catch(function (err) {
        res.status(404);
        res.send(err);
      });
  };

  return {
    get: get,
    add: add,
    changeAccess: changeAccess,
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
};

module.exports = userController;
