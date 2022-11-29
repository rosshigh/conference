var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  ERPSimTeam = mongoose.model('ERPSimTeam'),
  Contact = mongoose.model('Contact'),
  Register = mongoose.model('Register'),
  Committee = mongoose.model('Committee'),
  Board = mongoose.model('Board'),
  hbs = require('handlebars'),
  asyncHandler = require('express-async-handler');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('');

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

  router.get('/register/:id', asyncHandler(async (req, res) => {
    var query = Register.findById(req.params.id);
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

  router.put('/register/pay/:id', asyncHandler(async (req, res) => {
    Register.findById(req.params.id)
      .then(object => {
        object.paid = true;
        object.save()
          .then(result => {
            res.status(200).json(result);
          });
      });
  }));

  router.delete('/register', asyncHandler(async (req, res) => {
    Register.find({ _id: req.params.id }).remove().exec(object => {
      res.status(200).json({ message: "register deleted" });
    })
  }));

  router.get('/register/checkEmail/:email', asyncHandler(async (req, res) => {
    var value = req.params.email.toLowerCase();

    var query = Register.findOne({ email: { $regex: new RegExp('^' + value, 'i') } });
    query.exec().then(object => {
      if (object) {
        res.status(200).json({ status: 'unavailable', registrant: object });
      } else {
        res.status(404).json({ status: 'available' });
      }
    });
  }));

  router.post('/email', asyncHandler(async (req, res) => {
    console.log(req.body)
    let mailObject = {};
    mailObject.fullName = req.body.firstName + " " + req.body.lastName;
    mailObject.to = req.body.email;
    mailObject.subject = "Registration for AC21 confirmed";
    sendEmail(mailObject);
    res.status(200).json('Email sent');
  }));

  router.get('/committees', asyncHandler(async (req, res) => {
    var query = Committee.find();
    query.exec().then(object => {
      res.status(200).json(object);
    });
  }));

  router.post('/committees', asyncHandler(async (req, res) => {
    var team = new Committee(req.body);
    team.save().then(object => {
      res.status(200).json(object);
    });
  }));

  router.put('/committees', asyncHandler(async (req, res) => {
    Committee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false })
      .then(object => {
        res.status(200).json(object);
      })
  }));

  router.delete('/committees', asyncHandler(async (req, res) => {
    Committee.find({ _id: req.params.id }).remove().exec(object => {
      res.status(200).json({ message: "committee deleted" });
    })
  }));

  router.get('/board', asyncHandler(async (req, res) => {
    var query = Board.find().sort({lastName: 'asc'});
    query.exec().then(object => {
      res.status(200).json(object);
    });
  }));

  router.post('/board', asyncHandler(async (req, res) => {
    var team = new Board(req.body);
    team.save().then(object => {
      res.status(200).json(object);
    });
  }));

  router.put('/board', asyncHandler(async (req, res) => {
    Board.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false })
      .then(object => {
        res.status(200).json(object);
      })
  }));

  router.delete('/board', asyncHandler(async (req, res) => {
    Board.find({ _id: req.params.id }).remove().exec(object => {
      res.status(200).json({ message: "boardmember deleted" });
    })
  }));
};

function sendEmail(obj) {

  let emailBody = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" style="background:#f3f3f3!important"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width"><title></title></head><img src="http://sapnaac.ucc.uwm.edu/img/contactBannerV7.png"><h2>Thank you ' + obj.fullName + ' for registering for the SAP Academic Community Conference 2021</h2><h4>Check back <a href="http://sapnaac.ucc.uwm.edu/#conf2021" target="_blank">sapnaac.ucc.uwm.edu</a> for conference updates</h4><p>AC21 is seeking extended abstracts/research in progress on various topics exploring new technologies and issues in enterprise systems from multiple perspectives. These include but are not limited to fundamental research, practice-oriented cases, emerging areas such blockchain/robotic process automation/cloud computing/AI augmentation, and classroom use of enterprise systems.AC21 is a wonderful avenue to present research in progress and seek constructive feedback. AC21 also provides high-value networking opportunities with academics and industry professionals. Please see the full call for papers below submit today! Submissions are accepted through August 1, 2021.</p><h4>Go to <a href="http://sapnaac.ucc.uwm.edu/#conf2021" target="_blank">sapnaac.ucc.uwm.edu</a> to submit an abstract.</h4><body></body></html>';

  let msg = {
    to: obj.to, // Change to your recipient
    from: 'sapnaac@sapnacommunity.org', // Change to your verified sender
    subject: obj.subject,
    text: 'Thank you, ' + obj.fullName + ' for registering for the SAP Academic Community Conference 2021',
    html: emailBody,
  }

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })
}