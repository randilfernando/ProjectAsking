var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moduleModel = new Schema({
    moduleCode: {type:String, required:true},
    moduleName: {type:String, required:true},
    totalAnswers: {type:Number, default:0},
    topics: {type:[], default:null}
});

module.exports.Module = mongoose.model("Module", moduleModel);