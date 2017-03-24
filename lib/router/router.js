Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe("PatientData"); },
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'MainMenu'
});

Router.route('/patient', {
  name: 'AddPatientData'
});

Router.route('/provider', {
  name: 'AddProviderData'
});

Router.route('/ride', {
  name: 'AddRideData'
});

Router.route('/patient/:_id', {
  name: 'UpdatePatientData',
  data: function() { return PatientData.findOne(this.params._id); }
});
