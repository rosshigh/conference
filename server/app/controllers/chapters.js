var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  ERPSimTeam = mongoose.model('ERPSimTeam'),
  Contact = mongoose.model('Contact'),
  Register = mongoose.model('Register'),
  asyncHandler = require('express-async-handler');

module.exports = function (app) {
  app.use('/api', router);

  router.get('/teams', asyncHandler(async (req, res) => {
    var query = ERPSimTeam.find();
    query.exec().then(object => {
        res.status(200).json(object);
    });
  }));

  router.post('/teams', asyncHandler(async (req, res) => {
    var team = new ERPSimTeam(req.body);
    team.save().then(object => {
        res.status(200).json(object);
    });
  }));

  router.put('/teams', asyncHandler(async (req, res) => {
    ERPSimTeam.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false })
    .then(object => {
      res.status(200).json(object);
    })
  }));

  router.delete('/teams', asyncHandler(async (req, res) => {
    ERPSimTeam.find({ _id: req.params.id }).remove().exec(object => {
        res.status(200).json({ message: "chapter deleted" });
    })
  }));

  router.get('/contacts', asyncHandler(async (req, res) => {
    var query = Contact.find();
    query.exec().then(object => {
        res.status(200).json(object);
    });
  }));

  router.post('/contacts', asyncHandler(async (req, res) => {
    var team = new Contact(req.body);
    team.save().then(object => {
        res.status(200).json(object);
    });
  }));

  router.put('/contacts', asyncHandler(async (req, res) => {
    Contact.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false })
    .then(object => {
      res.status(200).json(object);
    })
  }));

  router.delete('/contacts', asyncHandler(async (req, res) => {
    Contact.find({ _id: req.params.id }).remove().exec(object => {
        res.status(200).json({ message: "contact deleted" });
    })
  }));

  router.get('/register', asyncHandler(async (req, res) => {
    var query = Register.find();
    query.exec().then(object => {
        res.status(200).json(object);
    });
  }));

  router.post('/register', asyncHandler(async (req, res) => {
    var register = new Register(req.body);
    register.save().then(object => {
        res.status(200).json(object);
    });
  }));

  router.put('/register', asyncHandler(async (req, res) => {
    Register.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false })
    .then(object => {
      res.status(200).json(object);
    })
  }));

  router.delete('/register', asyncHandler(async (req, res) => {
    Register.find({ _id: req.params.id }).remove().exec(object => {
        res.status(200).json({ message: "register deleted" });
    })
  }));
};