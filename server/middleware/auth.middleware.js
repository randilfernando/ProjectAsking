const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.params.token || req.body.token || req.header('x-jwt-token');
  if (token){
    try{
      req.body.token = jwt.verify(token, require('./../config/security.config.json').secretKey);;
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
