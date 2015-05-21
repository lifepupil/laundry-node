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
  currentUser: {type: String},
  useHistory: [{
    start: {type: Date},
    end: {type: Date},
    userId: {type: String}
  }]
});

machineSchema.methods.startTimer = function(thisMachine){
  return setTimeout(function(){
    // sendMessage();
    thisMachine.state = 'done';
    thisMachine.save();
    console.log('inside the start timer - machine.useTime', thisMachine.useTime);
  }, 10000);
};

machineSchema.methods.terminate = function(terminatedMachine){
  clearTimeout(terminatedMachine);
};

Machine = Mongoose.model('Machine', machineSchema);
module.exports = Machine;
