//For Patient Data
//THIS IS HIPAA COMPLIANT I TELL YOU!

patientData = "PatientData";  // avoid typos, this string occurs many times.

PatientData = new Mongo.Collection(patientData);

Meteor.methods({
  /**
   * Invoked by autoform to add a new Patient Data record.
   * @param doc The PatientData document.
   */
  addPatientData: function(doc) {
    console.log("Adding", doc);
    check(doc, PatientData.simpleSchema());
    PatientData.insert(doc, function(err, docID) {console.log("DocID: ", docID);});
  },
  /**
   *
   * Invoked by autoform to update a Patient Data record.
   * @param doc The PatientData document.
   * @param docID It's ID.
   */
  updatePatientData: function(doc, docID) {
    console.log("Updating", doc);
    check(doc, PatientData.simpleSchema());
    PatientData.update({_id: docID}, doc);
  }
});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(patientData, function () {
    return PatientData.find();
  });
}

/**
 * Create the schema for Patient Data.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
PatientData.attachSchema(new SimpleSchema({
  name: {
    label: "Name",
    type: String,
    optional: false,
    max: 20,
    autoform: {
      placeholder: "John Doe"
    }
  },
  number: {
    label: "Number",
    type: String,
    optional: true,
    max: 20,
    autoform: {
      placeholder: '12223334444',
      rows: 1
    }
  },
  address: {
    label: "Address",
    type: String,
    optional: true,
    autoform: {
      placeholder: '123 Cedar St',
      rows: 1
    }
  },
  city: {
    label: "City",
    type: String,
    optional: false,
    autoform: {
      placeholder: 'Raleigh',
      rows: 1
    }
  },
  state: {
    label: "State",
    type: String,
    optional: false,
    allowedValues: ['NC','SC','FL','GA'],
    autoform: {
      options: [
        {label: "NC", value: "NC"},
        {label: "SC", value: "SC"},
        {label: "FL", value: "FL"},
        {label: "GA", value: "GA"}
      ]
    }
  },
  zip: {
    label: "Zip",
    type: Number,
    optional: false,
    autoform: {
      placeholder: '27604',
      rows: 1
    }
  },
}));
