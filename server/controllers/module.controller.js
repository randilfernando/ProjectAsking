var Module = require('./../model/module.model').Module;

var get = function (req, res) {
    res.send('Not implemented');
};

var getById = function (req, res) {
  Module.findOne({'moduleCode': req.params.id})
    .exec()
    .then(function (module) {
      res.status(200);
      res.send(module);
    })
    .catch(function (err) {
      res.status(404);
      res.send({
        message: 'Not found'
      });
      console.log('error: ', err);
    });
}

var getByKeyword = function (req, res) {
    res.send('Not implemented');
};

var getFeatured = function (req, res) {
    Module.find({},null,{
      skip: 0,
      limit: 5,
      sort: { totalQuestions: -1 }
    })
      .exec()
      .then(function (modules) {
        res.status(200);
        res.send(modules);
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          "message": "Internal server error"
        });
      })
}

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

module.exports = {
    get: get,
    getById: getById,
    getByKeyword: getByKeyword,
    getFeatured: getFeatured,
    add: add,
    update: update,
    patch: patch,
    del: del
}
