!function (t, e) {
  if ("object" == typeof exports && "object" == typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define([], e); else {
    var i = e();
    for (var n in i)("object" == typeof exports ? exports : t)[n] = i[n]
  }
}(this, function () {
  return function (t) {
    function e(n) {
      if (i[n])return i[n].exports;
      var r = i[n] = {exports: {}, id: n, loaded: !1};
      return t[n].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
    }

    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0)
  }([function (t, e, i) {
    "use strict";
    function n(t) {
      function e() {
        var e = i.duration();
        a.destroyCards(), a.setMetadata({duration: e}), a.createCards(t.cards);
        var r = s.isMobile() ? "touchend" : "click";
        a.addCardEventListener(r, function (t, e, n) {
          i.trigger("ctacardclick", n)
        }), a.addThumbEventListener(r, function (t, e, n) {
          i.trigger("ctacardthumbclick", n)
        }), a.showThumbs(), n.querySelector(".vjs-control-bar").appendChild(a.el)
      }

      var i = this, n = i.el(), a = new r.CardContainer(n);
      return i.on("loadedmetadata", function () {
        e()
      }), this
    }

    var r = i(1);
    i(5);
    var s = i(4);
    window.videojs.plugin("cta-card-live", n)
  }, function (t, e, i) {
    "use strict";
    var n = i(2), r = function () {
      function t(t) {
        this.$$className = "vjs-cta-container", this.cards = [], this.el = document.createElement("div"), this.el.classList.add(this.$$className), this.el.classList.add(this.$$className + "-detail-inactive"), this.selector = "." + this.$$className, this.playerEl = t
      }

      return t.prototype.setActiveState = function (t) {
        t === !0 ? (this.el.classList.add(this.$$className + "-detail-active"), this.el.classList.remove(this.$$className + "-detail-inactive")) : (this.el.classList.remove(this.$$className + "-detail-active"), this.el.classList.add(this.$$className + "-detail-inactive"))
      }, t.prototype.inactivateCards = function () {
        this.setActiveState(!1), this.cards.forEach(function (t) {
          t.inactivate()
        })
      }, t.prototype.addCardEventListener = function (t, e) {
        void 0 === t && (t = "click"), this.cards.forEach(function (i) {
          i.addCardEventListener(t, e)
        })
      }, t.prototype.addThumbEventListener = function (t, e) {
        void 0 === t && (t = "click"), this.cards.forEach(function (i) {
          i.addThumbEventListener(t, e)
        })
      }, t.prototype.showThumbs = function () {
        this.cards.forEach(function (t) {
          t.showThumb()
        })
      }, t.prototype.createCard = function (t) {
        var e = new n.Card(this, this.playerEl, t);
        this.cards.push(e), this.el.appendChild(e.el)
      }, t.prototype.createCards = function (t) {
        var e = this;
        t.forEach(function (t) {
          e.createCard(t)
        })
      }, t.prototype.setMetadata = function (e) {
        t.metadata = e
      }, t.prototype.destroyCards = function () {
        this.cards.forEach(function (t) {
          t.destroy()
        }), this.cards = []
      }, t
    }();
    e.CardContainer = r
  }, function (t, e, i) {
    "use strict";
    var n, r, s = i(3), a = i(1), o = i(4), c = function () {
      function t(t, e, i) {
        this.$$className = "vjs-cta-card", this.$$detailJsHook = "vjs-cta-js-detail", this.$$detailClassName = "vjs-cta-detail", this.$$CloseBtnClassName = "close-btn", this.$$markerClassName = "vjs-cta-marker", this.$$thumbClassName = "vjs-cta-thumb", this.$$options = s({}, this.$$options, i), this.playerEl = e, this.cardContainer = t, this.selector = "." + this.$$className, this.el = document.createElement("div"), this.el.classList.add(this.$$className), this.el.innerHTML = this.template, this.el.id = this.$$options.id || (new Date).getTime() * Math.random(), this.initDetail(), this.initThumb()
      }

      return Object.defineProperty(t.prototype, "template", {
        get: function () {
          return "\n      " + this.detailTemplate + "\n      " + this.thumbTemplate + "\n      " + this.markerTemplate + "\n    "
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(t.prototype, "detailTemplate", {
        get: function () {
          return "\n      <div class='" + this.$$detailClassName + " active'>\n        <button type='button' class='" + this.$$CloseBtnClassName + "'>×</button>\n        <a href='" + this.$$options.link + "' target='_blank' class='" + this.$$detailJsHook + "'>\n          <div>\n            <img src='" + (this.$$options.image || "") + "' class='detail-image'>\n            <h3 class='title'>" + (this.$$options.title || "") + "</h3>\n            <div class='price-set js-if-price'>\n              <del class='original-price js-original-price'>$" + this.$$options.originalPrice + "</del>\n              <span class='price'>$" + this.$$options.price + "</span>\n            </div>\n            <span class='description'>\n              " + (this.$$options.description || "") + "\n            </span>\n          </div>\n        </a>\n      </div>\n    "
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(t.prototype, "thumbTemplate", {
        get: function () {
          //return "\n      <img class='" + this.$$thumbClassName + "' src='" + this.$$options.image + "'\n        style='left: " + this.getPosition() + "%;'>\n    "
          return "\n"
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(t.prototype, "markerTemplate", {
        get: function () {
          //return "\n      <div class='" + this.$$markerClassName + "'\n        style='left: " + this.getPosition() + "%;'></div>\n    "
          return "\n    "
        }, enumerable: !0, configurable: !0
      }), t.prototype.initDetail = function () {
        var t = this;
        if (this.playerEl.querySelector(".vjs-playlist-menu")) {
          var e = this.el.querySelector("." + this.$$detailClassName);
          e.classList.add("menu-active")
        }
        var i = this.el.querySelector("." + this.$$detailClassName + " ." + this.$$CloseBtnClassName);
        n = function (e) {
          t.cardContainer.inactivateCards(), t.cardContainer.showThumbs(), e.stopPropagation(), e.preventDefault()
        }, i.addEventListener("click", n);
        var r = this.el.querySelector("." + this.$$detailJsHook);
        this.$$options.link || (r.target = "", r.href = "javascript:void(0);"), this.$$options.originalPrice || this.el.querySelector(".js-original-price").remove(), this.$$options.price || (this.el.querySelector(".js-if-price").style.display = "none")
      }, t.prototype.initThumb = function () {
        var t = this, e = this.el.querySelector("." + this.$$thumbClassName), i = function () {
          t.cardContainer.inactivateCards(), t.activate()
        }, n = function (t) {
          return i()
        };
        //o.isMobile() ? (e.addEventListener("touchstart", n), e.addEventListener("touchend", function (t) {
        //  t.preventDefault()
        //})) : e.addEventListener("click", n)
      }, t.prototype.addCardEventListener = function (t, e) {
        var i = this;
        void 0 === t && (t = "click");
        var n = this.el.querySelector("." + this.$$detailJsHook);
        n.addEventListener(t, function (t) {
          e(t, i, i.$$options)
        })
      }, t.prototype.addThumbEventListener = function (t, e) {
        var i = this;
        void 0 === t && (t = "click");
        //var n = this.el.querySelector("." + this.$$thumbClassName);
        //n.addEventListener(t, function (t) {
        //  e(t, i, i.$$options)
        //})
      }, t.prototype.activate = function () {
        this.cardContainer.setActiveState(!0);
        var t = this.el.querySelector("." + this.$$detailClassName), e = this.el.querySelector("." + this.$$thumbClassName);
        t.classList.add("active"), e.classList.remove("active")
      }, t.prototype.inactivate = function () {
        var t = this.el.querySelector("." + this.$$detailClassName), e = this.el.querySelector("." + this.$$thumbClassName);
        t.classList.remove("active"), e.classList.remove("active")
      }, t.prototype.showThumb = function () {
        //var t = this.el.querySelector("." + this.$$thumbClassName);
        //t.classList.add("active")
      }, t.prototype.getPosition = function () {
        var t = document.querySelector("video").offsetWidth;
        if (!t)throw"CTA: Player Container not found!";
        var e = this.$$options.time / a.CardContainer.metadata.duration * 100;
        return e
      }, t.prototype.destroy = function () {
        this.destroyDetail(), this.destroyThumb(), this.playerEl.querySelector("[id=" + this.el.id + "]").remove()
      }, t.prototype.destroyDetail = function () {
        var t = this.el.querySelector("." + this.$$detailClassName + " ." + this.$$CloseBtnClassName);
        t.removeEventListener("click", n)
      }, t.prototype.destroyThumb = function () {
        //var t = this.el.querySelector("." + this.$$thumbClassName);
        //t.removeEventListener("click", r)
      }, t
    }();
    e.Card = c
  }, function (t, e) {
    function i(t, e, i) {
      switch (i.length) {
        case 0:
          return t.call(e);
        case 1:
          return t.call(e, i[0]);
        case 2:
          return t.call(e, i[0], i[1]);
        case 3:
          return t.call(e, i[0], i[1], i[2])
      }
      return t.apply(e, i)
    }

    function n(t, e) {
      for (var i = -1, n = Array(t); ++i < t;)n[i] = e(i);
      return n
    }

    function r(t, e) {
      return function (i) {
        return t(e(i))
      }
    }

    function s(t, e) {
      var i = M(t) || v(t) ? n(t.length, String) : [], r = i.length, s = !!r;
      for (var a in t)!e && !T.call(t, a) || s && ("length" == a || d(a, r)) || i.push(a);
      return i
    }

    function a(t, e, i) {
      var n = t[e];
      T.call(t, e) && f(n, i) && (void 0 !== i || e in t) || (t[e] = i)
    }

    function o(t) {
      if (!p(t))return O(t);
      var e = [];
      for (var i in Object(t))T.call(t, i) && "constructor" != i && e.push(i);
      return e
    }

    function c(t, e) {
      return e = A(void 0 === e ? t.length - 1 : e, 0), function () {
        for (var n = arguments, r = -1, s = A(n.length - e, 0), a = Array(s); ++r < s;)a[r] = n[e + r];
        r = -1;
        for (var o = Array(e + 1); ++r < e;)o[r] = n[r];
        return o[e] = a, i(t, this, o)
      }
    }

    function l(t, e, i, n) {
      i || (i = {});
      for (var r = -1, s = e.length; ++r < s;) {
        var o = e[r], c = n ? n(i[o], t[o], o, i, t) : void 0;
        a(i, o, void 0 === c ? t[o] : c)
      }
      return i
    }

    function u(t) {
      return c(function (e, i) {
        var n = -1, r = i.length, s = r > 1 ? i[r - 1] : void 0, a = r > 2 ? i[2] : void 0;
        for (s = t.length > 3 && "function" == typeof s ? (r--, s) : void 0, a && h(i[0], i[1], a) && (s = r < 3 ? void 0 : s, r = 1), e = Object(e); ++n < r;) {
          var o = i[n];
          o && t(e, o, n, s)
        }
        return e
      })
    }

    function d(t, e) {
      return e = null == e ? N : e, !!e && ("number" == typeof t || k.test(t)) && t > -1 && t % 1 == 0 && t < e
    }

    function h(t, e, i) {
      if (!C(i))return !1;
      var n = typeof e;
      return !!("number" == n ? m(i) && d(e, i.length) : "string" == n && e in i) && f(i[e], t)
    }

    function p(t) {
      var e = t && t.constructor, i = "function" == typeof e && e.prototype || w;
      return t === i
    }

    function f(t, e) {
      return t === e || t !== t && e !== e
    }

    function v(t) {
      return $(t) && T.call(t, "callee") && (!P.call(t, "callee") || q.call(t) == E)
    }

    function m(t) {
      return null != t && b(t.length) && !y(t)
    }

    function $(t) {
      return g(t) && m(t)
    }

    function y(t) {
      var e = C(t) ? q.call(t) : "";
      return e == L || e == S
    }

    function b(t) {
      return "number" == typeof t && t > -1 && t % 1 == 0 && t <= N
    }

    function C(t) {
      var e = typeof t;
      return !!t && ("object" == e || "function" == e)
    }

    function g(t) {
      return !!t && "object" == typeof t
    }

    function j(t) {
      return m(t) ? s(t) : o(t)
    }

    var N = 9007199254740991, E = "[object Arguments]", L = "[object Function]", S = "[object GeneratorFunction]", k = /^(?:0|[1-9]\d*)$/, w = Object.prototype, T = w.hasOwnProperty, q = w.toString, P = w.propertyIsEnumerable, O = r(Object.keys, Object), A = Math.max, x = !P.call({valueOf: 1}, "valueOf"), M = Array.isArray, D = u(function (t, e) {
      if (x || p(e) || m(e))return void l(e, j(e), t);
      for (var i in e)T.call(e, i) && a(t, i, e[i])
    });
    t.exports = D
  }, function (t, e) {
    "use strict";
    function i() {
      var t = navigator.userAgent || navigator.vendor || window.opera;
      return /windows phone/i.test(t) ? "Windows Phone" : /android/i.test(t) ? "Android" : /iPad|iPhone|iPod/.test(t) && !window.MSStream ? "iOS" : "unknown"
    }

    function n() {
      return "unknown" !== i()
    }

    e.getMobileOperatingSystem = i, e.isMobile = n
  }, function (t, e) {
  }])
});
//# sourceMappingURL=bundle.js.map
