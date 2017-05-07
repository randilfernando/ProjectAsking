var moduleController = function (Module) {

  var get = function (req, res) {
    Module.find({})
      .select('_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function (modules) {
        if (modules.length == 0){
          res.status(203);
          res.send({
            message: 'No modules found'
          })
        }else{
          res.status(200);
          res.send(modules);
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
      })
  };

  var getById = function (req, res) {
    Module.findOne({'moduleCode': req.params.code})
      .exec()
      .then(function (module) {
        if (module){
          res.status(200);
          res.send(module);
        }else{
          res.status(404);
          res.send({
            message: 'Module not found'
          })
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
      });
  }

  var getByKeyword = function (req, res) {
    res.send('Not implemented');
  };

  var getFeatured = function (req, res) {
    Module.find({}, null, {
      skip: 0,
      limit: 5,
      sort: {totalQuestions: -1}
    })
      .select('_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function (modules) {
        res.status(200);
        res.send(modules);
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
      })
  };

  var add = function (req, res) {
    var module = new Module(req.body);
    module.save()
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
        console.log('error: ', err);
      });
  };

  var update = function (req, res) {
    res.send('Not implemented');
  }

  var patch = function (req, res) {
    res.send('Not implemented');
  };

  var del = function (req, res) {
    res.send('Not implemented');
  };

  return {
    get: get,
    getById: getById,
    getByKeyword: getByKeyword,
    getFeatured: getFeatured,
    add: add,
    update: update,
    patch: patch,
    del: del
  };

};

module.exports = moduleController;
