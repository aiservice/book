LBF.define("lib.Zepto", function(require) {
    var t = function() {
        function t(t) {
            return null == t ? String(t) : Y[J.call(t)] || "object"
        }
        function e(e) {
            return "function" == t(e)
        }
        function n(t) {
            return null != t && t == t.window
        }
        function r(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE
        }
        function i(e) {
            return "object" == t(e)
        }
        function o(t) {
            return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
        }
        function a(t) {
            var e = !!t && "length"in t && t.length
              , r = j.type(t);
            return "function" != r && !n(t) && ("array" == r || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }
        function s(t) {
            return M.call(t, function(t) {
                return null != t
            })
        }
        function u(t) {
            return t.length > 0 ? j.fn.concat.apply([], t) : t
        }
        function c(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }
        function l(t) {
            return t in $ ? $[t] : $[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }
        function f(t, e) {
            return "number" != typeof e || F[c(t)] ? e : e + "px"
        }
        function h(t) {
            var e, n;
            return A[t] || (e = L.createElement(t),
            L.body.appendChild(e),
            n = getComputedStyle(e, "").getPropertyValue("display"),
            e.parentNode.removeChild(e),
            "none" == n && (n = "block"),
            A[t] = n),
            A[t]
        }
        function p(t) {
            return "children"in t ? D.call(t.children) : j.map(t.childNodes, function(t) {
                if (1 == t.nodeType)
                    return t
            })
        }
        function d(t, e) {
            var n, r = t ? t.length : 0;
            for (n = 0; n < r; n++)
                this[n] = t[n];
            this.length = r,
            this.selector = e || ""
        }
        function m(t, e, n) {
            for (T in e)
                n && (o(e[T]) || Q(e[T])) ? (o(e[T]) && !o(t[T]) && (t[T] = {}),
                Q(e[T]) && !Q(t[T]) && (t[T] = []),
                m(t[T], e[T], n)) : e[T] !== E && (t[T] = e[T])
        }
        function g(t, e) {
            return null == e ? j(t) : j(t).filter(e)
        }
        function v(t, n, r, i) {
            return e(n) ? n.call(t, r, i) : n
        }
        function y(t, e, n) {
            null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
        }
        function x(t, e) {
            var n = t.className || ""
              , r = n && n.baseVal !== E;
            if (e === E)
                return r ? n.baseVal : n;
            r ? n.baseVal = e : t.className = e
        }
        function w(t) {
            try {
                return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? j.parseJSON(t) : t) : t
            } catch (e) {
                return t
            }
        }
        function b(t, e) {
            e(t);
            for (var n = 0, r = t.childNodes.length; n < r; n++)
                b(t.childNodes[n], e)
        }
        var E, T, j, S, N, C, P = [], O = P.concat, M = P.filter, D = P.slice, L = window.document, A = {}, $ = {}, F = {
            "column-count": 1,
            "columns": 1,
            "font-weight": 1,
            "line-height": 1,
            "opacity": 1,
            "z-index": 1,
            "zoom": 1
        }, R = /^\s*<(\w+|!)[^>]*>/, Z = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, k = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, q = /^(?:body|html)$/i, z = /([A-Z])/g, H = ["val", "css", "html", "text", "data", "width", "height", "offset"], _ = ["after", "prepend", "before", "append"], X = L.createElement("table"), B = L.createElement("tr"), I = {
            "tr": L.createElement("tbody"),
            "tbody": X,
            "thead": X,
            "tfoot": X,
            "td": B,
            "th": B,
            "*": L.createElement("div")
        }, U = /complete|loaded|interactive/, V = /^[\w-]*$/, Y = {}, J = Y.toString, G = {}, W = L.createElement("div"), K = {
            "tabindex": "tabIndex",
            "readonly": "readOnly",
            "for": "htmlFor",
            "class": "className",
            "maxlength": "maxLength",
            "cellspacing": "cellSpacing",
            "cellpadding": "cellPadding",
            "rowspan": "rowSpan",
            "colspan": "colSpan",
            "usemap": "useMap",
            "frameborder": "frameBorder",
            "contenteditable": "contentEditable"
        }, Q = Array.isArray || function(t) {
            return t instanceof Array
        }
        ;
        return G.matches = function(t, e) {
            if (!e || !t || 1 !== t.nodeType)
                return !1;
            var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (n)
                return n.call(t, e);
            var r, i = t.parentNode, o = !i;
            return o && (i = W).appendChild(t),
            r = ~G.qsa(i, e).indexOf(t),
            o && W.removeChild(t),
            r
        }
        ,
        N = function(t) {
            return t.replace(/-+(.)?/g, function(t, e) {
                return e ? e.toUpperCase() : ""
            })
        }
        ,
        C = function(t) {
            return M.call(t, function(e, n) {
                return t.indexOf(e) == n
            })
        }
        ,
        G.fragment = function(t, e, n) {
            var r, i, a;
            return Z.test(t) && (r = j(L.createElement(RegExp.$1))),
            r || (t.replace && (t = t.replace(k, "<$1></$2>")),
            e === E && (e = R.test(t) && RegExp.$1),
            e in I || (e = "*"),
            (a = I[e]).innerHTML = "" + t,
            r = j.each(D.call(a.childNodes), function() {
                a.removeChild(this)
            })),
            o(n) && (i = j(r),
            j.each(n, function(t, e) {
                H.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
            })),
            r
        }
        ,
        G.Z = function(t, e) {
            return new d(t,e)
        }
        ,
        G.isZ = function(t) {
            return t instanceof G.Z
        }
        ,
        G.init = function(t, n) {
            var r;
            if (!t)
                return G.Z();
            if ("string" == typeof t)
                if ("<" == (t = t.trim())[0] && R.test(t))
                    r = G.fragment(t, RegExp.$1, n),
                    t = null;
                else {
                    if (n !== E)
                        return j(n).find(t);
                    r = G.qsa(L, t)
                }
            else {
                if (e(t))
                    return j(L).ready(t);
                if (G.isZ(t))
                    return t;
                if (Q(t))
                    r = s(t);
                else if (i(t))
                    r = [t],
                    t = null;
                else if (R.test(t))
                    r = G.fragment(t.trim(), RegExp.$1, n),
                    t = null;
                else {
                    if (n !== E)
                        return j(n).find(t);
                    r = G.qsa(L, t)
                }
            }
            return G.Z(r, t)
        }
        ,
        j = function(t, e) {
            return G.init(t, e)
        }
        ,
        j.extend = function(t) {
            var e, n = D.call(arguments, 1);
            return "boolean" == typeof t && (e = t,
            t = n.shift()),
            n.forEach(function(n) {
                m(t, n, e)
            }),
            t
        }
        ,
        G.qsa = function(t, e) {
            var n, r = "#" == e[0], i = !r && "." == e[0], o = r || i ? e.slice(1) : e, a = V.test(o);
            return t.getElementById && a && r ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : D.call(a && !r && t.getElementsByClassName ? i ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }
        ,
        j.contains = L.documentElement.contains ? function(t, e) {
            return t !== e && t.contains(e)
        }
        : function(t, e) {
            for (; e && (e = e.parentNode); )
                if (e === t)
                    return !0;
            return !1
        }
        ,
        j.type = t,
        j.isFunction = e,
        j.isWindow = n,
        j.isArray = Q,
        j.isPlainObject = o,
        j.isEmptyObject = function(t) {
            var e;
            for (e in t)
                return !1;
            return !0
        }
        ,
        j.isNumeric = function(t) {
            var e = Number(t)
              , n = typeof t;
            return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1
        }
        ,
        j.inArray = function(t, e, n) {
            return P.indexOf.call(e, t, n)
        }
        ,
        j.camelCase = N,
        j.trim = function(t) {
            return null == t ? "" : String.prototype.trim.call(t)
        }
        ,
        j.uuid = 0,
        j.support = {},
        j.expr = {},
        j.noop = function() {}
        ,
        j.map = function(t, e) {
            var n, r, i, o = [];
            if (a(t))
                for (r = 0; r < t.length; r++)
                    null != (n = e(t[r], r)) && o.push(n);
            else
                for (i in t)
                    null != (n = e(t[i], i)) && o.push(n);
            return u(o)
        }
        ,
        j.each = function(t, e) {
            var n, r;
            if (a(t)) {
                for (n = 0; n < t.length; n++)
                    if (!1 === e.call(t[n], n, t[n]))
                        return t
            } else
                for (r in t)
                    if (!1 === e.call(t[r], r, t[r]))
                        return t;
            return t
        }
        ,
        j.grep = function(t, e) {
            return M.call(t, e)
        }
        ,
        window.JSON && (j.parseJSON = JSON.parse),
        j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            Y["[object " + e + "]"] = e.toLowerCase()
        }),
        j.fn = {
            constructor: G.Z,
            length: 0,
            forEach: P.forEach,
            reduce: P.reduce,
            push: P.push,
            sort: P.sort,
            splice: P.splice,
            indexOf: P.indexOf,
            concat: function() {
                var t, e, n = [];
                for (t = 0; t < arguments.length; t++)
                    e = arguments[t],
                    n[t] = G.isZ(e) ? e.toArray() : e;
                return O.apply(G.isZ(this) ? this.toArray() : this, n)
            },
            map: function(t) {
                return j(j.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function() {
                return j(D.apply(this, arguments))
            },
            ready: function(t) {
                return U.test(L.readyState) && L.body ? t(j) : L.addEventListener("DOMContentLoaded", function() {
                    t(j)
                }, !1),
                this
            },
            get: function(t) {
                return t === E ? D.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function(t) {
                return P.every.call(this, function(e, n) {
                    return !1 !== t.call(e, n, e)
                }),
                this
            },
            filter: function(t) {
                return e(t) ? this.not(this.not(t)) : j(M.call(this, function(e) {
                    return G.matches(e, t)
                }))
            },
            add: function(t, e) {
                return j(C(this.concat(j(t, e))))
            },
            is: function(t) {
                return this.length > 0 && G.matches(this[0], t)
            },
            not: function(t) {
                var n = [];
                if (e(t) && t.call !== E)
                    this.each(function(e) {
                        t.call(this, e) || n.push(this)
                    });
                else {
                    var r = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? D.call(t) : j(t);
                    this.forEach(function(t) {
                        r.indexOf(t) < 0 && n.push(t)
                    })
                }
                return j(n)
            },
            has: function(t) {
                return this.filter(function() {
                    return i(t) ? j.contains(this, t) : j(this).find(t).size()
                })
            },
            eq: function(t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function() {
                var t = this[0];
                return t && !i(t) ? t : j(t)
            },
            last: function() {
                var t = this[this.length - 1];
                return t && !i(t) ? t : j(t)
            },
            find: function(t) {
                var e = this;
                return t ? "object" == typeof t ? j(t).filter(function() {
                    var t = this;
                    return P.some.call(e, function(e) {
                        return j.contains(e, t)
                    })
                }) : 1 == this.length ? j(G.qsa(this[0], t)) : this.map(function() {
                    return G.qsa(this, t)
                }) : j()
            },
            closest: function(t, e) {
                var n = []
                  , i = "object" == typeof t && j(t);
                return this.each(function(o, a) {
                    for (; a && !(i ? i.indexOf(a) >= 0 : G.matches(a, t)); )
                        a = a !== e && !r(a) && a.parentNode;
                    a && n.indexOf(a) < 0 && n.push(a)
                }),
                j(n)
            },
            parents: function(t) {
                for (var e = [], n = this; n.length > 0; )
                    n = j.map(n, function(t) {
                        if ((t = t.parentNode) && !r(t) && e.indexOf(t) < 0)
                            return e.push(t),
                            t
                    });
                return g(e, t)
            },
            parent: function(t) {
                return g(C(this.pluck("parentNode")), t)
            },
            children: function(t) {
                return g(this.map(function() {
                    return p(this)
                }), t)
            },
            contents: function() {
                return this.map(function() {
                    return this.contentDocument || D.call(this.childNodes)
                })
            },
            siblings: function(t) {
                return g(this.map(function(t, e) {
                    return M.call(p(e.parentNode), function(t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(t) {
                return j.map(this, function(e) {
                    return e[t]
                })
            },
            show: function() {
                return this.each(function() {
                    "none" == this.style.display && (this.style.display = ""),
                    "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
                })
            },
            replaceWith: function(t) {
                return this.before(t).remove()
            },
            wrap: function(t) {
                var n = e(t);
                if (this[0] && !n)
                    var r = j(t).get(0)
                      , i = r.parentNode || this.length > 1;
                return this.each(function(e) {
                    j(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r)
                })
            },
            wrapAll: function(t) {
                if (this[0]) {
                    j(this[0]).before(t = j(t));
                    for (var e; (e = t.children()).length; )
                        t = e.first();
                    j(t).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                var n = e(t);
                return this.each(function(e) {
                    var r = j(this)
                      , i = r.contents()
                      , o = n ? t.call(this, e) : t;
                    i.length ? i.wrapAll(o) : r.append(o)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    j(this).replaceWith(j(this).children())
                }),
                this
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)
                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(t) {
                return this.each(function() {
                    var e = j(this);
                    (t === E ? "none" == e.css("display") : t) ? e.show() : e.hide()
                })
            },
            prev: function(t) {
                return j(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function(t) {
                return j(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var n = this.innerHTML;
                    j(this).empty().append(v(this, t, e, n))
                }) : 0 in this ? this[0].innerHTML : null
            },
            text: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var n = v(this, t, e, this.textContent);
                    this.textContent = null == n ? "" : "" + n
                }) : 0 in this ? this.pluck("textContent").join("") : null
            },
            attr: function(t, e) {
                var n;
                return "string" != typeof t || 1 in arguments ? this.each(function(n) {
                    if (1 === this.nodeType)
                        if (i(t))
                            for (T in t)
                                y(this, T, t[T]);
                        else
                            y(this, t, v(this, e, n, this.getAttribute(t)))
                }) : 0 in this && 1 == this[0].nodeType && null != (n = this[0].getAttribute(t)) ? n : E
            },
            removeAttr: function(t) {
                return this.each(function() {
                    1 === this.nodeType && t.split(" ").forEach(function(t) {
                        y(this, t)
                    }, this)
                })
            },
            prop: function(t, e) {
                return t = K[t] || t,
                1 in arguments ? this.each(function(n) {
                    this[t] = v(this, e, n, this[t])
                }) : this[0] && this[0][t]
            },
            removeProp: function(t) {
                return t = K[t] || t,
                this.each(function() {
                    delete this[t]
                })
            },
            data: function(t, e) {
                var n = "data-" + t.replace(z, "-$1").toLowerCase()
                  , r = 1 in arguments ? this.attr(n, e) : this.attr(n);
                return null !== r ? w(r) : E
            },
            val: function(t) {
                return 0 in arguments ? (null == t && (t = ""),
                this.each(function(e) {
                    this.value = v(this, t, e, this.value)
                })) : this[0] && (this[0].multiple ? j(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value)
            },
            offset: function(t) {
                if (t)
                    return this.each(function(e) {
                        var n = j(this)
                          , r = v(this, t, e, n.offset())
                          , i = n.offsetParent().offset()
                          , o = {
                            top: r.top - i.top,
                            left: r.left - i.left
                        };
                        "static" == n.css("position") && (o.position = "relative"),
                        n.css(o)
                    });
                if (!this.length)
                    return null;
                if (L.documentElement !== this[0] && !j.contains(L.documentElement, this[0]))
                    return {
                        top: 0,
                        left: 0
                    };
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                }
            },
            css: function(e, n) {
                if (arguments.length < 2) {
                    var r = this[0];
                    if ("string" == typeof e) {
                        if (!r)
                            return;
                        return r.style[N(e)] || getComputedStyle(r, "").getPropertyValue(e)
                    }
                    if (Q(e)) {
                        if (!r)
                            return;
                        var i = {}
                          , o = getComputedStyle(r, "");
                        return j.each(e, function(t, e) {
                            i[e] = r.style[N(e)] || o.getPropertyValue(e)
                        }),
                        i
                    }
                }
                var a = "";
                if ("string" == t(e))
                    n || 0 === n ? a = c(e) + ":" + f(e, n) : this.each(function() {
                        this.style.removeProperty(c(e))
                    });
                else
                    for (T in e)
                        e[T] || 0 === e[T] ? a += c(T) + ":" + f(T, e[T]) + ";" : this.each(function() {
                            this.style.removeProperty(c(T))
                        });
                return this.each(function() {
                    this.style.cssText += ";" + a
                })
            },
            index: function(t) {
                return t ? this.indexOf(j(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(t) {
                return !!t && P.some.call(this, function(t) {
                    return this.test(x(t))
                }, l(t))
            },
            addClass: function(t) {
                return t ? this.each(function(e) {
                    if ("className"in this) {
                        S = [];
                        var n = x(this);
                        v(this, t, e, n).split(/\s+/g).forEach(function(t) {
                            j(this).hasClass(t) || S.push(t)
                        }, this),
                        S.length && x(this, n + (n ? " " : "") + S.join(" "))
                    }
                }) : this
            },
            removeClass: function(t) {
                return this.each(function(e) {
                    if ("className"in this) {
                        if (t === E)
                            return x(this, "");
                        S = x(this),
                        v(this, t, e, S).split(/\s+/g).forEach(function(t) {
                            S = S.replace(l(t), " ")
                        }),
                        x(this, S.trim())
                    }
                })
            },
            toggleClass: function(t, e) {
                return t ? this.each(function(n) {
                    var r = j(this);
                    v(this, t, n, x(this)).split(/\s+/g).forEach(function(t) {
                        (e === E ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function(t) {
                if (this.length) {
                    var e = "scrollTop"in this[0];
                    return t === E ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                        this.scrollTop = t
                    }
                    : function() {
                        this.scrollTo(this.scrollX, t)
                    }
                    )
                }
            },
            scrollLeft: function(t) {
                if (this.length) {
                    var e = "scrollLeft"in this[0];
                    return t === E ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                        this.scrollLeft = t
                    }
                    : function() {
                        this.scrollTo(t, this.scrollY)
                    }
                    )
                }
            },
            position: function() {
                if (this.length) {
                    var t = this[0]
                      , e = this.offsetParent()
                      , n = this.offset()
                      , r = q.test(e[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : e.offset();
                    return n.top -= parseFloat(j(t).css("margin-top")) || 0,
                    n.left -= parseFloat(j(t).css("margin-left")) || 0,
                    r.top += parseFloat(j(e[0]).css("border-top-width")) || 0,
                    r.left += parseFloat(j(e[0]).css("border-left-width")) || 0,
                    {
                        top: n.top - r.top,
                        left: n.left - r.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || L.body; t && !q.test(t.nodeName) && "static" == j(t).css("position"); )
                        t = t.offsetParent;
                    return t
                })
            }
        },
        j.fn.detach = j.fn.remove,
        ["width", "height"].forEach(function(t) {
            var e = t.replace(/./, function(t) {
                return t[0].toUpperCase()
            });
            j.fn[t] = function(i) {
                var o, a = this[0];
                return i === E ? n(a) ? a["inner" + e] : r(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function(e) {
                    (a = j(this)).css(t, v(this, i, e, a[t]()))
                })
            }
        }),
        _.forEach(function(e, n) {
            var r = n % 2;
            j.fn[e] = function() {
                var e, i, o = j.map(arguments, function(n) {
                    var r = [];
                    return "array" == (e = t(n)) ? (n.forEach(function(t) {
                        return t.nodeType !== E ? r.push(t) : j.zepto.isZ(t) ? r = r.concat(t.get()) : void (r = r.concat(G.fragment(t)))
                    }),
                    r) : "object" == e || null == n ? n : G.fragment(n)
                }), a = this.length > 1;
                return o.length < 1 ? this : this.each(function(t, e) {
                    i = r ? e : e.parentNode,
                    e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                    var s = j.contains(L.documentElement, i);
                    o.forEach(function(t) {
                        if (a)
                            t = t.cloneNode(!0);
                        else if (!i)
                            return j(t).remove();
                        i.insertBefore(t, e),
                        s && b(t, function(t) {
                            if (!(null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src)) {
                                var e = t.ownerDocument ? t.ownerDocument.defaultView : window;
                                e.eval.call(e, t.innerHTML)
                            }
                        })
                    })
                })
            }
            ,
            j.fn[r ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
                return j(t)[e](this),
                this
            }
        }),
        G.Z.prototype = d.prototype = j.fn,
        G.uniq = C,
        G.deserializeValue = w,
        j.zepto = G,
        j
    }();
    return window.Zepto = t,
    window.$ === undefined && (window.$ = t),
    function(t) {
        function e(t) {
            return t._zid || (t._zid = h++)
        }
        function n(t, n, o, a) {
            if ((n = r(n)).ns)
                var s = i(n.ns);
            return (g[e(t)] || []).filter(function(t) {
                return t && (!n.e || t.e == n.e) && (!n.ns || s.test(t.ns)) && (!o || e(t.fn) === e(o)) && (!a || t.sel == a)
            })
        }
        function r(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }
        function i(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }
        function o(t, e) {
            return t.del && !y && t.e in x || !!e
        }
        function a(t) {
            return w[t] || y && x[t] || t
        }
        function s(n, i, s, u, l, h, p) {
            var d = e(n)
              , m = g[d] || (g[d] = []);
            i.split(/\s/).forEach(function(e) {
                if ("ready" == e)
                    return t(document).ready(s);
                var i = r(e);
                i.fn = s,
                i.sel = l,
                i.e in w && (s = function(e) {
                    var n = e.relatedTarget;
                    if (!n || n !== this && !t.contains(this, n))
                        return i.fn.apply(this, arguments)
                }
                ),
                i.del = h;
                var d = h || s;
                i.proxy = function(t) {
                    if (!(t = c(t)).isImmediatePropagationStopped()) {
                        t.data = u;
                        var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                        return !1 === e && (t.preventDefault(),
                        t.stopPropagation()),
                        e
                    }
                }
                ,
                i.i = m.length,
                m.push(i),
                "addEventListener"in n && n.addEventListener(a(i.e), i.proxy, o(i, p))
            })
        }
        function u(t, r, i, s, u) {
            var c = e(t);
            (r || "").split(/\s/).forEach(function(e) {
                n(t, e, i, s).forEach(function(e) {
                    delete g[c][e.i],
                    "removeEventListener"in t && t.removeEventListener(a(e.e), e.proxy, o(e, u))
                })
            })
        }
        function c(e, n) {
            return !n && e.isDefaultPrevented || (n || (n = e),
            t.each(j, function(t, r) {
                var i = n[t];
                e[t] = function() {
                    return this[r] = b,
                    i && i.apply(n, arguments)
                }
                ,
                e[r] = E
            }),
            e.timeStamp || (e.timeStamp = Date.now()),
            (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue"in n ? !1 === n.returnValue : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = b)),
            e
        }
        function l(t) {
            var e, n = {
                originalEvent: t
            };
            for (e in t)
                T.test(e) || t[e] === f || (n[e] = t[e]);
            return c(n, t)
        }
        var f, h = 1, p = Array.prototype.slice, d = t.isFunction, m = function(t) {
            return "string" == typeof t
        }, g = {}, v = {}, y = "onfocusin"in window, x = {
            focus: "focusin",
            blur: "focusout"
        }, w = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents",
        t.event = {
            add: s,
            remove: u
        },
        t.proxy = function(n, r) {
            var i = 2 in arguments && p.call(arguments, 2);
            if (d(n)) {
                var o = function() {
                    return n.apply(r, i ? i.concat(p.call(arguments)) : arguments)
                };
                return o._zid = e(n),
                o
            }
            if (m(r))
                return i ? (i.unshift(n[r], n),
                t.proxy.apply(null, i)) : t.proxy(n[r], n);
            throw new TypeError("expected function")
        }
        ,
        t.fn.bind = function(t, e, n) {
            return this.on(t, e, n)
        }
        ,
        t.fn.unbind = function(t, e) {
            return this.off(t, e)
        }
        ,
        t.fn.one = function(t, e, n, r) {
            return this.on(t, e, n, r, 1)
        }
        ;
        var b = function() {
            return !0
        }
          , E = function() {
            return !1
        }
          , T = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/
          , j = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        t.fn.delegate = function(t, e, n) {
            return this.on(e, t, n)
        }
        ,
        t.fn.undelegate = function(t, e, n) {
            return this.off(e, t, n)
        }
        ,
        t.fn.live = function(e, n) {
            return t(document.body).delegate(this.selector, e, n),
            this
        }
        ,
        t.fn.die = function(e, n) {
            return t(document.body).undelegate(this.selector, e, n),
            this
        }
        ,
        t.fn.on = function(e, n, r, i, o) {
            var a, c, h = this;
            return e && !m(e) ? (t.each(e, function(t, e) {
                h.on(t, n, r, e, o)
            }),
            h) : (m(n) || d(i) || !1 === i || (i = r,
            r = n,
            n = f),
            i !== f && !1 !== r || (i = r,
            r = f),
            !1 === i && (i = E),
            h.each(function(f, h) {
                o && (a = function(t) {
                    return u(h, t.type, i),
                    i.apply(this, arguments)
                }
                ),
                n && (c = function(e) {
                    var r, o = t(e.target).closest(n, h).get(0);
                    if (o && o !== h)
                        return r = t.extend(l(e), {
                            currentTarget: o,
                            liveFired: h
                        }),
                        (a || i).apply(o, [r].concat(p.call(arguments, 1)))
                }
                ),
                s(h, e, i, r, n, c || a)
            }))
        }
        ,
        t.fn.off = function(e, n, r) {
            var i = this;
            return e && !m(e) ? (t.each(e, function(t, e) {
                i.off(t, n, e)
            }),
            i) : (m(n) || d(r) || !1 === r || (r = n,
            n = f),
            !1 === r && (r = E),
            i.each(function() {
                u(this, e, r, n)
            }))
        }
        ,
        t.fn.trigger = function(e, n) {
            return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e),
            e._args = n,
            this.each(function() {
                e.type in x && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent"in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
            })
        }
        ,
        t.fn.triggerHandler = function(e, r) {
            var i, o;
            return this.each(function(a, s) {
                (i = l(m(e) ? t.Event(e) : e))._args = r,
                i.target = s,
                t.each(n(s, e.type || e), function(t, e) {
                    if (o = e.proxy(i),
                    i.isImmediatePropagationStopped())
                        return !1
                })
            }),
            o
        }
        ,
        "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
            t.fn[e] = function(t) {
                return 0 in arguments ? this.bind(e, t) : this.trigger(e)
            }
        }),
        t.Event = function(t, e) {
            m(t) || (e = t,
            t = e.type);
            var n = document.createEvent(v[t] || "Events")
              , r = !0;
            if (e)
                for (var i in e)
                    "bubbles" == i ? r = !!e[i] : n[i] = e[i];
            return n.initEvent(t, r, !0),
            c(n)
        }
    }(t),
    function(t) {
        function e(e, n, r) {
            var i = t.Event(n);
            return t(e).trigger(i, r),
            !i.isDefaultPrevented()
        }
        function n(t, n, r, i) {
            if (t.global)
                return e(n || y, r, i)
        }
        function r(e) {
            e.global && 0 == t.active++ && n(e, null, "ajaxStart")
        }
        function i(e) {
            e.global && !--t.active && n(e, null, "ajaxStop")
        }
        function o(t, e) {
            var r = e.context;
            if (!1 === e.beforeSend.call(r, t, e) || !1 === n(e, r, "ajaxBeforeSend", [t, e]))
                return !1;
            n(e, r, "ajaxSend", [t, e])
        }
        function a(t, e, r, i) {
            var o = r.context;
            r.success.call(o, t, "success", e),
            i && i.resolveWith(o, [t, "success", e]),
            n(r, o, "ajaxSuccess", [e, r, t]),
            u("success", e, r)
        }
        function s(t, e, r, i, o) {
            var a = i.context;
            i.error.call(a, r, e, t),
            o && o.rejectWith(a, [r, e, t]),
            n(i, a, "ajaxError", [r, i, t || e]),
            u(e, r, i)
        }
        function u(t, e, r) {
            var o = r.context;
            r.complete.call(o, e, t),
            n(r, o, "ajaxComplete", [e, r]),
            i(r)
        }
        function c(t, e, n) {
            if (n.dataFilter == l)
                return t;
            var r = n.context;
            return n.dataFilter.call(r, t, e)
        }
        function l() {}
        function f(t) {
            return t && (t = t.split(";", 2)[0]),
            t && (t == T ? "html" : t == E ? "json" : w.test(t) ? "script" : b.test(t) && "xml") || "text"
        }
        function h(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }
        function p(e) {
            e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
            !e.data || e.type && "GET" != e.type.toUpperCase() && "jsonp" != e.dataType || (e.url = h(e.url, e.data),
            e.data = undefined)
        }
        function d(e, n, r, i) {
            return t.isFunction(n) && (i = r,
            r = n,
            n = undefined),
            t.isFunction(r) || (i = r,
            r = undefined),
            {
                url: e,
                data: n,
                success: r,
                dataType: i
            }
        }
        function m(e, n, r, i) {
            var o, a = t.isArray(n), s = t.isPlainObject(n);
            t.each(n, function(n, u) {
                o = t.type(u),
                i && (n = r ? i : i + "[" + (s || "object" == o || "array" == o ? n : "") + "]"),
                !i && a ? e.add(u.name, u.value) : "array" == o || !r && "object" == o ? m(e, u, r, n) : e.add(n, u)
            })
        }
        var g, v = +new Date, y = window.document, x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, w = /^(?:text|application)\/javascript/i, b = /^(?:text|application)\/xml/i, E = "application/json", T = "text/html", j = /^\s*$/, S = y.createElement("a");
        S.href = window.location.href,
        t.active = 0,
        t.ajaxJSONP = function(e, n) {
            if (!("type"in e))
                return t.ajax(e);
            var r, i, u = e.jsonpCallback, c = (t.isFunction(u) ? u() : u) || "Zepto" + v++, l = y.createElement("script"), f = window[c], h = function(e) {
                t(l).triggerHandler("error", e || "abort")
            }, p = {
                abort: h
            };
            return n && n.promise(p),
            t(l).on("load error", function(o, u) {
                clearTimeout(i),
                t(l).off().remove(),
                "error" != o.type && r ? a(r[0], p, e, n) : s(null, u || "error", p, e, n),
                window[c] = f,
                r && t.isFunction(f) && f(r[0]),
                f = r = undefined
            }),
            !1 === o(p, e) ? (h("abort"),
            p) : (window[c] = function() {
                r = arguments
            }
            ,
            l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c),
            y.head.appendChild(l),
            e.timeout > 0 && (i = setTimeout(function() {
                h("timeout")
            }, e.timeout)),
            p)
        }
        ,
        t.ajaxSettings = {
            type: "GET",
            beforeSend: l,
            success: l,
            error: l,
            complete: l,
            context: null,
            global: !0,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: E,
                xml: "application/xml, text/xml",
                html: T,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0,
            dataFilter: l
        },
        t.ajax = function(e) {
            var n, i, u = t.extend(!0, {}, t.ajaxSettings, e || {}), d = t.Deferred && t.Deferred();
            r(u),
            u.crossDomain || ((n = y.createElement("a")).href = u.url,
            n.href = n.href,
            u.crossDomain = S.protocol + "//" + S.host != n.protocol + "//" + n.host),
            u.url || (u.url = window.location.toString()),
            (i = u.url.indexOf("#")) > -1 && (u.url = u.url.slice(0, i)),
            p(u);
            var m = u.dataType
              , v = /\?.+=\?/.test(u.url);
            if (v && (m = "jsonp"),
            !1 !== u.cache && (e && !0 === e.cache || "script" != m && "jsonp" != m) || (u.url = h(u.url, "_=" + Date.now())),
            "jsonp" == m)
                return v || (u.url = h(u.url, u.jsonp ? u.jsonp + "=?" : !1 === u.jsonp ? "" : "callback=?")),
                t.ajaxJSONP(u, d);
            var x, w = u.accepts[m], b = {}, E = function(t, e) {
                b[t.toLowerCase()] = [t, e]
            }, T = /^([\w-]+:)\/\//.test(u.url) ? RegExp.$1 : window.location.protocol, N = u.xhr(), C = N.setRequestHeader;
            if (d && d.promise(N),
            u.crossDomain || E("X-Requested-With", "XMLHttpRequest"),
            E("Accept", w || "*/*"),
            (w = u.mimeType || w) && (w.indexOf(",") > -1 && (w = w.split(",", 2)[0]),
            N.overrideMimeType && N.overrideMimeType(w)),
            (u.contentType || !1 !== u.contentType && u.data && "GET" != u.type.toUpperCase()) && E("Content-Type", u.contentType || "application/x-www-form-urlencoded"),
            u.headers)
                for (g in u.headers)
                    E(g, u.headers[g]);
            if (N.setRequestHeader = E,
            N.onreadystatechange = function() {
                if (4 == N.readyState) {
                    N.onreadystatechange = l,
                    clearTimeout(x);
                    var e, n = !1;
                    if (N.status >= 200 && N.status < 300 || 304 == N.status || 0 == N.status && "file:" == T) {
                        if (m = m || f(u.mimeType || N.getResponseHeader("content-type")),
                        "arraybuffer" == N.responseType || "blob" == N.responseType)
                            e = N.response;
                        else {
                            e = N.responseText;
                            try {
                                e = c(e, m, u),
                                "script" == m ? (0,
                                eval)(e) : "xml" == m ? e = N.responseXML : "json" == m && (e = j.test(e) ? null : t.parseJSON(e))
                            } catch (r) {
                                n = r
                            }
                            if (n)
                                return s(n, "parsererror", N, u, d)
                        }
                        a(e, N, u, d)
                    } else
                        s(N.statusText || null, N.status ? "error" : "abort", N, u, d)
                }
            }
            ,
            !1 === o(N, u))
                return N.abort(),
                s(null, "abort", N, u, d),
                N;
            var P = !("async"in u) || u.async;
            if (N.open(u.type, u.url, P, u.username, u.password),
            u.xhrFields)
                for (g in u.xhrFields)
                    N[g] = u.xhrFields[g];
            for (g in b)
                C.apply(N, b[g]);
            return u.timeout > 0 && (x = setTimeout(function() {
                N.onreadystatechange = l,
                N.abort(),
                s(null, "timeout", N, u, d)
            }, u.timeout)),
            N.send(u.data ? u.data : null),
            N
        }
        ,
        t.get = function() {
            return t.ajax(d.apply(null, arguments))
        }
        ,
        t.post = function() {
            var e = d.apply(null, arguments);
            return e.type = "POST",
            t.ajax(e)
        }
        ,
        t.getJSON = function() {
            var e = d.apply(null, arguments);
            return e.dataType = "json",
            t.ajax(e)
        }
        ,
        t.fn.load = function(e, n, r) {
            if (!this.length)
                return this;
            var i, o = this, a = e.split(/\s/), s = d(e, n, r), u = s.success;
            return a.length > 1 && (s.url = a[0],
            i = a[1]),
            s.success = function(e) {
                o.html(i ? t("<div>").html(e.replace(x, "")).find(i) : e),
                u && u.apply(o, arguments)
            }
            ,
            t.ajax(s),
            this
        }
        ;
        var N = encodeURIComponent;
        t.param = function(e, n) {
            var r = [];
            return r.add = function(e, n) {
                t.isFunction(n) && (n = n()),
                null == n && (n = ""),
                this.push(N(e) + "=" + N(n))
            }
            ,
            m(r, e, n),
            r.join("&").replace(/%20/g, "+")
        }
    }(t),
    function(t) {
        function e(t, e, n, r) {
            return Math.abs(t - e) >= Math.abs(n - r) ? t - e > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
        }
        function n() {
            l = null,
            h.last && (h.el.trigger("longTap"),
            h = {})
        }
        function r() {
            l && clearTimeout(l),
            l = null
        }
        function i() {
            s && clearTimeout(s),
            u && clearTimeout(u),
            c && clearTimeout(c),
            l && clearTimeout(l),
            s = u = c = l = null,
            h = {}
        }
        function o(t) {
            return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
        }
        function a(t, e) {
            return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
        }
        var s, u, c, l, f, h = {};
        t(document).ready(function() {
            var p, d, m, g, v = 0, y = 0;
            "MSGesture"in window && ((f = new MSGesture).target = document.body),
            t(document).bind("MSGestureEnd", function(t) {
                var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
                e && (h.el.trigger("swipe"),
                h.el.trigger("swipe" + e))
            }).on("touchstart MSPointerDown pointerdown", function(e) {
                (g = a(e, "down")) && !o(e) || (m = g ? e : e.touches[0],
                e.touches && 1 === e.touches.length && h.x2 && (h.x2 = undefined,
                h.y2 = undefined),
                p = Date.now(),
                d = p - (h.last || p),
                h.el = t("tagName"in m.target ? m.target : m.target.parentNode),
                s && clearTimeout(s),
                h.x1 = m.pageX,
                h.y1 = m.pageY,
                d > 0 && d <= 250 && (h.isDoubleTap = !0),
                h.last = p,
                l = setTimeout(n, 750),
                f && g && f.addPointer(e.pointerId))
            }).on("touchmove MSPointerMove pointermove", function(t) {
                (g = a(t, "move")) && !o(t) || (m = g ? t : t.touches[0],
                r(),
                h.x2 = m.pageX,
                h.y2 = m.pageY,
                v += Math.abs(h.x1 - h.x2),
                y += Math.abs(h.y1 - h.y2))
            }).on("touchend MSPointerUp pointerup", function(n) {
                (g = a(n, "up")) && !o(n) || (r(),
                h.x2 && Math.abs(h.x1 - h.x2) > 30 || h.y2 && Math.abs(h.y1 - h.y2) > 30 ? c = setTimeout(function() {
                    h.el && (h.el.trigger("swipe"),
                    h.el.trigger("swipe" + e(h.x1, h.x2, h.y1, h.y2))),
                    h = {}
                }, 0) : "last"in h && (v < 30 && y < 30 ? u = setTimeout(function() {
                    var e = t.Event("tap");
                    e.cancelTouch = i,
                    h.el && h.el.trigger(e),
                    h.isDoubleTap ? (h.el && h.el.trigger("doubleTap"),
                    h = {}) : s = setTimeout(function() {
                        s = null,
                        h.el && h.el.trigger("singleTap"),
                        h = {}
                    }, 250)
                }, 0) : h = {}),
                v = y = 0)
            }).on("touchcancel MSPointerCancel pointercancel", i),
            t(window).on("scroll", i)
        }),
        ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
            t.fn[e] = function(t) {
                return this.on(e, t)
            }
        })
    }(t),
    t
});
LBF.define("monitor.SpeedReport", function(require) {
    var t = {
        url: "//isdspeed.qq.com/cgi-bin/r.cgi",
        rate: 1,
        calGap: !1
    }
      , n = {}
      , e = function(t) {
        var e = +new Date
          , r = "log_" + e
          , o = n[r] = new Image;
        o.onload = o.onerror = function() {
            n[r] = null
        }
        ,
        t += (t.indexOf("?") > -1 ? "&" : "?") + e,
        o.src = t
    }
      , r = function(n) {
        n = n || {};
        for (var e in t)
            this[e] = n[e] || t[e];
        for (var r in n)
            this[r] = n[r];
        this.points = [],
        this.start = +new Date
    }
      , o = {
        add: function(t, n) {
            var e = this.points;
            return t = t || +new Date,
            n = n || e.length,
            e[n] = t,
            this
        },
        send: function() {
            var t = this.points.splice(0);
            if (Math.random() > this.rate)
                return this;
            var n, r = this.start, o = this.flag1, a = this.flag2, i = this.flag3, d = this.url + "?flag1=" + o + "&flag2=" + a + "&flag3=" + i + "&", s = this.proxy;
            if (this.calGap)
                for (n = t.length - 1; n > 0; n--)
                    t[n - 1] = t[n - 1] || 0,
                    t[n] -= t[n - 1];
            else
                for (n = t.length - 1; n > 0; n--)
                    t[n] && (t[n] -= r);
            d += function() {
                var n = [];
                for (var e in t)
                    n.push(e + "=" + (t[e] || ""));
                return n.join("&")
            }(),
            s && (d = s.replace("{url}", encodeURIComponent(d))),
            e(d)
        }
    };
    for (var a in o)
        r.prototype[a] = o[a];
    return {
        create: function(t) {
            return new r(t)
        },
        reportPerformance: function(t) {
            var n, r, o, a = t.flag1, i = t.flag2, d = t.flag3IE, s = t.flag3Chrome, f = t.initTime, c = t.proxy, l = window.performance || window.webkitPerformance || window.msPerformance, p = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"], m = [], u = d;
            if (Math.random() > t.rate)
                return this;
            if (l && (n = l.timing)) {
                "undefined" != typeof n.msFirstPaint ? p.push("msFirstPaint") : s && (u = s),
                r = n[p[0]];
                for (var g = 1, h = p.length; g < h; g++)
                    (o = (o = n[p[g]]) ? o - r : 0) > 0 && m.push(g + "=" + o);
                f && m.push("30=" + (f - r));
                var v = (v = t.url || "//isdspeed.qq.com/cgi-bin/r.cgi") + "?flag1=" + a + "&flag2=" + i + "&flag3=" + u + "&" + m.join("&");
                c && (v = c.replace("{url}", encodeURIComponent(v))),
                e(v)
            }
        },
        reportPerform: function(t) {
            var n, r, o, a = t.flag1, i = t.flag2, d = t.flag3IE, s = t.flag3Chrome, f = t.initTime, c = t.proxy, l = -1 !== location.protocol.indexOf("https") ? "//huatuospeed.weiyun.com/cgi-bin/r.cgi" : "//isdspeed.qq.com/cgi-bin/r.cgi", p = window.performance || window.webkitPerformance || window.msPerformance, m = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"], u = [], g = d;
            if (p && (n = p.timing)) {
                "undefined" != typeof n.msFirstPaint ? m.push("msFirstPaint") : s && (g = s),
                r = n[m[0]];
                for (var h = 1, v = m.length; h < v; h++)
                    (o = (o = n[m[h]]) ? o - r : 0) > 0 && u.push(h + "=" + o);
                f && u.push("30=" + (f - r));
                var E = t.url || l;
                E += "?flag1=" + a + "&flag2=" + i + "&flag3=" + g + "&" + u.join("&"),
                c && (E = c.replace("{url}", encodeURIComponent(E))),
                e(E)
            }
        }
    }
});
define("qdm/js/common/page/index.2b38d.js", ["lib.Zepto", "util.ejs2", "util.Cookie", "common.login.qidian", "qidian.report", "qidian.wxShare", "qdm/js/common/utils/debounce.5e0cc.js", "qdm/js/common/components/Toggle.b6163.js", "qdm/js/common/components/Tips.28ade.js", "qdm/js/common/components/Loading.f83d8.js", "qdm/js/common/store/searchHistory.7d9ea.js"], function(require, exports, module) {
    var t = require("lib.Zepto")
      , o = require("util.ejs2")
      , e = require("util.Cookie")
      , n = require("common.login.qidian")
      , i = require("qidian.report")
      , r = require("qidian.wxShare")
      , a = require("qdm/js/common/utils/debounce.5e0cc.js")
      , c = require("qdm/js/common/components/Toggle.b6163.js");
    require("qdm/js/common/components/Tips.28ade.js"),
    require("qdm/js/common/components/Loading.f83d8.js");
    var s = require("qdm/js/common/store/searchHistory.7d9ea.js");
    module.exports = {
        init: function() {
            this.initGlobalAjaxSetting(),
            this.initGlobalAutoLogin(),
            this.initGlobalLogin(),
            this.initHeader(),
            this.initFooter(),
            this.initWXShare(),
            i.init({
                path: "msite",
                isQD: !0,
                cname: "QDmlog"
            }),
            t("#aGoPCSite").on("click", function() {
                e.set("tf", 1, "qidian.com", "/")
            })
        },
        initGlobalAjaxSetting: function() {
            var o = this
              , n = {
                dataType: "json"
            }
              , i = e.get("_csrfToken");
            i && (n.data = {
                _csrfToken: i
            }),
            t.ajaxSettings = t.extend(!0, t.ajaxSettings, n),
            t(document).on("ajaxError", function(e, n, i) {
                401 === n.status ? o.gotoLogin() : t.isFunction(i.unexpectError) ? i.unexpectError.call(i.context, n, i) : i.noErrorTips || t.tips("网络异常，请稍后重试"),
                t.unloading(),
                t(".loading").removeClass("loading")
            }),
            t.getJSONSlient = function(o, e, n) {
                return t.isFunction(e) && (n = e,
                e = undefined),
                t.ajax({
                    type: "get",
                    url: o,
                    data: e,
                    success: n,
                    noErrorTips: !0
                })
            }
            ,
            t.postJSON = function(o, e, n) {
                return i && (o += (o.indexOf("?") > -1 ? "&" : "?") + "_csrfToken=" + i),
                t.ajax({
                    type: "POST",
                    url: o,
                    contentType: "application/json",
                    data: JSON.stringify(e),
                    success: n
                })
            }
            ,
            t.postSlient = function(o, e, n) {
                return t.isFunction(e) && (n = e,
                e = undefined),
                t.ajax({
                    type: "post",
                    url: o,
                    data: e,
                    success: n,
                    noErrorTips: !0
                })
            }
        },
        initGlobalAutoLogin: function() {
            n.init(!0),
            n.setCallback("success", null, function() {
                location.href = location.href.split("#")[0]
            })
        },
        initGlobalLogin: function() {
            var o = this;
            t("a.jsLogin").removeClass(".jsLogin").on("click", function(e) {
                e.preventDefault();
                var n = t(this)
                  , i = n.prop("href").indexOf("http") > -1 ? n.prop("href") : "";
                o.gotoLogin({
                    returnurl: i
                })
            })
        },
        gotoLogin: function(t) {
            t || (t = {});
            var o = t.returnurl || location.href;
            o.indexOf("?") > -1 ? o += "&from=login" : o += "?from=login",
            t.returnurl = o,
            location.href = n.getMLoginUrl(t)
        },
        initHeader: function() {
            var o, e = this, n = t(".jsBack").on("click", function(t) {
                /^javas/.test(this.href) && (t.preventDefault(),
                history.go(-1))
            });
            t("#openSearchPopup").on("click", function(n) {
                n.preventDefault();
                var i = t(this).data("keyword") || "";
                t("#searchPopup").removeAttr("hidden"),
                t("#keyword").attr("placeholder", i).focus(),
                o || (o = !0,
                e.initSearch())
            });
            var i = t("#guideOverlay").on("click", function() {
                t("#openGuide").trigger("click")
            }).attr("role", "button");
            new c("#openGuide",function(t) {
                var o = t.attr("title")
                  , n = t.parents("header");
                /收起/.test(o) ? (t.attr("title", o.replace("收起", "")),
                n.removeAttr("open"),
                i.attr("title", "已收起")) : (n.attr("open", ""),
                t.attr("title", "收起" + o),
                e.elBacktop && e.elBacktop.trigger("click"),
                i.attr("title", "点击收起"))
            }
            );
            var r = t("#guide").on("touchmove", function(t) {
                t.preventDefault()
            });
            r.length && (window.addEventListener("resize", function() {
                e.elBacktop && r.hasClass("active") && e.elBacktop.trigger("click")
            }),
            t("#header").on("touchmove", function(t) {
                r.hasClass("active") && t.preventDefault()
            })),
            t("#header nav a").on("click", function(t) {
                var o = this.href;
                !1 === /^#/.test(o) && !1 === /^javasc/.test(o) && (t.preventDefault(),
                history.replaceState(null, document.title, o.split("#")[0] + "#"),
                location.replace(""))
            }).each(function() {
                var o = t(this);
                o.parent("h3").attr({
                    role: "navigation",
                    "aria-label": o.hasClass("active") ? "已选择" : ""
                })
            });
            var a = document.referrer;
            "string" == typeof a && "" === a && n.attr("href", "/")
        },
        initFooter: function() {
            var o = t(window)
              , e = t(".jsBackToTop").on("click", function(t) {
                t.preventDefault();
                var e = o.scrollTop()
                  , n = function() {
                    (e *= .5) < 1 ? o.scrollTop(0) : (o.scrollTop(e),
                    requestAnimationFrame(n))
                };
                n()
            });
            this.elBacktop = e;
            var n = t("#footerApp");
            o.on("scroll", function() {
                var t = o.scrollTop()
                  , i = o.height();
                t > i && (!n.length || t + i - n.position().top <= 0) ? e.css({
                    opacity: 1,
                    visibility: "visible"
                }) : e.css({
                    opacity: 0,
                    visibility: "hidden"
                })
            });
            var i = navigator.userAgent && /\bAndroid ([\d\.]+)/.test(navigator.userAgent);
            t(".jsDownloadLink").each(function() {
                var o = t(this);
                /^javas/.test(o.attr("href")) && (o.attr("href", i ? o.data("android") : o.data("ios")),
                o.removeAttr("data-android"),
                o.removeAttr("data-ios"))
            })
        },
        initSearch: function() {
            t("#closeSearchPopup").on("click", function() {
                t("#searchPopup").attr("hidden", ""),
                t("body").removeClass("open")
            }),
            this.initSearchForm(),
            this.initSearchPopularWords(),
            this.initSearchHistory()
        },
        initSearchForm: function() {
            var e = t("#keyword")
              , n = t("#clearSearchKeyword")
              , i = t("#searchHotHistory")
              , r = t("#searchList")
              , c = e.val()
              , l = function() {
                c && t.getJSON("/majax/search/auto?kw=" + c, function(t) {
                    if (0 === t.code) {
                        if (!c)
                            return;
                        i.attr("hidden", ""),
                        r.removeAttr("hidden").html(o.render("#tpl-search-list.html", t))
                    }
                })
            }
              , d = a(l, 300);
            e.on("input", function() {
                (c = t(this).val().trim()) ? (n.removeAttr("hidden"),
                d()) : (n.attr("hidden", ""),
                i.removeAttr("hidden"),
                r.attr("hidden", ""))
            }),
            n.on("click", function() {
                e.val("").trigger("input").focus()
            }),
            c && (n.removeAttr("hidden"),
            i.attr("hidden", ""),
            l()),
            t("#searchPopup").on("click", ".jsSearchLink", function() {
                c = t(this).data("keyword"),
                s.addKeyword(c),
                e.val(c)
            }).on("touchmove", function(t) {
                t.preventDefault()
            }),
            t("#searchForm").on("submit", function() {
                !(c = e.val().trim()) && e.attr("placeholder") && (c = e.attr("placeholder"),
                e.val(c)),
                s.addKeyword(c)
            })
        },
        initSearchPopularWords: function() {
            t.getJSON("/majax/search/auto?kw=", function(e) {
                if (0 === e.code) {
                    var n = o.render("#tpl-search-popular-words.html", e)
                      , i = t("#searchPopularWords").html(n);
                    t("#keyword").val() ? i.height("auto") : i.unloading(200)
                }
            })
        },
        initSearchHistory: function() {
            var e = s.getKeywords()
              , n = o.render("#tpl-search-history.html", {
                data: e
            })
              , i = t("#searchHistory").html(n);
            t("#clearSearchHistory").on("click", function() {
                s.clearKeywords(),
                i.attr("hidden", "")
            })
        },
        initWXShare: function() {
            var o = document.title
              , e = location.href
              , n = t('head [name="description"]').attr("content");
            r.setWeiXinShareConfig("qidianzhongwenwang", o, e, "http://qidian.qpic.cn/qidian_common/349573/c107e5b2c592588cd122c92022c9528d/0", n)
        }
    }
});
define("qdm/js/bookshelf/my.8ad59.js", ["lib.Zepto", "util.ejs2", "util.Cookie", "common.login.qidian", "qdm/js/common/utils/url.fd98a.js", "qdm/js/common/mixin/lazyLoad.54931.js", "qdm/js/common/utils/tplExtends.f5d3c.js", "qdm/js/common/page/merge.435d1.js", "qdm/js/common/components/Select.7d295.js", "qdm/js/common/components/Panel.77e55.js", "qdm/js/common/components/Popup.eb3a2.js", "qdm/js/common/mixin/lazyLoad.54931.js", "qdm/js/common/mixin/infiniteScroll.c4789.js", "qdm/js/common/mixin/url.87df0.js", "qdm/js/common/components/Stick.da897.js", "qdm/js/common/components/Loading.f83d8.js"], function(require, exports, module) {
    var o = require("lib.Zepto")
      , e = require("util.ejs2")
      , t = (require("util.Cookie"),
    require("common.login.qidian"),
    require("qdm/js/common/utils/url.fd98a.js"))
      , a = require("qdm/js/common/mixin/lazyLoad.54931.js")
      , i = require("qdm/js/common/utils/tplExtends.f5d3c.js")
      , d = require("qdm/js/common/page/merge.435d1.js")
      , s = require("qdm/js/common/components/Select.7d295.js")
      , n = require("qdm/js/common/components/Panel.77e55.js")
      , l = require("qdm/js/common/components/Popup.eb3a2.js")
      , a = require("qdm/js/common/mixin/lazyLoad.54931.js")
      , r = require("qdm/js/common/mixin/infiniteScroll.c4789.js")
      , p = require("qdm/js/common/mixin/url.87df0.js")
      , m = (require("qdm/js/common/components/Stick.da897.js"),
    o("#bookEditBtn"))
      , c = o("#bookEditOl")
      , u = o("#bookEditPopup")
      , h = o("#header")
      , g = o("#editHeader")
      , k = o("#editBtnHeader")
      , f = o("#bookGroupPopup")
      , b = o("#bookGroupCreatePopup")
      , v = o("#bookGroupPopup");
    require("qdm/js/common/components/Loading.f83d8.js"),
    module.exports = d({
        mixins: [a, a, r, p],
        params: {
            pageNum: 1,
            pageSize: c.data("page-size") || 20,
            sort: c.data("sort-type"),
            bids: [],
            gid: t.getParamByName("gid") ? t.getParamByName("gid") : -100,
            gname: ""
        },
        groups: [],
        BSUI: {
            popupBookEdit: null,
            popupBookGroup: null,
            groupSelect: null
        },
        recommList: [],
        listTotalNum: c.data("count-num"),
        groupId: t.getParamByName("gid") ? t.getParamByName("gid") : "-100",
        groupName: t.getParamByName("gName") ? t.getParamByName("gName") : "我的分组",
        originalListToTopHeight: o("#editBtnHeader").length > 0 ? o("#editBtnHeader").offset().top : 0,
        init: function() {
            c.length && (this.initListOrder(),
            this.initGroupSwitch(),
            this.initSortSwitch(),
            this.initMultiSelect(),
            o("#bookEditOl").on("click", ".isFineLayout", function(e) {
                if (o("#bookEditOl").hasClass("enabled"))
                    return !1;
                e.preventDefault(),
                o.tips("请前往 app 查看精排书")
            }))
        },
        onInfiniteScroll: function() {
            this.params.pageNum++,
            this.loadData()
        },
        initSortSwitch: function() {
            var e = this;
            new s(o("#timeOrder"),{
                onSelect: function(t) {
                    var a = o(this).attr("data-value");
                    e.params.pageNum = 1,
                    e.params.sortChange = a == e.params.sort ? 0 : 1,
                    e.params.sort = a,
                    c.data("sort-type", a);
                    var i = o.extend({}, e.params);
                    delete i.sortChange,
                    delete i.sort,
                    e.replaceState(i),
                    "fixed" == o(".mybook-default-header").css("position") && o(window).scrollTop(e.originalListToTopHeight + 1),
                    e.loadData()
                }
            })
        },
        initMultiSelect: function() {
            var e = this;
            k.children().stick(),
            o(window).trigger("scroll"),
            o("#btnEditCancel").on("click", function() {
                c.removeClass("enabled"),
                h.removeAttr("hidden"),
                g.attr("hidden", ""),
                k.removeAttr("hidden"),
                c.find("li.checked").removeClass("checked"),
                c.find('a[role="checkbox"]').attr("aria-checked", "false"),
                e.BSUI.popupBookEdit && e.BSUI.popupBookEdit.hide()
            }),
            o("#btnEditAll").on("click", function() {
                c.find("li").not(".checked").trigger("click")
            })
        },
        initGroupSwitch: function() {
            var e = this;
            e.BSUI.groupSelect = new s(o("#filterGroup"),{
                onSelect: function(t, a) {
                    e.params.pageNum = 1,
                    e.params.gid = o(this).data("group-id"),
                    e.groupId = e.params.gid;
                    var i = o.extend({}, e.params);
                    delete i.sortChange,
                    delete i.sort,
                    e.replaceState(i),
                    "fixed" == o(".mybook-default-header").css("position") && o(window).scrollTop(e.originalListToTopHeight + 1),
                    e.loadData()
                }
            })
        },
        updateGroupSwitch: function() {
            var t = this;
            console.log("测试"),
            o.getJSON("/meajax/MBookshelf/Groups", t.params, function(a) {
                if (a.data,
                0 === a.code) {
                    o.extend(a, {
                        staticConf: g_data,
                        currentGroup: parseFloat(t.groupId, 10)
                    }, i);
                    var d = e.render("#tpl-groups-switch.html", a);
                    o("#bookGroupListSwitchtContainer").html(d).find('.select-option[data-group-id="' + t.groupId + '"]').addClass("selected");
                    var s = e.render("#tpl-groups-lists.html", a);
                    o("#bookGroupListContainer").html(s)
                } else
                    o.tips(a.msg)
            })
        },
        editButtonHandler: function() {
            var e = this;
            m.on("click", function() {
                e.params.bids = [],
                h.attr("hidden", ""),
                g.removeAttr("hidden"),
                k.attr("hidden", ""),
                c.hasClass("enabled") ? (c.removeClass("enabled"),
                e.BSUI.popupBookEdit && e.BSUI.popupBookEdit.hide(),
                o("#bookEditOl .book-li.checked").removeClass("checked"),
                c.find('a[role="checkbox"]').attr("aria-checked", "false")) : c.addClass("enabled")
            }),
            c.on("click", "li", function() {
                var t = this;
                if (c.hasClass("enabled")) {
                    var a = o(t).data("book-id");
                    o(t).toggleClass("checked");
                    var i = c.find("li.checked").length;
                    o(t).find('a[role="checkbox"]').attr("aria-checked", o(t).hasClass("checked")),
                    0 == i ? (o(".selected-count").html(""),
                    e.BSUI.popupBookEdit && e.BSUI.popupBookEdit.hide(),
                    e.params.bids = []) : (o(t).hasClass("checked") ? e.params.bids.push(a) : e.params.bids.splice(e.params.bids.indexOf(a), 1),
                    o(".selected-count").html("(" + i + ")"),
                    e.BSUI.popupBookEdit ? e.BSUI.popupBookEdit.show() : e.BSUI.popupBookEdit = new l(u.removeAttr("hidden"),{
                        overlay: !1
                    }))
                }
            }),
            c.on("click", "a", function(o) {
                c.hasClass("enabled") && o.preventDefault()
            })
        },
        bookMoveHandler: function() {
            var t = this
              , a = function() {
                -100 == parseInt(t.params.gid, 10) ? o("#bookGroupPopup .default-group-hidden").hide() : o("#bookGroupPopup .default-group-hidden").attr("style", "display:block")
            };
            o("#bookMoveBtn").on("click", function() {
                if (o("#filterGroup .select-option.selected"),
                t.params.bids,
                t.BSUI.popoupBookGroup)
                    t.BSUI.popoupBookGroup.show(),
                    a();
                else {
                    var d = {};
                    d = o.extend({}, t.params),
                    o.getJSON("/meajax/MBookshelf/Groups", d, function(d) {
                        if (0 === d.code) {
                            o.extend(d, {
                                staticConf: g_data,
                                currentGroup: parseFloat(t.groupId, 10)
                            }, i);
                            var s = e.render("#tpl-groups-lists.html", d);
                            a(),
                            o("#bookGroupListContainer").prepend(s),
                            t.BSUI.popoupBookGroup = new l(f.removeAttr("hidden")),
                            v.on("click", "a:not(.btn-add-new)", function(e) {
                                var a = this;
                                t.params.pageNum = 1;
                                var d = o.extend({}, t.params);
                                d.gid = o(a).data("group-id"),
                                d.bids = t.params.bids.toString(),
                                o.getJSON("/meajax/MBookshelf/MoveList", d, function(e) {
                                    0 === e.code ? (o.extend(e, {
                                        staticConf: g_data
                                    }, i),
                                    t.BSUI.popoupBookGroup.hide(),
                                    t.BSUI.popupBookEdit.hide(),
                                    c.removeClass("enabled"),
                                    t.listTotalNum = t.listTotalNum - t.params.bids.length,
                                    h.removeAttr("hidden"),
                                    g.attr("hidden", ""),
                                    k.removeAttr("hidden"),
                                    t.listTotalNum > 0 ? o("#bookEditOl li.checked").remove() : -100 == t.params.gid ? o("#bookEditOl").html('<div class="null">默认书架是空的</div>') : o("#bookEditOl").html('<div class="null">你的分组是空的</div>'),
                                    t.updateGroupSwitch(),
                                    t.params.bids = []) : (t.BSUI.popupBookEdit.show(),
                                    o.tips(e.msg))
                                })
                            })
                        } else
                            o.tips(d.msg)
                    })
                }
            })
        },
        bookDeleteHandler: function() {
            var e = this;
            o("#bookDelBtn").on("click", function() {
                e.listTotalNum,
                o(this),
                o("#filterGroup .select-option.selected"),
                new n("确定删除？",{
                    buttons: [{}, {
                        value: "删除",
                        className: "red",
                        events: function() {
                            var t = o(this)
                              , a = e.params.bids
                              , d = o.extend({}, e.params);
                            d.bids = a.toString(),
                            o.getJSON("/meajax/MBookshelf/DeletList", d, function(t) {
                                e.params.bids = a,
                                0 === t.code ? (o.extend(t, {
                                    staticConf: g_data
                                }, i),
                                o("#bookEditOl li.checked").remove(),
                                c.removeClass("enabled"),
                                m.html("编辑"),
                                e.listTotalNum = e.listTotalNum - e.params.bids.length,
                                0 == e.listTotalNum && (-100 == e.params.gid ? o("#bookEditOl").html('<div class="null">默认书架是空的</div>') : o("#bookEditOl").html('<div class="null">你的分组是空的</div>')),
                                h.removeAttr("hidden"),
                                g.attr("hidden", ""),
                                k.removeAttr("hidden"),
                                e.BSUI.popupBookEdit && e.BSUI.popupBookEdit.hide(),
                                e.params.bids = [],
                                console.log("测试"),
                                e.updateGroupSwitch()) : (e.BSUI.popupBookEdit.show(),
                                c.addClass("enabled"),
                                o.tips(t.msg))
                            }),
                            t.siblings("a").trigger("click")
                        }
                    }]
                })
            })
        },
        addNewGrouphandler: function() {
            var t = this
              , a = null;
            o("#newGroupBtn").on("click", function(o) {
                o.preventDefault(),
                t.BSUI.popoupBookGroup && t.BSUI.popoupBookGroup.hide(),
                a ? (a.show(),
                setTimeout(function() {
                    b.find("textarea").focus()
                }, 251)) : (a = new l(b.removeAttr("hidden"),{
                    onShow: function() {
                        b[0].reset()
                    }
                }),
                setTimeout(function() {
                    b.find("textarea").focus()
                }, 251))
            });
            var d = o("#groupCreateCancel").on("click", function() {
                a && a.hide(),
                t.BSUI.popoupBookGroup && t.BSUI.popoupBookGroup.show()
            });
            b.on("submit", function(a) {
                a.preventDefault(),
                o("#filterGroup .select-option.selected");
                var s = b.find("textarea")
                  , n = s.val().trim();
                if ("" === n)
                    o.tips("请输出分组名称"),
                    s.focus();
                else {
                    d.trigger("click");
                    var l = t.params.bids;
                    if (t.params.gname = n,
                    n.length > 20)
                        return o.tips("您输入的分组名太长！"),
                        !1;
                    var r = o.extend({}, t.params);
                    r.bids = l.toString(),
                    o.getJSON("/meajax/MBookshelf/AddGroup", r, function(a) {
                        if (0 === a.code) {
                            o.extend(a, {
                                staticConf: g_data
                            }, i);
                            var d = {
                                groupId: a.data.groupId,
                                groupName: n,
                                bookCnt: l.length
                            }
                              , s = e.render("#tpl-groups-list-single.html", d);
                            o("#bookGroupListContainer").append(s),
                            r.gid = a.data.groupId,
                            r.pageNum = 1,
                            o.getJSON("/meajax/MBookshelf/MoveList", r, function(e) {
                                0 === e.code ? (o.extend(e, {
                                    staticConf: g_data
                                }, i),
                                t.BSUI.popoupBookGroup.hide(),
                                t.BSUI.popupBookEdit.hide(),
                                c.removeClass("enabled"),
                                m.html("编辑"),
                                t.loadData(),
                                h.removeAttr("hidden"),
                                g.attr("hidden", ""),
                                k.removeAttr("hidden"),
                                e.data.list && 0 != e.data.list.length || (-100 == t.params.gid ? o("#bookEditOl").html('<div class="null">默认书架是空的</div>') : o("#bookEditOl").html('<div class="null">你的分组是空的</div>')),
                                t.updateGroupSwitch(),
                                t.params.bids = []) : (t.params.bids = [],
                                o.tips(e.msg),
                                t.BSUI.popupBookEdit.show(),
                                c.addClass("enabled"))
                            })
                        } else
                            o.tips(a.msg),
                            t.BSUI.popupBookEdit.show(),
                            c.addClass("enabled"),
                            c.removeClass("enabled"),
                            m.html("编辑"),
                            t.params.bids = l
                    })
                }
            })
        },
        initListOrder: function() {
            var o = this;
            o.editButtonHandler(),
            o.bookMoveHandler(),
            o.bookDeleteHandler(),
            o.addNewGrouphandler()
        },
        loadData: function() {
            var t = this;
            this.disableInfiniteScroll();
            var a = 1 === t.params.pageNum && o("#bookEditOl").children().length > 0;
            a && o.loading(),
            o.getJSON("/meajax/MBookShelf/List", t.params, function(d) {
                if (a && o.unloading(),
                t.enableInfiniteScroll(),
                0 === d.code) {
                    o.extend(d, {
                        staticConf: g_data
                    }, i),
                    t.listTotalNum = d.data.count;
                    var s = e.render("#tpl-bookshelf-result.html", d);
                    1 === t.params.pageNum ? d.data.list.length > 0 ? o("#bookEditOl").html(s) : -100 == t.params.gid ? o("#bookEditOl").html('<div class="null">默认书架是空的</div>') : o("#bookEditOl").html('<div class="null">你的分组是空的</div>') : o("#bookEditOl").append(s),
                    delete t.params.sortChange,
                    t.toggleInfiniteScroll(d.data.page.isLast),
                    t.updateLazyLoad()
                } else
                    t.params.bids = void 0,
                    o.tips(d.msg)
            })
        }
    })
});
