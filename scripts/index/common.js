var FKM = FKM || {version:'1.0.0'};
FKM.host = {domain:"feiku.com",api_host:"http://home.feiku.com/"},
FKM.guid = "$FEIKU$",
FKM.config = {},
FKM.page = FKM.page || {},
FKM.page.getScrollTop = function() {
    var a = document;
    return window.pageYOffset || a.documentElement.scrollTop || a.body.scrollTop
},
FKM.page.getScrollLeft = function() {
    var a = document;
    return window.pageXOffset || a.documentElement.scrollLeft || a.body.scrollLeft
},
FKM.page.getHeight = function() {
    var a = document,
    b = a.body,
    c = a.documentElement,
    d = a.compatMode == "BackCompat" ? b: a.documentElement;
    return Math.max(c.scrollHeight, b.scrollHeight, d.clientHeight)
},
FKM.page.getWidth = function() {
    var a = document,
    b = a.body,
    c = a.documentElement,
    d = a.compatMode == "BackCompat" ? b: a.documentElement;
    return Math.max(c.scrollWidth, b.scrollWidth, d.clientWidth)
},
FKM.page.getViewHeight = function() {
    var a = document,
    b = a.compatMode == "BackCompat" ? a.body: a.documentElement;
    return b.clientHeight
},
FKM.page.getViewWidth = function() {
    var a = document,
    b = a.compatMode == "BackCompat" ? a.body: a.documentElement;
    return b.clientWidth
},
FKM.page.loadCssFile = function(a) {
    var b = document.createElement("link");
    b.setAttribute("rel", "stylesheet"),
    b.setAttribute("type", "text/css"),
    b.setAttribute("href", a),
    document.getElementsByTagName("head")[0].appendChild(b)
},
FKM.page.loadJsFile = function(a){
    var b = document.createElement("script");
    b.setAttribute("type", "text/javascript"),
    b.setAttribute("src", a),
    b.setAttribute("defer", "defer"),
    document.getElementsByTagName("head")[0].appendChild(b)
},
FKM.page.findDomAd = function(filter,dom){
	var a,b=[],c=[];
	if(typeof dom !== null && typeof dom !== "undefined"){
		a = dom;
		b = $(a).find("div")
	}else{	
		return 
	}
	var l = b.length;
	if(typeof filter === "string" && filter !== ""){
		if(l>0){
			for(var i=0;i<l;i++){
				var id = $(b[i]).attr("id");
				if(typeof id !== "undefined" && id !== "" && id.indexOf(filter)>-1){
					c.push(id)
				}
			}
			return c
		}else{
			return false
		}
	}else{
		return false
	}
},
FKM.event = FKM.event || {};
FKM.event.preventDefault = function(b) {
	var b = b || window.event;
    if(b.preventDefault){
        b.preventDefault()
    }else{
        b.returnValue = false
    }
},
FKM.preventDefault = FKM.event.preventDefault,
FKM.string = FKM.string || {},
FKM.string.encodeHTML = function(b){
    return String(b).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
},
FKM.encodeHTML = FKM.string.encodeHTML,
FKM.string.decodeHTML = function(d) {
    var c = String(d).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return c.replace(/&#([\d]+);/g,
    function(a, b){
        return String.fromCharCode(parseInt(b, 10))
    })
},
FKM.decodeHTML = FKM.string.decodeHTML,
FKM.swf = FKM.swf || {},
FKM.swf.version = (function() {
    var i = navigator;
    if (i.plugins && i.mimeTypes.length) {
        var l = i.plugins["Shockwave Flash"];
        if (l && l.description) {
            return l.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        }
    } else {
        if (window.ActiveXObject && !window.opera) {
            for (var c = 10; c >= 2; c--) {
                try {
                    var j = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + c);
                    if (j) {
                        var e = j.GetVariable("$version");
                        return e.replace(/WIN/g, "").replace(/,/g, ".")
                    }
                } catch(k) {}
            }
        }
    }
})(),
FKM.swf.createHTML = function(H) {
    H = H || {};
    var y = FKM.swf.version,
    A = H.ver || "6.0.0",
    B, D, C, E, z, i, G = {},
    u = FKM.string.encodeHTML;
    for (E in H) {
        G[E] = H[E]
    }
    H = G;
    if (y) {
        y = y.split(".");
        A = A.split(".");
        for (C = 0; C < 3; C++) {
            B = parseInt(y[C], 10);
            D = parseInt(A[C], 10);
            if (D < B) {
                break
            } else {
                if (D > B) {
                    return ""
                }
            }
        }
    } else {
        return ""
    }
    var w = H.vars,
    x = ["classid", "codebase", "id", "width", "height", "align"];
    H.align = H.align || "middle";
    H.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
    H.codebase = "http://fpload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
    H.movie = H.url || "";
    delete H.vars;
    delete H.url;
    if ("string" == typeof w) {
        H.flashvars = w
    } else {
        var t = [];
        for (E in w) {
            i = w[E];
            if (i) {
                t.push(E + "=" + encodeURIComponent(i))
            }
        }
        H.flashvars = t.join("&")
    }
    var v = ["<object "];
    for (C = 0, z = x.length; C < z; C++) {
        i = x[C];
        v.push(" ", i, '="', u(H[i]), '"')
    }
    v.push(">");
    var F = {
        wmode: 1,
        scale: 1,
        quality: 1,
        play: 1,
        loop: 1,
        menu: 1,
        salign: 1,
        bgcolor: 1,
        base: 1,
        allowscriptaccess: 1,
        allownetworking: 1,
        allowfullscreen: 1,
        seamlesstabbing: 1,
        devicefont: 1,
        swliveconnect: 1,
        flashvars: 1,
        movie: 1
    };
    for (E in H) {
        i = H[E];
        E = E.toLowerCase();
        if (F[E] && i) {
            v.push('<param name="' + E + '" value="' + u(i) + '" />')
        }
    }
    H.src = H.movie;
    H.name = H.id;
    delete H.id;
    delete H.movie;
    delete H.classid;
    delete H.codebase;
    H.type = "application/x-shockwave-flash";
    H.pluginspage = "http://www.macromedia.com/go/getflashplayer";
    v.push("<embed");
    var k;
    for (E in H) {
        i = H[E];
        if (i) {
            if ((new RegExp("^salign\x24", "i")).test(E)) {
                k = i;
                continue
            }
            v.push(" ", E, '="', u(i), '"')
        }
    }
    if (k) {
        v.push(' salign="', u(k), '"')
    }
    v.push("></embed></object>");
    return v.join("")
},
FKM.swf.create = function(e, f) {
    e = e || {};
    var d = FKM.swf.createHTML(e) || e.errorMessage || "";
    if (f && "string" == typeof f) {
        f = document.getElementById(f)
    }
    if (f) {
        f.innerHTML = d
    } else {
        document.write(d)
    }
},
FKM.date = FKM.date || {},
FKM.number = FKM.number || {},
FKM.number.pad = function(a, b) {
    var c = "",
    d = a < 0,
    e = String(Math.abs(a));
    return e.length < b && (c = (new Array(b - e.length + 1)).join("0")),
    (d ? "-": "") + c + e
},
FKM.date.format = function(a, b) {			//FKM.date.format((t*1000),"yyyy-MM-dd HH:mm")
    function c(a, c) {
        b = b.replace(a, c)
    }
    if ("string" != typeof b) return a.toString();
    var d = FKM.number.pad,
    e = a.getFullYear(),
    f = a.getMonth() + 1,
    g = a.getDate(),
    h = a.getHours(),
    i = a.getMinutes(),
    j = a.getSeconds();
    return c(/yyyy/g, d(e, 4)),
    c(/yy/g, d(parseInt(e.toString().slice(2), 10), 2)),
    c(/MM/g, d(f, 2)),
    c(/M/g, f),
    c(/dd/g, d(g, 2)),
    c(/d/g, g),
    c(/HH/g, d(h, 2)),
    c(/H/g, h),
    c(/hh/g, d(h % 12, 2)),
    c(/h/g, h % 12),
    c(/mm/g, d(i, 2)),
    c(/m/g, i),
    c(/ss/g, d(j, 2)),
    c(/s/g, j),
    b
},
FKM.date.parse = function(a) {
    var b = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+$");
    if ("string" == typeof a) {
        if (b.test(a) || isNaN(Date.parse(a))) {
            var c = a.split(/ |T/),
            d = c.length > 1 ? c[1].split(/[^\d]/) : [0, 0, 0],
            e = c[0].split(/[^\d]/);
            return new Date(e[0] - 0, e[1] - 1, e[2] - 0, d[0] - 0, d[1] - 0, d[2] - 0)
        }
        return new Date(a)
    }
    return new Date
},
FKM.cookie = FKM.cookie || {},
FKM.localstore = FKM.localstore || {},
FKM._isSupportLocal = function(){
	if(window.localStorage)return window.localStorage;	
	return false;
},
FKM.localstore.get = function(a){
	var _isSupport = FKM._isSupportLocal();
	if(_isSupport)return window.localStorage.getItem(a);
	return FKM.cookie.get(a);
},
FKM.localstore.set = function(a, b, c){
	var _isSupport = FKM._isSupportLocal();
	if(_isSupport)window.localStorage.setItem(a, b);
	FKM.cookie.set(a, b, c);
},
FKM.localstore.remove = function(a, b){
	var _isSupport = FKM._isSupportLocal();
	if(_isSupport)window.localStorage.removeItem(a); 
	FKM.cookie.remove(a,b);
},
FKM.cookie._isValidKey = function(a) {
    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$')).test(a)
},
FKM.cookie.getRaw = function(a) {
    if (FKM.cookie._isValidKey(a)) {
        var b = new RegExp("(^| )" + a + "=([^;]*)(;|$)"),
        c = b.exec(document.cookie);
        if (c) return c[2] || null
    }
    return null
},
FKM.cookie.get = function(a) {
    var b = FKM.cookie.getRaw(a);
    return "string" == typeof b ? (b = decodeURIComponent(b), b) : null
},
FKM.cookie.setRaw = function(a, b, c) {
    if (!FKM.cookie._isValidKey(a)) return;
    c = c || {};
    var d = c.expires;
    "number" == typeof c.expires && (d = new Date, d.setTime(d.getTime() + c.expires)),
    document.cookie = a + "=" + b + (c.path ? "; path=" + c.path: "") + (d ? "; expires=" + d.toGMTString() : "") + (c.domain ? "; domain=" + c.domain: "") + (c.secure ? "; secure": "")
},
FKM.cookie.remove = function(a, b) {
    b = b || {},
    b.expires = new Date(0),
    FKM.cookie.setRaw(a, "", b)
},
FKM.cookie.set = function(a, b, c) {
    FKM.cookie.setRaw(a, encodeURIComponent(b), c)
},
FKM.JSON = FKM.JSON || {},
FKM.JSON = jQuery.parseJSON,
FKM.url = FKM.url || {},
FKM.url.encode = function(str) {
	var base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64decodechars = new Array(
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
	-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
	-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64encodechars.charAt(c1 >> 2);
            out += base64encodechars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64encodechars.charAt(c1 >> 2);
            out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += base64encodechars.charAt((c2 & 0xf) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64encodechars.charAt(c1 >> 2);
        out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        out += base64encodechars.charAt(c3 & 0x3f);
    }
    return out;
}
FKM.url.decode = function(str) {
	var base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64decodechars = new Array(
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
	-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
	-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
       
        do {
            c1 = base64decodechars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

       
        do {
            c2 = base64decodechars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

       
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64decodechars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;

        out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64decodechars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
},
FKM.dialog = FKM.dialog || {},
FKM.dialog.login = function(){	
	var cntUrl = FKM.url.encode(window.location.href);
	var msg = '<div class="login_main">'
		    + '<div class="login_title">'
			+  '<h3>登录</h3><span id="ymclose" class="sp_gb"><img src="'+FKM.config.imgHost+'user/images/dlk_03.jpg" /></span>'
			+  '</div>'
				+  '<div class="login_left">'
				+  '<form action="">'
				  +  '<p class="p_01"><span class="sp_name">账户：</span><span class="sp_txt"><input name="username" id="username" data="u1" type="text" /></span></p>'
				  +  '<p class="p_01"><span class="sp_name">密码：</span><span class="sp_txt"><input name="password" id="password" data="p1" type="password" /></span></p>'
				  +  '<p class="p_01" id="validImg" style="display:none"><span class="sp_name">验证码：</span><span class="sp_txt"><input name="validCode" id="validCode" data="p1" type="text" /></span><span class="imglog"><img id="captchaImg" src="http://www.kanshu.com/new/login/vdimgck/user/vc?rnd='+Math.random()+'"></span></p>'
				  +  '<p class="p_02"><label><input type="checkbox" id="saveLogin" value="1" />记住我</label><img src="'+FKM.config.imgHost+'user/images/wssy_52.jpg" /><a href="/user/findPassword">找回密码</a></p>'
					+  '<p class="p_03"><input name="" type="button" value="登 录" id="login" /></p>'
				+  '</form>'
			+  '</div>'
			+  '<div class="login_right">'
				+  '<h3>还没有飞库网账号？ <a href="/user/pcRegister?reurl='+cntUrl+'">立即注册</a></h3>'
				+  '<p>你也可以用站外账号登录：</p>'
				+  '<div class="qiya">'
					+  '<span><a href="javascript:void(0);" onclick="ortherLogin(\'sina\');return false;"><img src="'+FKM.config.imgHost+'user/images/sina_denglu.png" /></a></span>'
					+  '<span><a href="javascript:void(0);" onclick="ortherLogin(\'renren\');return false;"><img src="'+FKM.config.imgHost+'user/images/renren_b.PNG" width="126" height="24"/></a></span>'
					+  '<span><a href="javascript:void(0);" onclick="ortherLogin(\'qq\');return false;"><img src="'+FKM.config.imgHost+'user/images/qq_denglu.png" /></a></span>'
	
				+  '</div>'
			+  '</div>'
		+  '</div>';
	
	ymPrompt.confirmInfo({btn:'',icoCls:'',msgCls:'confirm',message:msg,titleBar:false,useSlide:true,autoClose:false,width:640,height:310});
	$("#login").unbind().bind("click",function(){FKM.usr.login()});
	$("#captchaImg").unbind().bind("click",function(){FKM.dialog.changeValid()});
	$("#ymclose").unbind().bind("click",function(){FKM.dialog.close()})
},
FKM.dialog.alert = function(s, btn, url){
	var padding = '';
	if(!btn){
		btn = '关  闭'
	}else{
		padding = 'style="padding-left:8px;" '
	}	
	var html = '<div class="popwrap">'
			   +   '<div class="title">提示</div>'
			   +   '<div class="content">'+s+'</div>'
			   +   '<div class="btnbox"><a href="javascript:void(0);" id="btnClose" '+padding+'>'+btn+'</a>'
			   +   '</div>';
	ymPrompt.confirmInfo({btn:'',icoCls:'',msgCls:'confirm',message:html,titleBar:false,useSlide:true,autoClose:true,width:318,height:160});
	if(url)$("#btnClose").attr("href",url);
	setTimeout(function(){FKM.dialog.close()},3000);
	$("#btnClose").unbind().bind("click",function(){FKM.dialog.close()})
},
FKM.alert = FKM.dialog.alert,
FKM.dialog.close = function(){
	ymPrompt.close();
},
FKM.dialog.changeValid = function(){
	try{document.getElementById('captchaImg').src= FKM.config.domain+'/feiku/login/vdimgck?rnd='+Math.random();}catch(e){};
},
FKM.dialog.down = function(obj){
	var bid = $(obj).attr("data-bk-id"), bname = $(obj).attr("data-bk-name"), html = "";
	if("string" !== typeof bid && "" == bid)return;
	html =  '<div class="pop_down" id="pop_down_apk">'
			+'   <div class="pop_win">'
			+'	    <div class="pop_content">'
			+'	   	   <div class="down_tit"><h3><b>'+bname+'</b>电子书免费下载</h3></div>'
			+'		   <div class="down_box">'
			+'				<ul class="clearfix">'
			+'					<li>'
			+'						<div class="down_item down_book_apk">'
			+'							<p class="item_qr"><img src="images/qrcode.jpg" width="120" height="120" /></p>'
			+'							<p class="item_txt">扫描二维码下载APK<br />(适合安卓智能手机)</p>'
			+'							<p class="item_btn"><a href="##">下载APK文件<i class="icon_apk"></i></a></p>'
			+'						</div>'
			+'					</li>'
			+'					<li>'
			+'						<div class="down_item down_book_txt">'
			+'							<p class="item_qr"><img src="images/qrcode.jpg" width="120" height="120" /></p>'
			+'							<p class="item_txt">扫描二维码下载TXT<br />(适合绝大多数设备)</p>'
			+'							<p class="item_btn"><a href="##">下载TXT文本<i class="icon_txt"></i></a></p>'
			+'						</div>'
			+'					</li>'
			+'				 </ul>'
			+'         </div>'
			+'		   <div class="down_tip"><span>离线：不用联网随便看</span><span>完本：无需坐等更新</span><span>免费：下载不收费</span></div>'
			+'		   <div class="down_ios"><p>海量小说免费看，精品排行榜，极致阅读新体验，就在<a href="https://itunes.apple.com/cn/app/fei-ku-jing-pin-xiao-shuo/id718023691?mt=8" target="_blank">飞库ios客户端<i></i></a></p></div>'
			+'	   </div>'
			+'	</div>'
			+'</div>';
	
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.host.api_host + "iframe/book/bookImg2d",
		data: "book_id=" + bid,
		async:false,
		success: function(data){
			var json = data,
				request = json.result.status.code,
				msg	 = json.result.status.msg;
			if(0==request){
				var popdown = art.dialog({id:"popdown",lock:true,fixed:true,resize:false,padding:'0 0',content:html});
				var downwrap = $("#pop_down_apk");
				var data = json.result.data || {},
					bk_name = json.result.data.title || bname,
					apk_url = json.result.data.apk_dl_url || "",
					txt_url = json.result.data.txt_dl_url || "",
					apk_qr = json.result.data.apk_2d_url || "",
					txt_qr = json.result.data.txt_2d_url || "";
				if(bk_name!=="")downwrap.find(".down_tit b").html(bk_name);
				if(apk_url!==""){
					downwrap.find(".down_book_apk .item_qr img").attr("src",apk_qr);
					downwrap.find(".down_book_apk .item_btn a").attr("href",apk_url);
				}else{
					downwrap.find(".down_book_apk").parent().hide()
				}
				if(txt_url!==""){
					downwrap.find(".down_book_txt .item_qr img").attr("src",txt_qr);
					downwrap.find(".down_book_txt .item_btn a").attr("href",txt_url)
				}else{
					downwrap.find(".down_book_txt").parent().hide()
				}
			}else{
				return
			}
		},
		error:function(){
		}
	})
},
FKM.down = FKM.dialog.down,
FKM.ajax = FKM.ajax || {},
FKM.ajax.HttpRequest = function (){
	if (window.ActiveXObject) {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP")
		} catch(a) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP")
			} catch(a) {}
		}
	}
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest()
	}
}
FKM.ajax.getJSONP = function(url,callback){
	var url1 = url;
	var cbnum = "cb" + FKM.getJSONP.counter ++;
	var cbname = "FKM.getJSONP."+cbnum;
	if(url1.indexOf("?") === -1){
		url1 +="?callback="+cbname;
	}else{
		url1 +="&callback="+cbname;
	}
	var script = document.createElement("script");
	FKM.getJSONP[cbnum] = function(response){
		try{
			callback(response)
		}finally{
			delete 	FKM.getJSONP[cbnum];
			script.parentNode.removeChild(script)
		}
	}
	script.src = url1;
	document.body.appendChild(script)
},
FKM.getJSONP = FKM.ajax.getJSONP,
FKM.getJSONP.counter = 0,
FKM.usr = FKM.usr || {},
FKM.usr.uname = "",
FKM.usr.login = function(){
	var uname = $('#username').val(),
		psw = $('#password').val(),
		validCode   = $('#validCode').val(),
		isSave	= $('#saveLogin').attr('checked'),
		saveLogin	= 0;
	if(true == isSave) {
		saveLogin = 1
	}
	if("" == uname){
		alert("请输入用户名！");
		return
	}else if("" == psw){
		alert("请输入密码！");
		return
	}else{
		$('#login').val('正在登录...');
		$('#login').attr('disabled', 'disabled');
		$.ajax({
			type: "GET",
			url:  FKM.config.domain + "login/auth",//FKM.config.domain +'/login.php',
			dataType:"jsonp",
			data: {passwd:psw,saveLogin:saveLogin,username:uname,validCode:validCode},
			success:function(data){
				if(data == 111){
					$("#top_logout").bind("click",function(){
						FKM.usr.loginOut()
					});
					$('#login').val('登录');
					setTimeout(function(){
						$('#login').removeAttr('disabled');
					},3000);
					try{
						FKM.dialog.close();
						FKM.usr.islogin()
					}catch(e){}
				}else{
					var json = data;
					if(json.erpw >= 3){
						$('#validImg').show();
						FKM.dialog.changeValid();
					}
					$('#login').val('登录');
					setTimeout(function(){
						$('#login').removeAttr('disabled');
					},3000);
					return 
				}
			},
			error:function(){
				alert("请求失败");
				$('#login').val('登录');
				setTimeout(function(){
					$('#login').removeAttr('disabled');
				},3000);
			}
		});
	}
},
FKM.usr.islogin = function(){
	var a = $("#top_login").attr("href"),
		b = $("#top_reg").attr("href"),
		cururl = window.location.href,
		jumpa = "",jumpb = "",logout = FKM.host.api_host+"login/loginOut";
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.host.api_host + "feiku/user/info", //"/reward.php",
		success: function(data){
			var json = data,
				request = json.result.status.code,
				msg	 = json.result.status.msg;
			if(0 == request){
				var	isauth = json.result.data.is_author,
					nname = json.result.data.name || json.result.data.uname,
					aname = json.result.data.author || nname,
					url = "";
				online = $("#top_user .online").find(".uname");
				if(isauth==1){
					FKM.usr.uname = aname;
					url = FKM.host.api_host + "author/authorinfo/center/";
					online.html(aname);
					online.attr("href",url)
				}else{
					FKM.usr.uname = nname;
					url = FKM.host.api_host +"feiku/userinfo/";
					online.html(nname);
					online.attr("href",url)
				}
				$("#top_user .offline").hide();
				$("#top_user .online").show();
				$("#top_logout").attr("href",logout).bind("click",function(){
					FKM.usr.loginOut()
				});
			}else{
				jumpa = a + '?resurl='+cururl;
				jumpb = b + '?resurl='+cururl;
				$("#top_login").attr("href",jumpa);
				$("#top_reg").attr("href",jumpb)
			}
		},
		error: function(){
		}
	})
},
FKM.usr.loginpage = function(type){
	var cururl = window.location.href,
		jump = 'feiku/userinfo/jumpPage?type='+type+'&url='+cururl;
	window.location.href = FKM.config.domain + jump;
},
FKM.usr.loginOut = function(){
	$("#top_user .uname").html("");
	$("#top_user .online").hide();
	$("#top_user .offline").show()
},
FKM.usr.record = function(key,host,bid,bname,cid,cname,time){
	var book="",list="",arg=[],isadd=true,json,last = FKM.localstore.get(key), 
		domain = FKM.host.domain || "feiku.com";
	var stamp=Math.round(new Date().getTime()/1000);
	if("string" == typeof key){
		if(last){
			var json = last.replace("\\","");
			json = FKM.JSON(json);
			book = '{"bookid":"'+bid+'","bookname":"'+bname+'","chapid":"'+cid+'","chapname":"'+cname+'","time":"'+stamp+'","host":"'+host+'"}';
			var l = json.record.length;
			if(l>0){
				for(var i=0;i<l;i++){
					if(bid == json.record[i].bookid){
						json.record[i].bookname = bname;
						json.record[i].chapid = cid;
						json.record[i].chapname = cname;
						json.record[i].time = stamp;
						json.record[i].host = host;
						isadd = false
					}
					arg[i] = JSON.stringify(json.record[i])
				}
				isadd?arg.push(book):arg;
				m = arg.length;
				if(m>10)arg.shift();
				if(1 == m){
					list = '{"record":['+arg[0]+']}'
				}else{
					list = arg.join(",");
					list = '{"record":['+list+']}'
				}
				//console.log(list);
			}
			FKM.localstore.set(key,list,{ path: '/',expires: time,domain: domain});
		}else{
			book = '{"record":[{"bookid":"'+bid+'","bookname":"'+bname+'","chapid":"'+cid+'","chapname":"'+cname+'","time":"'+stamp+'","host":"'+host+'"}]}';
			FKM.localstore.set(key,book,{ path: '/',expires: time,domain: domain});
		}
	}
},
FKM.usr.read = function(key,dom,type){
	var last="",dom,html="",bid="",bname="",cid="",cname="",host="";
	last = FKM.JSON(FKM.localstore.get(key));
	dom = $(dom);
	if("string" == typeof key){
		if(last){
			var l = last.record.length;
			if(l>0){
				for(var i=l-1;i>=0;i--){
					bid = last.record[i].bookid;
					bname = last.record[i].bookname;
					cid	= last.record[i].chapid;
					cname = last.record[i].chapname;
					host = last.record[i].host;
					if(bid && bname && cid && cname){
						if(type){
							html += '<dd>'
								 + '    <span class="col_bname"><a href="'+host+bid+'" title="'+bname+'">'+bname+'</a></span>'
								 + '    <span class="col_opt"><a href="'+host+bid+'/'+cid+'" title="'+cname+'">继续阅读</a> | <em id="recentDel">删除</em></span>'
								 + '</dd>';
						}else{
							html += '<li>'
								 + '    <a href="'+host+bid+'" title="'+bname+'">'+bname+'</a>'
								 + '    <span><a href="'+host+bid+'/'+cid+'" title="'+cname+'">'+cname+'</a></span>'
								 + '</li>';
						}
					}
					
				}
				if(type){
					dom.find("dl").html(html)
				}else{
					dom.find("ul").html(html)
					dom.parent().show()
				}
				
			}
		}
	}
},
FKM.usr.bookcase = FKM.usr.bookcase || {},
FKM.usr.bookcase.add = function(bid, bname, obj){		//收藏/书架功能
	var btn = $(obj),
		__isAdded = btn.attr("data-opt");
    if(__isAdded == "1") {
        btn.attr("data-opt","2");
    }else{
        return
    }
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.config.domain + "iframe/book/addBookrack", //"/reward.php",
		data: "book_id=" + bid,
		success: function(data){
			var json = data,
				request = json.result.status.code,
				msg	 = json.result.status.msg;
			if(request == 9999){
				FKM.usr.loginpage(4);
				//FKM.dialog.login();
				setTimeout(function(){
					btn.attr("data-opt","1");	
				},3000)
			}else if(request == 0) {
				FKM.alert('作品《' + bname + '》收藏成功。');
				setTimeout(function(){
					btn.attr("data-opt","1");	
				},3000)
				
			}else{
				FKM.alert(msg)
			}
		},
		error:function(){
			FKM.alert("请求失败！")
			setTimeout(function(){
				btn.attr("data-opt","1");	
			},3000)
		}
	})
    
},
FKM.usr.bookmark = FKM.usr.bookmark || {},
FKM.usr.bookmark.add = function(bid,cid,cname,obj){	//加入书签
	var btn = $(obj),
		__isAdded = btn.attr("data-opt");
    if(__isAdded == "1") {
        btn.attr("data-opt","2");
    }else{
        return
    }
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.config.domain + "iframe/book/addLabel", //"/reward.php",
		data: {"book_id":bid,"chapter_id":cid},
		success: function(data){
			var json = data,
				request = json.result.status.code,
				msg	 = json.result.status.msg;
			if(request == 9999){
				//FKM.dialog.login();
				FKM.usr.loginpage(6);
				setTimeout(function(){
					btn.attr("data-opt","1");	
				},3000)
			}else if(request == 0) {
				FKM.alert('加入书签成功！');
				setTimeout(function(){
					btn.attr("data-opt","1");	
				},3000)
				
			}else{
				FKM.alert(msg);
				setTimeout(function(){
					btn.attr("data-opt","1");	
				},3000)

			}
		},
		error:function(){
			FKM.alert("请求失败！")
			setTimeout(function(){
				btn.attr("data-opt","1");	
			},3000)
		}
	})
},
FKM.usr.recommand = function(bid,obj){			//推荐
	var btn = $(obj);
	var __isAdded = btn.attr("data-opt");
    if(__isAdded == "1"){
        btn.attr("data-opt","2");
    }else{
        return
    }    
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: FKM.host.api_host + "iframe/book/addCommend",
		data: "book_id="+bid,
        success: function(data) {
			var json = data,
				request = json.result.status.code,
				msg	 = json.result.status.msg;
			if(request == 0){
				FKM.alert("推荐成功，谢谢您的支持！")
				if(btn.hasClass("icon")){
					btn.find("b").html("已推荐")
				}else{
					btn.addClass("cur").html("已推荐")
				}
			}else{
				FKM.alert(msg)
				if(btn.hasClass("icon")){
					btn.find("b").html("已推荐")
				}else{
					btn.addClass("cur").html("已推荐")
				}
            }
            return
        },
		error:function(){
			FKM.alert("请求失败！")
			setTimeout(function(){
				btn.attr("data-opt","1");	
			},3000)
		}
    })
},
FKM.usr.recomHtml = function(info){			//推荐月票弹出层
	var balance = info.tiket,
		html = '<div class="hh_demo" id="recomm_tiket">'
				+ '<div class="hh_tit">'
                + '   <h3><span>我要投票</span></h3>'
				+ '	  <b class="sp_gb" onclick="ymPrompt.close();">x</b>'
				+ '</div>'
				+ '<div class="hh_box" id="mm_100">'
				+ 	 '<h3 class="p_01">这书写的很出色，我决定投月票：</h3>'	
				+ 	 '<div class="ul_box">'
				+ '     <ul class="clearfix">';
	if(balance>=0){
		for(var i=0;i<10;i++)
		{
			if(i==0 && balance==0)
			{
				html+='<li><label><input type="radio" value="'+(i+1)+'" name="radiotikets"disabled="disabled">投'+(i+1)+'票</label></li>'
			}else{
				if(balance<(i+1)){
					html+='<li><label><input type="radio" value="'+(i+1)+'" name="radiotikets" disabled="disabled">投'+(i+1)+'票</label></li>'
				}else{
					html+='<li><label><input type="radio"value="'+(i+1)+'" name="radiotikets">投'+(i+1)+'票</label></li>'
				}
			}
		}
		html += '    </ul>'				
			 + '  </div>'					
			 + '  <p>您总共有 <b>'+ balance +'</b> 张月票。<a href="##" target="_blank" class="a_blue">如何获得月票？</a></p>'	
			 + '  <div class="btn_div"><a href="javascript:void(0);" id="btn_tiket">确定</a><a href="javascript:void(0);" id="btnClose" class="qx">取消</a></div>'
	}
	ymPrompt.confirmInfo({btn: '',icoCls: '',msgCls: 'confirm',message: html,titleBar: false,useSlide: true,autoClose: false,width: 508,height: 270});
	if(balance==0){
		$("#btn_tiket").unbind().bind("click",function(){
			alert("您的余额不足，请充值！")
		})
	}else{
		$("#btn_tiket").unbind().bind("click",function(){
			FKM.usr.recomCheckin(info.bid)
		})
	}
	$("#btnClose").unbind().bind("click",function(){
		FKM.dialog.close()
	})
},
FKM.usr.recomCheckin = function(bid){			//推荐月票提交
	var tiket = $('#recomm_tiket').find("input[name='radiotikets']:checked").val();
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.config.domain + "iframe/book/flower",//"/reward.php",
		data: "book_id="+bid+"&coin="+tiket,
		success: function(data){
		   var json = data,
			   request = json.result.status.code,
			   msg = json.result.status.msg;
		   if(request == 0){
			   alert('恭喜您，投月票成功!');
			   FKM.dialog.close()
		   }else if(request == 9999){
			   alert("请先登录！");			   
			   //FKM.dialog.login()
		   }else{
		   	   alert(msg)   
		   }
	   }		
	})
},
FKM.usr.reward = function(bid,obj) {			//打赏功能模块
    var btn = $(obj);
	var __isAdded = btn.attr("data-opt");
    if(__isAdded == "1"){
        btn.attr("data-opt","2");
    }else{
        return
    }    
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: FKM.config.domain + "iframe/book/getUserInfo",//"/reward.php",
		//data:{recomm:1}, 
        success: function(data) {
			var json = data,
				request = json.result.status.code,
				msg	 = json.result.status.msg;
            if(request == 9999){
                //FKM.dialog.login();
				FKM.usr.loginpage(1);
				setTimeout(function(){
					btn.attr("data-opt","1");	
				},3000)
            }else if(request !== 0){
				FKM.alert(msg);
				setTimeout(function(){
					btn.attr("data-opt","1");	
				},3000)
			}else{
                var info = {bid:bid, gold:json.result.data.gold, uid:json.result.data.uid};
                FKM.usr.rewardHtml(info);
            }
			setTimeout(function(){
				btn.attr("data-opt","1");	
			},3000)
        },
		error:function(){
			FKM.alert("请求失败！")
			setTimeout(function(){
				btn.attr("data-opt","1");	
			},3000)
		}
    })
},
FKM.usr.rewardHtml = function(info){			//打赏弹出层
	var uid = info.bid,
		balance = info.gold,
		radio = [100,200,500,800,1000,1500,2000,3000];
		html = "", disabled = '';
	
	html = '<div class="hh_demo" id="reward_win">'
			+ '<div class="hh_tit">'
			+ '   <h3><span>我要打赏</span></h3>'
			+ '	  <b class="sp_gb" onclick="ymPrompt.close();">X</b>'
			+ '</div>'
			+ '<div class="hh_box" id="mm_100">'
			+ '   <h3 class="p_01">这书写的很出色，我决定 打赏本书：</h3>'	
			+ '   <div class="ul_box u2">'
			+ '      <ul class="clearfix">'

	for(var i in radio){
		if(balance < radio[i]){
			disabled = ' disabled="disabled" ';
		}
		if(i==0){			
			html += '<li><label><input  type="radio" name="RadioReward" value="'+radio[i]+'"'+disabled+'/><span>'+radio[i]+'飞币</span></label></li><span>';
		}else if(i<5){		
			html += '<li><label><input type="radio" name="RadioReward" value="'+radio[i]+'" '+disabled+' /><span>'+radio[i]+'飞币</span></label></li><span>';
		}else if(i==5){
			html += '<li><label><input type="radio" name="RadioReward" value="'+radio[i]+'" '+disabled+'/><span>'+radio[i]+'飞币</span></label></li><span>';
		}else{
			html += '<li><label><input type="radio" name="RadioReward" value="'+radio[i]+'" '+disabled+'/><span>'+radio[i]+'飞币</span></label></li><span>';			
		}	
	}
	
	html += ' </ul>'			
		 + '</div>'	
		 + '  <p class="p_01">您当前的剩余<b>'+ balance +'</b>飞币 <a href="##" class="a_blue">我要充值</a></p>'	
		 + '  <div class="btn_div"><a href="javascript:void(0);" id="btn_reward">确定</a><a href="javascript:void(0);" id="btnClose" class="qx">取消</a></div>'
		 + '  </div>'	
		 + '</div>';
	
	ymPrompt.confirmInfo({btn: '',icoCls: '',msgCls: 'confirm',message: html,titleBar: false,useSlide: true,autoClose: false,width: 508,height: 270});
	if(balance==0 || balance<radio[0]){
		$("#btn_reward").unbind().bind("click",function(){
			alert("您的余额不足，请充值！")
		})
	}else{
		$("#btn_reward").unbind().bind("click",function(){
			FKM.usr.rewardCheckin(info.bid)
		})
	}
	$("#btnClose").unbind().bind("click",function(){
		FKM.dialog.close()
	})
},
FKM.usr.rewardCheckin = function(bid){			//打赏提交
	var coin = $("#reward_win").find("input[name='RadioReward']:checked").val(),
		record = $("#rewardRec"),
		newrec = "";
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.config.domain + "iframe/book/dashang",//"/reward.php", 
		data: "book_id="+bid+"&coin="+coin,
		success: function(data){
		   var json = data,
			   request = json.result.status.code,
			   msg = json.result.status.msg;
		   if(request == 9999){
			   alert('请先登录！');
			   //FKM.dialog.close();
			   //FKM.dialog.login()
		   }else if(request == 0){
			   alert('恭喜您，打赏作者成功!');
			   /*if(FKM.usr.uname != "" && FKM.usr.uname != null){
				   var date = new Date(),
				       len = record.find("ul li").length,
					   span = record.find("ul li span").length;
				   newrec = '<li>'+ FKM.usr.username +' 打赏了 <span class="org">'+ coin +'</span> 飞币 <span class="rec_time">'+ date +'</span>';
				   if(len == 5){
					   record.find('ul li:last').remove();
				   	   record.find('ul').prepend(newrec)
				   }else if(len < 5){
				   	   record.find('ul').prepend(newrec)
				   }else if(span<=0){
					   record.find('ul').html(newrec)   
				   }
			   }*/
			   FKM.dialog.close()
		   }else{
		   	   FKM.alert(msg)   
		   }
	   }		
	})
},
FKM.comment = FKM.comment || {},
FKM.comment.sendMsg = function(bid,o,b){
	b.attr('disabled', 'disabled');
	var content = encodeURI(o.val()),
		countLen = FKM.comment.countLen,
		len = countLen(content);
	if(content != ''){
		if(len > 800){
			b.attr('disabled', '');			
			FKM.alert("对不起，评论文字不能超过800！")
		}else{
			b.addClass("hover").val("正在发送");
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: FKM.config.domain + 'iframe/book/addComment',//"/comment.php",
				data: {content:content, book_id:bid},
				success: function(data){
					var json = data,
						request = json.result.status.code,
						msg	 = json.result.status.msg;
					if(request == 9999){
						//FKM.dialog.login();
						FKM.usr.loginpage(3);
						setTimeout(function(){
							b.removeClass("hover").removeAttr('disabled')
						},3000)	
					}else if(request == 0){
						FKM.alert("评论已发送成功，请稍后查看");
						/*var comment = json.result.data.comment,
							wid	= comment.weibo_id,
							content = decodeURI(comment.content),
							sum = 0,
							date = FKM.date.format(new Date(comment.time*1e3),"yyyy-MM-dd HH:mm"),
							avatSrc = comment.bigImg,
							nopic = comment.nopicimg
							uname = comment.uname || comment.name || comment.author,
							newMsg = '<li id='+ wid +'>'
									  +  '<div class="comment_avat fl"><img src="'+ avatSrc +'" /></div>'
									  +  '<div class="comment_info">'
									  +  '<div class="usr_info">'
									  +  '    	<span class="usr_link fr"> <a href="##" class="num_reply">回复（<b>'+ sum +'</b>）</a></span>'
									  +  '     	<a href="##">'+ uname +'</a>'
									  +  '		<span class="commetn_time">'+ date +'</span> </div>'
									  +  '      <div class="usr_comment">'+ content +'</div>'
									  +  '  </div>'
									+  '</li>';
						
						$('#cmt_list').prepend(newMsg);					
						$('#cmt_list').find("a.num_reply").bind('click',function(){
							FKM.comment.showReply(bid,wid)	
						});*/
						o.val("");
						$("#msgLen").find("b").html("800");
						setTimeout(function(){
							b.removeClass("hover").removeAttr('disabled')
						},3000)	
					}else{
						FKM.alert(msg)
						setTimeout(function(){
							b.removeClass("hover").removeAttr('disabled')
						},3000)	
					}
					b.val("发 表");
				},
				error: function(){
					FKM.alert("请求失败！")
					setTimeout(function(){
						b.removeClass("hover").removeAttr('disabled')
					},3000)	
				}
			})
		}
	}else{
		FKM.alert('内容不能为空');
		setTimeout(function(){
			b.removeClass("hover").removeAttr('disabled')
		},3000)
		b.val("发 表");
	}
},
FKM.comment.showReply = function(bid,wid){
	var wid = wid, obj = $('#'+wid),
		html = '<div class="comment_reply">'
             + '    <p class="reply_box"><textarea name="reply_txt" id="reply_txt"></textarea></p>'
             + '    <p class="reply_btn"><a href="javascript:;" rel="'+ wid +'" id="rep_btn">回 复</a></p>'
             + '    <div class="reply_list clearfix">'
			 + '		<ul><li class="loading">正在加载...</li></ul>'
			 + '	</div>'
			 + '</div>';
	var cmt_wrap = obj.find('.comment_info'),
		rep_btn = obj.find('.num_reply');
	if(!rep_btn.hasClass("opened")){
		cmt_wrap.append(html);
		cmt_wrap.find('.comment_reply').show();
		rep_btn.addClass("opened");
		obj.find('#rep_btn').unbind().bind('click',function(){FKM.comment.sendReply(bid,wid)});
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			url: FKM.config.domain + 'iframe/book/replyList',//"/comment.php",
			data: {comment_id:wid},
			success: function(data){
				var json = data,
					request = json.result.status.code,
					msg	 = json.result.status.msg;
				if(request == 9999){
					//FKM.dialog.login();
					FKM.usr.loginpage();
				}else if(request == 0){					
					var replist = json.result.data.list,
						length = replist.length,
						newlist = [],
						newhtml = "";
					if(length>0){
						for(var i=0; i<length; i++){
							var reply = replist[i],
								wid	= reply.weibo_id || wid,
								rid	= reply.pl_id,
								uid	= reply.uid,
								content = reply.content,
								sum = reply.pinglun_num,
								date = FKM.date.format(new Date(reply.time*1e3),"yyyy-MM-dd HH:mm"),
								avatSrc = reply.smallImg,
								nopic = reply.nopicimg,
								uname = reply.uname || reply.name || reply.author;					
								newlist[i] = '<li id="'+ rid +'">'
										   + '    <div class="reply_avat fl"><img src="'+ avatSrc +'" onerror="this.onerror=\'\';this.src=\''+nopic+'\'" /></div>'
										   + '    <div class="reply_info"><a href="##">'+ uname +'</a>'
										   + '		<span class="commetn_time">'+ date +'</span><br/>'+ content
										   + '    </div>'
										   + '<li>'
						}
						newhtml = newlist.join("")
					}
					cmt_wrap.find(".reply_list ul").html(newhtml);
					
				}else{
					FKM.alert(msg)
				}
			}
		})
	}else{
		rep_btn.removeClass("opened");
		cmt_wrap.find('.comment_reply').remove();
	}
},
FKM.comment.sendReply = function(bid,wid){
	var	txt_rep = $("#"+wid).find("#reply_txt"),
		btn_rep = $("#"+wid).find("#rep_btn"),
		rep_list = $("#"+wid).find(".reply_list ul"),
		content = encodeURI(txt_rep.val()),
		len = FKM.comment.countLen(content);
	if(content != ''){
		btn_rep.attr('disabled', 'disabled');
		if(len > 140){
			FKM.alert("对不起，评论回复不能超过140！");
			setTimeout(function(){
				btn_rep.removeAttr('disabled')
			},3000)
		}else{
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: FKM.config.domain + 'iframe/book/reply',//"/comment.php",
				data: {content:content, book_id:bid, weibo_id:wid},
				success: function(data){
					var json = data,
						request = json.result.status.code,
						msg	 = json.result.status.msg;
					if(request == 9999){
						//FKM.dialog.login();
						FKM.usr.loginpage(5);
						setTimeout(function(){
							btn_rep.removeAttr('disabled')
						},3000)
					}else if(request == 0){
						var reply = json.result.data.reply;
							wid	= reply.weibo_id,
							rid = reply.pl_id,
							content = decodeURI(reply.content),
							sum = 0,
							date = FKM.date.format(new Date(reply.time*1e3),"yyyy-MM-dd HH:mm"),
							avatSrc = reply.smallImg,
							nopic = reply.nopicimg,
							uid = reply.uid,
							uname = reply.uname || reply.name || reply.author;
							newreply = '<li id="'+ rid +'">'
								   + '    <div class="reply_avat fl"><img src="'+ avatSrc +'" onerror="this.onerror=\'\';this.src=\''+nopic+'\'" /></div>'
								   + '    <div class="reply_info"><a href="##">'+ uname +'</a>'
								   + '		<span class="commetn_time">'+ date +'</span><br/>'+ content
								   + '    </div>'
								   + '</li>';
						txt_rep.val("");
						rep_list.prepend(newreply);
						sum = rep_list.find("li").length;
						$("#"+wid).find(".num_reply b").html(sum);
						setTimeout(function(){
							btn_rep.removeAttr('disabled')
						},3000)
					}else{
						FKM.alert(msg);
						setTimeout(function(){
							btn_rep.removeAttr('disabled')
						},3000)
					}
				},
				error:function(){
					FKM.alert(msg);
					setTimeout(function(){
						btn_rep.removeAttr('disabled')
					},3000)
				}
			})
		}
	}else{
		FKM.alert('内容不能为空');
		setTimeout(function(){
			btn_rep.removeAttr('disabled')
		},3000)
	}
},
FKM.comment.countMsg = function(o,m,b,r){
	var content = $(o).val(),
		countLen = FKM.comment.countLen;
	var s,ra,mn,mx,type;
	try{
		content = FKM.comment.trim(content);
		var len = countLen(content)
	}catch(e){
		return false
	}
	if(typeof r == "string" && r.indexOf("-")>-1){
		ra = r.split("-");
		mn = ra[0], mx = ra[1];
		if(len <= mx){
			m.html('您已输入<b>' + len + '</b>字')
		}else{
			m.html('已超出<b style="color:red;">' + (len - mx) + '</b>字')
		}
	}else if("number" == typeof parseInt(r)){
		if(len > r){
			m.html('已超出<b style="color:red;">' + (len - r) + '</b>字')
		}else{
			var n = r - len;
			m.html('您还可以输入<b>' + n + '</b>字');
			b.removeAttr('disabled')
		}
	}
},
FKM.comment.countLen = function(s){
	var n = s.length,len = 0;
	for(var i = 0; i < n; i++){
		var ns = s[i];
		if(ns == null)ns = s.substring(i, i + 1);
		if(ns.match(/[^\x00-\xff]/ig) != null){
			len += 2
		}else{
			len += 1
		}
	}
	len = parseInt(len/2);
	return len
},
FKM.comment.trim = function(s){
	return s.replace(/(^\s*)|(\s*$)/g, "")   
},
FKM.usr.toolbar = function(host, bid, bname, cid, cname,aid, aname) {
    var html = '<div class="yd_bot">'
			+ '<div class="yd_gongju">'
			+ '<div class="wrapper clearfix">'
			+ 	'<a href="' + host + bid + '/mulu" target="_blank" class="b1">目录<i></i></a><em>|</em>'
			+   '<a href="javascript://" data-opt="1" id="addBookmark" class="b3"  title="加入书签后，下次登录后可继续阅读本书哦">加书签<i></i></a><em>|</em>'
			+   '<a href="javascript://" class="b2" data-opt="1" id="addFavor" title="注册会员，将本书放入书架，方便下次阅读哦">收藏<i></i></a><em>|</em>'
			+   '<a href="javascript://" data-opt="1" id="addRecom" class="b4 icon"><b>推荐</b><i></i></a><em>|</em>'
			+   '<a href="javascript://" data-opt="1" class="b6 btn_down_book" data-bk-name="'+bname+'" data-bk-id="'+bid+'" >免费下载<i></i></a><em>|</em>'
			+   '<a href="javascript://" data-opt="1" id="addReward" class="b5" title="喜欢本书，就直接打赏飞币给作者加加油吧。充值后即可打赏">打赏<i></i></a><em>|</em>'
			+  '<a href="javascript://" data-opt="1" id="fullscreen" class="b8" title="可以加宽阅读界面"><b>全屏阅读</b><i></i></a></div>'
			+ '</div></div>';
    $('body').append(html);
	$('#addFavor').bind('click',function(){        //收藏图书
		FKM.usr.bookcase.add(bid,bname,this)
	});
	$('#addBookmark').bind('click',function(){     //加入书签
		FKM.usr.bookmark.add(bid,cid,cname,this)
	});
	$('#addRecom').bind('click',function(){        //推荐图书				
		FKM.usr.recommand(bid,this)
	});
	$("a.btn_down_book").bind('click',function(){  //免费下载
		FKM.down(this)
	});
	$('#addReward').bind('click',function(){       //打赏作者	
		FKM.usr.reward(bid,this);
	});
	$("#fullscreen").bind('click',function(){
		var f = $(this).attr("data-opt");
		if("1" == f){
			$(this).find("b").html("取消全屏")
			$(this).attr("data-opt","2");
			$("body").addClass("fullscreen")
		}else{
			$(this).find("b").html("全屏阅读");
			$(this).attr("data-opt","1");
			$("body").removeClass("fullscreen")
		}
	})
},
FKM.usr.page = FKM.usr.page || {},
FKM.usr.page = function(bid,cid,p,n,d){
	var prev = $("#"+p), next = $("#"+n), dir = $("#"+d);
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.config.domain + "iframe/book/upAndDown",//"/reward.php", 
		data: "book_id="+bid+"&chapter_id="+cid,
		success: function(data)
		{
		   var json = data,
			   request = json.result.status.code,
			   msg = json.result.status.msg;
		   if(request == 0){
			   var p = json.result.data.preChapter,
			   	   n = json.result.data.nextChapter,
				   d = json.result.data.mulu;
			   dir.attr("href",d);
			   prev.attr("href",p);
			   next.attr("href",n);
			   $("body").bind("keyup",function(e){
				   var e = e || window.event;
				   if(e.keyCode == 37){
						window.location.href = p?p:d
				   }else if(e.keyCode == 39){
					   if(""!=n){
					       window.location.href = n
					   }else{
						   FKM.alert("已经是最后一章！") 
						   return false 
					   }
						 
				   }
			   })
				   
		   }else{
		   	   FKM.alert(msg)   
		   }
	   },error: function(){
		   
	   }
	})
	
},
FKM.ui = FKM.ui || {}
FKM.ui.autoscroll = (function() {
	var top;
	var timer;
	var actualTop;
	function startTimer() {
		timer = setInterval(scroll, 40);
		try {
			if (document.selection) {
				document.selection.empty();
			} else {
				var selection = document.getSelection();
				selection.removeAllRanges();
			}
		} catch(e) {}
	}
	function scroll() {
		top = document.documentElement.scrollTop || document.body.scrollTop;
		if(FKM.localstore.get('screen')!=null){
			top = top+parseInt(FKM.localstore.get('screen'));
		}
		
		window.scroll(0, top);
		actualTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (top != actualTop) {
			stopTimer();
		}
	}
	function stopTimer() {
		clearInterval(timer);
	}
	return {
		starts: startTimer,
		stops: stopTimer
	};
})(),
FKM.book = FKM.book || {},
FKM.book.info = function(bid,dom){
	var wrap = $("."+dom.wrap), 
		dom_cnum = wrap.find("."+dom.clicks), //dom_time = wrap.find("."+dom.time), 
		dom_word = wrap.find("."+dom.word),
		dom_down = wrap.find(".num_down"), 
		dom_recom = wrap.find(".num_recom");
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.config.domain + "iframe/book/getBookInfo",//"/reward.php", 
		data: "book_id="+bid,
		success: function(data)
		{
		   var json = data,
			   request = json.result.status.code,
			   msg = json.result.status.msg;
		   if(request == 0){
			   var a = json.result.data.click_num, //b = json.result.data.update_time,
				   b = json.result.data.words_count,
				   c = json.result.data.total_download_num,
				   d = json.result.data.commend_num;
			   dom_cnum.html(a);			   
			   dom_word.html(b);
			   dom_down.html(c);
			   dom_recom.html(d)
		   }else{
		   	   FKM.alert(msg)   
		   }
	   },error: function(){
	   }
	})
},
FKM.book.loadhtml = function(bid,dom){
	var	dom_pass = $("#"+dom.downpass), 
		dom_cata = $("#"+dom.downcata), 
		dom_good = $("#"+dom.downgood),
		dom_now = $("#"+dom.downnow);
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: FKM.config.domain + "iframe/book/commonTopHtml",//"/reward.php", 
		data: "book_id="+bid,
		success: function(data)
		{
		   var json = data,
			   request = json.result.status.code,
			   msg = json.result.status.msg;
		   if(request == 0){
			   var a = json.result.data.pass_download || "",
			   	   b = json.result.data.category_download || "",
				   c = json.result.data.book_jingpin || "",
				   d = json.result.data.day_download || "";
			   a && dom_pass.html(a);
			   b && dom_cata.html(b);
			   c && dom_good.html(c);
			   d && dom_now.html(d)
		   }
	   },error: function(){
	   }
	})
},
FKM.sidebar = FKM.sidebar || {},
FKM.sidebar.service = function(){
	var a = document, b = a.body;
	var ie6 = !-[1,]&&!window.XMLHttpRequest;
	var html = '<div id="side_tool" style="position:fixed; right:0; top:35%;z-index:10000"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=537008603&site=qq&menu=yes"><img border="0" src="http://img1.feiku.com/images/pic_qq_service.png" alt="QQ 在线客服"/></a></div>';
	$(b).append(html);
	var d = $("#side_tool"),
		e = function(){
			var h,t;
			h = FKM.page.getViewHeight();
			t = FKM.page.getScrollTop();
			d.css({"position":"absolute","top":t+(h*0.35)});
		};
	if(ie6){
		e();
		$(window).bind("scroll",function(){e()})
	}
};
$(function(){
	var isuc = 0;
	try{isuc = isphp || 0}catch(e){}
	FKM.page.loadJsFile("http://img1.feiku.com/js/json2.js");
	if(!isuc)FKM.usr.islogin();
	$("a.btn_down_book").live("click",function(e){
		FKM.down(this)
		FKM.preventDefault(e)
	});
	FKM.usr.read("feiku-record",".recent_list",1);
	FKM.sidebar.service()
})
$(function(){
	var api_host = "http://novel.feiku.com/",
		src_host = "http://img1.feiku.com",
		adfilter = "FK_AD", adIDs = [], adUrl = "",
		dom = document.getElementsByTagName("body")[0];
	var _AD_INFO = 0;
	adIDs = FKM.page.findDomAd(adfilter,dom);
	if(adIDs.length>0){
		for(var i=0;i<adIDs.length;i++){
			var id = adIDs[i];
			adUrl = api_host+"iframe/ad/"+adIDs[i]+".js";
			excuteScript(adUrl,id,src_host,insertAD)
		}
	}
	function excuteScript(url,id,src_host,callback){
		if("undefined" == typeof url || "" == typeof url)return;
		$.ajax({
			type:"GET",
			dataType:"script",
			url:url,
			async:false,
			cache:false,
			success: function(data,textStatus){
				try{
					_AD_INFO = FK_AD_INFO;
					if(_AD_INFO)callback(_AD_INFO,id,src_host)
				}catch(e){
				}
				
			},
			error: function(){	
			}
			
		})
		
	}
	function insertAD(info,id,h){
		if(!info)return;
		var info=info, s={}, 
			type=info.adType,
			addr = info.adAdress, 
			img=info.adImg, 
			imgUrl=info.adImgUrl, 
			code=info.adCode,
			expire=info.adFlag,
			size=info.adSize;
		if("0"==expire)return;
		var AD_SIZE = {"1":"200*200","2":"960*90","3":"200*600","4":"960*90","5":"200*90","6":"200*150"};
		s = getAdsize(size,AD_SIZE);
		switch(type){
			case "1": insertImg(img,imgUrl,s,id,h);break;
			case "2": insertFlash(img,s,id,h);break;
			case "3": insertCode(code,s,id,h,addr);break;
		}
		function insertImg(img,url,size,id,h){
			if("string"!==typeof id && "" !== id)return
			if(""!==img){
				var adwrap,adlink,adimg;
				if(""!==id){
					adwrap = $("#"+id);
				}else{
					return
				}
				adlink = '<a href="'+ url + '" target="_blank" /></a>';
				adimg = '<img src="' + h + img + '" />';
				adwrap.append(adlink)
				adwrap.find("a").append(adimg);
				adwrap.css({"width":size.width,"height":size.height}).parent().show()
			}
		}
		function insertFlash(url,size,id,h){
			if("string"!==typeof id && "" !== id)return
			var flashvars = {
				id: 'videoPlayer',
				url: h+url,
				width: size.width,
				height: size.height,
				wmode: 'transparent',
				vars: '',
				allowScriptAccess: 'always',
				allowFullScreen: true
			};
			FKM.swf.create(flashvars, id);
			$("#"+id).css({"width":size.width,"height":size.height})
			.parent().show()
		}
		function insertCode(code,size,id,h,addr){
			if("string"!==typeof id && "" !== id)return
			$.getScript("http://img.kanshu.com/2013/test/js/crapLoader.js",function(){
				crapLoader.loadScript(h+code, id, {
					success:function(){
						if("0"!=addr){
							$("#"+id).css({"width":size.width,"height":size.height})
							.parent().show()
						}
						
					}	
				})
			})
			
		}
		function getAdsize(a,b){
			if("string" !== typeof a && "" === a)return
			var c = "", d = [], e = {};
			for(i in b){
				if(i == a){
					c=b[i];
					break
				}
			}
			d = c.split("*");
			e.width = d[0];
			e.height = d[1];
			return e;
		}
		
	}

})

