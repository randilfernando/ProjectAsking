var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerModel = new Schema({
    answer: {type:String, required:true, trim:true},
    totalRating: {type:Number, default:0},
    totalComments: {type:Number, default:0},
    submittedBy: {type:String, required:true, trim:true}
});

module.exports.Answer = answerModel;
