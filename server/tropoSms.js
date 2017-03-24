//*---tropoSms.js is the listener for the Elderlyft
//*---Created by Jeff Levensailor jeff@levensailor.com

//*---Change tropoToken to your unique API key
const tropoToken = '47796441427069674942584841506f7553796e6f76736b53594a66676c75466b7077704757684c6a6741466a';
const url = 'https://api.tropo.com/1.0/sessions';

Meteor.methods({
  tropoSms: function(number, message) {
    check(number, String);
    check(message, String);
    var request = Npm.require('request');
    var options = { method: 'POST',
      url: url,
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body:
       { token: tropoToken,
         numberToDial: number,
         msg: message },
      json: true };//options

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    });//request
  },//tropoSms

})//methods
