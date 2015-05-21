'use strict';

var Machine = require('../../../models/machine');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/machines/{machine}',
    config: {
      description: 'change machine state',
      handler: function(request, reply){
        Machine.findOne({machineName: request.params.machine}, function(err, machine){

          if(machine.state === 'good'){
            if(machine.machineType === 'washer'){
              global.washerTimer = machine.startTimer(machine);
            }else{
              global.dryerTimer = machine.startTimer(machine);
            }
            machine.state = 'inUse';
            machine.currentUser = request.auth.credentials.firebaseId;
            machine.startTime = Date.now();
            machine.save();
            // machine.startTimer(function(){}, machine.useTime);
            return reply(machine.state);
          }
          if(machine.currentUser === request.auth.credentials.firebaseId){
            if(machine.machineType === 'washer'){
              machine.terminate(global.washerTimer);
            }else{
              console.log('inside the dryer');
              machine.terminate(global.dryerTimer);
            }
            var hist = {};
            hist.start = machine.startTime;
            hist.end = Date.now();
            hist.userId = machine.currentUser;
            machine.useHistory.push(hist);
            

            machine.state = 'good';
            machine.currentUser = '';
            machine.startTime = 0;
            machine.save();
            return reply(machine.state);
          }
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'machines.changestate'
};
