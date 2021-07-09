if (typeof AudioUtils == "undefined") {
    AudioUtils = {};
}
AudioUtils = {
    params: {
        maxChunkSize: 100,
        minChunkSize: 20,
        audioList: [],
        spd: 6,
        per: 0,//发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
        preloadSize: 2,
        audioSettings: {spd: 6, per: 0},
        audioSettingsKey: "SET_AUDIO"
    },
    mark: {
        $mark: null,
        $results: null,
        currentClass: "current",
        offsetTop: 50,
        currentIndex: 0
    },
    playSpeechElement: null,
    $content: null,
    url: "//tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=31&spd={spd}&per={per}&tex=",
    urlList: [],
    chunkList: [],
    audioList: [],
    curIndex: 0,
    isFirstPlay: true,
    init: function () {
        this.urlList = [],
            this.chunkList = [], this.audioList = [], this.curIndex = 0, this.isFirstPlay = true;
        this.playSpeechElement.data("status", 0);
    },
    jumpToMark: function () {
        var that = this;
        //var lang = i18nUtils.getDefaultLocale();
        if (that.mark.$results.length) {
            var position, $current = that.mark.$results.eq(that.mark.currentIndex);
            //that.mark.$results.removeClass(that.mark.currentClass);
            if ($current.length) {
                //$current.addClass(that.mark.currentClass);
                position = $current.offset().top - that.mark.offsetTop;
                window.scrollTo(0, position);
            }
        }
    },
    markText: function (searchVal) {
        var that = this;
        that.mark.$mark.unmark();
        that.mark.$mark.mark(searchVal, {
            separateWordSearch: false,
            done: function () {
                that.mark.$results = that.$content.find("mark");
                //that.mark.$results.addClass(that.mark.currentClass);
                that.mark.currentIndex = 0;
                that.jumpToMark();
            }
        });
    },
    play: function () {
        var that = this;
        var searchText = that.chunkList[that.curIndex];
        console.log("==play==", that.curIndex, searchText);
        try {
            var promise = that.audioList[0].play();
            that.markText(searchText);
            this.playSpeechElement.data("status", 1);
            this.playSpeechElement.next("label").text(i18nUtils.prop("book_audio_pause"));
            if (promise !== undefined) {
                promise.catch(function (e) {
                    that.alert(i18nUtils.prop("book_audio_auto_play_error"));
                    that.pause();
                })
            }
        } catch (err) {
            this.alert("Play error:" + err.message)
        }

    },
    pause: function () {
        console.log("==pause==");
        var that = this;
        try {
            $.storage("auto-play", "false");
        } catch (err) {
            var txt = "set not auto play failed：" + err.message + "\n\n";
            that.alert(txt, 2);
        }
        try {
            this.audioList[0].pause();
            this.playSpeechElement.data("status", -1);
            this.playSpeechElement.next("label").text(i18nUtils.prop("book_audio_play"));
        } catch (err) {
            this.alert("Pause failed:" + err.message)
        }
    },
    seek: function (i) {
        this.curIndex = Math.min(i, Math.max(this.urlList.length - 1, 0))
        //console.log("==seek:{}, curIndex:{}", i, this.curIndex);
    },
    load: function (i) {
        var index = Math.min(this.curIndex + i, this.urlList.length - 1);
        var urlTemp = this.urlList[index];
        if ((i == 0 && this.isFirstPlay) || i == 1) {
            console.log("==load index:{}, per:{}, spd:{}", index, this.params.per, this.params.spd);
            urlTemp = urlTemp.replace("{per}", this.params.per);
            urlTemp = urlTemp.replace("{spd}", this.params.spd);
            console.log("==load index:{}, url:{} isFirstPlay:", index, urlTemp, this.isFirstPlay);
            this.audioList[i].src = urlTemp
        }
    },
    loadAll: function () {
        var i = this;
        this.audioList.forEach(function (t, e) {
            console.log("==loadAll e:{}", e);
            i.curIndex + e < i.urlList.length && i.load(e)
        })
    },
    onAudioEnded: function () {
        //console.log("==onAudioEnded="+ this.curIndex);
        var that = this;
        if (this.curIndex + 1 < this.urlList.length) {
            this.audioList.push(this.audioList.shift());
            this.curIndex += 1;
            this.playAudio(this.curIndex)
        } else {
            console.log("==all audio played==");
            that.mark.$mark.unmark();
        }
    },
    getAudioHtml:function(){
        return '<div id="audioOptSet" class="read-opt-bot read-opt-set"> <div class="read-set-font"><a href="javascript:" id="audioSpeedDown" class="read-font-down" data-index="0" role="button"> <span>S-</span> </a> <a href="javascript:" id="audioSpeedUp" class="read-font-up" data-index="1" role="button"> <span>S+</span> </a> <div class="read-font-bar"> <input type="range" id="audioSpeedRange" name="font-size" min="1" max="10" value="6"/> </div> </div> <div id="audioSetLayout" class="read-set-layout"> <ul class="btn-group"> <li class="btn-group-cell read-set-cell"> <input type="radio" id="audioPer0" name="audioPer" value="1"> <label class="read-btn-layout" for="audioPer0">男声</label> </li> <li class="btn-group-cell read-set-cell"> <input type="radio" id="audioPer1" name="audioPer" value="0" checked> <label class="read-btn-layout" for="audioPer1">女生</label> </li> <li class="btn-group-cell read-set-cell"> <input type="radio" id="audioPer3" name="audioPer" value="3"> <label class="read-btn-layout" for="audioPer3">逍遥</label> </li> <li class="btn-group-cell read-set-cell"> <input type="radio" id="audioPer4" name="audioPer" value="4"> <label class="read-btn-layout" for="audioPer4">软萌</label> </li> </ul> </div> <div class="read-set-layout"> <ul class="btn-group"> <li class="btn-group-cell read-set-cell"> <input type="radio" data-status="0" id="play_audio" name="audioPlay" checked/> <label class="read-btn-layout" for="play_audio">'+i18nUtils.prop("book_audio_play")+'</label> </li><li class="btn-group-cell read-set-cell"> <input type="radio" id="close_audio" name="close_audio" checked/> <label class="read-btn-layout" for="close_audio">关闭</label> </li> </ul> </div> </div>';
    },
    initPlayBar: function (textId) {
        var that = this;
        $("body").append(that.getAudioHtml());
        that.$content = $("#" + textId);
        var st = BookUtils.getStorage(that.params.audioSettingsKey);
        console.log("audioSettings:", st);
        if (st) {
            that.params.spd = st.spd;
            that.params.per = st.per;
            $("#audioSpeedRange").val(st.spd);
            $("input[name='audioPer'][value='" + st.per + "']").prop('checked', true);
        }

        that.mark.$mark = new Mark("#" + textId);
        that.playSpeechElement = $("#play_audio");
        that.playSpeechElement.click(function () {
            var status = that.playBarStatus();
            if (status === 0) {
                var text = that.$content.text();
                that.initAudio(text);
            } else if (status === 1) {
                that.pause();
            } else {
                that.play();
            }
        }).next("label").text(i18nUtils.prop("book_audio_play"));

        try {
            var audioOpt = $("#audioOpt");
            var $audioOptSet = $("#audioOptSet");
            audioOpt.on("click", function () {
                $audioOptSet.addClass("active")
            });
            $("#close_audio").on("click", function () {
                $audioOptSet.removeClass("active");
            });
            var audioSpeedRange = $("#audioSpeedRange");
            rangeOptForAudio(audioSpeedRange, {
                buttons: ["#audioSpeedDown", "#audioSpeedUp"]
            });
            $("#audioSetLayout").on("click", '[type="radio"][name="audioPer"]', function () {
                var t = $(this);
                console.log("per:", t.val());
                that.params.per = t.val();
                that.updateAudioSettings({
                    per: t.val()
                })
            });
            audioSpeedRange.on("change", function (e) {
                var t = this.value;
                console.log("speed:", t);
                that.params.spd = t;
                that.updateAudioSettings({
                    spd: t
                })
            });
        } catch (err) {
            console.log("Auto play error：" + err)
            var txt = "Auto play error：" + err.message + "\n\n";
            that.alert(txt, 2);
        }

    },
    updateAudioSettings: function (a) {
        var that = this,
            v = that.params;
        v.audioSettings = $.extend(v.audioSettings, a)
        BookUtils.setStorage(v.audioSettingsKey, v.audioSettings);
    },
    playAudio: function (i) {
        this.seek(i), this.loadAll();
        this.play();
    },
    restartAudio: function () {
        this.audioList[0].pause();
        this.loadAll();
        this.play();
    },
    alert: function (txt, type) {
        var that = this;
        if (!type) {
            type = 1
        }
        if (layer) {
            if (type === 1) {
                layer.open({content: txt, skin: 'msg', time: 2});
            } else {
                layer.open({content: txt, btn: 'Ok'});
            }
        } else {
            alert(txt)
        }
    },
    initAudioList: function () {
        var that = this;
        try {
            for (var p = 0; p < that.params.preloadSize; p++) {
                var v = new Audio();
                v.addEventListener("play", function () {
                }),
                    v.addEventListener("pause", function () {
                    }),
                    v.addEventListener("ended", function () {
                        that.onAudioEnded()
                    });
                that.audioList.push(v)
            }
        } catch (err) {
            var txt = i18nUtils.prop("book_audio_play_not_support") + err.message + "\n\n";
            txt += i18nUtils.prop("book_audio_play_not_support_tip");
            that.alert(txt, 2);
        }

    },
    playBarStatus: function () {
        var status = this.playSpeechElement.data("status");
        return status;
    },
    initAudio: function (text) {
        if (!text || text.length <= 0) {
            this.alert(i18nUtils.prop("book_audio_play_no_data"))
            return false;
        }
        this.init();
        this.initAudioList();
        this.initUrlList(text);
        this.playAudio(this.curIndex);
        this.isFirstPlay = false;
    },
    text2Audio: function (text) {
        console.log("text:{}", text);
        var that = this;
        if (text && text.length <= 0) {
            that.alert(i18nUtils.prop("book_audio_play_no_data"))
            return false;
        }
        var stringList = that.initUrlList(text)
        var audio = new Audio();
        var index = 1;
        var ttsUrl = "https://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&spd=6&tex=";
        audio.src = ttsUrl + encodeURIComponent(stringList[0]);
        audio.play();

        audio.onended = function () {
            if (index < stringList.length) {
                audio.src = ttsUrl + encodeURIComponent(stringList[index]);
                audio.play();
                index++;
            }
        };
        return audio;
    },
    extraText: function (n) {
        var that = this;
        if (n.length <= that.params.maxChunkSize) return n;
        for (var e = []; n.length > that.params.maxChunkSize;) e.push(n.slice(0, that.params.maxChunkSize)), n = n.slice(that.params.maxChunkSize);
        return e.push(n), e
    },
    initUrlList: function (text) {
        var that = this;
        var n = text.replace(/<\/?([^>]*)>/g, "$1"), n = n.trim().replace(/\s+/g, " ");
        var u = n.split(/[。；？！：:.;?!]/);
        u = u.filter(function (n) {
            return !/^\s*$/.test(n)
        });
        that.chunkList = u;
        that.chunkList.push("本章播放完毕，请点击下一章");
        that.chunkList.map(function (n) {
            that.urlList.push(that.url + encodeURIComponent(n))
            // that.urlList.push(that.url + (n))
        });
        return u;
    },
};

function rangeOptForAudio(t, a) {
    var n = this,
        e = {
            container: $("body"),
            shadow: !1,
            buttons: ["", ""],
            onChangeEnd: function () {
            },
            tips: function (t) {
                return t
            }
        }, i = $.extend({}, e, a || {}),
        s = t.attr("min") || 0,
        r = t.attr("max") || 100,
        o = t.attr("step") || 1,
        l = $("<div></div>").attr("class", t.attr("class")).addClass("range"),
        d = $("<div></div>").addClass("range-track"),
        u = $("<a></a>").addClass("range-thumb").attr({
            role: "slider",
            "aria-valuenow": t.val(),
            "aria-valuemax": r,
            "aria-valuemin": s
        }),
        h = $();
    1 == i.shadow && (h = $("<a></a>").addClass("range-shadow").attr("title", "之前位置")),
        t.before(l),
    0 == l.width() && l.width(t.width()),
        d.append(u),
        l.append(d).prepend(h),
        l.on("click", function (a) {
            var e = a && a.target;
            if (e)
                if (h.length && e == h[0]) {
                    var o = $(e).attr("data-value"),
                        l = t.val();
                    o && l != o && (rangeOptValueForAudio(o),
                        i.onChangeEnd.call(t, n))
                } else if (e != u[0]) {
                    var d = a.clientX - (u.offset().left - $(window).scrollLeft()) - u.width() / 2;
                    rangeOptValueForAudio(1 * t.val() + (r - s) * d / $(this).width()),
                        i.onChangeEnd.call(t, n)
                }
        });
    var c = {
        distance: 0
    };
    return u.on("touchstart", function (a) {
        var n = a.touches[0] || a;
        c.x = n.pageX,
            c.value = 1 * t.val(),
            c.distance = 0;
        var e = c.value;
        $.isFunction(i.tips) && (e = i.tips.call(t, c.value)),
            u.attr("data-tips", e).attr("aria-valuenow", e).addClass("active")
    }),
        i.container.on({
            touchmove: function (a) {
                var e = a.touches[0] || a;
                if ("number" == typeof c.x) {
                    var o = e.pageX - c.x;
                    c.distance = o,
                        rangeOptValueForAudio(c.value + (r - s) * o / l.width());
                    var d = t.val();
                    $.isFunction(i.tips) && (d = i.tips.call(t, d)),
                        u.attr("data-tips", d).attr("aria-valuenow", d),
                        a.preventDefault()
                }
            },
            touchend: function () {
                Math.abs(c.distance) > 0 && i.onChangeEnd.call(t, n),
                    c.x = null,
                    c.value = null,
                    u.removeClass("active"),
                    c.distance = 0
            }
        }),
    $.isArray(i.buttons) && i.buttons.forEach(function (a, e) {
        a && ("string" == typeof a && (a = $(a)),
        a.length && (a.on("click", function () {
            var a = +$(this).data("index"),
                e = t.attr("max"),
                s = t.attr("min") || "1",
                r = t.attr("step") || "1",
                o = t.val(),
                l = o;
            0 == a ? (l = o - r) < s && (l = s) : 1 == a && (l = 1 * o + 1 * r) > e && (l = e),
            l !== o && (rangeOptValueForAudio(l),
                i.onChangeEnd.call(t, n))
        }).data("index", e),
            a.attr("role", "button")))
    }),
        this.num_audio = {
            min: +s,
            max: +r,
            step: +o
        },
        this.el_audio = {
            input: t,
            container: l,
            track: d,
            thumb: u,
            shadow: h
        },
        rangeOptValueForAudio(),
        this
}

function rangeOptValueForAudio(t) {
    var a = this.el_audio.input,
        n = a.val(),
        e = this.num_audio.max,
        i = this.num_audio.min,
        s = this.num_audio.step;
    return t || (n = t,
        t = $.trim(a.val())),
        t = t > e || e - t < s / 2 ? e : "" == t || t < i || t - i < s / 2 ? i : i + Math.round((t - i) / s) * s,
        a.val(t),
        rangeOptPositionForAudio(),
    t != n && a.trigger("change"),
        this
}

function rangeOptPositionForAudio() {
    var t = this.el_audio.input.val(),
        a = this.num_audio.max,
        n = this.num_audio.min;
    return this.num_audio.step,
        this.el_audio.track.css("borderLeftWidth", this.el_audio.container.width() * (t - n) / (a - n)),
        this
}

 
