var request = require('request');

function sendMessage(message){
  request({
    url: 'http://textbelt.com/text',
    form: {number: '3605098185', message: 'test message'}
  });
  return true;
}

module.exports = { sendMessage:sendMessage };
