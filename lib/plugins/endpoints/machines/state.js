'use strict';

var Machine = require('../../../models/machine');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/machines/{machine}',
    config: {
      description: 'get machine state',
      handler: function(request, reply){
        Machine.findOne({machineName: request.params.machine}, function(err, machine){
          return reply(machine.state);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'machines.state'
};
