var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var AgendaSchema = new Schema({
    name: { type: String },
    agendaDate: { type: Date },
    description: { type: String },
    presenters: { type: String },
    location: { type: String }
});

module.exports = Mongoose.model('Agenda', AgendaSchema);