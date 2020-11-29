function Register(config) {
	this.config = {
		type: 1,
		appId: '10',
        areaId: 1,        
        format: 'jsonp',
        backUrl: '',
        apiUrl: '',
        loginUrl: '/login.html'
	};
	
	if(config) this.config = config;
	this.force = 1;
	this.sessionKey = '';
	this.time = Math.round(new Date().getTime()/1000);	
	this.phoneCode = '86';
	this.phone = '';
	this.phoneIsAbroad = 0;
	this.password = '';
	this.code = '';
	this.tips = {
		phoneEmpty: '请输入手机号码',
		phoneInvalid: '请输入有效的手机号码',
		phoneExist: '该手机号已注册，请尝试直接 <a class="blue" href="' + this.config.loginUrl + '">登录</a>',
		captchaEmpty: '验证码不能为空',
		captchaError: '验证码错误',
		sendLoading: '发送中...',
		sendDefault: '获取验证码',
		reSendMsg: '重新发送',
		sendMsgError: '发送失败，请重新尝试',
		phoneCodeError: '手机验证码不正确',
		confirmPwdEmpty: '请再次输入密码',
		pwdNotSame: '您两次输入的密码不一致',
		emailEmpty: '请输入邮箱',
		emailInvalid: '请输入正确的邮箱',
		emailNotSupport: '邮箱后辍不支持',
		emailExist: '该邮箱账号已注册，请尝试直接 <a class="blue" href="' + this.config.loginUrl + '">登录</a>'
	};
		
	this.checkAccount = false;
	this.needValidateCode = true;
	this.sendCodeTimeout = '';
	this.requestID = '';
	this.isRegistering = false;
	this.isChecking = false; //first step checking
	this.captchaCode = '';
	this.timeCount = 0;
	this.checkPasswordInterval = '';
	this.sendMsgInterval = '';
	this.curStep = 'section_step1';
    this.qq_code = '';   
    this.weibo_code = "";
    this.real_name  = '';

    this.init = function() {
		var that = this;
		
		// 刷新验证
		$('.icon-reload').click(function() {
			that.refreshCode();
		});

	    //　 获取短信验证码
	    $("#btn_step1").click(function() {	 
	    	if($(this).hasClass('disabled')) 
	    		return false;
	    	//是否正正在验证中
	    	if(that.isChecking) return false;

    		that.checkPhoneNumber($('.phone-number input'));
    		$('.msg-code input').val('');
	    });

	    
	    $("#btn_step2").click(function() {
	    	if($(this).hasClass('disabled')) 
	    		return false;
	    	if(!that.checkCode()) return false;
	    	//手机注册检查密码
	    	if(that.config.type == 1 && !that.checkPassword(true)) return false;
	    	$(this).addClass('loading');
	    	that.doRegister();
	    });
	    
	    
        $('#get_code').click(function() {
        	if(that.timeCount != 0) return;
        	$(this).html(that.tips.sendLoading);
        	that.sendCode(true);        	
        });
        
        $('#section_step2_back').click(function() {
        	that.showLastStep('section_step2','section_step1');
        });

        setInterval(function() {
            that.checkForm(that.curStep);
        }, 50);
        
	     $('#j-passWordOff').on('click', function () {
	         //$('#password').attr('type', 'text');
	         $('#password').replaceWith($('#password').clone().attr('type', 'text'));
	         $('#j-passWordOff').hide();
	         $('#j-passWordOn').show();
	     });
	     $('#j-passWordOn').on('click', function () {
	         //$('#password').attr('type', 'password');
	         $('#password').replaceWith($('#password').clone().attr('type', 'password'));
	         $('#j-passWordOff').show();
	         $('#j-passWordOn').hide();
	     });
	     
	     $('#j-delPassWord').on('click', function () {
	         $(this).prev().val('');
	     });
	     
	 	that.qq_code = $("qq_code").val();
	 	that.weibo_code = $("weibo_code").val();
	 	that.real_name = $("real_name").val();
	     
	};
	
	this.loginRegCallback = function(result, isReg) {
		var that = this;
		this.showLiteTip(result.msg);
		if(result && result.code == 1 ) {
    		location.href = '/m/myhome.html';
    	} 
    	this.isRegistering = false;
    	$("#btn_step2").removeClass('loading');
	};
	
	this.doRegister = function() {
		if(this.isRegistering) return false;
		this.isRegistering = true;
		var that = this;
		var data = {
				"mobile":that.phone,
				"verifycode":that.code,
				"password":that.password,
				"qq_code":that.qq_code,
				"weibo_code":that.weibo_code,
				"real_name":that.real_name
		}
		$.post( "/m/MRegister.do?method=regAjax",data,function(result){
			that.loginRegCallback(result, true);
		});
	};
	

	
	this.refreshCode = function() {
		var curTime = Math.round(new Date().getTime() / 1000);
		if(curTime - this.time > 30) {
			//this.showCaptcha();
			this.time = curTime;
			return;
		}
		
		this.time = curTime;
				
		var url = $('.code img').attr("src");
		
		if (url.indexOf("&rnd=") > -1) {
			url = url.substr(0, url.indexOf("&rnd=")) + "&rnd=" + Math.random();
		}
		else {
			url = url + "&rnd=" + Math.random();
		}
		
		$('.code img').attr("src", url);
	};
	
	//验证图片验证码
	this.checkImageCode = function(input) {
		
		if(!this.needValidateCode) return true;
		
		var code = input.val();
		
		if (code.length == 0) {
			this.showError(input, this.tips.captchaEmpty);
			return false;
		}
		this.captchaCode = code;	
		return true;
	};
	
	this.checkPhoneNumber = function(input) {
		// 检查手机号码z
		var phone     = input.val();
		var accountType = 101; //手机注册
		
		phone = phone.replace(/[ ]/g,"");
		phone = $.trim(phone);
		
		if (phone == 'undefined' || phone.length == 0) {
			this.showError(input, this.tips.phoneEmpty);
			return ;
		}
		
		// if (this.phoneCode == 86) {
		// 	var phoneIsAbroad  = 0;
		// 	//var re = /^(13[0-9]|15[0-9]|18[0-9]|145|147|17[0-9])\d{8}$/;
		// 	var re = /^1\d{10}$/;
		// 	if (re.test(phone) != true) {
		// 		this.showError(input, this.tips.phoneInvalid)
		// 		return ;
		// 	}
		// }
			
        if(this.needValidateCode && !this.checkImageCode($('.code input'))) {
            return;
        }
        
		this.phone = phone;
		this.phoneIsAbroad = phoneIsAbroad;
		var that = this;
		this.isChecking = true;
		
		//手机注册
		$('#btn_step1').addClass('loading');
		// 发送 短信
        that.sendCode();
		return ;
	};
	
	this.checkPassword = function(showError){
		var input = $('.password-input input');
		var psw = input.val();

		if (psw == null || psw == 'undefined' || psw.length == 0) {
			if(showError) this.showError(input, '长度为6-18个字符');
			return false;
		}
		var re = /^[0-9]{0,8}$/;
		if (re.test(psw) == true) {			
			if(showError) this.showError(input, '不能是9位以下的纯数字');			
			return false;
		}
		
		re = /\s/g;
		if (re.test(psw) == true) {
			if(showError) this.showError(input, '不能包含空格');	
			return false;
		}
		
		/*re=/^[a-zA-Z0-9!@#_]+$/;
		if (re.test(psw) != true) {			
			this.showPswError(txtid);
			$('#phonepwd').addClass('error');
			return false;
		}*/
		if (psw.length < 6 || psw.length > 18) {			
			if(showError) this.showError(input, '长度为6-18个字符');
			return false;
		}
		this.password = psw;
		return true;
	};
	
	this.authPasswdNew = function() {
		if(!this.checkPassword(false)) {
			$('.password-tip section').hide();
			return false;
		}
		this.hideError($('.password-input input'));
		var string = $('.password-input input').val();
		var level=0;
		if(/[a-zA-Z]+/.test(string))
			level+=1;
	    if(/[0-9]+/.test(string))
		    level+=1;
		if(/(?=[\x21-\x7e]+)[^A-Za-z0-9]/.test(string))
			level+=1;
		$('.password-tip section').hide();
		$('.password-tip .level-' + level).show();
	};
	
	this.checkCode = function() {
		var input = $('.msg-code input');
		var code = input.val();
		if(this.requestID == '') {
			this.showError(input, this.tips.phoneCodeError);
			return false;
		}
		
		if (code.length == 0) {
			this.showError(input, this.tips.phoneCodeError);
			return false;
		}
		
		var re = /^[0-9]{4,}$/;
		if (re.test(code) != true) {
			this.showError(input, this.tips.phoneCodeError);
			return false;
		}
		this.code = code;
		return true;
	};
	
	
	this.sendCode = function(reSend) {
		var that = this;

	    var callback = function(result) {
	    	$('#btn_step1').removeClass('loading');
	    	that.showLiteTip(result.msg);
			that.isChecking = false;
			if (result.code == 1) {
                that.requestID = result.requestID;
                $('#phone_number').html(that.phone);
    			that.phoneInterval();
    			//当前是step2不再跳转
    			if(that.curStep == 'section_step2') { 
    				return;
    			}
    			
    			that.showNextStep('section_step1', 'section_step2');  			
    			//手机注册检查密码强度	    				
    			that.checkPasswordInterval = setInterval(function() {			
        	        that.authPasswdNew();
        	    }, 50);
            } else if (result.code == 0 ) {
            	
            } else {
            	
            }
	    }
		if(typeof(reSend) == 'undefined' || !reSend) { 
			$.post("/m/MRegister.do?method=sendMobileMessage",{"mobile":that.phone,"veri_code":that.captchaCode,"isValMobile":"true"},function(result){
				callback(result);
			});
		} else {
			$.post("/m/MRegister.do?method=sendMobileMessage",{"mobile":that.phone,"veri_code":that.captchaCode},function(result){
				if(result.code == 0) {
					that.refreshCode();
					that.showLastStep('section_step2', 'section_step1');
					that.showLiteTip(result.message);
					$('#get_code').html(that.tips.reSendMsg);
					return;
				}
				callback(result);
			});
		}
	};
	
	this.phoneInterval = function() {
		var that = this;
		var count = 60;
		if(this.sendMsgInterval != '') clearInterval(this.sendMsgInterval);
		this.sendMsgInterval = setInterval(function() {			
	        count--;
	        that.timeCount = count;
	        if (count <= 0) {
	        	that.timeCount = 0;
	            clearInterval(that.sendMsgInterval);
                $(".code input").val('');
	            $("#get_code").html(that.tips.reSendMsg);
	            $("#get_code").removeClass('grey');
	            $("#get_code").addClass('blue');
	        }
	        else {
	            $("#get_code").html(count + 's' + that.tips.reSendMsg);
	        }
	    }, 1000);
	};
	
	this.showLiteTip = function(msg) {
    	layer.open({
    	    content: msg
    	    ,skin: 'msg'
    	    ,time: 2 
    	  });
		return;
	};
	
	this.showNextStep = function(curId, nextId) {
		$("#" + curId).animate(
		    {
		        opacity:0.7,
		        translateX:'-100%'
		    },
		    200,
		    'ease-out',
		    function() {
		    	$(".wrap").hide();
		    	$("#" + nextId).show();
		    }			    
		);
		this.curStep = nextId;
	};
	
	this.showLastStep = function(curId, lastId) {
		$("#" + curId).animate(
			{
		        opacity:0.7,
		        translateX:'100%'
		    },
		    200,
		    'ease-out',
		    function() {
		    	$(".wrap").hide();
		    	$("#" + lastId).show();
		    }
			    
		);
		this.curStep = lastId;
	};
	
	this.showError = function(obj, msg) {
    	layer.open({
    	    content: msg
    	    ,skin: 'msg'
    	    ,time: 2 
    	  });
	};
	
	this.hideError = function(obj) {		
		obj.parent().removeClass('error');
		if(obj.attr('type') == 'password') {
			obj.parent().parent().parent().find('.password-tip p').hide();
		} else {
			obj.parent().parent().parent().find('.tip').hide();
		}
		
	};
	
	//  检查表单
	this.checkForm = function(step) {
		var formValid = true;

        $('#' + step +' .input-list input').each(function() {
            if($.trim($(this).val()) == '') {
                formValid = false;
            }
            if($(this).attr('id') == 'j-password') {
                if($.trim($(this).val()) != '') $('#j-delPassWord').show();
                else $('#j-delPassWord').hide();
            }
        });
        if(!formValid) {
            $(".red-btn").addClass('disabled');
            $(".blue-btn").addClass('disabled');
        }
        else {
            $(".blue-btn").removeClass('disabled');
            $(".red-btn").removeClass('disabled');
        }
	};
	
    
	this.init();
}

function addStat(name){
    try{
        if(Statistics == 'undefined' || Statistics == null) return false;
        Statistics.loginSuc(name);
    }catch (e) {}
}

getScript = function(url, callback) {
    var head = document.getElementsByTagName('head')[0],
        js = document.createElement('script');

    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);

    head.appendChild(js);
    //执行回调
    var callbackFn = function(){
        if(typeof callback === 'function'){
            callback();
        }
    };

    if (document.all) { //IE
        js.onreadystatechange = function() {
            if (js.readyState == 'loaded' || js.readyState == 'complete') {
                callbackFn();
            }
        }
    } else {
        js.onload = function() {
            callbackFn();
        }
    }
}
$(document).ready(function(){
	Register = Register();
});