define("qdm/js/common/utils/debounce.5e0cc.js", [], function(require, exports, module) {
    module.exports = function(n, t) {
        var e, o, u, i, c, r = function() {
            var s = Date.now() - i;
            s < t && s > 0 ? c = setTimeout(r, t - s) : (c = null,
            u = n.apply(e, o),
            c || (e = o = null))
        };
        return function() {
            return e = this,
            o = arguments,
            i = Date.now(),
            c || (c = setTimeout(r, t)),
            u
        }
    }
});

LBF.define("util.Cookie", function() {
    var e = document;
    return {
        set: function(n, t, i, o, r) {
            r && (r = new Date(+new Date + r));
            var u = n + "=" + escape(t) + (r ? "; expires=" + r.toGMTString() : "") + (o ? "; path=" + o : "") + (i ? "; domain=" + i : "");
            return u.length < 4096 && (e.cookie = u),
            this
        },
        get: function(n) {
            var t = e.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
            return null != t ? unescape(t[2]) : null
        },
        del: function(n, t, i) {
            return this.get(n) && (e.cookie = n + "=" + (i ? "; path=" + i : "") + (t ? "; domain=" + t : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"),
            this
        },
        find: function(n) {
            return e.cookie.match(n)
        }
    }
});

!function(t, a) {
    "function" == typeof define && (define.amd || define.cmd) ? define("qdm/js/common/components/Range.5d1de.js", [], a) : t.Range = a()
}(this, function(require) {
    $.fn.range = function(a) {
        return $(this).each(function() {
            this.$range && (this.$range = new t($(this),a))
        })
    }
    ;
    var t = function(t, a) {
        var n = this
          , e = {
            container: $("body"),
            shadow: !1,
            buttons: ["", ""],
            onChangeEnd: function() {},
            tips: function(t) {
                return t
            }
        }
          , i = $.extend({}, e, a || {})
          , s = t.attr("min") || 0
          , r = t.attr("max") || 100
          , o = t.attr("step") || 1
          , l = $("<div></div>").attr("class", t.attr("class")).addClass("range")
          , d = $("<div></div>").addClass("range-track")
          , u = $("<a></a>").addClass("range-thumb").attr({
            role: "slider",
            "aria-valuenow": t.val(),
            "aria-valuemax": r,
            "aria-valuemin": s
        })
          , h = $();
        1 == i.shadow && (h = $("<a></a>").addClass("range-shadow").attr("title", "之前位置")),
        t.before(l),
        0 == l.width() && l.width(t.width()),
        d.append(u),
        l.append(d).prepend(h),
        l.on("click", function(a) {
            var e = a && a.target;
            if (e)
                if (h.length && e == h[0]) {
                    var o = $(e).attr("data-value")
                      , l = t.val();
                    o && l != o && (n.value(o),
                    i.onChangeEnd.call(t, n))
                } else if (e != u[0]) {
                    var d = a.clientX - (u.offset().left - $(window).scrollLeft()) - u.width() / 2;
                    n.value(1 * t.val() + (r - s) * d / $(this).width()),
                    i.onChangeEnd.call(t, n)
                }
        });
        var c = {
            distance: 0
        };
        return u.on("touchstart", function(a) {
            var n = a.touches[0] || a;
            c.x = n.pageX,
            c.value = 1 * t.val(),
            c.distance = 0;
            var e = c.value;
            $.isFunction(i.tips) && (e = i.tips.call(t, c.value)),
            u.attr("data-tips", e).attr("aria-valuenow", e).addClass("active")
        }),
        i.container.on({
            touchmove: function(a) {
                var e = a.touches[0] || a;
                if ("number" == typeof c.x) {
                    var o = e.pageX - c.x;
                    c.distance = o,
                    n.value(c.value + (r - s) * o / l.width());
                    var d = t.val();
                    $.isFunction(i.tips) && (d = i.tips.call(t, d)),
                    u.attr("data-tips", d).attr("aria-valuenow", d),
                    a.preventDefault()
                }
            },
            touchend: function() {
                Math.abs(c.distance) > 0 && i.onChangeEnd.call(t, n),
                c.x = null,
                c.value = null,
                u.removeClass("active"),
                c.distance = 0
            }
        }),
        $.isArray(i.buttons) && i.buttons.forEach(function(a, e) {
            a && ("string" == typeof a && (a = $(a)),
            a.length && (a.on("click", function() {
                var a = +$(this).data("index")
                  , e = t.attr("max")
                  , s = t.attr("min") || "1"
                  , r = t.attr("step") || "1"
                  , o = t.val()
                  , l = o;
                0 == a ? (l = o - r) < s && (l = s) : 1 == a && (l = 1 * o + 1 * r) > e && (l = e),
                l !== o && (n.value(l),
                i.onChangeEnd.call(t, n))
            }).data("index", e),
            a.attr("role", "button")))
        }),
        this.num = {
            min: +s,
            max: +r,
            step: +o
        },
        this.el = {
            input: t,
            container: l,
            track: d,
            thumb: u,
            shadow: h
        },
        this.callback = {
            changeEnd: i.onChangeEnd.bind(t, n)
        },
        this.obj = {},
        this.value(),
        this.shadow(),
        this
    };
    return rangeOpt.prototype.value = function(t) {
        var a = this.el.input
          , n = a.val()
          , e = this.num.max
          , i = this.num.min
          , s = this.num.step;
        return t || (n = t,
        t = $.trim(a.val())),
        t = t > e || e - t < s / 2 ? e : "" == t || t < i || t - i < s / 2 ? i : i + Math.round((t - i) / s) * s,
        a.val(t),
        this.position(),
        t != n && a.trigger("change"),
        this
    }
    ,
    rangeOpt.prototype.position = function() {
        var t = this.el.input.val()
          , a = this.num.max
          , n = this.num.min;
        return this.num.step,
        this.el.track.css("borderLeftWidth", this.el.container.width() * (t - n) / (a - n)),
        this
    }
    ,
    rangeOpt.prototype.shadow = function() {
        var t = this.el
          , a = t.track
          , n = t.shadow;
        return n.length && n.css("left", a.css("borderLeftWidth")).attr("data-value", t.input.val()),
        this
    }
    ,
    rangeOpt
});

define("qdm/js/book/module/ScrollReader.edb80.js", ["lib.Zepto"], function (require, exports, module) {
    function t(t, e, o) {
        if (e.length !== o.length) return t;
        for (var i = t, n = e.length; n--;) if (t > e[n]) {
                i = (t - e[n]) * o[n];
                for (var r = n; r > 0; r--) i += (e[r] - e[r - 1]) * o[r - 1];
                i += 1 * e[0];
                break
            }
        return i
    }
    function e(t) {
        t || (t = {}), this.$wrapper = o(t.wrapperSelector), this.$scroller = o(t.scrollerSelector || window), this.$prev =
            o(t.prevSelector), this.$next = o(t.nextSelector), this.$nextTrigger = o(t.nextTriggerSelector), this.$mark =
            o(t.markSelector), this.onPrevClick = t.onPrevClick || i, this.onCenterClick = t.onCenterClick || i, this.onNextClick =
            t.onNextClick || i, this.onScroll = t.onScroll || i, this.onScrollPrev = t.onScrollPrev || i, this.onScrollNext =
            t.onScrollNext || i, this.onWillScrollNext = t.onWillScrollNext || i, this.triggerMinHeight = t.triggerMinHeight ||
            58, this.enabled = !1, this.isPreloading = !1, this.initEvents()
    }
    var o = require("lib.Zepto"),
        i = function () {};
    e.prototype = {
        initEvents: function () {
            var e, i, n = this,
                r = n.$wrapper,
                l = n.$scroller,
                s = n.$prev,
                c = n.$next,
                a = n.$nextTrigger,
                h = !1,
                p = {}, u = {};
            r.on({
                touchstart: function (t) {
                    if (n.enabled) {
                        var i = t.target || {};
                        /^(?:a|input|label|i|use|svg)$/i.test(i.tagName) || o(i).parents("a").length || (h = !0, e = t.touches[
                            0] || t, p.x1 = e.pageX, p.y1 = e.pageY)
                    }
                },
                touchmove: function (o) {
                    if (h) {
                        e = o.touches[0] || o, p.x2 = e.pageX, p.y2 = e.pageY;
                        var a = p.y2 - p.y1,
                            d = l.scrollTop(),
                            f = r.offset().top + r.height() - l.height();
                        if (d <= 0 && a > 0) {
                            o.preventDefault(), "down" !== u.type && (u.type = "down", u.y1 = p.y2), u.y2 = p.y2, u.dy =
                                u.y2 - u.y1;
                            var g = Math.abs(parseInt(s.css("margin-top"), 10));
                            u.dy - 52 > 0 ? (i = -1, s.css({
                                "border-bottom-width": t(u.dy - 52, [20, 40, 60, 80, 100], [.5, .4, .3, .2, .1]),
                                height: 52,
                                transition: "none"
                            })) : (i = 0, s.css({
                                "border-bottom-width": Math.max(g - u.dy, 0),
                                height: u.dy,
                                transition: "none"
                            }))
                        } else d >= f && a < 0 ? (o.preventDefault(), "up" !== u.type && (u.type = "up", u.y1 = p.y2),
                                u.y2 = p.y2, u.dy = u.y1 - u.y2, u.dy > 0 ? (i = u.dy > 48 ? 1 : 0, c.prev().css({
                                position: "relative",
                                top: -t(u.dy, [20, 40, 60, 80, 100], [.5, .4, .3, .2, .1])
                            })) : (i = 0, c.prev().css({
                                position: "relative",
                                top: 0
                            }))) : n.checkWillScrollNext()
                    }
                },
                touchend: function (t) {
                    if (h) {
                        h = !1;
                        var o = function () {
                            s.css({
                                "border-bottom-width": "",
                                height: "",
                                transition: ""
                            }), c.prev().css({
                                position: "",
                                top: "",
                                "-webkit-transition": "",
                                transition: ""
                            })
                        };
                        p.y2 ? -1 === i ? (s.css({
                            "border-bottom-width": 0,
                            transition: ""
                        }), n.enabled = !1, n.onScrollPrev(function () {
                            o();
                            var t = r.offset().top + r.height() - l.height();
                            l.scrollTop(t - 58 - 48), n.enabled = !0
                        }, function () {
                            o(), n.enabled = !0
                        })) : 1 === i ? (c.prev().css({
                            position: "relative",
                            top: 0,
                            "-webkit-transition": "top .25s",
                            transition: "top .25s"
                        }), n.enabled = !1, n.onScrollNext(function () {
                            o(), n.enabled = !0
                        }, function () {
                            o(), n.enabled = !0
                        })) : u.type && o() : n.handlerClick(p.x1, p.y1, t), e = null, p = {}, u = {}, i = null
                    }
                }
            }), l.on("scroll", function () {
                n.onScroll(l.scrollTop())
            }), a.on("click", function () {
                a.loading(), n.enabled = !1, n.onScrollNext(function () {
                    a.unloading(), n.enabled = !0
                }, function () {
                    a.unloading(), n.enabled = !0
                })
            })
        },
        enable: function () {
            this.enabled = !0, this.refresh()
        },
        disable: function () {
            this.enabled = !1, this.$scroller.scrollTop(0)
        },
        refresh: function () {},
        restart: function () {
            this.$scroller.scrollTop(0)
        },
        handlerClick: function (t, e, o) {
            var i = this,
                n = i.$wrapper,
                r = i.$scroller,
                l = r.height(),
                s = r.scrollTop(),
                c = [s + l / 3, s + 2 * l / 3],
                a = l - 60;
            if (e <= c[0]) i.adjusthMark(Math.max(s + 44, 0)), i.onPrevClick(o), i.scrollTo(Math.max(s - a, 0));
            else if (e >= c[1]) {
                var h = n.offset().top + n.height() - r.height();
                i.adjusthMark(Math.min(s + l, h)), i.onNextClick(o), i.scrollTo(Math.min(s + a, h)), i.checkWillScrollNext()
            } else i.onCenterClick()
        },
        checkWillScrollNext: function () {
            var t = this,
                e = t.$wrapper,
                o = t.$scroller,
                i = o.scrollTop(),
                n = e.offset().top + e.height() - o.height();
            i >= Math.min(.8 * n, n - 200) && !t.isPreloading && (t.isPreloading = !0, t.onWillScrollNext(function () {
                t.isPreloading = !1
            }, function () {
                t.isPreloading = !1
            }))
        },
        scrollTo: function (t, e) {
            var i = this.$scroller,
                n = i.scrollTop();
            t < 0 && (t = 0);
            var r = function () {
                n += .2 * (t - n), Math.abs(t - n) < 1 ? (i.scrollTop(t), o.isFunction(e) && e()) : (i.scrollTop(n),
                    window.requestAnimationFrame ? requestAnimationFrame(r) : setTimeout(r, 17))
            };
            r()
        },
        adjusthMark: function (t) {
            var e = this,
                o = e.$wrapper,
                i = e.$mark;
            i.data("init") || (i.data("init", !0), o.on("touchstart", function () {
                e.enabled && (clearTimeout(i.timer), i.css("opacity", 0))
            })), i.css({
                opacity: 1,
                top: t
            }), i.timer = setTimeout(function () {
                i.css("opacity", 0)
            }, 1500)
        }
    }, module.exports = e
});