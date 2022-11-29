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
  paid: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('Register', RegisterSchema);

var CommitteeSchema = new Schema({
  committee: { type: String },
  year: { type: Number },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  organization: { type: String },
  linkedIn: { type: String },
  url: { type: String },
  title: { type: String },
  department: { type: String },
  address: { type: String },
  research: { type: String }
});

module.exports = Mongoose.model('Committee', CommitteeSchema);

var BoardMembersSchema = new Schema({
  firstName:  { type: String },
  lastName:  { type: String },
  email:  { type: String },
  linkedin: { type: String },
  position:  { type: String },
  department: { type: String },
  college:  { type: String },
  school: { type: String },
  location: { type: String },
  image: { type: String },
  role: {type: String }
});

module.exports = Mongoose.model('Board', BoardMembersSchema);