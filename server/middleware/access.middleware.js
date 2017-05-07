module.exports = function (accessList) {
  return function (req, res, next) {
    var token = req.params.token || req.body.token || req.query.token || req.header('x-jwt-token');
    if (token) {
      for (var accessLevel of accessList) {
        console.log(accessLevel);
        if (token.accessLevel == accessLevel) {
          next();
          return;
        }
      }
      res.status(403);
      res.send({
        "message": "Forbidden access"
      });
    }else{
      res.status(403);
      res.send({
        "message": "Token not found"
      });
    }
  };
};
