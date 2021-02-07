window.setTimeout(function () {
    loadTop();
}, 2000);

function loadTop() {
    var urlAjax = "/top.html?method=load";
    var $topWarp = $('#top-warp');
    var type = $topWarp.data('type');
    var mobile = $topWarp.data('mobile');
    if (type) {
        $.post(urlAjax, {"type": type}, function (ret) {
            if (ret.code == "0") {
                $topWarp.html("<p style=\" text-align: center; padding-top: 150px; \">" + ret.msg + "</p>");
                return false;
            }
            if (type === "total") {
                $("#sum").html(getTopHtml(ret.bookTopSumList, mobile));
                $("#month").html(getTopHtml(ret.bookTopMonthList, mobile));
                $("#week").html(getTopHtml(ret.bookTopWeekList, mobile));
                $("#day").html(getTopHtml(ret.bookTopDayList, mobile));
            }
            if (type === "sum") {
                $topWarp.html(getTopListHtml(ret.bookTopSumList, mobile));
            }
            if (type === "month") {
                $topWarp.html(getTopListHtml(ret.bookTopMonthList, mobile));
            }
            if (type === "week") {
                $topWarp.html(getTopListHtml(ret.bookTopWeekList, mobile));
            }
            if (type === "day") {
                $topWarp.html(getTopListHtml(ret.bookTopDayList, mobile));
            }
        });
    }
}

function getTopListHtml(data, mobile) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        var book = data[i];
        var burl = "/book/" + book.bUrl + ".html";
        if (mobile) {
            burl = "/m/book/" + book.bUrl + ".html";
        }
        var cUrl = "/category-" + book.cid + ".html";
        var chapter_url = "/read/" + book.bUrl + "/" + book.chapterId + ".html";
        var bName = book.bName;
        var aName = book.aName;
        var cName = book.cat;
        var chapter_name = book.chapterName;
        if (mobile) {
            html += '<li class="module-slide-li"><a href="' + burl + '" class="module-slide-a"><img src="' + bImg + '" class="module-slide-img"> <figcaption class="module-slide-caption">' + bName + '</figcaption> <p class="module-slide-author" role="option"> <aria>' + i18nUtils.prop("book_author") + '</aria> <span class="gray">' + aName + '</span></p> </a></li>';
        } else {
            html += '<div class="book_upto_row"> <ul class="clearfix"> <li class="col_num">' + (i + 1) + '</li> <li class="col_cata"> <a href="' + cUrl + '">[' + cName + ']</a> </li> <li class="col_bname"><a href="' + burl + '" target="_blank">' + bName + '</a></li> <li class="col_upto"><a href="' + chapter_url + '" target="_blank">' + chapter_name + '</a></li> <li class="col_auth">' + aName + '</li> <li class="col_time"> ' + book.vCount + ' </li> <li class="col_stat" style="width: 180px;"> ' + book.uTime + '</li> </ul> </div>';
        }
    }
    return html;
}

function getTopHtml(data, mobile) {
    var html = '';
    if (!mobile) {
        html = '<ol>';
    }
    for (var i = 0; i < data.length; i++) {
        var book = data[i];
        var cdn = "";
        if (typeof ctx_cdn !== "undefined") {
            cdn = ctx_cdn;
        }
        var burl = "/book/" + book.bUrl + ".html";
        if (mobile) {
            burl = "/m/book/" + book.bUrl + ".html";
        }
        var bImg = cdn + "/files/book/cover/" + book.bid + "/cover_120.jpg";
        var bName = book.bName;
        var aName = book.aName;
        var bRole = book.bRole;
        if (mobile) {
            html += '<li class="module-slide-li"><a href="' + burl + '" class="module-slide-a"><img src="' + bImg + '" class="module-slide-img"> <figcaption class="module-slide-caption">' + bName + '</figcaption> <p class="module-slide-author" role="option"> <aria>' + i18nUtils.prop("book_author") + '</aria> <span class="gray">' + aName + '</span></p> </a></li>';
        } else {
            if (i === 0) {
                html += '<li class="first"> <div class="v1_no1 clearfix"> <div class="v1_img"><a href="' + burl + '" target="_blank"><img src="' + bImg + '" width="80" height="100"/></a></div> <div class="v1_con"> <div class="v1_name"><a class="listtxtbold" href="' + burl + '" target="_blank">' + bName + '</a></div> <div class="v1_info"><span class="blue">' + i18nUtils.prop("book_author") + ':</span>' + aName + '</div> <div class="v1_info" title="方平"><span class="blue">' + i18nUtils.prop("book_role") + ':</span>' + bRole + ' </div> </div> <div style="clear:both;"></div> </div> </li>';
            } else {
                html += '<li class="topno' + (i + 1) + '"><a class="listtxt" href="' + burl + '" target="_blank">' + bName + '<i>' + (i + 1) + '</i></a></li>';
            }
        }

    }
    if (!mobile) {
        html += '</ol>';
    }
    return html;
}