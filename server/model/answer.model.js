"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerModel = new Schema({
    answer: {type:String, required:true, trim:true},
    totalRatings: {type:Number, default:0},
    totalComments: {type:Number, default:0},
    submittedBy: {type:String, required:true, trim:true},
    ratings: {type: [String], default: []}
});

module.exports.Answer = answerModel;
