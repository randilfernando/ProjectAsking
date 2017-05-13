"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerModel = require('./answer.model').Answer;

let questionModel = new Schema({
    title: {type:String, required:true, trim:true, text:true},
    submittedBy: {type:String, required:true},
    totalRatings: {type:Number, default:0},
    totalAnswers: {type:Number, default:0},
    moduleCode: {type:String, required:true, sparse:true},
    moduleName: {type:String, trim:true, required:true},
    topic: {type:String, trim:true},
    tags: [],
    description: {type:String, trim:true},
    answers: {type:[answerModel], default:null},
    ratings: {type: [String], default: []}
});

questionModel.index({
    title: 'text'
},{
    name: 'titleSearch index',
    default_language: 'english'
});

module.exports.Question = mongoose.model("Question", questionModel);
