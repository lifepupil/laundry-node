'use strict';

var Hapi = require('hapi');
var Mongoose = require('mongoose');
var Plugins = require('./tools/plugins');
var Server = require('./config/server');
var Config = require('./config');

exports.init = function(cb){
  var server = new Hapi.Server(Server);
  // var listener = server.listener;
  
  server.app.environment = Config.get();
  server.connection({port: server.app.environment.PORT});
  var listener = server.listener;
  var io = require('socket.io')(listener);
  
  io.on('connection', function(socket){
    console.log('sockets active');
    socket.emit('hello!');
    socket.on('burp', function(){
      socket.emit('excuse you');
    });
  });
  Mongoose.connect(server.app.environment.MONGO_URL);
  

  Mongoose.connection.once('open', function(){
    server.register(Plugins, function(pluginErr){
      if(pluginErr){ return cb(pluginErr); }
      
      

      server.auth.strategy('token', 'jwt', true, server.plugins.authentication.authenticate);
      server.start(function(serverErr){
        return cb(serverErr, server);
      });
    });
  });
};
