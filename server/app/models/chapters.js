var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;
// ,
// Bcrypt = require('bcryptjs');

var TeamSchema = new Schema({
  institution: { type: String },
  coach: { type: String },
  coachEmail: { type: String },
  students: [{
    name: { type: String },
    email: { type: String }
  }
  ],
  createdDate: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('ERPSimTeam', TeamSchema);


var ContactSchema = new Schema({
  name: { type: String },
  email: { type: String },
  organization: { type: String },
  createdDate: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('Contact', ContactSchema);

var RegisterSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  organization: { type: String },
  event: { type: String },
  discipline: { type: String },
  relationship: { type: String },
  experience: { type: String },
  country: { type: String },
  role: { type: String },
  createdDate: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('Register', RegisterSchema);