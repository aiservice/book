    function calTop(t, e, o) {
        if (e.length !== o.length) return t;
        for (var i = t, n = e.length; n--;) if (t > e[n]) {
                i = (t - e[n]) * o[n];
                for (var r = n; r > 0; r--) i += (e[r] - e[r - 1]) * o[r - 1];
                i += 1 * e[0];
                break
            }
        return i
    }
    function scrollreader(t) {
        t || (t = {}), this.$wrapper = $(t.wrapperSelector), this.$scroller = $(t.scrollerSelector || window), this.$prev =
            $(t.prevSelector), this.$next = $(t.nextSelector), this.$nextTrigger = $(t.nextTriggerSelector), this.$mark =
            $(t.markSelector), this.onPrevClick = t.onPrevClick || i, this.onCenterClick = t.onCenterClick || i, this.onNextClick =
            t.onNextClick || i, this.onScroll = t.onScroll || i, this.onScrollPrev = t.onScrollPrev || i, this.onScrollNext =
            t.onScrollNext || i, this.onWillScrollNext = t.onWillScrollNext || i, this.triggerMinHeight = t.triggerMinHeight ||
            58, this.enabled = !1, this.isPreloading = !1, this.initEvents()
    }
    
    scrollreader.prototype = {
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
                    	console.log("touchstart11:",n.enabled);
                        if (n.enabled) {
                            var i = t.target || {};
                            console.log("i.tagName:", i.tagName);
                            console.log("i.length:", $(i).parents("a").length);
                            /^(?:a|input|label|i|use|svg)$/i.test(i.tagName) || $(i).parents("a").length || (h = !0)
                                                   var e = t.touches[0] || t;
                   console.log("touchend22:",t.touches[0]);
                   console.log("touchend33:",e);
                   p.x1 = e.pageX;
                   p.y1 = e.pageY
                                console.log("p:",p);
                        }
                        console.log("touchstart2:",h);
                    },
                    touchmove: function (o) {
                    	console.log("touchmove:",h);
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
                                    "border-bottom-width": calTop(u.dy - 52, [20, 40, 60, 80, 100], [.5, .4, .3, .2, .1]),
                                    height: 52,
                                    transition: "none"
                                })) : (i = 0, s.css({
                                    "border-bottom-width": Math.max(g - u.dy, 0),
                                    height: u.dy,
                                    transition: "none"
                                }))
                            } else {}
                        }
                    },
                    touchend: function (t) {
                    	console.log("touchend1:",h);
                        if (h) {
                            h = !1;
                            console.log("touchend2:",h);
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
                                $();
                                var t = r.offset().top + r.height() - l.height();
                                l.scrollTop(t - 58 - 48), n.enabled = !0
                            }, function () {
                                $(), n.enabled = !0
                            })) : 1 === i ? (c.prev().css({
                                position: "relative",
                                top: 0,
                                "-webkit-transition": "top .25s",
                                transition: "top .25s"
                            }), n.enabled = !1, n.onScrollNext(function () {
                                $(), n.enabled = !0
                            }, function () {
                                $(), n.enabled = !0
                            })) : u.type && $() : n.handlerClick(p.x1, p.y1, t), e = null, p = {}, u = {}, i = null
                        }
                    }
                }), l.on("scroll", function () {
                    n.onScroll(l.scrollTop())
                }), a.on("click", function () {
                	var url = a.data("url")
                	if(url){
                		location.href = ""
                	}else{
                		alert("没有下一章");
                	}
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
                    n += .2 * (t - n), Math.abs(t - n) < 1 ? (i.scrollTop(t), $.isFunction(e) && e()) : (i.scrollTop(n),
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
        }
    
    //toggle 
    function toggleOpt(t, a) {
        var i = this;
        if (!t)
            return i;
        $.isFunction(a) && (a = {
            callback: a
        });
        var o = {
            mode: "visible",
            container: $("body"),
            callback: function() {}
        }
          , n = $.extend({}, o, a || {});
        i.callback = n.callback,
        i.mode = n.mode,
        !t.size && $.isArray(t) && (t = t.join()),
        "string" == typeof t ? n.container.on("click", t, function(t) {
        	toggle1($(this), t)
        }) : t.length && t.on("click", function(t) {
        	toggle1($(this), t)
        }),
       // i.aria(t)
        aria1(t)
    };
    function aria1 (t){
	        "visible" == this.mode && "string" == typeof t && $(t).each(function() {
	            var t = $(this);
	            t.attr({
	                role: "menuitem",
	                "aria-expanded": t.hasClass("active")
	            })
	        })
    }
    function toggle1(t, a) {
        var i, o = this, n = t;
        "visible" == o.mode ? (n = $("#" + t.attr("data-rel")),
        (i = t.hasClass("active")) ? (t.removeClass("active").attr("aria-expanded", "false"),
        n.removeClass("active")) : (t.addClass("active").attr("aria-expanded", "true"),
        n.addClass("active"))) : "more" == o.mode && ((i = "string" == typeof t.attr("open")) ? t.removeAttr("open") : t.attr("open", "")),
        o.callback.call(t, t, n, i, a)
    }
    toggleOpt.prototype = {
    		aria : function(t) {
    	        "visible" == this.mode && "string" == typeof t && $(t).each(function() {
    	            var t = $(this);
    	            t.attr({
    	                role: "menuitem",
    	                "aria-expanded": t.hasClass("active")
    	            })
    	        })
    	    },
    	    toggle : function(t, a) {
    	        var i, o = this, n = t;
    	        "visible" == o.mode ? (n = $("#" + t.attr("data-rel")),
    	        (i = t.hasClass("active")) ? (t.removeClass("active").attr("aria-expanded", "false"),
    	        n.removeClass("active")) : (t.addClass("active").attr("aria-expanded", "true"),
    	        n.addClass("active"))) : "more" == o.mode && ((i = "string" == typeof t.attr("open")) ? t.removeAttr("open") : t.attr("open", "")),
    	        o.callback.call(t, t, n, i, a)
    	    }
    }
//    toggleOpt.prototype.aria = function(t) {
//        "visible" == this.mode && "string" == typeof t && $(t).each(function() {
//            var t = $(this);
//            t.attr({
//                role: "menuitem",
//                "aria-expanded": t.hasClass("active")
//            })
//        })
//    }
//    
//    toggleOpt.prototype.toggle = function(t, a) {
//        var i, o = this, n = t;
//        "visible" == o.mode ? (n = $("#" + t.attr("data-rel")),
//        (i = t.hasClass("active")) ? (t.removeClass("active").attr("aria-expanded", "false"),
//        n.removeClass("active")) : (t.addClass("active").attr("aria-expanded", "true"),
//        n.addClass("active"))) : "more" == o.mode && ((i = "string" == typeof t.attr("open")) ? t.removeAttr("open") : t.attr("open", "")),
//        o.callback.call(t, t, n, i, a)
//    }
