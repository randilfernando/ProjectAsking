var questionController = function (Question) {
  var get = function (req, res) {
    Question.find({})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .exec()
      .then(function (questions) {
        res.status(200);
        res.send(questions);
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
      });
  };

  var getByKeyword = function (req, res) {
    Question.find({$text: {$search: req.params.keyword}})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .exec()
      .then(function (questions) {
        res.status(200);
        res.send(questions);
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
      });
  };

  var getById = function (req, res) {
    Question.findById(req.params.id)
      .exec()
      .then(function (question) {
        res.status(200);
        res.send(question);
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ',err);
      });
  };

  var getByModule = function (req, res) {
    Question.find({'moduleCode': req.params.id})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .exec()
      .then(function (questions) {
        res.status(200);
        res.send(questions);
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
      });
  };

  var getByUser = function (req, res) {
    res.send({
      message: 'Method not implemented'
    });
  };

  var add = function (req, res) {
    var question = new Question(req.body);
    console.log(question);
    question.save()
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
    Question.findById(req.params.id)
      .exec()
      .then(function (question) {
        question.title = req.body.title;
        question.submittedBy = req.body.submittedBy;
        question.rating = req.body.rating;
        question.totalAnswers = req.body.totalAnswers;
        question.moduleCode = req.body.moduleCode;
        question.moduleName = req.body.moduleName;
        question.tags = req.body.tags;
        question.description = req.body.description;

        question.save()
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
            console.log('error: ',err);
          });
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ',err);
      });
  }

  var patch = function (req, res) {
    Question.findById(req.params.id)
      .then(function (question) {
        delete req.body._id;
        for(var p in req.body){
          question[p] = req.body[p];
        }

        question.save()
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
            console.log('error: ',err);
          });
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ',err);
      });
  };

  var del = function (req, res) {
    Question.findById(req.body._id)
      .exec()
      .then(function (question) {
        question.remove()
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
            console.log('error: ',err);
          })
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ',err);
      });
  };

  return {
    get: get,
    getById: getById,
    getByKeyword: getByKeyword,
    getByModule: getByModule,
    getByUser: getByUser,
    add: add,
    update: update,
    patch: patch,
    del: del
  };
}

module.exports = questionController;
