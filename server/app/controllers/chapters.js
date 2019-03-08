var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('Agenda'),
  logger = require('../../config/logger');

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/agenda',  function(req, res, next){
    logger.log('info','Get agenda',"verbose");
    
    var query = Model.find();
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/agenda/:id',  function(req, res, next){
    logger.log('info','Get agenda ' + req.params.id,"verbose");
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/agenda',  function(req, res, next){
     logger.log('info','Create a chapter',"verbose");

    var chapter =  new Model(req.body);
    chapter.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/agenda',  function(req, res, next){
    logger.log('info','Update agenda ' + req.body._id,"verbose");

    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/agenda/:id',  function(req, res, next){
    logger.log('info','Delete chapter ' + req.body._id,"verbose");
    Model.find({_id: req.params.id}).remove().exec(function(err, object){
        if (err) {
            return next(err);
        } else {
            res.status(200).json({message: "chapter deleted"});
        }
    })
  });
};