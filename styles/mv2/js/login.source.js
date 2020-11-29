var LoginV1 = {
    nextAction      : 0,
    isLogin         : false,
    ajaxLock        : false,
    key_bookshelf   : "BOOK_SHELF",
    thirdLoginShow  : 0,
    init: function(params) {
        $('#j-delPassWord').hide();

        $('#j-delPassWord').on('click', function () {
            $(this).prev().val('');
            $('.login-button').addClass('disabled');
        });
        $('#j-switchBtn').on('click', function () {
            if ( LoginV1.thirdLoginShow == 0 ) {
                //第一次点击时箭头变上，展开其他登录方式，父级容器上移
                $('.icon-arrow-down').addClass('up');
                $('#j-otherWay').animate({
                    height: '0.36rem',
                    opacity: 1
                }, 'fast').addClass('on');
                $('#j-otherLogin').addClass('up');
                LoginV1.thirdLoginShow = 1;
                $('#j-switchBtn').attr('data-report', '1'); // 此处标志是否需要上报，由于该事件在stat.click事件之前，所以值为相反的

            } else {
                //非第一次点击时箭头变下，收起其他登录方式，父级容器下移
                $('.icon-arrow-down').removeClass('up');
                $('#j-otherWay').animate({
                    height: '0',
                    opacity: 0
                }, 'fast').removeClass('on');
                $('#j-otherLogin').removeClass('up');
                LoginV1.thirdLoginShow = 0;
                $('#j-switchBtn').attr('data-report', '0'); // 此处标志是否需要上报，由于该事件在stat.click事件之前，所以值为相反的
            }
        });
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
        $('input').on('keyup', function(e) {
            LoginV1.hideError();
            if (LoginV1.checkForm()) {
                $('.login-button').removeClass('disabled');
            } else {
                $('.login-button').addClass('disabled');
            }
        });
        $('input').on('focus', function(e) {
            $(this).parent().removeClass('error');
        });
        $('#password').on('keyup', function() {
            var val = $(this).val().trim();
            if (val != '') {
                $('#j-delPassWord').show();
            } else {
                $('#j-delPassWord').hide();
            }
        }).on('focus', function() {
            var val = $(this).val().trim();
            if (val != '') {
                $('#j-delPassWord').show();
            } else {
                $('#j-delPassWord').hide();
            }
        }).on('blur', function() {
            setTimeout(function() { $('#j-delPassWord').hide(); }, 100);
        });

        $('.login-button').on('click', function() {
            if (LoginV1.checkForm()) {
                LoginV1.login();
            }
        });
        $('#imgCode').on('click', function() {
            LoginV1.refreshCode();
        });
        $('#btnRefreshCode').on('click', function() {
            LoginV1.refreshCode();
        });
    },
    refreshCode: function() {
        var url = $('#imgCode').attr('src');
        if (url.indexOf('&r=') > -1) {
            url = url.substr(0, url.indexOf('&r='));
        }
        url += '&r=' + (Math.random() * 10);
        $('#imgCode').attr('src', url);
    },
    checkForm: function() {
        var username = $('#user_name').val().trim();
        var password = $('#password').val();
        //console.log("username:{} password:{}",username,password)
        if (username.length == 0) {
            return false;
        }
        if (password.length == 0) {
            return false;
        }

        var code = $('#txtCode').val().trim();
        if (code.length == 0) {
            return false;
        }
        return true;
    },
    hideError: function() {
        $('.error-tip').html('').addClass('hidden');
    },
    login: function(){
        var that = this;
        if (LoginV1.ajaxLock || $('.login-button').hasClass('loading')) {
            return;
        }
        LoginV1.ajaxLock = true;
        $('.login-button').addClass('loading');
        $.ajax({
            type: "POST",
            url: "?method=loginAjax",
            data: $("#login_form").serialize(),
            dataType: "json",
            error: function(xhr, status, err) {
                if (err) {
                    LoginV1.ajaxLock = false;
                }
            },
            timeout: 3000,
            success: function(data) {
                LoginV1.tip(data.msg);
                $('.login-button').removeClass('loading');
                LoginV1.ajaxLock = false;
                if(data.code == "1"){
                    var bs = that.getStorage(that.key_bookshelf);
                    var books = Array.isArray(bs)  ? bs : [];
                    if(books.length > 0){
                        var books_s = JSON.stringify(books)
                        $.post("/CsAjax.do?method=sysBookshelf",{books : books_s},function(data){
                            // if(data.code == 1){
                            // 	$.storage(that.key_bookshelf,null);
                            // }
                        });
                    }
                    location.href = "/m/myhome.html";
                }
            }
        });
    },
    getStorage: function(key) {
        try {
            return JSON.parse($.storage(key));
        } catch (r) {
            return null
        }
    },
    tip: function(text) {
        layer.open({
            content: text
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    },
    alert: function(text,btn_text) {
        if(!btn_text){
            btn_text = 'Ok';
        }
        layer.open({
            content: text
            ,btn: btn_text
        });
    },
}
$(document).ready(function(){
    LoginV1.init();
});