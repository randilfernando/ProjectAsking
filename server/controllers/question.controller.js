var questionController = function (Question, Module) {

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
    Question.find({$text: {$search: req.params.keyword}}, {score : { $meta: "textScore" }})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .sort({ score : { $meta : 'textScore' } })
      .exec()
      .then(function (questions) {
        if (questions.length == 0){
          res.status(204);
          res.send({
            message: 'No questions found'
          });
        }else{
          res.status(200);
          res.send(questions);
        }
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
    Question.find({'moduleCode': req.params.code})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .exec()
      .then(function (questions) {
        if (questions.length == 0){
          res.status(204);
          res.send({
            message: 'No questions submitted'
          });
        } else {
          res.status(200);
          res.send(questions);
        }
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
    Module.findOne({'moduleCode': req.body.moduleCode})
      .exec()
      .then(function (module) {
        if (module){
          var question = new Question(req.body);
          module.totalQuestions++;
          question.save()
            .then(function () {
              module.save()
                .then(function () {
                  res.status(200);
                  res.send({
                    message: 'Success'
                  });
                })
            })
            .catch(function (err) {
              res.status(500);
              res.send({
                message: 'Internal server error'
              });
              console.log('error: ', err);
            });
        }else{
          res.status(404);
          res.send({
            message: 'Module not found'
          });
        }
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
        question.topic = req.body.topic;
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
            Module.findOne({'moduleCode': question.moduleCode})
              .exec()
              .then(function (module) {
                module.totalQuestions--;
                module.save();
              })
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
