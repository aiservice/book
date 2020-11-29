function QMRegister(config) {
	this.config = {
		appId: '10',
        areaId: 1,        
        format: 'jsonp',
        backUrl: '',
        apiUrl: '',
        loginUrl: '/login.html'
	};
	
	if(config) this.config = config;
	this.needValidateCode = false; 
	this.force = 1;
	this.authApi = new YuewenAuthen(this.config);
	this.authApi.apiUrl = this.config.apiUrl;
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
	this.sk = '';
	this.st = '';
    this.validateShow = false ;  // 标识是否出腾讯验证码   flase 出图片验证码   true 出腾讯验证码
    this.validateSrc = '';   //  验证码src
    this.getslidejs = 0;
    this.code = '';
    this.sig  = '';

    this.init = function() {
		var that = this;
		
		var ywkey = this.getCookie('ywkey');
		var guid = this.getCookie('ywguid');
		
		//手机登录检查登录状态
		if(ywkey && guid && this.config.type == 2) {
			this.authApi.checkLoginStatus(function(result) {
				that.loginSuccess(result);
			});
		}

		$("#phone_area_select").click(function() {
			that.showNextStep('section_step1', 'section_phone_area');
			$('.letter').show();
		});
		
		this.initPhoneAreaSelect();


		// 刷新验证
		$('.icon-reload').click(function() {

			// that.refreshCode();
			that.getRefreshCaptchaType();
		});
		
	    $('.phone-number input').focus(function() {
	    	that.hideError($(this));
	    });
	    
	    $('.icon-close').click(function(){
	    	$(".common-popup-wrap").hide();
	    });

	    //　 获取短信验证码
	    $("#btn_step1").click(function() {	 
	    	if($(this).hasClass('disabled')) 
	    		return false;
	    	//是否正正在验证中
	    	if(that.isChecking) return false;

    		that.checkPhoneNumber($('.phone-number input'));
    		$('.msg-code input').val('');
    		that.hideError($('.msg-code input'));
	    });

	    
	    $("#btn_step2").click(function() {
	    	if($(this).hasClass('disabled')) 
	    		return false;
	    	if(!that.checkCode()) return false;
	    	//手机注册检查密码
	    	if(that.config.type == 1 && !that.checkPassword(true)) return false;
	    	$(this).addClass('loading');
	    	if(that.config.type == 1)
	    		that.doRegister();
	    	else 
	    		that.phoneCodeLogin();
	    });
	    
	    $('.code input').focus(function() {
	    	that.hideError($(this));
	    });
	    
	    $('.msg-code input').focus(function() {
	    	that.hideError($(this));
	    });
	    
	    $('.password-input input').focus(function() {	    	
	    	that.hideError($(this));
	    });
	    
        $('#get_code').click(function() {
        	if(that.timeCount != 0) return;
        	$(this).html(that.tips.sendLoading);
        	that.sendCode(true);        	
        });
	    //  获取验证码
		//this.showCaptcha();
		this.getCaptchaType();

        setInterval(function() {
            that.checkForm(that.curStep);
        }, 50);
	};
	
	this.phoneCodeLogin = function() {
		if(this.isRegistering) return false;
		this.isRegistering = true;
		var that = this;
		
		this.authApi.phoneCodeLogin(this.phone, this.requestID, this.code, function(result) {
			that.loginRegCallback(result);
		});
	};
	
	this.loginSuccess = function(result) {
		if(!result || result.code != 0 ) {
			return;
		}
		var data = result.data;
		var params = {
    		ticket: data.ticket,
    		guid: data.ywGuid,
    		autoKey: data.autoLoginSessionKey,
    		autoTime: data.autoLoginKeppTime,
    		mobile: 1
		}
		if(this.config.queryString)
			var queryString = '?' + this.config.queryString + '&' + $.param(params);
		else 
			var queryString = '?' + $.param(params);
		
		location.href = '/success.html' + queryString;
	};
	
	this.loginRegCallback = function(result, isReg) {
		var that = this;
		if(result && result.code == 0 ) {
            addStat('phonelogin');
    		var data = result.data;
    		if(that.config.ticket == 1) {
	    		var params = {
					account: this.phone,
	        		ticket: data.ticket,      
	        		guid: data.ywGuid,
	        		autoKey: data.autoLoginSessionKey,
	        		autoTime: data.autoLoginKeppTime,
	        		mobile: 1,
	        		ywregister: 0
	    		}
	    		if(isReg != undefined && isReg) params.ywregister = 1;
    		}
    		else 
    	    {
    			var params = {
					account: this.phone,  
	        		guid: data.ywGuid,
	        		mobile: 1
	    		}
    	    }
    		
    		var queryString = '';
    		if(that.config.queryString) 
    			queryString = '?' + that.config.queryString + '&' + $.param(params);       			
    		else
    			queryString = '?' + $.param(params);
    		
    		//如果是言吧注册显示提示弹窗
    		if(this.config.isNeedShowYanbaPop && isReg) {
                $('#yanba_popup .icon-close').click(function(){
                    $(".common-popup-wrap").hide();
                    location.href = '/success.html' + queryString;
                });
    			$("#close_yanba_popup").attr("href", '/success.html' + queryString);
    			this.showYanbaPopup();
    		} else {
    			location.href = '/success.html' + queryString;
    		}
    		
    		       		       		
    	} else if(result.code == 11007 || result.code == -11008){
    		this.showError($('.msg-code input'), '短信验证码错误');
    	}
    	else {
    		this.showLiteTip(result.message);
    	}
    	this.isRegistering = false;
    	$("#btn_step2").removeClass('loading');
	};
	
	this.doRegister = function() {
		if(this.isRegistering) return false;
		this.isRegistering = true;
		var that = this;
		this.authApi.doRegisterByPhone(this.phone, this.phone, this.phoneIsAbroad, 101, this.password, this.requestID, this.code, this.config.backUrl, function(result){        	
        	that.loginRegCallback(result, true);
        });
	};

	// 刷新验证码(兼容验证)
	this.getRefreshCaptchaType = function () {
        this.getCaptchaType();
    };
	
	this.refreshCode = function() {
		var curTime = Math.round(new Date().getTime() / 1000);
		if(curTime - this.time > 30) {
			this.showCaptcha();
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

	//  获取图片验证码类型
	this.getCaptchaType = function () {
        var that = this;
        this.authApi.getCaptchaType(this.force, function(data) {
            if(data.code == 0) {
                that.needValidateCode = data.data.needValidateCode;
                that.sessionKey = data.data.sessionKey;
                that.hasShowCaptcha = true;
                //　出滑动验证码
				if(data.data.needValidateCode && data.data.imgSrc.indexOf('tencentCode;') == 0){
                    that.validateShow = true;   // 标识 是否出腾讯验证码
                    that.validateSrc = data.data.imgSrc.slice(12);
                    $(".code").hide();         // 隐藏图片验证码
				}

                // 出图片验证码
                if(that.needValidateCode &&  !that.validateShow) {
                    that.validateSrc = data.data.imgSrc;
                    $(".code").show();
                    $('.code img').attr('src', data.data.imgSrc);

                }

            }
        });
    };
	
	this.showCaptcha = function() {		
		var that = this;
		this.authApi.getCaptcha(this.force, function(result) {
			if(result.code == 0) {
				that.needValidateCode = result.data.needValidateCode;
				if(that.needValidateCode) {
					$(".code").show();					
					that.hasShowCaptcha = true;
					$('.code img').attr('src', result.data.imgSrc);					
				} else {
					$(".code").hide();
				}
				that.sessionKey = result.data.sessionKey;
			}
		});
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
		
		if (this.phoneCode == 86) {
			var phoneIsAbroad  = 0;
			//var re = /^(13[0-9]|15[0-9]|18[0-9]|145|147|17[0-9])\d{8}$/;
			var re = /^1\d{10}$/;
			if (re.test(phone) != true) {
				this.showError(input, this.tips.phoneInvalid)
				return ;
			}
			
		}
		else {
			var re = /^\d+$/;
			var phoneIsAbroad  = 1;
			if(re.test(phone) != true) {
				this.showError(input, this.tips.phoneInvalid)
				return ;
			}
			phone = '+' + this.phoneCode + phone;
			accountType = 105; //海外
		}

		// 兼容验证码 start  出图片验证码
		if (!this.validateShow) {
             if(this.needValidateCode && !this.checkImageCode($('.code input'))) {
                 return;
             }
		 }

		// 兼容验证码 end
				
		this.phone = phone;
		this.phoneIsAbroad = phoneIsAbroad;
		var that = this;
		this.isChecking = true;
		
		//手机注册
		$('#btn_step1').addClass('loading');
		if(this.config.type == 1) {  //  type =1  注册
			this.authApi.checkAccount(phone, accountType, function(result){
				if(result && result.data.existing == true) {
					that.checkAccount = false;
					$("#account_exist").show();
					$('#btn_step1').removeClass('loading');
					that.isChecking = false;
					return ;
				}
				if(result && result.code != 0) {
					that.checkAccount = false;
					that.showLiteTip(result.message);
					$('#btn_step1').removeClass('loading');
					that.isChecking = false;
					return ;
				}

                if (that.validateShow){  // 出滑动验证码
                    $('#cap_iframe').html('');
                    var url = that.validateSrc + "&clientype=1";
                    if (this.getslidejs == 1){
                        capRefresh();

                    }else{
                        that.getslidejs = 1;
                        getScript(url, function() {
                            //显示验证码
                            $(".mask").removeClass('hidden');
                            var capOption={callback:callbackFun, type:"popup", firstvrytype:1};
                            capInit(document.getElementById("cap_iframe"), capOption);
                            //回调函数：验证码页面关闭时回调
                        });
                    }
                }else{
                    that.checkAccount = true;
                    that.sendCode();

                }
                callbackFun = function (retJson) {
                    if (retJson.ret == 0) {
                        $(".mask").addClass('hidden');
                        var ticket = capGetTicket();
                        that.code = ticket.randstr;
                        that.sig  = ticket.ticket;
                        if (that.code && that.sig) {
                            that.captchaCode = ticket.randstr + ";" + ticket.ticket;
                            that.checkAccount = true;
                            that.sendCode();
						}

                    }else{
                        that.showLiteTip('验证失败，请重试');
                        return ;
                    }
                }
			});	
		} else {
			// 发送 短信
            if (that.validateShow){  // 出滑动验证码
                $('#cap_iframe').html('');
                var url = that.validateSrc + "&clientype=1";
                if (this.getslidejs == 1){
                    capRefresh();

                }else{
                    that.getslidejs = 1;
                    getScript(url, function() {
                        //显示验证码
                        $(".mask").removeClass('hidden');
                        var capOption={callback:callbackFun, type:"popup", firstvrytype:1};
                        capInit(document.getElementById("cap_iframe"), capOption);
                        //回调函数：验证码页面关闭时回调
                    });
                }
            }else{
                that.sendCode();

            }
            callbackFun = function (retJson) {
                if (retJson.ret == 0) {
                    $(".mask").addClass('hidden');
                    var ticket = capGetTicket();
                    that.code = ticket.randstr;
                    that.sig  = ticket.ticket;
                    if (that.code && that.sig) {
                        that.captchaCode = ticket.randstr + ";" + ticket.ticket;
                        that.sendCode();
                    }

                }else{
                    that.showLiteTip('验证失败，请重试');
                    return ;
                }
            }
		}
		
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
			that.isChecking = false;
			if (result.code == 0 ) {
                that.requestID = result.data.data;
                $('#phone_number').html(that.phone);
    			that.phoneInterval();
    			//当前是step2不再跳转
    			if(that.curStep == 'section_step2') { 
    				return;
    			}
    			
    			that.showNextStep('section_step1', 'section_step2');  			
    			//手机登录
    			if(that.config.type == 2) return;
    			//手机注册检查密码强度	    				
    			that.checkPasswordInterval = setInterval(function() {			
        	        that.authPasswdNew();
        	    }, 50);
            }
			//账号已存在
			else if (result.code == -11001) {
				$("#account_exist").show();
			}
			else if (result.code == -11003 || result.code == -11004) {
				$('#get_code').html(that.tips.reSendMsg);
				//that.showCaptcha();
				that.getCaptchaType();
				if(that.needValidateCode) {
					that.showError($('.code input'), that.tips.captchaError);
					//当前是step1不再跳转
					if(that.curStep == 'section_step1') return;
					that.showLastStep('section_step2', 'section_step1');
				}
				else {
					that.showLiteTip('您停留当前页面时间过长，请重新尝试');
				}
			}
            else {
            	$('#get_code').html(that.tips.reSendMsg);
                that.showLiteTip(result.message);
            }
	    }

		if(typeof(reSend) == 'undefined' || !reSend) { 
		    this.authApi.sendPhoneCheckCode(this.phone, this.phoneIsAbroad, this.config.type - 1, this.sessionKey, this.captchaCode, this.config.type - 1, function(result) {
		    	if(result.code == 0) {
		    		that.sk = result.sk;
		    		that.st = result.st;
		    	}
				callback(result);
			});
		} else {
			this.authApi.reSendPhoneCheckCode(this.phone, this.phoneIsAbroad, this.config.type - 1, this.config.type - 1, this.sk, this.st, function(result) {
				if(result.code == 10901) {
					that.getCaptchaType();
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
	            if (!this.validateShow){
                    $(".code input").val('');
				}
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
		$('.light-tip p').html(msg);
		$('.light-tip').show();
		setTimeout(function(){
			$('.light-tip').hide();
		},5000);
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
		obj.parent().addClass('error');
		if(obj.attr('type') == 'password') {
			obj.parent().parent().parent().find('.password-tip p').show();
			obj.parent().parent().parent().find('.password-tip p').html(msg);
		}
		else {
			obj.parent().parent().parent().find('.tip').show();
			obj.parent().parent().parent().find('.tip').html(msg);
		}
		
	};
	
	this.hideError = function(obj) {		
		obj.parent().removeClass('error');
		if(obj.attr('type') == 'password') {
			obj.parent().parent().parent().find('.password-tip p').hide();
		} else {
			obj.parent().parent().parent().find('.tip').hide();
		}
		
	};
	
	this.initPhoneAreaSelect = function() {
		var data = GPhoneArea;
		var hotArea = data.hot;		
		var areaHtml = '<ul id="hot_area">';
		$.each(hotArea, function(key, area){
			areaHtml += '<li onclick="Register.setPhoneCode(' + area.code + ', \'' + area.chineseName +'\')"><a href="javascript:">' + area.chineseName + '<span>+' + area.code + '</span></a></li>';
		});
		areaHtml += '</ul>';			
		$.each(data, function(key, areaArr){
			if(key == 'hot') return;
			areaHtml += '<h3 id="' + key.toUpperCase() + '"> ' + key.toUpperCase() + ' </h3>';
			areaHtml += '<ul>';
			$.each(areaArr, function(key1, area) {
				areaHtml += '<li onclick="Register.setPhoneCode(' + area.code + ', \'' + area.chineseName +'\')"><a href="javascript:">' + area.chineseName + '<span>+' + area.code + '</span></a></li>';
			})
			areaHtml += '</ul>';
		});
		
		$(".area-list").html(areaHtml);
		var letterHtml = '<dl>';
		for(var i = 0; i < 26; i++) {
			letterHtml += '<dd><a href="#' + String.fromCharCode(65+i) + '">' + String.fromCharCode(65+i) + '</a></dd>';
		}
		letterHtml += '</dl>';
		$(".letter").html(letterHtml);
	};
	
	this.setPhoneCode = function(code, name) {
		this.phoneCode = code;
		this.showLastStep('section_phone_area','section_step1');
		$('.letter').hide();
		$("#phone_area_select span").html(name);
		$(".phone-number span").html('+' + code);
	};

	//  检查表单
	this.checkForm = function(step) {
		var formValid = true;
		if(this.validateShow){  // 出滑动验证码时，图片验证码表单不校验
			if ($.trim($('.phone-number input').val()) == ''){
                formValid = false;
			}
            if(!formValid) {
                $(".red-btn").addClass('disabled');
                $(".blue-btn").addClass('disabled');
            }
            else {
                $(".blue-btn").removeClass('disabled');
                $(".red-btn").removeClass('disabled');
            }

		}else{

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
		}
	};
	
	this.getCookie = function(name) {
        var arg = name + '=';
        var alen = arg.length;
        var clen = document.cookie.length,
            i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                var _endstr = document.cookie.indexOf(';', j);
                if (_endstr == -1) _endstr = document.cookie.length;
                return unescape(document.cookie.substring(j, _endstr));
            }
            i = document.cookie.indexOf(' ', i) + 1;
            if (i == 0) break;
        };
        return null;
    };
    
    //显示言吧注册成功后的弹窗
	this.showYanbaPopup = function() {
		$("#yanba_popup").show();
	};
	
	this.closeYanbaPopup = function(callback) {
		$("#yanba_popup_div").hide();		
	}
    	
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