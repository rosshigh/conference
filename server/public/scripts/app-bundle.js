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
        title: 'SAP Next-Gen Chapter Conference 2019'
      }, {
        route: 'home',
        moduleId: './modules/home/home',
        name: 'Home',
        settings: {
          auth: false,
          roles: []
        },
        title: 'SAP Next-Gen Chapter Conference 2019'
      }, {
        route: 'register',
        moduleId: './modules/home/register',
        name: 'Register',
        settings: {
          auth: false,
          roles: []
        },
        title: 'SAP Next-Gen Chapter Conference 2019'
      }, {
        route: 'logistics',
        moduleId: './modules/home/logistics',
        name: 'Logistics',
        settings: {
          auth: false,
          roles: []
        },
        title: 'SAP Next-Gen Chapter Conference 2019'
      }, {
        route: 'agenda',
        moduleId: './modules/home/agenda',
        name: 'Agenda',
        settings: {
          auth: false,
          roles: []
        },
        title: 'SAP Next-Gen Chapter Conference 2019'
      }, {
        route: 'submit',
        moduleId: './modules/home/submit',
        name: 'Submission',
        settings: {
          auth: false,
          roles: []
        },
        title: 'SAP Next-Gen Chapter Conference 2019'
      }, {
        route: 'contact',
        moduleId: './modules/home/contact',
        name: 'Contact',
        settings: {
          auth: false,
          roles: []
        },
        title: 'SAP Next-Gen Chapter Conference 2019'
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
define('text!modules/home/abstractEdit.html',[],function(){return "<template>\r\n    <div class=\"row\">\r\n        <div class=\"col-5 offset-1\">\r\n            <form>\r\n                <h3>${abstract.personId.firstName} ${abstract.personId.lastName}</h3>\r\n                <h3>${abstract.personId.university}</h3>\r\n                <div class=\"form-group\">\r\n                    <label for=\"title\">Title *</label>\r\n                    <input value.bind=\"abstract.title\" type=\"text\" class=\"form-control\" id=\"title\"\r\n                        aria-describedby=\"titleHelp\" placeholder=\"Title\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"description\">Track *</label>\r\n                    <select value.bind=\"abstract.track\" class=\"form-control\" id=\"track\">\r\n                        <option value=\"\">Select a track</option>\r\n                        <option value=\"${type}\" repeat.for=\"type of tracks\">${type}</optionp>\r\n                    </select>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"description\">Description *</label>\r\n                    <textarea value.bind=\"abstract.description\" type=\"text\" class=\"form-control\" id=\"description\"\r\n                        aria-describedby=\"descriptionHelp\" placeholder=\"Description\" rows=\"10\"></textarea>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <a href=\"uploadedFiles/${abstract.file.fileName}\" target=\"_blank\"\r\n                        style=\"margin-top:20px;\">${abstract.file.originalFileName}</a>\r\n                </div>\r\n                <button class=\"btn btn-primary\" style=\"margin-top:25px\"\r\n                    click.trigger=\"saveEditAbstract()\">Submit</button>\r\n                <button class=\"btn btn-primary\" style=\"margin-top:25px\" click.trigger=\"cancelEdit()\">Cancel</button>\r\n            </form>\r\n\r\n        </div>\r\n        <div class=\"col-5\">\r\n            <h5>You don't have to click submit to save changes to the abstract reviewers</h5>\r\n            <h3>Reviewers</h3>\r\n            <h2 show.bind=\"!abstract.reviewers.length\">No reviewers are assigned yet</h2>\r\n            <ul class=\"list-group\">\r\n                <li class=\"list-group-item\" click.trigger=\"removeReviewerFromAbstract(person)\"\r\n                    repeat.for=\"person of abstract.reviewers\">${person.firstName}\r\n                    ${person.lastName}<br>${person.university}\r\n                </li>\r\n            </ul>\r\n            <h3 style=\"margin-top:20px;\">Available Reviewers</h3>\r\n            <ul class=\"list-group\">\r\n                <li class=\"list-group-item\" click.trigger=\"addReviewerToAbstract(person)\"\r\n                    repeat.for=\"person of services.peopleArray | availableReviewers:abstract.reviewers\">\r\n                    ${person.firstName}\r\n                    ${person.lastName}<br>${person.university}\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</template>";});;
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
define('text!modules/home/guidelines.html',[],function(){return "<template>\r\n        <h3>Submission Guidelines</h3>\r\n        <p>\r\n            The <strong>SAP Next-Gen Chapter Conference 2019</strong> invites you to submit an extended\r\n            abstract proposal to be considered for presentation on Monday July 15, 2019. All extended\r\n            abstracts will be peer reviewed, and online proceedings will be published.\r\n        </p>\r\n\r\n        <h5>DEADLINES:</h5>\r\n        <ul>\r\n            <li>May 15, 2019: Extended Abstract Submission in Word Format </li>\r\n            <li>June 12, 2019: Notification of Selected Presentations</li>\r\n            <li>July 1, 2019: Final Presentation Materials Due</li>\r\n        </ul>\r\n\r\n        <p><strong>To submit an abstract, register as an author using the Register button.</strong></p>\r\n\r\n        <h4>Focus for Faculty Presentations</h4>\r\n        <p>One of the goals of the faculty led presentations to share innovations with colleagues with a\r\n            focus on <strong>actionable takeaways</strong>. Presentations should focus on the problem or\r\n            opportunity; the innovation to solve the problem or realize the opportunity; examples of\r\n            practical application of the innovation; and suggestions for faculty adoption.\r\n            You are invited to submit an extended abstract proposal for a presentation within any of the\r\n            following tracks:</p>\r\n        <ol>\r\n            <li>Innovations in Teaching - With SAP technology – Flipped classroom is so 2009. What’s new\r\n                in innovative teaching for 2019!</li>\r\n            <li>High Impact Practices - Practical tips to energize your teaching for student success\r\n            </li>\r\n            <li>HANAfy Everything - How you have successfully upgraded all of your SAP related\r\n                curriculum to leverage SAP HANA</li>\r\n            <li>Incorporating Latest Technology Developments into Curriculum - How you have successfully\r\n                incorporated new technologies such as (but not restricted to) Blockchain, AI, ML, AR, VR\r\n                into your curriculum</li>\r\n            <li>Research or Teaching - Balancing the demands of tenure track with curriculum\r\n                development, a perspective from recently tenured faculty</li>\r\n        </ol>\r\n\r\n        <p>After a peer review of the submissions, selected contributions will be presented orally and\r\n            then be posted as an extended abstract with no copyright to ensure that the authors may\r\n            further develop their research ideas for journal submission.\r\n            Requirements</p>\r\n        <p>Please submit a 1-2 page extended abstract of your proposed presentation that includes the\r\n            following details:</p>\r\n        <ul>\r\n            <li>Cover page with Title, speaker names, emails and affiliations indicating who the\r\n                corresponding author is along with intended track and One paragraph profile / bio for\r\n                each speaker</li>\r\n            <li>Extended abstract to include Title, Abstract overview of content, Keywords, content, and\r\n                references</li>\r\n            <li>An Abstract Template can be found here: <a href=\"/Initial_Submission_Extended_Abstract_Template.docx\">Initial_Submission_Extended_Abstract_Template</a></li>\r\n            <ul>\r\n                <li>Presenters should plan for approximately 20-30 min long speaking slots. If your\r\n                    proposed presentation needs more time, you should indicate this upon submission of\r\n                    the abstract.</li>\r\n                <li>Submissions should be uploaded to the conference website as a Word\r\n                    file </li>\r\n                <li>Presentations will be Monday, July 15th , 2019, Milwaukee, Wisconsin, USA</li>\r\n            </ul>\r\n\r\n        </ul>\r\n\r\n    \r\n        <p><strong>You can return to this site, login and track the progress of your\r\n                submission.</strong></p>\r\n\r\n\r\n        <p>Questions? Contact the academic program chair at yantonucci@widener.edu or the conference\r\n            co-chairs <a href=\"emailto:hightowe@uwm.edu\">hightowe@uwm.edu</a> or <a\r\n                href=\"emailto:twilder@csuchico.edu\">twilder@csuchico.edu</a> </p>\r\n</template>";});;
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
define('text!modules/home/landing.html',[],function(){return "<template>\r\n    <div class=\"parallax1\">\r\n        <div class=\"caption\">\r\n            <span class=\"border\">SAP Next-Gen Chapter Conference 2019</span>\r\n        </div>\r\n    </div>\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-8 offset-2 text-center\" style=\"margin-top:25px;\">\r\n                <h3>Co-hosted by the University Competence Centers and SAP Next-Gen Chapters\r\n                    at the University of Wisconsin-Milwaukee and California State University, Chico</h3>\r\n                <p> </p>\r\n                <h3>July 14 - 15, 2019</h3>\r\n                at University of Wisconsin-Milwaukee, Lubar School of Business\r\n                <p></p>\r\n                <p>Professors from SAP University Alliances / SAP Next-Gen member institutions are invited\r\n                    to attend the\r\n                    SAP Next-Gen Chapter Conference and SAP University Alliances Boot Camps July 14 – 19,\r\n                    2019 at\r\n                    University of Wisconsin-Milwaukee, Lubar School of Business.</p>\r\n                <p>The events are organized and co-hosted by the University Competence Centers and SAP\r\n                    Next-Gen Chapters\r\n                    at University of Wisconsin-Milwaukee and California State University, Chico. To cover\r\n                    costs\r\n                    associated with the conference, UW-Milwaukee charges a fee for registering and\r\n                    attending.</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"parallax2\"></div>\r\n\r\n    <div class=\"container\">\r\n        <div class=\"row text-center\">\r\n            <div class=\"col-4 offset-4\">\r\n                <h2 style=\"margin-top:50px;\">Featured Speakers</h2>\r\n                <img src=\"/img/ron.jpg\" height=\"200\" class=\"rounded-circle\" alt=\"Ron Gilson\">\r\n                <h2>Ron Gilson</h2>\r\n                <h5>VP and CIO - Johnsonville, LLC</h5>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-6 offset-3\" style=\"margin-bottom:25px;\">\r\n                        <h6>As a member of Johnsonville’s Strategy Team (Executive Team) participate in all levels of company planning including long range strategic planning and annual planning exercises. Champion and lead corporate initiatives including both global IT and functional roles. </h6>\r\n                </div>\r\n            </div>\r\n                \r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"parallax2\"></div>\r\n\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"text-center\" style=\"margin-top:25px;\">\r\n                <h2>Conference Organizing Committee</h2>\r\n                <div class=\"row\">\r\n                    <div class=\"col\">\r\n                        <img src=\"/img/Antonucci.jpg\" height=\"200\" class=\"rounded-circle\"\r\n                            alt=\"Yvonne Antonucci\">\r\n                        <H2>Yvonne Antonucci</H2>\r\n                        <h5>Professor of Business Analytics and Business Process Innovation</h5>\r\n                        <h5>Widener University</h5>\r\n                        <h5>School of Business Administration</h5>\r\n                    </div>\r\n                    <div class=\"col\">\r\n                        <img src=\"/img/twilder.jpg\" height=\"200\" class=\"rounded-circle\"\r\n                            alt=\"Tom Wilder\">\r\n                        <H2>Tom Wilder</H2>\r\n                        <h5>Lecturer in Business Information Systems</h5>\r\n                        <h5>Director SAP UCC at Chico</h5>\r\n                        <h5>California State University - Chico</h5>\r\n                        <h5>College of Business Administration</h5>\r\n                    </div>\r\n                    <div class=\"col\">\r\n                        <img src=\"/img/nitin.jpg\" height=\"200\" class=\"rounded-circle\" alt=\"Nitn Kalen\">\r\n                        <H2>Nitin Kale</H2>\r\n                        <h5>Associate Professor of Information Technology and Industrial and Systems Engineering\r\n                            Practice</h5>\r\n                        <h5>University of Southern California</h5>\r\n                        <h5>Viterbi School of Engineering</h5>\r\n                    </div>\r\n                    <div class=\"col\">\r\n                        <img src=\"/img/nancy.jpg\" height=\"200\" class=\"rounded-circle\"\r\n                            alt=\"Nancy Jones\">\r\n                        <H2>Nancy Jones</H2>\r\n                        <h5>Lecturer in Accountancy</h5>\r\n                        <h5>San Diego State University</h5>\r\n                        <h5>Charles W. Lamden School of Accountancy</h5>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                        <div class=\"col\">\r\n                                <img src=\"/img/ross.jpg\" height=\"200\" class=\"rounded-circle\"\r\n                                    alt=\"Ross Hightower\">\r\n                                <H2>Ross Hightower</H2>\r\n                                <h5>Senior Lecturer in Information Technology Management</h5>\r\n                                <h5>Director SAP UCC at UWM</h5>\r\n                                <h5>University of Wiconsin - Milwaukee</h5>\r\n                                <h5>Lubar School of Business</h5>\r\n                            </div>\r\n                    <div class=\"col\">\r\n                        <img src=\"/img/simha.jpg\" height=\"200\" class=\"rounded-circle\" alt=\"Simha Magan\">\r\n                        <H2>Simha Magal</H2>\r\n                        <h5>Clinical Professor, SAP Mentor</h5>\r\n                        <h5>Georgia State University</h5>\r\n                        <h5>J. Mack Robinson of Business</h5>\r\n                    </div>\r\n                    <div class=\"col\">\r\n                        <img src=\"/img/jeff.jpg\" height=\"200\" class=\"rounded-circle\" alt=\"Jeff Word\">\r\n                        <H2>Jeff Word</H2>\r\n                        <h5>Head of ASUG University, Spirit Guide</h5>\r\n                        <h5>ASUG University</h5>\r\n\r\n                    </div>\r\n                </div>\r\n\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});;
define('modules/home/logistics',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Logistics = void 0;

  var Logistics =
  /*#__PURE__*/
  function () {
    function Logistics() {
      this.showImage = [];
      this.showImage.push("http://localhost/img/parallax1.jpg");
      this.showImage.push("http://localhost/img/uwm.jpg");
      this.showThisImage = this.showImage[0];
      this.index = 1;
    }

    var _proto = Logistics.prototype;

    _proto.activate = function activate() {
      var _this = this;

      setInterval(function () {
        _this.showThisImage = _this.showImage[_this.index];

        if (_this.index == _this.showImage.length - 1) {
          _this.index = 0;
        } else {
          _this.index++;
        }
      }, 5000);
    };

    return Logistics;
  }();

  _exports.Logistics = Logistics;
});;
define('text!modules/home/logistics.html',[],function(){return "<template>\r\n    <div class=\"container\" style=\"padding-top:100px;\">\r\n\r\n                <h1>University of Wisconsin-Milwaukee</h1>\r\n\r\n                <h3>Venue</h3>\r\n                Lubar School of Business</br>\r\n                3202 N. Maryland Avenue</br>\r\n                Milwaukee, WI 53211\r\n                <p> </p>\r\n                <h3>Contact</h3>\r\n                Ross Hightower, Senior Lecturer and UCC Director </br>\r\n                Phone: 414-229-4556 </br>\r\n                Emergency Phone: (414) 229-3992</br>\r\n                Email: hightowe@uwm.edu\r\n                <p> </p>\r\n                <h3>Directions</h3>\r\n                For maps of and directions to the UWM campus, please see <a href=\"http://www4.uwm.edu/map/\"\r\n                    target=\"_blank\">http://www4.uwm.edu/map/</a>\r\n                <p> </p>\r\n                <h3>Parking</h3>\r\n                Parking is available in the Student Union garage and is $1.50 /hour, with a $12 daily maximum. </br>\r\n                The garage is located at 2200 E. Kenwood Blvd.\r\n                <p> </p>\r\n                <h3><a href=\"https://www.visitmilwaukee.org/uwm/\" target=\"_blank\">Recommended Hotels</a></h3>\r\n           \r\n            <!-- <div class=\"col\">\r\n                <div class=\"text-center\" style=\"padding-top:100px;\">\r\n                    <img src.bind=\"showThisImage\" height=\"500\" alt=\"First slide\">\r\n                </div>\r\n            </div> -->\r\n        <!-- </div> -->\r\n\r\n\r\n    </div>\r\n</template>";});;
define('modules/home/milwaukee',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Milwaukee = void 0;

  var Milwaukee = function Milwaukee() {};

  _exports.Milwaukee = Milwaukee;
});;
define('text!modules/home/milwaukee.html',[],function(){return "<template>\r\n    \r\n</template>";});;
define('text!modules/home/mySubmissions.html',[],function(){return "<template>\r\n    <div class=\"col-5\">\r\n        <p>\r\n            <div show.bind=\"services.abstractArray.length\">\r\n                <h2>Your Submissions</h2>\r\n                <ul class=\"list-group\">\r\n                    <li repeat.for=\"submission of services.abstractArray\" class=\"list-group-item\">\r\n                        <h3>${submission.title}</h3>\r\n                        <h6>Status: <strong>${submission.status}</strong></h6>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div show.bind=\"!services.abstractArray.length\">\r\n                <h2>You haven't submitted an abstract yet.</h2>\r\n            </div>\r\n        </p>\r\n    </div>\r\n</template>";});;
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
define('text!modules/home/registerPanel.html',[],function(){return "<template>\r\n    <form>\r\n        <h3>${userObj.firstName} ${userObj.lastName}</h3>\r\n        <h3>${userObj.university}</h3>\r\n        <div class=\"form-group\">\r\n            <label for=\"title\">Title *</label>\r\n            <input value.bind=\"title\" type=\"text\" class=\"form-control\" id=\"title\" aria-describedby=\"titleHelp\"\r\n                placeholder=\"Title\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"description\">Track *</label>\r\n            <select value.bind=\"track\" class=\"form-control\" id=\"track\">\r\n                <option value=\"\">Select a track</option>\r\n                <option value=\"${type}\" repeat.for=\"type of tracks\">${type}</optionp>\r\n            </select>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"description\">Description *</label>\r\n            <textarea value.bind=\"description\" type=\"text\" class=\"form-control\" id=\"description\"\r\n                aria-describedby=\"descriptionHelp\" placeholder=\"Description\" rows=\"10\"></textarea>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-4\">\r\n                <label class=\"btn btn-primary\">\r\n                    Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\r\n                        files.bind=\"files\">\r\n                </label>\r\n                <span id=\"files\"></span>\r\n            </div>\r\n            <div class=\"col\">\r\n                <ul>\r\n                    <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">\r\n                        ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\"\r\n                                aria-hidden=\"true\"></i></span></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <button class=\"btn btn-primary\" style=\"margin-top:25px\" click.trigger=\"submit()\">Submit</button>\r\n    </form>\r\n</template>";});;
define('text!modules/home/reviewersTable.html',[],function(){return "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-5\">\r\n                    <h3>Registered People</h3>\r\n                    <ul class=\"list-group\">\r\n                        <li class=\"list-group-item\" click.trigger=\"addReviewer(person)\" repeat.for=\"person of services.peopleArray | reviewers:0\">${person.firstName} ${person.lastName}<br>${person.university}\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"col-5\">\r\n                    <h3>Reviewers</h3>\r\n                    <ul class=\"list-group\">\r\n                        <li class=\"list-group-item\" click.trigger=\"removeReviewer(person)\" repeat.for=\"person of services.peopleArray | reviewers:1\">${person.firstName} ${person.lastName}<br>${person.university}\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});;
define('text!modules/home/submissionsTable.html',[],function(){return "<template>\r\n    <div show.bind=\"showTable\">\r\n        <div class=\"row\">\r\n            <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                <div id=\"no-more-tables\">\r\n\r\n                    <table class=\"table table-striped table-hover cf\">\r\n                        <thead class=\"cf\">\r\n                            <tr colspan='6'>\r\n                                <compose view=\"../../resources/elements/table-navigation-bar.html\"></compose>\r\n                            </tr>\r\n                            <tr>\r\n                                <td colspan='6'>\r\n                                    <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                        data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\r\n                                            aria-hidden=\"true\"></i></span>\r\n                                    <span click.delegate=\"downloadInstExcel()\" class=\"smallMarginRight\"\r\n                                        bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                        data-original-title=\"Export to Excel\"><i class=\"fa fa-download\"\r\n                                            aria-hidden=\"true\"></i></span>\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <th>\r\n                                    <span class=\"sortable\"\r\n                                        click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customNameSorter, propertyName: 'name'})\">Faculty\r\n                                    </span>\r\n                                    <i class=\"fa fa-sort\"></i>\r\n                                </th>\r\n                                <th>\r\n                                    <span class=\"sortable\"\r\n                                        click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customEmailSorter, propertyName: 'email'})\">Email\r\n                                    </span>\r\n                                    <i class=\"fa fa-sort\"></i>\r\n                                </th>\r\n                                <th>\r\n                                    <span class=\"sortable\"\r\n                                        click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customTitleSorter, propertyName: 'title'})\">Title\r\n                                    </span>\r\n                                    <i class=\"fa fa-sort\"></i>\r\n                                </th>\r\n                                <th>\r\n                                    <span class=\"sortable\"\r\n                                        click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customTrackSorter, propertyName: 'track'})\">Track\r\n                                    </span>\r\n                                    <i class=\"fa fa-sort\"></i>\r\n                                </th>\r\n                                <th>\r\n                                    <span class=\"sortable\"\r\n                                        click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customStatusSorter, propertyName: 'title'})\">Status\r\n                                    </span>\r\n                                    <i class=\"fa fa-sort\"></i>\r\n                                </th>\r\n                                <th>File</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr>\r\n                                <th>\r\n                                    <input value.bind=\"nameFilterValue\"\r\n                                        input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'custom',  filter: nameCustomFilter,  compare:'custom'} )\"\r\n                                        class=\"form-control\" />\r\n                                </th>\r\n                                <th>\r\n                                    <input value.bind=\"emailFilterValue\"\r\n                                        input.delegate=\"dataTable.filterList(emailFilterValue, { type: 'custom',  filter: emailCustomFilter,  compare:'custom'} )\"\r\n                                        class=\"form-control\" />\r\n                                </th>\r\n                                <th>\r\n                                    <input value.bind=\"titleFilterValue\"\r\n                                        input.delegate=\"dataTable.filterList(titleFilterValue, { type: 'custom',  filter: titleCustomFilter,  compare:'custom'} )\"\r\n                                        class=\"form-control\" />\r\n                                </th>\r\n                                <th>\r\n                                    <select value.bind=\"trackFilter\"\r\n                                        input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'trackFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'track', displayProperty: 'memberType', matchProperty:'', compare:'match'} )\"\r\n                                        class=\"form-control\">\r\n                                        <option value=\"\"></option>\r\n                                        <option repeat.for=\"track of tracks\" value=\"${track}\">\r\n                                            ${track}</option>\r\n                                    </select>\r\n                                </th>\r\n                                <th>\r\n                                    <select value.bind=\"statusFilter\"\r\n                                        input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'statusFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'status', displayProperty: 'status', matchProperty:'', compare:'match'} )\"\r\n                                        class=\"form-control\">\r\n                                        <option value=\"\"></option> \r\n                                        <option repeat.for=\"stat of status\" value=\"${stat}\">\r\n                                            ${stat}</option>\r\n                                    </select>\r\n                                </th>\r\n                                <th>\r\n                                    <input value.bind=\"fileFilterValue\"\r\n                                        input.delegate=\"dataTable.filterList(fileFilterValue, { type: 'custom',  filter: fileCustomFilter,  compare:'custom'} )\"\r\n                                        class=\"form-control\" />\r\n                                </th>\r\n                            </tr>\r\n                            <tr  repeat.for=\"abstract of dataTable.displayArray\">\r\n                                <td click.trigger=\"edit(abstract)\">${abstract.personId.firstName} ${abstract.personId.lastName}</td>\r\n                                <td click.trigger=\"edit(abstract)\">${abstract.personId.email}</td>\r\n                                <td click.trigger=\"edit(abstract)\">${abstract.title}</td>\r\n                                <td click.trigger=\"edit(abstract)\">${abstract.track}</td>\r\n                                <td click.trigger=\"edit(abstract)\">${abstract.status}</td>\r\n                                <td><a href=\"uploadedFiles/abstracts/${abstract.file.fileName}\" target=\"_blank\"\r\n                                        }>${abstract.file.originalFileName}</a></td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div show.bind=\"!showTable\">\r\n        <compose view=\"./abstractEdit.html\"></compose>\r\n    </div>\r\n</template>";});;
define('modules/home/submit',["exports", "aurelia-framework", "../../resources/utils/validation", "../../resources/data/services", "aurelia-router", "../../resources/data/auth", "../../resources/utils/dataTable", "jquery", "toastr"], function (_exports, _aureliaFramework, _validation, _services, _aureliaRouter, _auth, _dataTable, _jquery, toastr) {
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

  var Submit = (_dec = (0, _aureliaFramework.inject)(_validation.default, _services.Services, _aureliaRouter.Router, _auth.Auth, _dataTable.DataTable), _dec(_class =
  /*#__PURE__*/
  function () {
    function Submit(validation, services, router, auth, dataTable) {
      this.validation = validation;
      this.services = services;
      this.router = router;
      this.auth = auth;
      this.dataTable = dataTable;
      this.dataTable.initialize(this);
      this.validation.initialize(this);
      toastr.options.extendedTimeOut = "1000";
      toastr.options.timeOut = "1500";
      this.userObj = JSON.parse(sessionStorage.getItem('user'));
      this.filesToUpload = new Array();

      this._setupValidation();

      this.showTable = true;
      this.tracks = ["Innovations in Teaching", "High Impact Practices", "Incorporating Latest Developments in Curriculum", "Research in Teaching"];
      this.status = ['Submitted', 'Under Review', 'Accepted', 'Rejected'];
    }

    var _proto = Submit.prototype;

    _proto.activate = function activate() {
      if (sessionStorage.getItem('user')) this.loginSuccess();
    };

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
                } else {
                  this.loginError = "Invalid credentials. Contact ucc@uwm.edu to have your password reset.";
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

    _proto.refresh =
    /*#__PURE__*/
    function () {
      var _refresh = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.services.getAbstracts();

              case 2:
                _context4.next = 4;
                return this.services.getPeople();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function refresh() {
        return _refresh.apply(this, arguments);
      }

      return refresh;
    }();

    _proto.loginSuccess =
    /*#__PURE__*/
    function () {
      var _loginSuccess = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.isAuthenticated = this.auth.isAuthenticated();
                this.userObj = JSON.parse(sessionStorage.getItem('user'));

                if (!this.userObj) {
                  _context5.next = 12;
                  break;
                }

                this.adminRole = this.userObj.role.indexOf('admin') > -1;
                sessionStorage.setItem('role', this.userObj.role);

                if (!this.adminRole) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 8;
                return this.services.getAbstracts();

              case 8:
                _context5.next = 10;
                return this.services.getPeople();

              case 10:
                this.dataTable.updateArray(this.services.allAbstractArray);

              case 11:
                this.getPersonAbstracts();

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.services.getPersonAbstracts(this.userObj._id);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getPersonAbstracts() {
        return _getPersonAbstracts.apply(this, arguments);
      }

      return getPersonAbstracts;
    }();

    _proto.addReviewer =
    /*#__PURE__*/
    function () {
      var _addReviewer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(person) {
        var response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                person.role = person.role + ':reviewer';
                _context7.next = 3;
                return this.services.savePerson(person);

              case 3:
                response = _context7.sent;

                if (!response) {
                  _context7.next = 10;
                  break;
                }

                toastr['success']('Your registration was saved.');
                _context7.next = 8;
                return this.services.getPeople();

              case 8:
                _context7.next = 11;
                break;

              case 10:
                toastr['error']('There was an error saving the registration.');

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function addReviewer(_x) {
        return _addReviewer.apply(this, arguments);
      }

      return addReviewer;
    }();

    _proto.removeReviewer =
    /*#__PURE__*/
    function () {
      var _removeReviewer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(person) {
        var response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                person.role = person.role.split(':reviewer').join();
                _context8.next = 3;
                return this.services.savePerson(person);

              case 3:
                response = _context8.sent;

                if (!response) {
                  _context8.next = 10;
                  break;
                }

                toastr['success']('Your registration was saved.');
                _context8.next = 8;
                return this.services.getPeople();

              case 8:
                _context8.next = 11;
                break;

              case 10:
                toastr['error']('There was an error saving the registration.');

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function removeReviewer(_x2) {
        return _removeReviewer.apply(this, arguments);
      }

      return removeReviewer;
    }();

    _proto.edit =
    /*#__PURE__*/
    function () {
      var _edit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(abstract) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.services.getAbstract(abstract._id);

              case 2:
                this.abstract = _context9.sent;
                this.showTable = false;

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function edit(_x3) {
        return _edit.apply(this, arguments);
      }

      return edit;
    }();

    _proto.addReviewerToAbstract =
    /*#__PURE__*/
    function () {
      var _addReviewerToAbstract = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(person) {
        var response;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this.abstract.reviewers.indexOf(person._id) === -1)) {
                  _context10.next = 11;
                  break;
                }

                this.abstract.reviewers.push(person._id);
                if (this.abstract.reviewers.length > 0) this.abstract.status = "Under Review";
                _context10.next = 5;
                return this.services.saveAbstractReviewer(this.abstract);

              case 5:
                response = _context10.sent;
                this.abstract = response[0];

                if (!person.abstracts.indexOf(this.abstract._id === -1)) {
                  _context10.next = 11;
                  break;
                }

                person.abstracts.push(this.abstract._id);
                _context10.next = 11;
                return this.services.savePerson(person);

              case 11:
                _context10.next = 13;
                return this.refresh();

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function addReviewerToAbstract(_x4) {
        return _addReviewerToAbstract.apply(this, arguments);
      }

      return addReviewerToAbstract;
    }();

    _proto.removeReviewerFromAbstract =
    /*#__PURE__*/
    function () {
      var _removeReviewerFromAbstract = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(person) {
        var filteredReviewers, responseOne, filteredAbstracts;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                filteredReviewers = this.abstract.reviewers.filter(function (value, index, arr) {
                  return value._id != person._id;
                });
                this.abstract.reviewers = filteredReviewers;
                if (this.abstract.reviewers.length === 0) this.abstract.status = "Submitted";
                _context11.next = 5;
                return this.services.saveAbstractReviewer(this.abstract);

              case 5:
                responseOne = _context11.sent;
                this.abstract = responseOne[0];
                filteredAbstracts = person.abstracts.filter(function (value, index, arr) {
                  return value._id != this.abstract._id;
                });
                person.abstracts = filteredAbstracts;
                _context11.next = 11;
                return this.services.savePerson(person);

              case 11:
                this.refresh();

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function removeReviewerFromAbstract(_x5) {
        return _removeReviewerFromAbstract.apply(this, arguments);
      }

      return removeReviewerFromAbstract;
    }();

    _proto.saveEditAbstract = function saveEditAbstract() {
      this.services.saveAbstractReviewer(this.abstract);
      this.showTable = true;
    };

    _proto.cancelEdit = function cancelEdit() {
      this.showTable = true;
    };

    _proto.downloadInstExcel = function downloadInstExcel() {
      var csvContent = "data:text/csv;charset=utf-8;,Faculty,Email,Title,Status\r\n";
      this.dataTable.baseArray.forEach(function (item) {
        var facInfo = item.personId ? item.personId.firstName + " " + item.personId.lastName + "," + item.personId.email : "";
        csvContent += facInfo + "," + item.title + "," + item.status;
        csvContent += "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "submissions.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
    };

    _proto.nameCustomFilter = function nameCustomFilter(value, item, context) {
      if (item.personId) {
        var firstNameFilter = item.personId.firstName.toUpperCase().indexOf(value.toUpperCase()) > -1;
        var lastNameFilter = item.personId.lastName.toUpperCase().indexOf(value.toUpperCase()) > -1;
        return firstNameFilter || lastNameFilter;
      }

      return false;
    };

    _proto.emailCustomFilter = function emailCustomFilter(value, item, context) {
      return item.personId && item.personId.email.toUpperCase().indexOf(value.toUpperCase()) > -1;
    };

    _proto.titleCustomFilter = function titleCustomFilter(value, item, context) {
      return item.title.toUpperCase().indexOf(value.toUpperCase()) > -1;
    };

    _proto.fileCustomFilter = function fileCustomFilter(value, item, context) {
      return item.file && item.file.originalFileName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    };

    _proto.customNameSorter = function customNameSorter(sortProperty, sortDirection, sortArray, context) {
      this.sortProperty = 'person';
      this.sortDirection = sortDirection;
      return sortArray.sort(function (a, b) {
        if (a['personId'] && b['personId'] && a['personId']['lastName'] && b['personId']['lastName']) {
          var result = a['personId']['lastName'] < b['personId']['lastName'] ? -1 : a['personId']['lastName'] > b['personId']['lastName'] ? 1 : 0;
        } else {
          var result = -1;
        }

        return result * sortDirection;
      });
    };

    _proto.customEmailSorter = function customEmailSorter(sortProperty, sortDirection, sortArray, context) {
      this.sortProperty = 'person';
      this.sortDirection = sortDirection;
      return sortArray.sort(function (a, b) {
        if (a['personId'] && b['personId'] && a['personId']['email'] && b['personId']['email']) {
          var result = a['personId']['email'] < b['personId']['email'] ? -1 : a['personId']['email'] > b['personId']['email'] ? 1 : 0;
        } else {
          var result = -1;
        }

        return result * sortDirection;
      });
    };

    _proto.customTitleSorter = function customTitleSorter(sortProperty, sortDirection, sortArray, context) {
      return sortArray.sort(function (a, b) {
        var result = a[sortProperty] < b[sortProperty] ? -1 : a[sortProperty] > b[sortProperty] ? 1 : 0;
        return result * sortDirection;
      });
    };

    _proto.customTrackSorter = function customTrackSorter(sortProperty, sortDirection, sortArray, context) {
      return sortArray.sort(function (a, b) {
        var result = a[sortProperty] < b[sortProperty] ? -1 : a[sortProperty] > b[sortProperty] ? 1 : 0;
        return result * sortDirection;
      });
    };

    _proto.customStatusSorter = function customStatusSorter(sortProperty, sortDirection, sortArray, context) {
      return sortArray.sort(function (a, b) {
        var result = a[sortProperty] < b[sortProperty] ? -1 : a[sortProperty] > b[sortProperty] ? 1 : 0;
        return result * sortDirection;
      });
    };

    return Submit;
  }()) || _class);
  _exports.Submit = Submit;
});;
define('text!modules/home/submit.html',[],function(){return "<template>\r\n    <div style=\"padding-top:100px;padding-left:50px;padding-right:50px;\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-5 offset-1\">\r\n                        <div if.bind=\"!isAuthenticated && !showRegisterPanel\">\r\n                            <h5>Register to submit an abstract.</h5>\r\n                        </div>\r\n                        <form if.bind=\"!isAuthenticated && !showRegisterPanel\" class=\"form-inline\">\r\n                            <div class=\"form-group mb-2\">\r\n                                <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"loginemail\"\r\n                                    placeholder=\"Email\"></input>\r\n                            </div>\r\n                            <div class=\"form-group mx-sm-3 mb-2\">\r\n                                <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"loginpassword\"\r\n                                    placeholder=\"Password\"></input>\r\n                            </div>\r\n                            <button class=\"btn btn-primary mb-2\" click.delegate='login()'>Login</button>\r\n                            <button class=\"btn btn-primary mb-2\" style=\"margin-left:5px;\"\r\n                                click.delegate='showRegister()'>Register</button>\r\n                        </form>\r\n                        <label if.bind=\"loginError\" style=\"color:black;margin-right:5px;\">${loginError}</label>\r\n                        <div show.bind=\"showRegisterPanel\">\r\n                            <h2>Register as an Author</h2>\r\n                            <form>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"firstName\">First name *</label>\r\n                                    <input value.bind=\"firstName\" type=\"text\" class=\"form-control\" id=\"firstName\"\r\n                                        aria-describedby=\"firstNameHelp\" placeholder=\"First Name\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"lastName\">Last name *</label>\r\n                                    <input value.bind=\"lastName\" type=\"text\" class=\"form-control\" id=\"lastName\"\r\n                                        aria-describedby=\"lastNameHelp\" placeholder=\"Last Name\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"university\">University/Company *</label>\r\n                                    <input value.bind=\"university\" type=\"text\" class=\"form-control\" id=\"university\"\r\n                                        aria-describedby=\"universityHelp\" placeholder=\"University\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"email\">Email *</label>\r\n                                    <input value.bind=\"email\" type=\"email\" class=\"form-control\" id=\"email\"\r\n                                        aria-describedby=\"emailHelp\" placeholder=\"Email\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"password\">Password *</label>\r\n                                    <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\"\r\n                                        aria-describedby=\"passwordHelp\" placeholder=\"Password\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"password_repeat\">Repeat password *</label>\r\n                                    <input value.bind=\"password_repeat\" type=\"password\" class=\"form-control\"\r\n                                        id=\"password_repeat\" aria-describedby=\"passwordrepeatHelp\"\r\n                                        placeholder=\"Repeat Password\">\r\n                                </div>\r\n                                <button class=\"btn btn-primary\" style=\"margin-top:25px\"\r\n                                    click.trigger=\"save()\">Register</button>\r\n                                <button class=\"btn btn-primary\" style=\"margin-top:25px\"\r\n                                    click.trigger=\"showRegister()\">Cancel</button>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                    <div if.bind=\"!isAuthenticated\" class=\"col-5\">\r\n                        <compose view=\"./guidelines.html\"></compose>\r\n                    </div>\r\n                </div>\r\n                <div show.bind=\"isAuthenticated\">\r\n                    <compose view=\"./submitTabs.html\"></compose>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    </div>\r\n</template>";});;
define('text!modules/home/submitTabs.html',[],function(){return "<template>\r\n    <ul class=\"nav nav-pills\">\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link active\" id=\"submitAbstract-tab\" data-toggle=\"tab\" href=\"#submitAbstract\" role=\"tab\"\r\n                aria-controls=\"submitAbstract\" aria-selected=\"true\">Submit an Abstract</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link\" id=\"guidelines-tab\" data-toggle=\"tab\" href=\"#guidelines\" role=\"tab\"\r\n                aria-controls=\"guidelines\" aria-selected=\"true\">Guidelines</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link\" id=\"mysubmissions-tab\" data-toggle=\"tab\" href=\"#mysubmissions\" role=\"tab\"\r\n                aria-controls=\"mysubmissions\" aria-selected=\"true\">My Submissions</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link\" show.bind=\"adminRole\" id=\"submissions-tab\" data-toggle=\"tab\"\r\n                href=\"#submissions\" role=\"tab\" aria-controls=\"submissions\" aria-selected=\"true\">Submissions</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link\" show.bind=\"adminRole\" id=\"reviewers-tab\" data-toggle=\"tab\" href=\"#reviewers\"\r\n                role=\"tab\" aria-controls=\"reviewers\" aria-selected=\"true\">Reviewers</a>\r\n        </li>\r\n    </ul>\r\n    <p></p>\r\n    <div class=\"tab-content\" id=\"myTabContent\">\r\n        <div class=\"tab-pane fade show active\" id=\"submitAbstract\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n            <div class=\"col-5\">\r\n                <compose view=\"./registerPanel.html\"></compose>\r\n            </div>\r\n        </div>\r\n        <div class=\"tab-pane fade\" id=\"guidelines\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n            <div class=\"col-7\">\r\n                <compose view=\"./guidelines.html\"></compose>\r\n            </div>\r\n        </div>\r\n        <div class=\"tab-pane fade\" id=\"mysubmissions\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n            <compose view=\"./mySubmissions.html\"></compose>\r\n        </div>\r\n        <div class=\"tab-pane fade\" id=\"submissions\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n            <compose view=\"./submissionsTable.html\"></compose>\r\n        </div>\r\n        <div class=\"tab-pane fade\" id=\"reviewers\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n            <compose view=\"./reviewersTable.html\"></compose>\r\n        </div>\r\n    </div>\r\n</template>";});;
define('text!modules/home/userSubmit.html',[],function(){return "";});;
define('text!resources/css/styles.css',[],function(){return "body, html {\r\n    height: 2500px;\r\n    font: 400 15px/1.8 \"Lato\", sans-serif;\r\n  }\r\n\r\n  .toolbar {\r\n    position:fixed;\r\n    z-index:1000;\r\n    width:100%;\r\n    left:0;\r\n    background-color:ghostwhite;\r\n  }\r\n\r\n  .smallMarginRight{\r\n    margin-right: 5px;\r\n  }\r\n\r\n  .sortable {\r\n    cursor: pointer;   \r\n  }\r\n\r\n  .has-error {\r\n      color:red;\r\n  }\r\n\r\n  .underline {\r\n    text-decoration: underline;\r\n    }\r\n\r\n.caption {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 25%;\r\n    width: 100%;\r\n    text-align: center;\r\n    color: #000;\r\n}\r\n\r\n.caption span.border {\r\n    background-color: #111;\r\n    color: #fff;\r\n    padding: 18px;\r\n    font-size: 25px;\r\n    letter-spacing: 10px;\r\n}\r\n\r\n  \r\n.parallax1 {\r\n    /* The image used */\r\n    background-image: url(\"/img/parallax1.jpg\");\r\n\r\n    /* Set a specific height */\r\n   height: 500px;\r\n\r\n    /* Create the parallax scrolling effect */\r\n    background-attachment: fixed;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n  \r\n.parallax2 {\r\n    /* The image used */\r\n    background-image: url(\"/img/parallax1.jpg\");\r\n\r\n    /* Set a specific height */\r\n   height: 200px;\r\n\r\n    /* Create the parallax scrolling effect */\r\n    background-attachment: fixed;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n.agenda {  }\r\n\r\n/* Dates */\r\n.agenda .agenda-date { width: 170px; }\r\n.agenda .agenda-date .dayofmonth {\r\n  width: 40px;\r\n  font-size: 36px;\r\n  line-height: 36px;\r\n  float: left;\r\n  text-align: right;\r\n  margin-right: 10px; \r\n}\r\n.agenda .agenda-date .shortdate {\r\n  font-size: 0.75em; \r\n}\r\n\r\n\r\n/* Times */\r\n.agenda .agenda-time { width: 140px; } \r\n\r\n\r\n/* Events */\r\n.agenda .agenda-events {  } \r\n.agenda .agenda-events .agenda-event {  } \r\n\r\n@media (max-width: 767px) {\r\n    \r\n}";});;
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
        x.withBaseUrl("http://c3po.ucc.uwm.edu/api/"); // x.withBaseUrl("http://localhost/api/");
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

    _proto.getAbstracts =
    /*#__PURE__*/
    function () {
      var _getAbstracts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.data.get('abstract');

              case 2:
                response = _context5.sent;

                if (!response.error) {
                  this.allAbstractArray = response;
                } else {
                  this.allAbstractArray = [];
                }

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getAbstracts() {
        return _getAbstracts.apply(this, arguments);
      }

      return getAbstracts;
    }();

    _proto.getAgenda =
    /*#__PURE__*/
    function () {
      var _getAgenda = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.data.get('agenda');

              case 2:
                response = _context6.sent;

                if (!response.error) {
                  this.agendaArray = response;
                } else {
                  this.agendaArray = [];
                }

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getAgenda() {
        return _getAgenda.apply(this, arguments);
      }

      return getAgenda;
    }();

    _proto.getPeople =
    /*#__PURE__*/
    function () {
      var _getPeople = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.data.get('people');

              case 2:
                response = _context7.sent;

                if (!response.error) {
                  this.peopleArray = response;
                } else {
                  this.peopleArray = [];
                }

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getPeople() {
        return _getPeople.apply(this, arguments);
      }

      return getPeople;
    }();

    _proto.savePerson =
    /*#__PURE__*/
    function () {
      var _savePerson = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(person) {
        var response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.data.saveObject(person, 'people', 'put');

              case 2:
                response = _context8.sent;
                return _context8.abrupt("return", response);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function savePerson(_x7) {
        return _savePerson.apply(this, arguments);
      }

      return savePerson;
    }();

    _proto.saveAbstractReviewer =
    /*#__PURE__*/
    function () {
      var _saveAbstractReviewer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(abstract) {
        var response;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.data.saveObject(abstract, 'abstract', 'put');

              case 2:
                response = _context9.sent;
                return _context9.abrupt("return", response);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function saveAbstractReviewer(_x8) {
        return _saveAbstractReviewer.apply(this, arguments);
      }

      return saveAbstractReviewer;
    }();

    _proto.getAbstract =
    /*#__PURE__*/
    function () {
      var _getAbstract = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.data.get('abstract/' + id);

              case 2:
                response = _context10.sent;

                if (response.error) {
                  _context10.next = 7;
                  break;
                }

                return _context10.abrupt("return", response);

              case 7:
                return _context10.abrupt("return", null);

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getAbstract(_x9) {
        return _getAbstract.apply(this, arguments);
      }

      return getAbstract;
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
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\r\n  <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark toolbar\"> \r\n    <img class=\"navbar-brand\" style=\"height:50px;\" src=\"img/sap_ua3.png\">\r\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\"\r\n      aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n      <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n    <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n      <ul class=\"navbar-nav\">\r\n        <li class=\"nav-item active\">\r\n          <a class=\"nav-link\" style=\"color:white;\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#/agenda\">Agenda</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"https://www.eventbrite.com/e/sap-next-gen-chapter-conference-tickets-58804908063\"\r\n            target=\"_blank\">Attendee Registration</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#/submit\">Presentation Submissions</a> \r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#/logistics\">Logistics</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\"\r\n            href=\"https://events.sap.com/us/sap-university-alliances-summer-workshops-2019/en/home\"\r\n            target=\"_blank\">SAP UA Bootcamps</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" target=\"_blank\" href=\"https://www.visitmilwaukee.org/\">Milwaukee</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n    <div>\r\n      <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n        <ul class=\"navbar-nav\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"#/contact\">Contact</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n    <!-- <form if.bind=\"!isAuthenticated\" class=\"form-inline my-2 my-lg-0\">\r\n        <label if.bind=\"loginError\" style=\"color:white;margin-right:5px;\">${loginError}</label>\r\n      <div class=\"form-group mb-2\">\r\n        <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"></input>\r\n      </div>\r\n      <div class=\"form-group mx-sm-3 mb-2\">\r\n        <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></input>\r\n      </div>\r\n      <button class=\"btn btn-primary mb-2\" click.delegate='login()'>Login</button>\r\n    </form>\r\n    <button if.bind=\"isAuthenticated\" class=\"btn btn-primary mb-2\" click.delegate='logout()'>Logout</button> -->\r\n    </div>\r\n  </nav>\r\n</template>";});;
define('resources/elements/table-navigation-bar',["exports", "aurelia-framework"], function (_exports, _aureliaFramework) {
  "use strict";

  _exports.__esModule = true;
  _exports.TableNavigationBar = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

  var TableNavigationBar = (_class = (_temp = function TableNavigationBar() {
    _initializerDefineProperty(this, "columnspan", _descriptor, this);

    _initializerDefineProperty(this, "dataTable", _descriptor2, this);

    _initializerDefineProperty(this, "pagebuttons", _descriptor3, this);
  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "columnspan", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "dataTable", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "pagebuttons", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.TableNavigationBar = TableNavigationBar;
});;
define('text!resources/elements/table-navigation-bar.html',[],function(){return "<template>\r\n    <div class='row'>\r\n        <div class=\"col-lg-2\">\r\n            <label style=\"padding-left:15px;\" class=\"pull-left\">Records ${dataTable.firstVisible} - ${dataTable.lastVisible}/${dataTable.displayLength}</label>\r\n        </div>\r\n        <div class=\"col-lg-8 text-center\">\r\n            <div  class=\"center-block\">\r\n                <span show.bind=\"dataTable.pageButtons.length > 1\">\r\n                    <ul class=\"pagination\" id=\"${navControl}\">\r\n                        <li click.trigger=\"dataTable.backward()\"><a href=\"#!\"><i class=\"fa fa-chevron-left\"></i></a></li>\r\n                            <li click.trigger=\"dataTable.pageButton($index, $event)\" class=\"hidden-xs hidden-sm waves-effect ${$first ? 'active' : ''}\" repeat.for=\"page of dataTable.pageButtons\"><a>${page}</a></li>\r\n                        <li click.trigger=\"dataTable.forward()\"><a href=\"#!\"><i class=\"fa fa-chevron-right\"></i></a></li>\r\n                    </ul>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n            <div class=\"input-field col-sm-12 hidden-xs hidden-sm\">\r\n                <label>Rows</label>\r\n                <select id=\"rowsShownSelect\" value.bind=\"dataTable.numRowsShown\" change.delegate=\"dataTable.updateTake()\" class=\"pull-right form-control\"\r\n                    style=\"width:100px;margin-left:5px;\">\r\n                    <option repeat.for=\"rows of dataTable.rowOptions\" value.bind=\"rows\">${rows}</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});;
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {
    config.globalResources(['./elements/nav-bar', './value-converters/reviewers', './value-converters/available-reviewers']);
  }
});;
define('resources/utils/dataTable',["exports", "aurelia-framework", "moment", "./utils"], function (_exports, _aureliaFramework, _moment, _utils) {
  "use strict";

  _exports.__esModule = true;
  _exports.DataTable = void 0;
  _moment = _interopRequireDefault(_moment);

  var _dec, _dec2, _class, _temp;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var DataTable = (_dec = (0, _aureliaFramework.transient)(), _dec2 = (0, _aureliaFramework.inject)(_utils.Utils), _dec(_class = _dec2(_class = (_temp =
  /*#__PURE__*/
  function () {
    function DataTable(utils) {
      this.currentPage = 0;
      this.pages = [];
      this.rowOptions = [5, 10, 15, 20, 50, 100, 200];
      this.filterValues = [];
      this.displayLength = void 0;
      this.DEFAULT_TAKE = 50;
      this.DEFAULT_START = 0;
      this.sortProperty = '';
      this.sortDirection = 1;
      this.currentPageElement = 0;
      this.startRecord = this.DEFAULT_START;
      this.take = this.DEFAULT_TAKE;
      this.firstVisible = this.startRecord + 1;
      this.lastVisible = this.startRecord + this.take - 1;
      this.numRowsShown = this.take.toString();
      this.active = false;
      this.utils = utils;
    }

    var _proto = DataTable.prototype;

    _proto.initialize = function initialize(context) {
      this.context = context;
    };

    _proto.pageOne = function pageOne() {
      setTimeout(function () {
        $(".pagination").children().removeClass('active');
        $($(".pagination").children()[1]).addClass('active'); // $("#" + this.context.navControl).children().removeClass('active');
        // $($("#" + this.context.navControl).children()[1]).addClass('active');
      }, 100);
    };

    _proto.createPageButtons = function createPageButtons(start) {
      this.displayLength = this.baseArray.length;
      this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
      var maxButtons = 7;
      this.currentPage = 1;
      this.pageButtons = [];
      this.numPageButtons = Math.ceil((this.displayLength - (start - 1) * this.take) / this.take);

      for (var j = 1; j < this.numPageButtons; j++) {
        this.pages[j] = j;
      }

      if (this.numPageButtons <= maxButtons + 1) {
        for (var i = start; i < this.numPageButtons + start; i++) {
          this.pageButtons.push(i);
        }
      } else {
        for (var i = start; i < maxButtons + start; i++) {
          this.pageButtons.push(i);
        }

        this.pageButtons.push('...');
        this.pageButtons.push(this.pages.length);
      }
    };

    _proto.buildDisplayArray = function buildDisplayArray() {
      this.displayArray = new Array();

      for (var i = 0; i <= this.take; i++) {
        if (i + this.startRecord >= this.baseArray.length) break;
        this.displayArray.push(this.baseArray[i + this.startRecord]);
      }

      this.createPageButtons(1);
    };

    _proto.forward = function forward() {
      $(".pagination").children().removeClass('active'); // $("#" + this.context.navControl).children().removeClass('active');

      this.currentPageElement = this.currentPageElement < this.pageButtons.length - 1 ? this.currentPageElement += 1 : this.currentPageElement;

      if (this.pageButtons[this.currentPageElement] == "...") {
        this.createPageButtons(this.pageButtons[0] + 1);
        this.currentPageElement -= 1;
      }

      $($(".pagination").children()[this.currentPageElement + 1]).addClass('active'); // $($("#" + this.context.navControl).children()[this.currentPageElement + 1]).addClass('active');

      var start = parseInt(this.startRecord);
      var tk = parseInt(this.take);
      this.startRecord = start + tk > this.baseArray.length ? start : start + tk;
      this.firstVisible = this.startRecord + 1;
      this.lastVisible = parseInt(this.firstVisible) + tk - 1 > this.displayArray.length ? this.displayArray.length : parseInt(this.firstVisible) + tk - 1;
      this.buildDisplayArray(); // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
    };

    _proto.createPage = function createPage() {
      $($(".pagination")[this.currentPage - 1]).addClass('active');
    };

    _proto.backward = function backward() {
      $(".pagination").children().removeClass('active');
      this.currentPageElement = this.currentPageElement > 0 ? this.currentPageElement -= 1 : this.currentPageElement;

      if (this.currentPageElement == 0 && this.pageButtons[this.currentPageElement] != 1) {
        this.createPageButtons(this.pageButtons[0] - 1);
      }

      if (this.pageButtons[this.currentPageElement] == "...") {
        var start = this.numPageButtons >= 8 ? this.numPageButtons - 8 : 1;
        this.createPageButtons(start); //this.context.currentPageElement = 1
      }

      $($(".pagination").children()[this.currentPageElement + 1]).addClass('active'); //  $($("#" + this.context.navControl).children()[this.currentPageElement + 1]).addClass('active');

      var start = parseInt(this.startRecord);
      var tk = parseInt(this.take);
      this.startRecord = start - tk < 0 ? 0 : this.startRecord = start - tk;
      this.firstVisible = this.startRecord + 1;
      this.lastVisible = parseInt(this.firstVisible) + tk - 1;
      this.buildDisplayArray(); // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
    };

    _proto.pageButton = function pageButton(index, el) {
      $(".pagination").children().removeClass('active'); //  $("#" + this.context.navControl).children().removeClass('active');

      $(el.target).closest('li').addClass('active');
      this.currentPageElement = index;
      var start = parseInt(this.startRecord);
      var tk = parseInt(this.take);

      if (this.pageButtons[index] !== '...') {
        this.startRecord = (this.pageButtons[index] - 1) * tk;
        this.firstVisible = this.startRecord + 1;
        this.lastVisible = parseInt(this.firstVisible) + tk - 1 > this.displayArray.length ? this.displayArray.length : parseInt(this.firstVisible) + tk - 1;
      } // if(typeof(this.context.navigate) === 'function')  this.context.navigate();


      this.buildDisplayArray();
    };

    _proto.updateTake = function updateTake() {
      this.take = this.numRowsShown;
      this.startRecord = 0;
      this.lastVisible = parseInt(this.firstVisible) + parseInt(this.take) - 1;
      this.createPageButtons(1);
      this.pageOne();
      this.buildDisplayArray();
    };

    _proto.filterList = function filterList(el, array) {
      el.preventDefault();
      array = array || new Array(); //If the property is already in filterValues, filter it out

      this.filterValues = this.filterValues.filter(function (obj) {
        return obj.property !== el.target.id;
      }); //If the filter value is not set to empty, add it to filterValues

      if (el.target.value !== "") {
        switch (el.target.type) {
          case 'select-one':
            this.filterValues.push({
              property: el.target.id,
              value: el.target.options[el.target.selectedIndex].value,
              type: el.target.type,
              compare: $(el.target).attr("compare")
            });
            break;

          default:
            this.filterValues.push({
              property: el.target.id,
              value: el.target.value,
              type: el.target.type,
              compare: $(el.target).attr("compare")
            });
        }
      } //If there are no filters in filterValues, reset the displayArray to the original list


      if (this.filterValues.length > 0) {
        this.baseArray = this.filter(this.filterValues, array);
      } else {
        this.baseArray = this.sourceArray;
      }

      this.startRecord = this.DEFAULT_START;
      this.firstVisible = 1;
      this.buildDisplayArray();
      this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
      this.pageOne();
    };

    _proto.filterList = function filterList(value, options) {
      options.lookupArray = options.lookupArray || new Array(); //If the property is already in filterValues, filter it out

      this.filterValues = this.filterValues.filter(function (obj) {
        return obj.options.filter !== options.filter;
      }); //Parse collection property

      if (options.type.indexOf('obj') == -1 && options.type != 'custom') {
        var properties = options.collectionProperty.split('.');
        var condition = "item";

        for (var j = 0; j < properties.length; j++) {
          if (properties[j].indexOf('[') > -1) {
            condition += properties[j];
          } else {
            condition += "['" + properties[j] + "']";
          }
        }

        options.collectionProperty = condition;
      } //If the filter value is not set to empty, add it to filterValues 


      if (typeof value == 'object' && !(value instanceof Date) && !Array.isArray(value)) value = value.target.value;

      if (value !== "") {
        this.filterValues.push({
          options: options,
          value: value
        });
      } //If there are no filters in filterValues, reset the displayArray to the original list


      if (this.filterValues.length > 0) {
        this.baseArray = this.filter(this.filterValues);
      } else {
        this.baseArray = this.sourceArray;
      }

      this.startRecord = this.DEFAULT_START;
      this.firstVisible = 1;
      this.buildDisplayArray();
      this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
      this.pageOne();
    };

    _proto.applyFilters = function applyFilters() {
      this.filter(this.filterValues);
    };

    _proto.filter = function filter(filters) {
      var keep;
      var index = 0;
      var that = this;
      return this.sourceArray.filter(function (item) {
        keep = false;

        for (var i = 0; i < filters.length; i++) {
          var filterItem = filters[i];
          var matchValue = undefined;

          if (filterItem.options.compare.indexOf('custom') > -1) {
            matchValue = true;
          } else {
            matchValue = eval(filterItem.options.collectionProperty);
          }

          if (matchValue != undefined || filterItem.options.type === "boolean" && matchValue == undefined) {
            switch (filterItem.options.type) {
              case 'custom':
                keep = filterItem.options.filter(filterItem.value, item, that.context);
                break;

              case 'text':
                if (filterItem.options.compare.indexOf('not') > -1) {
                  keep = matchValue.toUpperCase().indexOf(filterItem.value.toUpperCase()) == -1;
                } else {
                  keep = matchValue.toUpperCase().indexOf(filterItem.value.toUpperCase()) > -1;
                }

                break;

              case 'value':
                if (filterItem.options.compare.indexOf('not') > -1) {
                  keep = matchValue != filterItem.value;
                } else {
                  keep = matchValue == filterItem.value;
                }

                break;

              case "boolean":
                if (matchValue == undefined) {
                  keep = eval(filterItem.value) == false;
                } else {
                  keep = matchValue === eval(filterItem.value);
                }

                break;

              case "date":
                switch (filterItem.options.compare) {
                  case 'after':
                    if (matchValue) {
                      var dt = (0, _moment.default)(matchValue).format('YYYY-MM-DD');
                      keep = (0, _moment.default)(dt).isAfter(filters[i].value);
                    }

                    break;

                  default:
                    if (matchValue) {
                      var dt = (0, _moment.default)(matchValue).format('YYYY-MM-DD');
                      keep = (0, _moment.default)(dt).isSame(filters[i].value);
                    }

                }

            }
          }

          if (!keep) break;
        }

        return keep;
      });
    }
    /***************************************************************
     * propertyName - property to sort on unless a surrogate is provided 
     * type - indicates an alternate sorting method
     * surrogateArray - array that contains the property on which you want to sort
     * surrogateProperty - property in surrogate array that matches propertyname
     * sortProperty - property showing in table on which sort is actually performed
     * sortDirectionParam - direction of sort
     */
    ;

    _proto.sortArray = function sortArray(el, options, reSort) {
      var _this = this;

      //propertyName, type, surrogateArray, surrogateProperty, sortProperty, sortDirectionParam){
      if (reSort) {
        if (!this.lastOption || !this.lastEl) return;
        el = this.lastEl;
        options = this.lastOption;
      } else {
        this.lastEl = el;
        this.lastOption = options;
      }

      if (options.sortDirectionParam) this.sortDirection = sortDirectionParam;
      this.sortProperty = options.propertyName;

      if (options.propertyName === this.sortProperty) {
        this.sortDirection *= -1;
      } else {
        this.sortDirection = 1;
      }

      $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');

      if (this.sortDirection < 0) {
        var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
      } else {
        var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
      }

      $(el.target).next().replaceWith(icon);

      if (!options.type) {
        if (options.propertyName.indexOf('.') > -1) {
          var array = options.propertyName.split('.');
        }

        if (array) {
          this.baseArray = this.baseArray.sort(function (a, b) {
            var result = a[array[0]][array[1]] < b[array[0]][array[1]] ? -1 : a[array[0]][array[1]] > b[array[0]][array[1]] ? 1 : 0;
            return result * _this.sortDirection;
          });
        } else {
          this.baseArray = this.baseArray.sort(function (a, b) {
            var result = a[options.propertyName] < b[options.propertyName] ? -1 : a[options.propertyName] > b[options.propertyName] ? 1 : 0;
            return result * _this.sortDirection;
          });
        }
      } else if (options.type == 'custom') {
        if (typeof options.sorter == 'function') {
          var sortArray = this.utils.copyArray(this.baseArray);
          this.baseArray = options.sorter(this.sortProperty, this.sortDirection, sortArray, this.context);
        }
      } else {
        var properties = options.searchProperty.split('.');
        var condition = "item";

        for (var j = 0; j < properties.length; j++) {
          if (properties[j].indexOf('[') > -1) {
            condition += properties[j];
          } else {
            condition += "['" + properties[j] + "']";
          }
        }

        var sortArray = this.utils.copyArray(this.baseArray);
        sortArray.forEach(function (item) {
          var obj = _this.findObj(options.surrogateArray, options.surrogateProperty, eval(condition));

          item[options.propertyName] = obj ? obj[options.propertyName] : null;
        });
        this.baseArray = sortArray.sort(function (a, b) {
          var result = a[options.propertyName] < b[options.propertyName] ? -1 : a[options.propertyName] > b[options.propertyName] ? 1 : 0;
          return result * _this.sortDirection;
        });
      }

      this.startRecord = this.DEFAULT_START;
      this.firstVisible = 1;
      this.buildDisplayArray();
      this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
      this.pageOne();
    };

    _proto.findObj = function findObj(surrogateArray, surrogateProperty, propertyValue) {
      for (var i = 0, x = surrogateArray.length; i < x; i++) {
        if (surrogateArray[i][surrogateProperty] == propertyValue) return surrogateArray[i];
      }

      return null;
    };

    _proto.updateArray = function updateArray(sourceArray, sortProperty, sortDirection) {
      var _this2 = this;

      if (sourceArray) {
        this.sourceArray = new Array();
        this.baseArray = new Array();
        this.active = true;
        this.filterValues = new Array();
        sourceArray.forEach(function (item, index) {
          item.baseIndex = index;
          item.originalIndex = index;

          _this2.sourceArray.push(item);

          _this2.baseArray.push(item);
        }); // this.baseArray.forEach(function(item, index){
        //   item.baseIndex = index;
        //   item.originalIndex = index;
        // });

        if (sortProperty) {
          this.baseArray.sort(function (a, b) {
            var result = a[sortProperty] - b[sortProperty];
            return result * sortDirection;
          });
        }

        this.buildDisplayArray();
      }
    };

    _proto.updateArrayMaintainFilters = function updateArrayMaintainFilters(sourceArray, sortProperty, sortDirection) {
      var _this3 = this;

      if (sourceArray) {
        this.sourceArray = new Array();
        this.baseArray = new Array();
        this.active = true;
        sourceArray.forEach(function (item) {
          _this3.sourceArray.push(item);

          _this3.baseArray.push(item);
        });
        if (this.filterValues.length) this.baseArray = this.filter(this.filterValues);
        this.baseArray.forEach(function (item, index) {
          item.baseIndex = index;
          item.originalIndex = index;
        });

        if (sortProperty) {
          this.baseArray.sort(function (a, b) {
            var result = a[sortProperty] - b[sortProperty];
            return result * sortDirection;
          });
        } // this.filter(this.filterValues);


        this.buildDisplayArray();
      }
    };

    _proto.getOriginalIndex = function getOriginalIndex(index) {
      return this.displayArray[index].originalIndex;
    };

    return DataTable;
  }(), _temp)) || _class) || _class);
  _exports.DataTable = DataTable;
});;
define('resources/utils/utils',["exports", "aurelia-framework", "jquery", "toastr", "aurelia-notification", "moment"], function (_exports, _aureliaFramework, _jquery, toastr, _aureliaNotification, _moment) {
  "use strict";

  _exports.__esModule = true;
  _exports.Utils = void 0;
  _jquery = _interopRequireDefault(_jquery);
  toastr = _interopRequireWildcard(toastr);
  _moment = _interopRequireDefault(_moment);

  var _dec, _class;

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var Utils = (_dec = (0, _aureliaFramework.inject)(_aureliaNotification.Notification), _dec(_class =
  /*#__PURE__*/
  function () {
    function Utils(notification) {
      this.notification = notification;
      this.notification.waitForMove = true;
      toastr.options.extendedTimeOut = "1000";
      toastr.options.timeOut = "1500"; // toastr.options = {
      //   "closeButton": false,
      //   "debug": false,
      //   "newestOnTop": false,
      //   "progressBar": false,
      //   "positionClass": "toast-top-right",
      //   "preventDuplicates": false,
      //   "onclick": null,
      //   "showDuration": "100",
      //   "hideDuration": "1000",
      //   "timeOut": "1000",
      //   "extendedTimeOut": "1000",
      //   "showEasing": "swing",
      //   "hideEasing": "linear",
      //   "showMethod": "fadeIn",
      //   "hideMethod": "fadeOut"
      // }
    }

    var _proto = Utils.prototype;

    _proto.guid = function guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
    /*****************************************************************************
     * Display a notification
     * msg - the message to display
     ****************************************************************************/
    ;

    _proto.showNotification = function showNotification(msg, type) {
      type = type ? type : "success";
      toastr[type](msg); // this.notification.note(msg);
    }
    /*****************************************************************************
     * Count the the items in an array
     * value - the value to count
     * property - the object property to look for the value
     * itemArray - the array
     ****************************************************************************/
    ;

    _proto.countItems = function countItems(value, property, itemArray) {
      var countArray = itemArray.filter(function (item) {
        return item[property] == value;
      });
      return countArray.length;
    };

    _proto.arrayContainsValue = function arrayContainsValue(array, property, value) {
      for (var i = 0, x = array.length; i < x; i++) {
        if (array[i][property] == value) {
          return i;
        }
      }

      return -1;
    }
    /*************************************************************************
    * Compare to objects to determine if they are equal
    * obj1 - first object
    * obj2 - second object
    * skip - an array of properties to skip
    *************************************************************************/
    ;

    _proto.objectsEqual = function objectsEqual(obj1, obj2, skip) {
      var changes = new Array();
      var skipArray = skip || new Array();

      for (var property in obj1) {
        if (obj1.hasOwnProperty(property)) {
          if (!obj1[property] && !obj2[property] || skipArray.indexOf(property) !== -1) {
            continue;
          } else if (Array.isArray(obj1[property])) {
            if (!this.arraysEqual(obj1[property], obj2[property])) {
              changes.push({
                property: property,
                oldValue: obj2[property].length,
                newValue: obj1[property].length
              });
            }
          } else if (property.indexOf('Date') > -1 || property.indexOf('date') > -1 || obj1[property] instanceof Date) {
            var date1 = new Date(obj1[property]);
            var date2 = new Date(obj2[property]);

            if (!(0, _moment.default)(date1).isSame(date2, 'year') || !(0, _moment.default)(date1).isSame(date2, 'month') || !(0, _moment.default)(date1).isSame(date2, 'day')) {
              changes.push({
                property: property,
                oldValue: obj2[property],
                newValue: obj1[property]
              });
            }
          } else if (typeof obj1[property] === 'object') {
            var areEqual = true;

            for (var x in obj1[property]) {
              if (obj1[property][x] != obj2[property][x]) areEqual = false;
            }

            if (!areEqual) {
              changes.push({
                property: property,
                oldValue: obj2[property],
                newValue: obj1[property]
              });
            }
          } else {
            if (obj1[property] != obj2[property]) {
              if (!(obj1[property] === "" && obj2[property] === undefined)) {
                changes.push({
                  property: property,
                  oldValue: obj2[property],
                  newValue: obj1[property]
                });
              }
            }
          }
        }
      }

      return changes;
    }
    /********************************************************************************
    * Compare to arrays
    ********************************************************************************/
    ;

    _proto.arraysEqual = function arraysEqual(array1, array2) {
      var arraysEqual = true;

      if (array1.length != array2.length) {
        return false;
      } else {
        var newArray = new Array();

        for (var i = 0; i < array1.length; i++) {
          newArray[i] = JSON.stringify(array1[i]);
        }

        for (var i = 0; i < array1.length; i++) {
          if (newArray.indexOf(JSON.stringify(array2[i])) == -1) {
            return false;
          }
        }
      }

      return true;
    }
    /************************************************************************************
    * Copy one object into another, used when you want a completly new object and not a reference
    * objFrom - object to copy from
    * objTO - object to copy to
    * properties - an array of specific properties to copy
    ***********************************************************************************/
    ;

    _proto.copyObject = function copyObject(objFrom, objTo, properties) {
      objTo = objTo || new Object();
      ;

      if (!properties) {
        for (var property in objFrom) {
          if (objFrom.hasOwnProperty(property)) {
            if (Array.isArray(objFrom[property])) {
              objTo[property] = this.copyArray(objFrom[property]);
            } else if (objFrom[property] instanceof Date) {
              objTo[property] = objFrom[property];
            } else if (this.isObject(objFrom[property])) {
              objTo[property] = this.copyObject(objFrom[property]);
            } else {
              objTo[property] = objFrom[property];
            }
          }
        }
      } else {
        for (var i = 0, x = properties.length; i < x; i++) {
          if (objFrom.hasOwnProperty(properties[i])) {
            if (Array.isArray(objFrom[property])) {
              objTo[property] = this.copyArray(objFrom[property]);
            } else if (objFrom[property] instanceof Date) {
              objTo[property] = objFrom[property];
            } else if (this.isObject(objFrom[property])) {
              objTo[property] = this.copyObject(objFrom[property]);
            } else {
              objTo[property] = objFrom[property];
            }
          }
        }
      }

      return objTo;
    }
    /*******************************************************************************
     * Return a copy of an array
     *******************************************************************************/
    ;

    _proto.copyArray = function copyArray(array) {
      var _this = this;

      if (array) {
        var newArray = new Array();
        array.forEach(function (item) {
          if (Array.isArray(item)) {
            newArray.push(_this.copyArray(item));
          } else if (_this.isObject(item)) {
            newArray.push(_this.copyObject(item));
          } else {
            newArray.push(item);
          }
        });
        return newArray;
      }

      return null;
    }
    /*********************************************************************************
     * Test of a variable is an object
    *********************************************************************************/
    ;

    _proto.isObject = function isObject(obj) {
      return obj === Object(obj);
    };

    _proto.toCamelCase = function toCamelCase(str) {
      return str.toLowerCase().replace(/['"]/g, '').replace(/\W+/g, ' ').replace(/ (.)/g, function ($1) {
        return $1.toUpperCase();
      }).replace(/ /g, '');
    };

    _proto.lookupValue = function lookupValue(value, array, lookUpProperty, returnProperty) {
      if (!value || !array) {
        return;
      }

      for (var i = 0, x = array.length; i < x; i++) {
        if (array[i][lookUpProperty] == value) {
          return array[i][returnProperty];
        }
      }

      return null;
    };

    _proto.isMobile = function isMobile(device) {
      switch (device) {
        case 'Android':
          return navigator.userAgent.match(/Android/i);
          break;

        case 'iOS':
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          break;

        default:
          return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i);
          break;
      } // var isMobile = {
      //     Android: function() {
      //         return navigator.userAgent.match(/Android/i);
      //     },
      //     BlackBerry: function() {
      //         return navigator.userAgent.match(/BlackBerry/i);
      //     },
      //     iOS: function() {
      //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      //     },
      //     Opera: function() {
      //         return navigator.userAgent.match(/Opera Mini/i);
      //     },
      //     Windows: function() {
      //         return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      //     },
      //     any: function() {
      //         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      //     }
      // };

    };

    return Utils;
  }()) || _class);
  _exports.Utils = Utils;
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
define('resources/value-converters/available-reviewers',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.AvailableReviewersValueConverter = void 0;

  var AvailableReviewersValueConverter =
  /*#__PURE__*/
  function () {
    function AvailableReviewersValueConverter() {}

    var _proto = AvailableReviewersValueConverter.prototype;

    _proto.toView = function toView(value, reviewers) {
      if (!value || !reviewers) return [];
      var availableReviewers = [];
      value.forEach(function (item) {
        if (item.role.indexOf('reviewer') > -1) {
          var keep = true;
          reviewers.forEach(function (item2) {
            if (item2._id === item._id) keep = false;
          });
        }

        if (keep) availableReviewers.push(item);
      });
      return availableReviewers;
    };

    return AvailableReviewersValueConverter;
  }();

  _exports.AvailableReviewersValueConverter = AvailableReviewersValueConverter;
});;
define('resources/value-converters/reviewers',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.ReviewersValueConverter = void 0;

  var ReviewersValueConverter =
  /*#__PURE__*/
  function () {
    function ReviewersValueConverter() {}

    var _proto = ReviewersValueConverter.prototype;

    _proto.toView = function toView(value, reviewers) {
      if (!value) return [];
      var reviewerArray = [];
      var nonReviewerArray = [];
      value.forEach(function (item) {
        if (item.role.indexOf('reviewer') > -1) {
          reviewerArray.push(item);
        } else {
          nonReviewerArray.push(item);
        }
      });

      if (reviewers) {
        return reviewerArray;
      } else {
        return nonReviewerArray;
      }
    };

    _proto.fromView = function fromView(value) {};

    return ReviewersValueConverter;
  }();

  _exports.ReviewersValueConverter = ReviewersValueConverter;
});;
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map