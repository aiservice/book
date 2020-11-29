define("qdm/js/book/module/Catalog.f7f41.js", ["lib.Zepto", "util.ejs2", "qdm/js/common/utils/Counter.fefd8.js", "qdm/js/common/components/List.44ed7.js", "qdm/js/common/components/Panel.77e55.js", "qdm/js/common/components/Tab.2becb.js"], function(require, exports, module) {
    function t(t) {
        t || (t = {}),
        this.volumesScrollerSelector = t.volumesScrollerSelector,
        this.bookId = t.bookId,
        this.volumes = t.volumes,
        this.readChapterId = t.readChapterId || l;
        var e = {};
        this.volumes.forEach(function(t) {
            t.cs.forEach(function(t) {
                e[t.id] = t
            })
        }),
        this.allChapters = e,
        this.list = null,
        this.initTabs(),
        this.initCatalog(),
        this.initBookMark()
    }
    var e = require("lib.Zepto")
      , o = require("util.ejs2")
      , s = require("qdm/js/common/utils/Counter.fefd8.js")
      , n = require("qdm/js/common/components/List.44ed7.js")
      , i = require("qdm/js/common/components/Panel.77e55.js")
      , r = require("qdm/js/common/components/Tab.2becb.js")
      , l = function(t) {
        return t
    };
    t.prototype = {
        initTabs: function() {
            var t = this
              , n = e("#chapterNav")
              , i = e("#bookmarkX")
              , l = n.find("line")
              , a = new s(1);
            new r(n.find("a"),{
                callback: function(s) {
                    l.css({
                        width: s.width(),
                        left: s.position().left
                    }),
                    a.execIf(s.data("rel") === i.attr("id"), function() {
                        e.loading(),
                        e.getJSON("/majax/chapter/getBookMarkList", {
                            bookId: t.bookId
                        }, function(t) {
                            if (e.unloading(),
                            0 === t.code) {
                                var s = o.render("#tpl-bookmark-list.html", t);
                                i.html(s)
                            } else
                                e.tips(t.msg)
                        })
                    })
                }
            })
        },
        initCatalog: function() {
            var t = this
              , s = {
                42: [42, 34, 42, 62],
                44: [44, 36, 44, 64],
                46: [46, 38, 46, 66]
            }
              , i = s[e(".jsChapter").height()] || s[44]
              , r = t.list = new n({
                scrollerSelector: t.volumesScrollerSelector,
                listSelector: "#volumes",
                getContent: function(e) {
                    return o.render("#tpl-volume-list.html", {
                        data: {
                            bookId: t.bookId,
                            vs: t.volumes,
                            _curId: t.readChapterId(),
                            _form: e.from,
                            _to: e.to,
                            _headerHeight: i[0],
                            _volumeHeight: i[1],
                            _chapterHeight: i[2],
                            _lastChapterHeight: i[3]
                        }
                    })
                }
            });
            t.scrollToReadChapter(),
            e("#reverse").on("click", function() {
                var o = e(this);
                o.html("倒序" === o.html() ? "正序" : "倒序"),
                t.volumes = t.volumes.map(function(t) {
                    return e.extend({}, t, {
                        cs: t.cs.slice().reverse()
                    })
                }).slice().reverse(),
                r.render()
            })
        },
        initBookMark: function() {
            e("#bookmarkX").on("click", ".jsMarkDel", function() {
                var t = e(this)
                  , o = t.data("chapter-id");
                new i("确定删除该书签？",{
                    buttons: [{}, {
                        value: "删除",
                        className: "red",
                        events: function() {
                            e(this).siblings("a").trigger("click"),
                            e.post("/majax/chapter/delBookMark", {
                                chapterId: o
                            }, function(o) {
                                0 === o.code ? t.parents(".jsBookmark").remove() : e.tips(o.msg)
                            })
                        }
                    }]
                })
            })
        },
        scrollToReadChapter: function() {
            var t = this
              , e = t.allChapters[t.readChapterId()];
            e && t.list && t.list.scrollTo(e._y)
        },
        setChapterSubscribed: function(t) {
            var e = this.allChapters[t];
            e && !e.sS && (e.sS = !0)
        }
    },
    module.exports = t
});
