"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const secretKey = require('./../config/security.config').secretKey;

const userLevels = {
  student: 0,
  lecturer: 1,
  admin: 2
};

let userModel = new Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
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
  let expiry = new Date();
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
