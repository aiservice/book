if (typeof BookChapterUtils == "undefined") {
    BookChapterUtils = {};
}
BookChapterUtils = {
    params: {
        settingsJson: {dn: "d", fs: 3, skin: 0},
        catalog_cache: false,
        settingsKey: "SET_CHAPTER"
    },
    init: function () {
        this.initModes();
        this.initOptionsLayer();
        this.initFontSizeSetting();
        this.initSkinSetting();
        this.initModeSetting();
        this.initDayNightSetting();
        this.initChapterProgress();
        this.initCatalogs();
    },
    initChapterProgress: function() {
        var $readOptProg = $("#readOptProg");
        $("#readBtnProg").click(function() {
            var t = $(this);
            if(t.hasClass("active")){
                t.removeClass("active")
                $readOptProg.removeClass("active")
            }else{
                t.addClass("active")
                $readOptProg.addClass("active")
            }
        });
    },
    handlerClick: function (t, e, o) {
        var i = this,
            n = $("#readContent"),
            k = $("#pageReadOpt"),
            r = $(window),
            l = r.height(),
            s = r.scrollTop(),
            c = [s + l / 3, s + 2 * l / 3],
            a = l - 60;
        if (e <= c[0]) {
            try {
                var to = Math.max(0,scrollY-innerHeight);
                if(to>0){
                    to+=44
                }
                console.log("==onPrevClick innerHeight："+innerHeight+", scrollY:"+scrollY+",to:"+to);
                window.scrollTo({
                    top: to,
                    behavior: "smooth"
                });
            } catch (e) {
            }

        } else if (e >= c[1]) {
            try {
                var to = innerHeight+scrollY
                var itemTop = $('#readLoadNext').offset().top;
                console.log("==onNextClick innerHeight："+innerHeight+", scrollY:"+scrollY+",to:"+to+",itemTop:"+itemTop);
                if(to+50<itemTop){
                    console.log("==next：");
                    window.scrollTo({
                        top: to-44,
                        behavior: "smooth"
                    });
                }
            } catch (e) {
            }

        } else {
            k[0].avoidClick = true, setTimeout(function () {
                k[0].avoidClick = false;
            }, 500), k.addClass("active");
        }
    },
    initModes: function () {
        var that = this, p = {},u = {},is_touch = false, by = $("body"), cc = $("#chapterContent"), v = that.params,  o = $("#readBtnMode"), r = o.find("h4");
        var st = BookUtils.getStorage(that.params.settingsKey);
        //console.log("set1:", v.settingsJson)
        if (st) {
            var dn = st.dn, fs = st.fs, skin = st.skin, cc = $("#chapterContent"), rfr = $("#readFontRange");
            //console.log("setting in cookie:", st);
            if(dn && dn == "n") {
                (o.data("mode", "day"), r.html(r.html().replace("夜", "日")), by.addClass("read-night"),
                    $('#readSetSkin [type="radio"]').each(function() {
                        var t = $(this);
                        t.prop("checked") && t.prop("checked", !1);
                    }))
            } else {
                if (skin && !isNaN(skin)) {
                    v.settingsJson = $.extend(v.settingsJson, {
                        skin: parseInt(skin)
                    })
                    //console.log("set3:",v.settingsJson)
                    var rd = $('[data-index="' + skin + '"]', "#readSetSkin"),
                        skin_value = rd.val();
                    rd.attr("checked", "true");
                    by.attr("class", by.attr("class").replace(/skin-[a-z]+/g, "skin-" + skin_value))
                }
            }
            if (fs && !isNaN(fs)) {
                rfr.val(fs);
                cc.css("font-size", ((2 * fs + 12) / 16) + "rem")
                v.settingsJson = $.extend(v.settingsJson, {
                    fs: parseInt(fs)
                })
                //console.log("set2:",v.settingsJson)
            }


        }
        $("#readContent").on({
            touchstart: function (t) {
                //console.log("touchstart:",is_touch);
                var i = t.target || {}, e = t.touches[0] || t;
                p.x1 = e.pageX, p.y1 = e.pageY;
                is_touch = true;
            },
            touchmove: function (o) {
                //console.log("touchmove:",is_touch);
                if (is_touch) {
                    is_touch = false;
                }
            },
            touchend: function (t) {
                //console.log("u.type ,is_touch :",u.type, is_touch)
                if (is_touch) {
                    is_touch = false;
                    that.handlerClick(p.x1, p.y1, t);
                }
            }
        });
        if (!window.localStorage.getItem('help')) {
            var help = $('<ul class="shadow" id="help"><li class="help-top">'+i18nUtils.prop("book_chapter_tip_pre_page")+'</li><li class="help-bottom">'+i18nUtils.prop("book_chapter_tip_next_page")+'</li><li class="help-left">&nbsp;</li><li class="help-right">&nbsp;</li><li class="help-center">'+i18nUtils.prop("book_chapter_tip_menu")+'</li></ul>');
            $('body').append(help);
            help.click(function(e){
                e.stopPropagation();
                help.remove();
                window.localStorage.setItem('help', 1);
            });
        }
    },
    initOptionsLayer: function () {
        var t = $("#pageReadOpt"),
            a = $("#readBtnMore");
        t.on({
            click: function (e) {
                var a = e.target;
                if (a === this && !a.avoidClick) {
                    var o = t.find(".jsLayerTrigger.active");
                    o.length && o.trigger("click"), t.removeClass("active");
                }
            },
            touchstart: function (e) {
                this.flagMoveHide = e.target === this;
            },
            touchmove: function (e) {
                this.flagMoveHide && t.trigger("click"), e.preventDefault();
            }
        });
        toggleOpt(a)
        var o = $(".jsLayerTrigger");
        o.on("click", function (t) {
            var a = this;
            t && (!1 === t.isTrusted || t.hasOwnProperty("_args") || 0 === t.pageY && 0 === t.screenY) || o.each(function () {
                var t = $(this);
                this !== a && t.hasClass("active") && t.trigger("click");
            });
        });
    },
    initFontSizeSetting: function () {
        var that = this,
            a = $("#readBtnSet"),
            r = $("#readFontRange"),
            i = $("#chapterContent");
        toggleOpt(a);
        rangeOpt($("#readFontRange"), {
            buttons: ["#readFontDown", "#readFontUp"]
        });
        r.on("change", function (e) {
            var t = this.value,
                a = (2 * t + 12) / 16;
            i.css("font-size", a + "rem");
            that.updateSettings({
                fs: t
            });
        });
    },
    initSkinSetting: function () {
        var that = this,
            a = $("body"),
            o = $("#readBtnMode");
        $("#readSetSkin").on("click", '[type="radio"]', function () {
            var t = $(this);
            a.removeClass("read-night"), a.attr("class", a.attr("class").replace(/skin-[a-z]+/g, "skin-" + t.val())),
            "day" === o.data("mode") && o.trigger("click"),
                that.updateSettings({
                    skin: t.data("index")
                })
        });
    },
    initModeSetting: function () {
        var t = this;
    },
    initDayNightSetting: function () {
        var that = this,
            a = $("body"),
            o = $("#readBtnMode"),
            r = o.find("h4");
        o.on("click", function () {
            var t = o.data("mode");
            console.log(t)
            if ("day" === t) {
                o.data("mode", "night"), r.html(r.html().replace("日", "夜")), r.html(r.html().replace("Day", "Night")), a.removeClass("read-night");
                var n = a.attr("class").match(/skin-([a-z]+)/);
                n && (n = n[1], $('#readSetSkin [type="radio"][value="' + n + '"]').prop("checked", !0));
                that.updateSettings({
                    dn: "d"
                });
            } else {
                "night" === t && (o.data("mode", "day"), r.html(r.html().replace("夜", "日")), r.html(r.html().replace("Night", "Day")), a.addClass("read-night"),
                    $('#readSetSkin [type="radio"]').each(function () {
                        var t = $(this);
                        t.prop("checked") && t.prop("checked", !1);
                    }));
                that.updateSettings({
                    dn: "n"
                });
                o.attr("data-model","day");
            }
        });
    },
    updateSettings: function (a) {
        var that = this,
            v = that.params;
        //setTimeout(function() {
        //          $.each(a, function(e, t) {
        //              v.settingsStr = v.settingsStr.replace(new RegExp(e + ":[^|]+"), e + ":" + t)
        //          });
        v.settingsJson = $.extend(v.settingsJson, a)
        //var o = v.settingsStr.replace(/[^:|]+:/g, "");
        BookUtils.setStorage(v.settingsKey, v.settingsJson);
        //console.log("v.settingsJson:", v.settingsJson);
        //}, 300);
        //v.isLogin && e.post("/majax/chapter/saveUserSetting", {settings: o})
    },
    jumpChapter: function (t, o, r, n) {
        var i = this;
        console.log("=jumpChapter{}, {}, {}, {}", t, o, r, n);
    },
    initCatalogs: function () {
        $("#asideOverlay").click(function(){
            $("#asideChapter").removeClass("active");
            $("html").removeClass("noscroll");
        });
    },
    showCatalogCallback: function (id) {
        $("#asideChapter").addClass("active");
        $("html").addClass("noscroll");
        if (id) {
            var chapterTmp =  $("#c"+id);
            var catelogX =  $("#catelogX");
            chapterTmp.find("span").addClass("red");
            setTimeout(function(){
                var top = chapterTmp.position().top;
                var height = $(window).height();
                console.log("==scrollTop==to==height{}, ",height)
                console.log("==scrollTop==to==top:{}", top)
                if(top>height){
                    console.log("==scrollTop==to==t",top-(height/2))
                    catelogX.scrollTop(top-(height/2));
                    // document.getElementsByClassName("layui-layer-content").scrollTo({
                    //     top: t-180
                    // });
                }
            },300);
            // if(typeof cur_location_url !=="undefined"){
            //     location.href = cur_location_url+"#c"+id
            // }
            //  var target = document.getElementById("c"+id);
            //  if(target){
            //      target.scrollIntoView();
            //  }
        }
        layer.closeAll()
    },
    showCatalogs: function (url1,url2,id) {
        var that = this;
        layer.open({type: 2});
        if(!that.params.catalog_cache){
            that.cachedScript(url1, function() {
                that.cachedScript(url2, function() {
                    that.showCatalogCallback(id);
                    that.params.catalog_cache = true;
                    $("#reverse").on("click", function () {
                        var b = $(this);
                        var desc = i18nUtils.prop("book_list_desc_order");
                        var asc = i18nUtils.prop("book_list_asc_order");
                        b.html(desc === b.html() ? asc : desc);
                        var a = desc === b.html() ? "asc" : "desc";
                        tinysort("#volumes>li", {selector: "span", data: "num", order: a})
                    });
                }, function() {
                    layer.open({content: 'load error2.',skin: 'msg',time: 2});
                    layer.closeAll()
                });
            }, function() {
                layer.open({content: 'load error1.',skin: 'msg',time: 2});
                layer.closeAll()
            });
        }else{
            that.showCatalogCallback(id)
        }
    },
    cachedScript: function (url, callback_success, callback_error) {
        var script = document.createElement("script"),
            $script = $(script);
        script.src = url;

        $("head").append(script);
        $script.bind("load", callback_success);
        $script.bind("error", callback_error);
    }

};

// ;(function($){
//     $.getScript = function (url, success, error) {
//         var script = document.createElement("script"),
//             $script = $(script);
//         script.src = url;
//
//         $("head").append(script);
//         $script.bind("load", success);
//         $script.bind("error", error);
//     };
//
// })(Zepto);

// Usage: $(element).scrollToTop([position])

function toggleOpt(t, a) {
    var i = this;
    if (!t) return i;
    $.isFunction(a) && (a = {
        callback: a
    });
    var o = {
        mode: "visible",
        container: $("body"),
        callback: function () {}
    }, n = $.extend({}, o, a || {});
    i.callback = n.callback, i.mode = n.mode, !t.size && $.isArray(t) && (t = t.join()),
        "string" == typeof t ? n.container.on("click", t, function (t) {
            toggleOptToggle($(this), t);
        }) : t.length && t.on("click", function (t) {
            toggleOptToggle($(this), t);
        }), toggleOptAria(t);
}

function toggleOptAria(t) {
    "visible" == this.mode && "string" == typeof t && $(t).each(function () {
        var t = $(this);
        t.attr({
            role: "menuitem",
            "aria-expanded": t.hasClass("active")
        });
    });
}

function toggleOptToggle(t, a) {
    var i, o = this,
        n = t;
    "visible" == o.mode ? (n = $("#" + t.attr("data-rel")), (i = t.hasClass("active")) ? (t.removeClass("active").attr(
        "aria-expanded", "false"),
        n.removeClass("active")) : (t.addClass("active").attr("aria-expanded", "true"), n.addClass("active"))) : "more" ==
        o.mode && ((i = "string" == typeof t.attr("open")) ? t.removeAttr("open") : t.attr("open", ""))
    //,o.callback.call(t, t, n, i, a);
}

function rangeOpt(t, a) {
    var n = this,
        e = {
            container: $("body"),
            shadow: !1,
            buttons: ["", ""],
            onChangeEnd: function () {},
            tips: function (t) {
                return t
            }
        }, i = $.extend({}, e, a || {}),
        s = t.attr("min") || 0,
        r = t.attr("max") || 100,
        o = t.attr("step") || 1,
        l = $("<div></div>").attr("class", t.attr("class")).addClass("range"),
        d = $("<div></div>").addClass("range-track"),
        u = $("<a></a>").addClass("range-thumb").attr({
            role: "slider",
            "aria-valuenow": t.val(),
            "aria-valuemax": r,
            "aria-valuemin": s
        }),
        h = $();
    1 == i.shadow && (h = $("<a></a>").addClass("range-shadow").attr("title", "之前位置")),
        t.before(l),
    0 == l.width() && l.width(t.width()),
        d.append(u),
        l.append(d).prepend(h),
        l.on("click", function (a) {
            var e = a && a.target;
            if (e)
                if (h.length && e == h[0]) {
                    var o = $(e).attr("data-value"),
                        l = t.val();
                    o && l != o && (rangeOptValue(o),
                        i.onChangeEnd.call(t, n))
                } else if (e != u[0]) {
                    var d = a.clientX - (u.offset().left - $(window).scrollLeft()) - u.width() / 2;
                    rangeOptValue(1 * t.val() + (r - s) * d / $(this).width()),
                        i.onChangeEnd.call(t, n)
                }
        });
    var c = {
        distance: 0
    };
    return u.on("touchstart", function (a) {
        var n = a.touches[0] || a;
        c.x = n.pageX,
            c.value = 1 * t.val(),
            c.distance = 0;
        var e = c.value;
        $.isFunction(i.tips) && (e = i.tips.call(t, c.value)),
            u.attr("data-tips", e).attr("aria-valuenow", e).addClass("active")
    }),
        i.container.on({
            touchmove: function (a) {
                var e = a.touches[0] || a;
                if ("number" == typeof c.x) {
                    var o = e.pageX - c.x;
                    c.distance = o,
                        rangeOptValue(c.value + (r - s) * o / l.width());
                    var d = t.val();
                    $.isFunction(i.tips) && (d = i.tips.call(t, d)),
                        u.attr("data-tips", d).attr("aria-valuenow", d),
                        a.preventDefault()
                }
            },
            touchend: function () {
                Math.abs(c.distance) > 0 && i.onChangeEnd.call(t, n),
                    c.x = null,
                    c.value = null,
                    u.removeClass("active"),
                    c.distance = 0
            }
        }),
    $.isArray(i.buttons) && i.buttons.forEach(function (a, e) {
        a && ("string" == typeof a && (a = $(a)),
        a.length && (a.on("click", function () {
            var a = +$(this).data("index"),
                e = t.attr("max"),
                s = t.attr("min") || "1",
                r = t.attr("step") || "1",
                o = t.val(),
                l = o;
            0 == a ? (l = o - r) < s && (l = s) : 1 == a && (l = 1 * o + 1 * r) > e && (l = e),
            l !== o && (rangeOptValue(l),
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
        rangeOptValue(),
        rangeOptShadow(),
        this
}

function rangeOptValue(t) {
    var a = this.el.input,
        n = a.val(),
        e = this.num.max,
        i = this.num.min,
        s = this.num.step;
    return t || (n = t,
        t = $.trim(a.val())),
        t = t > e || e - t < s / 2 ? e : "" == t || t < i || t - i < s / 2 ? i : i + Math.round((t - i) / s) * s,
        a.val(t),
        rangeOptPosition(),
    t != n && a.trigger("change"),
        this
}

function rangeOptPosition() {
    var t = this.el.input.val(),
        a = this.num.max,
        n = this.num.min;
    return this.num.step,
        this.el.track.css("borderLeftWidth", this.el.container.width() * (t - n) / (a - n)),
        this
}

function rangeOptShadow() {
    var t = this.el,
        a = t.track,
        n = t.shadow;
    return n.length && n.css("left", a.css("borderLeftWidth")).attr("data-value", t.input.val()),
        this
}