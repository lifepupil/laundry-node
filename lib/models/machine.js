/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');
var Machine;

var machineSchema = Mongoose.Schema({
  machineType: {type: String},
  machineName: {type: String},
  state: {type: String, required: true, default: 'good'},
  useTime: {type: Number, required: true, default: 3600000},
  startTime: {type: Number},
  currentUser: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  useHistory: [{
    start: {type: Date},
    end: {type: Date},
    userId: {type: String}
  }]
});

Machine = Mongoose.model('Machine', machineSchema);
module.exports = Machine;
