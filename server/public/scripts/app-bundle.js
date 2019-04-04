define('app',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.map([{
        route: ['', 'landing'],
        moduleId: './modules/home/landing',
        name: 'Landing',
        settings: {
          auth: false,
          roles: []
        },
        title: 'Conference'
      }, {
        route: 'home',
        moduleId: './modules/home/home',
        name: 'Home',
        settings: {
          auth: false,
          roles: []
        },
        title: 'Conference'
      }, {
        route: 'register',
        moduleId: './modules/home/register',
        name: 'Register',
        settings: {
          auth: false,
          roles: []
        },
        title: 'Conference'
      }, {
        route: 'logistics',
        moduleId: './modules/home/logistics',
        name: 'Logistics',
        settings: {
          auth: false,
          roles: []
        },
        title: 'Logistics'
      }, {
        route: 'agenda',
        moduleId: './modules/home/agenda',
        name: 'Agenda',
        settings: {
          auth: false,
          roles: []
        },
        title: 'Conference'
      }, {
        route: 'submit',
        moduleId: './modules/home/submit',
        name: 'Submission',
        settings: {
          auth: false,
          roles: []
        },
        title: 'Conference'
      }, {
        route: 'contact',
        moduleId: './modules/home/contact',
        name: 'Contact',
        settings: {
          auth: false,
          roles: []
        },
        title: 'Contact'
      }]);
    };

    return App;
  }();

  _exports.App = App;
});;
define('text!app.html',[],function(){return "<template>\n  <require from=\"resources/css/styles.css\"></require>\n  <require from=\"toastr/build/toastr.min.css\"></require>\n  <nav-bar></nav-bar>\n  <div class=\"page-host\">\n    <router-view></router-view>\n  </div>\n</template>";});;
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});;
define('main',["exports", "./environment"], function (_exports, _environment) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});;
define('modules/home/agenda',["exports", "aurelia-framework", "../../resources/data/services"], function (_exports, _aureliaFramework, _services) {
  "use strict";

  _exports.__esModule = true;
  _exports.Agenda = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Agenda = (_dec = (0, _aureliaFramework.inject)(_services.Services), _dec(_class =
  /*#__PURE__*/
  function () {
    function Agenda(services) {
      this.services = services;
      this.sundayArray = [];
      this.mondayArray = [];
    }

    var _proto = Agenda.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.services.getAgenda();

              case 2:
                this.services.agendaArray.forEach(function (item) {
                  if (item.agendaDate.indexOf('Sunday') > -1) {
                    if (_this.sundayFirstItem) {
                      _this.sundayArray.push(item);
                    } else {
                      _this.sundayFirstItem = item;
                    }
                  } else {
                    if (_this.mondayFirstItem) {
                      _this.mondayArray.push(item);
                    } else {
                      _this.mondayFirstItem = item;
                    }
                  }
                });
                this.sundayRowSpan = this.sundayArray.length + 1;
                this.mondayRowSpan = this.mondayArray.length + 1;

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _activate.apply(this, arguments);
      }

      return activate;
    }();

    return Agenda;
  }()) || _class);
  _exports.Agenda = Agenda;
});;
define('text!modules/home/agenda.html',[],function(){return "<template>\r\n    <div class=\"container\" style=\"padding-top:100px;\">\r\n        <h2>Agenda</h2>\r\n\r\n\r\n        <h3>Sunday - July 14 – DAY 1</h3>\r\n        <div class=\"agenda\">\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-condensed table-bordered\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th>Date</th>\r\n                            <th>Time</th>\r\n                            <th>Event</th>\r\n                            <th>Description</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr>\r\n                            <td class=\"agenda-date\" class=\"active\" rowspan=\"${sundayRowSpan}\">\r\n                                <div class=\"dayofmonth\">14</div>\r\n                                <div class=\"dayofweek\">Sunday</div>\r\n                                <div class=\"shortdate text-muted\">July, 2019</div>\r\n                            </td>\r\n                            <td class=\"agenda-time\">\r\n                                    ${sundayFirstItem.time}\r\n                                </td>\r\n                            <td class=\"agenda-events\">\r\n                                <div class=\"agenda-event\" innerhtml.bind=\"sundayFirstItem.name\">\r\n                                </div>\r\n                            </td>\r\n                            <td class=\"agenda-events\">\r\n                                <div class=\"agenda-event\" innerhtml.bind=\"sundayFirstItem.description\">\r\n                                </div>\r\n                            </td>\r\n                        </tr>\r\n                        <tr repeat.for=\"item of sundayArray\">\r\n                            <td class=\"agenda-time\">\r\n                                ${item.time}\r\n                            </td>\r\n                            <td class=\"agenda-events\">\r\n                                <div class=\"agenda-event\" innerhtml.bind=\"item.name\">\r\n                                </div>\r\n                            </td>\r\n                            <td class=\"agenda-events\">\r\n                                <div class=\"agenda-event\" innerhtml.bind=\"item.description\">\r\n                                </div>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <p class=\"lead\">\r\n                    \r\n                </p>\r\n                <h3>Monday - July 15 – DAY 2</h3>\r\n            <div class=\"table-responsive\">\r\n                    <table class=\"table table-condensed table-bordered\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Date</th>\r\n                                <th>Time</th>\r\n                                <th>Event</th>\r\n                                <th>Description</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr>\r\n                                <td class=\"agenda-date\" class=\"active\" rowspan=\"${mondayRowSpan}\">\r\n                                    <div class=\"dayofmonth\">15</div>\r\n                                    <div class=\"dayofweek\">Monday</div>\r\n                                    <div class=\"shortdate text-muted\">July, 2019</div>\r\n                                </td>\r\n                                <td class=\"agenda-time\">\r\n                                        ${mondayFirstItem.time}\r\n                                    </td>\r\n                                <td class=\"agenda-events\">\r\n                                    <div class=\"agenda-event\" innerhtml.bind=\"mondayFirstItem.name\">\r\n                                    </div>\r\n                                </td>\r\n                                <td class=\"agenda-events\">\r\n                                    <div class=\"agenda-event\" innerhtml.bind=\"mondayFirstItem.description\">\r\n                                    </div>\r\n                                </td>\r\n                            </tr>\r\n                            <tr repeat.for=\"item of mondayArray\">\r\n                                <td class=\"agenda-time\">\r\n                                    ${item.time}\r\n                                </td>\r\n                                <td class=\"agenda-events\">\r\n                                    <div class=\"agenda-event\" innerhtml.bind=\"item.name\">\r\n                                    </div>\r\n                                </td>\r\n                                <td class=\"agenda-events\">\r\n                                    <div class=\"agenda-event\" innerhtml.bind=\"item.description\">\r\n                                    </div>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n           \r\n        </div>\r\n</template>";});;
define('modules/home/contact',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Contact = void 0;

  var Contact = function Contact() {};

  _exports.Contact = Contact;
});;
define('text!modules/home/contact.html',[],function(){return "<template>\r\n    <div class=\"container\" style=\"padding-top:100px;\">\r\n        <div class=\"card\" style=\"width: 18rem;\">\r\n            <div class=\"card-body\">\r\n              <h5 class=\"card-title\">Contact Information</h5>\r\n              <h6 class=\"card-subtitle mb-2 text-muted\">Email: cti@uwm.edu</h6>\r\n              <h6 class=\"card-subtitle mb-2 text-muted\">Phone: 414-229-3992</h6>\r\n            </div>\r\n          </div>\r\n    </div>\r\n</template>";});;
define('modules/home/home',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Home = void 0;

  var Home = function Home() {};

  _exports.Home = Home;
});;
define('text!modules/home/home.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <h1 class=\"text-center\" style=\"margin-top:100px;\">Community - Collaboration - Curriculum for Professors and Others</h1>\r\n    </div>\r\n</template>";});;
define('modules/home/landing',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Landing = void 0;

  var Landing = function Landing() {};

  _exports.Landing = Landing;
});;
define('text!modules/home/landing.html',[],function(){return "<template>\r\n    <!-- <img src=\"http://localhost/img/parallax1.jpg\" height=\"400px\"> -->\r\n    <div class=\"parallax1\" style=\"text-align:center;padding-top:25px;\">\r\n        <div class=\"caption\">\r\n            <span class=\"border\">SAP Next-Gen Chapter Conference</span>\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-8 offset-2 text-center\" style=\"margin-top:25px;\">\r\n                    <h3>Co-hosted by the University Competence Centers and SAP Next-Gen Chapters\r\n                    at the University of Wisconsin-Milwaukee and California State University, Chico</h3>\r\n                     <p> </p>\r\n                     <h3>July 14 - 15, 2019</h3>\r\n                    at University of Wisconsin-Milwaukee, Lubar School of Business\r\n                    <p></p>\r\n                    <p>Professors from SAP University Alliances / SAP Next-Gen member institutions are invited to attend the SAP Next-Gen Chapter Conference and SAP University Alliances Boot Camps July 14 – 19, 2019 at University of Wisconsin-Milwaukee, Lubar School of Business.</p>\r\n                    <p>The events are organized and co-hosted by the University Competence Centers and SAP Next-Gen Chapters at University of Wisconsin-Milwaukee and California State University, Chico. To cover costs associated with the conference and boot camps, UW-Milwaukee charges a fee for registering and attending.</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- <div class=\"container\">\r\n        <div class=\"row\"  style=\"height:300px;\">\r\n            <!-- <div class=\"col-lg-3 style=\"margin-top:25px;\"\">\r\n            <h2 class=\"underline\">Contact</h2>\r\n            <div class=\"bottomMargin\">\r\n                <span class=\"col-md-12 newsTitle topMargin\">Email: cti@uwm.edu</span>\r\n                <span innerhtml.bind=\"item.content\"></span>\r\n                <span class=\"newsUrl\"><a href.bind=\"item.url\" target=\"_blank\">more info...</a></span>\r\n              </div>\r\n        </div> -->\r\n        <!-- </div>\r\n        <div class=\"row\">\r\n            <div class=\"col text-center\">Contact: cti@uwm.edu</div>\r\n        </div>\r\n    </div>\r\n-->\r\n    <div class=\"parallax2\"></div> \r\n</template>";});;
define('modules/home/logistics',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Logistics = void 0;

  var Logistics = function Logistics() {};

  _exports.Logistics = Logistics;
});;
define('text!modules/home/logistics.html',[],function(){return "<template>\r\n    <div class=\"container\" style=\"padding-top:100px;\">\r\n        <h1>University of Wisconsin-Milwaukee</h1>\r\n \r\n        <h3>Venue</h3>\r\n        Lubar School of Business</br>         \r\n        3202 N. Maryland Avenue</br>         \r\n        Milwaukee, WI 53211\r\n        <p> </p>\r\n        <h3>Contact</h3>\r\n        Ross Hightower, Senior Lecturer and UCC Director  </br>\r\n        Phone: 414-229-4556   </br>\r\n        Emergency Phone: (414) 229-3992</br>     \r\n        Email: hightowe@uwm.edu\r\n        <p> </p>\r\n        <h3>Directions</h3>\r\n        For maps of and directions to the UWM campus, please see <a href=\"http://www4.uwm.edu/map/\" target=\"_blank\">http://www4.uwm.edu/map/</a>\r\n        <p> </p>\r\n        <h3>Parking</h3>\r\n        Parking is available in the Student Union garage and is $1.50 /hour, with a $12 daily maximum. </br>\r\n        The garage is located at 2200 E. Kenwood Blvd.\r\n        <p> </p>\r\n        <h3>Recommended Hotels</h3>\r\n        \r\n    </div>\r\n</template>";});;
define('modules/home/milwaukee',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Milwaukee = void 0;

  var Milwaukee = function Milwaukee() {};

  _exports.Milwaukee = Milwaukee;
});;
define('text!modules/home/milwaukee.html',[],function(){return "<template>\r\n    \r\n</template>";});;
define('modules/home/register',["exports", "aurelia-framework", "../../resources/utils/validation", "../../resources/data/services", "aurelia-router", "jquery", "toastr"], function (_exports, _aureliaFramework, _validation, _services, _aureliaRouter, _jquery, toastr) {
  "use strict";

  _exports.__esModule = true;
  _exports.Register = void 0;
  _validation = _interopRequireDefault(_validation);
  _jquery = _interopRequireDefault(_jquery);
  toastr = _interopRequireWildcard(toastr);

  var _dec, _class;

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Register = (_dec = (0, _aureliaFramework.inject)(_validation.default, _services.Services, _aureliaRouter.Router), _dec(_class =
  /*#__PURE__*/
  function () {
    function Register(validation, services, router) {
      this.validation = validation;
      this.services = services;
      this.router = router;
      this.validation.initialize(this);
      toastr.options.extendedTimeOut = "1000";
      toastr.options.timeOut = "1500";
    }

    var _proto = Register.prototype;

    _proto.activate = function activate() {
      this._setupValidation();
    };

    _proto._setupValidation = function _setupValidation() {
      this.validation.addRule(1, "firstName", [{
        "rule": "required",
        "message": "First Name is required",
        "value": "firstName"
      }]);
      this.validation.addRule(1, "lastName", [{
        "rule": "required",
        "message": "Last Name is required",
        "value": "lastName"
      }]);
      this.validation.addRule(1, "email", [{
        "rule": "required",
        "message": "Email is required",
        "value": "email"
      }, {
        "rule": "custom",
        "message": "Enter a valid email address",
        "valFunction": function valFunction(context) {
          return context.email.indexOf('@') > -1;
        }
      }]);
      this.validation.addRule(1, "university", [{
        "rule": "required",
        "message": "Institution is required",
        "value": "university"
      }]);
      this.validation.addRule(1, "password", [{
        "rule": "required",
        "message": "Password is required",
        "value": "password"
      }]);
      this.validation.addRule(1, "password_repeat", [{
        "rule": "custom",
        "message": "Passwords must match",
        "valFunction": function valFunction(context) {
          return context.password === context.password_repeat;
        }
      }], true);
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var person, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.validation.validate(1)) {
                  _context.next = 6;
                  break;
                }

                person = {
                  firstName: this.firstName,
                  lastName: this.lastName,
                  email: this.email,
                  university: this.university,
                  password: this.password
                };
                _context.next = 4;
                return this.services.saveRegister(person);

              case 4:
                response = _context.sent;

                if (response) {
                  toastr['success']('Your registration was saved.');
                  this.router.navigate("home");
                } else {
                  toastr['error']('There was an error saving the registration.');
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }();

    return Register;
  }()) || _class);
  _exports.Register = Register;
});;
define('text!modules/home/register.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"card\" style=\"margin-top:100px;\">\r\n            <div class=\"card-body\">\r\n                <form>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"firstName\">First name *</label>\r\n                        <input value.bind=\"firstName\" type=\"text\" class=\"form-control\" id=\"firstName\"\r\n                            aria-describedby=\"firstNameHelp\" placeholder=\"First Name\">\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"lastName\">Last name *</label>\r\n                        <input value.bind=\"lastName\" type=\"text\" class=\"form-control\" id=\"lastName\"\r\n                            aria-describedby=\"lastNameHelp\" placeholder=\"Last Name\">\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"university\">University/Company *</label>\r\n                        <input value.bind=\"university\" type=\"text\" class=\"form-control\" id=\"university\"\r\n                            aria-describedby=\"universityHelp\" placeholder=\"University\">\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"email\">Email *</label>\r\n                        <input value.bind=\"email\" type=\"email\" class=\"form-control\" id=\"email\"\r\n                            aria-describedby=\"emailHelp\" placeholder=\"Email\">\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"password\">Password *</label>\r\n                        <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\"\r\n                            aria-describedby=\"passwordHelp\" placeholder=\"Password\">\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label for=\"password_repeat\">Repeat password *</label>\r\n                        <input value.bind=\"password_repeat\" type=\"password\" class=\"form-control\" id=\"password_repeat\"\r\n                            aria-describedby=\"passwordrepeatHelp\" placeholder=\"Repeat Password\">\r\n                    </div>\r\n                    <button class=\"btn btn-primary\" click.trigger=\"save()\">Submit</button>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});;
define('modules/home/submit',["exports", "aurelia-framework", "../../resources/utils/validation", "../../resources/data/services", "aurelia-router", "../../resources/data/auth", "jquery", "toastr"], function (_exports, _aureliaFramework, _validation, _services, _aureliaRouter, _auth, _jquery, toastr) {
  "use strict";

  _exports.__esModule = true;
  _exports.Submit = void 0;
  _validation = _interopRequireDefault(_validation);
  _jquery = _interopRequireDefault(_jquery);
  toastr = _interopRequireWildcard(toastr);

  var _dec, _class;

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Submit = (_dec = (0, _aureliaFramework.inject)(_validation.default, _services.Services, _aureliaRouter.Router, _auth.Auth), _dec(_class =
  /*#__PURE__*/
  function () {
    function Submit(validation, services, router, auth) {
      this.validation = validation;
      this.services = services;
      this.router = router;
      this.auth = auth;
      this.validation.initialize(this);
      toastr.options.extendedTimeOut = "1000";
      toastr.options.timeOut = "1500";
      this.userObj = JSON.parse(sessionStorage.getItem('user'));
      this.filesToUpload = new Array();

      this._setupValidation();

      this.tracks = ["Innovations in Teaching", "High Impact Practices", "Incorporating Latest Developments in Curriculum", "Research in Teaching"];
    }

    var _proto = Submit.prototype;

    _proto._setupValidation = function _setupValidation() {
      this.validation.addRule(1, "title", [{
        "rule": "required",
        "message": "Title is required",
        "value": "title"
      }]);
      this.validation.addRule(1, "description", [{
        "rule": "required",
        "message": "Description is required",
        "value": "description"
      }]);
      this.validation.addRule(1, "track", [{
        "rule": "custom",
        "message": "Track is required",
        "valFunction": function valFunction(context) {
          return context.track != "";
        }
      }], true);
      this.validation.addRule(1, "files", [{
        "rule": "custom",
        "message": "You must select a file",
        "valFunction": function valFunction(context) {
          return context.filesToUpload.length > 0;
        }
      }], true);
      this.validation.addRule(2, "firstName", [{
        "rule": "required",
        "message": "First Name is required",
        "value": "firstName"
      }]);
      this.validation.addRule(2, "lastName", [{
        "rule": "required",
        "message": "Last Name is required",
        "value": "lastName"
      }]);
      this.validation.addRule(2, "email", [{
        "rule": "required",
        "message": "Email is required",
        "value": "email"
      }, {
        "rule": "custom",
        "message": "Enter a valid email address",
        "valFunction": function valFunction(context) {
          return context.email.indexOf('@') > -1;
        }
      }]);
      this.validation.addRule(2, "university", [{
        "rule": "required",
        "message": "Institution is required",
        "value": "university"
      }]);
      this.validation.addRule(2, "password", [{
        "rule": "required",
        "message": "Password is required",
        "value": "password"
      }]);
      this.validation.addRule(2, "password_repeat", [{
        "rule": "custom",
        "message": "Passwords must match",
        "valFunction": function valFunction(context) {
          return context.password === context.password_repeat;
        }
      }], true);
    };

    _proto.showRegister = function showRegister() {
      this.showRegisterPanel = !this.showRegisterPanel;
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var person, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.validation.validate(2)) {
                  _context.next = 6;
                  break;
                }

                person = {
                  firstName: this.firstName,
                  lastName: this.lastName,
                  email: this.email,
                  university: this.university,
                  password: this.password
                };
                _context.next = 4;
                return this.services.saveRegister(person);

              case 4:
                response = _context.sent;

                if (response) {
                  sessionStorage.setItem('user', JSON.stringify(response));
                  this.loginSuccess();
                  this.isAuthenticated = true;
                  this.showRegisterPanel = false;
                  toastr['success']('Your registration was saved.');
                } else {
                  toastr['error']('There was an error saving the registration.');
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }();

    _proto.submit =
    /*#__PURE__*/
    function () {
      var _submit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var abstract, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.validation.validate(1)) {
                  _context2.next = 6;
                  break;
                }

                abstract = {
                  title: this.title,
                  description: this.description,
                  personId: this.userObj._id,
                  track: this.track
                };
                _context2.next = 4;
                return this.services.saveAbstract(abstract, this.filesToUpload);

              case 4:
                response = _context2.sent;

                if (!response.error) {
                  toastr['success']('The abstract was uploaded successfully.');
                  this.getPersonAbstracts();
                  this.title = "";
                  this.description = "";
                  this.track = "";
                  this.filesToUpload = new Array();
                  this.files = new Array();
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submit() {
        return _submit.apply(this, arguments);
      }

      return submit;
    }();

    _proto.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    _proto.login =
    /*#__PURE__*/
    function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.auth.login(this.email, this.password);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  this.loginError = "";
                  this.loginSuccess();
                  this.isAuthenticated = this.auth.isAuthenticated();
                } else {
                  this.loginError = "Invalid credentials.";
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function login() {
        return _login.apply(this, arguments);
      }

      return login;
    }();

    _proto.loginSuccess =
    /*#__PURE__*/
    function () {
      var _loginSuccess = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.userObj = JSON.parse(sessionStorage.getItem('user'));

                if (this.userObj) {
                  sessionStorage.setItem('role', this.userObj.role);
                  this.getPersonAbstracts();
                }

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loginSuccess() {
        return _loginSuccess.apply(this, arguments);
      }

      return loginSuccess;
    }();

    _proto.getPersonAbstracts =
    /*#__PURE__*/
    function () {
      var _getPersonAbstracts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.services.getPersonAbstracts(this.userObj._id);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getPersonAbstracts() {
        return _getPersonAbstracts.apply(this, arguments);
      }

      return getPersonAbstracts;
    }();

    return Submit;
  }()) || _class);
  _exports.Submit = Submit;
});;
define('text!modules/home/submit.html',[],function(){return "<template>\r\n    <div style=\"padding-top:100px;padding-left:50px;padding-right:50px;\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-4 offset-1\">\r\n                        <form if.bind=\"!isAuthenticated && !showRegisterPanel\" class=\"form-inline my-2 my-lg-0\">\r\n                            <label if.bind=\"loginError\" style=\"color:white;margin-right:5px;\">${loginError}</label>\r\n                            <div class=\"form-group mb-2\">\r\n                                <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"loginemail\"\r\n                                    placeholder=\"Email\"></input>\r\n                            </div>\r\n                            <div class=\"form-group mx-sm-3 mb-2\">\r\n                                <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"loginpassword\"\r\n                                    placeholder=\"Password\"></input>\r\n                            </div>\r\n                            <button class=\"btn btn-primary mb-2\" click.delegate='login()'>Login</button>\r\n                            <button class=\"btn btn-primary mb-2\" style=\"margin-left:5px;\" click.delegate='showRegister()'>Register</button>\r\n                        </form>\r\n                        <div show.bind=\"showRegisterPanel\">\r\n                            <h2>Register as an Author</h2>\r\n                            <form>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"firstName\">First name *</label>\r\n                                    <input value.bind=\"firstName\" type=\"text\" class=\"form-control\" id=\"firstName\"\r\n                                        aria-describedby=\"firstNameHelp\" placeholder=\"First Name\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"lastName\">Last name *</label>\r\n                                    <input value.bind=\"lastName\" type=\"text\" class=\"form-control\" id=\"lastName\"\r\n                                        aria-describedby=\"lastNameHelp\" placeholder=\"Last Name\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"university\">University/Company *</label>\r\n                                    <input value.bind=\"university\" type=\"text\" class=\"form-control\" id=\"university\"\r\n                                        aria-describedby=\"universityHelp\" placeholder=\"University\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"email\">Email *</label>\r\n                                    <input value.bind=\"email\" type=\"email\" class=\"form-control\" id=\"email\"\r\n                                        aria-describedby=\"emailHelp\" placeholder=\"Email\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"password\">Password *</label>\r\n                                    <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\"\r\n                                        aria-describedby=\"passwordHelp\" placeholder=\"Password\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"password_repeat\">Repeat password *</label>\r\n                                    <input value.bind=\"password_repeat\" type=\"password\" class=\"form-control\"\r\n                                        id=\"password_repeat\" aria-describedby=\"passwordrepeatHelp\"\r\n                                        placeholder=\"Repeat Password\">\r\n                                </div>\r\n                                <button class=\"btn btn-primary\" style=\"margin-top:25px\"\r\n                                    click.trigger=\"save()\">Register</button>\r\n                            </form>\r\n                        </div>\r\n                        <div show.bind=\"isAuthenticated\">\r\n                                <form>\r\n                                    <h3>${userObj.firstName} ${userObj.lastName}</h3>\r\n                                    <h3>${userObj.university}</h3>\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"title\">Title *</label>\r\n                                        <input value.bind=\"title\" type=\"text\" class=\"form-control\" id=\"title\"\r\n                                            aria-describedby=\"titleHelp\" placeholder=\"Title\">\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"description\">Track *</label>\r\n                                        <select value.bind=\"track\" class=\"form-control\" id=\"track\">\r\n                                            <option value=\"\">Select a track</option>\r\n                                            <option value=\"${type}\" repeat.for=\"type of tracks\">${type}</optionp>\r\n                                        </select>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"description\">Description *</label>\r\n                                        <textarea value.bind=\"description\" type=\"text\" class=\"form-control\" id=\"description\"\r\n                                            aria-describedby=\"descriptionHelp\" placeholder=\"Description\"\r\n                                            rows=\"10\"></textarea>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-4\">\r\n                                            <label class=\"btn btn-primary\">\r\n                                                Browse for files&hellip; <input type=\"file\" style=\"display: none;\"\r\n                                                    change.delegate=\"changeFiles()\" files.bind=\"files\">\r\n                                            </label>\r\n                                            <span id=\"files\"></span>\r\n                                        </div>\r\n                                        <div class=\"col\">\r\n                                            <ul>\r\n                                                <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">\r\n                                                    ${file.name}<span click.delegate=\"removeFile($index)\"\r\n                                                        class=\"pull-right\"><i class=\"fa fa-trash\"\r\n                                                            aria-hidden=\"true\"></i></span></li>\r\n                                            </ul>\r\n                                        </div>\r\n                                    </div>\r\n                                    <button class=\"btn btn-primary\" style=\"margin-top:25px\"\r\n                                        click.trigger=\"submit()\">Submit</button>\r\n                                </form>\r\n                            </div>\r\n                    </div>\r\n                    <div class=\"col-5 offset-1\" show.bind=\"isAuthenticated\">\r\n                        <h2>Submissions</h2>\r\n                        <ul class=\"list-group\">\r\n                            <li repeat.for=\"submission of services.abstractArray\" class=\"list-group-item\">\r\n                                <h3>${submission.title}</h3>\r\n                                <h6>Status: ${submission.status}</h6>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});;
define('text!resources/css/styles.css',[],function(){return "body, html {\r\n    height: 2500px;\r\n    font: 400 15px/1.8 \"Lato\", sans-serif;\r\n  }\r\n\r\n  .toolbar {\r\n    position:fixed;\r\n    z-index:1000;\r\n    width:100%;\r\n    left:0;\r\n    background-color:ghostwhite;\r\n    }\r\n\r\n  .has-error {\r\n      color:red;\r\n  }\r\n\r\n  .underline {\r\n    text-decoration: underline;\r\n    }\r\n\r\n.caption {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 25%;\r\n    width: 100%;\r\n    text-align: center;\r\n    color: #000;\r\n}\r\n\r\n.caption span.border {\r\n    background-color: #111;\r\n    color: #fff;\r\n    padding: 18px;\r\n    font-size: 25px;\r\n    letter-spacing: 10px;\r\n}\r\n\r\n  \r\n.parallax1 {\r\n    /* The image used */\r\n    background-image: url(\"http://localhost/img/parallax1.jpg\");\r\n\r\n    /* Set a specific height */\r\n   height: 500px;\r\n\r\n    /* Create the parallax scrolling effect */\r\n    background-attachment: fixed;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n  \r\n.parallax2 {\r\n    /* The image used */\r\n    background-image: url(\"http://localhost/img/parallax1.jpg\");\r\n\r\n    /* Set a specific height */\r\n   height: 600px;\r\n\r\n    /* Create the parallax scrolling effect */\r\n    background-attachment: fixed;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n.agenda {  }\r\n\r\n/* Dates */\r\n.agenda .agenda-date { width: 170px; }\r\n.agenda .agenda-date .dayofmonth {\r\n  width: 40px;\r\n  font-size: 36px;\r\n  line-height: 36px;\r\n  float: left;\r\n  text-align: right;\r\n  margin-right: 10px; \r\n}\r\n.agenda .agenda-date .shortdate {\r\n  font-size: 0.75em; \r\n}\r\n\r\n\r\n/* Times */\r\n.agenda .agenda-time { width: 140px; } \r\n\r\n\r\n/* Events */\r\n.agenda .agenda-events {  } \r\n.agenda .agenda-events .agenda-event {  } \r\n\r\n@media (max-width: 767px) {\r\n    \r\n}";});;
define('resources/data/auth',["exports", "aurelia-framework", "aurelia-event-aggregator", "./dataServices"], function (_exports, _aureliaFramework, _aureliaEventAggregator, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.Auth = void 0;

  var _dec, _class, _temp;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Auth = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _dataServices.DataServices), _dec(_class = (_temp =
  /*#__PURE__*/
  function () {
    function Auth(eventAggregator, data) {
      this.loginUrl = 'people/login';
      this.logoutUrl = 'people/logout';
      this.eventAggregator = eventAggregator;
      this.data = data;
    }

    var _proto = Auth.prototype;

    _proto.login =
    /*#__PURE__*/
    function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(email, password) {
        var content, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                content = {
                  'email': email,
                  'password': password
                };
                _context.next = 3;
                return this.data.login(content, this.loginUrl);

              case 3:
                response = _context.sent;

                if (!response.error) {
                  // response.user.userRole = this.setRole(response.user.roles);
                  sessionStorage.setItem('token', response.token);
                  sessionStorage.setItem('user', JSON.stringify(response.user));
                }

                this.eventAggregator.publish('auth:login', response);
                return _context.abrupt("return", response);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }();

    _proto.logout = function logout(email) {
      this.data.saveObject({
        email: email
      }, this.logoutUrl, 'post');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('alert');
    };

    _proto.isAuthenticated = function isAuthenticated() {
      var token = sessionStorage.getItem('token'); // There's no token, so user is not authenticated.

      if (!token) {
        return false;
      } // There is a token, but in a different format. Return true.


      if (token.split('.').length !== 3) {
        return true;
      }

      var exp;

      try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        exp = JSON.parse(window.atob(base64)).exp;
      } catch (error) {
        return false;
      }

      if (exp) {
        return Math.round(new Date().getTime() / 1000) <= exp;
      }

      return true;
    };

    return Auth;
  }(), _temp)) || _class);
  _exports.Auth = Auth;
});;
define('resources/data/dataServices',["exports", "aurelia-framework", "aurelia-http-client"], function (_exports, _aureliaFramework, _aureliaHttpClient) {
  "use strict";

  _exports.__esModule = true;
  _exports.DataServices = void 0;

  var _dec, _class, _temp;

  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = (_temp =
  /*#__PURE__*/
  function () {
    function DataServices(http) {
      this.isRequesting = false;
      this.FILE_URL = "http://localhost:5000/api/upload";
      this.FILE_DOWNLOAD_URL = "http://localhost:5000/";
      this.IS4UA = 'is4ua';
      this.CLIENTS_SERVICE = 'clients';
      this.DELETE_ALL_CLIENTS = 'clients/system/SYSTEMID';
      this.COURSES_SERVICE = 'courses';
      this.PERSON_COURSES_SERVICE = 'courses/person/PERSONID';
      this.CONFIG_SERVICE = 'config';
      this.SESSIONS_CONFIG_SERVICE = 'semesterConfig';
      this.DOCUMENTS_FILE_UPLOAD = 'documents/file';
      this.http = http;
      this.http.configure(function (x) {
        x.withBaseUrl("http://c3po.ucc.uwm.edu/api/");
      });
    }

    var _proto = DataServices.prototype;

    _proto.activate = function activate() {};

    _proto.get = function get(url) {
      var _this = this;

      this.isRequesting = true;
      return this.http.createRequest(url).asGet().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).send().then(function (response) {
        _this.isRequesting = false;

        if (!response.isSuccess) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }).catch(function (e) {
        _this.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    };

    _proto.getNoAuth = function getNoAuth(url) {
      var _this2 = this;

      this.isRequesting = true;
      return this.http.createRequest(url).asGet().send().then(function (response) {
        _this2.isRequesting = false;

        if (!response.isSuccess) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }).catch(function (e) {
        _this2.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    };

    _proto.saveObject = function saveObject(content, url, method) {
      var _this3 = this;

      this.isRequesting = true;

      if (method === 'put') {
        return this.http.createRequest(url).asPut().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(function (response) {
          _this3.isRequesting = false;

          if (!response.isSuccess) {
            return response;
          } else {
            return JSON.parse(response.response);
          }
        }).catch(function (e) {
          _this3.isRequesting = false;
          console.log(e);
          return {
            error: true,
            code: e.statusCode,
            message: e.statusText
          };
        });
      } else if (method === 'post') {
        return this.http.createRequest(url).asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(function (response) {
          _this3.isRequesting = false;

          if (!response.isSuccess) {
            return response;
          } else {
            return JSON.parse(response.response);
          }
        }).catch(function (e) {
          _this3.isRequesting = false;
          console.log(e);
          return {
            error: true,
            code: e.statusCode,
            message: e.statusText
          };
        });
      }
    };

    _proto.deleteObject = function deleteObject(url) {
      var _this4 = this;

      this.isRequesting = true;
      return this.http.createRequest(url).asDelete().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).send().then(function (response) {
        _this4.isRequesting = false;

        if (!response.isSuccess) {
          return response;
        } else {
          if (response.statusCode === 204) {
            return response;
          } else {
            return JSON.parse(response.response);
          }
        }
      }).catch(function (e) {
        _this4.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    };

    _proto.sendMail = function sendMail(content) {
      var _this5 = this;

      this.isRequesting = true;
      return this.http.createRequest('sendMail').asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(function (response) {
        _this5.isRequesting = false;

        if (!response.isSuccess) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }).catch(function (e) {
        _this5.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    };

    _proto.login = function login(content, url) {
      var _this6 = this;

      return this.http.createRequest(url).asPost().withContent(content).send().then(function (response) {
        _this6.isRequesting = false;
        return JSON.parse(response.response);
      }).catch(function (e) {
        _this6.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    };

    _proto.uploadFiles = function uploadFiles(files, url) {
      var _this7 = this;

      // this.isRequesting = true;
      this.progress = 0;
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append("file" + index, item);
      });
      return this.http.createRequest(url).asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(formData).skipContentProcessing().send().then(function (response) {
        _this7.isRequesting = false;

        if (!response.isSuccess) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }).catch(function (e) {
        _this7.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    };

    _proto.processError = function processError(obj, message) {
      console.log(obj);
      var msg = (message ? message : "") + " ";

      switch (obj.code) {
        case 404:
          msg = undefined;
          break;

        case 422:
          msg = msg += "The request was bad.  Contact your UCC.";
          break;

        case 409:
          msg = msg += "The record already exists.";
          break;

        case 500:
          msg = msg += "An unspecified error occured on the server.  Contact your UCC.";
          break;

        default:
          msg = msg += "An unspecified error occured.  Contact your UCC.";
      }

      if (msg && msg.length > 0) console.log(msg);
    } // //File URLs
    // API_KEY='0f85bb931f8faad7e35b6f685aa4e931';
    // OPEN_WEATHER_MAP_SERVICE = 'http://api.openweathermap.org/data/2.5/weather';
    ;

    return DataServices;
  }(), _temp)) || _class);
  _exports.DataServices = DataServices;
});;
define('resources/data/services',["exports", "aurelia-framework", "./dataServices"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.Services = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Services = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function Services(data) {
      this.data = data;
    }

    var _proto = Services.prototype;

    _proto.saveRegister =
    /*#__PURE__*/
    function () {
      var _saveRegister = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(object) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.data.saveObject(object, 'people', 'post');

              case 2:
                response = _context.sent;

                if (response.error) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", response);

              case 7:
                return _context.abrupt("return", null);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveRegister(_x) {
        return _saveRegister.apply(this, arguments);
      }

      return saveRegister;
    }();

    _proto.saveAbstract =
    /*#__PURE__*/
    function () {
      var _saveAbstract = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(abstract, files) {
        var response, uploadResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.data.saveObject(abstract, 'abstract', 'post');

              case 2:
                response = _context2.sent;

                if (response.error) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return this.uploadFile(files, response._id);

              case 6:
                uploadResponse = _context2.sent;
                return _context2.abrupt("return", uploadResponse);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveAbstract(_x2, _x3) {
        return _saveAbstract.apply(this, arguments);
      }

      return saveAbstract;
    }();

    _proto.uploadFile =
    /*#__PURE__*/
    function () {
      var _uploadFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(files, id) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.uploadFiles(files, 'abstract/upload/' + id);

              case 2:
                response = _context3.sent;

                if (response.error) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", response);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function uploadFile(_x4, _x5) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }();

    _proto.getPersonAbstracts =
    /*#__PURE__*/
    function () {
      var _getPersonAbstracts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.data.get('abstract/person/' + id);

              case 2:
                response = _context4.sent;

                if (!response.error) {
                  this.abstractArray = response;
                } else {
                  this.abstractArray = [];
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPersonAbstracts(_x6) {
        return _getPersonAbstracts.apply(this, arguments);
      }

      return getPersonAbstracts;
    }();

    _proto.getAgenda =
    /*#__PURE__*/
    function () {
      var _getAgenda = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.data.get('agenda');

              case 2:
                response = _context5.sent;

                if (!response.error) {
                  this.agendaArray = response;
                } else {
                  this.agendaArray = [];
                }

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getAgenda() {
        return _getAgenda.apply(this, arguments);
      }

      return getAgenda;
    }();

    return Services;
  }()) || _class);
  _exports.Services = Services;
});;
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "../data/auth", "../../resources/data/services", "toastr", "jquery"], function (_exports, _aureliaFramework, _aureliaRouter, _auth, _services, toastr, _jquery) {
  "use strict";

  _exports.__esModule = true;
  _exports.NavBar = void 0;
  toastr = _interopRequireWildcard(toastr);
  _jquery = _interopRequireDefault(_jquery);

  var _dec, _class, _temp;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _auth.Auth, _services.Services), _dec(_class = (_temp =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth, services) {
      this.isAuthenticated = false;
      this.subscription = {};
      this.router = router;
      this.auth = auth;
      this.services = services;
      this.isAuthenticated = this.auth.isAuthenticated();
      this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    var _proto = NavBar.prototype;

    _proto.attached = function attached() {};

    _proto.login =
    /*#__PURE__*/
    function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.auth.login(this.email, this.password);

              case 2:
                response = _context.sent;

                if (!response.error) {
                  this.loginError = "";
                  this.loginSuccess();
                  this.isAuthenticated = this.auth.isAuthenticated();
                } else {
                  this.loginError = "Invalid credentials.";
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login() {
        return _login.apply(this, arguments);
      }

      return login;
    }();

    _proto.logout = function logout() {
      if (this.userObj) this.auth.logout(this.userObj.email);
      this.userObj = new Object();
      this.isAuthenticated = this.auth.isAuthenticated();
      this.router.navigate("landing");
    };

    _proto.loginSuccess =
    /*#__PURE__*/
    function () {
      var _loginSuccess = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.userObj = JSON.parse(sessionStorage.getItem('user'));

                if (this.userObj) {
                  sessionStorage.setItem('role', this.userObj.role);
                  this.router.navigate("home");
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loginSuccess() {
        return _loginSuccess.apply(this, arguments);
      }

      return loginSuccess;
    }();

    return NavBar;
  }(), _temp)) || _class);
  _exports.NavBar = NavBar;
});;
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\r\n  <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark toolbar\">\r\n    <img class=\"navbar-brand\" style=\"height:50px;\" src=\"http://localhost/favicon.ico\">\r\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\"\r\n      aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n      <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n    <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n      <ul class=\"navbar-nav\">\r\n        <li class=\"nav-item active\">\r\n          <a class=\"nav-link\" style=\"color:white;\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#/agenda\">Agenda</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"https://www.eventbrite.com/e/sap-next-gen-chapter-conference-tickets-58804908063\"\r\n            target=\"_blank\">Attendee Registration</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#/submit\">Presentation Submissions</a> \r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#/logistics\">Logistics</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\"\r\n            href=\"https://events.sap.com/us/sap-university-alliances-summer-workshops-2019/en/home\"\r\n            target=\"_blank\">SAP UA Bootcamps</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" target=\"_blank\" href=\"https://www.visitmilwaukee.org/\">Milwaukee</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n    <div>\r\n      <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n        <ul class=\"navbar-nav\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"#/contact\">Contact</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n    <!-- <form if.bind=\"!isAuthenticated\" class=\"form-inline my-2 my-lg-0\">\r\n        <label if.bind=\"loginError\" style=\"color:white;margin-right:5px;\">${loginError}</label>\r\n      <div class=\"form-group mb-2\">\r\n        <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"></input>\r\n      </div>\r\n      <div class=\"form-group mx-sm-3 mb-2\">\r\n        <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></input>\r\n      </div>\r\n      <button class=\"btn btn-primary mb-2\" click.delegate='login()'>Login</button>\r\n    </form>\r\n    <button if.bind=\"isAuthenticated\" class=\"btn btn-primary mb-2\" click.delegate='logout()'>Logout</button> -->\r\n    </div>\r\n  </nav>\r\n</template>";});;
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {
    config.globalResources(['./elements/nav-bar']);
  }
});;
define('resources/utils/validation',["exports", "aurelia-framework"], function (_exports, _aureliaFramework) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;

  var _dec, _class2, _temp;

  var _class = (_dec = (0, _aureliaFramework.transient)(), _dec(_class2 = (_temp =
  /*#__PURE__*/
  function () {
    function _class2() {
      this.ruleGroups = [];
      this.rules = [];

      this.addRule = function (ruleGroup, field, rule, blur) {
        if (blur) {
          var that = this;
          $("#" + field).blur(function () {
            that.validateRule(rule, field);
          });
        }

        var index = -1; //See if rule group exists already

        for (var k = 0; k < this.rules.length; k++) {
          if (this.rules[k].ruleGroup === ruleGroup) {
            index = k;
            break;
          }
        }

        var fieldArray = [];
        var ruleArray = []; //The rules that apply to a field

        if (index === -1) {
          //This is a new rule group
          this.rules.push({
            ruleGroup: ruleGroup,
            fields: fieldArray
          });
          this.rules[this.rules.length - 1].fields[0] = {
            field: field,
            rules: ruleArray
          };
          this.rules[this.rules.length - 1].fields[0].rules = rule;
        } else {
          //Existing rule group
          var found = false; // for(var i = 0; i<this.rules[index].fields.length; i++){
          //   if(this.rules[index].fields[i].field === field){
          //     this.rules[index].fields[i].rules.push(rule);
          //     found = true;
          //     break;
          //   }
          // }

          if (!found) {
            this.rules[index].fields.push({
              field: field,
              rules: ruleArray
            });
            this.rules[index].fields[this.rules[index].fields.length - 1].rules = rule;
          }
        }
      };

      this.validate = function (ruleGroup) {
        var index = -1;

        for (var k = 0; k < this.rules.length; k++) {
          if (this.rules[k].ruleGroup == ruleGroup) {
            index = k;
            break;
          }
        }

        if (index === -1) {
          return true;
        } else {
          var valid = true;

          for (var i = 0; i < this.rules[index].fields.length; i++) {
            var fields = this.rules[index].fields[i];
            var thisValid = true;

            for (var k = 0; k < fields.rules.length; k++) {
              thisValid = true;
              var rules = fields.rules[k];
              thisValid = this.validateRule(rules, fields.field);

              if (!thisValid) {
                valid = false;
                break;
              }
            }
          }
        }

        return valid;
      };

      this._inValidate = function (field, rule) {
        var el = $("#" + field);

        if (el.next().is("span.help-block")) {
          el.next().html(rule.message);
        } else {
          var msg = "<span class='help-block'>{message}</span>".replace("{message}", rule.message);
        }

        if (el.is(':visible')) {
          if (!el.parent().hasClass("has-error")) {
            el.parent().addClass("has-error");

            if (!el.next().is("span.help-block")) {
              el.after(msg);
            }
          }
        }
      };

      this.makeValid = function (field) {
        field.parent().removeClass("has-error");

        if (field.next().is("span.help-block")) {
          field.next().html("");
        }
      };

      this.makeAllValid = function (ruleGroup) {
        var index = -1;

        for (var k = 0; k < this.rules.length; k++) {
          if (this.rules[k].ruleGroup == ruleGroup) {
            index = k;
            break;
          }
        }

        if (index === -1) {
          return true;
        } else {
          for (var i = 0; i < this.rules[index].fields.length; i++) {
            this.makeValid($('#' + this.rules[index].fields[i].field));
          }
        }
      };
    }

    var _proto = _class2.prototype;

    _proto.initialize = function initialize(context) {
      this.context = context;
    }
    /**
     *
     * @param ruleGroup - A group of rules
     * @param field - Field the rule applies to
     * @param rule - Rule is an object - rule: name of the rule, val: Value defining limit, valFunction: custom validation function
       */
    ;

    _proto.validateRule = function validateRule(rules, field) {
      var thisValid = true;

      switch (rules.rule) {
        case "custom":
          thisValid = rules.valFunction(this.context);
          break;

        case "required":
          if (!eval('this.context.' + rules.value) || eval('this.context.' + rules.value).length === 0) {
            thisValid = false;
          }

          break;

        case "min":
          if (eval('this.context.' + rules.value) < rules.ruleValue) {
            thisValid = false;
          }

          break;

        case "max":
          if (eval('this.context.' + rules.value) > rules.ruleValue) {
            thisValid = false;
          }

          break;

        case "length":
          if (eval('this.context.' + rules.value).length > 0 && eval('this.context.' + rules.value).length < rules.ruleValue) {
            thisValid = false;
          }

          break;
      }

      if (thisValid) {
        if (thisValid) this.makeValid($("#" + field));
      } else {
        this._inValidate(field, rules);
      }

      return thisValid;
    };

    _proto.clearRules = function clearRules() {
      this.ruleGroups = [];
      this.rules = [];
    };

    _proto.clearRuleGroup = function clearRuleGroup(group) {
      var _this = this;

      this.ruleGroups[group] = "";
      this.rules.forEach(function (rule, index) {
        if (rule.ruleGroup == group) {
          _this.rules.splice(index, 1);
        }
      });
    };

    return _class2;
  }(), _temp)) || _class2);

  _exports.default = _class;
});;
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map