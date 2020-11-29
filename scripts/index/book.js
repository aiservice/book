/*!
 * Powered by uglifiyJS v2.6.1, Build by http://jsmin.6tie.net
 * build time: Sat May 11 2019 14:03:36 GMT+0800 (China Standard Time)
*/
$.storage=function(e,t,r){var n=function(){try{return localStorage.setItem("storage",""),localStorage.removeItem("storage"),localStorage}catch(e){var t=document.cookie.split(";");return{length:function(){return t.length}(),key:function(e){var r=t[e].split("="),n=decodeURIComponent(r.shift());return n},getItem:function(e){return $.cookie(e)},setItem:function(e,t){$.cookie(e,t,{expires:r||31536e3})},removeItem:function(e){$.cookie(e,null)},clear:function(){$.cookie(null)}}}}(),o={},i=parseInt((new Date).getTime()/1e3);if(void 0===e){for(var l,u=0;u<n.length;u++)l=n.key(u),t=$.kv(l),t&&(o[l]=t);return o}if(null===e)n.clear();else{if(void 0===t)return(o=n.getItem(e))?(o=JSON.parse(o),o.expires&&i>o.expires?($.kv(e,null),!1):o=o.value):!1;null===t?n.removeItem(e):(o={time:i,expires:r?i+r:0,value:t},o=JSON.stringify(o),n.setItem(e,o))}};

if (typeof BookUtils === "undefined") {
    BookUtils = {}
}
BookUtils = {
    tip: function (a) {
        $.jBox.tip(a,"success")
    },
    loading: function (a) {
        $.jBox.tip("loading...","loading");
    },
    close: function (a) {
        $.jBox.closeTip();
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
        if(d.length > 0) {
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
            if(href && href != ""){
                $("#btnReadBook").attr("href", href).find("em").html(i18nUtils.prop("book_bookshelf_continue_reading"));
            }
            bf.data("bookshelf-status", 1).addClass("disabled");
            if(bf.find("em").length>0){
                bf.find("em").html(i18nUtils.prop("book_bookshelf_exists"))
            } else if(bf.find("i").length>0){
                bf.html(i18nUtils.prop("book_bookshelf_exists")+" <i></i>")
            }
        } else {
            bf.data("bookshelf-status", 0)
        }
    },
    initForBookView: function () {
        this.goShiTou();
        this.addTingShu();
        this.initDownload();
        var that = this;
        that.initCheckBookStatus();
        that.showHistory();
        setTimeout(function(){
            that.checkIsLogin();
            that.updateBookTop();
            that.updateBookViewCount();
        },2000);
    },
    goShiTou: function () {
        if (typeof cur_location_url != "undefined" && cur_location_url.indexOf("-mulu.html") !== -1) {
            var url_book = "/book/" + $("#customer_url").val() + ".html";
            var html_opt="<div class=\"book_func clearfix\" style=\"width: 100%;margin-top: 5px\"> <ul> <li><a href="+url_book+" style=\"height: 40px;line-height: 40px;\"> <em>"+i18nUtils.prop("book_read_cover")+"</em></a></li> <li><a id=\"btnAddToBookshelf\" style=\"height: 40px;line-height: 40px;\"> <em>"+i18nUtils.prop("book_read_bookshelf")+"</em></a></li> <li id=\"freeDownload\"> <a href=\"javascript:;\" class=\"btn_down_book cur\" style=\"height: 40px;line-height: 40px;\"> <em>"+i18nUtils.prop("book_read_download")+"</em> </a> </li> <li> <a target=\"_blank\" class=\"curbuy\" href=\"/dashang.html\" style=\"height: 40px;line-height: 40px;\"> <em>"+i18nUtils.prop("book_read_donate")+"</em> </a> </li> </ul> </div>";
            $("#artWrap").after(html_opt);
        }
    },
    initDownload: function () {
        $(".book_dirnew,.book_dircont").each(function () {
            var i = $(this),n = i.height(),maxHeight=500;
            i.data("oriheight", n)
            if(n > maxHeight){
                i.height(maxHeight).css({"overflow": "hidden"});
                var btn = "展开全部";
                if (typeof i18nUtils !== "undefined") {
                    btn = i18nUtils.prop("book_expend")
                }
                i.after('<div class="book-more" style="color: #7a8f9a;font-size: 14px;z-index: 800; width: 100%; height: 30px; background: linear-gradient(-180deg,rgba(249, 249, 249,.8) 0,#fff 90%);padding-top: 25px;text-align: center;cursor: pointer;"><span style="padding: 6px 15px 6px 15px; border: solid 1px #44719a; border-radius: 20px;color: #44719a;">'+btn+'<span class="book-more-arrowdown bounce" style="display: inline-block; margin-left: 8px; height: 14px; width: 14px; background: url(/images/arrow-down.png);"></span></span></div>');
                $(".book-more").click(function () {
                    i.height(i.data("oriheight"));
                    $(this).hide();
                })
            }
        });
        $("#freeDownload").click(function(){
            var book_name = $("#book_name").val();
            var book_id = $("#book_id").val();
            var customer_url = $("#customer_url").val();
            var qrCode = "/files/book/qrcode/"+book_id+"/"+customer_url+".png";
            var html =  '<div class="pop_down" id="pop_down_apk">'
                +'   <div class="pop_win">'
                +'	    <div class="pop_content">'
                +'	   	   <div class="down_tit"><h3><b>'+book_name+'</b></h3></div>'
                +'		   <div class="down_box">'
                +'				<ul class="clearfix">'
                +'					<li>'
                +'						<div class="down_item down_book_apk">'
                +                        '<div id="ads_div"></div><p>&nbsp;</p>'
                +'						</div>'
                +'					</li>'
                +'					<li>'
                +'						<div class="down_item down_book_txt">'
                +'							<p class="item_qr"><img src="'+qrCode+'" width="120" height="120" /></p>'
                +'							<p class="item_txt">'+i18nUtils.prop("book_read_scan_download_tip")+'</p>'
                +'							<p class="item_btn"><a href="/download/' + customer_url + '.html" target="_blank">'+i18nUtils.prop("book_read_go_download")+'<i class="icon_txt"></i></a></p>'
                +'						</div>'
                +'					</li>'
                +'				 </ul>'
                +'         </div>'
                +'		   <div class="down_tip"><span><a href="/client/index.html" target="_blank">'+i18nUtils.prop("book_read_download_tip")+'</a></span></div>'
                +'		   <div class="down_ios"></div>'
                +'	   </div>'
                +'	</div>'
                +'</div>';
            $.jBox(html,{ top:"160px", title:book_name + i18nUtils.prop("book_read_download"), width: 710, draggable:false, buttons: {}});
            //var downwrap = $("#pop_down_apk");
            if(typeof site_enabled_g != "undefined" && site_enabled_g){
                $("#ads_div").load("/scripts/ads/ads_auto_no_write.js");
                $(".down_ios").load("/scripts/ads/ads_auto_no_write.js");
            }
        });
    },
    addTingShu: function () {
        // var customer_url = $("#customer_url").val();
        // if(customer_url) {
        //     var audio_url = "/audio/" + customer_url + ".html";
        //     var html = "";
        //     var lang = i18nUtils.getDefaultLocale();
        //     if(lang == 'en'){
        //         html = "<div id='onlone_tingshu' class=\"letter-holder\" style='cursor: pointer; float: right; background: #34bf1f; width: 70px; height: 25px; text-align: center; border-radius: 3px; color: #fff; padding: 2px 4px 0; margin-top: 13px; margin-right: 5px; line-height: 1.8; -webkit-transform: rotate(18deg); transform: rotate(18deg); transition: transform 0.1s ease-in;'> <a href='"+audio_url+"' target='_blank'><span class=\"l-1 letter\">L</span> <span class=\"l-2 letter\">I</span> <span class=\"l-3 letter\">S</span> <span class=\"l-4 letter\">T</span>  <span class=\"l-4 letter\">E</span>  <span class=\"l-4 letter\">N</span></a> </div>";
        //     } else{
        //         html = "<div id='onlone_tingshu' class=\"letter-holder\" style='cursor: pointer; float: right; background: #34bf1f; width: 70px; height: 25px; text-align: center; border-radius: 3px; color: #fff; padding: 2px 4px 0; margin-top: 13px; margin-right: 5px; line-height: 1.8; -webkit-transform: rotate(18deg); transform: rotate(18deg); transition: transform 0.1s ease-in;'> <a href='"+audio_url+"' target='_blank'><span class=\"l-1 letter\">在</span> <span class=\"l-2 letter\">线</span> <span class=\"l-3 letter\">听</span> <span class=\"l-4 letter\">书</span></a> </div>";
        //     }
        //     $(".book_txt").prepend(html);
        // }
        // $("#onlone_tingshu").click(function(){
        //     html =  '<div>'
        //         +'   <div class="pop_win">'
        //         +'	    <div class="pop_content">'
        //         +'	   	   <div class="down_tit"><h3 style="font-size: 20px;"><b>'+i18nUtils.prop("book_listen_tip1")+'</b></h3></div>'
        //         +'		   <div class="down_tip" style="text-align: left;"><span>'+i18nUtils.prop("book_listen_tip2")+'</span></div>'
        //         +'		   <div class="down_tip" style="text-align: left;"><span>'+i18nUtils.prop("book_listen_tip3")+'</span></div>'
        //         +'	   	   <div class="down_tit"><h3 style="font-size: 16px;text-align: center;margin-top: 15px;"><a href="/client/index.html" target="_blank"><b>'+i18nUtils.prop("book_read_download_tip")+'</b></a></h3></div>'
        //         +'	   </div>'
        //         +'	</div>'
        //         +'</div>';
        //     $.jBox(html,{ top:"200px", title:i18nUtils.prop("book_listen_tip1"), width: 400, draggable:false, buttons: {}});
        // });
    },
    checkIsLogin: function (b)  {
        var a = this;
        if (b) {
            a.params.is_login = true;
        } else {
            $.post("/CsAjax.do?method=isLogin", {}, function (c) {
                if (c.ret === "1") {
                    a.params.is_login = true;
                    $(".offline").hide();
                    $online = $(".online");
                    $online.find(".uname").attr("href","/bookshelfmy.html").text(c.user_name);
                    $online.show();
                }
                console.log(a.params.is_login)
            })
        }
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
                            var href = "/read/" + $("#customer_url").val() + "/" + bookshelf.chapter_id_read + ".html";
                        }
                        that.checkIsInBookshelf(true, href);
                    } else {
                        if (!isLogin) {
                            var key = that.params.key_bookshelf;
                            var bid = $("#book_id").val();
                            var m = that.getArrayDataFromStorage(key);
                            for (var i = 0, n = m.length; i < n; i++) {
                                if (m[i].bid == bid) {
                                    var href = "";
                                    if(m[i].cid != "" && m[i].bUrl != ""){
                                        var href = "/read/" + m[i].bUrl + "/" + m[i].cid + ".html";
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
    initCheckBookStatus: function () {
        var a = this;
        $("#btnAddToBookshelf").on("click", function () {
            var b = $(this);
            if (1 === b.data("bookshelf-status")) {
                a.tip(i18nUtils.prop("book_exist_in_bookshelf"))
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
                a.checkIsInBookshelf(true)
                a.tip(i18nUtils.prop("book_bookshelf_add_success"))
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
    sendError: function (a) {
        if(layer){
            layer.prompt({title: i18nUtils.prop("book_feedback_content"), formType: 2}, function(text, index){
                if(text && text.length > 200){
                    layer.msg(i18nUtils.prop("book_feedback_content_limit"));
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
                        layer.msg(c.msg);
                    }
                });
            });

        }
    },
    initBookShelfHeader: function (a) {
        var b = this;
        $(".btn-tab").on("click", function () {
            var c = $(this), d = c.data("type");
            $(".btn-tab").removeClass("cur");
            c.addClass("cur");
            b.loadHisotryOrBookShelf(d)
        });
        if (a != "") {
            $(".btn-tab").removeClass("cur");
            $("#tab_" + a).addClass("cur")
        }
    },
    loadHisotryOrBookShelf: function (e) {
        var d = this;
        var c = this.params.key_bookshelf;
        if (e == "recent") {
            c = this.params.key_recently_read;
        }
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
                }
            })
        } else {
            var a = this.getBooksFromStroage(c), b = this.render("tpl-history-read.html", {data: a});
            $("#bookEditOl").html(b);
            d.showHistory(a);
        }
    },
    showHistory: function () {
        var url = window.location.href;
        if(url.indexOf("/book/") !== -1){
            var a = this.getBooksFromStroage(this.params.key_recently_read)
            if(a.length > 0){
                var book_read_record = $(".book_read_record");
                var book_comment = $("#book_comment");
                var recently_read = $("#recently-read");
                var html = "";
                var htmlRectPc = "";
                var htmlRectMobile = "";
                htmlRectPc+= '<div class="book_hot_con mt20">';
                htmlRectPc+= '<div class="v1_title"><span>'+i18nUtils.prop("book_recently_read")+'</span></div>';
                htmlRectPc+= '<div class="book_hot_list">';
                htmlRectPc+=     '<ul class="clearfix">';
                var cdn = "";
                if (typeof ctx_cdn !== "undefined") {
                    cdn = ctx_cdn;
                }
                a.map(function (f,index) {
                    var burl = "/book/"+f.bUrl+".html";
                    var bImg = cdn+"/files/book/cover/"+f.bid+"/cover.jpg";
                    html +="<li><a href='"+burl+"' target='_blank'>"+f.bName+"</a></li>";
                    if(index<18){
                        htmlRectPc+= '<li>';
                        htmlRectMobile +='<li class="module-slide-li"><a href="/m'+burl+'" class="module-slide-a"><img src="'+bImg+'" class="module-slide-img" onerror="this.src=\'/styles/index/images/noimage.jpg\'"/> <figcaption class="module-slide-caption">'+f.bName+'</figcaption> <p class="module-slide-author" role="option"></p> </a></li>';
                        htmlRectPc+= '<div><a href="'+burl+'" target="_blank"><img src="'+bImg+'" style="width: 120px;height: 160px;" onerror="this.src=\'/styles/index/images/noimage.jpg\'" /></a></div>';
                        htmlRectPc+= '<div class="book_hot_info"> <span class="book_hot_name"><a href="'+burl+'" target="_blank">'+f.bName+'</a></span> <span class="book_hot_author">'+i18nUtils.prop("book_author")+':'+f.aName+'</span> </div>';
                        htmlRectPc+= '</li>';
                    }
                });
                book_read_record.show().find(".bgGray").empty().html(html);
                recently_read.show().find("#ol").empty().html(htmlRectMobile);
                htmlRectPc+= '</ul>';
                htmlRectPc+= '</div>';
                book_comment.before(htmlRectPc);
            }
        }
    },
    removeMyfavHander: function (id) {
        var a = this;
        $("#myfav_" + id).remove();
        if ($("li", "#bookEditOl").size() == 0) {$("#bookEditOl").html('<div class="null">'+i18nUtils.prop("book_bookshelf_is_empty")+'</div>');}
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
        var submit = function (v, h, f) {
            if (v == 'ok'){
                if (a.params.is_login) {
                    $.post("/CsAjax.do?method=removeMyFavForM",{bids : id},function(data){
                        if (data.code == 1){
                            $.jBox.tip(data.msg, "success");
                            a.removeMyfavHander(id);
                        } else {
                            $.jBox.tip(data.msg, "warning");
                        }
                    });
                } else {
                    a.removeMyfavHander(id);
                }

            }
            return true; //close
        };
        $.jBox.confirm(i18nUtils.prop("delete_tip"), "Tip", submit);
    },
    getChapter: function (id) {
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
            dataType: data_type,
            url: url_tmp,
            success: function (a) {
                if(data_type === "jsonp"){
                    $("#artWrap").html(a.data);
                }else{
                    $("#artWrap").html(a);
                }
                AudioUtils.initPlayBar("artWrap");
            },
            error: function () {
                var a = "<p style='text-align:center;' onclick='BookUtils.getChapter()'>"+i18nUtils.prop("book_load_failed")+"</p>";
                $("#artWrap").html(a)
            }
        })
    },
    showCatalog: function (url1,url2,id) {
        var that = this;
        layer.load(1);
        if(!that.params.catalog_cache){
            that.cachedScript(url1).done(function(script, textStatus1) {
                console.log("textStatus1:", textStatus1 );
                that.cachedScript(url2).done(function(){
                    that.showCatalogCallback(id)
                    that.params.catalog_cache = true;
                })
            }).fail(function( jqxhr, settings, exception ) {
                layer.msg('load error.'+exception);
                layer.closeAll('loading');
            });
        }else{
            that.showCatalogCallback(id)
        }
    },
    showCatalogCallback: function (id) {
        var width = 780;
        var height = 600;
        try {
            width =  parseInt($(window).width()*0.6);
            height = parseInt($(window).height()*0.8);
        }catch (e) {

        }
        try {
            if (id) {
                var chapterTmp =  $("#c"+id);
                chapterTmp.find("a").css({"color":"red"});
                // if(typeof cur_location_url !=="undefined"){
                //     location.href = cur_location_url+"#c"+id
                // }
                setTimeout(function(){
                    // var t = chapterTmp.offset().top;
                    var top = chapterTmp.position().top;
                    var $content_layui = $(".layui-layer-content");
                    // var height = $content_layui.height();
                    console.log("==scrollTop==to==height{}, ",height)
                    console.log("==scrollTop==to==top:{}", top)
                    if(top>height){
                        console.log("==scrollTop==to==t",top)
                        $content_layui.scrollTop(top-(height/2));
                        // document.getElementsByClassName("layui-layer-content").scrollTo({
                        //     top: t-180
                        // });
                    }
                },300);
            }
        }catch (e) {

        }
        layer.open({
            title: false,
            type: 1,
            anim: 2,
            shadeClose: true,
            area: [width+'px', height+'px'],
            content: $("#catalogs")
        });
        layer.closeAll('loading');
    },
    cachedScript: function (url, options) {
        options = $.extend( options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return jQuery.ajax( options );
    }
};