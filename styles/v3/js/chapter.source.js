function thmoon() {
    document.getElementById("readbg").className = "gd theme-moon active";
    BookUtils.setStorage("thmoon", "1");
}

function clsize(a) {
    15 == a ? document.getElementById("TextContent").className = "read-content fz14" : 16 == a ? document.getElementById("TextContent").className = "read-content fz16" : 17 == a ? document.getElementById("TextContent").className = "read-content fz18" : 18 == a ? document.getElementById("TextContent").className = "read-content fz20" : 19 == a ? document.getElementById("TextContent").className = "read-content fz22" : 20 == a && (document.getElementById("TextContent").className = "read-content fz24");
    BookUtils.setStorage("fontsize", a);
}

function cltheme(a) {
    if (!a) {
        a = 7;
    }
    1 == a ? document.getElementById("readbg").className = "hui" : 2 == a ? document.getElementById("readbg").className = "ls" : 3 == a ? document.getElementById("readbg").className = "fs" : 4 == a ? document.getElementById("readbg").className = "nuan" : 5 == a ? document.getElementById("readbg").className = "huang" : 6 == a ? document.getElementById("readbg").className = "lan" : 7 == a && (document.getElementById("readbg").className = "nuan");
    BookUtils.setStorage("theme", a);
    BookUtils.removeStorage("thmoon");
}

$(function () {
    var c = BookUtils.getStorage("thmoon"), a = BookUtils.getStorage("fontsize"),
        b = BookUtils.getStorage("theme");
    if (b) {
        cltheme(b);
    } else {
        thmoon();
    }
    if (c) {
        thmoon();
    }
    void 0 == a ? (clsize(18), a = 18) : clsize(a),
        // void 0 == b ? (cltheme(1), b = 1) : cltheme(b),
        $(".set_font_inc").click(function () {
            19 >= a && "" != a ? (a++, clsize(a)) : clsize("20")
        }),
        $(".set_font_dec").click(function () {
            a >= 16 && "" != a ? (a--, clsize(a)) : clsize("15")
        }),
        $(".set_theme").click(function () {
            6 >= b ? (b++, cltheme(b)) : (b -= 6, cltheme(b))
        }),
        // 1 == c && thmoon(),
        $("#mode").click(function () {
            var a = document.getElementById("readbg").getAttribute("class");
            if ("gd theme-moon active" !== a) {
                thmoon()
            } else {
                cltheme(b);
            }
        });
    BookChapterUtils.init();
});

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
        this.initDayNightSetting();
        this.initFontSizeSetting();
        this.initAudio();
    },
    initModes: function () {
        var that = this, o = $("#readBtnMode");
        var dn = BookUtils.getStorage("thmoon");
        var skin = BookUtils.getStorage("theme");
        //console.log("set1:", v.settingsJson)
        //console.log("setting in cookie:", st);
        if (dn) {
            console.log("dn:", dn);
            o.data("mode", "night")
        } else if (skin) {
            o.data("mode", "day");
            console.log("skin:", skin);
            var rd = $('[data-index="' + skin + '"]', "#readSetSkin"),
                skin_value = rd.val();
            rd.attr("checked", "true");
        }

        var isClick = true;
        var pageReadOpt = $("#pageReadOpt");
        $(".mlfy_main").on('click', function () {
            console.log("isClick:", isClick);
            if (isClick) {
                setTimeout(function () {
                    pageReadOpt.toggleClass("active");
                    isClick = true;
                }, 100);
            }
            isClick = false;
        });
    },
    initFontSizeSetting: function () {
        var that = this,
            a = $("#readBtnSet");
        toggleOpt(a);
    },
    initAudio: function () {
        var audioOpt = $("#audioOptMobile");
        audioOpt.on("click", function () {
            console.log($("#audioOptSet").length)
            $("#audioOptSet").addClass("active")
        });
    },
    initDayNightSetting: function () {
        var that = this,
            o = $("#readBtnMode"),
            r = o.find("h4");
        o.on("click", function () {
            var t = o.data("mode");
            console.log(t);
            if ("day" === t) {
                cltheme(4);
                r.html(r.html().replace("日", "夜")), r.html(r.html().replace("Day", "Night"));
                o.find(".icon-day").hide();
                o.find(".icon-night").show();
                o.data("mode", "night");
            } else {
                thmoon();
                r.html(r.html().replace("夜", "日")), r.html(r.html().replace("Night", "Day"));
                o.data("mode", "day");
                o.find(".icon-day").show();
                o.find(".icon-night").hide();
            }
        });
        o.trigger("click");
    },

};


function toggleOpt(t, a) {
    var i = this;
    if (!t) return i;
    $.isFunction(a) && (a = {
        callback: a
    });
    var o = {
        mode: "visible",
        container: $("body"),
        callback: function () {
        }
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
