import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Config } from '../../resources/config/config'

@inject(Router, Config)
export class homePage {

  constructor(router, config) {
    this.router = router;
    this.config = config;
  }

  attached() {
    // this.function1();
    // this.functionScroll();
  }

  function1() {
    var t = document.querySelectorAll('[data-toggle="animation"]');
    function a(e, t) {
      "fpAfterLoad" == t ? e.closest(".fp-section").classList.contains("active") && e.classList.add("animate") : e.classList.add("animate")
    }
    "load fpAfterLoad".split(" ").forEach(
      function (e) {
        window.addEventListener(e, function (n) {
          var o = n.type;[].forEach.call(t, function (e) {
            var t = e.getAttribute("data-animation-trigger");
            if ("load" == t && "load" == o && a(e, o), "fpAfterLoad" == t && "fpAfterLoad" == o) {
              n.detail.destination.index;
              a(e, o)
            } ("enter" == t && "load" == o || "entered" == t && "load" == o) && new Waypoint.Inview({
              element: e, enter: function () {
                "enter" == t && a(e, o)
              }, entered: function () {
                "entered" == t && a(e, o)
              }
            })
          })
        })
      })
  }
    
    functionScroll () { 
      var e = document.querySelector(".navbar"), t = document.querySelector(".navbar-collapse"), o = !1, a = !1, n = e.classList.contains("navbar-togglable"); 
      function l() { 
        !o && n && (e.classList.remove("navbar-dark"), e.classList.add("navbar-light"), o = !0) } 
        function r() { 
          o && n && (e.classList.remove("navbar-light"), e.classList.add("navbar-dark"), o = !1) } 
          function i(e, t) { 
            if ("fpOnLeave" == e) 0 == t ? r() : l(); else if ("collapse" == e) { 
              0 == (n = window.pageYOffset) && a ? r() : l() 
            } else if ("scroll" == e || "load" == e) { 
              var n; 
              0 == (n = window.pageYOffset) && !a && o ? r() : 0 === n || o || l() 
            } 
          } 
          "load scroll fpOnLeave".split(" ").forEach(function (e) { 
            window.addEventListener(e, function (e) { i(e.type, e.detail ? e.detail.destination.index : void 0) }) 
          }), $(t).on({ "show.bs.collapse": function () { 
            i("collapse"), a = !0 }, "hidden.bs.collapse": function () { i("collapse"), a = !1 } }) 
          }
          // function () { 
          //   var o = document.querySelector("#mc-embedded-subscribe-form"), n = document.querySelector("#mce-EMAIL"), e = document.querySelectorAll(".form-mailchimp-clone"), t = document.querySelectorAll('.form-mailchimp-clone input[type="email"]'), a = "Could not connect to the registration server. Please try again later."; o && o.addEventListener("submit", function (e) { var n; e.preventDefault(), n = o, $.ajax({ type: n.getAttribute("method"), url: n.getAttribute("action"), data: $(n).serialize(), cache: !1, dataType: "json", contentType: "application/json; charset=utf-8", error: function (e) { var t = new CustomEvent("alert.show", { detail: { type: "danger", message: a } }); window.dispatchEvent(t) }, success: function (e) { if ("success" != e.result) { var t = new CustomEvent("alert.show", { detail: { type: "danger", message: e.msg } }); window.dispatchEvent(t) } else { t = new CustomEvent("alert.show", { detail: { type: "success", message: e.msg } }); window.dispatchEvent(t), n.reset() } } }) }), e && [].forEach.call(e, function (e) { e.addEventListener("submit", function (e) { var t; e.preventDefault(), (t = o) && t.submit() }) }), t && [].forEach.call(t, function (e) { e.addEventListener("keyup", function () { var e, t; e = n, t = this.value, e && (e.value = t) }) }) }(), function () { if ("function" == typeof window.CustomEvent) return; function e(e, t) { t = t || { bubbles: !1, cancelable: !1, detail: void 0 }; var n = document.createEvent("CustomEvent"); return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n } e.prototype = window.Event.prototype, window.CustomEvent = e }(), function (e) { e.matches = e.matches || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector, e.closest = e.closest || function (e) { return this ? this.matches(e) ? this : this.parentElement ? this.parentElement.closest(e) : null : null } }(Element.prototype), function () { var e = document.querySelectorAll(".slider"), t = document.querySelectorAll(".slider-control"), n = document.querySelectorAll('[data-bind="slider"]'); e && [].forEach.call(e, function (e) { var t; t = e, new Flickity(t, { arrowShape: "M 35 50 L 60 25 L 65 30 L 45 50 L 65 70 L 60 75 Z", cellAlign: "left", contain: !0, draggable: !t.classList.contains("slider-no-draggable"), fade: t.classList.contains("slider-fade"), imagesLoaded: !0, pageDots: !1, prevNextButtons: !t.classList.contains("slider-no-controls"), wrapAround: !0 }) }), t && [].forEach.call(t, function (e) { e.addEventListener("click", function (e) { var t, n, o, a, l; e.preventDefault(), n = (t = this).getAttribute("data-slide"), o = t.getAttribute("data-target") ? t.getAttribute("data-target") : t.getAttribute("href"), a = document.querySelector(o), l = Flickity.data(a), "previous" == n ? l.previous() : "next" == n && l.next() }) }), n && [].forEach.call(n, function (e) { var o; o = e, Flickity.data(o).on("change", function (e) { var t = o.getAttribute("data-target"), n = document.querySelector(t); Flickity.data(n).select(e) }) }) }(), function () { var e = document.querySelectorAll(".testimonial-slider"); e && [].forEach.call(e, function (e) { new Flickity(e, { cellAlign: "center", initialIndex: 2, prevNextButtons: !1, pageDots: !1, contain: !0, wrapAround: !0, imagesLoaded: !0, percentPosition: !0 }) }) }(), function () { var e = document.querySelectorAll(".current-year"); e && [].forEach.call(e, function (e) { var t, n, o; t = e, n = (new Date).getFullYear(), o = document.createTextNode(n), t.appendChild(o) }) }();

    navigateToPage(page){
      this.router.navigateToRoute(page);
    }
  }
