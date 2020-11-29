if(typeof jQuery !== 'undefined'){
    $(document).ready(function () {
        var selectLanguage = '<select name="language" id="language"> <option value="">Language</option> <option value="zh">中文</option> <option value="en">English</option> </select>';
        $(".h_top_txt").find("ul").append("<li>"+selectLanguage+"</li>")
        $(".footer-copy").append("&nbsp;"+selectLanguage);
        var $language =  $("#language");
        $language.change(function(){
            var lang = $(this).val();
            if(lang !== ""){
                window.localStorage.setItem('cookie_lang', lang);
                $.post("/CsAjax.do?method=setcookie", {"key":"cookie_lang", "value":lang}, function(c) {window.location.reload();});
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
        showNotice();
    });
}

function showNotice(){
    try {
        // if (typeof site_id != "undefined"&&site_id===56178) {
        //     if (!window.localStorage.getItem('site_close')) {
        //         var close = $('<div style="background-color: rgba(0,0,0,.5);position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 99999;"> <div style="position: absolute; color: #fff; text-align: center; font-size: 16px;top: 30%; right: 15%; bottom: 30%; left: 15%; border: 2px dashed #fff;"><span style="position: relative; top: 45%;">石头阅读已搬家，请收藏新域名:www.shitou.club</span> </div> </div>');
        //         $('body').append(close);
        //         close.click(function(e){
        //             e.stopPropagation();
        //             close.remove();
        //             window.localStorage.setItem('site_close', 1);
        //         });
        //     }
        // }
        var privacy_policy;
        if (typeof is_english != "undefined" && is_english) {
            privacy_policy = $('<div style=" color: #fff; background-color: #3b4045; left: 0; right: 0; bottom: 0; align-items: center; padding: 1em 1.8em; width: 100%; -ms-flex-direction: row; flex-direction: row; position: fixed; overflow: hidden; box-sizing: border-box; font-family: Helvetica,Calibri,Arial,sans-serif; font-size: 16px; line-height: 1.5em; display: -ms-flexbox; display: flex; -ms-flex-wrap: nowrap; flex-wrap: nowrap; z-index: 9999; "><span id="cookieconsent:desc" class="cc-message" style=" flex: 1; ">This website uses cookies to ensure you get the best experience on our website. <a href="/privacyPolicy.html" target="_blank" style=" opacity: .8; display: inline-block; padding: .2em; color: #fff; text-decoration: underline; ">Click for the cookie policy.</a></span><div class="cc-compliance" style=" display: flex; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: justify; align-content: space-between; "><a style=" min-width: 120px; color: #44719a; background-color: rgb(255, 255, 255); border-color: transparent; border-radius: 5px; flex: 1; display: block; padding: .4em .4em; font-size: .9em; font-weight: 700; border-width: 2px; border-style: solid; text-align: center; white-space: nowrap; ">Got it!</a></div></div>');
        }else{
            privacy_policy = $('<div style=" color: #fff; background-color: #3b4045; left: 0; right: 0; bottom: 0; align-items: center; padding: 1em 1.8em; width: 100%; -ms-flex-direction: row; flex-direction: row; position: fixed; overflow: hidden; box-sizing: border-box; font-family: Helvetica,Calibri,Arial,sans-serif; font-size: 16px; line-height: 1.5em; display: -ms-flexbox; display: flex; -ms-flex-wrap: nowrap; flex-wrap: nowrap; z-index: 9999; "><span id="cookieconsent:desc" class="cc-message" style=" flex: 1; ">本网站使用cookie来确保您在我们的网站上获得最佳体验。<a href="/privacyPolicy.html" target="_blank" style=" opacity: .8; display: inline-block; padding: .2em; color: #fff; text-decoration: underline; ">单击以获取Cookie政策。</a></span><div class="cc-compliance" style=" display: flex; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: justify; align-content: space-between; "><a style=" min-width: 120px; color: #44719a; background-color: rgb(255, 255, 255); border-color: transparent; border-radius: 5px; flex: 1; display: block; padding: .4em .4em; font-size: .9em; font-weight: 700; border-width: 2px; border-style: solid; text-align: center; white-space: nowrap; ">我知道了</a></div></div>');
        }
        if (!window.localStorage.getItem('site_privacy_policy')) {
            $('body').append(privacy_policy);
            privacy_policy.click(function(e){
                e.stopPropagation();
                privacy_policy.remove();
                window.localStorage.setItem('site_privacy_policy', 1);
            });
        }
    }catch (e) {
        console.log(e)
    }
}


function isMobile() {
    return ua().match(/iphone|ipad|ipod|android|blackberry|iemobile|wpdesktop/i)
}
function ua() {
    return navigator.userAgent.toLowerCase()
}
function isWechat(){
    return ua().match(/MicroMessenger/i);
}

function gEnabledAds(url){
    if(typeof filterUrls != "undefined"){
        for(var i = 0, len = filterUrls.length; i < len; i++){
            console.log(filterUrls[i]);
            if (url.indexOf(filterUrls[i]) !== -1) {
                return false;
            }
        }
    }
    return true;
}
function siteEnabledG(url){
    if(typeof siteGUrls != "undefined"){
        for(var i = 0, len = siteGUrls.length; i < len; i++){
            console.log(siteGUrls[i]);
            if (url.indexOf(siteGUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}
function siteEnabledB(url){
    if(typeof siteBUrls != "undefined"){
        for(var i = 0, len = siteBUrls.length; i < len; i++){
            console.log(siteBUrls[i]);
            if (url.indexOf(siteBUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function siteEnabledE(url){
    if(typeof siteEUrls != "undefined"){
        for(var i = 0, len = siteEUrls.length; i < len; i++){
            console.log(siteEUrls[i]);
            if (url.indexOf(siteEUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function loadGoogleAds() {
    if(g_enabled_ads){
        document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
        document.write('<ins class="adsbygoogle" style="display:block" data-ad-client="'+g_data_ad_client+'" data-ad-slot="'+g_data_ad_slot_auto+'" data-ad-format="auto" data-full-width-responsive="true"></ins>');
        document.write('<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');
    }
}
function loadGoogleAds468() {
    if(g_enabled_ads) {
        document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
        document.write('<ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="'+g_data_ad_client+'" data-ad-slot="'+g_data_ad_slot_468+'"></ins>');
        document.write('<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');
    }
}
function loadGoogleAdsRecommend() {
    if(g_enabled_ads) {
        document.write('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
        document.write('<ins class="adsbygoogle" style="display:block" data-ad-format="autorelaxed" data-ad-client="'+g_data_ad_client+'" data-ad-slot="' + g_data_ad_slot_recommend + '"></ins>');
        document.write('<script> (adsbygoogle = window.adsbygoogle || []).push({});</script>');
    }
}
function loadBaiduAds(loc) {
    var tmpId = b_data_ad_mobile;
    if((loc === "cms_left_bottom" && !isMobile()) || loc === "pc_left_bottom"){
        tmpId = b_data_ad_336;
    }
    if(loc === "cms_right_bottom"){
        tmpId = b_data_ad_336_xuanting;
    }
    if(loc === "pc_468"){
        tmpId = b_data_ad_468;
    }
    if(loc === "pc_bottom"){
        tmpId = b_data_ad_1024;
    }
    if(loc === "pc_right_top"){
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

function loadExoAds(loc) {
    loadExoAdsTemplate(e_data_ad_300,"300","250");
    // if((loc === "cms_left_bottom") || loc === "pc_left_bottom"){
    //     loadExoAdsTemplate(e_data_ad_300,"300","250");
    // }
    // if(loc === "cms_right_bottom"){
    //     loadExoAdsTemplate(e_data_ad_160_600,"160","600");
    // }
    // if(loc === "pc_468"){
    //     loadExoAdsTemplate(e_data_ad_468,"468","60");
    // }
    // if(loc === "pc_bottom"){
    //     loadExoAdsTemplate(e_data_ad_728,"728","90");
    // }
    // if(loc === "pc_right_top"){
    //     loadExoAdsTemplate(e_data_ad_300,"300","250");
    // }
    // if(loc === "m_bottom"){
    //     loadExoAdsTemplate(e_data_ad_300,"300","250");
    // }
    // if(loc === "m_top"){
    //     loadExoAdsTemplate(e_data_ad_mobile,"300","100")
    // }
}

function loadExoAdsTemplate(idzone,width,height) {
    var opacity = "";
    if (typeof third_opacity_css != "undefined") {
        opacity = third_opacity_css;
    }
    ad_idzone = idzone, ad_width = width, ad_height = height;
    document.write('<div style="'+opacity+'">');
    document.write('<script type="text/javascript" src="https://a.exdynsrv.com/ads.js"></script>');
    document.write('</div>');
}

function loadOther(){
    // if(isMobile()&&!isWechat()){
    //     document.write('<div> <iframe id="ads_iframe" src="/ads.html" style="width: 100%; border: none; height: auto;"></iframe></div>');
    //
    //     var ads_iframe = document.getElementById('ads_iframe');
    //     setTimeout(function(){
    //         if (ads_iframe){
    //             try{
    //                 var url = ads_iframe.contentWindow.location.href;
    //                 console.log("==monitor=="+url)
    //                 if(url.indexOf("ads.html")===-1){
    //                     ads_iframe.parentNode.removeChild(ads_iframe);
    //                 }
    //             }catch (e) {
    //                 console.log("==monitor error==",e)
    //                 ads_iframe.parentNode.removeChild(ads_iframe);
    //             }
    //         }
    //
    //     },6000);
    //     setTimeout(function(){if (ads_iframe){ads_iframe.parentNode.removeChild(ads_iframe);}},30000);
    // }
}

function getHostName(url) {
    var match = url.match(/:\/\/?(.[^/:]+)/i);
    if (match != null && match.length > 1 && typeof match[1] === 'string' && match[1].length > 0) {
        return match[1];
    } else {
        return null;
    }
}

function goNewDomain(){
    if (typeof app_domain != "undefined" && typeof site_id != "undefined"&& typeof cur_location_url != "undefined") {
        if(!isLocal(cur_location_url)){
            var cur_host = getHostName(cur_location_url);
            if (cur_host && (cur_host !== app_domain)) {
                location.href = cur_location_url.replace(cur_host,app_domain);
            }
        }
    }
}
function isLocal(url) {
    return url.indexOf("localhost") !== -1 || url.indexOf("192.168.") !== -1;

}
function validateSite(){
    try {
        if(self !== top){
            top.location = self.location;
        }
    }catch (e) {
        console.log(e)
    }
}
validateSite();
cur_location_url = window.location.href;
goNewDomain();
g_enabled_ads = gEnabledAds(cur_location_url);
console.log("g_enabled_ads:"+g_enabled_ads);
site_enabled_g = siteEnabledG(cur_location_url);
console.log("site_enabled_g:"+site_enabled_g);
site_enabled_b = siteEnabledB(cur_location_url);
console.log("site_enabled_b:"+site_enabled_b);
site_enabled_e = siteEnabledE(cur_location_url);
console.log("site_enabled_e:"+site_enabled_e);

site_enabled_other = siteEnabledOther(cur_location_url);
console.log("site_enabled_other:"+site_enabled_other);
site_enabled_alimama = siteEnabledAlimama(cur_location_url);

function siteEnabledOther(url){
    if(typeof siteOtherUrls != "undefined"){
        for(var i = 0, len = siteOtherUrls.length; i < len; i++){
            console.log(siteOtherUrls[i]);
            if (url.indexOf(siteOtherUrls[i]) !== -1) {
                return true;
            }
        }
    }
    return false;
}
function siteEnabledAlimama(url){
    if(typeof siteAlimamaUrls != "undefined"){
        for(var i = 0, len = siteAlimamaUrls.length; i < len; i++){
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
        // if (typeof third_opacity_css != "undefined") {
        //     opacity = third_opacity_css;
        // }
        document.writeln('<div style="' + opacity + '">');
        document.writeln('<scri' + 'pt src="//spl.ztvx8.com/wlzys5.js"> </scri' + 'pt>');
        document.writeln('</div>');
    }
    // if((loc === "cms_left_bottom") || loc === "pc_left_bottom"){
    //     loadThirdAdsTemplate(o_data_ad_300);
    // }
    // if(loc === "cms_right_bottom"){
    //     loadThirdAdsTemplate(o_data_ad_300_right);
    // }
    // if(loc === "pc_bottom"){
    //     loadThirdAdsTemplate(o_data_ad_728);
    // }
    // if(loc === "pc_right_top"){
    //     loadThirdAdsTemplate(o_data_ad_300_right);
    // }
    // if(loc === "m_bottom"){
    //     if(isMobile()){
    //         loadThirdAdsTemplate(o_data_ad_mobile,true);
    //     }else{
    //         loadThirdAdsTemplate(o_data_ad_300);
    //     }
    // }
}

function loadThirdAdsTemplate(id,mobile) {
    if (typeof id != "undefined" || id != "") {
        var opacity = "";
        if (typeof third_opacity_css != "undefined") {
            opacity = third_opacity_css;
        }
        if(mobile){
            document.write('<div style="'+opacity+'"><ins style="display:none!important" id="' + id + '"></ins></div>');
        }else{
            document.write('<div style="display: inline-block;'+opacity+'"><ins style="display:none!important" id="' + id + '"></ins></div>');
        }
        (window.adbyunion = window.adbyunion || []).push(id);
        document.write('<script async defer src="https://www.fjsjsj.com/o.js"></script>');
    }
}
function loadAlimama(loc) {
    var id = "ads_iframe_"+ loc;
    var w = 336;
    var h = 280;
    if(loc === "pc_right_top"){
         w = 250;
         h = 250;
    }
    document.write('<div> <iframe id="'+id+'" src="//cdn.cms.moujishu.com/ads.html?loc='+loc+'&id='+id+'&w='+w+'&h='+h+'" style="width: '+w+'px; border: none; height: '+h+'px;"></iframe></div>');
    // loadAlimamaTemplate(alimama_data_ad_336);
}
function loadAlimamaTemplate(id) {
    if (typeof id != "undefined" || id != "") {
        document.write('<script src="http://wm.lrswl.com/page/s.php?s='+id+'&w=300&h=250"></script>');
        // document.write('<a style="display:none!important" id="tanx-a-'+id+'"></a>');
        // tanx_s = document.createElement("script");
        // tanx_s.type = "text/javascript";
        // tanx_s.charset = "gbk";
        // tanx_s.id = "tanx-s-"+id;
        // tanx_s.async = true;
        // tanx_s.src = "//p.tanx.com/ex?i="+id;
        // tanx_h = document.getElementsByTagName("head")[0];
        // if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);
    }
}
function formatDate(){
    // 获取当前日期
    var date = new Date();

    // 获取当前月份
    var nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    var strDate = date.getDate();

    // 添加分隔符“-”
    var seperator = "";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    return date.getFullYear() + seperator + nowMonth + seperator + strDate;
}

