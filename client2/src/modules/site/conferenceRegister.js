import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Config } from '../../resources/config/config'
import { DataLayer } from '../../resources/data/dataLayer';
import { Utils } from '../../resources/config/utils';

@inject(Router, Config, DataLayer, Utils)
export class Conf2021Register {

    countries = [
        { code: "AR", country: "Argentina" },
        { code: "BR", country: "Brazil" },
        { code: "CA", country: "Canada" },
        { code: "CL", country: "Chile" },
        { code: "CO", country: "Columbia" },
        { code: "CR", country: "Costa Rica" },
        { code: "EC", country: "Ecuador" },
        { code: "JM", country: "Jamaica" },
        { code: "MX", country: "Mexico" },
        { code: "PE", country: "Peru" },
        { code: "Uruguay", country: "UY" },
        { code: "US", country: "USA" },
        { code: "VE", country: "Venezuela" },
        { code: "Other", country: "Other" }
    ];

    roles = [
        "Dean/Administrator",
        "Faculty Coordinator",
        "Professor/Lecturer",
        "Student",
        "Other"
    ];

    disciplines = [
        "Accounting/Finance",
        "Computer Science",
        "Engineering",
        "Human Capital Management",
        "Information Systems",
        "Management",
        "Marketing",
        "Operations/Supply Chain",
        "Other"
    ];

    relationships = [
        "Full Member",
        "Associate Member",
        "Prospective Member",
        "SAP Customer",
        "SAP Employee",
        "SAP Partner",
        "Other",
    ];

    howLongs = [
        "0 - 1 year",
        "1 - 5 years",
        "6 - 10 years",
        "More than 10 years"
    ];

    dataBrowser = [
        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
    ]
    better_browser = '<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>We are sorry but it looks like your Browser doesn\'t support our website Features. In order to get the full experience please download a new version of your favourite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';

    constructor(router, config, data, utils) {
        this.router = router;
        this.config = config;
        this.data = data;
        this.utils = utils;

        this.pageHeader = "SAP Academic Community Conference 2021";
        this.pageSubHeader = "September 11-12, 2021";

        this.fee = "$50.00 USD";
    }

    async sendEmail(){
        let response = await this.data.sendEmail(this.newRegObject);
    }

    activate() {
        this.newRegObject = {
            event: "SAPNAAC Conference 2021",
            firstName: "",
            lastName: "",
            email: "",
            organization: "",
            discipline: "",
            relationship: "",
            howLong: "",
            country: "",
        }

        this.paypalURL = "https://www.paypal.com/sdk/js?client-id=AdG7HOB9ups2a4OOPuJuZKGadkv4qlFIXkkG4trDM_HKI3rl---nO0FEEyNPLHD-p-o8cWnNOdExGvfA&currency=USD&disable-funding=credit"
    }

    attached() {
        $(window).scrollTop(0);
        this.initGaia();
        // setTimeout(()=>{this.initPayPalButton();}, 5000);       
    }

    initPayPalButton() {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'pay',

            },

            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{ "description": "Conference Fee", "amount": { "currency_code": "USD", "value": 50 } }]
                });
            },

            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    this.paid = true;
                    this.payer = details.payer.name.given_name;
                    // alert('Transaction completed by ' + details.payer.name.given_name + '!');
                });
            },

            onError: function (err) {
                console.log(err);
            }
        }).render('#paypal-button-container');
    }

    async checkEmail() {
        let response = await this.data.checkEmail(this.newRegObject.email);
        if(response.status === 'unavailable'){
            this.registrant = response.registrant;
            this.duplicateEmailMessage = true;
        } else {
            this.registrant = undefined;
            this.duplicateEmailMessage = false;
        }
    }

    goToPaymenPage(){
        if(this.registrant){
            this.router.navigateToRoute('confPayment', { id:this.registrant._id });
        }
    }

    validateInput() {
        this.inputErrors = [];
        this.firstnameError = false;
        this.lastnameError = false;
        this.emailError = false;
        this.organizationError = false;
        this.countryError = false;
        this.disciplineError = false;
        this.relationshipError = false;
        this.experienceError = false;
        this.roleError = false
        this.experienceError = false;
        if (this.newRegObject.firstName === "") {
            this.inputErrors.push('First name is required');
            this.firstnameError = true;
        }
        if (this.newRegObject.lastName === "") {
            this.inputErrors.push('Last name is required');
            this.lastnameError = true;
        }
        if (this.newRegObject.email === "") {
            this.inputErrors.push('Email is required');
            this.emailError = true;
        }
        if (this.newRegObject.organization === "") {
            this.inputErrors.push('Organization is required');
            this.organizationError = true;
        }
        if (this.newRegObject.country === "") {
            this.inputErrors.push('Country is required');
            this.countryError = true;
        }
        if (this.newRegObject.discipline === "") {
            this.inputErrors.push('discipline is required');
            this.disciplineError = true;
        }
        if (this.newRegObject.relationship === "") {
            this.inputErrors.push('relationship is required');
            this.relationshipError = true;
        }
        if (this.newRegObject.experience === "") {
            this.inputErrors.push('experience is required');
            this.experienceError = true;
        }
        if (this.newRegObject.role === "") {
            this.inputErrors.push('Role is required');
            this.roleError = true;
        }
        if (this.newRegObject.experience === "") {
            this.inputErrors.push('experience is required');
            this.experienceError = true;
        }
    }

    async register() {
        if(this.duplicateEmailMessage === false){
            this.validateInput();
            if (!this.inputErrors.length) {
                let response = await this.data.saveConferenceRegistration(this.newRegObject);
                if (!response.error && response.email === this.newRegObject.email ) {
                    this.router.navigateToRoute('confPayment', { id:response._id });
                }
            }
        }  
    }

    searchString(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    }

    initGaia() {
        var transparent = true;

        var fixedTop = false;

        var navbar_initialized = false;

        var scroll;

        scroll = (2500 - $(window).width()) / $(window).width();

        var window_height;
        var window_width;

        var content_opacity = 0;
        var content_transition = 0;
        var no_touch_screen = false;

        var burger_menu;

        var scroll_distance = 500;


        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";


        if (this.browser == 'Explorer' && this.version <= 9) {
            $('body').html(this.better_browser);
        }

        window_width = $(window).width();
        window_height = $(window).height();

        burger_menu = $('.navbar').hasClass('navbar-burger') ? true : false;

        if (!Modernizr.touch) {
            $('body').addClass('no-touch');
            no_touch_screen = true;
        }

        // Init navigation toggle for small screens
        if (window_width < 992 || burger_menu) {
            gaia.initRightMenu();
        }

        if ($('.content-with-opacity').length != 0) {
            content_opacity = 1;
        }

        $navbar = $('.navbar[color-on-scroll]');
        scroll_distance = $navbar.attr('color-on-scroll') || 500;

        // $('.google-map').each(function () {
        //     var lng = $(this).data('lng');
        //     var lat = $(this).data('lat');

        //     gaia.initGoogleMaps(this, lat, lng);
        // });



        //activate collapse right menu when the windows is resized
        $(window).resize(function () {
            if ($(window).width() < 992) {
                gaia.initRightMenu();
                //gaia.checkResponsiveImage();
            }
            if ($(window).width() > 992 && !burger_menu) {
                $('nav[role="navigation"]').removeClass('navbar-burger');
                gaia.misc.navbar_menu_visible = 1;
                navbar_initialized = false;
            }
        });

        $(window).on('scroll', function () {

            gaia.checkScrollForTransparentNavbar();


            if (window_width > 992) {
                gaia.checkScrollForParallax();
            }

            if (content_opacity == 1) {
                gaia.checkScrollForContentTransitions();
            }

        });

        $('a[data-scroll="true"]').click(function (e) {
            var scroll_target = $(this).data('id');
            var scroll_trigger = $(this).data('scroll');

            if (scroll_trigger == true && scroll_target !== undefined) {
                e.preventDefault();

                $('html, body').animate({
                    scrollTop: $(scroll_target).offset().top - 50
                }, 1000);
            }

        });

        gaia = {
            misc: {
                navbar_menu_visible: 0
            },
            initRightMenu: function () {

                if (!navbar_initialized) {
                    $toggle = $('.navbar-toggle');
                    $toggle.click(function () {

                        if (gaia.misc.navbar_menu_visible == 1) {
                            $('html').removeClass('nav-open');
                            gaia.misc.navbar_menu_visible = 0;
                            $('#bodyClick').remove();
                            setTimeout(function () {
                                $toggle.removeClass('toggled');
                            }, 550);

                        } else {
                            setTimeout(function () {
                                $toggle.addClass('toggled');
                            }, 580);

                            div = '<div id="bodyClick"></div>';
                            $(div).appendTo("body").click(function () {
                                $('html').removeClass('nav-open');
                                gaia.misc.navbar_menu_visible = 0;
                                $('#bodyClick').remove();
                                setTimeout(function () {
                                    $toggle.removeClass('toggled');
                                }, 550);
                            });

                            $('html').addClass('nav-open');
                            gaia.misc.navbar_menu_visible = 1;

                        }
                    });
                    navbar_initialized = true;
                }

            },

            checkScrollForTransparentNavbar: this.debounce(function () {
                if ($(document).scrollTop() > scroll_distance) {
                    if (transparent) {
                        transparent = false;
                        $navbar.removeClass('navbar-transparent');
                    }
                } else {
                    if (!transparent) {
                        transparent = true;
                        $navbar.addClass('navbar-transparent');
                    }
                }
            }, 17),

            checkScrollForParallax: this.debounce(function () {
                let that = this;
                $('.parallax').each(function () {
                    var $elem = $(this);

                    if (that.isElementInViewport($elem)) {
                        var parent_top = $elem.offset().top;
                        var window_bottom = $(window).scrollTop();
                        var $image = $elem.children('.image');

                        let oVal = ((window_bottom - parent_top) / 3);
                        $image.css('transform', 'translate3d(0px, ' + oVal + 'px, 0px)');
                    }
                });

            }, 6),

            checkScrollForContentTransitions: this.debounce(function () {
                let that = this;
                $('.content-with-opacity').each(function () {
                    var $content = $(this);

                    if (that.isElementInViewport($content)) {
                        var window_top = $(window).scrollTop();
                        let opacityVal = 1 - (window_top / 230);

                        if (opacityVal < 0) {
                            opacityVal = 0;
                            return;
                        } else {
                            $content.css('opacity', opacityVal);
                        }

                    }
                });
            }, 6),


            isElementInViewport: function (elem) {
                var $elem = $(elem);

                // Get the scroll position of the page.
                var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
                var viewportTop = $(scrollElem).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                // Get the position of the element on the page.
                var elemTop = Math.round($elem.offset().top);
                var elemBottom = elemTop + $elem.height();

                return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
            }

        }

    };

    debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    };

    searchVersion(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    }
}