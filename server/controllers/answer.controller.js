var answerController = function (Question) {

  var add = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        question.answers.push(req.body.answer);
        question.totalAnswers++;

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

  var put = function (req, res) {
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

  var del = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        question.answers.id(req.body.answerId).remove();
        question.totalAnswers--;

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
    add: add,
    put: put,
    del: del
  }
};

module.exports = answerController;
