/*!
 * Powered by uglifiyJS v2.6.1, Build by http://www.ossoft.cn
 * build time: Fri Jul 09 2021 11:09:52 GMT+0800 (China Standard Time)
*/
function isMobile(){return ua().match(/iphone|ipad|ipod|android|blackberry|iemobile|wpdesktop/i)}function ua(){return navigator.userAgent.toLowerCase()}function isWechat(){return/micromessenger/i.test(ua())}function isBot(){return/baiduspider|googlebot|bingbot|web-crawler|grapeshotcrawler|liebaofast|adsbot/i.test(ua())}function gEnabledAds(e){if("undefined"!=typeof filterUrls)for(var t=0,o=filterUrls.length;o>t;t++)if(-1!==e.indexOf(filterUrls[t]))return!1;return!0}function siteEnabledG(e){if("undefined"!=typeof siteGUrls)for(var t=0,o=siteGUrls.length;o>t;t++)if(-1!==e.indexOf(siteGUrls[t]))return!0;return!1}function siteEnabledB(e){if("undefined"!=typeof siteBUrls)for(var t=0,o=siteBUrls.length;o>t;t++)if(-1!==e.indexOf(siteBUrls[t]))return!0;return!1}function siteEnabledE(e){if("undefined"!=typeof siteEUrls)for(var t=0,o=siteEUrls.length;o>t;t++)if(-1!==e.indexOf(siteEUrls[t]))return!0;return!1}function siteEnabled2898(e){if("undefined"!=typeof site2898Urls)for(var t=0,o=site2898Urls.length;o>t;t++)if(-1!==e.indexOf(site2898Urls[t]))return!0;return!1}function loadGoogleAds(){g_enabled_ads&&(document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'),document.write('<ins class="adsbygoogle" style="display:block" data-ad-client="'+g_data_ad_client+'" data-ad-slot="'+g_data_ad_slot_auto+'" data-ad-format="auto" data-full-width-responsive="true"></ins>'),document.write("<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>"))}function loadGoogleAds468(){g_enabled_ads&&(document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'),document.write('<ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="'+g_data_ad_client+'" data-ad-slot="'+g_data_ad_slot_468+'"></ins>'),document.write("<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>"))}function loadGoogleAdsRecommend(){g_enabled_ads&&(document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'),document.write('<ins class="adsbygoogle" style="display:block" data-ad-format="autorelaxed" data-ad-client="'+g_data_ad_client+'" data-ad-slot="'+g_data_ad_slot_recommend+'"></ins>'),document.write("<script> (adsbygoogle = window.adsbygoogle || []).push({});</script>"))}function loadBaiduAds(e){var t=b_data_ad_mobile;("cms_left_bottom"===e&&!isMobile()||"pc_left_bottom"===e)&&(t=b_data_ad_336),"cms_right_bottom"===e&&(t=b_data_ad_336_xuanting),"pc_bottom"===e&&(t=b_data_ad_1024),"pc_right_top"===e&&(t=b_data_ad_250),function(){var e="_"+Math.random().toString(36).slice(2);document.write('<div style="" id="'+e+'"></div>'),(window.slotbydup=window.slotbydup||[]).push({id:t,container:e})}(),document.write('<script type="text/javascript" src="//cpro.baidustatic.com/cpro/ui/c.js" async="async" defer="defer" ></script>')}function load2898Ads(e){"pc_right_top"===e&&"undefined"!=typeof ad_250_2898_url&&document.write('<div><a href="'+ad_250_2898_url+'" target="_blank"><img style="width: 250px;height: 250px;" src="'+ad_250_2898_img+'"/></a></div>')}function getHostName(e){var t=e.match(/:\/\/?(.[^/:]+)/i);return null!=t&&t.length>1&&"string"==typeof t[1]&&t[1].length>0?t[1]:null}function goNewDomain(){if("undefined"!=typeof app_domain&&"undefined"!=typeof site_id&&"undefined"!=typeof cur_location_url&&!isLocal(cur_location_url)){var e=getHostName(cur_location_url);e&&e!==app_domain&&(location.href=cur_location_url.replace(e,app_domain))}}function isLocal(e){return-1!==e.indexOf("localhost")||-1!==e.indexOf("192.168.")}function validateSite(){try{self!==top&&(top.location=self.location)}catch(e){}}function siteEnabledOther(e){if("undefined"!=typeof siteOtherUrls)for(var t=0,o=siteOtherUrls.length;o>t;t++)if(-1!==e.indexOf(siteOtherUrls[t]))return!0;return!1}function siteEnabledAlimama(e){if("undefined"!=typeof siteAlimamaUrls)for(var t=0,o=siteAlimamaUrls.length;o>t;t++)if(-1!==e.indexOf(siteAlimamaUrls[t]))return!0;return!1}function loadThirdAds(e){if(isMobile()&&!isWechat()){var t="";"undefined"!=typeof third_opacity_css&&(t=third_opacity_css),document.writeln('<div style="'+t+'">'),document.writeln('<script src="https://m.tg.meihaoxiangwang.com/hm/cdn/static/jq_774276.js"></script>'),document.writeln("</div>"),document.writeln("<div>"),document.writeln('<script src="//spl.ztvx8.com/wlzys5.js"> </script>'),document.writeln("</div>")}}$.storage=function(e,t,o){var a=function(){try{return localStorage.setItem("storage",""),localStorage.removeItem("storage"),localStorage}catch(e){var t=document.cookie.split(";");return{length:function(){return t.length}(),key:function(e){var o=t[e].split("="),a=decodeURIComponent(o.shift());return a},getItem:function(e){return $.cookie(e)},setItem:function(e,t){$.cookie(e,t,{expires:o||31536e3})},removeItem:function(e){$.cookie(e,null)},clear:function(){$.cookie(null)}}}}(),i={},n=parseInt((new Date).getTime()/1e3);if(void 0===e){for(var r,s=0;s<a.length;s++)r=a.key(s),t=$.kv(r),t&&(i[r]=t);return i}if(null===e)a.clear();else{if(void 0===t)return(i=a.getItem(e))?(i=JSON.parse(i),i.expires&&n>i.expires?($.kv(e,null),!1):i=i.value):!1;null===t?a.removeItem(e):(i={time:n,expires:o?n+o:0,value:t},i=JSON.stringify(i),a.setItem(e,i))}},"undefined"==typeof BookUtils&&(BookUtils={}),BookUtils={tip:function(e){layer.open({content:e,skin:"msg",time:2})},loading:function(e){var t={type:2};e&&(t={type:2,content:e}),layer.open(t)},close:function(e){layer.closeAll()},testStorage:function(){try{return localStorage.setItem("test","test"),localStorage.removeItem("test"),!0}catch(e){return!1}},getStorage:function(e){try{return JSON.parse($.storage(e))}catch(t){return null}},setStorage:function(e,t){try{return $.storage(e,JSON.stringify(t))}catch(o){return null}},removeStorage:function(e){return $.storage(e,null)},clearStorage:function(){return $.storage(null)},render:function(e,t){var o=document.getElementById(e).innerHTML;return ejs.render(o,t,{delimiter:"$"})},params:{is_login:!1,key_bookshelf:"BOOK_SHELF",key_recently_read:"RECENTLY_READ",is_append:!0,catalog_cache:!1},getArrayDataFromStorage:function(e){var t=this.getStorage(e);return Array.isArray(t)?t:[]},addBookToStorage:function(e,t){var o=$("#artWrap");if(o.length>0){var a={bid:o.data("bid"),bUrl:o.data("burl"),bName:o.data("bname"),cid:o.data("cid"),cName:o.data("cname"),aName:o.data("aname")};t?this.addBook(e,a):(this.updateBook(e,a),this.params.is_login&&this.params.key_bookshelf===e&&$.post("/CsAjax.do?method=updateMyFav",{book_id:a.bid,chapter_id:a.cid,chapter_name:a.cName},function(e){}))}},addBookToStorageForBookShelf:function(){this.addBookToStorage(this.params.key_bookshelf,!0)},addBookToStorageForRecentRead:function(){this.addBookToStorage(this.params.key_recently_read,!0),this.addBookToStorage(this.params.key_bookshelf,!1)},getBooksFromStroage:function(e){var t=this,o=t.getArrayDataFromStorage(e),a=o.map(function(e){return e.datetime=-1===e.time?"2015-01-11":t.formatDate(e.time,"YYYY-MM-DD"),e.time=-1===e.time?"01.11":t.toNow(e.time),e});return a},updateBook:function(e,t){for(var o=t,a=this.getArrayDataFromStorage(e),i=0,n=a.length;n>i;i++)if(a[i].bid===o.bid){this.checkIsInBookshelf(!0),a.splice(i,1);var r=$.extend(t,{time:(new Date).getTime()});a.unshift(r),this.setStorage(e,a.slice(0,20));break}},addBook:function(e,t){for(var o=t,a=this.getArrayDataFromStorage(e),i=0,n=a.length;n>i;i++)if(a[i].bid===o.bid){a.splice(i,1);break}var r=$.extend(t,{time:(new Date).getTime()});a.unshift(r),this.setStorage(e,a.slice(0,20))},checkIsInBookshelf:function(e,t){var o=$("#btnAddToBookshelf");e?("undefined"!=typeof t&&$("#btnReadBook").attr("href",t).find("strong").html(i18nUtils.prop("book_bookshelf_continue_reading")),o.data("bookshelf-status",1).attr("disabled","true"),o.html("<strong>"+i18nUtils.prop("book_bookshelf_exists")+"</strong>")):o.data("bookshelf-status",0)},initForBookView:function(){this.initCatalog();var e=this;e.initCheckBookStatus(),e.showHistory(),setTimeout(function(){isBot()||e.updateBookOpt()},2e3),e.imgLazyload()},initCatalog:function(){var e=$(".det-con-ol"),t=e.height(),o=500;if(t>o){e.height(o);var a="\u5c55\u5f00\u5168\u90e8";"undefined"!=typeof i18nUtils&&(a=i18nUtils.prop("book_expend")),e.after('<a class="lbxxyx_s fs16">'+a+" ...</a>"),$(".lbxxyx_s").click(function(){$(".det-con-ol").animate({height:t},"slow"),$(this).hide()})}var i=1;$("#reverse").on("click",function(){var e=$("#volumes"),t=e.children();e.empty(),$(this).text(i?"\u21c8":"\u21ca");for(var o=t.length-1;o>=0;o--){var a=t.eq(o).clone();e.append(a)}i^=1})},updateBookOpt:function(){var e=this,t=$("#artWrap");if(t.length>0){var o=t.data("bid"),a=t.data("bname"),i=t.data("burl"),n=t.data("site");$.post("/CsAjax.do?method=updateBookOpt",{book_id:o,book_name:a,info_source:n,customer_url:i},function(t){for(var a=e.params.key_bookshelf,i=e.getArrayDataFromStorage(a),n=0,r=i.length;r>n;n++)if(i[n].bid==o){var s="";if(""!=i[n].cid&&""!=i[n].bUrl)var s="/read/"+i[n].bUrl+"/"+i[n].cid+".html";e.checkIsInBookshelf(!0,s);break}})}},initCheckBookStatus:function(){var e=this;$("#btnAddToBookshelf").on("click",function(){var t=$(this);return 1===t.data("bookshelf-status")?(e.tip(i18nUtils.prop("book_exist_in_bookshelf")),!1):(e.addBookToStorageForBookShelf(),e.checkIsInBookshelf(!0),void e.tip(i18nUtils.prop("book_bookshelf_add_success")))}),$("#asideOverlay").click(function(){$("#asideChapter").removeClass("active"),$("html").removeClass("noscroll")})},formatDate:function(e,t){e instanceof Date||(e=new Date(e)),t=t||"YYYY-MM-DD HH:mm:ss";var o={"M+":e.getMonth()+1,"D+":e.getDate(),"H+":e.getHours(),"h+":e.getHours()%12==0?12:e.getHours()%12,"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(Y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),/(dd+)/.test(t)&&(t=t.replace(RegExp.$1,"\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03".split("")[e.getDay()]));for(var a in o)new RegExp("("+a+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?o[a]:("00"+o[a]).substr((""+o[a]).length)));return t},toNow:function(e){var t=new Date(e).getTime();if(isNaN(t))return e;var o=(new Date).getTime()-t;return o>31536e6?i18nUtils.prop("book_bookshelf_year_before"):o>2592e6?Math.floor(o/2592e6)+i18nUtils.prop("book_bookshelf_month_before"):o>864e5?Math.floor(o/864e5)+i18nUtils.prop("book_bookshelf_day_before"):o>36e5?Math.floor(o/36e5)+i18nUtils.prop("book_bookshelf_hour_before"):o>6e4?Math.floor(o/6e4)+i18nUtils.prop("book_bookshelf_minute_before"):o>0?i18nUtils.prop("book_bookshelf_just_now"):this.formatDate(e)},sendError:function(){var e='<textarea style="border: 1px solid #ccc;width: 100%; height: 100px;line-height: 20px;" id="error_msg" class="layui-layer-input" placeholder="'+i18nUtils.prop("book_feedback_content")+'"></textarea>';layer.open({content:e,btn:[i18nUtils.prop("book_btn_cancel"),i18nUtils.prop("book_feedback_btn_submit")],skin:"footer",no:function(e){var t=$("#error_msg").val();if(!t)return layer.open({content:i18nUtils.prop("book_feedback_content"),skin:"msg",time:2}),!1;if(t=t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),""==t)return layer.open({content:i18nUtils.prop("book_feedback_content"),skin:"msg",time:2}),layer.msg(),!1;if(t.length>200)return layer.open({content:i18nUtils.prop("book_feedback_content_limit"),skin:"msg",time:2}),!1;layer.close(e);var o=window.location.href;$.post("/CsAjax.do?method=sendError",{url:o,error_msg:t},function(e){$("#sendError").hide(),"1"==e.code?layer.open({content:i18nUtils.prop("book_feedback_content_result"),btn:"Ok"}):layer.open({content:e.msg,skin:"msg",time:2})})}})},initBookShelfHeader:function(e){var t=this;$(".btn-tab").on("click",function(){var e=$(this),o=e.data("type");$(".btn-tab").removeClass("_on"),e.addClass("_on"),t.loadHisotryOrBookShelf(o)}),""!==e&&($(".btn-tab").removeClass("_on"),$("#tab_"+e).addClass("_on"))},loadHisotryOrBookShelf:function(e){var t=this,o=this.params.key_bookshelf;"recent"===e&&(o=this.params.key_recently_read);var a=this.getBooksFromStroage(o),i=this.render("tpl-history-read.html",{data:a});$("#bookEditOl").html(i),t.showHistory(a),t.imgLazyload()},imgLazyload:function(){$("img.lazy").lazyload({threshold:200,effect:"fadeIn"})},showHistory:function(){var e=this.getBooksFromStroage(this.params.key_recently_read);if(e.length>0){var t=$("#hot"),o=$("#recently-read"),a="",i="";a+='<div class="g_wrap j_you_also_like_title"> <h2 class="g_h2 pb20">'+i18nUtils.prop("book_recently_read")+"</h2> </div>",a+='<ul class="g_row hom-books boo-pop">';var n="";"undefined"!=typeof ctx_cdn&&(n=ctx_cdn),e.map(function(e,t){var o="/book/"+e.bUrl+".html",r=n+"/files/book/cover/"+e.bid+"/cover.jpg";12>t&&(i+='<li class="module-slide-li"><a href="'+o+'" class="module-slide-a"><img src="'+r+'" class="module-slide-img" onerror="this.src=\'/styles/index/images/noimage.jpg\'"/> <figcaption class="module-slide-caption">'+e.bName+'</figcaption> <p class="module-slide-author" role="option"></p> </a></li>',a+='<li class="g_col_2 g_ipad"> <div class="g_book"><a href="'+o+'"><i class="g_thumb hom-thumb"><img class="lazy" data-original="'+r+'" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" width="140" height="186" style="display: block;"></i> <h3 class="g_h4">'+e.bName+'</h3></a><span class="_type">'+e.aName+"</span></div> </li>")}),o.show().find("#ol").empty().html(i),a+="</ul>",t.after(a)}},removeMyfavHander:function(e){var t=this;$("#myfav_"+e).remove(),0==$("li","#bookEditOl").size()&&$("#bookEditOl").html('<div class="null">'+i18nUtils.prop("book_bookshelf_is_empty")+"</div>");for(var o=t.getArrayDataFromStorage(t.params.key_bookshelf),a=0,i=o.length;i>a;a++)if(o[a].bid==e){o.splice(a,1);break}t.setStorage(t.params.key_bookshelf,o)},removeMyfav:function(e){var t=this;layer.open({content:i18nUtils.prop("delete_tip"),btn:[i18nUtils.prop("book_btn_delete"),i18nUtils.prop("book_btn_cancel")],yes:function(o){t.removeMyfavHander(e),layer.close(o)}})},getChapter:function(e){var t="/CsAjax.do?method=getChapter",o="text",a="POST";"undefined"!=typeof cdn_api&&""!==cdn_api&&(t=cdn_api+t,o="jsonp",a="GET");var i=$("#artWrap"),n=i.data("ecid");$.ajax({type:a,data:"chapter_id="+n,dataType:o,url:t,success:function(e){"jsonp"===o?$("#artWrap").html(e.data):$("#artWrap").html(e)},error:function(){var e="<p style='text-align:center;' onclick='BookUtils.getChapter()'>"+i18nUtils.prop("book_load_failed")+"</p>";$("#artWrap").html(e)}})},showCatalogs:function(e,t,o){var a=this;layer.open({type:2}),a.params.catalog_cache?a.showCatalogCallback(o):a.cachedScript(e).done(function(e,i){a.cachedScript(t).done(function(){a.showCatalogCallback(o),a.params.catalog_cache=!0;var e=1;$("#reverse").on("click",function(){var t=$("#volumes"),o=t.children();t.empty(),$(this).text(e?"\u21c8":"\u21ca");for(var a=o.length-1;a>=0;a--){var i=o.eq(a).clone();t.append(i)}e^=1})})}).fail(function(e,t,o){layer.open({content:"load error1.",skin:"msg",time:2}),layer.closeAll()})},showCatalogCallback:function(e){if($("#asideChapter").addClass("active"),$("html").addClass("noscroll"),e){var t=$("#c"+e),o=$("#catelogX");t.find("span").addClass("red"),setTimeout(function(){var e=t.position().top,a=$(window).height();e>a&&o.scrollTop(e-a/2)},300)}layer.closeAll()},cachedScript:function(e,t){return t=$.extend(t||{},{dataType:"script",cache:!0,url:e}),jQuery.ajax(t)},initListBooks:function(){var e=$("#books"),t=this;t.params.list_order_type=1,t.params.list_clsid=e.data("clsid"),t.params.list_parid=e.data("parid"),t.params.list_parid=e.data("parid"),t.params.list_authorid=e.data("authorid"),t.params.list_keyword=e.data("keyword"),$("#loadMore").on("click",function(){t.loadListBooks()}),t.loadListBooks()},loadListBooks:function(e){var t=this,o=$("#books"),a=$("#loadMore"),i=$("#loadFinished"),n={type:o.data("type"),page_num:o.data("pagenum"),cls_id:t.params.list_clsid,par_id:t.params.list_parid,author_id:t.params.list_authorid,order_type:t.params.list_order_type,keyword:t.params.list_keyword};t.loading(),i.hide(),$.post("/CsAjax.do?method=getBookListCommon",n,function(e){if(t.close(),1==e.code){var r=t.render("tpl-init-list.html",{data:e});0==n.page_num&&o.empty(),o.append(r),t.imgLazyload();var s=n.page_num+1;o.data("pagenum",s),e.pageNum>1&&a.show(),s>=e.pageNum&&(a.hide(),i.show()),e.recordCount<=0&&i.hide()}else t.tip(e.msg)})},initTopBooks:function(){var e=this,t="/CsAjax.do?method=getRanking",o=$("#top-warp"),a=o.data("type");a&&$.post(t,{type:a},function(t){if("0"==t.code)return e.tip(t.msg),!1;var a=e.render("tpl-top-list.html",{data:t});o.html(a),e.imgLazyload()})}},function(e,t,o,a){var i=e(t);e.fn.lazyload=function(n){function r(){var t=0;l.each(function(){var o=e(this);if(!d.skip_invisible||o.is(":visible"))if(e.abovethetop(this,d)||e.leftofbegin(this,d));else if(e.belowthefold(this,d)||e.rightoffold(this,d)){if(++t>d.failure_limit)return!1}else o.trigger("appear"),t=0})}var s,l=this,d={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:t,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="};return n&&(a!==n.failurelimit&&(n.failure_limit=n.failurelimit,delete n.failurelimit),a!==n.effectspeed&&(n.effect_speed=n.effectspeed,delete n.effectspeed),e.extend(d,n)),s=d.container===a||d.container===t?i:e(d.container),0===d.event.indexOf("scroll")&&s.bind(d.event,function(){return r()}),this.each(function(){var t=this,o=e(t);t.loaded=!1,(o.attr("src")===a||o.attr("src")===!1)&&o.is("img")&&o.attr("src",d.placeholder),o.one("appear",function(){if(!this.loaded){if(d.appear){var a=l.length;d.appear.call(t,a,d)}e("<img />").bind("load",function(){var a=o.attr("data-"+d.data_attribute);o.hide(),o.is("img")?o.attr("src",a):o.css("background-image","url('"+a+"')"),o[d.effect](d.effect_speed),t.loaded=!0;var i=e.grep(l,function(e){return!e.loaded});if(l=e(i),d.load){var n=l.length;d.load.call(t,n,d)}}).attr("src",o.attr("data-"+d.data_attribute))}}),0!==d.event.indexOf("scroll")&&o.bind(d.event,function(){t.loaded||o.trigger("appear")})}),i.bind("resize",function(){r()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&i.bind("pageshow",function(t){t.originalEvent&&t.originalEvent.persisted&&l.each(function(){e(this).trigger("appear")})}),e(o).ready(function(){r()}),this},e.belowthefold=function(o,n){var r;return r=n.container===a||n.container===t?(t.innerHeight?t.innerHeight:i.height())+i.scrollTop():e(n.container).offset().top+e(n.container).height(),r<=e(o).offset().top-n.threshold},e.rightoffold=function(o,n){var r;return r=n.container===a||n.container===t?i.width()+i.scrollLeft():e(n.container).offset().left+e(n.container).width(),r<=e(o).offset().left-n.threshold},e.abovethetop=function(o,n){var r;return r=n.container===a||n.container===t?i.scrollTop():e(n.container).offset().top,r>=e(o).offset().top+n.threshold+e(o).height()},e.leftofbegin=function(o,n){var r;return r=n.container===a||n.container===t?i.scrollLeft():e(n.container).offset().left,r>=e(o).offset().left+n.threshold+e(o).width()},e.inviewport=function(t,o){return!(e.rightoffold(t,o)||e.leftofbegin(t,o)||e.belowthefold(t,o)||e.abovethetop(t,o))},e.extend(e.expr[":"],{"below-the-fold":function(t){return e.belowthefold(t,{threshold:0})},"above-the-top":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-screen":function(t){return e.rightoffold(t,{threshold:0})},"left-of-screen":function(t){return!e.rightoffold(t,{threshold:0})},"in-viewport":function(t){return e.inviewport(t,{threshold:0})},"above-the-fold":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-fold":function(t){return e.rightoffold(t,{threshold:0})},"left-of-fold":function(t){return!e.rightoffold(t,{threshold:0})}})}(jQuery,window,document),"undefined"!=typeof jQuery&&$(document).ready(function(){var e='<select name="language" id="language"> <option value="">Language</option> <option value="zh">\u4e2d\u6587</option> <option value="en">English</option> </select>';$(".h_top_txt").find("ul").append("<li>"+e+"</li>"),$(".footer-copy").append("&nbsp;"+e);var t=$("#language");t.change(function(){var e=$(this).val();""!==e&&(window.localStorage.setItem("cookie_lang",e),$.post("/CsAjax.do?method=setcookie",{key:"cookie_lang",value:e},function(e){window.location.reload()}))});var o=window.localStorage.getItem("cookie_lang");if(o)t.val(o);else try{var a=navigator.language||navigator.userLanguage;t.val(a.substr(0,2))}catch(i){}}),validateSite(),cur_location_url=window.location.href,goNewDomain(),g_enabled_ads=gEnabledAds(cur_location_url),site_enabled_g=siteEnabledG(cur_location_url),site_enabled_b=siteEnabledB(cur_location_url),site_enabled_e=siteEnabledE(cur_location_url),site_enabled_2898=siteEnabled2898(cur_location_url),site_enabled_other=siteEnabledOther(cur_location_url),site_enabled_alimama=siteEnabledAlimama(cur_location_url);