

transactions = "Transactions";  // avoid typos, this string occurs many times.
Transactions = new Mongo.Collection(transactions);

  /**
   * Invoked by autoform to add a new Ride Data record.
   * @param doc The Transactions document.
   */

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(transactions, function () {
    return Transactions.find();
  });
}


/**
 * Create the schema for Ride Data.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
 Transactions.attachSchema(new SimpleSchema({
    uuid: {
       type: String,
       optional: true,
    },
    patientNumber: {
      type: String,
      optional:true,
    }
}));
