/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');
var Machine;
// var Hapi = require('hapi');
// var Server = require('../config/server');
// var newServer = new Hapi.Server(Server);
// newServer.connection({port: 8080});
// var io = require('socket.io')(newServer);
// console.log('io',io);
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
// io.on('connection', function(socket){
//   console.log('sockets active from server.js');
//   socket.emit('hello!');
//   socket.on('burp', function(){
//     socket.emit('excuse you');
//   });
// });
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
