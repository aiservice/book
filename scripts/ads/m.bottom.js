document.write('<div class="ads_mobile">');
if(typeof adsMobileTipHtml != "undefined" &&(
    (typeof site_enabled_b != "undefined" && site_enabled_b)
    ||(typeof site_enabled_other != "undefined" && site_enabled_other)
    ||(typeof site_enabled_e != "undefined" && site_enabled_e)
    ||(typeof site_enabled_g != "undefined" && site_enabled_g)
)){
    document.writeln(adsMobileTipHtml);
}
if(typeof site_enabled_b != "undefined" && site_enabled_b){
    loadBaiduAds("m_bottom");
}
if(typeof site_enabled_e != "undefined" && site_enabled_e){
    loadExoAds("m_bottom");
}
if(typeof site_enabled_other != "undefined" && site_enabled_other){
    loadThirdAds("m_bottom");
}
if(typeof site_enabled_g != "undefined" && site_enabled_g){
    loadGoogleAds();
}
// if(typeof site_enabled_alimama != "undefined" && site_enabled_alimama){
//     loadAlimama("m_bottom");
// }
document.write('</div>');

function loadTempJs() {
    var opacity = "";
    if (typeof third_opacity_css != "undefined") {
        opacity = third_opacity_css;
    }
    if (isMobile() && !isWechat()) {
        document.write('<div style="'+opacity+'">');
        document.writeln('<scri' + 'pt src="https://59gt.cn/5/2849/7477/20/27.js"> </scri' + 'pt>');
        document.write('</div>');
    }
}
