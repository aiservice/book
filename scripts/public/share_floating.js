if(typeof jQuery !== 'undefined'){
$("#sharebaidu").removeAttr("style");
}
var url = window.location.href;
if(url.indexOf("wuxia.biquge") !== -1){
    loadJs("5cb7168f45116391");
}else{
    loadJs("5cb6ecc1cef2aab2");
}

function loadJs(id) {
    setTimeout(function(){
        (function() {
            var d = document, s = d.createElement('script');
            s.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-'+id;
            (d.head || d.body).appendChild(s);
        })();
    },3000);
}

