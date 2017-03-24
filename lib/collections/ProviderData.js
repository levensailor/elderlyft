//For Provider Data

providerData = "ProviderData";  // avoid typos, this string occurs many times.

ProviderData = new Mongo.Collection(providerData);

Meteor.methods({
  /**
   * Invoked by autoform to add a new Provider Data record.
   * @param doc The ProviderData document.
   */
  addProviderData: function(doc) {
    console.log("Adding", doc);
    check(doc, ProviderData.simpleSchema());
    ProviderData.insert(doc, function(err, docID) {console.log("DocID: ", docID);});
  },
  /**
   *
   * Invoked by autoform to update a Provider Data record.
   * @param doc The ProviderData document.
   * @param docID It's ID.
   */
  updateProviderData: function(doc, docID) {
    console.log("Updating", doc);
    check(doc, ProviderData.simpleSchema());
    ProviderData.update({_id: docID}, doc);
  }
});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(providerData, function () {
    return ProviderData.find();
  });
}


/**
 * Create the schema for Provider Data.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
ProviderData.attachSchema(new SimpleSchema({
  name: {
    label: "Name",
    type: String,
    optional: false,
    max: 50,
    autoform: {
      group: providerData,
      placeholder: "Jane Doe"
    }
  },
  sparkid: {
    label: "SparkID",
    type: String,
    optional: true,
    max: 50,
    autoform: {
      group: providerData,
      placeholder: 'jane@presidio.com',
      rows: 1
    }
  },
  number: {
    label: "Number",
    type: String,
    optional: true,
    max: 50,
    autoform: {
      group: providerData,
      placeholder: '12223334444',
      rows: 1
    }
  },
  address: {
    label: "Address",
    type: String,
    optional: true,
    autoform: {
      group: providerData,
      placeholder: '123 Cedar St',
      rows: 1
    }
  },
  city: {
    label: "City",
    type: String,
    optional: false,
    autoform: {
      group: providerData,
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
      group: providerData,
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
      group: providerData,
      placeholder: '27604',
      rows: 1
    }
  },
}));
