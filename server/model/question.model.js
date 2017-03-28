var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answerModel = require('./answer.model');

var questionModel = new Schema({
    title: {type:String, required:true, trim:true, text:true},
    submittedBy: {type:String, required:true},
    totalRating: {type:Number, default:0},
    totalAnswers: {type:Number, default:0},
    moduleId: {type:String, required:true},
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