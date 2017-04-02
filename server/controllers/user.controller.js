var userController = function (User, passport) {
  var getById = function (req, res) {
    res.send('Not implemented');
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
          "username": user.name
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

  return {
    getById: getById,
    register: register,
    login: login
  };
}

module.exports = userController;
