var kw = getQueryString("keyword");
if(kw){
	$("#key0").val(kw);
}

function search(ctx, id, val) {
	var oKeyTextN = document.getElementById(id);
	var htype = document.getElementById("htype");
	var selKey = oKeyTextN.value.replace(/#/g, "%23").replace(/\+/g, "%2b"),
	url = ctx + "/search.html?{0}keyword=",
	str = "";
	if ("" == selKey) {
		alert("您必须要输入要搜索的关键字，谢谢！");
		return false;
	}
	if (htype && ("" != htype.value)) {
		str += "htype=" + htype.value + "&";
	}
	url = url.replace("{0}", str);
	url += selKey;
	if ("undefined" == typeof(search.isSubmitted)) {
		setTimeout(function() {
			window.location.href = url;
		},
		10);
		search.isSubmitted = true;
	}
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	}
	return null;
}

function addFavorite(sURL, sTitle) { 
    try { 
        window.external.addFavorite(sURL, sTitle); 
    } catch (e) { 
        try { 
            window.sidebar.addPanel(sTitle, sURL, ""); 
        } catch (e) { 
            alert("请使用Ctrl+D进行添加"); 
        } 
    } 
}

function setCookie(name,value,seconds) {
	var exp = new Date();
	exp.setTime(exp.getTime() + seconds*1000);
	document.cookie = name + "=" + escape (value) + ";expires=" + exp.toUTCString()+";path=/";
}

function setHome(url) {
	try {
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(url);
	} catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager
						.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'");
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1']
					.getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', url);
		}
	}
}
$("#backTop").click(function(){
    $("body,html").animate({scrollTop:0},300);
    return false;
});

$("#floatPanel > .ctrolPanel > a.arrow").eq(0).click(function(){
	$("html,body").animate({scrollTop :0}, 800);
	return false;
});
$("#floatPanel > .ctrolPanel > a.arrow").eq(1).click(function(){
	$("html,body").animate({scrollTop : $(document).height()}, 800);
	return false;
});

var objPopPanel = $("#floatPanel > .popPanel");	
var w = objPopPanel.outerWidth();

$("#floatPanel > .ctrolPanel > a.qrcode").bind({mouseover:function(){
	objPopPanel.css("width","0px").show();
	objPopPanel.stop().animate({"width" : w + "px"},300);
	return false;
},mouseout : function(){
		objPopPanel.stop().animate({"width" : "0px"},300);
		return false;
		objPopPanel.css("width",w + "px");
	}	
});

function freeDownload(obj) {
	$this = $(obj);
	var book_id = $this.attr("data-bk-id");
	location.href = "/CsAjax.do?method=freeDownloadBook&book_id=" + book_id;
}
