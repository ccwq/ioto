var Be = Object.defineProperty;
var je = (e, t, r) => t in e ? Be(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var b = (e, t, r) => (je(e, typeof t != "symbol" ? t + "" : t, r), r);
function ve(e, t) {
  this.flags = e, this.cursor = t;
}
ve.prototype = {
  skip: function() {
    this.flags.skip = !0;
  },
  break: function() {
    this.flags.break = !0;
  },
  remove: function() {
    this.flags.remove = !0;
  },
  replace: function(t) {
    this.flags.replace = t;
  },
  get parent() {
    return this.cursor.parent;
  },
  get depth() {
    return this.cursor.depth;
  },
  get level() {
    return this.cursor.depth + 1;
  },
  get index() {
    return this.cursor.index;
  }
};
function K(e, t) {
  return new ve(e, t);
}
function _e(e) {
  this.xs = [e], this.top = 0;
}
_e.prototype = {
  push: function(t) {
    this.top++, this.top < this.xs.length ? this.xs[this.top] = t : this.xs.push(t);
  },
  pushArrayReverse: function(t) {
    for (var r = t.length - 1; r >= 0; r--)
      this.push(t[r]);
  },
  pop: function() {
    var t = this.peek();
    return this.top--, t;
  },
  peek: function() {
    return this.xs[this.top];
  },
  isEmpty: function() {
    return this.top === -1;
  }
};
function L(e) {
  return new _e(e);
}
function De() {
  this.depth = 0, this.stack = L({ node: null, index: -1 });
}
De.prototype = {
  moveDown: function(t) {
    this.depth++, this.stack.push({ node: t, index: 0 });
  },
  moveUp: function() {
    this.depth--, this.stack.pop();
  },
  moveNext: function() {
    this.stack.peek().index++;
  },
  get parent() {
    return this.stack.peek().node;
  },
  get index() {
    return this.stack.peek().index;
  }
};
function Me() {
  return new De();
}
function Ne() {
  this.break = !1, this.skip = !1, this.remove = !1, this.replace = null;
}
Ne.prototype = {
  reset: function() {
    this.break = !1, this.skip = !1, this.remove = !1, this.replace = null;
  }
};
function Z() {
  return new Ne();
}
function J(e) {
  return e && e.length !== 0;
}
function Ue(e, t, r) {
  for (var s = Z(), a = Me(), u = K(s, a), f = L(e), h = Object.assign({}, e); !f.isEmpty(); ) {
    var y = f.pop();
    if (y === h) {
      a.moveUp();
      continue;
    }
    if (s.reset(), t(y, u), s.break)
      break;
    if (!s.remove && (a.moveNext(), !s.skip)) {
      s.replace && (y = s.replace);
      var v = r(y);
      J(v) && (f.push(h), f.pushArrayReverse(v), a.moveDown(y));
    }
  }
}
function Ge(e, t, r) {
  for (var s = Z(), a = Me(), u = K(s, a), f = L(e), h = L(null); !f.isEmpty(); ) {
    var y = f.peek(), v = h.peek(), d = r(y);
    if (s.reset(), y === v || !J(d)) {
      if (y === v && (h.pop(), a.moveUp()), f.pop(), t(y, u), s.break)
        break;
      if (s.remove)
        continue;
      a.moveNext();
    } else
      h.push(y), a.moveDown(y), f.pushArrayReverse(d);
  }
}
var Re = 32768;
function be(e) {
  this.xs = [e], this.top = 0, this.maxLength = 0;
}
be.prototype = {
  enqueue: function(t) {
    this.xs.push(t);
  },
  enqueueMultiple: function(t) {
    for (var r = 0, s = t.length; r < s; r++)
      this.enqueue(t[r]);
  },
  dequeue: function() {
    var t = this.peek();
    return this.top++, this.top === Re && (this.xs = this.xs.slice(this.top), this.top = 0), t;
  },
  peek: function() {
    return this.xs[this.top];
  },
  isEmpty: function() {
    return this.top === this.xs.length;
  }
};
function we(e) {
  return new be(e);
}
function Te() {
  this.depth = 0, this.index = -1, this.queue = we({ node: null, arity: 1 }), this.levelNodes = 1, this.nextLevelNodes = 0;
}
Te.prototype = {
  store: function(t, r) {
    this.queue.enqueue({ node: t, arity: r }), this.nextLevelNodes += r;
  },
  moveNext: function() {
    this.index++;
  },
  moveForward: function() {
    this.queue.peek().arity--, this.levelNodes--, this.queue.peek().arity === 0 && (this.index = 0, this.queue.dequeue()), this.levelNodes === 0 && (this.depth++, this.levelNodes = this.nextLevelNodes, this.nextLevelNodes = 0);
  },
  get parent() {
    return this.queue.peek().node;
  }
};
function ze() {
  return new Te();
}
function qe(e, t, r) {
  for (var s = Z(), a = ze(), u = K(s, a), f = we(e); !f.isEmpty(); ) {
    var h = f.dequeue();
    if (s.reset(), t(h, u), s.break)
      break;
    if (!s.remove && (a.moveNext(), s.replace && (h = s.replace), !s.skip)) {
      var y = r(h);
      J(y) && (f.enqueueMultiple(y), a.store(h, y.length));
    }
    a.moveForward();
  }
}
var Ke = function(t) {
  return t.children;
};
function Ze(e, t, r) {
  if (e != null) {
    r = r || {};
    var s = r.order || "pre", a = r.getChildren || Ke;
    s === "pre" ? Ue(e, t, a) : s === "post" ? Ge(e, t, a) : s === "bfs" && qe(e, t, a);
  }
}
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Je(e) {
  for (var t = -1, r = e == null ? 0 : e.length, s = 0, a = []; ++t < r; ) {
    var u = e[t];
    u && (a[s++] = u);
  }
  return a;
}
var We = Je, Xe = Array.isArray, W = Xe, Ve = typeof H == "object" && H && H.Object === Object && H, Qe = Ve, et = Qe, tt = typeof self == "object" && self && self.Object === Object && self, rt = et || tt || Function("return this")(), X = rt, nt = X, st = nt.Symbol, V = st, te = V, $e = Object.prototype, at = $e.hasOwnProperty, it = $e.toString, I = te ? te.toStringTag : void 0;
function ot(e) {
  var t = at.call(e, I), r = e[I];
  try {
    e[I] = void 0;
    var s = !0;
  } catch {
  }
  var a = it.call(e);
  return s && (t ? e[I] = r : delete e[I]), a;
}
var ut = ot, ct = Object.prototype, ft = ct.toString;
function lt(e) {
  return ft.call(e);
}
var ht = lt, re = V, dt = ut, pt = ht, mt = "[object Null]", yt = "[object Undefined]", ne = re ? re.toStringTag : void 0;
function gt(e) {
  return e == null ? e === void 0 ? yt : mt : ne && ne in Object(e) ? dt(e) : pt(e);
}
var Ae = gt;
function vt(e) {
  return e != null && typeof e == "object";
}
var _t = vt, Dt = Ae, Mt = _t, Nt = "[object Symbol]";
function bt(e) {
  return typeof e == "symbol" || Mt(e) && Dt(e) == Nt;
}
var j = bt, wt = W, Tt = j, $t = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, At = /^\w*$/;
function St(e, t) {
  if (wt(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Tt(e) ? !0 : At.test(e) || !$t.test(e) || t != null && e in Object(t);
}
var Et = St;
function Ct(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var U = Ct, Ft = Ae, It = U, Ot = "[object AsyncFunction]", xt = "[object Function]", kt = "[object GeneratorFunction]", Ht = "[object Proxy]";
function Pt(e) {
  if (!It(e))
    return !1;
  var t = Ft(e);
  return t == xt || t == kt || t == Ot || t == Ht;
}
var Se = Pt, Yt = X, Lt = Yt["__core-js_shared__"], Bt = Lt, q = Bt, se = function() {
  var e = /[^.]+$/.exec(q && q.keys && q.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function jt(e) {
  return !!se && se in e;
}
var Ut = jt, Gt = Function.prototype, Rt = Gt.toString;
function zt(e) {
  if (e != null) {
    try {
      return Rt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var qt = zt, Kt = Se, Zt = Ut, Jt = U, Wt = qt, Xt = /[\\^$.*+?()[\]{}|]/g, Vt = /^\[object .+?Constructor\]$/, Qt = Function.prototype, er = Object.prototype, tr = Qt.toString, rr = er.hasOwnProperty, nr = RegExp(
  "^" + tr.call(rr).replace(Xt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function sr(e) {
  if (!Jt(e) || Zt(e))
    return !1;
  var t = Kt(e) ? nr : Vt;
  return t.test(Wt(e));
}
var ar = sr;
function ir(e, t) {
  return e == null ? void 0 : e[t];
}
var or = ir, ur = ar, cr = or;
function fr(e, t) {
  var r = cr(e, t);
  return ur(r) ? r : void 0;
}
var Ee = fr, lr = Ee, hr = lr(Object, "create"), G = hr, ae = G;
function dr() {
  this.__data__ = ae ? ae(null) : {}, this.size = 0;
}
var pr = dr;
function mr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var yr = mr, gr = G, vr = "__lodash_hash_undefined__", _r = Object.prototype, Dr = _r.hasOwnProperty;
function Mr(e) {
  var t = this.__data__;
  if (gr) {
    var r = t[e];
    return r === vr ? void 0 : r;
  }
  return Dr.call(t, e) ? t[e] : void 0;
}
var Nr = Mr, br = G, wr = Object.prototype, Tr = wr.hasOwnProperty;
function $r(e) {
  var t = this.__data__;
  return br ? t[e] !== void 0 : Tr.call(t, e);
}
var Ar = $r, Sr = G, Er = "__lodash_hash_undefined__";
function Cr(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Sr && t === void 0 ? Er : t, this;
}
var Fr = Cr, Ir = pr, Or = yr, xr = Nr, kr = Ar, Hr = Fr;
function E(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var s = e[t];
    this.set(s[0], s[1]);
  }
}
E.prototype.clear = Ir;
E.prototype.delete = Or;
E.prototype.get = xr;
E.prototype.has = kr;
E.prototype.set = Hr;
var Pr = E;
function Yr() {
  this.__data__ = [], this.size = 0;
}
var Lr = Yr;
function Br(e, t) {
  return e === t || e !== e && t !== t;
}
var Ce = Br, jr = Ce;
function Ur(e, t) {
  for (var r = e.length; r--; )
    if (jr(e[r][0], t))
      return r;
  return -1;
}
var R = Ur, Gr = R, Rr = Array.prototype, zr = Rr.splice;
function qr(e) {
  var t = this.__data__, r = Gr(t, e);
  if (r < 0)
    return !1;
  var s = t.length - 1;
  return r == s ? t.pop() : zr.call(t, r, 1), --this.size, !0;
}
var Kr = qr, Zr = R;
function Jr(e) {
  var t = this.__data__, r = Zr(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var Wr = Jr, Xr = R;
function Vr(e) {
  return Xr(this.__data__, e) > -1;
}
var Qr = Vr, en = R;
function tn(e, t) {
  var r = this.__data__, s = en(r, e);
  return s < 0 ? (++this.size, r.push([e, t])) : r[s][1] = t, this;
}
var rn = tn, nn = Lr, sn = Kr, an = Wr, on = Qr, un = rn;
function C(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var s = e[t];
    this.set(s[0], s[1]);
  }
}
C.prototype.clear = nn;
C.prototype.delete = sn;
C.prototype.get = an;
C.prototype.has = on;
C.prototype.set = un;
var cn = C, fn = Ee, ln = X, hn = fn(ln, "Map"), dn = hn, ie = Pr, pn = cn, mn = dn;
function yn() {
  this.size = 0, this.__data__ = {
    hash: new ie(),
    map: new (mn || pn)(),
    string: new ie()
  };
}
var gn = yn;
function vn(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var _n = vn, Dn = _n;
function Mn(e, t) {
  var r = e.__data__;
  return Dn(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var z = Mn, Nn = z;
function bn(e) {
  var t = Nn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var wn = bn, Tn = z;
function $n(e) {
  return Tn(this, e).get(e);
}
var An = $n, Sn = z;
function En(e) {
  return Sn(this, e).has(e);
}
var Cn = En, Fn = z;
function In(e, t) {
  var r = Fn(this, e), s = r.size;
  return r.set(e, t), this.size += r.size == s ? 0 : 1, this;
}
var On = In, xn = gn, kn = wn, Hn = An, Pn = Cn, Yn = On;
function F(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var s = e[t];
    this.set(s[0], s[1]);
  }
}
F.prototype.clear = xn;
F.prototype.delete = kn;
F.prototype.get = Hn;
F.prototype.has = Pn;
F.prototype.set = Yn;
var Ln = F, Fe = Ln, Bn = "Expected a function";
function Q(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Bn);
  var r = function() {
    var s = arguments, a = t ? t.apply(this, s) : s[0], u = r.cache;
    if (u.has(a))
      return u.get(a);
    var f = e.apply(this, s);
    return r.cache = u.set(a, f) || u, f;
  };
  return r.cache = new (Q.Cache || Fe)(), r;
}
Q.Cache = Fe;
var jn = Q, Un = jn, Gn = 500;
function Rn(e) {
  var t = Un(e, function(s) {
    return r.size === Gn && r.clear(), s;
  }), r = t.cache;
  return t;
}
var zn = Rn, qn = zn, Kn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Zn = /\\(\\)?/g, Jn = qn(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Kn, function(r, s, a, u) {
    t.push(a ? u.replace(Zn, "$1") : s || r);
  }), t;
}), Wn = Jn;
function Xn(e, t) {
  for (var r = -1, s = e == null ? 0 : e.length, a = Array(s); ++r < s; )
    a[r] = t(e[r], r, e);
  return a;
}
var Vn = Xn, oe = V, Qn = Vn, es = W, ts = j, rs = 1 / 0, ue = oe ? oe.prototype : void 0, ce = ue ? ue.toString : void 0;
function Ie(e) {
  if (typeof e == "string")
    return e;
  if (es(e))
    return Qn(e, Ie) + "";
  if (ts(e))
    return ce ? ce.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -rs ? "-0" : t;
}
var ns = Ie, ss = ns;
function as(e) {
  return e == null ? "" : ss(e);
}
var is = as, os = W, us = Et, cs = Wn, fs = is;
function ls(e, t) {
  return os(e) ? e : us(e, t) ? [e] : cs(fs(e));
}
var hs = ls, ds = j, ps = 1 / 0;
function ms(e) {
  if (typeof e == "string" || ds(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -ps ? "-0" : t;
}
var ys = ms, gs = hs, vs = ys;
function _s(e, t) {
  t = gs(t, e);
  for (var r = 0, s = t.length; e != null && r < s; )
    e = e[vs(t[r++])];
  return r && r == s ? e : void 0;
}
var Ds = _s, Ms = Ds;
function Ns(e, t, r) {
  var s = e == null ? void 0 : Ms(e, t);
  return s === void 0 ? r : s;
}
var bs = Ns;
function ws(e) {
  return e == null;
}
var Ts = ws;
const Pa = function(e, t = {}) {
  let r = {}, s = [], a = [], u = {};
  const f = function() {
    r = {}, s = [], a = [], u = {};
  };
  f();
  let {
    childrenKey: h = "children",
    checkedKey: y = "checked",
    idKey: v = "id"
  } = t, d = 0, _ = 0;
  const n = function(l = {}) {
    h = l.childrenKey || h, y = l.checkedKey || y, v = l.idKey || v;
  }, i = function(l, p) {
    l.forEach(function(m) {
      const N = m[v];
      r[N] = m, m = { ...m }, a.push(m), m.parent = p, m.index = d++;
      const S = p ? p.deepth + 1 : 0;
      m.deepth = S, _ = Math.max(_, S), m.path = p ? p.path + "." + m[v] : "0", m.parentIdList = p ? [...p.parentIdList, p[v]] : [], u[N] = m, m[h] && m[h].length > 0 && i(m[h], m);
    });
  }, o = function(l) {
    return l[h] && l[h].length > 0 ? !l[h].map((m) => D(m[v])).find((m) => !m[y]) : !1;
  }, c = function(l) {
    f(), Array.isArray(l) && i(l);
  };
  c(e);
  const g = function(l) {
    var p;
    return (p = D(l)) == null ? void 0 : p.parentIdList.map((m) => D(m));
  }, M = function(l) {
    const p = D(l);
    return a.filter(function(m) {
      return m.parent === (p == null ? void 0 : p.parent);
    });
  }, w = function(l) {
    let p;
    if (!l)
      return console.warn("id\u4E0D\u80FD\u4E3A\u7A7A"), null;
    if (l instanceof Object)
      p = l[v];
    else if (typeof l == "string" || typeof l == "number")
      p = l;
    else
      return console.warn("id\u7C7B\u578B\u975E\u6CD5:", l), null;
    return p;
  }, D = function(l) {
    const p = w(l);
    return p ? u[p] : null;
  }, T = function(l) {
    const p = w(l);
    return p ? r[p] : null;
  }, He = function(l) {
    const p = D(l);
    return p == null ? void 0 : p.deepth;
  }, Pe = function(l, p) {
    const m = D(l);
    m && Object.assign(m, p);
  }, Ye = function(l, p, m = !1) {
    const N = D(l);
    N && (N[y] = p, m && (N.parentIdList.forEach((S) => {
      const ee = u[S];
      ee[y] = o(ee);
    }), k(N, function(S) {
      S[y] = p;
    })));
  }, Le = function(l) {
    const p = {};
    l && l.forEach((m) => {
      p[m] = !0;
    }), a.forEach((m) => {
      m[y] = p[m[v]] || !1;
    });
  }, k = function(l, p) {
    const m = D(l);
    if (m)
      p(m), m[h] && m[h].length > 0 && m[h].forEach(function(N) {
        k(N, p);
      });
    else
      throw new Error("\u8282\u70B9\u4E0D\u5B58\u5728:" + l);
  };
  return {
    travelNode: k,
    getNodeList: (l = !0) => l ? [...a] : [...s],
    getNodeDescendantList: (l) => {
      const p = [];
      return k(l, function(m) {
        p.push(m);
      }), p;
    },
    getNodeListByFilter: (l) => a.filter(l),
    getMinDeepth: function() {
      let l = _;
      for (const p in a) {
        const m = a[p];
        if (m.checked && (l = Math.min(l, m.deepth)), l === 0)
          return 0;
      }
      return l;
    },
    getSublings: M,
    getParents: g,
    getDeepth: He,
    getNode: D,
    updateIndexes: c,
    setChecked: Ye,
    setProps: Pe,
    travelAllNode: function(l) {
      for (const p in a) {
        const m = a[p], N = T(m[v]);
        if (l(m, N) === !1)
          break;
      }
    },
    setOptions: n,
    resetCheckStatus: Le,
    getOriginNode: T
  };
}, fe = function(e, t, r = "children", s = "id", a = [], u = { flag: !1 }) {
  if (e instanceof Array) {
    fe({ [r]: e }, t, r, s, a);
    return;
  }
  const f = (e == null ? void 0 : e[r]) || [];
  for (let h = 0; h < f.length; h++) {
    const y = f[h];
    if (!t(y, a, r, s)) {
      u.flag = !0;
      break;
    }
    if (y[r] instanceof Array && fe(y[r], t, r, s, [y, ...a], u), u.flag)
      break;
  }
}, Y = function(e, t, r = null, s = !1) {
  if (typeof t == "string" && (t = t.split(",")), !!Array.isArray(t)) {
    for (let a = 0; a < t.length; a++) {
      const u = t[a], f = bs(e, u);
      if (s ? Ts(f) : !!f)
        return f;
    }
    return r;
  }
}, Oe = (e) => Object.prototype.toString.call(e) == "[object Object]", $s = function(e, t, r, s = "_", a = 0) {
  e[t] ? a < 5 && $s(e, s + t, r, s, a + 1) : e[t] = r;
}, Ya = function(e, t, r) {
  let s = !1;
  return Array.isArray(e) && (e = { [t]: e }, s = !0), Ze(
    e,
    r,
    {
      getChildren(a) {
        return a[t];
      }
    }
  ), s ? e[t] : e;
}, La = function(e, t = "value", r = "name", s = ",", a = /\s+/, u = ["0, \u8BF7\u63D0\u4F9Boptions"], f = null) {
  let h, y;
  typeof e == "function" && (y = e()), typeof e == "string" ? h = e.split(a).map((d) => d.trim()) : Array.isArray(e) ? h = e : Array.isArray(u) ? h = u : typeof u == "function" ? y = u() : h = [{
    name: "\u8BF7\u901A\u8FC7optionLs\u4F20\u5165\u6570\u7EC4\u6216\u8005\u5F02\u6B65\u51FD\u6570",
    value: -1
  }];
  const v = function(d) {
    typeof f == "function" && (d = d.map((n) => {
      let [i, o] = f(n, {
        valueField: t,
        nameField: r
      }, Y);
      return { value: i, name: o };
    }));
    let _ = We(d);
    return _.length != d.length && console.warn("options\u4E2D\u5B58\u5728\u7A7A\u9009\u9879", d), d = _, d = d.map((n) => {
      if ((typeof n == "string" || typeof n == "number") && (n = (n + "").split(s).map((i) => i.trim())), Array.isArray(n)) {
        let [i, o] = n;
        return o === void 0 && (o = i), { value: i, name: o };
      } else
        return n ? {
          name: Y(n, r),
          value: Y(n, t)
        } : {
          name: "\u65E0\u6548options",
          value: "-"
        };
    }), d.forEach((n) => {
      typeof n.value != "number" && typeof n.value != "string" && (n.value = n.value + "");
    }), d;
  };
  return h ? v(h) : y.then((d) => v(d));
}, Ba = function(e, t = null) {
  if (Oe(e))
    return e;
  if (typeof e != "string")
    return console.warn("safeJsonParser error", e), t;
  try {
    return JSON.parse(e);
  } catch {
    return console.log("json\u89E3\u6790\u5931\u8D25:", e), t;
  }
}, ja = function(e, t, r = 0, s = void 0) {
  if (t.includes(e))
    return e;
  {
    let a = t[r];
    return a === void 0 && (a = s), a;
  }
};
function Ua(e) {
  return new Promise(function(t, r) {
    var s = typeof e == "string" ? e : URL.createObjectURL(e);
    if (!s)
      throw new Error("Must use a valid image");
    var a = document.createElement("img");
    a.onload = () => {
      typeof e != "string" && URL.revokeObjectURL(s), t({ width: a.width, height: a.height });
    }, a.onerror = (u) => {
      typeof e != "string" && URL.revokeObjectURL(s), r(u);
    }, a.src = s;
  });
}
function As() {
  const e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  if (e.indexOf("Trident/") > 0) {
    const a = e.indexOf("rv:");
    return parseInt(e.substring(a + 3, e.indexOf(".", a)), 10);
  }
  const s = e.indexOf("Edge/");
  return s > 0 ? parseInt(e.substring(s + 5, e.indexOf(".", s)), 10) : -1;
}
As();
function Ss(...e) {
  let t;
  Array.isArray(arguments[0]) ? t = arguments[0] : t = Array.prototype.slice.call(arguments);
  let r = [];
  return t.reduce(
    function(s, a, u, f) {
      return s.then(function() {
        if (typeof a == "function")
          try {
            a = a();
          } catch (h) {
            return f.splice(1), Promise.reject(h);
          }
        else
          console.warn("map element:" + u + " not function");
        return a.then((h) => {
          r[u] = h;
        });
      });
    },
    Promise.resolve(r)
  ).then(function() {
    return r;
  });
}
class Ga extends Promise {
  constructor(r = void 0) {
    let s, a;
    super((u, f) => {
      s = u, a = f, r && r(u, f);
    });
    b(this, "__resolve");
    b(this, "__reject");
    this.__resolve = s, this.__reject = a;
  }
  static map(r) {
    return Ss(r);
  }
  static all(r) {
    return Promise.all(r);
  }
  resolve(r) {
    this.__resolve(r);
  }
  _resolve(r) {
    this.__resolve(r);
  }
  reject(r) {
    this.__reject(r);
  }
  _reject(r) {
    this.__reject(r);
  }
}
const B = class {
  static get fastGbk() {
    if (!this._fastGbk)
      throw new Error("\u8BF7\u5148\u8C03\u7528setFaskGbk\u65B9\u6CD5\u8BBE\u7F6EfastGbk::$GBK.setFaskGbk(require('fast-gbk'))");
    return this._fastGbk;
  }
  static setFaskGbk(t) {
    this._fastGbk = t;
  }
  static encode(t) {
    return B.fastGbk.encode(t);
  }
  static decode(t) {
    if (!t || !t.length)
      return "";
    typeof t == "string" && (/^\%/.test(t) ? t = t.split("%").splice(1) : t = t.split(","));
    let r = "";
    if (Array.isArray(t))
      if (typeof t[0] == "number")
        r = this.fastGbk.decode(t);
      else {
        const s = t.map((a) => {
          typeof a == "number" && (console.warn("decodeGBK\u4F20\u5165\u7684\u6570\u7EC4\u4E2D\u6709number\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u8FD9\u662F\u4E0D\u5141\u8BB8\u7684\uFF0C\u4F1A\u5BFC\u81F4\u89E3\u7801\u9519\u8BEF"), a = a + "");
          let u = parseInt(a, 16);
          return isNaN(u) ? 0 : u;
        });
        r = B.decode(s);
      }
    return r;
  }
};
let A = B;
b(A, "_fastGbk");
const le = /* @__PURE__ */ new Map();
function Ra(e) {
  if (e === 0)
    return "0";
  if (e === !1)
    return "False";
  if (!e)
    return "";
  if (typeof e != "string")
    throw new Error("\u65E0\u6548\u8F93\u5165");
  let [t, ...r] = e;
  return t.toUpperCase() + r.join("");
}
function za(e, t) {
  if (!e || !t)
    return "";
  var r = 0, s = 0, a = "";
  for (s = 0; s < e.length; s++) {
    if (e.charCodeAt(s) > 255 ? r += 2 : r++, r > t)
      return a;
    a += e.charAt(s);
  }
  return e;
}
const Es = () => {
  let e = Math.random().toString(32).substr(2);
  return le.get(e) ? Es() : (le.set(e, !0), e);
};
function Cs(e) {
  return A.decode(e);
}
function qa(e) {
  return A.decode(e);
}
function Ka(e, t = "utf-8", r = 16) {
  return t.toLowerCase() == "gbk" && r == 16 ? Cs(e) : new TextDecoder(t).decode(
    new Uint8Array(
      e.map((s) => Number.isFinite(s) ? s : parseInt(s, r))
    )
  );
}
function Za(e, t = "string") {
  return t == "string" ? A.encode(e) : A.encode(e).split("%").splice(1);
}
function Ja(e) {
  for (var t = 0, r = 0; r < e.length; r++) {
    var s = e.charCodeAt(r);
    s >= 1 && s <= 126 || 65376 <= s && s <= 65439 ? t++ : t += 2;
  }
  return t;
}
const Wa = (e, t = "") => Oe(e) ? JSON.stringify(e) : typeof e == "string" ? e : (console.warn("safeStringify error(\u6682\u4E0D\u652F\u6301\u7684\u6570\u636E\u7C7B\u578B)", e), t), Fs = /\:\:([-\d\.]+)$/, $ = class {
  constructor(t, r, s = !1, a = null) {
    b(this, "_name");
    b(this, "_code");
    b(this, "_silent");
    const u = this;
    u._name = t, u._code = r, u._silent = s;
  }
  static addNameFieldList(t) {
    this.nameFieldList.push(t);
  }
  get name() {
    return this._name;
  }
  get message() {
    return this._name;
  }
  get msg() {
    return this._name;
  }
  get code() {
    return this._code;
  }
  get cod() {
    return this._code;
  }
  get errorCode() {
    return this._code;
  }
  get silent() {
    return this._silent;
  }
  get silence() {
    return this._silent;
  }
  toString2() {
    const t = this;
    return `AError:${t.code}-${t.name}`;
  }
  static fromErrorText(t, r = !1) {
    const s = `${t}-${r ? "0" : "1"}`;
    let a = he[s];
    if (!a) {
      let u, f;
      Fs.test(t) ? (u = RegExp.$1, f = t.replace(`::${u}`, "")) : (u = 0, f = t), a = new $(f, u, r), he[s] = a;
    }
    return a;
  }
  static create(t, r = !1) {
    return this.fromObject(t, r);
  }
  static getErrorCode(t) {
    return t ? t.constructor == $ ? t._code : this.fromObject(t)._code : 0;
  }
};
let P = $;
b(P, "nameFieldList", ["error", "message", "msg", "errMsg", "reason", "errorText"]), b(P, "fromObject", (t, r = !1) => {
  const s = $;
  if (!t)
    return new $("\u672A\u77E5\u9519\u8BEF", -9999);
  let a;
  if (t instanceof Error)
    return s.fromErrorText(t.message, r);
  if (typeof t == "string")
    if (/^(\[|\{)/.test(t))
      try {
        t = JSON.parse(t);
      } catch {
        a = t;
      }
    else
      a = t;
  else
    a = Y(t, $.nameFieldList), r || (r = t.silence || t.silent);
  return !a && t.data ? s.fromObject(t.data) : s.fromErrorText(a, r);
});
const he = {};
function Is(e, t, r) {
  var s = -1, a = e.length;
  t < 0 && (t = -t > a ? 0 : a + t), r = r > a ? a : r, r < 0 && (r += a), a = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var u = Array(a); ++s < a; )
    u[s] = e[s + t];
  return u;
}
var Os = Is, xs = 9007199254740991;
function ks(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= xs;
}
var Hs = ks, Ps = Se, Ys = Hs;
function Ls(e) {
  return e != null && Ys(e.length) && !Ps(e);
}
var Bs = Ls, js = 9007199254740991, Us = /^(?:0|[1-9]\d*)$/;
function Gs(e, t) {
  var r = typeof e;
  return t = t == null ? js : t, !!t && (r == "number" || r != "symbol" && Us.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Rs = Gs, zs = Ce, qs = Bs, Ks = Rs, Zs = U;
function Js(e, t, r) {
  if (!Zs(r))
    return !1;
  var s = typeof t;
  return (s == "number" ? qs(r) && Ks(t, r.length) : s == "string" && t in r) ? zs(r[t], e) : !1;
}
var Ws = Js, Xs = /\s/;
function Vs(e) {
  for (var t = e.length; t-- && Xs.test(e.charAt(t)); )
    ;
  return t;
}
var Qs = Vs, ea = Qs, ta = /^\s+/;
function ra(e) {
  return e && e.slice(0, ea(e) + 1).replace(ta, "");
}
var na = ra, sa = na, de = U, aa = j, pe = 0 / 0, ia = /^[-+]0x[0-9a-f]+$/i, oa = /^0b[01]+$/i, ua = /^0o[0-7]+$/i, ca = parseInt;
function fa(e) {
  if (typeof e == "number")
    return e;
  if (aa(e))
    return pe;
  if (de(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = de(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = sa(e);
  var r = oa.test(e);
  return r || ua.test(e) ? ca(e.slice(2), r ? 2 : 8) : ia.test(e) ? pe : +e;
}
var la = fa, ha = la, me = 1 / 0, da = 17976931348623157e292;
function pa(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = ha(e), e === me || e === -me) {
    var t = e < 0 ? -1 : 1;
    return t * da;
  }
  return e === e ? e : 0;
}
var ma = pa, ya = ma;
function ga(e) {
  var t = ya(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var va = ga, _a = Os, Da = Ws, Ma = va, Na = Math.ceil, ba = Math.max;
function wa(e, t, r) {
  (r ? Da(e, t, r) : t === void 0) ? t = 1 : t = ba(Ma(t), 0);
  var s = e == null ? 0 : e.length;
  if (!s || t < 1)
    return [];
  for (var a = 0, u = 0, f = Array(Na(s / t)); a < s; )
    f[u++] = _a(e, a, a += t);
  return f;
}
var xe = wa;
class ye {
  static strip(t, r = 12) {
    return +parseFloat(t.toPrecision(r));
  }
  static hexString2DecLs(t) {
    return xe(t, 2).map((r) => parseInt(r.join(""), 16));
  }
  static preppendZero(t, r = 2) {
    return ke(r, t);
  }
  static getDec(t) {
    return t - Math.trunc(t);
  }
  static toDEC(t, r = 16) {
    return Array.isArray(t) ? t.map((s) => parseInt(s, r)) : parseInt(t, r);
  }
  static toHEX(t, r = 2, s = 10) {
    if (Array.isArray(t))
      return t.map((a) => Array.isArray(a) ? a[0] : this.toHEX(a, length, s));
    if (/[a-zA-Z]/.test(t + ""))
      throw new Error("\u65E0\u6CD5\u8F6C\u6362\u4E3AHEX:" + t);
    return t = parseInt(t + "", s), t >= Math.pow(2, 8) && (r = 4), Ta(t, r)[0];
  }
}
function Ta(e, t = 2) {
  let r = parseInt(e + "").toString(16).toUpperCase(), s = xe(r, t).map((u) => u.join(""));
  const a = ke(t, s[0]);
  return s.splice(0, 1, a), s;
}
function ke(e, t) {
  let r = e - (t + "").length;
  return r <= 0 ? t + "" : Array(r).fill("0").join("") + (t + "");
}
function $a(e, t = 12) {
  return typeof e != "number" && (e = 0), +parseFloat(e.toPrecision(t));
}
function Xa(e, t = 2) {
  typeof e != "number" && (e = 0);
  const r = $a(e).toFixed(t);
  return parseFloat(r);
}
const Va = function(e, t = Number.MAX_SAFE_INTEGER, r = 0) {
  const s = typeof e == "string";
  let a = s ? ye.toDEC(e) : e;
  return typeof r == "number" && (a = Math.max(r, a)), typeof t == "number" && (a = Math.min(t, a)), s ? ye.toHEX(a) : a;
}, Qa = (e, t = 0) => {
  if (typeof e == "number")
    return e;
  const a = ((e + "").includes(".") ? parseFloat : parseInt)(e);
  return isNaN(a) ? t : a;
};
/**
 * JavaScript Date instance methods
 *
 * @copyright 2012 Ken Snyder (kendsnyder at gmail dot com)
 * @version 3.5.0, June 2012 (http://sandbox.kendsnyder.com/date)
 * @license MIT http://www.opensource.org/licenses/MIT
 */
(function() {
  function e(n, i) {
    switch (i - String(n).length) {
      case 2:
        return "00" + n;
      case 1:
        return "0" + n;
    }
    return n;
  }
  function t(n, i) {
    for (var o in i)
      Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
  }
  var r = [], s = {
    millisecond: 1,
    second: 1e3,
    minute: 60 * 1e3,
    hour: 60 * 60 * 1e3,
    day: 24 * 60 * 60 * 1e3,
    week: 7 * 24 * 60 * 60 * 1e3,
    month: {
      add: function(n, i) {
        var o = n.getDate();
        s.year.add(n, Math[i > 0 ? "floor" : "ceil"](i / 12));
        var c = n.getMonth() + i % 12;
        c == 12 ? (c = 0, n.setYear(n.getFullYear() + 1)) : c == -1 && (c = 11, n.setYear(n.getFullYear() - 1)), n.setMonth(c), n.getDate() != o && (n.add(-1, "month"), n.setDate(n.daysInMonth()));
      },
      diff: function(n, i) {
        var o = n.getFullYear() - i.getFullYear(), c = n.getMonth() - i.getMonth() + o * 12, g = n.getDate() - i.getDate();
        return c + g / 30;
      }
    },
    year: {
      add: function(n, i) {
        n.setYear(n.getFullYear() + Math[i > 0 ? "floor" : "ceil"](i));
      },
      diff: function(n, i) {
        return s.month.diff(n, i) / 12;
      }
    }
  }, a = s;
  a.milliseconds = a.millisecond, a.seconds = a.second, a.minutes = a.minute, a.hours = a.hour, a.weeks = a.week, a.days = a.day, a.months = a.month, a.years = a.year;
  var u = {
    succ: function(n) {
      return this.clone().add(1, n || "day");
    },
    add: function(n, i) {
      var o = s[i] || s.day;
      return typeof o == "number" ? this.setTime(this.getTime() + o * n) : o.add(this, n), this;
    },
    diff: function(n, i, o) {
      var c;
      if (n = Date.create(n), n === null)
        return NaN;
      var g = s[i] || s.day;
      return typeof g == "number" ? c = (this.getTime() - n.getTime()) / g : c = g.diff(this, n), o ? c : Math[c > 0 ? "floor" : "ceil"](c);
    },
    _applyFormat: function(n, i) {
      for (var o = n || i.defaultFormat, c = "", g; o.length > 0; )
        (g = o.match(i.matcher)) ? (c += o.slice(0, g.index), c += (g[1] || "") + this._applyFormatChar(g[2], i), o = o.slice(g.index + g[0].length)) : (c += o, o = "");
      return c;
    },
    _applyFormatChar: function(n, i) {
      if (i.shortcuts && i.shortcuts[n])
        return this._applyFormat(i.shortcuts[n], i);
      if (i.codes && i.codes[n]) {
        var o = i.codes[n].split("."), c = this["get" + o[0]] ? this["get" + o[0]]() : "";
        return o[1] && (c = e(c, o[1])), c;
      }
      return n;
    },
    format: function(n) {
      return n = n || Date.formatting.strftime.defaultFormat, n.indexOf("%") > -1 ? this.strftime(n) : this.formatPhp(n);
    },
    getShortYear: function() {
      return this.getYear() % 100;
    },
    getMonthNumber: function() {
      return this.getMonth() + 1;
    },
    getMonthName: function() {
      return Date.MONTHNAMES[this.getMonth()];
    },
    getAbbrMonthName: function() {
      return Date.ABBR_MONTHNAMES[this.getMonth()];
    },
    getDayName: function() {
      return Date.DAYNAMES[this.getDay()];
    },
    getAbbrDayName: function() {
      return Date.ABBR_DAYNAMES[this.getDay()];
    },
    getDayOrdinal: function() {
      return Date.ORDINALNAMES[this.getDate() % 10];
    },
    getHours12: function() {
      var n = this.getHours();
      return n > 12 ? n - 12 : n == 0 ? 12 : n;
    },
    getAmPm: function() {
      return this.getHours() >= 12 ? "PM" : "AM";
    },
    getAmPmLower: function() {
      return this.getHours() >= 12 ? "pm" : "am";
    },
    getUnix: function() {
      return Math.round(this.getTime() / 1e3, 0);
    },
    getUTCOffset: function() {
      var n = this.getTimezoneOffset() / 60, i = n < 0 ? "+" : "-";
      return n = Math.abs(n), i + e(Math.floor(n), 2) + ":" + e(n % 1 * 60, 2);
    },
    setUTCOffset: function(n) {
      var i = this.getTimezoneOffset() * -1, o = this.getTime() + i * 6e4;
      return this.setTime(o - n * 6e4), this;
    },
    setUTCOffsetString: function(n) {
      var i = n.match(/([+-]?)([01]\d|2[0-3])\:?([0-5]\d)/);
      if (i) {
        var o = parseFloat(i[2]) * 60;
        o += parseFloat(i[3]), i[1] == "-" && (o *= -1), this.setUTCOffset(o);
      }
      return this;
    },
    getUTCOffsetNumber: function() {
      return this.getUTCOffset().replace(":", "");
    },
    getTimezoneName: function() {
      var n = /(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());
      return n[1] || n[2] || "GMT" + this.getUTCOffset();
    },
    toYmdInt: function() {
      return this.getFullYear() * 1e4 + this.getMonthNumber() * 100 + this.getDate();
    },
    clone: function() {
      return new Date(this.getTime());
    },
    diffText: function(n) {
      var i = this.diff(n || Date.current(), "seconds"), o = Math.abs(i), c;
      if (o < 120)
        return i >= 0 ? "in a moment" : "moments ago";
      if (o < 3600)
        c = floor(o / 60) + " minutes";
      else if (o < 86400) {
        var g = floor(o / 3600), M = hour == 1 ? "" : "s";
        c = g + " hour" + M + " ago";
      } else {
        if (o < 172800)
          return i > 0 ? "tomorrow" : "yesterday";
        if (o < 604800)
          c = floor(o / 86400) + " days";
        else {
          if (o < 1209600)
            return i > 0 ? "next week" : "last week";
          if (o < 2419200)
            c = floor(o / 604800) + " weeks";
          else {
            if (o < 5184e3)
              return i > 0 ? "next month" : "last month";
            if (o < 31536e3)
              c = floor(o / 2592e3) + " months";
            else {
              if (o < 63072e3)
                return i > 0 ? "next year" : "last year";
              c = floor(o / 31536e3) + " years";
            }
          }
        }
      }
      return i > 0 ? "in " + c : c + " ago";
    },
    daysInMonth: function() {
      return Date.daysInMonth(this.getFullYear(), this.getMonth() + 1);
    },
    isLeapYear: function() {
      return Date.daysInMonth(this.getFullYear(), 1) == 29 ? 1 : 0;
    },
    isBefore: function(n, i) {
      return Math.round(this.diff(n, i || "milliseconds", !0), 0) < 0;
    },
    isAfter: function(n, i) {
      return Math.round(this.diff(n, i || "milliseconds", !0), 0) > 0;
    },
    equals: function(n, i) {
      return Math.round(this.diff(n, i || "milliseconds", !0), 0) == 0;
    },
    schedule: function(n) {
      var i = this.getTime() - Date.current().getTime(), o = this.clone();
      if (i <= 0)
        return o.unschedule(n), n(), this;
      var c = this.getTime(), g = setTimeout(function() {
        o.unschedule(n), n();
      }, i);
      return r.push({ callback: n, timestamp: c, timeoutId: g }), this;
    },
    unschedule: function(n) {
      for (var i = r.length, o = this.getTime(); i--; )
        r[i].callback == n && r[i].timestamp == o && (clearTimeout(r[i].timeoutId), r.splice(i, 1));
      return this;
    },
    getSchedule: function() {
      for (var n = [], i = this.getTime(), o = 0, c = r.length; o < c; o++)
        r[o].timestamp == i && n.push(r[o]);
      return n;
    }
  };
  t(Date.prototype, u), Date.prototype.toISOString || (Date.prototype.toISOString = function() {
    return this.setUTCOffset(0).strftime(Date.ISO);
  });
  var f = {
    create: function(n) {
      if (typeof n > "u")
        return Date.current();
      if (n instanceof Date)
        return n;
      var i = arguments;
      switch (i.length) {
        case 1:
          if (Object.prototype.toString.call(n) == "[object Number]")
            return new Date(n);
          if (n = String(n).replace(/^\s*(.*)\s*$/, "$1"), n = n.replace(/\s{2,}/g, " "), n === "")
            return Date.current();
          for (var o = 0, c, g, M, w, D, T; c = Date.create.patterns[o++]; )
            if (typeof c[0] == "string" ? (D = c[1], T = c[2]) : (D = c[0], T = c[1]), !!(w = n.match(D))) {
              if (typeof T == "function") {
                if (M = T(w, n), M instanceof Date)
                  return M;
              } else if (g = Date.parse(n.replace(D, T)), !isNaN(g))
                return new Date(g);
            }
          return NaN;
        case 2:
          return new Date(i[0], i[1], 1);
        case 3:
          return new Date(i[0], i[1], i[2]);
        case 4:
          return new Date(i[0], i[1], i[2], i[3]);
        case 5:
          return new Date(i[0], i[1], i[2], i[3], i[4]);
        case 6:
          return new Date(i[0], i[1], i[2], i[3], i[4], i[5]);
        default:
          return new Date(i[0], i[1], i[2], i[3], i[4], i[5], i[6]);
      }
    },
    MONTHNAMES: "January February March April May June July August September October November December".split(" "),
    MONTHNAMES_LOOKUP: {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12
    },
    ABBR_MONTHNAMES: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
    DAYNAMES: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    DAYNAMES_LOOKUP: { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 },
    ABBR_DAYNAMES: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
    ORDINALNAMES: "th st nd rd th th th th th th".split(" "),
    ISO: "%Y-%m-%dT%H:%M:%S.%N%G",
    SQL: "%Y-%m-%d %H:%M:%S",
    SCRIPT_LOAD: new Date(),
    daysInMonth: function(n, i) {
      return i == 2 ? new Date(n, 1, 29).getDate() == 29 ? 29 : 28 : [void 0, 31, void 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i];
    },
    getMonthByName: function(n) {
      return Date.MONTHNAMES_LOOKUP[String(n).slice(0, 3).toLowerCase()];
    },
    getWeekdayByName: function(n) {
      return Date.DAYNAMES_LOOKUP[String(n).slice(0, 3).toLowerCase()];
    },
    autoFormat: function(n, i) {
      n = typeof n == "string" ? document.getElementById(n) : n;
      var o = function() {
        var c = Date.create(n.value);
        c && (n.value = c.format(i));
      };
      return typeof n.attachEvent == "function" ? n.attachEvent("onblur", o) : typeof n.addEventListener == "function" ? n.addEventListener("blur", o, !1) : n.onblur = o, n;
    },
    addFormat: function(n, i) {
      return Date.prototype[n] = function(o) {
        return this._applyFormat(o, i);
      }, this;
    },
    addPattern: function(n, i) {
      if (i) {
        for (var o = 0, c; c = Date.create.patterns[o++]; )
          if (c[0] == i || c[1] == i)
            return Date.create.patterns.splice(o, 0, n), this;
      }
      return Date.create.patterns.unshift(n), this;
    },
    removePattern: function(n) {
      for (var i = 0, o; o = Date.create.patterns[i++]; )
        if (o[0] == n || o[1] == n)
          return Date.create.patterns.splice(i - 1, 1)[0];
      return !1;
    },
    current: function() {
      return new Date();
    }
  };
  t(Date, f), "now" in Date || (Date.now = function() {
    return Date.current().setUTCOffset(0).getTime();
  });
  var h = {};
  Date.Timer = function(n) {
    return n === h ? this : this.initialize.apply(this, Array.prototype.slice.call(arguments));
  }, Date.Timer.prototype.initialize = function() {
    return this;
  }, typeof window < "u" ? window.performance && window.performance.now ? Date.Timer._now = function() {
    return window.performance.now();
  } : window.performance && window.performance.webkitNow && (Date.Timer._now = function() {
    return window.performance.webkitNow();
  }) : Date.Timer._now = function() {
    return new Date().getTime() * 1e3;
  }, Date.Timer.prototype.start = Date.Timer.restart = function() {
    return this._startSnapshot = Date.Timer._now(), this.startDate = new Date(), this;
  }, Date.Timer.prototype.clone = function() {
    var n = new Date.time(h);
    return n._startSnapshot = this._startSnapshot, n.startDate = this.startDate, n;
  }, Date.Timer.prototype.stop = function(n, i) {
    if (i) {
      var o = this.stop(n);
      return i.replace("%s", o).replace(/%?\.(\d+)f/i, function(g) {
        return retult.toFixed(+g[1]);
      });
    }
    this._stopSnapshot = Date.Timer._now(), this.stopDate = new Date();
    var c = this._stopSnapshot - this._startSnapshot;
    switch (String(n).toLowerCase()) {
      case "microseconds":
      case "microsecond":
        return c;
      case "milliseconds":
      case "millisecond":
      default:
        return c / 1e3;
      case "seconds":
      case "second":
        return c / 1e6;
      case "minutes":
      case "minute":
        return c / 6e7;
      case "hours":
      case "hour":
        return c / 36e8;
      case "days":
      case "day":
        return c / (24 * 36e8);
    }
  }, Date.addFormat("strftime", {
    matcher: /()%(#?(%|[a-z]))/i,
    defaultFormat: "%Y-%m-%d %H:%M:%s",
    codes: {
      Y: "FullYear",
      y: "ShortYear.2",
      m: "MonthNumber.2",
      "#m": "MonthNumber",
      B: "MonthName",
      b: "AbbrMonthName",
      d: "Date.2",
      "#d": "Date",
      e: "Date",
      A: "DayName",
      a: "AbbrDayName",
      w: "Day",
      o: "DayOrdinal",
      H: "Hours.2",
      "#H": "Hours",
      I: "Hours12.2",
      "#I": "Hours12",
      P: "AmPmLower",
      p: "AmPm",
      M: "Minutes.2",
      "#M": "Minutes",
      S: "Seconds.2",
      "#S": "Seconds",
      s: "Unix",
      N: "Milliseconds.3",
      "#N": "Milliseconds",
      O: "TimezoneOffset",
      Z: "TimezoneName",
      G: "UTCOffset"
    },
    shortcuts: {
      F: "%Y-%m-%d",
      T: "%H:%M:%S",
      X: "%H:%M:%S",
      x: "%m/%d/%y",
      D: "%m/%d/%y",
      "#c": "%a %b %e %H:%M:%S %Y",
      v: "%e-%b-%Y",
      R: "%H:%M",
      r: "%I:%M:%S %p",
      t: "	",
      n: `
`,
      "%": "%"
    }
  }), Date.addFormat("formatPhp", {
    matcher: /(\\)?([a-z])/i,
    defaultFormat: "Y-m-d H:i:s",
    codes: {
      Y: "FullYear",
      y: "ShortYear.2",
      L: "isLeapYear",
      m: "MonthNumber.2",
      n: "MonthNumber",
      F: "MonthName",
      M: "AbbrMonthName",
      t: "daysInMonth",
      d: "Date.2",
      j: "Date",
      l: "DayName",
      D: "AbbrDayName",
      w: "Day",
      S: "DayOrdinal",
      H: "Hours.2",
      G: "Hours",
      h: "Hours12.2",
      g: "Hours12",
      a: "AmPmLower",
      A: "AmPm",
      i: "Minutes.2",
      s: "Seconds.2",
      U: "Unix",
      Z: "TimezoneOffset",
      e: "TimezoneName",
      P: "UTCOffset",
      O: "UTCOffsetNumber"
    },
    shortcuts: {
      c: "Y-m-d\\TH:i:sP",
      r: "D, j M Y H:i:s O"
    }
  });
  for (var y = {
    matcher: /()(mi|am|pm|ss|yyyy|yy|m{1,4}|d{1,4}|w|hh?24|hh?12)/i,
    defaultFormat: "yyyy-mm-dd hh24:mi:ss",
    codes: {
      yyyy: "FullYear",
      yy: "ShortYear.2",
      mm: "MonthNumber.2",
      m: "MonthNumber",
      mmm: "AbbrMonthName",
      mmmm: "MonthName",
      dd: "Date.2",
      d: "Date",
      ddd: "AbbrDayName",
      dddd: "DayName",
      w: "Day",
      hh24: "Hours.2",
      h24: "Hours",
      hh: "Hours12.2",
      hh12: "Hours12.2",
      h12: "Hours12",
      am: "AmPm",
      pm: "AmPm",
      mi: "Minutes.2",
      ss: "Seconds.2"
    },
    shortcuts: {}
  }, v = "yyyy yy mm m mmm mmmm dd d ddd dddd w hh24 h24 hh12 h12 am pm mi ss".split(" "), d = 0, _; _ = v[d++]; )
    y.codes[_.toUpperCase()] = y.codes[_];
  Date.addFormat("formatSql", y), Date.create.regexes = {
    YEAR: "[1-9]\\d{3}",
    MONTH: "1[0-2]|0?[1-9]",
    MONTH2: "1[0-2]|0[1-9]",
    MONTHNAME: "jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|september|oct|october|nov|november|dec|december",
    DAYNAME: "mon|monday|tue|tuesday|wed|wednesday|thu|thursday|fri|friday|sat|saturday|sun|sunday",
    DAY: "3[01]|[12]\\d|0?[1-9]",
    DAY2: "3[01]|[12]\\d|0[1-9]",
    TIMEZONE: "[+-][01]\\d\\:?[0-5]\\d",
    H24: "[01]\\d|2[0-3]",
    MIN: "[0-5]\\d",
    SEC: "[0-5]\\d",
    MS: "\\d{3,}",
    H12: "0?[1-9]|1[012]",
    AMPM: "am|pm",
    UNIT: "year|month|week|day|hour|minute|second|millisecond"
  }, Date.create.makePattern = function(n) {
    return n = n.replace(/_([A-Z][A-Z0-9]+)_/g, function(i, o) {
      return Date.create.regexes[o];
    }), new RegExp(n, "i");
  }, Date.create.patterns = [
    [
      "iso_8601",
      Date.create.makePattern("^(_YEAR_)-(_MONTH_)-(_DAY_)$"),
      "$2/$3/$1"
    ],
    [
      "us",
      Date.create.makePattern("^(_MONTH_)([\\/-])(_DAY_)\\2(_YEAR_)$"),
      "$1/$3/$4"
    ],
    [
      "world",
      Date.create.makePattern("^(_DAY_)([\\/\\.])(_MONTH_)\\2(_YEAR_)$"),
      "$3/$1/$4"
    ],
    [
      "chicago",
      Date.create.makePattern("^(?:(?:_DAYNAME_),? )?(_DAY_)([ -])(_MONTHNAME_)\\2(_YEAR_)$"),
      "$3 $1, $4"
    ],
    [
      "conversational",
      Date.create.makePattern("^(?:(?:_DAYNAME_),? )?(_MONTHNAME_) (_DAY_),? (_YEAR_)$"),
      "$1 $2, $3"
    ],
    [
      "month_day_time_year",
      Date.create.makePattern("^(?:_DAYNAME_) (_MONTHNAME_) (_DAY_) ((?:_H24_)\\:(?:_MIN_)(?:\\:_SEC_)?) (_TIMEZONE_) (_YEAR_)$"),
      function(n) {
        var i = e(Date.getMonthByName(n[1]), 2), o = e(n[2], 2), c = Date.create(n[5] + "-" + i + "-" + o + "T" + n[3] + n[4]);
        return isNaN(c) ? !1 : c;
      }
    ],
    [
      "unix",
      /^@(-?\d+)$/,
      function(n) {
        return Date.create(parseInt(n[1], 10) * 1e3);
      }
    ],
    [
      "24_hour",
      Date.create.makePattern("^(?:(.+?)(?: |T))?(_H24_)\\:(_MIN_)(?:\\:(_SEC_)(?:\\.(_MS_))?)? ?(?:GMT)?(_TIMEZONE_)?(?: \\([A-Z]+\\))?$"),
      function(n) {
        var i;
        if (n[1]) {
          if (i = Date.create(n[1]), isNaN(i))
            return !1;
        } else
          i = Date.current(), i.setMilliseconds(0);
        return i.setHours(parseFloat(n[2]), parseFloat(n[3]), parseFloat(n[4] || 0)), n[5] && i.setMilliseconds(+String(n[5]).slice(0, 3)), n[6] && i.setUTCOffsetString(n[6]), i;
      }
    ],
    [
      "12_hour",
      Date.create.makePattern("^(?:(.+) )?(_H12_)(?:\\:(_MIN_)(?:\\:(_SEC_))?)? ?(_AMPM_)$"),
      function(n) {
        var i;
        if (n[1]) {
          if (i = Date.create(n[1]), isNaN(i))
            return !1;
        } else
          i = Date.current(), i.setMilliseconds(0);
        var o = parseFloat(n[2]);
        return o = n[5].toLowerCase() == "am" ? o == 12 ? 0 : o : o == 12 ? 12 : o + 12, i.setHours(o, parseFloat(n[3] || 0), parseFloat(n[4] || 0)), i;
      }
    ],
    [
      "weeks_months_before_after",
      Date.create.makePattern("^(\\d+) (_UNIT_)s? (before|from|after) (.+)$"),
      function(n) {
        var i = Date.create(n[4]);
        return i instanceof Date ? i.add((n[3].toLowerCase() == "before" ? -1 : 1) * n[1], n[2]) : !1;
      }
    ],
    [
      "time_ago",
      Date.create.makePattern("^(\\d+) (_UNIT_)s? ago$"),
      function(n) {
        return Date.current().add(-1 * n[1], n[2]);
      }
    ],
    [
      "in_time",
      Date.create.makePattern("^in (\\d) (_UNIT_)s?$"),
      function(n) {
        return Date.current().add(n[1], n[2]);
      }
    ],
    [
      "plus_minus",
      Date.create.makePattern("^([+-]) ?(\\d+) (_UNIT_)s?$"),
      function(n) {
        var i = n[1] == "-" ? -1 : 1;
        return Date.current().add(i * n[2], n[3]);
      }
    ],
    [
      "asp_json",
      /^\/Date\((\d+)([+-]\d{4})?\)\/$/i,
      function(n) {
        var i = new Date();
        return i.setTime(n[1]), n[2] && i.setUTCOffsetString(n[2]), i;
      }
    ],
    [
      "today_tomorrow",
      /^(today|now|tomorrow|yesterday)/i,
      function(n) {
        var i = Date.current();
        switch (n[1].toLowerCase()) {
          case "today":
          case "now":
            return i;
          case "tomorrow":
            return i.add(1, "day");
          case "yesterday":
            return i.add(-1, "day");
        }
      }
    ],
    [
      "this_next_last",
      Date.create.makePattern("^(this|next|last) (?:(_UNIT_)s?|(_MONTHNAME_)|(_DAYNAME_))$"),
      function(n) {
        var i = n[1].toLowerCase() == "last" ? -1 : 1, o = Date.current(), c, g, M;
        return n[2] ? o.add(i, n[2]) : n[3] ? (g = Date.getMonthByName(n[3]) - 1, c = 12 - (o.getMonth() - g), c = c > 12 ? c - 12 : c, o.add(i * c, "month")) : n[4] ? (M = Date.getWeekdayByName(n[4]), c = o.getDay() - M + 7, o.add(i * (c == 0 ? 7 : c), "day")) : !1;
      }
    ],
    [
      "conversational_sans_year",
      Date.create.makePattern("^(_MONTHNAME_) (?:the )?(\\d+)(?:st|nd|rd|th)?$"),
      function(n) {
        var i = Date.current();
        return n[1] && i.setMonth(Date.getMonthByName(n[1]) - 1), i.setDate(n[2]), i;
      }
    ]
  ], typeof module < "u" && module.exports ? module.exports = Date.create : typeof define == "function" && define(function() {
    return Date.create;
  }), typeof window < "u" && (window.$D = Date.create);
})();
const Aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Sa = {};
class O extends Date {
  constructor(...r) {
    super(...r);
    b(this, "__currentMonth", !1);
  }
  static fromYYYY_MM(r) {
    var s = r.replace(/_/g, "-") + "-01";
    return new Date(s);
  }
  static fromDate(r) {
    return new O(r.getTime());
  }
  static fromAny(r) {
    return this.fromDate(x(r));
  }
  diff(r, s = "day") {
    let a = this.getTime() - r.getTime();
    switch (s) {
      case "year":
        return a / 1e3 / 60 / 60 / 24 / 365;
      case "month":
        return a / 1e3 / 60 / 60 / 24 / 30;
      case "day":
        return a / 1e3 / 60 / 60 / 24;
      case "hour":
        return a / 1e3 / 60 / 60;
      case "minute":
        return a / 1e3 / 60;
      case "second":
        return a / 1e3;
      case "millisecond":
        return a;
    }
  }
  add(r, s = "day") {
    const a = this.clone();
    switch (s) {
      case "year":
        a.setFullYear(this.getFullYear() + r);
        break;
      case "month":
        this.setMonth(this.getMonth() + r);
      case "day":
        this.setDate(this.getDate() + r);
      case "hour":
        a.setHours(this.getHours() + r);
        break;
      case "minute":
        a.setMinutes(this.getMinutes() + r);
        break;
      case "second":
        a.setSeconds(this.getSeconds() + r);
        break;
      case "millisecond":
        a.setMilliseconds(this.getMilliseconds() + r);
        break;
    }
    return a;
  }
  clone() {
    return new O(this.getTime());
  }
  setTimeByDate(r) {
    return this.setHours(r.getHours(), r.getMinutes(), r.getSeconds(), r.getSeconds()), this;
  }
  getDayMountInMonth() {
    let r = this.clone();
    return r.setMonth(r.getMonth() + 1), r.setDate(0), r.getDate();
  }
  setToDayStart() {
    return this.clearTime();
  }
  setToDayEnd() {
    return this.setHours(23, 59, 59, 999), this;
  }
  setToMonthStart() {
    return this.setDate(1), this.setToDayStart();
  }
  setToMonthEnd() {
    return this.setDate(this.getDayMountInMonth()), this.setToDayEnd();
  }
  setToYearStart() {
    const r = this;
    return r.setMonth(0, 1), r.setToDayStart(), r;
  }
  setToYearEnd() {
    const r = this;
    return r.setMonth(12, 1), r.setToDayStart(), r.setTime(r.getTime() - 1), r;
  }
  isSameDay(r) {
    let s;
    typeof r == "number" ? s = new O(r) : s = O.prototype.clone.call(r);
    let a = s.clone().setToDayStart(), u = this.clone().setToDayStart();
    return a.getTime() == u.getTime();
  }
  clearTime() {
    return this.setHours(0, 0, 0, 0), this;
  }
  clearDay() {
    return this.setDate(1), this;
  }
  formatToMonth(r = "-") {
    const s = this.getFullYear(), a = this.getMonth() + 1;
    return `${s}${r}${a}`;
  }
  formatToDay(r = "-") {
    const s = this.getFullYear(), a = this.getMonth() + 1, u = this.getDate();
    return `${s}${r}${a}${r}${u}`;
  }
  getCalendarDateList(r = !1) {
    var s = this;
    typeof r > "u" && (r = !0);
    var a = Sa, u = this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + (r ? "0" : "1");
    if (a[u])
      return a[u];
    let f, h;
    r ? (f = 0, h = 6) : (f = 1, h = 7);
    let y = [], v = this.clone().setToMonthStart(), d = this.clone().setToMonthEnd();
    var _ = v.getDay(), n = d.getDay();
    let i = v.clone().add(f - _ - 1, "day"), o = d.clone().add(h - n + 0, "day"), c = o.diff(i, "day"), g = 0, M = s.getMonth();
    for (; g++ < c; ) {
      let w = i.clone().add(g, "day");
      w.getMonth() == M && (w.__currentMonth = !0), y.push(w);
    }
    return a[u] = {
      list: y,
      firstDateInMonth: v,
      lastDateInMonth: d,
      firstDateInView: i,
      lastDateInView: o
    };
  }
}
const x = function(e) {
  const t = new Date();
  if (e) {
    if (e instanceof Date)
      return e;
    if (typeof e == "number") {
      const r = e + "", s = r.split(""), a = parseInt(s.splice(0, 4).join("")), u = parseInt(s.splice(0, 2).join("")) - 1, f = parseInt(s.splice(0, 2).join(""));
      return r.length == 4 ? (t.setFullYear(a), t) : r.length == 6 ? (t.setFullYear(a), t.setMonth(u), t) : r.length == 8 ? (t.setFullYear(a), t.setMonth(u), t.setDate(f), t) : new Date(e);
    } else if (typeof e == "string") {
      if (e = e.trim(), /^\d+$/.test(e))
        return x(parseInt(e));
      {
        const r = e.split(/[-:\sTZ\+年月日时分秒]/), [
          s = t.getFullYear(),
          a = t.getMonth() + 1,
          u = t.getDate(),
          f = t.getHours(),
          h = t.getMinutes(),
          y = t.getSeconds()
        ] = r, v = parseInt([
          s,
          (a + "").padStart(2, "0"),
          (u + "").padStart(2, "0")
        ].join(""));
        if (r.length <= 3)
          return x(v);
        {
          const d = x(v);
          if (!d)
            throw new Error("\u65E0\u6CD5\u89E3\u6790\u7684\u65E5\u671F\u683C\u5F0F");
          return d.setHours(f, h, y), d;
        }
      }
    }
  } else
    return new Date();
}, Ea = x;
function ei(e) {
  var t = "";
  if (typeof e == "string") {
    let r = e.split("-");
    r.length == 1 ? e = parseInt(e) : r.length == 2 ? t = e + "-01" : t = e;
    const s = Aa(t);
    return ge(s);
  } else if (typeof e == "number") {
    const r = new Date();
    return r.setMonth(e - 1), ge(r);
  } else
    throw new Error("\u8BF7\u4F20\u5165\u6709\u6548\u7C7B\u578B");
}
function ge(e) {
  return e = new Date(Ea(e).getTime()), e.add(1, "month"), e.setDate(0), e.getDate();
}
const Ca = (e) => e.replace(/[^\x00-\xff]/g, "**").length, ti = (e, t) => (r, s) => r.trim().split(`
`).map((u) => {
  const f = u.trim();
  return f.startsWith("//") ? "" : f;
}).filter((u) => !!u).map((u) => {
  const [f, h, ...y] = u.split(/\s+/), d = {
    minWidth: Ca(h) * 7 + 45,
    key: f,
    title: h,
    visible: !1,
    sum: !1
  };
  y.forEach((n) => {
    if (["center", "left"].includes(n))
      d.align = n;
    else if (/^(\+|\-)?(\d+)$/.test(n)) {
      const i = RegExp.$1, o = parseInt(RegExp.$2);
      i === "+" ? d.maxWidth = o : i === "-" ? d.minWidth = o : d.width = o;
    } else if (["show", "hide"].includes(n))
      d.visible = n == "show";
    else if (n === "__sum__")
      d.sum = !0;
    else if (n.startsWith("#"))
      n == "#" ? d.slot = d.key : d.slot = n.substring(1);
    else {
      const i = t[n];
      i ? d.render = i : console.warn("\u672A\u5B9A\u4E49\u7684render:", n);
    }
  });
  const _ = e[f];
  return _ && Object.assign(d, _), d.getValue = function(n) {
    return d.render ? d.render(null, { row: n, column: d }, !0) : n[d.key];
  }, s ? s(d, u) : d;
});
export {
  P as AError,
  Ga as BPromise,
  O as Date2,
  ye as Math2,
  x as all2date,
  La as all2valueName,
  Ka as byteArrayToString,
  Za as encodeStringToGBK,
  Ra as firstLetterUppercase,
  qa as fromGBKArrayToString,
  Ja as getByteLength,
  ge as getDayLengthInMonth,
  ei as getDayMountByMonth,
  Ua as getImageSize,
  Oe as isPlainObject,
  Pa as makeTreeDataHelper,
  Ea as parse2date,
  ke as preppendZero,
  Ss as promiseMap,
  Es as randomString,
  $s as safeBindToObject,
  Ba as safeJsonParser,
  Qa as safeParseNumber,
  Wa as safeStringify,
  ja as safeValueInList,
  Va as safeValueInRange,
  Xa as stripAndFixNumber,
  $a as stripNumber,
  za as stripString,
  fe as travelTree,
  Ya as treeEach,
  Y as tryGet,
  ti as viewuiColumnFactory
};
