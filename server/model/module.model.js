var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moduleModel = new Schema({
    moduleCode: {type:String, unique:true, required:true},
    moduleName: {type:String, required:true},
    totalQuestions: {type:Number, default:0},
    topics: {type:[], default:null}
});

moduleModel.index({
  moduleName: 'text'
},{
  name: 'moduleSearch index',
  default_language: 'english'
});

module.exports.Module = mongoose.model("Module", moduleModel);
