/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');
var User;

var userSchema = Mongoose.Schema({
  firebaseId: {type: String, required: true},
  name: {type: String, required: true},
  mobile: {type: Number, required: true},
  email: {type: String, required: true},
  admin: {type: Boolean, required: true},
  karma: {type: Number, required: true, default: 100},
  createdAt: {type: Date, required: true, default: Date.now}
});

User = Mongoose.model('User', userSchema);
module.exports = User;
