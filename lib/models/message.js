/*
var Message = require('../../models/message.js');

var mobile = '3605098185';
var message = 'This is a test message.';
Message.sendMessage({number: mobile, message: message}); (takes an object)
*/


var request = require('request');

function sendMessage(message){
  request({
    url: 'http://textbelt.com/text',
    method: 'POST',
    form: {number: message.number, message: message.message}
  },
  function(error, response, body){
    if(error){
      console.log(error);
    }else{
      console.log(response.statusCode, body);
    }
  });
  return true;
}

module.exports = { sendMessage:sendMessage };
