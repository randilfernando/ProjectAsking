var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  var token = req.params.token || req.body.token || req.header('x-jwt-token');
  if (token){
    try{
      var decoded = jwt.verify(token, require('./../config/security.config.json').secretKey);
      req.body.token = decoded;
      next();
    } catch (err){
      res.status(403);
      res.send({
        "message": "Invalid token"
      });
    }
  } else {
    res.status(403);
    res.send({
      "message": "Access token not found"
    });
  }
};
