function shareInfo(key) {
	if (key == "SINA_WEIBO") {
		shareWeibo(key);
	}
	if (key == "QZONE") {
		shareQzone(key);
	}
	if (key == "QQWEIBO") {
		shareQQWeibo(key);
	}
	if (key == "RENREN") {
		shareRenRen(key);
	}
}

// 新浪微博

function shareWeibo(key) {
	completeShare(key);
	if (window.shareData) {
		var data = window.shareData;
		var param = {
			url: data.sLink || window.location.href,
			type: '4',
			count: '0',
			// 是否显示分享数，1显示(可选)
			title: data.sTitle,
			// 分享的文字内容(可选，默认为所在页面的title)
			pic: data.sPic,
			// 分享图片的路径(可选)
			language: 'zh_cn',
			// 设置语言，zh_cn|zh_tw(可选)
			dpc: 1
		};
		var s = [];
		for (var p in param) {
			s.push(p + '=' + encodeURIComponent(param[p] || ''));
		}
		var shareUrl = 'http://service.weibo.com/share/share.php?' + s.join('&');
		loadIframe(shareUrl);
	}
}

// QQ空间

function shareQzone(key) {
	completeShare(key);
	if (window.shareData) {
		var data = window.shareData;
		var param = {
			url: data.sLink || window.location.href,
			showcount: '0',
			// 是否显示分享总数,显示：'1'，不显示：'0'
			desc: data.sContent || '',
			// 默认分享理由(可选)
			summary: '',
			// 分享摘要(可选)
			title: data.sTitle || '',
			// 分享标题(可选)
			site: app_name,
			// 分享来源 如：腾讯网(可选)
			pics: data.sPic || '',
			// 分享图片的路径(可选)
			style: '201'
		};
		var s = [];
		for (var p in param) {
			s.push(p + '=' + encodeURIComponent(param[p] || ''));
		}
		var shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&');
		loadIframe(shareUrl);
	}
}
// QQ微博

function shareQQWeibo(key) {
	completeShare(key);
	if (window.shareData) {
		var data = window.shareData;
		var param = {
			url: data.sLink || window.location.href,
			title: data.sTitle || '',
			// 分享标题(可选)
			pics: data.sPic || '',
			// 分享图片的路径(可选)
			appkey: '801553627'
		};
		var s = [];
		for (var p in param) {
			s.push(p + '=' + encodeURIComponent(param[p] || ''));
		}
		var shareUrl = 'http://share.v.t.qq.com/index.php?c=share&a=index&' + s.join('&');
		loadIframe(shareUrl);
	}

}
// 人人网

function shareRenRen(key) {
	completeShare(key);
	if (window.shareData) {
		var data = window.shareData;
		var param = {
			resourceUrl: data.sLink || window.location.href,
			// 分享的资源Url
			srcUrl: data.sLink || window.location.href,
			// 分享的资源来源Url,默认为header中的Referer,如果分享失败可以调整此值为resourceUrl试试
			pic: data.sPic || '',
			// 分享的主题图片Url
			title: data.sTitle || '',
			// 分享的标题
			description: data.sContent || '' // 分享的详细描述
		};
		var s = [];
		for (var p in param) {
			s.push(p + '=' + encodeURIComponent(param[p] || ''));
		}
		var shareUrl = 'http://widget.renren.com/dialog/share?' + s.join('&');
		loadIframe(shareUrl);
	}

}

function loadIframe(url) {
	if (url) {
		window.open(url, '_blank');
	}
}

var $btn_download = $("#btn_download");
$btn_download.on("click", function() {
	var veri_code = $.trim($("#veri_code").val());
	if ("" == veri_code) {
		alert("请填写验证码！");
		$("#veri_code").focus();
		return false;
	}
	$btn_download.button("loading");
	setTimeout(function() {
		var book_id = $("#book_id").val();
		location.href = ctxpath + "/cs-downloadbook-" + book_id + ".txt?veri_code=" + veri_code + "&t=" + new Date().getTime();
		$btn_download.button("reset");
		$("#veri_code").val("");
	}, 1000);
	//setTimeout(function() {
		//$.post("/CsAjax.do?method=clearVeri",{},function(datas){});
	//}, 5000);
});

function completeShare(share_type) {
	// alert('share_type:' + share_type);
	//$("#veri_p").show();
//	var $btn_download = $("#btn_download");
//	$btn_download.removeAttr("disabled");
//	$btn_download.on("click", function() {
//		var veri_code = $.trim($("#veri_code").val());
//		if ("" == veri_code) {
//			alert("请填写验证码！");
//			$("#veri_code").focus();
//			return false;
//		}
//		$btn_download.button("loading");
//		setTimeout(function() {
//			var book_id = $("#book_id").val();
//			location.href = ctxpath + "/cs-downloadbook-" + book_id + ".txt?veri_code=" + veri_code;
//			$btn_download.button("reset");
//			$("#veri_code").val("");
//		}, 1000);
//	});
}