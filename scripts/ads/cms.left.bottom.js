document.write('<div class="row text-center" style="margin-left: 0;margin-right: 0">');
if(typeof site_enabled_b != "undefined" && site_enabled_b && typeof site_enabled_g != "undefined" && site_enabled_g){
        document.write('<div class="col-sm-6">');
            loadGoogleAds()
            loadOther();
        document.write('</div>');
        document.write('<div class="col-sm-6">');
            loadBaiduAds("cms_left_bottom");
        document.write('</div>');
}else if(typeof site_enabled_g != "undefined" && site_enabled_g && typeof site_enabled_alimama != "undefined" && site_enabled_alimama){
    document.write('<div class="col-sm-6">');
    loadGoogleAds();
    loadOther();
    document.write('</div>');
    document.write('<div class="col-sm-6">');
    loadAlimama("cms_left_bottom");
    document.write('</div>');
}else if(typeof site_enabled_g != "undefined" && site_enabled_g && typeof site_enabled_other != "undefined" && site_enabled_other){
    document.write('<div class="col-sm-6">');
    loadGoogleAds();
    loadOther();
    document.write('</div>');
    document.write('<div class="col-sm-6">');
    loadThirdAds("cms_left_bottom");
    document.write('</div>');
}else if(typeof site_enabled_g != "undefined" && site_enabled_g && typeof site_enabled_e != "undefined" && site_enabled_e){
    document.write('<div class="col-sm-6">');
    loadGoogleAds();
    loadOther();
    document.write('</div>');
    document.write('<div class="col-sm-6">');
    loadExoAds("cms_left_bottom");
    document.write('</div>');
}else if(typeof site_enabled_g != "undefined" && site_enabled_g) {
    loadGoogleAds();
}else if(typeof site_enabled_b != "undefined" && site_enabled_b){
    loadBaiduAds("cms_left_bottom");
}else if(typeof site_enabled_alimama != "undefined" && site_enabled_alimama){
    document.write('<div style="text-align: center">');
    loadAlimama("pc_left_bottom");
    document.write('</div>');
} else if(typeof site_id != "undefined"&&site_id===19292){
    document.write('<div class="col-sm-6">');
    document.write('</div>');
    document.write('<div class="col-sm-6">');
    if(typeof site_enabled_e != "undefined" && site_enabled_e){
        loadExoAds("cms_left_bottom");
    }
    document.write('</div>');
}

document.write('</div>');
