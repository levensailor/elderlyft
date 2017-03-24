/**
 * A list of sample patients to pre-fill the Collection.
 * @type {*[]}
 */
var patientData = [
  {name: "Mary Foo", bio: "I like biology.", hobbies: ["Surfing", "Running"], level: "Freshman", gpa: 1, majors: ["Biology"]}
];

/**
 * Initialize the PatientData collection if empty.
 */
if (PatientData.find().count() === 0) {
  _.each(patientData,  function(patient) {
    PatientData.insert(patient);
  });
}
