document.write('<div class="g_wrap mt10 ads">');
if(typeof site_enabled_b != "undefined" && site_enabled_b){
    loadBaiduAds("m_bottom");
}
if(typeof site_enabled_e != "undefined" && site_enabled_e){
    loadExoAds("m_bottom");
}
if(typeof site_enabled_other != "undefined" && site_enabled_other){
    loadThirdAds("m_bottom");
}
// if(typeof site_enabled_g != "undefined" && site_enabled_g){
//     loadGoogleAds();
// }
document.write('</div>');
