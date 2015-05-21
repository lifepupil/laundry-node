'use strict';

var Package = require('../../../package.json');
var Message = require('../../models/message.js');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/version',
    config: {
      description: 'Get the app version',
      handler: function(request, reply){
        Message.sendMessage();
        return reply({version: Package.version});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'version'
};
