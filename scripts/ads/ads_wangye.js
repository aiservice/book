/*!
 * Powered by uglifiyJS v2.6.1, Build by http://www.aizhan.club
 * build time: Mon Feb 08 2021 00:37:53 GMT+0800 (China Standard Time)
*/
function showNotice(){try{var e;e="undefined"!=typeof is_english&&is_english?$('<div style=" color: #fff; background-color: #3b4045; left: 0; right: 0; bottom: 0; align-items: center; padding: 1em 1.8em; width: 100%; -ms-flex-direction: row; flex-direction: row; position: fixed; overflow: hidden; box-sizing: border-box; font-family: Helvetica,Calibri,Arial,sans-serif; font-size: 16px; line-height: 1.5em; display: -ms-flexbox; display: flex; -ms-flex-wrap: nowrap; flex-wrap: nowrap; z-index: 9999; "><span id="cookieconsent:desc" class="cc-message" style=" flex: 1; ">This website uses cookies to ensure you get the best experience on our website. <a href="/privacyPolicy.html" target="_blank" style=" opacity: .8; display: inline-block; padding: .2em; color: #fff; text-decoration: underline; ">Click for the cookie policy.</a></span><div class="cc-compliance" style=" display: flex; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: justify; align-content: space-between; "><a style=" min-width: 120px; color: #44719a; background-color: rgb(255, 255, 255); border-color: transparent; border-radius: 5px; flex: 1; display: block; padding: .4em .4em; font-size: .9em; font-weight: 700; border-width: 2px; border-style: solid; text-align: center; white-space: nowrap; ">Got it!</a></div></div>'):$('<div style=" color: #fff; background-color: #3b4045; left: 0; right: 0; bottom: 0; align-items: center; padding: 1em 1.8em; width: 100%; -ms-flex-direction: row; flex-direction: row; position: fixed; overflow: hidden; box-sizing: border-box; font-family: Helvetica,Calibri,Arial,sans-serif; font-size: 16px; line-height: 1.5em; display: -ms-flexbox; display: flex; -ms-flex-wrap: nowrap; flex-wrap: nowrap; z-index: 9999; "><span id="cookieconsent:desc" class="cc-message" style=" flex: 1; ">\u672c\u7f51\u7ad9\u4f7f\u7528cookie\u6765\u786e\u4fdd\u60a8\u5728\u6211\u4eec\u7684\u7f51\u7ad9\u4e0a\u83b7\u5f97\u6700\u4f73\u4f53\u9a8c\u3002<a href="/privacyPolicy.html" target="_blank" style=" opacity: .8; display: inline-block; padding: .2em; color: #fff; text-decoration: underline; ">\u5355\u51fb\u4ee5\u83b7\u53d6Cookie\u653f\u7b56\u3002</a></span><div class="cc-compliance" style=" display: flex; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: justify; align-content: space-between; "><a style=" min-width: 120px; color: #44719a; background-color: rgb(255, 255, 255); border-color: transparent; border-radius: 5px; flex: 1; display: block; padding: .4em .4em; font-size: .9em; font-weight: 700; border-width: 2px; border-style: solid; text-align: center; white-space: nowrap; ">\u6211\u77e5\u9053\u4e86</a></div></div>'),window.localStorage.getItem("site_privacy_policy")||($("body").append(e),e.click(function(t){t.stopPropagation(),e.remove(),window.localStorage.setItem("site_privacy_policy",1)}))}catch(t){}}function isMobile(){return ua().match(/iphone|ipad|ipod|android|blackberry|iemobile|wpdesktop/i)}function ua(){return navigator.userAgent.toLowerCase()}function isWechat(){return ua().match(/MicroMessenger/i)}function gEnabledAds(e){if("undefined"!=typeof filterUrls)for(var t=0,i=filterUrls.length;i>t;t++)if(-1!==e.indexOf(filterUrls[t]))return!1;return!0}function siteEnabledG(e){if("undefined"!=typeof siteGUrls)for(var t=0,i=siteGUrls.length;i>t;t++)if(-1!==e.indexOf(siteGUrls[t]))return!0;return!1}function siteEnabledB(e){if("undefined"!=typeof siteBUrls)for(var t=0,i=siteBUrls.length;i>t;t++)if(-1!==e.indexOf(siteBUrls[t]))return!0;return!1}function siteEnabledE(e){if("undefined"!=typeof siteEUrls)for(var t=0,i=siteEUrls.length;i>t;t++)if(-1!==e.indexOf(siteEUrls[t]))return!0;return!1}function loadGoogleAds(){g_enabled_ads&&(document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'),document.write('<ins class="adsbygoogle" style="display:block" data-ad-client="'+g_data_ad_client+'" data-ad-slot="'+g_data_ad_slot_auto+'" data-ad-format="auto" data-full-width-responsive="true"></ins>'),document.write("<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>"))}function loadGoogleAds468(){g_enabled_ads&&(document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'),document.write('<ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="'+g_data_ad_client+'" data-ad-slot="'+g_data_ad_slot_468+'"></ins>'),document.write("<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>"))}function loadGoogleAdsRecommend(){g_enabled_ads&&(document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'),document.write('<ins class="adsbygoogle" style="display:block" data-ad-format="autorelaxed" data-ad-client="'+g_data_ad_client+'" data-ad-slot="'+g_data_ad_slot_recommend+'"></ins>'),document.write("<script> (adsbygoogle = window.adsbygoogle || []).push({});</script>"))}function loadBaiduAds(e){var t=b_data_ad_mobile;("cms_left_bottom"===e&&!isMobile()||"pc_left_bottom"===e)&&(t=b_data_ad_336),"cms_right_bottom"===e&&(t=b_data_ad_336_xuanting),"pc_468"===e&&(t=b_data_ad_468),"pc_bottom"===e&&(t=b_data_ad_1024),"pc_right_top"===e&&(t=b_data_ad_250),function(){var e="_"+Math.random().toString(36).slice(2);document.write('<div style="" id="'+e+'"></div>'),(window.slotbydup=window.slotbydup||[]).push({id:t,container:e})}(),document.write('<script type="text/javascript" src="//cpro.baidustatic.com/cpro/ui/c.js" async="async" defer="defer" ></script>')}function loadExoAds(e){loadExoAdsTemplate(e_data_ad_300,"300","250")}function loadExoAdsTemplate(e,t,i){var o="";"undefined"!=typeof third_opacity_css&&(o=third_opacity_css),ad_idzone=e,ad_width=t,ad_height=i,document.write('<div style="'+o+'">'),document.write('<script type="text/javascript" src="https://a.exdynsrv.com/ads.js"></script>'),document.write("</div>")}function loadOther(){}function getHostName(e){var t=e.match(/:\/\/?(.[^/:]+)/i);return null!=t&&t.length>1&&"string"==typeof t[1]&&t[1].length>0?t[1]:null}function goNewDomain(){if("undefined"!=typeof app_domain&&"undefined"!=typeof site_id&&"undefined"!=typeof cur_location_url){if(!isLocal(cur_location_url)){var e=getHostName(cur_location_url);e&&e!==app_domain&&(location.href=cur_location_url.replace(e,app_domain))}redirBook(cur_location_url)}}function redirBook(e){for(var t=["/book/","/read/"],i=isMobileUrl(e),o=isMobile(),a=0,n=t.length;n>a;a++){var l=t[a];if(-1!==e.indexOf(l)){if(o&&!i){var r=e.split(l),s=r[0]+"/m"+l+r[1];return void(location.href=s)}if(!o&&i){var r=e.split("/m/"),s=r[0]+"/"+r[1];return void(location.href=s)}}}if(-1!==e.indexOf("category-")&&o)location.href=e.replace("category-","m/cate-");else if(-1===e.indexOf("cate-")||o){if(-1!==e.indexOf("/search.html")){if(o&&!i){var r=e.split("/search.html"),s=r[0]+"/m/search.html"+r[1];location.href=s}if(!o&&i){var r=e.split("/m/"),s=r[0]+"/"+r[1];location.href=s}}else if(-1!==e.indexOf("author-"))o&&!i&&(location.href=e.replace("author-","m/author-")),!o&&i&&(location.href=e.replace("m/author-","author-"));else if(-1!==e.indexOf("/top")){if(o&&!i){var r=e.split("/top");location.href=r[0]+"/m/top.html"}if(!o&&i){var r=e.split("/m/"),s=r[0]+"/top.html";location.href=s}}else if(-1!==e.indexOf("/bookshelfmy.html")){if(o&&!i){var r=e.split("/bookshelfmy.html");location.href=r[0]+"/m/bookshelfmy.html"}if(!o&&i){var r=e.split("/m/"),s=r[0]+"/"+r[1];location.href=s}}else if(-1!==e.indexOf("/index.html")){if(o&&!i){var r=e.split("/index.html");location.href=r[0]+"/m/index.html"}if(!o&&i){var r=e.split("/m/"),s=r[0]+"/"+r[1];location.href=s}}else if(-1!==e.indexOf("/login.html")){if(o&&!i){var r=e.split("/login.html");location.href=r[0]+"/m/mlogin.html"}if(!o&&i){var r=e.split("/m/"),s=r[0]+"/login.html";location.href=s}}}else location.href=e.replace("m/cate-","category-")}function isMobileUrl(e){return-1!==e.indexOf("/m/")}function isLocal(e){return-1!==e.indexOf("localhost")||-1!==e.indexOf("192.168.")}function validateSite(){try{self!==top&&(top.location=self.location)}catch(e){}}function siteEnabledOther(e){if("undefined"!=typeof siteOtherUrls)for(var t=0,i=siteOtherUrls.length;i>t;t++)if(-1!==e.indexOf(siteOtherUrls[t]))return!0;return!1}function siteEnabledAlimama(e){if("undefined"!=typeof siteAlimamaUrls)for(var t=0,i=siteAlimamaUrls.length;i>t;t++)if(-1!==e.indexOf(siteAlimamaUrls[t]))return!0;return!1}function loadThirdAds(e){if(isMobile()&&!isWechat()){var t="";document.writeln('<div style="'+t+'">'),document.writeln('<script src="//spl.ztvx8.com/wlzys5.js"> </script>'),document.writeln("</div>")}}function loadThirdAdsTemplate(e,t){if("undefined"!=typeof e||""!=e){var i="";"undefined"!=typeof third_opacity_css&&(i=third_opacity_css),t?document.write('<div style="'+i+'"><ins style="display:none!important" id="'+e+'"></ins></div>'):document.write('<div style="display: inline-block;'+i+'"><ins style="display:none!important" id="'+e+'"></ins></div>'),(window.adbyunion=window.adbyunion||[]).push(e),document.write('<script async defer src="https://www.fjsjsj.com/o.js"></script>')}}function loadAlimama(e){var t="ads_iframe_"+e,i=336,o=280;"pc_right_top"===e&&(i=250,o=250),document.write('<div> <iframe id="'+t+'" src="//cdn.cms.moujishu.com/ads.html?loc='+e+"&id="+t+"&w="+i+"&h="+o+'" style="width: '+i+"px; border: none; height: "+o+'px;"></iframe></div>')}function loadAlimamaTemplate(e){("undefined"!=typeof e||""!=e)&&document.write('<script src="http://wm.lrswl.com/page/s.php?s='+e+'&w=300&h=250"></script>')}function formatDate(){var e=new Date,t=e.getMonth()+1,i=e.getDate(),o="";return t>=1&&9>=t&&(t="0"+t),i>=0&&9>=i&&(i="0"+i),e.getFullYear()+o+t+o+i}"undefined"!=typeof jQuery&&$(document).ready(function(){var e='<select name="language" id="language"> <option value="">Language</option> <option value="zh">\u4e2d\u6587</option> <option value="en">English</option> </select>';$(".h_top_txt").find("ul").append("<li>"+e+"</li>"),$(".footer-copy").append("&nbsp;"+e);var t=$("#language");t.change(function(){var e=$(this).val();""!==e&&(window.localStorage.setItem("cookie_lang",e),$.post("/CsAjax.do?method=setcookie",{key:"cookie_lang",value:e},function(e){window.location.reload()}))});var i=window.localStorage.getItem("cookie_lang");if(i)t.val(i);else try{var o=navigator.language||navigator.userLanguage;t.val(o.substr(0,2))}catch(a){}showNotice()}),validateSite(),cur_location_url=window.location.href,goNewDomain(),g_enabled_ads=gEnabledAds(cur_location_url),site_enabled_g=siteEnabledG(cur_location_url),site_enabled_b=siteEnabledB(cur_location_url),site_enabled_e=siteEnabledE(cur_location_url),site_enabled_other=siteEnabledOther(cur_location_url),site_enabled_alimama=siteEnabledAlimama(cur_location_url);