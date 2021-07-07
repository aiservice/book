function cookie_encode(a) {
    var b = encodeURIComponent(a),
        c = b.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,
            function (a) {
                return decodeURIComponent(a)
            });
    return c
}

function thmoon() {
    document.getElementById("readbg").className = "gd theme-moon active",
        $.cookie("thmoon", "1", {
            expires: 365,
            path: "/"
        })
}

function clsize(a) {
    15 == a ? document.getElementById("TextContent").className = "read-content fz14" : 16 == a ? document.getElementById("TextContent").className = "read-content fz16" : 17 == a ? document.getElementById("TextContent").className = "read-content fz18" : 18 == a ? document.getElementById("TextContent").className = "read-content fz20" : 19 == a ? document.getElementById("TextContent").className = "read-content fz22" : 20 == a && (document.getElementById("TextContent").className = "read-content fz24"),
        $.cookie("fontsize", a, {
            expires: 365,
            path: "/"
        })
}

function cltheme(a) {
    1 == a ? document.getElementById("readbg").className = "hui" : 2 == a ? document.getElementById("readbg").className = "ls" : 3 == a ? document.getElementById("readbg").className = "fs" : 4 == a ? document.getElementById("readbg").className = "nuan" : 5 == a ? document.getElementById("readbg").className = "huang" : 6 == a ? document.getElementById("readbg").className = "lan" : 7 == a && (document.getElementById("readbg").className = ""),
        $.cookie("theme", a, {
            expires: 365,
            path: "/"
        })
}

function theme() {
    document.writeln('<div class="toolbar"><div class="theme" style="float: left;width: auto;height: auto;"><span><a onclick="sq(' + bid + "," + cid + ');">添加书签</a><a href="/newmessage.php?tosys=1&amp;title=' + name + ' 有错误&content=https://www.yoduzw.com/modules/article/chapteredit.php?id=' + cid + '%0D%0A请明确错误原因%0D%0A%0D%0A">报错求书</a><a href="/history">阅读记录</a></span></div><a href="javascript:;" class="aminus font_dec" id="font_dec"></a><a href="javascript:;" class="aadd font_inc" id="font_inc"></a><a href="javascript:;" class="pattern menu-moon" id="mode"></a><div class="option theme"><div class="theme-area theme-pink" id="theme2"></div></div><div class="cr"></div></div>')
}

jQuery.cookie = function (a, b, c) {
    var d, e, f, g;
    return arguments.length > 1 && "[object Object]" !== String(b) ? (c = jQuery.extend({},
        c), (null === b || void 0 === b) && (c.expires = -1), "number" == typeof c.expires && (d = c.expires, e = c.expires = new Date, e.setDate(e.getDate() + d)), b = String(b), document.cookie = [encodeURIComponent(a), "=", c.raw ? b : cookie_encode(b), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")) : (c = b || {},
        g = c.raw ?
            function (a) {
                return a
            } : decodeURIComponent, (f = new RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)").exec(document.cookie)) ? g(f[1]) : null)
},
    $(function () {
        var c, a = $.cookie("fontsize"),
            b = $.cookie("theme");
        void 0 == a ? (clsize(18), a = 18) : clsize(a),
            void 0 == b ? (cltheme(1), b = 1) : cltheme(b),
            $("#font_inc").click(function () {
                19 >= a && "" != a ? (a++, clsize(a)) : clsize("20")
            }),
            $("#font_dec").click(function () {
                a >= 16 && "" != a ? (a--, clsize(a)) : clsize("15")
            }),
            $("#theme2").click(function () {
                6 >= b ? (b++, cltheme(b)) : (b -= 6, cltheme(b))
            }),
            c = $.cookie("thmoon"),
        1 == c && thmoon(),
            $("#mode").click(function () {
                var a = document.getElementById("readbg").getAttribute("class");
                "gd theme-moon active" != a ? thmoon() : (cltheme(b), $.cookie("thmoon", null, {
                    expires: 365,
                    path: "/"
                }))
            })
    });