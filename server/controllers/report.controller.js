"use strict";

const reportController = function (Question, Module) {

  const get = function (req, res) {
    Module.find({}, null, {
      skip: 0,
      sort: {totalQuestions: -1}
    })
      .select('-_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function (report) {
        let total = 0;
        for(let module of report){
          total += module.totalQuestions;
        }
        Question.find({'totalAnswers': 0})
          .select('_id')
          .exec()
          .then(function (questions) {
            res.status(200);
            res.send({
              answeredCount: total - questions.length,
              unansweredCount: questions.length,
              data: report
            });
          })
          .catch(function (err) {
            res.status(500);
            res.send(err);
            console.log('Error', err);
          });
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
        console.log('Error', err);
      })
  };

  const getByModule = function (req, res) {
    Question.aggregate([
      {
        $match: {
          moduleCode: {$eq: req.params.moduleCode}
        }
      },
      {
        $group: {
          _id: '$topic',
          count: {$sum: 1}
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ])
    .exec()
    .then(function (report) {
      let total = 0;
      for(let topic of report){
        total += topic.count;
      }
      Question.find({'moduleCode': req.params.moduleCode, 'totalAnswers': 0})
        .select('_id')
        .exec()
        .then(function (questions) {
          res.status(200);
          res.send({
            answeredCount: total - questions.length,
            unansweredCount: questions.length,
            data: report
          });
        })
        .catch(function (err) {
          res.status(500);
          res.send(err);
          console.log('Error', err);
        });
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
        console.log(Error, err);
      })
  };

  return {
    get: get,
    getByModule: getByModule,
  }
};

module.exports = reportController;
