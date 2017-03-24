//For Transactions between Patient and Provider

rideData = "RideData";  // avoid typos, this string occurs many times.
RideData = new Mongo.Collection(rideData);

Meteor.methods({
  /**
   * Invoked by autoform to add a new Ride Data record.
   * @param doc The RideData document.
   */
  addRideData: function(doc) {
    console.log("Adding", doc);
    check(doc, RideData.simpleSchema());
    RideData.insert(doc, function(err, docID) {
      if (typeof docID !== "undefined"){
      var patient = RideData.findOne({_id: docID}).patient;
      var providerName = RideData.findOne({_id: docID}).provider;
      var providerSpark = ProviderData.findOne({name: providerName}).sparkid;
      var patientName = RideData.findOne({_id: docID}).patient;
      var patientAdd = PatientData.findOne({name: patientName}).address;
      var patientCity = PatientData.findOne({name: patientName}).city;
      var patientSt = PatientData.findOne({name: patientName}).state;
      var patientZip = PatientData.findOne({name: patientName}).zip;
      var date = RideData.findOne({_id: docID}).date;
      var message = "Special Needs person requires a lift!: \n"+patient+"\n"+date+"\n"+patientAdd+"\n"+patientCity+" "+patientSt+"\n"+patientZip;
      var googleApiKey = "AIzaSyCki3ZyudDc--brJmAbjP_zV7TtUj8iPrs";
      var googleApi = "https://maps.googleapis.com/maps/api/staticmap?center=";
      var addPlus = patientAdd.split(' ').join('+');
      console.log("thisplus: "+addPlus);
      var file = googleApi+addPlus+"+"+patientZip+"&zoom=14&size=400x400&key="+googleApiKey;
      Meteor.call(
      'sparkMsg',
      providerSpark,
      message,
        function(err, res) {
          if(err) {
            console.log(err);
          } else {
            }
       }
     )//sparkMsg
      Meteor.call(
      'sparkMsgMap',
      providerSpark,
      file,
      function(err, res) {
        if(err) {
          console.log(err);
        } else {
         }
       }
     )//sparkMsgMap


    }
    else {console.log("dang, didn't work")}
    });
    },//addRideData
  /**
   *
   * Invoked by autoform to update a Ride Data record.
   * @param doc The RideData document.
   * @param docID It's ID.
   */
  updateRideData: function(doc, docID) {
    console.log("Updating", doc);
    check(doc, RideData.simpleSchema());
    RideData.update({_id: docID}, doc);
  }
});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(rideData, function () {
    return RideData.find();
  });
}


/**
 * Create the schema for Ride Data.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
 RideData.attachSchema(new SimpleSchema({
   patient: {
     label: "Patient",
     type: String,
     optional: false,
     autoform: {
       type: "select",
       options: function () {
           return PatientData.find().map(function (c) {
               return {label: c.name, value: c.name};
           });
     }
   }
   },
    provider: {
      label: "Provider",
      type: String,
      optional: false,
      allowedValues: ['Jeff Levensailor','Maybelyn Plecic','Jose Felix'],
      autoform: {
        options: [
          {label: "Jeff Levensailor, MD", value: "Jeff Levensailor"},
          {label: "Maybelyn Plecic, MD", value: "Maybelyn Plecic"},
          {label: "Jose Felix, LPC", value: "Jose Felix"}
        ]
      }
    },
   date: {
      type: Date,
      optional: false,
      label: "Date Requested",
      min: new Date("2017-01-21T00:00:00.000Z"),
      autoform: {
        value: new Date("2017-10-21T00:00:00.000Z")
      }
   }
}));
