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

  return {
    add: add
  }
};

module.exports = answerController;
