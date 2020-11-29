var AIISEN = AIISEN || {
    version:"1.0.0"
};

AIISEN.guid = "$AIISEN$", AIISEN.config = {}, AIISEN.cookie = AIISEN.cookie || {},
    AIISEN.localstore = AIISEN.localstore || {}, AIISEN._isSupportLocal = function() {
    if (window.localStorage) {
        return window.localStorage;
    }
    return false;
}, AIISEN.localstore.get = function(b) {
    var c = AIISEN._isSupportLocal();
    if (c) {
        return window.localStorage.getItem(b);
    }
    return AIISEN.cookie.get(b);
}, AIISEN.localstore.set = function(e, d, g) {
    var f = AIISEN._isSupportLocal();
    if (f) {
        window.localStorage.setItem(e, d);
    }
    AIISEN.cookie.set(e, d, g);
}, AIISEN.localstore.remove = function(d, c) {
    var e = AIISEN._isSupportLocal();
    if (e) {
        window.localStorage.removeItem(d);
    }
    AIISEN.cookie.remove(d, c);
}, AIISEN.cookie._isValidKey = function(b) {
    return new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(b);
}, AIISEN.cookie.getRaw = function(e) {
    if (AIISEN.cookie._isValidKey(e)) {
        var d = new RegExp("(^| )" + e + "=([^;]*)(;|$)"), f = d.exec(document.cookie);
        if (f) {
            return f[2] || null;
        }
    }
    return null;
}, AIISEN.cookie.get = function(d) {
    var c = AIISEN.cookie.getRaw(d);
    return "string" == typeof c ? (c = decodeURIComponent(c), c) :null;
}, AIISEN.cookie.setRaw = function(f, e, h) {
    if (!AIISEN.cookie._isValidKey(f)) {
        return;
    }
    h = h || {};
    var g = h.expires;
    "number" == typeof h.expires && (g = new Date(), g.setTime(g.getTime() + h.expires)),
        document.cookie = f + "=" + e + (h.path ? "; path=" + h.path :"") + (g ? "; expires=" + g.toGMTString() :"") + (h.domain ? "; domain=" + h.domain :"") + (h.secure ? "; secure" :"");
}, AIISEN.cookie.remove = function(d, c) {
    c = c || {}, c.expires = new Date(0), AIISEN.cookie.setRaw(d, "", c);
}, AIISEN.cookie.set = function(e, d, f) {
    AIISEN.cookie.setRaw(e, encodeURIComponent(d), f);
}, AIISEN.usr = AIISEN.usr || {}, AIISEN.usr.uname = "", AIISEN.usr.record = function(m, d, f, j, e) {
    var b = "", o = "", k, h, n = [], g;
    if ("string" == typeof m) {
        k = AIISEN.JSON(AIISEN.localstore.get(m));
        h = Date.parse(new Date());
        if (k) {
            b = '{"bookid":"' + d + '","bookname":"' + f + '","chapid":"' + j + '","chapname":"' + e + '"}';
            var a = k.record.length;
            if (a > 0) {
                for (var c = 0; c < a; c++) {
                    console.log(d);
                    console.log(k.record[c].bookid);
                    if (d != k.record[c].bookid) {
                        n.push(k.record[c]);
                    } else {
                        n.push(b);
                    }
                }
            }
            if (1 == n.length) {
                g = '{"record":' + n[0] + "}";
            } else {
                o = n.join(",");
                g = '{"record":' + o + "}";
            }
            AIISEN.localstore.set("aiisen", g, h);
        } else {
            b = '{"record":[{"bookid":"' + d + '","bookname":"' + f + '","chapid":"' + j + '","chapname":"' + e + '"}]}';
            AIISEN.localstore.set(m, b, h);
        }
    }
}, AIISEN.ui = AIISEN.ui || {};



$(function() {
    var b = new Date(), b = b.setTime(b.getTime() + 30 * 24 * 3600);
    $("#background").click(function() {
        $(this).parent().parent().children(".select").show();
    });
    $("#background1").click(function() {
        $(this).parent().parent().children(".select").show();
    });
    $(".select").parent().each(function() {
        $(this).hover(function() {
            $(this).children(".select").show();
        }, function() {
            $(this).children(".select").hide();
        });
    });
    $("#background").parent().parent().children(".select").children("p").each(function() {
        $(this).click(function() {
            $("#background").val($(this).html());
            $("#background").parent().parent().children(".select").hide();
            $(".ydleft").removeClass($("#background2").val());
            $("body").removeClass($("#background2").val());
            $("#background2").val($(this).attr("class"));
            $("body").addClass($(this).attr("class"));
            AIISEN.localstore.set("background", $("#background2").val(), {
                path:"/",
                expires:b
            });
        });
    });
    $("#fontSize").click(function() {
        var d = $("#fontSize").parent().parent().children(".select");
        d.show();
    });
    $("#fontSize1").click(function() {
        var d = $("#fontSize1").parent().parent().children(".select");
        d.show();
    });
    $("#fontSize").parent().parent().children(".select").children("p").each(function() {
        $(this).click(function() {
            $("#fontSize").val($(this).html());
            $("#fontSize").parent().parent().children(".select").hide();
            $(".art_wrap").removeClass($("#fontSize2").val()).removeClass("fon_19").removeClass("fon_18");
            $("#fontSize2").val($(this).attr("class"));
            $(".art_wrap").addClass($(this).attr("class"));
            AIISEN.localstore.set("fontSize", $("#fontSize2").val(), {
                path:"/",
                expires:b
            });
            if(i18nUtils.getDefaultLocale() === 'en'){
                $(".art_wrap").css("{letter-spacing: 0;}");
            }
        });
    });
    $("#fontFamily").click(function() {
        var d = $("#fontFamily").parent().parent().children(".select");
        d.show();
    });
    $("#fontFamily1").click(function() {
        var d = $("#fontFamily1").parent().parent().children(".select");
        d.show();
    });
    $("#fontFamily").parent().parent().children(".select").children("p").each(function() {
        $(this).click(function() {
            $("#fontFamily").val($(this).html());
            $("#fontFamily").parent().parent().children(".select").hide();
            $(".art_wrap").removeClass($("#fontFamily2").val()).removeClass("fam_yahei");
            $("#fontFamily2").val($(this).attr("class"));
            $(".art_wrap").addClass($(this).attr("class"));
            AIISEN.localstore.set("fontFamily", $("#fontFamily2").val(), {
                path:"/",
                expires:b
            });
        });
    });
    $("#fontColor").click(function() {
        var d = $("#fontColor").parent().parent().children(".select");
        d.show();
    });
    $("#fontColor1").click(function() {
        var d = $("#fontColor1").parent().parent().children(".select");
        d.show();
    });
    $("#fontColor").parent().parent().children(".select").children("p").each(function() {
        $(this).click(function() {
            $("#fontColor").val($(this).html());
            $("#fontColor").parent().parent().children(".select").hide();
            $(".art_wrap").removeClass($("#fontColor2").val());
            $("#fontColor2").val($(this).attr("class"));
            $(".art_wrap").addClass($(this).attr("class"));
            AIISEN.localstore.set("fontColor", $("#fontColor2").val(), {
                path:"/",
                expires:b
            });
        });
    });
    $("#saveButton").click(function() {
        $(this).addClass("cur").next().removeClass("cur");
        AIISEN.localstore.set("background", $("#background2").val(), {
            path:"/",
            expires:b
        });
        AIISEN.localstore.set("fontSize", $("#fontSize2").val(), {
            path:"/",
            expires:b
        });
        AIISEN.localstore.set("fontColor", $("#fontColor2").val(), {
            path:"/",
            expires:b
        });
        AIISEN.localstore.set("fontFamily", $("#fontFamily2").val(), {
            path:"/",
            expires:b
        });
        alert("保存成功");
    });
    $("#recoveryButton").click(function() {
        $(this).addClass("cur").prev().removeClass("cur");
        $("body").removeClass().addClass("bg_hui");
        AIISEN.localstore.remove("background", "", {
            path:"/",
            expires:b
        });
        AIISEN.localstore.remove("fontSize", "", {
            path:"/",
            expires:b
        });
        AIISEN.localstore.remove("fontColor", "", {
            path:"/",
            expires:b
        });
        AIISEN.localstore.remove("fontFamily", "", {
            path:"/",
            expires:b
        });
        if( i18nUtils.getDefaultLocale() === 'en'){
            $("#background").val("Background");
            $("#fontColor").val("Color");
            $("#fontFamily").val("Font");
            $("#fontSize").val("Size");
            $("#background2").val("bg_hui");
            $("#fontSize2").val("fon_18");
            $("#fontColor2").val("z_hui");
            $("#fontFamily2").val("fam_serif");
            $("#artWrap").removeClass().addClass("art_wrap mt15 z_hui fam_serif fon_18");
        }else{
            $("#artWrap").removeClass().addClass("art_wrap mt15 z_hui fam_yahei fon_19");
            $("#background").val("阅读底色");
            $("#fontColor").val("字体色彩");
            $("#fontFamily").val("字体");
            $("#fontSize").val("字号大小");
            $("#background2").val("bg_hui");
            $("#fontSize2").val("fon_19");
            $("#fontColor2").val("z_hui");
            $("#fontFamily2").val("fam_yahei");
        }
    });
    $("#fullscreen").bind("click", function() {
        var d = $(this).attr("data-opt");
        if ("1" === d) {
            $(this).find("b").html(i18nUtils.prop("book_read_fullscreen_cancel"));
            $(this).attr("data-opt", "2");
            $("body").addClass("fullscreen");
        } else {
            $(this).find("b").html(i18nUtils.prop("book_read_fullscreen"));
            $(this).attr("data-opt", "1");
            $("body").removeClass("fullscreen");
        }
        AIISEN.localstore.set("fullscreen", d, {
            path:"/",
            expires:b
        });
    });
});


function readInit() {
    var lang = i18nUtils.getDefaultLocale();
    if (AIISEN.localstore.get("fullscreen")) {
        var d = AIISEN.localstore.get("fullscreen");
        if ("1" === d) {
            $("#fullscreen").find("b").html(i18nUtils.prop("book_read_fullscreen_cancel"));
            $("#fullscreen").attr("data-opt", "2");
            $("body").addClass("fullscreen");
        } else {
            $("#fullscreen").find("b").html(i18nUtils.prop("book_read_fullscreen"));
            $("#fullscreen").attr("data-opt", "1");
            $("body").removeClass("fullscreen");
        }
    } else {
        $("#fullscreen").find("b").html(i18nUtils.prop("book_read_fullscreen"));
        $("#fullscreen").attr("data-opt", "1");
        $("body").removeClass("fullscreen");
    }
    if (AIISEN.localstore.get("background")) {
        var e = AIISEN.localstore.get("background"), h = $("." + e).html();
        $("#background").val(h);
        $("body").addClass(e);
    } else {
        $("body").addClass("bg_hui");
        if(lang === 'en'){
            $("#background").val("Background");
        }else{
            $("#background").val("阅读底色");
        }
    }
    if (AIISEN.localstore.get("fontColor")) {
        var f = AIISEN.localstore.get("fontColor");
        $("#fontColor").val($("." + f).html());
        $(".art_wrap").addClass(f);
    } else {
        if(lang === 'en'){
            $("#fontColor").val("Color");
        }else{
            $("#fontColor").val("字体色彩");
        }
    }
    if (AIISEN.localstore.get("fontFamily")) {
        var d = AIISEN.localstore.get("fontFamily");
        $("#fontFamily").val($("." + d).html());
        $(".art_wrap").removeClass("fam_yahei").addClass(d);
    } else {
        if(lang === 'en'){
            $("#fontFamily").val("Font");
            $("#fontFamily2").val("fam_serif");
            $(".art_wrap").removeClass("fam_yahei").addClass("fam_serif");
        }else{
            $("#fontFamily").val("字体");
        }
    }
    if (AIISEN.localstore.get("fontSize")) {
        var g = AIISEN.localstore.get("fontSize");
        $("#fontSize").val($("." + g).html());
        $(".art_wrap").removeClass("fon_19").addClass(g);
    } else {
        if(lang === 'en'){
            $("#fontSize").val("Size");
            $("#fontSize2").val("fon_18");
            $(".art_wrap").removeClass("fon_19").addClass("fon_18");
        } else {
            $("#fontSize").val("字号大小");
        }
    }
    if(lang === 'en'){
        $(".art_wrap").css({"letter-spacing":"0"});
    }
}

$(document).ready(function() {
    $("body").bind("keyup", function(b) {
        var c = $("#preurl").attr("href");
        var a = $("#nexturl").attr("href");
        var b = b || window.event;
        if (b.keyCode == 37) {
            if (c != "javascript:void(0);") {
                window.location.href = c;
            } else {
                alert(i18nUtils.prop("book_is_first_chapter"));
            }
        } else {
            if (b.keyCode == 39) {
                if (a != "javascript:void(0);") {
                    window.location.href = a;
                } else {
                    alert(i18nUtils.prop("book_is_last_chapter"));
                }
            }
        }
    });
    readInit();
});