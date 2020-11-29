var url = window.location.href;
if(url.indexOf("wuxia.biquge") !== -1){
    document.write('<a id="footerApp" href="/client/index.html" class="footer-app"><img src="/app/img/logo.png" style="border-radius: 8px;position: absolute; top: .75rem;width: 2.25rem; height: 2.25rem; left: 1rem"><h3 class="footer-app-h">Install APP</h3><p class="footer-app-p">See more free books</p><span class="btn-primary-small">Download</span></a>');
} else {
    document.write('<a id="footerApp" href="/client/index.html" class="footer-app"><img src="/app/img/logo.png" style="border-radius: 8px;position: absolute; top: .75rem;width: 2.25rem; height: 2.25rem; left: 1rem"><h3 class="footer-app-h">安装APP客户端</h3><p class="footer-app-p">看更多免费好书</p><span class="btn-primary-small">下载</span></a>');
}

