"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLevels = {
  student: 0,
  lecturer: 1,
  admin: 2
};

let tempUserModel = new Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  accessLevel: {type: Number, default: userLevels.student},
  createdAt: { type: Date, default: Date.now }
});

tempUserModel.index({"createdAt": 1 }, { expireAfterSeconds: 3600 } );

module.exports.TempUser = mongoose.model("TempUser", tempUserModel);
