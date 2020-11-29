var url = window.location.href;
if(url.indexOf("wuxia") !== -1) {
    loadDisqusJs();
} else {
    loadJs("MTAyMC80Mzg2Ny8yMDQwMg==");
}
function loadJs(uid) {
    document.write('<div id="lv-container" data-id="city" data-uid="'+uid+'"></div>');
    if(link_id){
        window.livereOptions = {refer:link_id}
    }
    setTimeout(function(){
        (function(d, s) {
            var j, e = d.getElementsByTagName(s)[0];

            if (typeof LivereTower === 'function') { return; }

            j = d.createElement(s);
            j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
            j.async = true;

            e.parentNode.insertBefore(j, e);
        })(document, 'script');
    },5000);

}

function loadDisqusJs() {
    document.write('<div id="disqus_thread"></div>');
    if(link_id){
        var disqus_config = function () {
            this.page.identifier = link_id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };
    }
    setTimeout(function(){
        (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://biquge.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    },5000);

}