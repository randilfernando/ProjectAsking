const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const cert = fs.readFileSync(path.join(__dirname,'./../config/public.pem'));

module.exports = function (req, res, next) {
  const token = req.params.token || req.body.token || req.header('x-jwt-token');
  if (token){
    try{
      req.body.token = jwt.verify(token, cert, { algorithms: ['RS256'] });
      console.log(req.body.token);
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
