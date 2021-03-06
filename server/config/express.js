var logger = require('./logger');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var glob = require('glob');
var cors = require('cors');
var url  = require('url');
var onFinished = require('on-finished');
var helmet = require('helmet');
var compression = require('compression');
var favicon = require('serve-favicon');

module.exports = function(app, config) {

  logger.log('info',"Starting application");

  app.use(compression({threshold: 1}));
  app.use(helmet())
  app.use(helmet.hsts({
    maxAge: 0,
    includeSubDomains: false
  }));

  app.use(cors({origin: "*"}));
  app.use(express.static(config.root + '/public'));
  app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));

  logger.log('info',"Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
  mongoose.connection.once('open', function callback() {
    logger.log('info',"Mongoose connected to the database");
  });

  logger.log('info',"Attaching plugins");
  app.use(bodyParser.json({limit: '1000mb'}));
  app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));
  app.use(require('compression')());
  app.use(require('response-time')());

  logger.log('info',"Loading models");
  var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) { 
      require(model);
    });

  app.use(function (req, res, next) {
      onFinished(res, function (err) {
        logger.log('info',req.connection.remoteAddress + " finished request","verbose");
      });
      next();
  });

  logger.log('info',"Loading controllers");
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
      require(controller)(app, config);
  });

  // all other requests redirect to 404
  app.all("*", function (req, res, next) {
       var error = new Error('Route not found.');
        error.status = 404;
        return next(error);
  });

  // error handler for all the applications
  app.use(function (err, req, res, next) {
console.log(err.stack)        
    var url_parts = url.parse(req.url);
    switch (err.status) {
        case 401:
            code = err.status;
            var msg = {event: 'error', code: 401, message: "Unauthorized Access-" + url_parts.pathname, error: 401, ip: req.connection.remoteAddress, err: err.stack.toString()};
            break;
        case 409:
            code = err.status;
            var msg = {event: 'error', code: 409, message: "Duplicate record found-" + url_parts.pathname, error: 409, ip: req.connection.remoteAddress, err: err.stack.toString()};
            break;
        case 404:      
            code = err.status;
            var msg = {event: 'error', code: 404, message: url_parts.pathname, error: 404, ip: req.connection.remoteAddress, err: err.stack.toString()};
            break;
        default:
            code = 500;
            var msg = {event: 'error', code: 500, message: url_parts.pathname, error: 500, ip: req.connection.remoteAddress, err: err.stack.toString()};
            break;
    }
    logger.log(msg);

    return res.status(code).json(msg);

  });

};
