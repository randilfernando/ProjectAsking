var reportController = function (Question, Module) {

  var getOverall = function (req, res) {
    Module.find({})
      .select('_id moduleCode moduleName totalQuestions')
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
  };

  var getUnanswered = function (req, res) {
    Question.find({'totalAnswers': 0})
      .select('_id')
      .exec()
      .then(function (questions) {
        res.status(200);
        res.send({
          "count": questions.length
        });
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          "message": "Internal server error"
        });
      })
  };

  var getByModule = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        var answer = question.answers.id(req.body.answerId);

        answer.answer = req.body.answer;
        answer.submittedBy = req.body.submittedBy;
        answer.totalRatings = req.body.totalRatings;
        answer.totalComments = req.body.totalComments;

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

  return {
    getAll: getOverall,
    getUnanswered: getUnanswered,
    getBySubject: getByModule
  }
};

module.exports = reportController;
