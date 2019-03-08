var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 80,
    db: 'mongodb://127.0.0.1/conf-dev',
    corsDomain: 'http://localhost:5000',
    secret: "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
    uploads: './public/uploadedFiles',
    smtp: 'smtps://rhightower@gmail.com:Kinja1@3@smtp.gmail.com',
    emailAddress: 'ucc@uwm.edu',
    emailNotification: 'hightowe@uwm.edu,rhightower@gmail.com'
  },
  production: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 80,
    db: 'mongodb://localhost/conf',
    corsDomain: 'http://conference.ucc.uwm.edu',
    smtp: 'smtprelay.uwm.edu',
    emailAddress: 'ucc@uwm.edu',
    emailNotification: 'hightowe@uwm.edu,ucc@uwm.edu'
  }
};

module.exports = config[env];
