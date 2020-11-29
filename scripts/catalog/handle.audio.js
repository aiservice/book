if(typeof audioList !== 'undefined'&&(audioList.length>0)){
    console.log("audioList:"+audioList.length);
    var html = '';
    var ia = 1;
    for(var c in audioList){
        html += '<li class="chapter-li" id="chapter'+ia+'" data-num="'+ia+'"> <a href="#chapter'+ia+'" data-src="'+audioList[c].urlAudio+'" class="chapter-li-a"> <span class="chapter-index">'+(ia++)+'. '+audioList[c].title+'</span> </a> </li>';
    }
    $("#audios").append(html);
}else{
    var tip4 = i18nUtils.prop("book_listen_tip4");
    $("#audios").append("<li class=\"chapter-li\"><a class=\"chapter-li-a\" href='#'>"+tip4+"</a></li>");
    //audioTip();
}
var tip5 = i18nUtils.prop("book_listen_tip5");
$("#summary").prepend("<div class=\"module module-merge\"><div class=\"chapter-li-a playing\">"+tip5+"</div></div>");

$(function() {
    // Setup the player to autoplay the next track
    var currentTime = $('.player-current-time');
    var durationTime = $('.player-duration-time');
    var progressLoaded = $('.play-round');
    var playBtn = $('.play-btn');


    var ting_params = {
        volume :0,
        store_chapter_key :"ting-chapter"+$("#bookDetailWrapper").data("bid"),
        progressMoveMark :false
    }

    function setProgress(val) {
        if(!ting_params.progressMoveMark){
            progressLoaded.css('width', val);
        }
    }
    progressEvent();
    function progressEvent(){
        /* 播放进度 */
        var control = $('.play-round');
        var pcontrol = control.parent();
        // var initX = 0;
        // var positionX = 0;
        // control.on('mousedown', function(e) {
        //     initX = e.pageX;
        //     positionX = control.position().left;
        //     var left = 0;
        //     $(document).on('mousemove', function(e) {
        //         left = positionX + (e.pageX - initX);
        //         if (left > pcontrol.width()) {
        //             left = pcontrol.width();
        //         }
        //         if (left < 0) {
        //             left = 0;
        //         }
        //         control.css('width', left);
        //         ting_params.progressMoveMark = true;
        //     }).on('mouseup', function(e) {
        //         audio.skipTo(left / pcontrol.width());
        //         ting_params.progressMoveMark = false;
        //         $(document).off('mousemove').off('mouseup');
        //     });
        //     e.preventDefault();
        // });
        pcontrol.on('click', function(e) {
            // if (control[0] != e.target) {
            //     var xpage = e.pageX;
            var offset = pcontrol.offset().left;
            // var pwidth =  pcontrol.width();
            var left = e.pageX-offset;
            var width  = left / pcontrol.width();
            // console.log("xpage:"+xpage+", offset:"+offset+" widthfull:"+pwidth+" left:"+left+" width:"+width)
            control.css('width', width);
            audio.skipTo(width);
            // }
        });
    }

    var a = audiojs.createAll({
        loadError : function() {
            BookUtils.tip("资源路径错误")
        },
        loadProgress : function(b) {
            // console.log("loadProgress:"+b);
            $(".cache-round").css('width', b * 100 + '%');
        },
        loadStarted : function() {
            // console.log("loadStarted:"+this.duration);
            var c = Math
                .floor(this.duration / 60), d = Math
                .floor(this.duration % 60);
            durationTime.text((c < 10 ? "0" : "") + c + ":"
                + (d < 10 ? "0" : "") + d);
        },
        updatePlayhead : function(b) {
            // console.log("updatePlayhead:"+this.duration);
            if(b * 100<=100){
                setProgress(b * 100 + '%');
            }
            var c = this.duration * b;
            var b = Math.floor(c / 60);
            c = Math.floor(c % 60);
            currentTime.text((b < 10 ? "0" : "") + b + ":"
                + (c < 10 ? "0" : "") + c);
        },
        play : function() {
            var curPlay = $('li.playing');
            console.log("play:"+curPlay.data("num"));
            playBtn.removeClass("player-play").addClass("player-pause");
            BookUtils.setStorage(ting_params.store_chapter_key,curPlay.data("num"))
            $("#cur_play").text(curPlay.text());
            if(typeof site_enabled_g != "undefined" && site_enabled_g){
                $("#ads_div").empty().load("/scripts/ads/ads_auto_no_write.js");
            }
        },
        pause : function() {
            playBtn.removeClass("player-pause").addClass("player-play");
        },
        trackEnded: function() {
            var next = $('#audios li.playing').next();
            if (!next.length) next = $('#audios li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
            BookUtils.setStorage(ting_params.store_chapter_key,this.element.volume)
        }
    });

    // Load in the first track
    var audio = a[0];
    var firstChapter = $('#audios li').first();
    console.log(ting_params.store_chapter_key)
    if(BookUtils.getStorage(ting_params.store_chapter_key)){
        firstChapter = $("#chapter"+BookUtils.getStorage(ting_params.store_chapter_key));
    }
    firstChapter.addClass('playing');
    var audio_url = $('a', firstChapter).attr('data-src');
    if(audio_url){
        audio.load($('a', firstChapter).attr('data-src'));
        $("#cur_play").text(firstChapter.text());
    }
    // Load in a track on click
    $('#audios li').click(function(e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        audio_url = $('li.playing').find("a").attr('data-src');
        if(audio_url){
            audio.load(audio_url)
            audio.play();
        }
    });
    playBtn.click(function(e) {
        audio_url = $('li.playing').find("a").attr('data-src');
        if(audio_url){
            audio.playPause();
        }
    });
    $("#play_last").click(function(e) {
        var prev = $('li.playing').prev();
        if (!prev.length) prev = $('#audios li').last();
        prev.click();
    });
    $("#play_next").click(function(e) {
        var next = $('li.playing').next();
        if (!next.length) next = $('#audios li').first();
        next.click();
    });
    // Keyboard shortcuts
    $(document).keydown(function(e) {
        var unicode = e.charCode ? e.charCode : e.keyCode;
        // right arrow
        if (unicode == 39) {
            var next = $('li.playing').next();
            if (!next.length) next = $('#audios li').first();
            next.click();
            // back arrow
        } else if (unicode == 37) {
            var prev = $('li.playing').prev();
            if (!prev.length) prev = $('#audios li').last();
            prev.click();
            // spacebar
        } else if (unicode == 32) {
            audio.playPause();
        }
    })

});

function audioTip(){
    var lang = i18nUtils.getDefaultLocale();
    var tip1 = i18nUtils.prop("book_listen_tip1"),tip2=i18nUtils.prop("book_listen_tip2"),tip3=i18nUtils.prop("book_listen_tip3");
    if(lang != 'en'){
        tip1 = "暂无音频数据，可以通过以下方式在线听书"
    }
    layer.open({
        title: [tip1],
        content: tip2+"<br/>"+tip3
        ,btn: 'Ok'
    });
}
