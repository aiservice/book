//        initHisotry: function() {
//            var s = this
//              , i = o.extend({
//                data: t.getBooks(),
//                staticConf: g_data
//            }, n)
//              , e = m.render("#tpl-history-read.html", i);
//            o("#bookEditOl").html(e),
//            s.updateLazyLoad()
//        }

define("qdm/js/common/store/recentlyRead.b5fcf.js", ["qdm/js/common/utils/date.65910.js", "qdm/js/common/utils/Storage.352e8.js"], function(require, exports, module) {
    function e() {
        var e = o.get(a);
        return Array.isArray(e) ? e : []
    }
    var t = require("qdm/js/common/utils/date.65910.js")
      , o = require("qdm/js/common/utils/Storage.352e8.js")
      , a = "RECENTLY_READ";
    module.exports = {
        getBooks: function() {
            var o = e();
            return Array.isArray(o) ? o.map(function(e) {
                return e.datetime = -1 === e.time ? "2016-12-29" : t.format(e.time, "YYYY-MM-DD"),
                e.time = -1 === e.time ? "12.29前" : t.toNow(e.time),
                e
            }) : []
        },
        addBook: function(t, r) {
            for (var m = e(), i = 0, n = m.length; i < n; i++)
                if (+m[i].bid == +t.bookId) {
                    m.splice(i, 1);
                    break
                }
            m.unshift({
                bid: t.bookId,
                bName: t.bookName,
                cid: r.chapterId,
                cName: r.chapterName,
                aid: t.authorId,
                aName: t.authorName,
                time: (new Date).getTime()
            }),
            o.set(a, m.slice(0, 20))
        },
        syncBooks: function(t) {
            var r = e();
            t.forEach(function(e) {
                for (var t = 0, o = r.length; t < o; t++)
                    if (+r[t].bid == +e.bookId)
                        return;
                r.push({
                    bid: e.bookId,
                    bName: e.bookName,
                    cid: e.chapterId,
                    cName: e.chapterName,
                    aid: e.authorId,
                    aName: e.authorName,
                    time: -1
                })
            }),
            o.set(a, r.slice(0, 20))
        }
    }
});

define("qdm/js/common/utils/date.65910.js", [], function(require, exports, module) {
    function e(e, t) {
        e instanceof Date || (e = new Date(e)),
        t = t || "YYYY-MM-DD HH:mm:ss";
        var o = {
            "M+": e.getMonth() + 1,
            "D+": e.getDate(),
            "H+": e.getHours(),
            "h+": e.getHours() % 12 == 0 ? 12 : e.getHours() % 12,
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        /(Y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))),
        /(dd+)/.test(t) && (t = t.replace(RegExp.$1, "日一二三四五六七".split("")[e.getDay()]));
        for (var r in o)
            new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? o[r] : ("00" + o[r]).substr(("" + o[r]).length)));
        return t
    }
    module.exports = {
        format: e,
        toNow: function(t) {
            var o = new Date(t).getTime();
            if (isNaN(o))
                return t;
            var r = (new Date).getTime() - o;
            return r > 31536e6 ? "1年前" : r > 2592e6 ? Math.floor(r / 2592e6) + "个月前" : r > 864e5 ? Math.floor(r / 864e5) + "天前" : r > 36e5 ? Math.floor(r / 36e5) + "小时前" : r > 6e4 ? Math.floor(r / 6e4) + "分钟前" : r > 0 ? "刚刚" : e(t)
        }
    }
});
define("qdm/js/common/utils/Storage.352e8.js", [], function(require, exports, module) {
    var t = function() {
        try {
            return localStorage.setItem("test", "test"),
            localStorage.removeItem("test"),
            !0
        } catch (t) {
            return !1
        }
    }();
    module.exports = {
        get: function(e) {
            if (!t)
                return null;
            try {
                return JSON.parse(localStorage.getItem(e))
            } catch (r) {
                return null
            }
        },
        set: function(e, r) {
            if (!t)
                return null;
            try {
                return localStorage.setItem(e, JSON.stringify(r))
            } catch (n) {
                return null
            }
        },
        remove: function(e) {
            return t ? localStorage.removeItem(e) : null
        },
        clear: function() {
            return t ? localStorage.clear() : null
        }
    }
});
