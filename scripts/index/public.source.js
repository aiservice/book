
function validateSite(){
    try {
        if(self !== top){
            top.location = self.location;
        }
    }catch (e) {
        console.log(e)
    }
}

function showNotice(){
    try {
        var privacy_policy;
        if (typeof is_english != "undefined"&&is_english) {
            privacy_policy = $('<div style=" color: #fff; background-color: #3b4045; left: 0; right: 0; bottom: 0; align-items: center; padding: 1em 1.8em; width: 100%; -ms-flex-direction: row; flex-direction: row; position: fixed; overflow: hidden; box-sizing: border-box; font-family: Helvetica,Calibri,Arial,sans-serif; font-size: 16px; line-height: 1.5em; display: -ms-flexbox; display: flex; -ms-flex-wrap: nowrap; flex-wrap: nowrap; z-index: 9999; "><span id="cookieconsent:desc" class="cc-message" style=" flex: 1; ">This website uses cookies to ensure you get the best experience on our website. <a href="https://uptimerobot.com/privacyPolicy" target="_blank" style=" opacity: .8; display: inline-block; padding: .2em; color: #fff; text-decoration: underline; ">Click for the cookie policy.</a></span><div class="cc-compliance" style=" display: flex; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: justify; align-content: space-between; "><a style=" min-width: 140px; color: rgb(76, 167, 76); background-color: rgb(255, 255, 255); border-color: transparent; border-radius: 5px; flex: 1; display: block; padding: .4em .8em; font-size: .9em; font-weight: 700; border-width: 2px; border-style: solid; text-align: center; white-space: nowrap; ">Got it!</a></div></div>');
        }else{
            privacy_policy = $('<div style=" color: #fff; background-color: #3b4045; left: 0; right: 0; bottom: 0; align-items: center; padding: 1em 1.8em; width: 100%; -ms-flex-direction: row; flex-direction: row; position: fixed; overflow: hidden; box-sizing: border-box; font-family: Helvetica,Calibri,Arial,sans-serif; font-size: 16px; line-height: 1.5em; display: -ms-flexbox; display: flex; -ms-flex-wrap: nowrap; flex-wrap: nowrap; z-index: 9999; "><span id="cookieconsent:desc" class="cc-message" style=" flex: 1; ">本网站使用cookie来确保您在我们的网站上获得最佳体验。. <a href="https://uptimerobot.com/privacyPolicy" target="_blank" style=" opacity: .8; display: inline-block; padding: .2em; color: #fff; text-decoration: underline; ">单击以获取Cookie政策。</a></span><div class="cc-compliance" style=" display: flex; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: justify; align-content: space-between; "><a style=" min-width: 140px; color: rgb(76, 167, 76); background-color: rgb(255, 255, 255); border-color: transparent; border-radius: 5px; flex: 1; display: block; padding: .4em .8em; font-size: .9em; font-weight: 700; border-width: 2px; border-style: solid; text-align: center; white-space: nowrap; ">Got it!</a></div></div>');
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
function loadOther(){
    if(typeof site_enabled_other != "undefined" && site_enabled_other){
        if (isMobile() && !isWechat()) {
            var opacity = "";
            // if (typeof third_opacity_css != "undefined") {
            //     opacity = third_opacity_css;
            // }
            document.writeln('<div style="' + opacity + '">');
            document.writeln('<scri' + 'pt src="//spl.ztvx8.com/wlzys5.js"> </scri' + 'pt>');
            document.writeln('</div>');
        }
    }
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

function loadExoAds(loc) {
    if((loc === "cms_left_bottom") || loc === "pc_left_bottom"){
        loadExoAdsTemplate(e_data_ad_300,"300","250");
    }
    if(loc === "cms_right_bottom"){
        loadExoAdsTemplate(e_data_ad_160_600,"160","600");
    }
    if(loc === "pc_468"){
        loadExoAdsTemplate(e_data_ad_468,"468","60");
    }
    if(loc === "pc_bottom"){
        loadExoAdsTemplate(e_data_ad_728,"900","250");
    }
    if(loc === "pc_right_top"){
        loadExoAdsTemplate(e_data_ad_300,"300","250");
    }
    if(loc === "m_bottom"){
        loadExoAdsTemplate(e_data_ad_mobile,"300","100")
    }
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
function loadExoAdsWidgetTemplate(idzone) {
    //if(!isWechat()){
    document.write('<script type="text/javascript" data-idzone="'+idzone+'" src="https://a.exdynsrv.com/nativeads.js" ></script>');
    //}
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
        var cur_host = getHostName(cur_location_url);
        if (cur_host && (cur_host !== app_domain)) {
            location.href = cur_location_url.replace(cur_host,app_domain);
        }
    }
}

validateSite();
cur_location_url = window.location.href;
//goNewDomain();
showNotice();
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
    // if((loc === "cms_left_bottom")){
    //     if(isMobile()){
    //         loadThirdAdsTemplate(o_data_ad_mobile,true);
    //     } else{
    //         loadThirdAdsTemplate(o_data_ad_300);
    //     }
    // }
    // if(loc === "cms_right_bottom"){
    //     loadThirdAdsTemplate(o_data_ad_300_right);
    // }
}
function loadThirdAdsTemplate(id,mobile) {
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
    document.write('<script async defer src="https://www.0885.net/o.js"></script>');
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