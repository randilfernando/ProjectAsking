var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var secretKey = require('./../config/security.config').secretKey;

var userLevels = {
  student: 0,
  lecturer: 1,
  admin: 2
}

var userModel = new Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: String,
  accessLevel: {type: Number, default: userLevels.student},
  subscribedModules: [{type: Schema.Types.ObjectId, ref: 'Module'}]
});

userModel.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userModel.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userModel.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    accessLevel: this.accessLevel,
    exp: parseInt(expiry.getTime() / 1000),
  }, secretKey);
};

module.exports.User = mongoose.model("User", userModel);
