if(typeof jQuery !== 'undefined'){
$("#sharebaidu").removeAttr("style");
}
if(typeof site_id !== 'undefined'){
    if(site_id === 19292){
        loadJs("5ca325793ddb864e");
    } else {
        loadJs("5ca402b6fcd37c0e");
    }
}

function loadJs(id) {
    document.write('<div class="addthis_inline_share_toolbox"></div>');
    setTimeout(function(){
        (function() {
            var d = document, s = d.createElement('script');
            s.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-'+id;
            (d.head || d.body).appendChild(s);
        })();
    },1000);

}

