var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answerModel = require('./answer.model').Answer;

var questionModel = new Schema({
    title: {type:String, required:true, trim:true, text:true},
    submittedBy: {type:String, required:true},
    totalRatings: {type:Number, default:0},
    totalAnswers: {type:Number, default:0},
    moduleCode: {type:String, required:true, sparse:true},
    moduleName: {type:String, trim:true, required:true},
    tags: [],
    description: {type:String, trim:true},
    answers: {type:[answerModel], default:null}
});

questionModel.index({
    title: 'text'
},{
    name: 'titleSearch index',
    default_language: 'english'
});

module.exports.Question = mongoose.model("Question", questionModel);
