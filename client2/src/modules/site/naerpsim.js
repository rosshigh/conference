import { inject } from 'aurelia-framework';
import { Config } from '../../resources/config/config';
import { ERPSIMTEAMS } from '../../resources/data/erpsim';

@inject(Config, ERPSIMTEAMS)
export class NAErpSIM {

    dataBrowser = [
        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
    ]
    better_browser = '<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>We are sorry but it looks like your Browser doesn\'t support our website Features. In order to get the full experience please download a new version of your favourite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';

    constructor(config, erpsim) {
        this.config = config;
        this.erpsim = erpsim;

        this.pageHeader = "2021 North American ERPsim Competition";
        this.pageSubHeader = "";
    }

    attached() {
        $(window).scrollTop(0);
        this.initGaia();
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

    showRegistrationForm(){
        this.institutionError = false;
        this.coachError = false;
        this.coachError = false;
        this.studentError = false;
        this.newRegObject = {
            institution: "",
            coach: "",
            coachEmail: "",
            students: [],
            preference: 0
        };

        for(let i = 0; i<=4; i++){
            this.newRegObject.students.push({
                name: "",
                email: ""
            });
        }
        this.showForm = true;
    }

    cancelRegistration(){
        this.showForm = false;
    }

    validateEntry(){
        this.institutionError = false;
        this.coachError = false;
        this.coachError = false;
        let errors = false;
        if( this.newRegObject.institution===""){
            errors = true;
            this.institutionError = true;
        }
        if( this.newRegObject.coach===""){
            errors = true;
            this.coachError = true;
        }
        if( this.newRegObject.coachEmail===""){
            errors = true;
            this.coachEmailError = true;
        }

        this.studentError = true;
        this.newRegObject.students.forEach(item => {
            if(item.name !== "" && item.email !== ""){
                this.studentError = false;
            }
        });

        return !errors && !this.studentError;
    }

    async saveRegistration(){
        if(this.validateEntry()){
            let response = await this.erpsim.saveTeam(this.newRegObject);
            if(!response.error){
                alert("Your teams has been registered!");
            }
        }
    }
}