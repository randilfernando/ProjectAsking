"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let moduleModel = new Schema({
    moduleCode: {type:String, unique:true, required:true},
    moduleName: {type:String, required:true},
    totalQuestions: {type:Number, default:0},
    topics: {type: [String], default:null}
});

moduleModel.index({
  moduleName: 'text'
},{
  name: 'moduleSearch index',
  default_language: 'english'
});

module.exports.Module = mongoose.model("Module", moduleModel);
