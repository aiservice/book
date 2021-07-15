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
    BookChapterUtils.init();
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
    if(a){
        clsize(a)
    }else{
        clsize(18);
        a = 18
    }
    $("#set_font_inc_m").click(function () {
        if(19 >= a && "" != a){
            a++;
            clsize(a);
        }else{
            clsize("20")
        }
    });
    $("#set_font_inc_pc").click(function () {
        if(19 >= a && "" != a){
            a++;
            clsize(a);
        }else{
            clsize("20")
        }
    });
    $("#set_font_dec_m").click(function () {
        if(a >= 16 && "" != a){
            a--;
            clsize(a);
        }else{
            clsize("15")
        }
    });
    $("#set_font_dec_pc").click(function () {
        if(a >= 16 && "" != a){
            a--;
            clsize(a);
        }else{
            clsize("15")
        }
    });
    $("#set_theme_m").click(function () {
        6 >= b ? (b++, cltheme(b)) : (b -= 6, cltheme(b))
    });
    $("#set_theme_pc").click(function () {
        6 >= b ? (b++, cltheme(b)) : (b -= 6, cltheme(b))
    });
    // 1 == c && thmoon(),
    $("#mode").click(function () {
        var a = document.getElementById("readbg").getAttribute("class");
        if ("gd theme-moon active" !== a) {
            thmoon()
        } else {
            cltheme(b);
        }
    });

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
        this.loadSetting();
        this.initModes();
        this.initDayNightSetting();
        this.initFontSizeSetting();
        this.initAudio();
    },
    loadSetting: function () {
        var settingPc = '<div class="readerControls">\n' +
            '    <button class="readerControls_item" onclick="BookChapterUtils.showCatalogs()">\n' +
            '        <svg class="icon">\n' +
            '            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-catalog"></use>\n' +
            '        </svg>\n' +
            '    </button>\n' +
            '    <button class="readerControls_item" id="set_theme_pc">\n' +
            '        <svg class="icon">\n' +
            '            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-color"></use>\n' +
            '        </svg>\n' +
            '    </button>\n' +
            '    <div class="readerControls_fontSize">\n' +
            '        <button class="fontSizeButton" onclick="$(\'.readerControls_fontSize\').toggleClass(\'expand\');">\n' +
            '            <svg class="icon icon-font-set">\n' +
            '                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-font-set"></use>\n' +
            '            </svg>\n' +
            '        </button>\n' +
            '        <div class="fontSizeLabel left"  id="set_font_dec_pc"><span class="iconLeft">A-</span></div>\n' +
            '        <div class="fontSizeLabel right" id="set_font_inc_pc"><span class="iconRight">A+</span></div>\n' +
            '    </div>\n' +
            '    <button class="readerControls_item dark" id="mode">\n' +
            '        <svg class="icon icon-night">\n' +
            '            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-day"></use>\n' +
            '        </svg>\n' +
            '    </button>\n' +
            '    <button class="readerControls_item" id="audioOpt">\n' +
            '        <svg class="icon">\n' +
            '            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-erji"></use>\n' +
            '        </svg>\n' +
            '    </button>\n' +
            '</div>';


        var settingMobie = '<div id="pageReadOpt" class="page-read-opt" data-settings-key="r_set">\n' +
            '    <div id="readOptSet" class="read-opt-bot read-opt-set1">\n' +
            '        <div id="readSetSkin" class="read-set-skin">\n' +
            '            <ul class="btn-group" role="radiogroup">\n' +
            '                <li class="btn-group-cell read-set-cell">\n' +
            '                    <button class="readerControls_item_mobile" id="set_theme_m">\n' +
            '                        <svg class="icon">\n' +
            '                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-color"></use>\n' +
            '                        </svg>\n' +
            '                    </button>\n' +
            '                </li>\n' +
            '                <li class="btn-group-cell read-set-cell">\n' +
            '                    <button class="readerControls_item_mobile" id="set_font_dec_m">\n' +
            '                        <svg class="icon">\n' +
            '                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-size-down"></use>\n' +
            '                        </svg>\n' +
            '                    </button>\n' +
            '                </li>\n' +
            '                <li class="btn-group-cell read-set-cell">\n' +
            '                    <button class="readerControls_item_mobile" id="set_font_inc_m">\n' +
            '                        <svg class="icon">\n' +
            '                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-size-up"></use>\n' +
            '                        </svg>\n' +
            '                    </button>\n' +
            '                </li>\n' +
            '                <li class="btn-group-cell read-set-cell">\n' +
            '                    <button class="readerControls_item_mobile" name="StranLink" id="StranLink" onclick="StranBody()">\n' +
            '                        简\n' +
            '                    </button>\n' +
            '                </li>\n' +
            '            </ul>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <footer class="read-opt-footer">\n' +
            '        <div class="btn-group"><a onclick="BookChapterUtils.showCatalogs()" class="btn-group-cell">\n' +
            '            <svg class="icon icon-catalog">\n' +
            '                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-catalog"></use>\n' +
            '            </svg>\n' +
            '            <h4 class="read-opt-footer-h">' + i18nUtils.prop("book_list") + '</h4>\n' +
            '        </a> <a href="javascript:" id="readBtnSet" class="btn-group-cell jsLayerTrigger" data-rel="readOptSet" data-eid="mqd_R14" role="menuitem" aria-expanded="false">\n' +
            '            <svg class="icon icon-font-set">\n' +
            '                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-font-set"></use>\n' +
            '            </svg>\n' +
            '            <svg class="icon icon-font-set-on">\n' +
            '                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-font-set-on"></use>\n' +
            '            </svg>\n' +
            '            <h4 class="read-opt-footer-h">' + i18nUtils.prop("book_setting") + '</h4>\n' +
            '        </a> <a href="javascript:" id="readBtnMode" class="btn-group-cell" data-mode="night" role="checkbox">\n' +
            '            <svg class="icon icon-day">\n' +
            '                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-day"></use>\n' +
            '            </svg>\n' +
            '            <svg class="icon icon-night">\n' +
            '                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-night"></use>\n' +
            '            </svg>\n' +
            '            <h4 class="read-opt-footer-h">' + i18nUtils.prop("book_mode_night") + '</h4>\n' +
            '        </a>\n' +
            '            <a id="audioOptMobile" class="btn-group-cell jsLayerTrigger">\n' +
            '                <svg class="icon">\n' +
            '                    <use xlink:href="#icon-erji"></use>\n' +
            '                </svg>\n' +
            '                <h4 class="read-opt-footer-h">' + i18nUtils.prop("book_listen") + '</h4>\n' +
            '            </a>\n' +
            '        </div>\n' +
            '    </footer>\n' +
            '</div>';
        $("body").append(settingPc).append(settingMobie);
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
                }, 50);
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
        var theme = BookUtils.getStorage("theme");
        o.on("click", function () {
            var t = o.data("mode");
            console.log(t);
            if ("day" === t) {
                cltheme(theme);
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
    showCatalogs: function () {
        var d = $("#artWrap");
        var catalogJs = "/files/book/scripts/" + d.data("burl") + "/catalog.js";
        var catalogHandleJs = "/scripts/catalog/handle.m.v3.js";
        if (typeof ctx_cdn !== "undefined") {
            catalogJs = ctx_cdn + catalogJs;
        }
        var cdn_static = d.data("cdn-static");
        if (typeof cdn_static !== "undefined") {
            catalogHandleJs = cdn_static + catalogHandleJs;
        }
        BookUtils.showCatalogs(catalogJs, catalogHandleJs, d.data("cid"))
    }

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
