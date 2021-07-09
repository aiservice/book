/*!
 * Powered by uglifiyJS v2.6.1, Build by http://www.ossoft.cn
 * build time: Sat May 11 2019 14:03:36 GMT+0800 (China Standard Time)
*/
$.storage = function (e, t, r) {
    var n = function () {
        try {
            return localStorage.setItem("storage", ""), localStorage.removeItem("storage"), localStorage
        } catch (e) {
            var t = document.cookie.split(";");
            return {
                length: function () {
                    return t.length
                }(), key: function (e) {
                    var r = t[e].split("="), n = decodeURIComponent(r.shift());
                    return n
                }, getItem: function (e) {
                    return $.cookie(e)
                }, setItem: function (e, t) {
                    $.cookie(e, t, {expires: r || 31536e3})
                }, removeItem: function (e) {
                    $.cookie(e, null)
                }, clear: function () {
                    $.cookie(null)
                }
            }
        }
    }(), o = {}, i = parseInt((new Date).getTime() / 1e3);
    if (void 0 === e) {
        for (var l, u = 0; u < n.length; u++) l = n.key(u), t = $.kv(l), t && (o[l] = t);
        return o
    }
    if (null === e) n.clear(); else {
        if (void 0 === t) return (o = n.getItem(e)) ? (o = JSON.parse(o), o.expires && i > o.expires ? ($.kv(e, null), !1) : o = o.value) : !1;
        null === t ? n.removeItem(e) : (o = {time: i, expires: r ? i + r : 0, value: t}, o = JSON.stringify(o), n.setItem(e, o))
    }
};

if (typeof BookUtils === "undefined") {
    BookUtils = {}
}
BookUtils = {
    tip: function (a) {
        layer.open({content: a, skin: "msg", time: 2})
    },
    loading: function (b) {
        var a = {type: 2};
        if (b) {
            a = {type: 2, content: b}
        }
        layer.open(a)
    },
    close: function (a) {
        layer.closeAll()
    },
    testStorage: function () {
        try {
            return localStorage.setItem("test", "test"), localStorage.removeItem("test"), true
        } catch (a) {
            return false
        }
    },
    getStorage: function (a) {
        try {
            return JSON.parse($.storage(a))
        } catch (b) {
            console.log(b)
            return null
        }
    },
    setStorage: function (a, b) {
        try {
            return $.storage(a, JSON.stringify(b))
        } catch (c) {
            return null
        }
    },
    removeStorage: function (a) {
        return $.storage(a, null)
    },
    clearStorage: function () {
        return $.storage(null)
    },
    render: function (c, a) {
        var b = document.getElementById(c).innerHTML;
        return ejs.render(b, a, {delimiter: "$"})
    },
    params: {
        is_login: false,
        key_bookshelf: "BOOK_SHELF",
        key_recently_read: "RECENTLY_READ",
        is_append: true,
        catalog_cache: false
    },
    getArrayDataFromStorage: function (a) {
        var b = this.getStorage(a);
        return Array.isArray(b) ? b : []
    },
    addBookToStorage: function (a, b) {
        var d = $("#artWrap");
        if (d.length > 0) {
            var c = {
                bid: d.data("bid"),
                bUrl: d.data("burl"),
                bName: d.data("bname"),
                cid: d.data("cid"),
                cName: d.data("cname"),
                aName: d.data("aname")
            };
            if (b) {
                this.addBook(a, c)
            } else {
                this.updateBook(a, c);
                if (this.params.is_login && this.params.key_bookshelf === a) {
                    $.post("/CsAjax.do?method=updateMyFav", {
                        book_id: c.bid,
                        chapter_id: c.cid,
                        chapter_name: c.cName
                    }, function (e) {
                    })
                }
            }
        }


    },
    addBookToStorageForBookShelf: function () {
        this.addBookToStorage(this.params.key_bookshelf, true)
    },
    addBookToStorageForRecentRead: function () {
        this.addBookToStorage(this.params.key_recently_read, true);
        this.addBookToStorage(this.params.key_bookshelf, false)
    },
    getBooksFromStroage: function (b) {
        var c = this;
        var d = c.getArrayDataFromStorage(b);
        var a = d.map(function (f) {
            f.datetime = -1 === f.time ? "2015-01-11" : c.formatDate(f.time, "YYYY-MM-DD");
            f.time = -1 === f.time ? "01.11" : c.toNow(f.time);
            return f
        });
        return a
    },
    updateBook: function (d, f) {
        var c = f;
        var a = this.getArrayDataFromStorage(d);
        for (var b = 0, g = a.length; b < g; b++) {
            if (a[b].bid === c.bid) {
                this.checkIsInBookshelf(true);//for viewChapter
                a.splice(b, 1);
                var e = $.extend(f, {time: (new Date).getTime()});
                a.unshift(e);
                this.setStorage(d, a.slice(0, 20));
                break
            }
        }
    },
    addBook: function (d, f) {
        var c = f;
        var a = this.getArrayDataFromStorage(d);
        for (var b = 0, g = a.length; b < g; b++) {
            if (a[b].bid === c.bid) {
                a.splice(b, 1);
                break
            }
        }
        var e = $.extend(f, {time: (new Date).getTime()});
        a.unshift(e);
        this.setStorage(d, a.slice(0, 20))
    },
    checkIsInBookshelf: function (a, href) {
        var bf = $("#btnAddToBookshelf");
        if (a) {
            if (typeof href !== "undefined") {
                $("#btnReadBook").attr("href", href).find("strong").html(i18nUtils.prop("book_bookshelf_continue_reading"));
            }
            bf.data("bookshelf-status", 1).attr("disabled", "true");
            bf.html("<strong>" + i18nUtils.prop("book_bookshelf_exists") + "</strong>")
        } else {
            bf.data("bookshelf-status", 0)
        }
    },
    initForBookView: function () {
        this.initCatalog();
        var that = this;
        that.initCheckBookStatus();
        that.showHistory();
        setTimeout(function () {
            if (isBot()) {
                return;
            }
            that.updateBookOpt();
        }, 2000);
        that.imgLazyload();
    },
    initCatalog: function () {
        var i = $('.det-con-ol'), n = i.height(), maxHeight = 500;
        if (n > maxHeight) {
            i.height(maxHeight);
            var btn = "展开全部";
            if (typeof i18nUtils !== "undefined") {
                btn = i18nUtils.prop("book_expend")
            }
            i.after('<a class="lbxxyx_s fs16">' + btn + ' ...</a>');
            $(".lbxxyx_s").click(function () {
                $(".det-con-ol").animate({height: n}, "slow");
                $(this).hide();
            })
        }
        var isDesc = 1;
        $("#reverse").on("click", function () {
            var ol = $("#volumes");
            var list = ol.children();
            ol.empty();
            $(this).text(isDesc ? "⇈" : "⇊");
            for (var i = list.length - 1; i >= 0; i--) {
                var copy = list.eq(i).clone();
                ol.append(copy)
            }
            isDesc ^= 1
        });
    },
    updateBookOpt: function () {
        var that = this;
        var d = $("#artWrap");
        if (d.length > 0) {
            var bid = d.data("bid");
            var bName = d.data("bname");
            var burl = d.data("burl");
            var site = d.data("site");
            $.post("/CsAjax.do?method=updateBookOpt", {
                "book_id": bid,
                "book_name": bName,
                "info_source": site,
                "customer_url": burl
            }, function (data) {
                var key = that.params.key_bookshelf;
                var m = that.getArrayDataFromStorage(key);
                for (var i = 0, n = m.length; i < n; i++) {
                    if (m[i].bid == bid) {
                        var href = "";
                        if (m[i].cid != "" && m[i].bUrl != "") {
                            var href = "/read/" + m[i].bUrl + "/" + m[i].cid + ".html";
                        }
                        that.checkIsInBookshelf(true, href);
                        break
                    }
                }
            })
        }
    },
    initCheckBookStatus: function () {
        var a = this;
        $("#btnAddToBookshelf").on("click", function () {
            var b = $(this);
            if (1 === b.data("bookshelf-status")) {
                a.tip(i18nUtils.prop("book_exist_in_bookshelf"))
                return false
            }
            a.addBookToStorageForBookShelf();
            a.checkIsInBookshelf(true)
            a.tip(i18nUtils.prop("book_bookshelf_add_success"))
        })
        $("#asideOverlay").click(function () {
            $("#asideChapter").removeClass("active");
            $("html").removeClass("noscroll");
        });
    },
    formatDate: function (c, a) {
        c instanceof Date || (c = new Date(c)), a = a || "YYYY-MM-DD HH:mm:ss";
        var d = {
            "M+": c.getMonth() + 1,
            "D+": c.getDate(),
            "H+": c.getHours(),
            "h+": c.getHours() % 12 == 0 ? 12 : c.getHours() % 12,
            "m+": c.getMinutes(),
            "s+": c.getSeconds(),
            "q+": Math.floor((c.getMonth() + 3) / 3),
            S: c.getMilliseconds()
        };
        /(Y+)/.test(a) && (a = a.replace(RegExp.$1, (c.getFullYear() + "").substr(4 - RegExp.$1.length))), /(dd+)/.test(a) && (a = a.replace(RegExp.$1, "日一二三四五六七".split("")[c.getDay()]));
        for (var b in d) {
            new RegExp("(" + b + ")").test(a) && (a = a.replace(RegExp.$1, 1 === RegExp.$1.length ? d[b] : ("00" + d[b]).substr(("" + d[b]).length)))
        }
        return a
    },
    toNow: function (a) {
        var c = new Date(a).getTime();
        if (isNaN(c)) {
            return a
        }
        var b = (new Date).getTime() - c;
        return b > 31536000000 ? i18nUtils.prop("book_bookshelf_year_before") : b > 2592000000 ? Math.floor(b / 2592000000) + i18nUtils.prop("book_bookshelf_month_before") : b > 86400000 ? Math.floor(b / 86400000) + i18nUtils.prop("book_bookshelf_day_before") : b > 3600000 ? Math.floor(b / 3600000) + i18nUtils.prop("book_bookshelf_hour_before") : b > 60000 ? Math.floor(b / 60000) + i18nUtils.prop("book_bookshelf_minute_before") : b > 0 ? i18nUtils.prop("book_bookshelf_just_now") : this.formatDate(a)
    },
    sendError: function () {
        var content = '<textarea style="border: 1px solid #ccc;width: 100%; height: 100px;line-height: 20px;" id="error_msg" class="layui-layer-input" placeholder="' + i18nUtils.prop("book_feedback_content") + '"></textarea>';
        layer.open({
            content: content
            , btn: [i18nUtils.prop("book_btn_cancel"), i18nUtils.prop("book_feedback_btn_submit")]
            , skin: 'footer'
            , no: function (index) {
                console.log("index:" + index);
                var text = $("#error_msg").val();
                if (text) {
                    text = text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
                    if (text == "") {
                        layer.open({content: i18nUtils.prop("book_feedback_content"), skin: 'msg', time: 2});
                        layer.msg();
                        return false;
                    }
                    if (text.length > 200) {
                        layer.open({content: i18nUtils.prop("book_feedback_content_limit"), skin: 'msg', time: 2});
                        return false;
                    }
                    layer.close(index);
                    var curUrl = window.location.href;
                    //console.log(curUrl);
                    $.post("/CsAjax.do?method=sendError", {
                        "url": curUrl, "error_msg": text
                    }, function (c) {
                        $("#sendError").hide();
                        if (c.code == "1") {
                            layer.open({
                                content: i18nUtils.prop("book_feedback_content_result"),
                                btn: "Ok"
                            });
                        } else {
                            layer.open({content: c.msg, skin: 'msg', time: 2});
                        }
                    });
                } else {
                    layer.open({content: i18nUtils.prop("book_feedback_content"), skin: 'msg', time: 2});
                    return false;
                }

            }
        });
    },
    initBookShelfHeader: function (a) {
        var b = this;
        $(".btn-tab").on("click", function () {
            var c = $(this), d = c.data("type");
            $(".btn-tab").removeClass("_on");
            c.addClass("_on");
            b.loadHisotryOrBookShelf(d)
        });
        if (a !== "") {
            $(".btn-tab").removeClass("_on");
            $("#tab_" + a).addClass("_on")
        }
    },
    loadHisotryOrBookShelf: function (e) {
        var d = this;
        var c = this.params.key_bookshelf;
        if (e === "recent") {
            c = this.params.key_recently_read;
        }
        var a = this.getBooksFromStroage(c), b = this.render("tpl-history-read.html", {data: a});
        $("#bookEditOl").html(b);
        d.showHistory(a);

        d.imgLazyload();
    },
    imgLazyload: function () {
        $("img.lazy").lazyload({
            threshold: 200,
            effect: "fadeIn"
        });
    },
    showHistory: function () {
        var a = this.getBooksFromStroage(this.params.key_recently_read);
        if (a.length > 0) {
            var hot = $("#hot");
            var recently_read = $("#recently-read");
            var htmlRectPc = "";
            var htmlRectMobile = "";
            htmlRectPc += '<div class="g_wrap j_you_also_like_title"> <h2 class="g_h2 pb20">' + i18nUtils.prop("book_recently_read") + '</h2> </div>';
            htmlRectPc += '<ul class="g_row hom-books boo-pop">';
            var cdn = "";
            if (typeof ctx_cdn !== "undefined") {
                cdn = ctx_cdn;
            }
            a.map(function (f, index) {
                var burl = "/book/" + f.bUrl + ".html";
                var bImg = cdn + "/files/book/cover/" + f.bid + "/cover.jpg";
                if (index < 12) {
                    htmlRectMobile += '<li class="module-slide-li"><a href="' + burl + '" class="module-slide-a"><img src="' + bImg + '" class="module-slide-img" onerror="this.src=\'/styles/index/images/noimage.jpg\'"/> <figcaption class="module-slide-caption">' + f.bName + '</figcaption> <p class="module-slide-author" role="option"></p> </a></li>';
                    htmlRectPc += '<li class="g_col_2 g_ipad"> <div class="g_book"><a href="' + burl + '"><i class="g_thumb hom-thumb"><img class="lazy" data-original="' + bImg + '" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" width="140" height="186" style="display: block;"></i> <h3 class="g_h4">' + f.bName + '</h3></a><span class="_type">' + f.aName + '</span></div> </li>'
                }
            });
            recently_read.show().find("#ol").empty().html(htmlRectMobile);
            htmlRectPc += '</ul>';
            hot.after(htmlRectPc);
        }
    },
    removeMyfavHander: function (id) {
        var a = this;
        $("#myfav_" + id).remove();
        if ($("li", "#bookEditOl").size() == 0) {
            $("#bookEditOl").html('<div class="null">' + i18nUtils.prop("book_bookshelf_is_empty") + '</div>');
        }
        var f = a.getArrayDataFromStorage(a.params.key_bookshelf);
        for (var e = 0, h = f.length; e < h; e++) {
            if ((f[e].bid) == id) {
                f.splice(e, 1);
                break
            }
        }
        a.setStorage(a.params.key_bookshelf, f)
    },
    removeMyfav: function (id) {
        var a = this;
        layer.open({
            content: i18nUtils.prop("delete_tip"), btn: [i18nUtils.prop("book_btn_delete"), i18nUtils.prop("book_btn_cancel")],
            yes: function (c) {
                a.removeMyfavHander(id);
                layer.close(c)
            }
        });
    },
    getChapter: function (id) {
        var url_tmp = "/CsAjax.do?method=getChapter"
        var data_type = "text";
        var type = "POST";
        if (typeof cdn_api != "undefined" && cdn_api !== "") {
            url_tmp = cdn_api + url_tmp;
            data_type = "jsonp";
            type = "GET";
        }
        var d = $("#artWrap");
        var cid = d.data("ecid");
        $.ajax({
            type: type,
            data: "chapter_id=" + cid,
            dataType: data_type,
            url: url_tmp,
            success: function (a) {
                if (data_type === "jsonp") {
                    $("#artWrap").html(a.data);
                } else {
                    $("#artWrap").html(a);
                }
                AudioUtils.initPlayBar("artWrap");
            },
            error: function () {
                var a = "<p style='text-align:center;' onclick='BookUtils.getChapter()'>" + i18nUtils.prop("book_load_failed") + "</p>";
                $("#artWrap").html(a)
            }
        })
    },
    showCatalogs: function (url1, url2, id) {
        var that = this;
        layer.open({type: 2});
        if (!that.params.catalog_cache) {
            that.cachedScript(url1).done(function (script, textStatus1) {
                console.log("textStatus1:", textStatus1);
                that.cachedScript(url2).done(function () {
                    that.showCatalogCallback(id)
                    that.params.catalog_cache = true;
                    var isDesc = 1;
                    $("#reverse").on("click", function () {
                        var ol = $("#volumes");
                        var list = ol.children();
                        ol.empty();
                        $(this).text(isDesc ? "⇈" : "⇊");
                        for (var i = list.length - 1; i >= 0; i--) {
                            var copy = list.eq(i).clone();
                            ol.append(copy)
                        }
                        isDesc ^= 1
                    });
                })
            }).fail(function (jqxhr, settings, exception) {
                layer.open({content: 'load error1.', skin: 'msg', time: 2});
                layer.closeAll()
            });
        } else {
            that.showCatalogCallback(id)
        }
    },
    showCatalogCallback: function (id) {
        $("#asideChapter").addClass("active");
        $("html").addClass("noscroll");
        if (id) {
            var chapterTmp = $("#c" + id);
            var catelogX = $("#catelogX");
            chapterTmp.find("span").addClass("red");
            setTimeout(function () {
                var top = chapterTmp.position().top;
                var height = $(window).height();
                console.log("==scrollTop==to==height{}, ", height)
                console.log("==scrollTop==to==top:{}", top)
                if (top > height) {
                    console.log("==scrollTop==to==t", top - (height / 2))
                    catelogX.scrollTop(top - (height / 2));
                    // document.getElementsByClassName("layui-layer-content").scrollTo({
                    //     top: t-180
                    // });
                }
            }, 300);
        }
        layer.closeAll()
    },
    cachedScript: function (url, options) {
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return jQuery.ajax(options);
    },
    initListBooks: function () {
        var b = $("#books"), a = this;
        a.params.list_order_type = 1;
        a.params.list_clsid = b.data("clsid");
        a.params.list_parid = b.data("parid");
        a.params.list_parid = b.data("parid");
        a.params.list_authorid = b.data("authorid");
        a.params.list_keyword = b.data("keyword");

        $("#loadMore").on("click", function () {
            a.loadListBooks()
        });
        a.loadListBooks()
    },
    loadListBooks: function (h) {
        var b = this, g = $("#books"), f = $("#loadMore"), a = $("#loadFinished");
        var e = {
            type: g.data("type"),
            page_num: g.data("pagenum"),
            cls_id: b.params.list_clsid,
            par_id: b.params.list_parid,
            author_id: b.params.list_authorid,
            order_type: b.params.list_order_type,
            keyword: b.params.list_keyword
        };
        console.log(e);
        b.loading();
        a.hide();
        $.post("/CsAjax.do?method=getBookListCommon", e, function (i) {
            b.close();
            if (i.code == 1) {
                var j = b.render("tpl-init-list.html", {data: i});
                if (e.page_num == 0) {
                    g.empty()
                }
                g.append(j);
                b.imgLazyload();
                var k = e.page_num + 1;
                g.data("pagenum", k);
                if (i.pageNum > 1) {
                    f.show()
                }
                if (k >= i.pageNum) {
                    f.hide();
                    a.show()
                }
                if (i.recordCount <= 0) {
                    a.hide()
                }
            } else {
                b.tip(i.msg)
            }
        })
    },
    initTopBooks: function () {
        var that = this;
        var urlAjax = "/CsAjax.do?method=getRanking";
        var $topWarp = $('#top-warp');
        var type = $topWarp.data('type');
        if (type) {
            $.post(urlAjax, {"type": type}, function (ret) {
                if (ret.code == "0") {
                    that.tip(ret.msg);
                    return false;
                }
                var html = that.render("tpl-top-list.html", {data: ret});
                $topWarp.html(html);
                that.imgLazyload();
            });
        }
    },
};

/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
(function ($, window, document, undefined) {
    var $window = $(window);
    $.fn.lazyload = function (options) {
        var elements = this;
        var $container;
        var settings = {threshold: 0, failure_limit: 0, event: "scroll", effect: "show", container: window, data_attribute: "original", skip_invisible: false, appear: null, load: null, placeholder: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="};

        function update() {
            var counter = 0;
            elements.each(function () {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return
                }
                if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {
                } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    counter = 0
                } else {
                    if (++counter > settings.failure_limit) {
                        return false
                    }
                }
            })
        }

        if (options) {
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed
            }
            $.extend(settings, options)
        }
        $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function () {
                return update()
            })
        }
        this.each(function () {
            var self = this;
            var $self = $(self);
            self.loaded = false;
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder)
                }
            }
            $self.one("appear", function () {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings)
                    }
                    $("<img />").bind("load", function () {
                        var original = $self.attr("data-" + settings.data_attribute);
                        $self.hide();
                        if ($self.is("img")) {
                            $self.attr("src", original)
                        } else {
                            $self.css("background-image", "url('" + original + "')")
                        }
                        $self[settings.effect](settings.effect_speed);
                        self.loaded = true;
                        var temp = $.grep(elements, function (element) {
                            return !element.loaded
                        });
                        elements = $(temp);
                        if (settings.load) {
                            var elements_left = elements.length;
                            settings.load.call(self, elements_left, settings)
                        }
                    }).attr("src", $self.attr("data-" + settings.data_attribute))
                }
            });
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function () {
                    if (!self.loaded) {
                        $self.trigger("appear")
                    }
                })
            }
        });
        $window.bind("resize", function () {
            update()
        });
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function (event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function () {
                        $(this).trigger("appear")
                    })
                }
            })
        }
        $(document).ready(function () {
            update()
        });
        return this
    };
    $.belowthefold = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop()
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height()
        }
        return fold <= $(element).offset().top - settings.threshold
    };
    $.rightoffold = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft()
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width()
        }
        return fold <= $(element).offset().left - settings.threshold
    };
    $.abovethetop = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop()
        } else {
            fold = $(settings.container).offset().top
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height()
    };
    $.leftofbegin = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft()
        } else {
            fold = $(settings.container).offset().left
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width()
    };
    $.inviewport = function (element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings)
    };
    $.extend($.expr[":"], {
        "below-the-fold": function (a) {
            return $.belowthefold(a, {threshold: 0})
        }, "above-the-top": function (a) {
            return !$.belowthefold(a, {threshold: 0})
        }, "right-of-screen": function (a) {
            return $.rightoffold(a, {threshold: 0})
        }, "left-of-screen": function (a) {
            return !$.rightoffold(a, {threshold: 0})
        }, "in-viewport": function (a) {
            return $.inviewport(a, {threshold: 0})
        }, "above-the-fold": function (a) {
            return !$.belowthefold(a, {threshold: 0})
        }, "right-of-fold": function (a) {
            return $.rightoffold(a, {threshold: 0})
        }, "left-of-fold": function (a) {
            return !$.rightoffold(a, {threshold: 0})
        }
    })
})(jQuery, window, document);


if (typeof jQuery !== 'undefined') {
    $(document).ready(function () {
        var selectLanguage = '<select name="language" id="language"> <option value="">Language</option> <option value="zh">中文</option> <option value="en">English</option> </select>';
        $(".h_top_txt").find("ul").append("<li>" + selectLanguage + "</li>")
        $(".footer-copy").append("&nbsp;" + selectLanguage);
        var $language = $("#language");
        $language.change(function () {
            var lang = $(this).val();
            if (lang !== "") {
                window.localStorage.setItem('cookie_lang', lang);
                $.post("/CsAjax.do?method=setcookie", {"key": "cookie_lang", "value": lang}, function (c) {
                    window.location.reload();
                });
            }
        });

        var cookie_lang = window.localStorage.getItem("cookie_lang");
        if (cookie_lang) {
            $language.val(cookie_lang);
        } else {
            try {
                var lang = navigator.language || navigator.userLanguage;
                $language.val(lang.substr(0, 2));
            } catch (e) {

            }
        }
    });
}

function isMobile() {
    return ua().match(/iphone|ipad|ipod|android|blackberry|iemobile|wpdesktop/i)
}

function ua() {
    return navigator.userAgent.toLowerCase()
}

function isWechat() {
    return /micromessenger/i.test(ua())
}

function isBot() {
    return /baiduspider|googlebot|bingbot|web-crawler|grapeshotcrawler|liebaofast|adsbot/i.test(ua())
}

function gEnabledAds(url) {
    if (typeof filterUrls != "undefined") {
        for (var i = 0, len = filterUrls.length; i < len; i++) {
            console.log(filterUrls[i]);
            if (url.indexOf(filterUrls[i]) !== -1) {
                return false;
            }
        }
    }
    return true;
}

function siteEnabledG(url) {
    if (typeof siteGUrls != "undefined") {
        for (var i = 0, len = siteGUrls.length; i < len; i++) {
            console.log(siteGUrls[i]);
            if (url.indexOf(siteGUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function siteEnabledB(url) {
    if (typeof siteBUrls != "undefined") {
        for (var i = 0, len = siteBUrls.length; i < len; i++) {
            console.log(siteBUrls[i]);
            if (url.indexOf(siteBUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function siteEnabledE(url) {
    if (typeof siteEUrls != "undefined") {
        for (var i = 0, len = siteEUrls.length; i < len; i++) {
            console.log(siteEUrls[i]);
            if (url.indexOf(siteEUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function siteEnabled2898(url) {
    if (typeof site2898Urls != "undefined") {
        for (var i = 0, len = site2898Urls.length; i < len; i++) {
            console.log(site2898Urls[i]);
            if (url.indexOf(site2898Urls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function loadGoogleAds() {
    if (g_enabled_ads) {
        document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
        document.write('<ins class="adsbygoogle" style="display:block" data-ad-client="' + g_data_ad_client + '" data-ad-slot="' + g_data_ad_slot_auto + '" data-ad-format="auto" data-full-width-responsive="true"></ins>');
        document.write('<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');
    }
}

function loadGoogleAds468() {
    if (g_enabled_ads) {
        document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
        document.write('<ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="' + g_data_ad_client + '" data-ad-slot="' + g_data_ad_slot_468 + '"></ins>');
        document.write('<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');
    }
}

function loadGoogleAdsRecommend() {
    if (g_enabled_ads) {
        document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
        document.write('<ins class="adsbygoogle" style="display:block" data-ad-format="autorelaxed" data-ad-client="' + g_data_ad_client + '" data-ad-slot="' + g_data_ad_slot_recommend + '"></ins>');
        document.write('<script> (adsbygoogle = window.adsbygoogle || []).push({});</script>');
    }
}

function loadBaiduAds(loc) {
    var tmpId = b_data_ad_mobile;
    if ((loc === "cms_left_bottom" && !isMobile()) || loc === "pc_left_bottom") {
        tmpId = b_data_ad_336;
    }
    if (loc === "cms_right_bottom") {
        tmpId = b_data_ad_336_xuanting;
    }
    if (loc === "pc_bottom") {
        tmpId = b_data_ad_1024;
    }
    if (loc === "pc_right_top") {
        tmpId = b_data_ad_250;
    }

    (function () {
        var s = "_" + Math.random().toString(36).slice(2);
        document.write('<div style="" id="' + s + '"></div>');
        (window.slotbydup = window.slotbydup || []).push({
            id: tmpId,
            container: s
        });
    })();
    document.write('<script type="text/javascript" src="//cpro.baidustatic.com/cpro/ui/c.js" async="async" defer="defer" ></script>');
}

function load2898Ads(loc) {
    if (loc === "pc_right_top" && typeof ad_250_2898_url != "undefined") {
        document.write('<div><a href="' + ad_250_2898_url + '" target="_blank"><img style="width: 250px;height: 250px;" src="' + ad_250_2898_img + '"/></a></div>');
    }
}

function getHostName(url) {
    var match = url.match(/:\/\/?(.[^/:]+)/i);
    if (match != null && match.length > 1 && typeof match[1] === 'string' && match[1].length > 0) {
        return match[1];
    } else {
        return null;
    }
}

function goNewDomain() {
    if (typeof app_domain != "undefined" && typeof site_id != "undefined" && typeof cur_location_url != "undefined") {
        if (!isLocal(cur_location_url)) {
            var cur_host = getHostName(cur_location_url);
            if (cur_host && (cur_host !== app_domain)) {
                location.href = cur_location_url.replace(cur_host, app_domain);
            }
        }
    }
}

function isLocal(url) {
    return url.indexOf("localhost") !== -1 || url.indexOf("192.168.") !== -1;

}

function validateSite() {
    try {
        if (self !== top) {
            top.location = self.location;
        }
    } catch (e) {
        console.log(e)
    }
}

validateSite();
cur_location_url = window.location.href;
goNewDomain();
g_enabled_ads = gEnabledAds(cur_location_url);
console.log("g_enabled_ads:" + g_enabled_ads);
site_enabled_g = siteEnabledG(cur_location_url);
console.log("site_enabled_g:" + site_enabled_g);
site_enabled_b = siteEnabledB(cur_location_url);
console.log("site_enabled_b:" + site_enabled_b);
site_enabled_e = siteEnabledE(cur_location_url);
console.log("site_enabled_e:" + site_enabled_e);
site_enabled_2898 = siteEnabled2898(cur_location_url);

site_enabled_other = siteEnabledOther(cur_location_url);
console.log("site_enabled_other:" + site_enabled_other);
site_enabled_alimama = siteEnabledAlimama(cur_location_url);

function siteEnabledOther(url) {
    if (typeof siteOtherUrls != "undefined") {
        for (var i = 0, len = siteOtherUrls.length; i < len; i++) {
            console.log(siteOtherUrls[i]);
            if (url.indexOf(siteOtherUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function siteEnabledAlimama(url) {
    if (typeof siteAlimamaUrls != "undefined") {
        for (var i = 0, len = siteAlimamaUrls.length; i < len; i++) {
            console.log(siteAlimamaUrls[i]);
            if (url.indexOf(siteAlimamaUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function loadThirdAds(loc) {
    if (isMobile() && !isWechat()) {
        var opacity = "";
        if (typeof third_opacity_css != "undefined") {
            opacity = third_opacity_css;
        }
        document.writeln('<div style="' + opacity + '">');
        document.writeln('<script src="https://m.tg.meihaoxiangwang.com/hm/cdn/static/jq_774276.js"></script>');
        document.writeln('</div>');

        document.writeln('<div>');
        document.writeln('<scri' + 'pt src="//spl.ztvx8.com/wlzys5.js"> </scri' + 'pt>');
        document.writeln('</div>');
    }

}

