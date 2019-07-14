var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('Agenda'),
  Person = mongoose.model('Person'),
  Abstract = mongoose.model('Abstract'),
  File = mongoose.model('File'),
  logger = require('../../config/logger'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  passportService = require('../../config/passport'),
  passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false }),
  requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/agenda', function (req, res, next) {
    logger.log('info', 'Get agenda', "verbose");

    var query = Model.find();
    query.exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/agenda/:id', function (req, res, next) {
    logger.log('info', 'Get agenda ' + req.params.id, "verbose");
    Model.findById(req.params.id, function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/agenda', function (req, res, next) {
    logger.log('info', 'Create a chapter', "verbose");

    var chapter = new Model(req.body);
    chapter.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/agenda', function (req, res, next) {
    logger.log('info', 'Update agenda ' + req.body._id, "verbose");

    Model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }, function (err, result) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/agenda/:id', function (req, res, next) {
    logger.log('info', 'Delete chapter ' + req.body._id, "verbose");
    Model.find({ _id: req.params.id }).remove().exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({ message: "chapter deleted" });
      }
    })
  });

  //Person

  router.route('/api/people/login')
    .post(requireLogin, login);

  router.get('/api/people', function (req, res, next) {
    logger.log('info', 'Get people', "verbose");

    var query = Person.find();
    query.exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/people/:id', function (req, res, next) {
    logger.log('info', 'Get people ' + req.params.id, "verbose");
    Person.findById(req.params.id, function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/people', function (req, res, next) {
    logger.log('info', 'Create a people', "verbose");

    var chapter = new Person(req.body);
    chapter.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/people', function (req, res, next) {
    logger.log('info', 'Update people ' + req.body._id, "verbose");

    Person.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }, function (err, result) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/people/:id', function (req, res, next) {
    logger.log('info', 'Delete people ' + req.body._id, "verbose");
    Person.find({ _id: req.params.id }).remove().exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({ message: "people deleted" });
      }
    })
  });

  router.put('/api/people/password/:id', function (req, res, next) {
    logger.log('info', 'Update Person password [%s]', req.params.id, 'verbose');
    Person.findById(req.params.id, function (err, result) {
      if (err) {
        return next(err);
      } else {
        result.password = req.body.password;
        result.save(function (err, person) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(person);
          }
        });
      }
    })
  });

  //Abstract
  router.get('/api/abstract', function (req, res, next) {

    var query = Abstract.find();
    query.sort({ 'title': 1 })
      .populate({ path: 'personId', model: 'Person' })
      .populate({ path: 'reviewers', model: 'Person' })
    query.exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/abstract/:id', function (req, res, next) {
    logger.log('info', 'Get abstract ' + req.params.id, "verbose");
    var query = Abstract.find({ _id: req.params.id })
      .populate({ path: 'personId', model: 'Person' })
      .populate({ path: 'reviewers', model: 'Person' })
    query.exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object[0]);
      }
    });
  });

  router.get('/api/abstract/person/:id', function (req, res, next) {
    logger.log('info', 'Get abstract ' + req.params.id, "verbose");
    Abstract.find({ personId: req.params.id }, function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/abstract', function (req, res, next) {
    logger.log('info', 'Create a abstract', "verbose");

    var chapter = new Abstract(req.body);
    chapter.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/abstract', function (req, res, next) {
    logger.log('info', 'Update abstract ' + req.body._id, "verbose");

    Abstract.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }, function (err, result) {
      if (err) {
        return next(err);
      } else {
        var query = Abstract.find({ _id: result._id })
          .populate({ path: 'personId', model: 'Person' })
          .populate({ path: 'reviewers', model: 'Person' })
        query.exec(function (err, object) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(object);
          }
        })
      }
    })
  });

  router.delete('/api/abstract/:id', function (req, res, next) {
    logger.log('info', 'Delete abstract ' + req.body._id, "verbose");
    Abstract.find({ _id: req.params.id }).remove().exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({ message: "abstract deleted" });
      }
    })
  });

  var storageTech = multer.diskStorage({
    destination: function (req, file, cb) {

      var path = config.uploads + '/abstracts';

      mkdirp(path, function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      cb(null, req.params.id + file.originalname.substring(file.originalname.indexOf('.')));
    }
  });

  var uploadTechnotes = multer({ storage: storageTech });

  router.post('/api/abstract/upload/:id', uploadTechnotes.any(), function (req, res, next) {
    logger.log('info', 'Upload File ', 'verbose');
    Abstract.findById(req.params.id, function (err, abstract) {
      if (err) {
        return next(err);
      } else {
        abstract.file = {
          originalFileName: req.files[0].originalname,
          fileName: req.files[0].filename,
          dateCreated: new Date()
        };
        abstract.save(function (err, abstract) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(abstract);
          }
        });
      }
    });
  });

  var reviewTech = multer.diskStorage({
    destination: function (req, file, cb) {

      var path = config.uploads + '/reviews';

      mkdirp(path, function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      cb(null, req.params.id + file.originalname.substring(file.originalname.indexOf('.')));
    }
  });

  var uploadReviews = multer({ storage: reviewTech });

  router.post('/api/abstract/review/:id', uploadReviews.any(), function (req, res, next) {
    logger.log('info', 'Upload Review ', 'verbose');
    Abstract.findById(req.params.id, function (err, abstract) {
      if (err) {
        return next(err);
      } else {
        if (!abstract.reviews) abstract.reviews = [];
        abstract.reviews.push({
          originalFileName: req.files[0].originalname,
          fileName: req.files[0].filename,
          dateCreated: new Date()
        });
        abstract.save(function (err, abstract) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(abstract);
          }
        });
      }
    });
  });

  router.get('/api/files', function (req, res, next) {
    logger.log('info', 'Get files', "verbose");

    var query = File.find();
    query.sort('category');
    query.exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });


  var fileTech = multer.diskStorage({
    destination: function (req, file, cb) {

      var path = config.uploads + '/files';

      mkdirp(path, function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      cb(null, req.params.title + file.originalname.substring(file.originalname.indexOf('.')));
    }
  });

  var uploadFile = multer({ storage: fileTech });

  router.post('/api/files/:category/:title', uploadFile.any(), function (req, res, next) {
    logger.log('info', 'Upload File ', 'verbose');
    var file = new File();
    file.category = req.params.category;
    file.title = req.params.title;
    file.file = {
      originalFileName: req.files[0].originalname,
      fileName: req.files[0].filename,
      dateCreated: new Date()
    };
    file.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });
};