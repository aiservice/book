if (typeof BookUtils == "undefined") {
    BookUtils = {}
}
BookUtils = {
    init: function () {
        this.initHeader();
        this.initFooter()
    },
    initHeader: function () {
        var g, f = this, h = $(".jsBack").on("click", function (a) {
            /^javas/.test(this.href) && (a.preventDefault(), history.go(-1))
        });
        $("#openSearchPopup").on("click", function (e) {
            e.preventDefault();
            var a = $(this).data("keyword") || "";
            $("#searchPopup").removeAttr("hidden"), $("#keyword").attr("placeholder", a).focus(), g || (g = !0, f.initSearch())
        });
        var c = $("#guideOverlay").on("click", function () {
            $("#openGuide").trigger("click")
        }).attr("role", "button");
        $("#openGuide").toggle(function () {
            $("#header").attr("open", "");
            $("#guide").addClass("active");
            $(this).addClass("active").attr("aria-expanded", "true")
        }, function () {
            $("#header").removeAttr("open");
            $("#guide").removeClass("active");
            $(this).removeClass("active").attr("aria-expanded", "false")
        });
        var d = $("#guide").on("touchmove", function (a) {
            a.preventDefault()
        });
        d.length && (window.addEventListener("resize", function () {
            f.elBacktop && d.hasClass("active") && f.elBacktop.trigger("click")
        }), $("#header").on("touchmove", function (a) {
            d.hasClass("active") && a.preventDefault()
        }));
        var b = document.referrer;
        "string" == typeof b && "" === b && h.attr("href", "/")
    },
    initFooter: function () {
        var b = $(window), a = $(".jsBackToTop").on("click", function (d) {
            d.preventDefault();
            var f = b.scrollTop(), g = function () {
                (f *= 0.5) < 1 ? b.scrollTop(0) : (b.scrollTop(f), requestAnimationFrame(g))
            };
            g()
        });
        this.elBacktop = a;
        var c = $("#footerApp");
        b.on("scroll", function () {
            var e = b.scrollTop(), d = b.height();
            e > d && (!c.length || e + d - c.position().top <= 0) ? a.css({
                opacity: 1,
                visibility: "visible"
            }) : a.css({opacity: 0, visibility: "hidden"})
        })
    },
    initSearch: function () {
        $("#closeSearchPopup").on("click", function () {
            $("#searchPopup").attr("hidden", ""), $("body").removeClass("open")
        }), this.initSearchForm(), this.initSearchPopularWords(), this.initSearchHistory()
    },
    initSearchForm: function () {
        var f = $("#keyword"), g = $("#clearSearchKeyword"), a = $("#searchHotHistory"), d = $("#searchList"),
            c = f.val().trim(), b = this;
        f.on("input", function () {
            (c = $(this).val().trim()) ? (g.removeAttr("hidden")) : (g.attr("hidden", ""), a.removeAttr("hidden"), d.attr("hidden", ""))
        }), g.on("click", function () {
            f.val("").trigger("input").focus()
        }), c && (g.removeAttr("hidden"), a.attr("hidden", "")), $("#searchForm").on("submit", function () {
            if (f.val().trim() == "") {
                b.tip(i18nUtils.prop("book_search_keyword"));
                return false
            }
            b.addSearchKeyword(c)
        })
    },
    setCookie: function (name,value,seconds) {
        var exp = new Date();
        exp.setTime(exp.getTime() + seconds*1000);
        document.cookie = name + "=" + escape (value) + ";expires=" + exp.toUTCString()+";path=/";
    },
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
    initSearchPopularWords: function () {
    },
    initSearchHistory: function () {
        var c = this.getSearchKeywords(), b = this, d = this.render("tpl-search-history.html", {data: c}),
            a = $("#searchHistory").html(d);
        $("#clearSearchHistory").on("click", function () {
            b.clearSearchKeywords(), a.attr("hidden", "")
        })
    },
    getSearchKeywords: function () {
        var a = this.getStorage("SEARCH_HISTORY");
        return Array.isArray(a) ? a : []
    },
    clearSearchKeywords: function () {
        this.removeStorage("SEARCH_HISTORY")
    },
    addSearchKeyword: function (b) {
        if (b != "") {
            var c = this.getSearchKeywords(), a = c.indexOf(b);
            a > -1 && c.splice(a, 1), c.unshift(b), this.setStorage("SEARCH_HISTORY", c)
        }
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
    checkIsLogin: function (b) {
        var a = this;
        if (b) {
            a.params.is_login = true;
            $("#div_not_login").hide();
            $("#div_logout").show().click(function () {
                layer.open({
                    content: i18nUtils.prop("login_out_tip"), btn: [i18nUtils.prop("book_btn_ok"), i18nUtils.prop("book_btn_cancel")], yes: function (c) {
                        goUrl("/m/mlogin.html?method=logout")
                    }
                })
            })
        } else {
            $.post("/CsAjax.do?method=isLogin", {}, function (c) {
                if (c.ret == "1") {
                    a.params.is_login = true;
                    $("#div_not_login").hide();
                    $("#div_logout").show().click(function () {
                        layer.open({
                            content: i18nUtils.prop("login_out_tip"), btn: [i18nUtils.prop("book_btn_ok"), i18nUtils.prop("book_btn_cancel")], yes: function (c) {
                                goUrl( "/m/mlogin.html?method=logout")
                            }
                        })
                    })
                } else {
                    a.params.is_login = false;
                    $("#p_login").text(i18nUtils.prop("book_btn_login")).click(function () {
                        goUrl("/m/mlogin.html")
                    })
                }
                console.log(a.params.is_login)
            })
        }
    },
    comingSoon: function () {
        this.tip("coming soon...")
    },
    addTingShu: function () {
        // var customer_url = $("#customer_url").val();
        // if(customer_url){
        //     var audio_url = "/audio/"+customer_url+".html";
        //     var html4M="";
        //     var lang = i18nUtils.getDefaultLocale();
        //     if(lang == 'en'){
        //         html4M = "<div id='onlone_tingshu_m' class=\"letter-holder\" style='font-size: .8rem;cursor: pointer; float: right; background: #34bf1f; width: 70px; height: 25px; text-align: center; border-radius: 3px; color: #fff; padding: 2px 4px 0;margin-right: 5px; line-height: 1.8; -webkit-transform: rotate(18deg); transform: rotate(18deg); transition: transform 0.1s ease-in;'> <span><a href='"+audio_url+"'>LISTEN</a></span> </div>";
        //     } else{
        //         html4M = "<div id='onlone_tingshu_m' class=\"letter-holder\" style='font-size: .8rem;cursor: pointer; float: right; background: #34bf1f; width: 70px; height: 25px; text-align: center; border-radius: 3px; color: #fff; padding: 2px 4px 0; margin-right: 5px; line-height: 1.8; -webkit-transform: rotate(18deg); transform: rotate(18deg); transition: transform 0.1s ease-in;'> <span><a href='"+audio_url+"'>在线听书</a></span> </div>";
        //     }
        //     $(".ting_tip").prepend(html4M);
        // }
        // var tip1 = i18nUtils.prop("book_listen_tip1"),tip2=i18nUtils.prop("book_listen_tip2"),tip3=i18nUtils.prop("book_listen_tip3");
        // $("#onlone_tingshu_m").click(function(){
        //     layer.open({
        //         title: [tip1],
        //         content: tip2+"<br/>"+tip3
        //         ,btn: 'Ok'
        //     });
        // });
    },
    params: {
        pageNum: 1,
        list_order_type: 1,
        list_clsid: 1000,
        list_parid: 1001,
        list_authorid: "",
        bids: [],
        is_login: false,
        key_bookshelf: "BOOK_SHELF",
        key_recently_read: "RECENTLY_READ",
        bookshelf_type: "",
        is_append: true
    },
    listTotalNum: 0,
    editButtonHandler: function () {
        var b = this;
        var a = $("#bookEditOl");
        $("#bookEditBtn").on("click", function () {
            b.params.bids = [], $("#header").attr("hidden", ""), $("#editHeader").removeAttr("hidden"), $("#editBtnHeader").attr("hidden", ""), a.hasClass("enabled") ? (a.removeClass("enabled"), $("#bookEditOl .book-li.checked").removeClass("checked"), a.find('a[role="checkbox"]').attr("aria-checked", "false")) : a.addClass("enabled")
        }), a.on("click", "li", function () {
            var e = this;
            if (a.hasClass("enabled")) {
                var c = $(e).data("book-id");
                $(e).toggleClass("checked");
                var d = a.find("li.checked").length;
                $(e).find('a[role="checkbox"]').attr("aria-checked", $(e).hasClass("checked"));
                if (d == 0) {
                    $(".selected-count").html("");
                    $("#bookEditPopup").removeClass("active");
                    b.params.bids = []
                } else {
                    $(e).hasClass("checked") ? b.params.bids.push(c) : b.params.bids.splice(b.params.bids.indexOf(c), 1);
                    $(".selected-count").html("(" + d + ")");
                    if (!$("#bookEditPopup").hasClass("active")) {
                        $("#bookEditPopup").addClass("active")
                    }
                }
            }
        }), a.on("click", "a", function (c) {
            a.hasClass("enabled") && c.preventDefault()
        })
    },
    initMultiSelect: function () {
        var f = this, a = $("#editBtnHeader"), i = $("#bookEditOl"), b = $("#header"), d = $("#editHeader"),
            a = $("#editBtnHeader");
        $(window).trigger("scroll"), $("#btnEditCancel").on("click", function () {
            i.removeClass("enabled"), b.removeAttr("hidden"), d.attr("hidden", ""), a.removeAttr("hidden"), i.find("li.checked").removeClass("checked"), i.find('a[role="checkbox"]').attr("aria-checked", "false"), $("#bookEditPopup").removeClass("active")
        }), $("#btnEditAll").on("click", function () {
            i.find("li").not(".checked").trigger("click")
        })
    },
    bookDeleteHandlerCallback: function () {
        var i = this, j = $("#bookEditOl"), a = $("#bookEditBtn"), d = $("#header"), f = $("#editHeader"),
            b = $("#editBtnHeader");
        $("#bookEditOl li.checked").remove();
        j.removeClass("enabled");
        a.html(i18nUtils.prop("book_btn_edit")), i.listTotalNum = i.listTotalNum - i.params.bids.length;
        if (i.listTotalNum <= 0) {
            $("#bookEditOl").html('<div class="null">'+i18nUtils.prop("book_bookshelf_is_empty")+'</div>');
            $("#book-li-more").remove()
        }
        $(".group-cnt").text(i.listTotalNum);
        f.find("h3").text(i18nUtils.prop("book_bookshelf_total") + i.listTotalNum + i18nUtils.prop("book_bookshelf_total_suf"));
        d.removeAttr("hidden");
        f.attr("hidden", "");
        b.removeAttr("hidden");
        $("#bookEditPopup").removeClass("active");
        i.params.bids = [], j.addClass("enabled")
    },
    bookDeleteHandler: function () {
        var a = this;
        $("#bookDelBtn").on("click", function () {
            layer.open({
                content: i18nUtils.prop("delete_tip"), btn: [i18nUtils.prop("book_btn_delete"), i18nUtils.prop("book_btn_cancel")], yes: function (c) {
                    var b = a.params.bids, g = $.extend({}, a.params);
                    g.bids = b.toString();
                    if (a.params.is_login) {
                        $.post("/CsAjax.do?method=removeMyFavForM", {bids: g.bids}, function (d) {
                            a.tip(d.msg);
                            if (d.code == 1) {
                                a.bookDeleteHandlerCallback()
                            }
                        })
                    } else {
                        a.bookDeleteHandlerCallback();
                    }
                    var f = a.getArrayDataFromStorage(a.params.key_bookshelf);
                    for (var e = 0, h = f.length; e < h; e++) {
                        if (g.bids.indexOf(f[e].bid) != -1) {
                            f.splice(e, 1);
                            break
                        }
                    }
                    a.setStorage(a.params.key_bookshelf, f)
                    layer.close(c)
                }
            })
        })
    },
    initForBookView: function () {
        //this.goShiTou();
        this.addTingShu();
        this.initSummary();
        var that = this;
        that.initCheckBookStatus();
        that.showHistory();
        setTimeout(function(){
            that.checkIsLogin();
            that.updateBookTop();
            that.updateBookViewCount();
        },2000);
    },
    initBookShelf: function (a) {
        this.editButtonHandler();
        this.initMultiSelect();
        this.bookDeleteHandler();
        this.initBookShelfHeader(a);
        this.loadHisotryOrBookShelf(a);
        this.initSortForBookshelf()
    },
    initBookShelfHeader: function (a) {
        var b = this;
        $(".btn-tab").on("click", function () {
            var c = $(this), d = c.data("type");
            $(".btn-tab").removeClass("active");
            c.addClass("active");
            b.loadHisotryOrBookShelf(d)
        });
        if (a != "") {
            $(".btn-tab").removeClass("active");
            $("#tab_" + a).addClass("active")
        }
    },
    showHistory: function () {
        var a = this.getBooksFromStroage(this.params.key_recently_read)
        if(a.length > 0){
                var recently_read = $("#recently-read");
                var htmlRectMobile = "";
                var cdn = "";
                if (typeof ctx_cdn !== "undefined") {
                    cdn = ctx_cdn;
                }
                a.map(function (f) {
                    var burl = "/book/"+f.bUrl+".html";
                    var bImg = cdn+"/files/book/cover/"+f.bid+"/cover_120.jpg";
                    htmlRectMobile +='<li class="module-slide-li"><a href="/m'+burl+'" class="module-slide-a"><img src="'+bImg+'" onerror="this.src=\'/styles/index/images/noimage.jpg\'" class="module-slide-img"/> <figcaption class="module-slide-caption">'+f.bName+'</figcaption> <p class="module-slide-author" role="option"></p> </a></li>';
                });
                console.log(htmlRectMobile)
                recently_read.show().find("ol").empty().html(htmlRectMobile);
         }
    },
    loadHisotryOrBookShelf: function (e) {
        var d = this;
        var c = this.params.key_bookshelf;
        if (e == "recent") {
            c = this.params.key_recently_read;
            $("#editBtnHeader").hide()
        } else {
            $("#editBtnHeader").show()
        }
        this.params.bookshelf_type = e;
        console.log(d.params.is_login);
        if (this.params.is_login && c == this.params.key_bookshelf) {
            d.loading();
            $.post("/CsAjax.do?method=getBookshelfListCommon", {}, function (g) {
                d.close();
                if (g.code == 1) {
                    var f = g.datas;
                    var i = f.map(function (j) {
                        j.datetime = -1 === j.time ? "2015-01-11" : d.formatDate(j.time, "YYYY-MM-DD");
                        j.time = -1 === j.time ? "01.11" : d.toNow(j.time);
                        return j
                    });
                    var h = d.render("tpl-bookshelf.html", {data: i});
                    $("#bookEditOl").html(h);
                    d.listTotalNum = f.length;
                    $(".group-cnt").text(d.listTotalNum);
                    $("#editHeader").find("h3").text(i18nUtils.prop("book_bookshelf_total") + d.listTotalNum + i18nUtils.prop("book_bookshelf_total_suf"))
                }
            })
        } else {
            var a = this.getBooksFromStroage(c), b = this.render("tpl-history-read.html", {data: a});
            $("#bookEditOl").html(b);
            this.listTotalNum = a.length;
            $(".group-cnt").text(this.listTotalNum);
            $("#editHeader").find("h3").text(i18nUtils.prop("book_bookshelf_total") + d.listTotalNum + i18nUtils.prop("book_bookshelf_total_suf"))
        }
    },
    getArrayDataFromStorage: function (a) {
        var b = this.getStorage(a);
        return Array.isArray(b) ? b : []
    },
    addBookToStorage: function (a, b) {
        var d = $("#bookDetailWrapper");
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
            if (this.params.is_login && this.params.key_bookshelf == a) {
                $.post("/CsAjax.do?method=updateMyFav", {
                    book_id: c.bid,
                    chapter_id: c.cid,
                    chapter_name: c.cName
                }, function (e) {
                })
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
            if (a[b].bid == c.bid) {
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
            if (a[b].bid == c.bid) {
                a.splice(b, 1);
                break
            }
        }
        var e = $.extend(f, {time: (new Date).getTime()});
        a.unshift(e);
        this.setStorage(d, a.slice(0, 20))
    },
    initSummary: function () {
        var d = $("#bookSummary"), b = d[0], g = d.find("content"), f = d.find("textarea").val(), c = g.html();
        b && b.scrollHeight > b.clientHeight && (d.addClass("enabled"), d.on("click", function () {
            this.style && this.style.height ? (g.html(c), d.removeAttr("open"), this.style.height = "") : (g.html(f), d.height("auto").attr("open", ""))
        }))
    },
    updateBookTop: function () {
        var book_id = $("#book_id").val();
        if(book_id){
            $.post("/CsAjax.do?method=updateBookTop", {
                "book_id": book_id,
                "book_name": $("#book_name").val(),
                "info_source": $("#info_source").val(),
                "customer_url": $("#customer_url").val()
            }, function (a) {
            })
        }
    },
    updateBookViewCount: function () {
        var that = this;
        var book_id = $("#book_id").val();
        if(book_id){
            $.post("/CsAjax.do?method=updateBookViewCount", {"book_id": book_id}, function (data) {
                if (data.datas) {
                    var bookshelf = eval(data.datas);
                    var isLogin = bookshelf.is_login;
                    if (bookshelf.is_in_bookshelf) {
                        var href = "";
                        if (bookshelf.chapter_id_read != -1) {
                            href = "/m/read/" + $("#customer_url").val() + "/" + bookshelf.chapter_id_read + ".html";
                        }
                        that.checkIsInBookshelf(true,href);
                    } else {
                        if (!isLogin) {
                            var key = that.params.key_bookshelf;
                            var bid = $("#book_id").val();
                            var m = that.getArrayDataFromStorage(key);
                            for (var i = 0, n = m.length; i < n; i++) {
                                if (m[i].bid == bid) {
                                    var href = "";
                                    if(m[i].cid != "" && m[i].bUrl != ""){
                                        href = "/m/read/" + m[i].bUrl + "/" + m[i].cid + ".html";
                                    }
                                    that.checkIsInBookshelf(true,href);
                                    break
                                }
                            }
                        }
                    }
                }
            })
        }
    },
    checkIsInBookshelf: function (a,href) {
        if (a) {
            if(href && href != ""){
                $("#btnReadBook").attr("href", href).html(i18nUtils.prop("book_bookshelf_continue_reading"));
            }
            $("#btnAddToBookshelf").data("bookshelf-status", 1).html(i18nUtils.prop("book_bookshelf_exists")).removeAttr("href")
        } else {
            $("#btnAddToBookshelf").data("bookshelf-status", 0)
        }
    },
    initCheckBookStatus: function () {
        var a = this;
        $("#btnAddToBookshelf").on("click", function () {
            var b = $(this);
            if (1 == b.data("bookshelf-status")) {
                a.tip(i18nUtils.prop("book_exist_in_bookshelf"));
                return false
            }
            a.addBookToStorageForBookShelf();
            if (a.params.is_login) {
                $.ajax({
                    type: "POST",
                    url: "/CsAjax.do?method=addMyFav",
                    data: {book_id: $("#book_id").val(), book_name: $("#book_name").val()},
                    success: function (c) {
                        a.tip(c.msg);
                        a.checkIsInBookshelf(true)
                    }
                })
            } else {
                a.tip(i18nUtils.prop("book_bookshelf_add_success"))
                a.checkIsInBookshelf(true);
            }
        })
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
    initListBooks: function () {
        var b = $("#orders"), a = this;
        a.params.list_order_type = 1;
        a.params.list_clsid = b.data("clsid");
        a.params.list_parid = b.data("parid");
        a.params.list_parid = b.data("parid");
        a.params.list_authorid = b.data("authorid");
        b.find("a").on("click", function () {
            var c = $(this), d = c.data("value");
            if (a.params.list_order_type != d) {
                a.params.list_order_type = d;
                b.find("a").removeClass("active");
                c.addClass("active");
                b.data("pagenum", 0);
                a.loadListBooks()
            }
        });
        $("#loadMore").on("click", function () {
            a.loadListBooks()
        });
        a.loadListBooks()
    },
    loadListBooks: function (h) {
        var b = this, g = $("#books"), c = $("#orders"), f = $("#loadMore"), a = $("#loadFinished"),
            d = $("#search-kw");
        var e = {
            type: c.data("type"),
            page_num: c.data("pagenum"),
            cls_id: b.params.list_clsid,
            par_id: b.params.list_parid,
            author_id: b.params.list_authorid,
            order_type: b.params.list_order_type,
            keyword: d.val()
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
                var k = e.page_num + 1;
                c.data("pagenum", k);
                if (i.pageNum > 1) {
                    f.show()
                }
                if (k >= i.pageNum) {
                    f.hide();
                    a.show()
                }
            }else {
                b.tip(i.msg)
            }
        })
    },
    initSortForMulu: function () {
        $("#reverse").on("click", function () {
            var b = $(this);
            var desc = i18nUtils.prop("book_list_desc_order");
            var asc = i18nUtils.prop("book_list_asc_order");
            b.html(desc === b.html() ? asc : desc);
            var a = desc === b.html() ? "asc" : "desc";
            tinysort("#volumes>li", {selector: "span", data: "num", order: a})
        });
        var url = window.location.toString();
        var id = url.split('#')[1];
        if (id) {
            var t = $('#' + id).offset().top;
            $(window).scrollTop(t);
        } else {
            this.foldChapters();
        }
        //this.goShiTou();
        this.initCheckBookStatus();
        this.addTingShu();
        var that = this;
        setTimeout(function(){
            that.checkIsLogin();
            that.updateBookTop();
            that.updateBookViewCount();
        },2000);
    },
    foldChapters: function () {
        var i =  $(".chapter-ol-catalog"),n = i.height(),maxHeight=500;
        i.data("oriheight", n)
        if(n > maxHeight){
            i.height(maxHeight).css({"overflow": "hidden"});
            var btn = "展开全部";
            if (typeof i18nUtils !== "undefined") {
                btn = i18nUtils.prop("book_expend")
            }
            var id = i.attr("id");
            if(id == "audios"){
                btn += " (共"+(i.find("li").size())+"章)";
            }
            i.after('<div class="book-more" style="color: #ed424b;font-size: 14px;z-index: 800; width: 100%; height: 30px; background: linear-gradient(-180deg,rgba(249, 249, 249,.8) 0,#fff 90%);padding-top: 25px;padding-bottom: 15px;text-align: center;cursor: pointer;"><span style="padding: 6px 15px 6px 15px; border: solid 1px #ed424b; border-radius: 20px;color: #ed424b;">'+btn+'</span></div>');
            if(id == "audios"){
              var last =  i.find("li").last();
              if(typeof last !== "undefined"){
                  $(".book-more").after("<ol id=\"last_chapter\" class=\"chapter-ol chapter-ol-catalog\">"+last.html()+"</ol>")
              }
              $("#last_chapter").click(function () {
                  i.height(i.data("oriheight"));
                  $(".book-more").hide();
                  $("#last_chapter").remove();
              })
            }
            $(".book-more").click(function () {
                i.height(i.data("oriheight"));
                $(this).hide();
                $("#last_chapter").remove();
            })

        }
    },
    initSortForBookshelf: function () {
        $("#timeOrder").on("click", function () {
            var b = $(this).find("li");
            var a = "desc" === b.data("order") ? "asc" : "desc";
            tinysort("#bookEditOl>li", {selector: "i", data: "num", order: a});
            b.data("order", a);
            $("#book-li-more").remove()
        })
    },
    getChapter: function () {
        var url_tmp = "/CsAjax.do?method=getChapter"
        var data_type = "text";
        var type = "POST";
        if (typeof cdn_api != "undefined"&&cdn_api !=="") {
            url_tmp = cdn_api+url_tmp;
            data_type = "jsonp";
            type = "GET";
        }
        $.ajax({
            type: type,
            data: "chapter_id=" + $("#chapter_id").val(),
            url: url_tmp,
            dataType: data_type,
            success: function (a) {
                if(data_type === "jsonp"){
                    $("#bookDetailWrapper").html(a.data);
                }else{
                    $("#bookDetailWrapper").html(a);
                }
                AudioUtils.initPlayBar("bookDetailWrapper");
            },
            error: function () {
                var a = "<p style='text-align:center;' onclick='BookUtils.getChapter()'>"+i18nUtils.prop("book_load_failed")+"</p>";
                $("#bookDetailWrapper").html(a)
            }
        })

    },
    sendError: function () {
        var content = '<textarea style="border: 1px solid #ccc;width: 100%; height: 100px;line-height: 20px;" id="error_msg" class="layui-layer-input" placeholder="'+i18nUtils.prop("book_feedback_content")+'"></textarea>';
        layer.open({
            content: content
            ,btn: [i18nUtils.prop("book_btn_cancel"), i18nUtils.prop("book_feedback_btn_submit")]
            ,skin: 'footer'
            ,no: function(index){
                console.log("index:"+index);
                var text = $("#error_msg").val();
                if (text) {
                    text = text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
                    if(text == ""){
                        layer.open({content: i18nUtils.prop("book_feedback_content"),skin: 'msg',time: 2});
                        layer.msg();
                        return false;
                    }
                    if(text.length > 200){
                        layer.open({content: i18nUtils.prop("book_feedback_content_limit"),skin: 'msg',time: 2});
                        return false;
                    }
                    layer.close(index);
                    var curUrl = window.location.href;
                    //console.log(curUrl);
                    $.post("/CsAjax.do?method=sendError", {
                        "url":curUrl, "error_msg":text
                    }, function(c) {
                        $("#sendError").hide();
                        if (c.code == "1") {
                            layer.open({
                                content:i18nUtils.prop("book_feedback_content_result"),
                                btn:"Ok"
                            });
                        } else {
                            layer.open({content: c.msg,skin: 'msg',time: 2});
                        }
                    });
                } else {
                    layer.open({content: i18nUtils.prop("book_feedback_content"),skin: 'msg',time: 2});
                    return false;
                }

            }
        });
    }
};
$(document).ready(function () {
    BookUtils.init()
});
function goUrl(a) {
    if (a) {
        location.href = a
    }
};

