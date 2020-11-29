LBF.define("util.ejs2.process", function(require, exports, module) {
    function e() {
        if (!i) {
            i = !0;
            for (var e, t = r.length; t; ) {
                e = r,
                r = [];
                for (var n = -1; ++n < t; )
                    e[n]();
                t = r.length
            }
            i = !1
        }
    }
    function t() {}
    var n = module.exports = {}
      , r = []
      , i = !1;
    n.nextTick = function(t) {
        r.push(t),
        i || setTimeout(e, 0)
    }
    ,
    n.title = "browser",
    n.browser = !0,
    n.env = {},
    n.argv = [],
    n.version = "",
    n.versions = {},
    n.on = t,
    n.addListener = t,
    n.once = t,
    n.off = t,
    n.removeListener = t,
    n.removeAllListeners = t,
    n.emit = t,
    n.binding = function(e) {
        throw new Error("process.binding is not supported")
    }
    ,
    n.cwd = function() {
        return "/"
    }
    ,
    n.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }
    ,
    n.umask = function() {
        return 0
    }
}),
LBF.define("util.ejs2.fs", function(require, exports, module) {
    (module.exports = {}).readFileSync = function(e) {
        throw new Error("process.binding is not supported")
    }
}),
LBF.define("util.ejs2.path", function(require, exports, module) {
    function e(e, t) {
        for (var n = 0, r = e.length - 1; r >= 0; r--) {
            var i = e[r];
            "." === i ? e.splice(r, 1) : ".." === i ? (e.splice(r, 1),
            n++) : n && (e.splice(r, 1),
            n--)
        }
        if (t)
            for (; n--; n)
                e.unshift("..");
        return e
    }
    function t(e, t) {
        if (e.filter)
            return e.filter(t);
        for (var n = [], r = 0; r < e.length; r++)
            t(e[r], r, e) && n.push(e[r]);
        return n
    }
    var n = require("util.ejs2.process")
      , r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
      , i = function(e) {
        return r.exec(e).slice(1)
    };
    exports.resolve = function() {
        for (var r = "", i = !1, s = arguments.length - 1; s >= -1 && !i; s--) {
            var o = s >= 0 ? arguments[s] : n.cwd();
            if ("string" != typeof o)
                throw new TypeError("Arguments to path.resolve must be strings");
            o && (r = o + "/" + r,
            i = "/" === o.charAt(0))
        }
        return r = e(t(r.split("/"), function(e) {
            return !!e
        }), !i).join("/"),
        (i ? "/" : "") + r || "."
    }
    ,
    exports.normalize = function(n) {
        var r = exports.isAbsolute(n)
          , i = "/" === s(n, -1);
        return (n = e(t(n.split("/"), function(e) {
            return !!e
        }), !r).join("/")) || r || (n = "."),
        n && i && (n += "/"),
        (r ? "/" : "") + n
    }
    ,
    exports.isAbsolute = function(e) {
        return "/" === e.charAt(0)
    }
    ,
    exports.join = function() {
        var e = Array.prototype.slice.call(arguments, 0);
        return exports.normalize(t(e, function(e, t) {
            if ("string" != typeof e)
                throw new TypeError("Arguments to path.join must be strings");
            return e
        }).join("/"))
    }
    ,
    exports.relative = function(e, t) {
        function n(e) {
            for (var t = 0; t < e.length && "" === e[t]; t++)
                ;
            for (var n = e.length - 1; n >= 0 && "" === e[n]; n--)
                ;
            return t > n ? [] : e.slice(t, n - t + 1)
        }
        e = exports.resolve(e).substr(1),
        t = exports.resolve(t).substr(1);
        for (var r = n(e.split("/")), i = n(t.split("/")), s = Math.min(r.length, i.length), o = s, c = 0; c < s; c++)
            if (r[c] !== i[c]) {
                o = c;
                break
            }
        for (var a = [], c = o; c < r.length; c++)
            a.push("..");
        return (a = a.concat(i.slice(o))).join("/")
    }
    ,
    exports.sep = "/",
    exports.delimiter = ":",
    exports.dirname = function(e) {
        var t = i(e)
          , n = t[0]
          , r = t[1];
        return n || r ? (r && (r = r.substr(0, r.length - 1)),
        n + r) : "."
    }
    ,
    exports.basename = function(e, t) {
        var n = i(e)[2];
        return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)),
        n
    }
    ,
    exports.extname = function(e) {
        return i(e)[3]
    }
    ;
    var s = "b" === "ab".substr(-1) ? function(e, t, n) {
        return e.substr(t, n)
    }
    : function(e, t, n) {
        return t < 0 && (t = e.length + t),
        e.substr(t, n)
    }
}),
LBF.define("util.ejs2.utils", function(require, exports, module) {
    "use strict";
    function e(e) {
        return n[e] || e
    }
    var t = /[|\\{}()[\]^$+*?.]/g;
    exports.escapeRegExpChars = function(e) {
        return e ? String(e).replace(t, "\\$&") : ""
    }
    ;
    var n = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&#34;",
        "'": "&#39;"
    }
      , r = /[&<>\'"]/g;
    exports.escapeXML = function(t) {
        return t == undefined ? "" : String(t).replace(r, e)
    }
    ,
    exports.escapeXML.toString = function() {
        return 'function(markup) { return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char); };\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'
    }
    ,
    exports.shallowCopy = function(e, t) {
        t = t || {};
        for (var n in t)
            e[n] = t[n];
        return e
    }
    ,
    exports.cache = {
        _data: {},
        set: function(e, t) {
            this._data[e] = t
        },
        get: function(e) {
            return this._data[e]
        },
        reset: function() {
            this._data = {}
        }
    }
}),
LBF.define("util.ejs2", function(require, exports, module) {
    "use strict";
    function e(e, t) {
        var n;
        if ("/" == e.charAt(0))
            n = exports.resolveInclude(e.replace(/^\/*/, ""), t.root || "/", !0);
        else {
            if (!t.filename)
                throw new Error("`include` use relative path requires the 'filename' option.");
            n = exports.resolveInclude(e, t.filename)
        }
        return n
    }
    function t(e, t) {
        var n, r = e.filename, i = arguments.length > 1;
        if (e.cache) {
            if (!r)
                throw new Error("cache option requires a filename");
            if (n = exports.cache.get(r))
                return n;
            i || (t = c.readFileSync(r).toString().replace(d, ""))
        } else if (!i) {
            if (!r)
                throw new Error("Internal EJS error: no file name or template provided");
            t = c.readFileSync(r).toString().replace(d, "")
        }
        return n = exports.compile(t, e),
        e.cache && exports.cache.set(r, n),
        n
    }
    function n(n, r) {
        var i = l.shallowCopy({}, r);
        return i.filename = e(n, i),
        t(i)
    }
    function r(t, n) {
        var r, i, s = l.shallowCopy({}, n);
        r = e(t, s),
        i = c.readFileSync(r).toString().replace(d, ""),
        s.filename = r;
        var a = new o(i,s);
        return a.generateSource(),
        {
            source: a.source,
            filename: r,
            template: i
        }
    }
    function i(e, t, n, r) {
        var i = t.split("\n")
          , s = Math.max(r - 3, 0)
          , o = Math.min(i.length, r + 3)
          , c = i.slice(s, o).map(function(e, t) {
            var n = t + s + 1;
            return (n == r ? " >> " : "    ") + n + "| " + e
        }).join("\n");
        throw e.path = n,
        e.message = (n || "ejs") + ":" + r + "\n" + c + "\n\n" + e.message,
        e
    }
    function s(e, t) {
        f.forEach(function(n) {
            "undefined" != typeof e[n] && (t[n] = e[n])
        })
    }
    function o(e, t) {
        t = t || {};
        var n = {};
        this.templateText = e,
        this.mode = null,
        this.truncate = !1,
        this.currentLine = 1,
        this.source = "",
        this.dependencies = [],
        n.client = !1 !== t.client,
        n.escapeFunction = t.escape || l.escapeXML,
        n.compileDebug = !1 !== t.compileDebug,
        n.debug = !!t.debug,
        n.filename = t.filename,
        n.delimiter = t.delimiter || exports.delimiter || p,
        n.strict = t.strict || !1,
        n.context = t.context,
        n.cache = t.cache || !1,
        n.rmWhitespace = t.rmWhitespace,
        n.root = t.root,
        n.localsName = t.localsName || exports.localsName || h,
        n.strict ? n._with = !1 : n._with = "undefined" == typeof t._with || t._with,
        this.opts = n,
        this.regex = this.createRegex()
    }
    var c = require("util.ejs2.fs")
      , a = require("util.ejs2.path")
      , l = require("util.ejs2.utils")
      , u = !1
      , p = "%"
      , h = "locals"
      , f = ["cache", "filename", "delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "root", "rmWhitespace", "strict", "localsName"]
      , m = /;\s*$/
      , d = /^\uFEFF/;
    exports.cache = l.cache,
    exports.localsName = h,
    exports.resolveInclude = function(e, t, n) {
        var r = a.dirname
          , i = a.extname
          , s = (0,
        a.resolve)(n ? t : r(t), e);
        return i(e) || (s += ".ejs"),
        s
    }
    ,
    exports.compile = function(e, t) {
        return t && t.scope && (u || (console.warn("`scope` option is deprecated and will be removed in EJS 3"),
        u = !0),
        t.context || (t.context = t.scope),
        delete t.scope),
        new o(e,t).compile()
    }
    ,
    exports.render = function(e, n, r) {
        e && "#" === e.charAt(0) && (e = document.getElementById(e.slice(1)).innerHTML);
        var i = n || {}
          , o = r || {};
        return 2 == arguments.length && s(i, o),
        t(o, e)(i)
    }
    ,
    exports.renderFile = function() {
        var e, n = Array.prototype.slice.call(arguments), r = n.shift(), i = n.pop(), o = n.shift() || {}, c = n.pop() || {};
        c = l.shallowCopy({}, c),
        3 == arguments.length && (o.settings && o.settings["view options"] ? s(o.settings["view options"], c) : s(o, c)),
        c.filename = r;
        try {
            e = t(c)(o)
        } catch (a) {
            return i(a)
        }
        return i(null, e)
    }
    ,
    exports.clearCache = function() {
        exports.cache.reset()
    }
    ,
    o.modes = {
        EVAL: "eval",
        ESCAPED: "escaped",
        RAW: "raw",
        COMMENT: "comment",
        LITERAL: "literal"
    },
    o.prototype = {
        createRegex: function() {
            var e = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)"
              , t = l.escapeRegExpChars(this.opts.delimiter);
            return e = e.replace(/%/g, t),
            new RegExp(e)
        },
        compile: function() {
            var e, t, r = this.opts, s = "", o = "", c = r.escapeFunction;
            this.source || (this.generateSource(),
            s += "  var __output = [], __append = __output.push.bind(__output);\n",
            !1 !== r._with && (s += "  with (" + r.localsName + " || {}) {\n",
            o += "  }\n"),
            o += '  return __output.join("");\n',
            this.source = s + this.source + o),
            e = r.compileDebug ? "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + (r.filename ? JSON.stringify(r.filename) : "undefined") + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line);\n}\n" : this.source,
            r.debug && console.log(e),
            r.client && (e = "escape = escape || " + c.toString() + ";\n" + e,
            r.compileDebug && (e = "rethrow = rethrow || " + i.toString() + ";\n" + e)),
            r.strict && (e = '"use strict";\n' + e);
            try {
                t = new Function(r.localsName + ", escape, include, rethrow",e)
            } catch (u) {
                throw u instanceof SyntaxError && (r.filename && (u.message += " in " + r.filename),
                u.message += " while compiling ejs"),
                u
            }
            if (r.client)
                return t.dependencies = this.dependencies,
                t;
            var a = function(e) {
                return t.apply(r.context, [e || {}, c, function(t, i) {
                    var s = l.shallowCopy({}, e);
                    return i && (s = l.shallowCopy(s, i)),
                    n(t, r)(s)
                }
                , i])
            };
            return a.dependencies = this.dependencies,
            a
        },
        generateSource: function() {
            this.opts.rmWhitespace && (this.templateText = this.templateText.replace(/\r/g, "").replace(/^\s+|\s+$/gm, "")),
            this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
            var e = this
              , t = this.parseTemplateText()
              , n = this.opts.delimiter;
            t && t.length && t.forEach(function(i, s) {
                var o, c, a, u, p, h;
                if (0 === i.indexOf("<" + n) && 0 !== i.indexOf("<" + n + n) && (c = t[s + 2]) != n + ">" && c != "-" + n + ">" && c != "_" + n + ">")
                    throw new Error('Could not find matching close tag for "' + i + '".');
                if ((a = i.match(/^\s*include\s+(\S+)/)) && (o = t[s - 1]) && (o == "<" + n || o == "<" + n + "-" || o == "<" + n + "_"))
                    return u = l.shallowCopy({}, e.opts),
                    p = r(a[1], u),
                    h = e.opts.compileDebug ? "    ; (function(){\n      var __line = 1\n      , __lines = " + JSON.stringify(p.template) + "\n      , __filename = " + JSON.stringify(p.filename) + ";\n      try {\n" + p.source + "      } catch (e) {\n        rethrow(e, __lines, __filename, __line);\n      }\n    ; }).call(this)\n" : "    ; (function(){\n" + p.source + "    ; }).call(this)\n",
                    e.source += h,
                    void e.dependencies.push(exports.resolveInclude(a[1], u.filename));
                e.scanLine(i)
            })
        },
        parseTemplateText: function() {
            for (var e, t = this.templateText, n = this.regex, r = n.exec(t), i = []; r; )
                0 !== (e = r.index) && (i.push(t.substring(0, e)),
                t = t.slice(e)),
                i.push(r[0]),
                t = t.slice(r[0].length),
                r = n.exec(t);
            return t && i.push(t),
            i
        },
        scanLine: function(e) {
            function t() {
                n.truncate ? (e = e.replace(/^(?:\r\n|\r|\n)/, ""),
                n.truncate = !1) : n.opts.rmWhitespace && (e = e.replace(/^\n/, "")),
                e && (e = e.replace(/\\/g, "\\\\"),
                e = e.replace(/\n/g, "\\n"),
                e = e.replace(/\r/g, "\\r"),
                e = e.replace(/"/g, '\\"'),
                n.source += '    ; __append("' + e + '")\n')
            }
            var n = this
              , r = this.opts.delimiter
              , i = 0;
            switch (i = e.split("\n").length - 1,
            e) {
            case "<" + r:
            case "<" + r + "_":
                this.mode = o.modes.EVAL;
                break;
            case "<" + r + "=":
                this.mode = o.modes.ESCAPED;
                break;
            case "<" + r + "-":
                this.mode = o.modes.RAW;
                break;
            case "<" + r + "#":
                this.mode = o.modes.COMMENT;
                break;
            case "<" + r + r:
                this.mode = o.modes.LITERAL,
                this.source += '    ; __append("' + e.replace("<" + r + r, "<" + r) + '")\n';
                break;
            case r + r + ">":
                this.mode = o.modes.LITERAL,
                this.source += '    ; __append("' + e.replace(r + r + ">", r + ">") + '")\n';
                break;
            case r + ">":
            case "-" + r + ">":
            case "_" + r + ">":
                this.mode == o.modes.LITERAL && t(),
                this.mode = null,
                this.truncate = 0 === e.indexOf("-") || 0 === e.indexOf("_");
                break;
            default:
                if (this.mode) {
                    switch (this.mode) {
                    case o.modes.EVAL:
                    case o.modes.ESCAPED:
                    case o.modes.RAW:
                        e.lastIndexOf("//") > e.lastIndexOf("\n") && (e += "\n")
                    }
                    switch (this.mode) {
                    case o.modes.EVAL:
                        this.source += "    ; " + e + "\n";
                        break;
                    case o.modes.ESCAPED:
                        this.source += "    ; __append(escape(" + e.replace(m, "").trim() + "))\n";
                        break;
                    case o.modes.RAW:
                        this.source += "    ; __append(" + e.replace(m, "").trim() + ")\n";
                        break;
                    case o.modes.COMMENT:
                        break;
                    case o.modes.LITERAL:
                        t()
                    }
                } else
                    t()
            }
            n.opts.compileDebug && i && (this.currentLine += i,
            this.source += "    ; __line = " + this.currentLine + "\n")
        }
    },
    exports.escapeXML = l.escapeXML,
    exports.__express = exports.renderFile,
    require.extensions && (require.extensions[".ejs"] = function(module, e) {
        var t = e || module.filename
          , n = {
            filename: t,
            client: !0
        }
          , r = c.readFileSync(t).toString()
          , i = exports.compile(r, n);
        module._compile("module.exports = " + i.toString() + ";", t)
    }
    ),
    exports.VERSION = "2.5.1",
    "undefined" != typeof window && (window.ejs = exports)
});
LBF.define("util.Cookie", function() {
    var e = document;
    return {
        set: function(n, t, i, o, r) {
            r && (r = new Date(+new Date + r));
            var u = n + "=" + escape(t) + (r ? "; expires=" + r.toGMTString() : "") + (o ? "; path=" + o : "") + (i ? "; domain=" + i : "");
            return u.length < 4096 && (e.cookie = u),
            this
        },
        get: function(n) {
            var t = e.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
            return null != t ? unescape(t[2]) : null
        },
        del: function(n, t, i) {
            return this.get(n) && (e.cookie = n + "=" + (i ? "; path=" + i : "") + (t ? "; domain=" + t : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"),
            this
        },
        find: function(n) {
            return e.cookie.match(n)
        }
    }
});
!function(o, e) {
    "function" == typeof define ? "object" == typeof LBF ? LBF.define("common.login.qidian", function() {
        return e(o)
    }) : define(function() {
        return e(o)
    }) : window.qdLogin = e(o)
}(this, function(o) {
    var e = o.$ || o.jQuery || o.Zepto
      , t = function() {
        try {
            return "dev" === g_data.envType || "oa" === g_data.envType || "pre" === g_data.envType ? "pre" : ""
        } catch (o) {
            return ""
        }
    }()
      , n = {}
      , a = {
        init: function(e) {
            return this.httpHeader = location.protocol,
            n.close = a._loginOnClose,
            o.top.qdlogin_onSuccess = n.success = a._loginOnSuccess,
            o.top.qdlogin_onError = n.error = a._loginOnError,
            a._receivePostMessage(),
            this.autoLogin(e)
        },
        isLogin: function() {
            return !(!i.get("ywguid") || !i.get("ywkey"))
        },
        _receivePostMessage: function() {
            "undefined" != typeof o.postMessage ? o.onmessage = function(e) {
                var t, a = e || o.event;
                switch ((t = "undefined" != typeof JSON ? JSON.parse(a.data) : this._str2JSON(a.data)).action) {
                case "close":
                    n.close(t.data)
                }
            }
            : navigator.ywlogin_callback = function(o) {
                switch (data = this._str2JSON(o.data),
                data.action) {
                case "close":
                    n.close(data.data)
                }
            }
        },
        setEnv: function(o) {
            o && (t = o)
        },
        autoLogin: function(o) {
            var a;
            try {
                a = e.Deferred()
            } catch (l) {
                a = null
            }
            var r = this;
            e("body");
            if (i.get("ywguid") || i.get("ywkey"))
                a && a.reject();
            else {
                var c = {
                    areaid: 1,
                    appid: 10,
                    format: "jsonp"
                };
                if (o && (c.appid = 13),
                "" != t && "pre" != t)
                    s = "https://oaptlogin.qidian.com/login/checkStatus?";
                else
                    var s = "https://ptlogin.qidian.com/login/checkStatus?";
                for (var u in c)
                    s = s + u + "=" + c[u] + "&";
                e.ajax({
                    type: "GET",
                    async: !1,
                    url: s,
                    dataType: "jsonp",
                    global: !1,
                    jsonpCallback: "autoLoginHandler",
                    jsonp: "method",
                    success: function(o) {
                        0 == o.code ? (i.set("ywkey", o.data.ywKey, r.getRootDomain(), "/", 0),
                        i.set("ywguid", o.data.ywGuid, r.getRootDomain(), "/", 0),
                        a ? a && a.resolve() : n.autoSuccess && "function" == typeof n.autoSuccess && n.autoSuccess()) : a && a.reject()
                    },
                    error: function(o) {
                        a && a.reject()
                    }
                })
            }
            return setTimeout(function() {
                a && a.reject()
            }, 5e3),
            a && a.promise()
        },
        getRootDomain: function() {
            var o = document.domain.split(".")
              , e = o.length;
            return e >= 2 ? "." + o[e - 2] + "." + o[e - 1] : ".qidian.com"
        },
        getPCLoginUrl: function(o) {
            if ("" != t && "pre" != t)
                n = "https://oapassport.qidian.com/?";
            else
                var n = "https://passport.qidian.com/?";
            var a = {
                returnurl: o && o.returnurl || location.href,
                popup: 1,
                ticket: 1,
                target: "iframe",
                areaid: 1,
                appid: 10,
                auto: 1,
                autotime: 30,
                version: "1.0"
            };
            return "object" == typeof o && e.extend(a, o),
            n += e.param(a)
        },
        getMLoginUrl: function(o) {
            if ("" != t && "pre" != t)
                n = "https://oapassport.qidian.com/?";
            else
                var n = "https://passport.qidian.com/?";
            var a = {
                popup: 0,
                ticket: 1,
                target: "top",
                areaid: 1,
                appid: 13,
                auto: 1,
                autotime: 30,
                version: "1.0",
                source: "m"
            };
            return "object" == typeof o && e.extend(a, o),
            a.returnurl = a.returnurl || location.href,
            n += e.param(a)
        },
        showPCLogin: function(o) {
            var t = e("body")
              , n = ['<div class="qdlogin-wrap">', '<iframe id="loginIfr" src="' + this.getPCLoginUrl(o) + '" name="frameLG" id="frameLG" allowtransparentcy="true" width="100%" height="100%" scrolling="no" frameborder="no"></iframe>', "</div>"].join("");
            e(".mask") && e(".mask").remove(),
            e(".qdlogin-wrap") && e(".qdlogin-wrap").remove(),
            t.append('<div class="mask"></div>'),
            t.append(n)
        },
        showMLogin: function(o) {
            e("body");
            var t = this.getMLoginUrl(o);
            location.href = t
        },
        goLogout: function() {
            if ("" != t && "pre" != t)
                o = "//oaptlogin.qidian.com/login/logout?";
            else
                var o = "//ptlogin.qidian.com/login/logout?";
            var e = {
                appid: 10,
                areaid: 1,
                source: "pc",
                version: "1.0",
                format: "redirect"
            };
            for (var a in e)
                o += a + "=" + e[a] + "&";
            var i = document.createElement("script");
            i.src = o,
            i.type = "text/javascript",
            i.id = "sso" + Math.random(),
            i.onloadDone = !1,
            i.onload = function() {
                i.onloadDone = !0,
                n.logout && "function" == typeof n.logout && n.logout()
            }
            ,
            i.onreadystatechange = function() {
                "loaded" !== i.readyState && "complete" !== i.readyState || i.onloadDone || (n.logout && "function" == typeof n.logout && n.logout(),
                i.onloadDone = !0)
            }
            ,
            document.getElementsByTagName("head")[0].appendChild(i)
        },
        _loginOnClose: function() {
            a.hideLoginIfr()
        },
        close: function(o, e) {
            e && "function" == typeof e && (n.close = function() {
                o ? e.call(o) : e()
            }
            )
        },
        _loginOnSuccess: function() {
            a.hideLoginIfr()
        },
        success: function(e, t) {
            t && "function" == typeof t && (n.success = function() {
                e ? t.call(e) : t()
            }
            ,
            o.top.qdlogin_onSuccess = n.success)
        },
        _loginOnError: function(o, e) {
            alert(e),
            a.hideLoginIfr(),
            10003 === o && a.goLogout()
        },
        error: function(e, t) {
            t && "function" == typeof t && (n.error = function() {
                e ? t.call(e) : t()
            }
            ,
            o.top.qdlogin_onError = n.error)
        },
        logout: function(o, e) {
            e && "function" == typeof e && (n.logout = function() {
                o ? e.call(o) : e()
            }
            )
        },
        autoSuccess: function(o) {
            o && "function" == typeof o && (n.autoSuccess = function() {
                o()
            }
            )
        },
        hideLoginIfr: function() {
            var o = e(".mask");
            e(".qdlogin-wrap").remove(),
            o.remove()
        },
        setCallback: function(o, e, t) {
            switch (o) {
            case "close":
                a.close(e, t);
                break;
            case "success":
                a.success(e, t);
                break;
            case "error":
                a.error(e, t);
                break;
            case "logout":
                a.logout(e, t);
                break;
            case "autoSuccess":
                a.autoSuccess(t)
            }
        },
        _str2JSON: function(o) {
            var e = /(?:^|:|,)(?:\s*\[)+/g
              , t = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g
              , n = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
            return /^[\],:{}\s]*$/.test(o.replace(t, "@").replace(n, "]").replace(e, "")) ? new Function("return " + o)() : {}
        }
    }
      , i = {
        get: function(o) {
            var e = document.cookie.match(new RegExp("(^| )" + o + "=([^;]*)(;|$)"));
            return null != e ? decodeURIComponent(e[2]) : null
        },
        set: function(o, e, t, n, a) {
            a && (a = new Date(+new Date + a));
            var i = o + "=" + escape(e) + (a ? "; expires=" + a.toGMTString() : "") + (n ? "; path=" + n : "") + (t ? "; domain=" + t : "");
            i.length < 4096 && (document.cookie = i)
        }
    };
    return a
});
!function(e, t) {
    "function" == typeof define ? "object" == typeof LBF ? LBF.define("qidian.report", function() {
        return t(e)
    }) : define(function() {
        return t(e)
    }) : t(e)
}(this, function(e) {
    function t() {
        if (!g.get("stat_sessid")) {
            var t = "//uedas.qidian.com/statajax.aspx?"
              , a = {
                opName: "AddSessionUser",
                globalId: g.get("stat_gid") || "",
                curToken: g.get("cmfuToken") || "",
                pageTitle: document.title,
                referer: document.referrer,
                pageUrl: e.location.href,
                pagePathName: e.location.pathname,
                pageQueryString: e.location.search,
                host: e.location.host
            };
            o.each(a, function(e, a) {
                t = t + e + "=" + encodeURIComponent(a) + "&"
            }),
            n(t = t.substring(0, t.length - 1))
        }
    }
    function a() {
        if (!g.get("stat_gid")) {
            var t = "//uedas.qidian.com/statajax.aspx?"
              , a = {
                opName: "AddGlobalUser",
                globalId: g.get("stat_gid") || "",
                curToken: g.get("cmfuToken") || "",
                pageTitle: document.title,
                referer: document.referrer,
                pageUrl: e.location.href,
                pagePathName: e.location.pathname,
                pageQueryString: e.location.search,
                host: e.location.host
            };
            o.each(a, function(e, a) {
                t = t + e + "=" + encodeURIComponent(a) + "&"
            }),
            n(t = t.substring(0, t.length - 1))
        }
    }
    function n(e) {
        var t = new Image;
        t.onload = t.onerror = function() {
            t = null
        }
        ,
        t.src = e
    }
    var i = document
      , o = e.$ || e.Zepto || e.jQuery
      , d = "//" + function() {
        try {
            return "pro" === (g_data && g_data.envType || "pro") ? "" : g_data.envType
        } catch (e) {
            return ""
        }
    }() + "qdp.qidian.com/qreport?"
      , r = {
        path: "pclog",
        ltype: "A",
        url: e.location.href,
        ref: document.referrer,
        sw: screen.width,
        sh: screen.height,
        x: "",
        y: "",
        title: document.title
    }
      , c = {
        config: function(e) {
            e && "object" == typeof e && o.extend(!0, this, e)
        },
        init: function(e) {
            var i = this;
            o(document).ready(function(c) {
                var g = i.cgi ? i.cgi + "?" : d
                  , s = {
                    ltype: "P",
                    pid: function() {
                        try {
                            return g_data.pageId
                        } catch (c) {
                            return ""
                        }
                    }(),
                    x: "",
                    y: "",
                    chan: ""
                };
                e && e.domain && (i.cookieDomain = e.domain),
                e && e.e1 && (i.cookieE1 = e.e1),
                e && e.e2 && (i.cookieE2 = e.e2);
                var u = o.extend({}, r, s, e);
                o.each(u, function(e, t) {
                    g = g + e + "=" + encodeURIComponent(t) + "&"
                }),
                n(g = g.substring(0, g.length - 1)),
                i._send(e),
                u.isQD && t(),
                u.isQD && a()
            })
        },
        _send: function(e) {
            this.initial = 0;
            var t = this;
            o(document).off("click.Report"),
            o(document).on("click.Report", function(a) {
                a && (!0 === a.isTrigger || !1 === a.isTrusted || a.hasOwnProperty("_args") || 0 === a.pageY && 0 === a.screenY) || t.send(a, e)
            })
        },
        send: function(e, t, a) {
            var i = +new Date;
            if (!(i - this.initial < 100)) {
                this.initial = i;
                for (var c = o(e.target), g = this.cgi ? this.cgi + "?" : d, s = {
                    ltype: "A",
                    pid: function() {
                        try {
                            return g_data.pageId
                        } catch (e) {
                            return ""
                        }
                    }(),
                    eid: "",
                    bid: "",
                    cid: "",
                    tid: "",
                    rid: "",
                    qd_dd_p1: "",
                    x: e.clientX + o("body").scrollLeft() || "",
                    y: e.clientY + o("body").scrollTop() || "",
                    qd_game_key: "",
                    auid: "",
                    blid: "",
                    algrid: "",
                    kw: ""
                }, u = o.extend({}, r, s, t), l = c; l.get(0) && "BODY" != l.get(0).tagName; ) {
                    for (var f = 0; f < 7; f++)
                        if (l.data("l" + (f + 1))) {
                            u["l" + (f + 1)] = l.data("l" + (f + 1));
                            break
                        }
                    l.data("rid") && (u.rid = l.data("rid")),
                    l.data("eid") && (u.eid = l.data("eid")),
                    l.data("bid") && (u.bid = l.data("bid")),
                    l.data("cid") && (u.cid = l.data("cid")),
                    l.data("tid") && (u.tid = l.data("tid")),
                    l.data("qd_dd_p1") && 1 == l.data("qd_dd_p1") && (u.qd_dd_p1 = l.get(0).href || ""),
                    l.data("qd_game_key") && (u.qd_game_key = l.data("qd_game_key")),
                    l.data("auid") && (u.auid = l.data("auid")),
                    l.data("blid") && (u.blid = l.data("blid")),
                    l.data("algrid") && (u.algrid = l.data("algrid")),
                    l.data("kw") && (u.kw = l.data("kw")),
                    l = l.parent()
                }
                "undefined" != typeof JSON && this._getE1E2(u),
                o.each(u, function(e, t) {
                    g = g + e + "=" + encodeURIComponent(t) + "&"
                }),
                g = g.substring(0, g.length - 1),
                (a || (u.l1 = u.l1 || "",
                "" != u.l1)) && (n(g),
                t = null)
            }
        },
        _getE1E2: function(e) {
            var t = {}
              , a = this.cookieDomain || ".qidian.com"
              , n = this.cookieE1 || "e1"
              , i = this.cookieE1 || "e2";
            g.get(n) || g.set(n, "", a, "", 2592e6),
            g.get(i) || g.set(i, "", a, "", 2592e6);
            for (var o in e)
                "eid" == o && (t[o] = e[o]),
                "pid" == o && (t[o] = e[o]),
                /l[1-9]/.test(o) && (t[o] = e[o]);
            e.e1 = decodeURIComponent(g.get(n)),
            e.e2 = decodeURIComponent(g.get(i)),
            "undefined" != typeof JSON && (g.set(n, JSON.stringify(t), a, "", 2592e6),
            g.set(i, e.e1, a, "", 2592e6))
        }
    }
      , g = {
        get: function(e) {
            var t = i.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
            return null != t ? decodeURIComponent(t[2]) : null
        },
        set: function(e, t, a, n, o) {
            o && (o = new Date(+new Date + o));
            var d = e + "=" + escape(t) + (o ? "; expires=" + o.toGMTString() : "") + (n ? "; path=" + n : "") + (a ? "; domain=" + a : "");
            d.length < 4096 && (i.cookie = d)
        }
    };
    return "function" != typeof define && (e.Report = c),
    c
});
LBF.define("qidian.wxShare", function() {
    var e = {
        loadJS: function(e, n) {
            define = null,
            require = null;
            var t = document.createElement("script");
            t.src = e,
            t.type = "text/javascript",
            n = n || function() {}
            ,
            t.onload = t.onreadystatechange = function() {
                this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (n(),
                this.onload = this.onreadystatechange = null,
                this.parentNode.removeChild(this))
            }
            ,
            document.getElementsByTagName("head")[0].appendChild(t)
        },
        crossAjax: function() {
            var e = arguments[0];
            if (e) {
                if ("undefined" == typeof FormData)
                    return "undefined" == typeof e.supportCallBack ? void 0 : void e.supportCallBack();
                e.cache = e.cache || !1,
                e.url = e.url || "",
                e.method = e.method || "get",
                e.timeout = e.timeout || 1e4;
                var n = e.data
                  , t = new XMLHttpRequest;
                t.timeout = e.timeout;
                var o = function() {
                    var e = new Date;
                    return e.getFullYear() + "" + e.getMonth() + e.getDate() + e.getHours() + e.getMinutes() + e.getSeconds() + e.getMilliseconds()
                };
                if ("get" == e.method.toLowerCase()) {
                    if (n) {
                        e.url += e.url.indexOf("?") > -1 ? "&" : "?";
                        for (var i in n)
                            e.url += i + "=" + encodeURIComponent(n[i]) + "&";
                        e.url.lastIndexOf("&") == e.url.length - 1 && (e.url = e.url.substr(0, e.url.length - 1)),
                        e.cache || (e.url += "&_=" + o())
                    }
                    t.open("get", e.url),
                    t.send()
                } else {
                    var a = new FormData;
                    if (n)
                        for (var i in n)
                            a.append(i, n[i]);
                    e.cache || a.append("_", o()),
                    t.open("post", e.url),
                    t.send(a)
                }
                t.onreadystatechange = function(n) {
                    4 == t.readyState && (200 == t.status ? "undefined" != typeof e.success && e.success(JSON.parse(t.responseText)) : 0 != t.status && "undefined" != typeof e.error && e.error(t))
                }
                ,
                t.ontimeout = function(n) {
                    "undefined" != typeof e.timeoutCallBack && e.timeoutCallBack(n)
                }
            }
        },
        setWeiXinShareConfig: function(n, t, o, i, a) {
            if ("micromessenger" == navigator.userAgent.toLowerCase().match(/micromessenger/i)) {
                var c = function() {}
                  , r = function() {};
                null != arguments && arguments.length >= 6 && (c = arguments[5]),
                null != arguments && arguments.length >= 7 && (r = arguments[6]),
                e.loadJS("//res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
                    var n = {
                        ajaxMethod: "getwxqdzwwjsconfig"
                    };
                    e.crossAjax({
                        data: n,
                        success: function(e) {
                            e && e.IsSuccess && (wx.config({
                                debug: !1,
                                appId: e.ReturnObject.appId,
                                timestamp: e.ReturnObject.timestamp,
                                nonceStr: e.ReturnObject.nonceStr,
                                signature: e.ReturnObject.signature,
                                jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "chooseImage", "previewImage", "uploadImage", "downloadImage", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode"]
                            }),
                            wx.ready(function() {
                                wx.onMenuShareTimeline({
                                    title: t,
                                    link: o,
                                    imgUrl: i,
                                    success: function() {
                                        c()
                                    },
                                    cancel: function() {
                                        r()
                                    }
                                }),
                                wx.onMenuShareAppMessage({
                                    title: t,
                                    desc: a,
                                    link: o,
                                    imgUrl: i,
                                    type: "",
                                    dataUrl: "",
                                    success: function() {
                                        c()
                                    },
                                    cancel: function() {
                                        r()
                                    }
                                }),
                                wx.onMenuShareQQ({
                                    title: t,
                                    desc: a,
                                    link: o,
                                    imgUrl: i,
                                    success: function() {
                                        c()
                                    },
                                    cancel: function() {
                                        r()
                                    }
                                })
                            }),
                            wx.error(function(e) {}))
                        },
                        url: "//m.qidian.com/ajax/index.ashx",
                        timeout: 2e3
                    })
                })
            }
        },
        reConfig: function(e, n, t, o) {
            try {
                if ("undefined" != typeof wx) {
                    var i = function() {}
                      , a = function() {};
                    null != arguments && arguments.length >= 5 && (i = arguments[4]),
                    null != arguments && arguments.length >= 6 && (a = arguments[5]),
                    wx.onMenuShareTimeline({
                        title: e,
                        link: n,
                        imgUrl: t,
                        success: function() {
                            i()
                        },
                        cancel: function() {
                            a()
                        }
                    }),
                    wx.onMenuShareAppMessage({
                        title: e,
                        desc: o,
                        link: n,
                        imgUrl: t,
                        type: "",
                        dataUrl: "",
                        success: function() {
                            i()
                        },
                        cancel: function() {
                            a()
                        }
                    }),
                    wx.onMenuShareQQ({
                        title: e,
                        desc: o,
                        link: n,
                        imgUrl: t,
                        success: function() {
                            i()
                        },
                        cancel: function() {
                            a()
                        }
                    })
                }
            } catch (c) {}
        }
    };
    return {
        setWeiXinShareConfig: e.setWeiXinShareConfig,
        reConfig: e.reConfig
    }
});
define("qdm/js/common/utils/debounce.5e0cc.js", [], function(require, exports, module) {
    module.exports = function(n, t) {
        var e, o, u, i, c, r = function() {
            var s = Date.now() - i;
            s < t && s > 0 ? c = setTimeout(r, t - s) : (c = null,
            u = n.apply(e, o),
            c || (e = o = null))
        };
        return function() {
            return e = this,
            o = arguments,
            i = Date.now(),
            c || (c = setTimeout(r, t)),
            u
        }
    }
});
define("qdm/js/common/components/Toggle.b6163.js", ["lib.Zepto"], function(require) {
    var e = require("lib.Zepto")
      , t = function(t, a) {
        var i = this;
        if (!t)
            return i;
        e.isFunction(a) && (a = {
            callback: a
        });
        var o = {
            mode: "visible",
            container: e("body"),
            callback: function() {}
        }
          , n = e.extend({}, o, a || {});
        i.callback = n.callback,
        i.mode = n.mode,
        !t.size && e.isArray(t) && (t = t.join()),
        "string" == typeof t ? n.container.on("click", t, function(t) {
            i.toggle(e(this), t)
        }) : t.length && t.on("click", function(t) {
            i.toggle(e(this), t)
        }),
        i.aria(t)
    };
    return t.prototype.aria = function(t) {
        "visible" == this.mode && "string" == typeof t && e(t).each(function() {
            var t = e(this);
            t.attr({
                role: "menuitem",
                "aria-expanded": t.hasClass("active")
            })
        })
    }
    ,
    t.prototype.toggle = function(t, a) {
        var i, o = this, n = t;
        "visible" == o.mode ? (n = e("#" + t.attr("data-rel")),
        (i = t.hasClass("active")) ? (t.removeClass("active").attr("aria-expanded", "false"),
        n.removeClass("active")) : (t.addClass("active").attr("aria-expanded", "true"),
        n.addClass("active"))) : "more" == o.mode && ((i = "string" == typeof t.attr("open")) ? t.removeAttr("open") : t.attr("open", "")),
        o.callback.call(t, t, n, i, a)
    }
    ,
    t
});
!function(n, a) {
    "function" == typeof define && (define.amd || define.cmd) ? define("qdm/js/common/components/Tips.28ade.js", [], a) : a()
}(0, function() {
    "use strict";
    var n = null
      , a = null;
    return $.tips = function(i, t, e) {
        if ("function" == typeof t ? (e = t,
        t = 2500) : void 0 === t && (t = 2500),
        e = e || function() {}
        ,
        !i && n)
            n.removeClass("fadein").addClass("fadeout");
        else if (!i)
            return;
        clearTimeout(a),
        n ? n.html(i)[0].callback = e : ((n = $('<div class="tips"></div>').html(i)).on("webkitAnimationEnd", function(a) {
            a && "fadeout" == a.animationName && (n.css("display", "none!important"),
            this.callback(n))
        }).on("animationend", function(a) {
            a && "fadeout" == a.animationName && (n.css("display", "none!important"),
            this.callback(n))
        }).on("touchstart", function() {
            n.css("display", "none!important"),
            this.callback(n)
        })[0].callback = e,
        $("body").append(n)),
        a = setTimeout(function() {
            n && n.removeClass("fadein").addClass("fadeout")
        }, t);
        var s = 29;
        $("body").children("div,aside").each(function() {
            var n = $(this);
            "none" !== n.css("display") && (s = Math.max(s, parseInt(n.css("z-index")) || 0))
        }),
        29 != s && n.css("z-index", s + 1),
        n.css("display", "inline!important").addClass("fadein").removeClass("fadeout")
    }
    ,
    $.tips
});
!function(i, n) {
    "function" == typeof define && (define.amd || define.cmd) ? define("qdm/js/common/components/Loading.f83d8.js", [], n) : i.Loading = n()
}(this, function() {
    var i = "loading-x"
      , n = "loading-icon"
      , t = $("body")
      , e = '<svg class="loading-svg" width="25" height="25" viewBox="-1 -1 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M0 0h2c1.105 0 2 .887 2 1.998V8" /><path d="M8 0v2c0 1.105-.887 2-1.998 2H0M0 8h8M4 11v11M8 13v2.995A1.998 1.998 0 0 1 6 18H4"/><path d="M0 13v7.003C0 21.106.893 22 1.995 22H18"/><circle cx="22" cy="22" r="1"/><path d="M13 6h7.003A2 2 0 0 0 22 4.002V1.998A1.994 1.994 0 0 0 20 0h-6c-1.105 0-2 .893-2 1.995v14.01c0 1.102.894 1.995 2.005 1.995h.99A1.996 1.996 0 0 0 17 16.002v-4.004A2 2 0 0 1 19.005 10h.99c1.107 0 2.005.887 2.005 1.998V18" class="path3" stroke-linejoin="round"/></g></svg>';
    $.fn.isLoading = function() {
        var i = $(this).eq(0);
        if (i.is("a") || i.is("label"))
            return i.hasClass("loading");
        if (0 == i.length)
            return !1;
        var n = i[0].loading
          , t = n && n.el.icon;
        return !!(t && t.offset() && t.offset().width > 0)
    }
    ,
    $.isLoading = function() {
        return t.isLoading()
    }
    ,
    $.fn.loading = function(i) {
        return $(this).each(function() {
            var n = $(this);
            !1 === n.is("a") && !1 === n.is("label") ? n[0].loading = new o(n,i) : n.addClass("loading").attr({
                "aria-busy": "true"
            })
        })
    }
    ,
    $.loading = function() {
        t.loading()
    }
    ,
    $.fn.unloading = function(n) {
        var t = n || 0;
        return "number" != typeof n ? t = 200 : void 0 === n && (n = t),
        $(this).each(function(e, o) {
            var a = $(this);
            if (a.is("a") || a.is("label"))
                a.removeClass("loading").removeAttr("aria-busy");
            else if ("function" == typeof history.pushState)
                if (t > 0) {
                    var s = a.height();
                    a.css("min-height"),
                    a.css({
                        height: "auto",
                        webkitTransition: "none",
                        transition: "none",
                        overflow: "hidden"
                    });
                    var l = a.height() - parseInt(a.css("border-top-width")) - parseInt(a.css("border-bottom-width"));
                    a.height(s),
                    a.removeClass("loading-animation"),
                    o.offsetWidth,
                    !1 !== n && a.addClass("loading-animation"),
                    a.css({
                        webkitTransition: "height " + t + "ms",
                        transition: "height " + t + "ms"
                    }),
                    a.height(l)
                } else
                    a.css({
                        webkitTransition: "none",
                        transition: "none"
                    }),
                    a.height("auto").removeClass(i);
            else
                a.height("auto")
        })
    }
    ,
    $.unloading = function() {
        var i = document.body.loading;
        i && i.remove()
    }
    ;
    var o = function(o, a) {
        var s = {
            text: !1,
            small: !1,
            create: !1
        }
          , l = $.extend({}, s, a || {});
        return o && o !== window && o !== document && (!o.size || o[0] !== window && o[0] !== document) || (o = t),
        this._create = function() {
            var t, o, a = this.el.container;
            a.is("body") && (l.create = !0),
            1 == l.create ? 0 == (t = a.children("." + i)).size() && a.append(t = $("<div></div>").addClass(i)) : t = a,
            0 == (o = t.children("." + n)).size() && (o = 0 == l.text ? (l.small ? $("<s></s>") : $("<i></i>")).addClass(n).html(e.replace('-svg"', '-svg-animate"') + e) : $("<span></span>").addClass(n).html("正在加载中<dot>...</dot>"),
            t.empty().addClass(i).append(o)),
            t.attr({
                role: "option",
                "aria-label": "正在加载中..."
            }),
            this.el.loading = t,
            this.el.icon = o
        }
        ,
        this.el = {
            container: o,
            loading: null,
            icon: null
        },
        this.show(),
        this
    };
    return o.prototype.show = function() {
        var i = this.el;
        return i.loading && i.icon || this._create(),
        i.loading.show(),
        this.display = !0,
        this
    }
    ,
    o.prototype.hide = function() {
        var i = this.el
          , t = i.container
          , e = i.loading;
        return e && (t.get(0) != e.get(0) ? e.hide() : t.find("." + n).length && (e.empty(),
        this.el.icon = null)),
        this.display = !1,
        this
    }
    ,
    o.prototype.remove = function() {
        var n = this.el
          , t = n.container
          , e = n.loading
          , o = n.icon;
        return e && o && (t.get(0) == e.get(0) ? (e.removeClass(i),
        o.remove()) : e.remove(),
        this.el.loading = null,
        this.el.icon = null),
        this.display = !1,
        this
    }
    ,
    o.prototype.end = function(i) {
        var t = this.el.container;
        return t && (t.unloading(i),
        0 == t.find("." + n).length && (this.el.icon = null)),
        this.display = !1,
        this
    }
    ,
    o
});
define("qdm/js/common/store/searchHistory.7d9ea.js", ["qdm/js/common/utils/Storage.352e8.js"], function(require, exports, module) {
    var e = require("qdm/js/common/utils/Storage.352e8.js");
    module.exports = {
        getKeywords: function() {
            var r = e.get("SEARCH_HISTORY");
            return Array.isArray(r) ? r : []
        },
        clearKeywords: function() {
            e.remove("SEARCH_HISTORY")
        },
        addKeyword: function(r) {
            if (r && r.trim && r.trim()) {
                var o = this.getKeywords()
                  , s = o.indexOf(r);
                s > -1 && o.splice(s, 1),
                o.unshift(r),
                e.set("SEARCH_HISTORY", o)
            }
        }
    }
});
