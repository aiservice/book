document.write('<div class="navbar-form navbar-left">');
document.write('<div class="input-group">');
document.write('  <input placeholder="请输入书名/作者" onkeydown="javascript:if(event.keyCode==13) search(\'key0\');" id="key0" name="key0" type="text" class="form-control" placeholder="请输入关键字" >');
document.write('  <span class="input-group-btn">');
document.write('  <button class="btn btn-primary" type="button" onclick="search(\'key0\');"><span class="glyphicon glyphicon-search"></span></button>');
document.write('  </span> </div>');
document.write('</div>');
var kw = getQueryString("keyword");
if(kw){
	document.getElementById("key0").value = kw;
}
function search(id, val) {
	var oKeyTextN = document.getElementById(id);
	var selKey = oKeyTextN.value.replace(/#/g, "%23").replace(/\+/g, "%2b");
	var url = "/search.html?keyword=";
	if ("" == selKey) {
		alert("您必须要输入要搜索的关键字，谢谢！");
		return false;
	}
	// if(app_domain){
	if (typeof app_domain != "undefined") {
		url = app_domain + url+ selKey;
	} else {
		url += selKey;
	}
	if ("undefined" == typeof (search.isSubmitted)) {
		setTimeout(function() {
			window.location.href = url;
		}, 10);
		search.isSubmitted = true;
	}
}

function setCookie(name,value,seconds) {
	var exp = new Date();
	exp.setTime(exp.getTime() + seconds*1000);
	document.cookie = name + "=" + escape (value) + ";expires=" + exp.toUTCString()+";path=/";
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	}
	return null;
}
