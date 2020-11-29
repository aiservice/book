$(function() {
    window.player = {
        loadSection : function(type, resourcesid,sections,flow, callback) {//加载章节列表
            var self=this;
            var url='/ajax/playlist/'+type+'/'+resourcesid;
            if(sections){
                url+='/'+sections;
            }
            if(flow){
                url+='/'+flow;
            }
            $.yyting.ajax({
                url : url,
                success : function(data) {
                    var $html=$(data);
                    var section=$html.filter('.section');
                    if(section.length==1){
                        if (flow == 'last') {
                            $('.section-body').prepend(section.html());
                        } else {
                            $('.section-body').append(section.html());
                        }
                        $('.section-body').find('li:last').addClass('last').siblings().removeClass('last');
                    }
                    var detail=$html.filter('.detail');
                    if(detail.length==1){
                        $('.aside-inner').html(detail.html());
                        var isCl = $('#share-collection').val();
                        if(isCl == 1){
                            $('.player-r-collection').html("已收藏");
                            $('.player-r-collection').addClass('d-collection-a');
                        }
                        $('.player-r-cover').attr('src',$('#user-photo').val())
                        document.title="在线播放"+$('#js-name').val()+"，播放列表,懒人听书官网-知名有声阅读平台，身边的有声图书馆";
                    }
                    self.sort(callback);
                }
            });
        },
        sort:function(callback){//章节排序
            var maxNumber=0;
            var section_w=$('.section-body');
            section_w.find('input[name="number"]').each(function(){
                var number=parseInt($(this).val());
                if(number>maxNumber){
                    maxNumber=number;
                }
            });
            var temp=$('<div />');
            for(var i=0;i<=maxNumber;i++){
                temp.append(section_w.children('.section'+i).eq(0));
            }
            section_w.html(temp.html());
            if (callback) {
                callback();
            }
        },
        getSectionInfo : function($dom) {//设置window.ydata信息
            $dom.find('input[type="hidden"]').each(function() {
                var $this = $(this);
                window.ydata[$this.attr('name')] = $this.val();
                if($this.attr('data-href')){
                    $('.'+$this.attr('name')).attr('href',$this.attr('data-href'));
                }
            });
            if(window.ydata['share-entityType']==4&&!window.ydata.source) {
                var pathUrl = '/ajax/path/4/'+window.ydata['share-fatherEntityId']+'/'+window.ydata['sectionid'];
                $.yyting.ajax({
                    url : pathUrl,
                    async : false,
                    success : function(data) {
                        if(data.data) {
                            window.ydata['source']=data.data;
                        }
                    }
                });
            }
            $.yyting.localStorage('player-info', JSON.stringify(window.ydata));
            if(!window.ydata.source){
                var tips=$('.player-error-tips');
                tips.show();
                setTimeout(function(){
                    tips.fadeOut();
                    $dom.next().click();
                },5000);
            }
        },
        setPlayerInfo : function() {//设置播放信息
            for ( var i in window.ydata) {
                var $dom=$('.' + i);
                if (i == 'player-r-cover') {
                    $dom.attr('src', window.ydata[i]);
                } else {
                    if(i == 'player-r-original' && window.ydata[i] == ''){
                        $dom.parent().hide();
                    }else{
                        $dom.text(window.ydata[i]);
                    }
                }
            }
        },
        init : function() {
            var self = this;
            this.createAudiojs();
            this.addListener();
            this.currentTimeInterval();
        },
        addListener : function() {//播放器事件监听
            var self=this;
            $('.section').on('click', '.section-item', function() {
                var $this = $(this);
                self.getSectionInfo($this);
                self.setPlayerInfo();
                if(window.audio&&window.ydata.source){
                    window.audio.load(window.ydata.source);
                    window.audio.play();
                }

            }).on('click','.last',function(){
                self.loadNext();
            });
            $('.player-play').on('click', function() {
                window.audio.play();
            });
            $('.player-pause').on('click', function() {
                window.audio.pause();
            });
            $('.player-prev').on('click', function() {
                var prev=$('.section li.active').prev();
                if(prev.length==0){
                    var lastSection=$('.section-item:first');
                    var sections = lastSection.find('input[name=number]').val()
                    self.loadSection(window.ydata.type, window.ydata.resourcesid,sections, 'last',function(){
                        $('.section li.active').prev().click();
                    });
                }else{
                    prev.click();
                }
            });
            $('.player-next').on('click', function() {
                $('.section li.active').next().click();
            });
            this.progressEvent();
        },
        progressEvent:function(){
            /* 播放进度 */
            var control = $('.player-progress-control');
            var position = $('.player-progress-position');
            var pcontrol = control.parent();
            var initX = 0;
            var positionX = 0;
            this.progressMoveMark = false;
            control.on('mousedown', function(e) {
                initX = e.pageX;
                positionX = control.position().left;
                var left = 0;
                $(document).on('mousemove', function(e) {
                    left = positionX + (e.pageX - initX);
                    if (left > pcontrol.width()) {
                        left = pcontrol.width();
                    }
                    if (left < 0) {
                        left = 0;
                    }
                    control.css('left', left);
                    position.width(left);
                    this.progressMoveMark = true;
                }).on('mouseup', function(e) {
                    window.audio.skipTo(left / pcontrol.width());
                    this.progressMoveMark = false;
                    $(document).off('mousemove').off('mouseup');
                });
                e.preventDefault();
            });
            pcontrol.on('click', function(e) {
                if (control[0] != e.target) {
                    var left = e.pageX - pcontrol.offset().left;
                    control.css('left', left);
                    position.width(left);
                    window.audio.skipTo(left / pcontrol.width());
                }
            });
            /* 修改音量 */
            var vprogress = $('.player-volume-progress');
            var vposition = $('.player-volume-position');
            vprogress.on('click', function(e) {
                var left = e.pageX - vprogress.offset().left;
                vposition.width(left);
                var volume = parseFloat(left / vprogress.width() * 100) / 100;
                window.audio.setVolume(volume);
                $.yyting.localStorage('volume', volume);
            });
        },
        createAudiojs : function() {//创建audiojs
            /* 初始化播放器 */
            var self=this;
            var currentTime = $('.player-current-time');
            var durationTime = $('.player-duration-time');
            var progressPosition = $('.player-progress-position');
            var progressControl = $('.player-progress-control');
            var progressLoaded = $('.player-progress-loaded');
            audiojs.events.ready(function() {
                function setProgress(val) {
                    if (!self.progressMoveMark) {
                        progressControl.css('left', val);
                        progressPosition.width(val);
                    }
                }
                window.audio = audiojs.createAll({
                    loadError : function() {
                        if(!window.ydata.ctime){
                            window.ydata.ctime=window.ydata.ctime||window.audio.element.currentTime;
                            //console.log('window.ydata.ctime:'+window.ydata.ctime);
                        }
                        var source = window.ydata.source;
                        var sourceError = typeof source !== 'string' && !/^https?:\/\//.test(source);
                        if (sourceError) {
                            console.log('资源路径错误');
                            return
                        }
                        if (window.audio) {
                            window.audio.load(source);
                            window.audio.play();
                        }
                    },
                    init:function(){
                        var volume = $.yyting.localStorage('volume')|| this.element.volume;
                        this.setVolume(volume);
                        $('.player-volume-position').css('width',parseFloat(volume) * 100 + '%');
                    },
                    loadProgress : function(b) {
                        progressLoaded.css('width', b * 100 + '%');
                    },
                    loadStarted : function() {
                        var b = this.settings.createPlayer, c = Math
                            .floor(this.duration / 60), d = Math
                            .floor(this.duration % 60);
                        durationTime.text((c < 10 ? "0" : "") + c + ":"
                            + (d < 10 ? "0" : "") + d);
                        if(window.ydata.ctime&&this.duration){
                            var time=window.ydata.ctime;
                            window.ydata.ctime='';
                            //console.log('time:'+time+'/'+this.duration);
                            var self=this;
                            setTimeout(function(){
                                self.skipTo(parseFloat(time)/self.duration);
                            },200);
                        }

                    },
                    updatePlayhead : function(b) {
                        if(b * 100<=100){
                            setProgress(b * 100 + '%');
                        }
                        var c = this.duration * b;
                        this.currentTime=c;
                        var b = Math.floor(c / 60);
                        var c = Math.floor(c % 60);
                        currentTime.text((b < 10 ? "0" : "") + b + ":"
                            + (c < 10 ? "0" : "") + c);
                    },
                    play : function() {
                        $('.player-play').hide();
                        $('.player-pause').show();
                        var sectionItem=$('#section' + window.ydata.sectionid);
                        sectionItem.addClass('active').removeClass('pause').siblings().removeClass('active');
                        setTimeout(function(){
                            self.updateCurrentTime();
                        },1500);
                        window.ydata.sections=window.ydata.number;
                        $.yyting.localStorage('player-info', JSON.stringify(window.ydata));
                    },
                    pause : function() {
                        $('.player-play').show();
                        $('.player-pause').hide();
                        $('.section-item.active').addClass('pause');
                    },
                    trackEnded : function() {
                        $('.player-next').click();
                    },
                    css:''
                })[0];
            });
        },
        toPlay:function(){//播放器开始播放入口
            var self=this;
            //支持链接传参
            if($.yyting.params&&$.yyting.params.resourcesid){
                $.yyting.localStorage('player-info',JSON.stringify($.yyting.params));
                location.href=location.href.split('?')[0];
            }
            var playerInfo=JSON.parse($.yyting.localStorage('player-info'));
            if (!window.ydata) {
                window.ydata = {
                    resourcesid:'',
                    sections:'',
                    type:'',
                    ctime:''
                };
            }
            if(window.ydata.resourcesid!=playerInfo.resourcesid){
                $('.section-body').html('');
            }
            var sectionItem=$('.section'+playerInfo.sections);
            if(sectionItem.length==1&&window.ydata.resourcesid==playerInfo.resourcesid){
                sectionItem.click();
            }
            window.ydata.resourcesid=playerInfo.resourcesid;
            window.ydata.sections=playerInfo.sections;
            window.ydata.type=playerInfo.type;
            window.ydata.ctime=playerInfo.ctime;
            //console.log('ctime:'+window.ydata.ctime);
            if(sectionItem.length==0){
                $('.section-body').html('');
                this.loadSection(playerInfo.type, playerInfo.resourcesid,playerInfo.sections, '', function() {
                    var acitve=$('.section-item.section'+playerInfo.sections);
                    if(acitve.length==0){
                        acitve=$('.section-item:first');
                    }
                    self.getSectionInfo(acitve);
                    self.setPlayerInfo();
                    if(window.audio&&window.ydata.source){
                        window.audio.load(window.ydata.source);
                        window.audio.play();
                    }
                });
            }
        },
        getAlbumInfo:function(url){//获取专辑或书籍信息
            $.yyting.ajax({
                url:url,
                success:function(data){
                    $('.aside-inner').html(data);
                }
            })
        },
        updateCurrentTime:function(callback){//更新播放记录
            if($.yyting.checkLogin()){
                $.yyting.ajax({
                    url : "/my/addRecentListen.do",
                    type:"POST",
                    dataType:"json",
                    data:{
                        entityId:window.ydata.resourcesid,
                        sonId:window.ydata.sectionid,
                        entityType:window.ydata.type,
                        listpos:window.ydata.number,
                        playpos:parseInt(window.audio.element.currentTime||window.audio.currentTime || 0),
                        cToken:$('#cToken').val()
                    },
                    success:function(){
                        if(callback){
                            callback();
                        }
                    },
                    error:function(){
                        if(callback){
                            callback();
                        }
                    }
                });
            }
        },
        currentTimeInterval:function(){//更新播放记录的定时器
            var self=this;
            setTimeout(function(){
                self.updateCurrentTime(function(){
                    self.currentTimeInterval();
                });
            },1000*60);
        },
        loadNext:function(){//加载列表尾部更多章节
            var lastSection=$('.section-item:last');
            var sections = lastSection.find('input[name=number]').val()
            this.loadSection(window.ydata.type, window.ydata.resourcesid,sections, 'next');
        }
    };
    player.init();
    if(!$.browser.msie){
        player.toPlay();
    }
    if($.browser.msie&&$.browser.version=='7.0'){
        player.toPlay();
    }
    setInterval(function(){
        $.yyting.localStorage('exist', Math.random()*100000);
    },1000);
});