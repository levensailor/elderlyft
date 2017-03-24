//*---A Spark integration using Meteor.JS
//*---Created by Jeff Levensailor jeff@levensailor.com

//*---Change sparkToken to your unique API key
const sparkToken = 'ZGU4MTJlMWEtOTk5Ny00OTQzLTljOWItYzM4ZTU3NjA2MjI3ZjA5YmYzNDgtY2Rj';
const sparkAPI = 'https://api.ciscospark.com/v1/';
var toPersonId;
var message;

Meteor.methods({
  sparkMsg: function(toPersonId, message) {
    check(toPersonId, String);
    check(message, String);
    console.log("toperson: "+toPersonId);
    console.log("message: "+message);
    var request = Npm.require('request');
    var req = {
    auth: { bearer: sparkToken },
    url: sparkAPI + 'messages',
    json: true,
    body: {
      'toPersonEmail': toPersonId,
      'text': message
     }
    };//end setup

    request.post(req, function(err, res) {
    if(err) {
    console.log("THERE WAS AN ERROR: "+err);
    } else {
      }
    });//rest call
  },//spark.msgRoom
  sparkMsgMap: function(toPersonId, file) {
    check(toPersonId, String);
    check(file, String);
    console.log("toperson: "+toPersonId);
    console.log("file: "+file);
    var request = Npm.require('request');
    var req = {
    auth: { bearer: sparkToken },
    url: sparkAPI + 'messages',
    json: true,
    body: {
      'toPersonEmail': toPersonId,
      'files': file
     }
    };//end setup

    request.post(req, function(err, res) {
    if(err) {
    console.log("THERE WAS AN ERROR: "+err);
    } else {
      }
    });//rest call
  },//spark.msgRoom

})//methods
