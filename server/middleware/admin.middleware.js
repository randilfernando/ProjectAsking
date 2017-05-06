var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  var token = req.params.token || req.body.token || req.query.token || req.header('x-jwt-token');
  if (token){
    if (token.accessLevel == 2){
      next();
    }else{
      res.status(403);
      res.send({
        "message": "Forbidden access"
      });
    }
  }else{
    res.status(403);
    res.send({
      "message": "Token not found"
    });
  }
};
