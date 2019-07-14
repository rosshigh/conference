var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Bcrypt = require('bcryptjs');


  var FileSchema = new Schema({
    category: { type: String },
    title: { type: String },
    file: { 
      fileName: { type: String },
      originalFileName:  { type: String },
      dateCreated: { type: Date, default: Date.now }
    }
  });

  module.exports = Mongoose.model('File', FileSchema);

var AgendaSchema = new Schema({
    name: { type: String },
    agendaDate: { type: Date },
    description: { type: String },
    presenters: { type: String },
    location: { type: String }
});

module.exports = Mongoose.model('Agenda', AgendaSchema);

var PersonSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  university: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, default: 'user' },
  dateRegistered: { type: Date, default: Date.now },
  abstracts: [Schema.Types.ObjectId ]
});

PersonSchema.pre('save', function(next){
  var person = this;
  if (this.isModified('password') || this.isNew) {
        Bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }         
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }               
                person.password = hash;             
                next();
            });
        });
    } else {
        return next();
    }
});

PersonSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = Mongoose.model('Person', PersonSchema);

var Abstractchema = new Schema({
  personId: { type: Schema.Types.ObjectId }, 
  file: { 
    fileName: { type: String },
    originalFileName:  { type: String },
    dateCreated: { type: Date, default: Date.now }
  },
  title: { type: String },
  description: { type: String },
  agendaId: { type: Schema.Types.ObjectId }, 
  track: { type: String },
  status: { type: String, default: 'Submitted'},
  reviewers: [Schema.Types.ObjectId ],
  reviews: [{
    fileName: { type: String },
    originalFileName:  { type: String },
    dateCreated: { type: Date, default: Date.now }
  }]
});

module.exports = Mongoose.model('Abstract', Abstractchema);