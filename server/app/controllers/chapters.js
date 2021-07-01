var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  ERPSimTeam = mongoose.model('ERPSimTeam'),
  Contact = mongoose.model('Contact'),
  Register = mongoose.model('Register'),
  hbs = require('handlebars'),
  asyncHandler = require('express-async-handler'),
  nodemailer = require('nodemailer'),
  handlebars = require('express-handlebars'),
  path = require('path'),
  fs = require('fs'),
  exphbs = require('nodemailer-express-handlebars');

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

  router.post('/email', asyncHandler(async (req, res) => {
    console.log(req.body)
    let mailObject = {};
    mailObject.to = req.body.email;
    mailObject.subject = "Registration for AC21 confirmed";
    mailObject.from = "sapnaac@sapnacommunity.org";
    mailObject.template = 'email-template';
    sendEmail(mailObject);
    res.status(200).json('Email sent');
  }));

  router.delete('/register', asyncHandler(async (req, res) => {
    Register.find({ _id: req.params.id }).remove().exec(object => {
      res.status(200).json({ message: "register deleted" });
    })
  }));
};

let smtpConfig = {
  host: 'smtprelay.uwm.edu',
  pool: true
}

var transporter = nodemailer.createTransport(smtpConfig);
var viewEngine = handlebars.create({});
var options = exphbs({
  viewEngine: viewEngine,
  viewPath: path.resolve(__dirname, '../views')
});
transporter.use('compile', options);

nodeMailerSendMail = function (mailObject) {
  var thisMailObject = {
    subject: mailObject.subject,
    from: mailObject.from,
    to: mailObject.to,
    template: mailObject.template
  };
  transporter.sendMail(thisMailObject)
    .then(result => {
      var emailLog = new EmailLog({
        email: thisMailObject.to,
        subject: thisMailObject.subject,
        body: JSON.stringify(thisMailObject),
        from: thisMailObject.from,
        topic: thisMailObject.topic ? thisMailObject.topic : ""
      });
      // emailLog.save();
      console.log(emailLog);
    })
    .catch(error => {
      console.log( error);
    })
};

sendEmail = function (mailObject) {
  console.log("Email Sent");
  mailObject.subject = mailObject.subject;
  mailObject.from = "sapnaac@sapnacommunity.org";
  mailObject.template = 'email-template';

  nodeMailerSendMail(mailObject);
}