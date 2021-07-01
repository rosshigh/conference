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

  router.delete('/register', asyncHandler(async (req, res) => {
    Register.find({ _id: req.params.id }).remove().exec(object => {
      res.status(200).json({ message: "register deleted" });
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
};

let smtpConfig = {
  host: 'smtprelay.uwm.edu',
  pool: true
}

var transporter = nodemailer.createTransport(smtpConfig);
// var viewEngine = handlebars.create({});
// var options = exphbs({
//   viewEngine: viewEngine,
//   viewPath: path.resolve(__dirname, '../views')
// });
// transporter.use('compile', options);

nodeMailerSendMail = function (mailObject) {
  console.log(path.resolve(__dirname, '../views'))
  console.log(mailObject)
  transporter.sendMail(mailObject)
    .then(result => {
      console.log('here')
      console.log(result)
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
      console.log('there')
      console.log( error);
    })
};

sendEmail = function (mailObject) {
  console.log("Email Sent");
  mailObject.subject = mailObject.subject;
  mailObject.from = "sapnaac@sapnacommunity.org";
  mailObject.template = 'email-template';
  mailObject.html='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" style="background:#f3f3f3!important"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width"><title></title></head><img src="http://sapnaac.ucc.uwm.edu/img/contactBanner.png"><h2>Thank you for registerting for the SAP Academic Community Conference 2021</h2><h4>Check back <a href="http://sapnaac.ucc.uwm.edu/#conf2021" target="_blank">sapnaac.ucc.uwm.edu</a> for confernce updates</h4><p>AC21 is seeking extended abstracts/research in progress on various topics exploring new technologies and issues in enterprise systems from multiple perspectives. These include but are not limited to fundamental research, practice-oriented cases, emerging areas such blockchain/robotic process automation/cloud computing/AI augmentation, and classroom use of enterprise systems.AC21 is a wonderful avenue to present research in progress and seek constructive feedback. AC21 also provides high-value networking opportunities with academics and industry professionals. Please see the full call for papers below submit today! Submissions are accepted through August 1, 2021.</p><h4>Go to <a href="http://sapnaac.ucc.uwm.edu/#conf2021" target="_blank">sapnaac.ucc.uwm.edu</a> to submit an abstract.</h4><body></body></html>';
  mailObject.text="text";

  nodeMailerSendMail(mailObject);
}