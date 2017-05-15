module.exports = function (accessList) {
  return function (req, res, next) {
    const token = req.params.token || req.body.token || req.query.token || req.header('x-jwt-token');
    for (let accessLevel of accessList) {
      if (token.accessLevel === accessLevel) {
        next();
        return;
      }
    }
    res.status(403);
    res.send({
      "message": "Forbidden access"
    });
  };
};
