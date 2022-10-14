var Le = Object.defineProperty;
var je = (e, t, r) => t in e ? Le(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
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
function B(e) {
  return new _e(e);
}
function De() {
  this.depth = 0, this.stack = B({ node: null, index: -1 });
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
function Ge(e, t, r) {
  for (var a = Z(), i = Me(), c = K(a, i), f = B(e), m = Object.assign({}, e); !f.isEmpty(); ) {
    var p = f.pop();
    if (p === m) {
      i.moveUp();
      continue;
    }
    if (a.reset(), t(p, c), a.break)
      break;
    if (!a.remove && (i.moveNext(), !a.skip)) {
      a.replace && (p = a.replace);
      var g = r(p);
      J(g) && (f.push(m), f.pushArrayReverse(g), i.moveDown(p));
    }
  }
}
function Ue(e, t, r) {
  for (var a = Z(), i = Me(), c = K(a, i), f = B(e), m = B(null); !f.isEmpty(); ) {
    var p = f.peek(), g = m.peek(), y = r(p);
    if (a.reset(), p === g || !J(y)) {
      if (p === g && (m.pop(), i.moveUp()), f.pop(), t(p, c), a.break)
        break;
      if (a.remove)
        continue;
      i.moveNext();
    } else
      m.push(p), i.moveDown(p), f.pushArrayReverse(y);
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
    for (var r = 0, a = t.length; r < a; r++)
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
  for (var a = Z(), i = ze(), c = K(a, i), f = we(e); !f.isEmpty(); ) {
    var m = f.dequeue();
    if (a.reset(), t(m, c), a.break)
      break;
    if (!a.remove && (i.moveNext(), a.replace && (m = a.replace), !a.skip)) {
      var p = r(m);
      J(p) && (f.enqueueMultiple(p), i.store(m, p.length));
    }
    i.moveForward();
  }
}
var Ke = function(t) {
  return t.children;
};
function Ze(e, t, r) {
  if (e != null) {
    r = r || {};
    var a = r.order || "pre", i = r.getChildren || Ke;
    a === "pre" ? Ge(e, t, i) : a === "post" ? Ue(e, t, i) : a === "bfs" && qe(e, t, i);
  }
}
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Je(e) {
  for (var t = -1, r = e == null ? 0 : e.length, a = 0, i = []; ++t < r; ) {
    var c = e[t];
    c && (i[a++] = c);
  }
  return i;
}
var We = Je, Xe = Array.isArray, W = Xe, Ve = typeof H == "object" && H && H.Object === Object && H, Qe = Ve, et = Qe, tt = typeof self == "object" && self && self.Object === Object && self, rt = et || tt || Function("return this")(), X = rt, nt = X, st = nt.Symbol, V = st, te = V, $e = Object.prototype, at = $e.hasOwnProperty, it = $e.toString, I = te ? te.toStringTag : void 0;
function ot(e) {
  var t = at.call(e, I), r = e[I];
  try {
    e[I] = void 0;
    var a = !0;
  } catch {
  }
  var i = it.call(e);
  return a && (t ? e[I] = r : delete e[I]), i;
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
var G = Ct, Ft = Ae, It = G, xt = "[object AsyncFunction]", Ot = "[object Function]", kt = "[object GeneratorFunction]", Ht = "[object Proxy]";
function Pt(e) {
  if (!It(e))
    return !1;
  var t = Ft(e);
  return t == Ot || t == kt || t == xt || t == Ht;
}
var Se = Pt, Yt = X, Bt = Yt["__core-js_shared__"], Lt = Bt, q = Lt, se = function() {
  var e = /[^.]+$/.exec(q && q.keys && q.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function jt(e) {
  return !!se && se in e;
}
var Gt = jt, Ut = Function.prototype, Rt = Ut.toString;
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
var qt = zt, Kt = Se, Zt = Gt, Jt = G, Wt = qt, Xt = /[\\^$.*+?()[\]{}|]/g, Vt = /^\[object .+?Constructor\]$/, Qt = Function.prototype, er = Object.prototype, tr = Qt.toString, rr = er.hasOwnProperty, nr = RegExp(
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
var Ee = fr, lr = Ee, hr = lr(Object, "create"), U = hr, ae = U;
function dr() {
  this.__data__ = ae ? ae(null) : {}, this.size = 0;
}
var pr = dr;
function mr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var yr = mr, gr = U, vr = "__lodash_hash_undefined__", _r = Object.prototype, Dr = _r.hasOwnProperty;
function Mr(e) {
  var t = this.__data__;
  if (gr) {
    var r = t[e];
    return r === vr ? void 0 : r;
  }
  return Dr.call(t, e) ? t[e] : void 0;
}
var Nr = Mr, br = U, wr = Object.prototype, Tr = wr.hasOwnProperty;
function $r(e) {
  var t = this.__data__;
  return br ? t[e] !== void 0 : Tr.call(t, e);
}
var Ar = $r, Sr = U, Er = "__lodash_hash_undefined__";
function Cr(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Sr && t === void 0 ? Er : t, this;
}
var Fr = Cr, Ir = pr, xr = yr, Or = Nr, kr = Ar, Hr = Fr;
function E(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
E.prototype.clear = Ir;
E.prototype.delete = xr;
E.prototype.get = Or;
E.prototype.has = kr;
E.prototype.set = Hr;
var Pr = E;
function Yr() {
  this.__data__ = [], this.size = 0;
}
var Br = Yr;
function Lr(e, t) {
  return e === t || e !== e && t !== t;
}
var Ce = Lr, jr = Ce;
function Gr(e, t) {
  for (var r = e.length; r--; )
    if (jr(e[r][0], t))
      return r;
  return -1;
}
var R = Gr, Ur = R, Rr = Array.prototype, zr = Rr.splice;
function qr(e) {
  var t = this.__data__, r = Ur(t, e);
  if (r < 0)
    return !1;
  var a = t.length - 1;
  return r == a ? t.pop() : zr.call(t, r, 1), --this.size, !0;
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
  var r = this.__data__, a = en(r, e);
  return a < 0 ? (++this.size, r.push([e, t])) : r[a][1] = t, this;
}
var rn = tn, nn = Br, sn = Kr, an = Wr, on = Qr, un = rn;
function C(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
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
  var r = Fn(this, e), a = r.size;
  return r.set(e, t), this.size += r.size == a ? 0 : 1, this;
}
var xn = In, On = gn, kn = wn, Hn = An, Pn = Cn, Yn = xn;
function F(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
F.prototype.clear = On;
F.prototype.delete = kn;
F.prototype.get = Hn;
F.prototype.has = Pn;
F.prototype.set = Yn;
var Bn = F, Fe = Bn, Ln = "Expected a function";
function Q(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Ln);
  var r = function() {
    var a = arguments, i = t ? t.apply(this, a) : a[0], c = r.cache;
    if (c.has(i))
      return c.get(i);
    var f = e.apply(this, a);
    return r.cache = c.set(i, f) || c, f;
  };
  return r.cache = new (Q.Cache || Fe)(), r;
}
Q.Cache = Fe;
var jn = Q, Gn = jn, Un = 500;
function Rn(e) {
  var t = Gn(e, function(a) {
    return r.size === Un && r.clear(), a;
  }), r = t.cache;
  return t;
}
var zn = Rn, qn = zn, Kn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Zn = /\\(\\)?/g, Jn = qn(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Kn, function(r, a, i, c) {
    t.push(i ? c.replace(Zn, "$1") : a || r);
  }), t;
}), Wn = Jn;
function Xn(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length, i = Array(a); ++r < a; )
    i[r] = t(e[r], r, e);
  return i;
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
  for (var r = 0, a = t.length; e != null && r < a; )
    e = e[vs(t[r++])];
  return r && r == a ? e : void 0;
}
var Ds = _s, Ms = Ds;
function Ns(e, t, r) {
  var a = e == null ? void 0 : Ms(e, t);
  return a === void 0 ? r : a;
}
var bs = Ns;
function ws(e) {
  return e == null;
}
var Ts = ws;
const Ha = function(e, t = {}) {
  let r = {}, a = [], i = [], c = {};
  const f = function() {
    r = {}, a = [], i = [], c = {};
  };
  f();
  let {
    childrenKey: m = "children",
    checkedKey: p = "checked",
    idKey: g = "id"
  } = t, y = 0, _ = 0;
  const n = function(l = {}) {
    m = l.childrenKey || m, p = l.checkedKey || p, g = l.idKey || g;
  }, s = function(l, h) {
    l.forEach(function(d) {
      const N = d[g];
      r[N] = d, d = { ...d }, i.push(d), d.parent = h, d.index = y++;
      const S = h ? h.deepth + 1 : 0;
      d.deepth = S, _ = Math.max(_, S), d.path = h ? h.path + "." + d[g] : "0", d.parentIdList = h ? [...h.parentIdList, h[g]] : [], c[N] = d, d[m] && d[m].length > 0 && s(d[m], d);
    });
  }, o = function(l) {
    return l[m] && l[m].length > 0 ? !l[m].map((d) => D(d[g])).find((d) => !d[p]) : !1;
  }, u = function(l) {
    f(), Array.isArray(l) && s(l);
  };
  u(e);
  const v = function(l) {
    var h;
    return (h = D(l)) == null ? void 0 : h.parentIdList.map((d) => D(d));
  }, M = function(l) {
    const h = D(l);
    return i.filter(function(d) {
      return d.parent === (h == null ? void 0 : h.parent);
    });
  }, w = function(l) {
    let h;
    if (!l)
      return console.warn("id\u4E0D\u80FD\u4E3A\u7A7A"), null;
    if (l instanceof Object)
      h = l[g];
    else if (typeof l == "string" || typeof l == "number")
      h = l;
    else
      return console.warn("id\u7C7B\u578B\u975E\u6CD5:", l), null;
    return h;
  }, D = function(l) {
    const h = w(l);
    return h ? c[h] : null;
  }, T = function(l) {
    const h = w(l);
    return h ? r[h] : null;
  }, He = function(l) {
    const h = D(l);
    return h == null ? void 0 : h.deepth;
  }, Pe = function(l, h) {
    const d = D(l);
    d && Object.assign(d, h);
  }, Ye = function(l, h, d = !1) {
    const N = D(l);
    N && (N[p] = h, d && (N.parentIdList.forEach((S) => {
      const ee = c[S];
      ee[p] = o(ee);
    }), k(N, function(S) {
      S[p] = h;
    })));
  }, Be = function(l) {
    const h = {};
    l && l.forEach((d) => {
      h[d] = !0;
    }), i.forEach((d) => {
      d[p] = h[d[g]] || !1;
    });
  }, k = function(l, h) {
    const d = D(l);
    if (d)
      h(d), d[m] && d[m].length > 0 && d[m].forEach(function(N) {
        k(N, h);
      });
    else
      throw new Error("\u8282\u70B9\u4E0D\u5B58\u5728:" + l);
  };
  return {
    travelNode: k,
    getNodeList: (l = !0) => l ? [...i] : [...a],
    getNodeDescendantList: (l) => {
      const h = [];
      return k(l, function(d) {
        h.push(d);
      }), h;
    },
    getNodeListByFilter: (l) => i.filter(l),
    getMinDeepth: function() {
      let l = _;
      for (const h in i) {
        const d = i[h];
        if (d.checked && (l = Math.min(l, d.deepth)), l === 0)
          return 0;
      }
      return l;
    },
    getSublings: M,
    getParents: v,
    getDeepth: He,
    getNode: D,
    updateIndexes: u,
    setChecked: Ye,
    setProps: Pe,
    travelAllNode: function(l) {
      for (const h in i) {
        const d = i[h], N = T(d[g]);
        if (l(d, N) === !1)
          break;
      }
    },
    setOptions: n,
    resetCheckStatus: Be,
    getOriginNode: T
  };
}, fe = function(e, t, r = "children", a = "id", i = [], c = { flag: !1 }) {
  if (e instanceof Array) {
    fe({ [r]: e }, t, r, a, i);
    return;
  }
  const f = (e == null ? void 0 : e[r]) || [];
  for (let m = 0; m < f.length; m++) {
    const p = f[m];
    if (!t(p, i, r, a)) {
      c.flag = !0;
      break;
    }
    if (p[r] instanceof Array && fe(p[r], t, r, a, [p, ...i], c), c.flag)
      break;
  }
}, Y = function(e, t, r = null, a = !1) {
  if (typeof t == "string" && (t = t.split(",")), !!Array.isArray(t)) {
    for (let i = 0; i < t.length; i++) {
      const c = t[i], f = bs(e, c);
      if (a ? Ts(f) : !!f)
        return f;
    }
    return r;
  }
}, xe = (e) => Object.prototype.toString.call(e) == "[object Object]", $s = function(e, t, r, a = "_", i = 0) {
  e[t] ? i < 5 && $s(e, a + t, r, a, i + 1) : e[t] = r;
}, Pa = function(e, t, r) {
  let a = !1;
  return Array.isArray(e) && (e = { [t]: e }, a = !0), Ze(
    e,
    r,
    {
      getChildren(i) {
        return i[t];
      }
    }
  ), a ? e[t] : e;
}, Ya = function(e, t = /\s+/, r = ["0, \u8BF7\u63D0\u4F9Boptions"], a = null, i = ",", c = "name", f = "value", m = !1) {
  let p, g;
  typeof e == "function" && (g = e()), typeof e == "string" ? p = e.split(t).map((_) => _.trim()) : Array.isArray(e) ? p = e : Array.isArray(r) ? p = r : typeof r == "function" ? g = r() : p = [{
    name: "\u8BF7\u901A\u8FC7optionLs\u4F20\u5165\u6570\u7EC4\u6216\u8005\u5F02\u6B65\u51FD\u6570",
    value: -1
  }];
  const y = function(_) {
    typeof a == "function" && (_ = _.map((s) => {
      let [o, u] = a(s, {
        valueField: f,
        nameField: c
      }, Y);
      return { value: o, name: u };
    }));
    let n = We(_);
    return n.length != _.length && console.warn("options\u4E2D\u5B58\u5728\u7A7A\u9009\u9879", _), _ = n, _ = _.map((s) => {
      if ((typeof s == "string" || typeof s == "number") && (s = (s + "").split(i).map((o) => o.trim())), Array.isArray(s)) {
        let [o, u] = s;
        return u === void 0 && (u = o), { value: o, name: u };
      } else
        return s ? {
          name: Y(s, c),
          value: Y(s, f)
        } : {
          name: "\u65E0\u6548options",
          value: "-"
        };
    }), _.forEach((s) => {
      typeof s.value != "number" && typeof s.value != "string" && (s.value = s.value + "");
    }), _;
  };
  return p ? y(p) : g.then((_) => y(_));
}, Ba = function(e, t = null) {
  if (xe(e))
    return e;
  if (typeof e != "string")
    return console.warn("safeJsonParser error", e), t;
  try {
    return JSON.parse(e);
  } catch {
    return console.log("json\u89E3\u6790\u5931\u8D25:", e), t;
  }
}, La = function(e, t, r = 0, a = void 0) {
  if (t.includes(e))
    return e;
  {
    let i = t[r];
    return i === void 0 && (i = a), i;
  }
};
function As(...e) {
  let t;
  Array.isArray(arguments[0]) ? t = arguments[0] : t = Array.prototype.slice.call(arguments);
  let r = [];
  return t.reduce(
    function(a, i, c, f) {
      return a.then(function() {
        if (typeof i == "function")
          try {
            i = i();
          } catch (m) {
            return f.splice(1), Promise.reject(m);
          }
        else
          console.warn("map element:" + c + " not function");
        return i.then((m) => {
          r[c] = m;
        });
      });
    },
    Promise.resolve(r)
  ).then(function() {
    return r;
  });
}
class ja extends Promise {
  constructor(r = void 0) {
    let a, i;
    super((c, f) => {
      a = c, i = f, r && r(c, f);
    });
    b(this, "__resolve");
    b(this, "__reject");
    this.__resolve = a, this.__reject = i;
  }
  static map(r) {
    return As(r);
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
const L = class {
  static get fastGbk() {
    if (!this._fastGbk)
      throw new Error("\u8BF7\u5148\u8C03\u7528setFaskGbk\u65B9\u6CD5\u8BBE\u7F6EfastGbk::$GBK.setFaskGbk(require('fast-gbk'))");
    return this._fastGbk;
  }
  static setFaskGbk(t) {
    this._fastGbk = t;
  }
  static encode(t) {
    return L.fastGbk.encode(t);
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
        const a = t.map((i) => {
          typeof i == "number" && (console.warn("decodeGBK\u4F20\u5165\u7684\u6570\u7EC4\u4E2D\u6709number\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u8FD9\u662F\u4E0D\u5141\u8BB8\u7684\uFF0C\u4F1A\u5BFC\u81F4\u89E3\u7801\u9519\u8BEF"), i = i + "");
          let c = parseInt(i, 16);
          return isNaN(c) ? 0 : c;
        });
        r = L.decode(a);
      }
    return r;
  }
};
let A = L;
b(A, "_fastGbk");
const le = /* @__PURE__ */ new Map();
function Ga(e) {
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
function Ua(e, t) {
  if (!e || !t)
    return "";
  var r = 0, a = 0, i = "";
  for (a = 0; a < e.length; a++) {
    if (e.charCodeAt(a) > 255 ? r += 2 : r++, r > t)
      return i;
    i += e.charAt(a);
  }
  return e;
}
const Ss = () => {
  let e = Math.random().toString(32).substr(2);
  return le.get(e) ? Ss() : (le.set(e, !0), e);
};
function Es(e) {
  return A.decode(e);
}
function Ra(e) {
  return A.decode(e);
}
function za(e, t = "utf-8", r = 16) {
  return t.toLowerCase() == "gbk" && r == 16 ? Es(e) : new TextDecoder(t).decode(
    new Uint8Array(
      e.map((a) => Number.isFinite(a) ? a : parseInt(a, r))
    )
  );
}
function qa(e, t = "string") {
  return t == "string" ? A.encode(e) : A.encode(e).split("%").splice(1);
}
function Ka(e) {
  for (var t = 0, r = 0; r < e.length; r++) {
    var a = e.charCodeAt(r);
    a >= 1 && a <= 126 || 65376 <= a && a <= 65439 ? t++ : t += 2;
  }
  return t;
}
const Za = (e, t = "") => xe(e) ? JSON.stringify(e) : typeof e == "string" ? e : (console.warn("safeStringify error(\u6682\u4E0D\u652F\u6301\u7684\u6570\u636E\u7C7B\u578B)", e), t), Cs = /\:\:([-\d\.]+)$/, $ = class {
  constructor(t, r, a = !1, i = null) {
    b(this, "_name");
    b(this, "_code");
    b(this, "_silent");
    const c = this;
    c._name = t, c._code = r, c._silent = a;
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
    const a = `${t}-${r ? "0" : "1"}`;
    let i = he[a];
    if (!i) {
      let c, f;
      Cs.test(t) ? (c = RegExp.$1, f = t.replace(`::${c}`, "")) : (c = 0, f = t), i = new $(f, c, r), he[a] = i;
    }
    return i;
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
  const a = $;
  if (!t)
    return new $("\u672A\u77E5\u9519\u8BEF", -9999);
  let i;
  if (t instanceof Error)
    return a.fromErrorText(t.message, r);
  if (typeof t == "string")
    if (/^(\[|\{)/.test(t))
      try {
        t = JSON.parse(t);
      } catch {
        i = t;
      }
    else
      i = t;
  else
    i = Y(t, $.nameFieldList), r || (r = t.silence || t.silent);
  return !i && t.data ? a.fromObject(t.data) : a.fromErrorText(i, r);
});
const he = {};
function Fs(e, t, r) {
  var a = -1, i = e.length;
  t < 0 && (t = -t > i ? 0 : i + t), r = r > i ? i : r, r < 0 && (r += i), i = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var c = Array(i); ++a < i; )
    c[a] = e[a + t];
  return c;
}
var Is = Fs, xs = 9007199254740991;
function Os(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= xs;
}
var ks = Os, Hs = Se, Ps = ks;
function Ys(e) {
  return e != null && Ps(e.length) && !Hs(e);
}
var Bs = Ys, Ls = 9007199254740991, js = /^(?:0|[1-9]\d*)$/;
function Gs(e, t) {
  var r = typeof e;
  return t = t == null ? Ls : t, !!t && (r == "number" || r != "symbol" && js.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Us = Gs, Rs = Ce, zs = Bs, qs = Us, Ks = G;
function Zs(e, t, r) {
  if (!Ks(r))
    return !1;
  var a = typeof t;
  return (a == "number" ? zs(r) && qs(t, r.length) : a == "string" && t in r) ? Rs(r[t], e) : !1;
}
var Js = Zs, Ws = /\s/;
function Xs(e) {
  for (var t = e.length; t-- && Ws.test(e.charAt(t)); )
    ;
  return t;
}
var Vs = Xs, Qs = Vs, ea = /^\s+/;
function ta(e) {
  return e && e.slice(0, Qs(e) + 1).replace(ea, "");
}
var ra = ta, na = ra, de = G, sa = j, pe = 0 / 0, aa = /^[-+]0x[0-9a-f]+$/i, ia = /^0b[01]+$/i, oa = /^0o[0-7]+$/i, ua = parseInt;
function ca(e) {
  if (typeof e == "number")
    return e;
  if (sa(e))
    return pe;
  if (de(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = de(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = na(e);
  var r = ia.test(e);
  return r || oa.test(e) ? ua(e.slice(2), r ? 2 : 8) : aa.test(e) ? pe : +e;
}
var fa = ca, la = fa, me = 1 / 0, ha = 17976931348623157e292;
function da(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = la(e), e === me || e === -me) {
    var t = e < 0 ? -1 : 1;
    return t * ha;
  }
  return e === e ? e : 0;
}
var pa = da, ma = pa;
function ya(e) {
  var t = ma(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var ga = ya, va = Is, _a = Js, Da = ga, Ma = Math.ceil, Na = Math.max;
function ba(e, t, r) {
  (r ? _a(e, t, r) : t === void 0) ? t = 1 : t = Na(Da(t), 0);
  var a = e == null ? 0 : e.length;
  if (!a || t < 1)
    return [];
  for (var i = 0, c = 0, f = Array(Ma(a / t)); i < a; )
    f[c++] = va(e, i, i += t);
  return f;
}
var Oe = ba;
class ye {
  static strip(t, r = 12) {
    return +parseFloat(t.toPrecision(r));
  }
  static hexString2DecLs(t) {
    return Oe(t, 2).map((r) => parseInt(r.join(""), 16));
  }
  static preppendZero(t, r = 2) {
    return ke(r, t);
  }
  static getDec(t) {
    return t - Math.trunc(t);
  }
  static toDEC(t, r = 16) {
    return Array.isArray(t) ? t.map((a) => parseInt(a, r)) : parseInt(t, r);
  }
  static toHEX(t, r = 2, a = 10) {
    if (Array.isArray(t))
      return t.map((i) => Array.isArray(i) ? i[0] : this.toHEX(i, length, a));
    if (/[a-zA-Z]/.test(t + ""))
      throw new Error("\u65E0\u6CD5\u8F6C\u6362\u4E3AHEX:" + t);
    return t = parseInt(t + "", a), t >= Math.pow(2, 8) && (r = 4), wa(t, r)[0];
  }
}
function wa(e, t = 2) {
  let r = parseInt(e + "").toString(16).toUpperCase(), a = Oe(r, t).map((c) => c.join(""));
  const i = ke(t, a[0]);
  return a.splice(0, 1, i), a;
}
function ke(e, t) {
  let r = e - (t + "").length;
  return r <= 0 ? t + "" : Array(r).fill("0").join("") + (t + "");
}
function Ta(e, t = 12) {
  return typeof e != "number" && (e = 0), +parseFloat(e.toPrecision(t));
}
function Ja(e, t = 2) {
  typeof e != "number" && (e = 0);
  const r = Ta(e).toFixed(t);
  return parseFloat(r);
}
const Wa = function(e, t = Number.MAX_SAFE_INTEGER, r = 0) {
  const a = typeof e == "string";
  let i = a ? ye.toDEC(e) : e;
  return typeof r == "number" && (i = Math.max(r, i)), typeof t == "number" && (i = Math.min(t, i)), a ? ye.toHEX(i) : i;
}, Xa = (e, t = 0) => {
  if (typeof e == "number")
    return e;
  const i = ((e + "").includes(".") ? parseFloat : parseInt)(e);
  return isNaN(i) ? t : i;
};
/**
 * JavaScript Date instance methods
 *
 * @copyright 2012 Ken Snyder (kendsnyder at gmail dot com)
 * @version 3.5.0, June 2012 (http://sandbox.kendsnyder.com/date)
 * @license MIT http://www.opensource.org/licenses/MIT
 */
(function() {
  function e(n, s) {
    switch (s - String(n).length) {
      case 2:
        return "00" + n;
      case 1:
        return "0" + n;
    }
    return n;
  }
  function t(n, s) {
    for (var o in s)
      Object.prototype.hasOwnProperty.call(s, o) && (n[o] = s[o]);
  }
  var r = [], a = {
    millisecond: 1,
    second: 1e3,
    minute: 60 * 1e3,
    hour: 60 * 60 * 1e3,
    day: 24 * 60 * 60 * 1e3,
    week: 7 * 24 * 60 * 60 * 1e3,
    month: {
      add: function(n, s) {
        var o = n.getDate();
        a.year.add(n, Math[s > 0 ? "floor" : "ceil"](s / 12));
        var u = n.getMonth() + s % 12;
        u == 12 ? (u = 0, n.setYear(n.getFullYear() + 1)) : u == -1 && (u = 11, n.setYear(n.getFullYear() - 1)), n.setMonth(u), n.getDate() != o && (n.add(-1, "month"), n.setDate(n.daysInMonth()));
      },
      diff: function(n, s) {
        var o = n.getFullYear() - s.getFullYear(), u = n.getMonth() - s.getMonth() + o * 12, v = n.getDate() - s.getDate();
        return u + v / 30;
      }
    },
    year: {
      add: function(n, s) {
        n.setYear(n.getFullYear() + Math[s > 0 ? "floor" : "ceil"](s));
      },
      diff: function(n, s) {
        return a.month.diff(n, s) / 12;
      }
    }
  }, i = a;
  i.milliseconds = i.millisecond, i.seconds = i.second, i.minutes = i.minute, i.hours = i.hour, i.weeks = i.week, i.days = i.day, i.months = i.month, i.years = i.year;
  var c = {
    succ: function(n) {
      return this.clone().add(1, n || "day");
    },
    add: function(n, s) {
      var o = a[s] || a.day;
      return typeof o == "number" ? this.setTime(this.getTime() + o * n) : o.add(this, n), this;
    },
    diff: function(n, s, o) {
      var u;
      if (n = Date.create(n), n === null)
        return NaN;
      var v = a[s] || a.day;
      return typeof v == "number" ? u = (this.getTime() - n.getTime()) / v : u = v.diff(this, n), o ? u : Math[u > 0 ? "floor" : "ceil"](u);
    },
    _applyFormat: function(n, s) {
      for (var o = n || s.defaultFormat, u = "", v; o.length > 0; )
        (v = o.match(s.matcher)) ? (u += o.slice(0, v.index), u += (v[1] || "") + this._applyFormatChar(v[2], s), o = o.slice(v.index + v[0].length)) : (u += o, o = "");
      return u;
    },
    _applyFormatChar: function(n, s) {
      if (s.shortcuts && s.shortcuts[n])
        return this._applyFormat(s.shortcuts[n], s);
      if (s.codes && s.codes[n]) {
        var o = s.codes[n].split("."), u = this["get" + o[0]] ? this["get" + o[0]]() : "";
        return o[1] && (u = e(u, o[1])), u;
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
      var n = this.getTimezoneOffset() / 60, s = n < 0 ? "+" : "-";
      return n = Math.abs(n), s + e(Math.floor(n), 2) + ":" + e(n % 1 * 60, 2);
    },
    setUTCOffset: function(n) {
      var s = this.getTimezoneOffset() * -1, o = this.getTime() + s * 6e4;
      return this.setTime(o - n * 6e4), this;
    },
    setUTCOffsetString: function(n) {
      var s = n.match(/([+-]?)([01]\d|2[0-3])\:?([0-5]\d)/);
      if (s) {
        var o = parseFloat(s[2]) * 60;
        o += parseFloat(s[3]), s[1] == "-" && (o *= -1), this.setUTCOffset(o);
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
      var s = this.diff(n || Date.current(), "seconds"), o = Math.abs(s), u;
      if (o < 120)
        return s >= 0 ? "in a moment" : "moments ago";
      if (o < 3600)
        u = floor(o / 60) + " minutes";
      else if (o < 86400) {
        var v = floor(o / 3600), M = hour == 1 ? "" : "s";
        u = v + " hour" + M + " ago";
      } else {
        if (o < 172800)
          return s > 0 ? "tomorrow" : "yesterday";
        if (o < 604800)
          u = floor(o / 86400) + " days";
        else {
          if (o < 1209600)
            return s > 0 ? "next week" : "last week";
          if (o < 2419200)
            u = floor(o / 604800) + " weeks";
          else {
            if (o < 5184e3)
              return s > 0 ? "next month" : "last month";
            if (o < 31536e3)
              u = floor(o / 2592e3) + " months";
            else {
              if (o < 63072e3)
                return s > 0 ? "next year" : "last year";
              u = floor(o / 31536e3) + " years";
            }
          }
        }
      }
      return s > 0 ? "in " + u : u + " ago";
    },
    daysInMonth: function() {
      return Date.daysInMonth(this.getFullYear(), this.getMonth() + 1);
    },
    isLeapYear: function() {
      return Date.daysInMonth(this.getFullYear(), 1) == 29 ? 1 : 0;
    },
    isBefore: function(n, s) {
      return Math.round(this.diff(n, s || "milliseconds", !0), 0) < 0;
    },
    isAfter: function(n, s) {
      return Math.round(this.diff(n, s || "milliseconds", !0), 0) > 0;
    },
    equals: function(n, s) {
      return Math.round(this.diff(n, s || "milliseconds", !0), 0) == 0;
    },
    schedule: function(n) {
      var s = this.getTime() - Date.current().getTime(), o = this.clone();
      if (s <= 0)
        return o.unschedule(n), n(), this;
      var u = this.getTime(), v = setTimeout(function() {
        o.unschedule(n), n();
      }, s);
      return r.push({ callback: n, timestamp: u, timeoutId: v }), this;
    },
    unschedule: function(n) {
      for (var s = r.length, o = this.getTime(); s--; )
        r[s].callback == n && r[s].timestamp == o && (clearTimeout(r[s].timeoutId), r.splice(s, 1));
      return this;
    },
    getSchedule: function() {
      for (var n = [], s = this.getTime(), o = 0, u = r.length; o < u; o++)
        r[o].timestamp == s && n.push(r[o]);
      return n;
    }
  };
  t(Date.prototype, c), Date.prototype.toISOString || (Date.prototype.toISOString = function() {
    return this.setUTCOffset(0).strftime(Date.ISO);
  });
  var f = {
    create: function(n) {
      if (typeof n > "u")
        return Date.current();
      if (n instanceof Date)
        return n;
      var s = arguments;
      switch (s.length) {
        case 1:
          if (Object.prototype.toString.call(n) == "[object Number]")
            return new Date(n);
          if (n = String(n).replace(/^\s*(.*)\s*$/, "$1"), n = n.replace(/\s{2,}/g, " "), n === "")
            return Date.current();
          for (var o = 0, u, v, M, w, D, T; u = Date.create.patterns[o++]; )
            if (typeof u[0] == "string" ? (D = u[1], T = u[2]) : (D = u[0], T = u[1]), !!(w = n.match(D))) {
              if (typeof T == "function") {
                if (M = T(w, n), M instanceof Date)
                  return M;
              } else if (v = Date.parse(n.replace(D, T)), !isNaN(v))
                return new Date(v);
            }
          return NaN;
        case 2:
          return new Date(s[0], s[1], 1);
        case 3:
          return new Date(s[0], s[1], s[2]);
        case 4:
          return new Date(s[0], s[1], s[2], s[3]);
        case 5:
          return new Date(s[0], s[1], s[2], s[3], s[4]);
        case 6:
          return new Date(s[0], s[1], s[2], s[3], s[4], s[5]);
        default:
          return new Date(s[0], s[1], s[2], s[3], s[4], s[5], s[6]);
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
    daysInMonth: function(n, s) {
      return s == 2 ? new Date(n, 1, 29).getDate() == 29 ? 29 : 28 : [void 0, 31, void 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][s];
    },
    getMonthByName: function(n) {
      return Date.MONTHNAMES_LOOKUP[String(n).slice(0, 3).toLowerCase()];
    },
    getWeekdayByName: function(n) {
      return Date.DAYNAMES_LOOKUP[String(n).slice(0, 3).toLowerCase()];
    },
    autoFormat: function(n, s) {
      n = typeof n == "string" ? document.getElementById(n) : n;
      var o = function() {
        var u = Date.create(n.value);
        u && (n.value = u.format(s));
      };
      return typeof n.attachEvent == "function" ? n.attachEvent("onblur", o) : typeof n.addEventListener == "function" ? n.addEventListener("blur", o, !1) : n.onblur = o, n;
    },
    addFormat: function(n, s) {
      return Date.prototype[n] = function(o) {
        return this._applyFormat(o, s);
      }, this;
    },
    addPattern: function(n, s) {
      if (s) {
        for (var o = 0, u; u = Date.create.patterns[o++]; )
          if (u[0] == s || u[1] == s)
            return Date.create.patterns.splice(o, 0, n), this;
      }
      return Date.create.patterns.unshift(n), this;
    },
    removePattern: function(n) {
      for (var s = 0, o; o = Date.create.patterns[s++]; )
        if (o[0] == n || o[1] == n)
          return Date.create.patterns.splice(s - 1, 1)[0];
      return !1;
    },
    current: function() {
      return new Date();
    }
  };
  t(Date, f), "now" in Date || (Date.now = function() {
    return Date.current().setUTCOffset(0).getTime();
  });
  var m = {};
  Date.Timer = function(n) {
    return n === m ? this : this.initialize.apply(this, Array.prototype.slice.call(arguments));
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
    var n = new Date.time(m);
    return n._startSnapshot = this._startSnapshot, n.startDate = this.startDate, n;
  }, Date.Timer.prototype.stop = function(n, s) {
    if (s) {
      var o = this.stop(n);
      return s.replace("%s", o).replace(/%?\.(\d+)f/i, function(v) {
        return retult.toFixed(+v[1]);
      });
    }
    this._stopSnapshot = Date.Timer._now(), this.stopDate = new Date();
    var u = this._stopSnapshot - this._startSnapshot;
    switch (String(n).toLowerCase()) {
      case "microseconds":
      case "microsecond":
        return u;
      case "milliseconds":
      case "millisecond":
      default:
        return u / 1e3;
      case "seconds":
      case "second":
        return u / 1e6;
      case "minutes":
      case "minute":
        return u / 6e7;
      case "hours":
      case "hour":
        return u / 36e8;
      case "days":
      case "day":
        return u / (24 * 36e8);
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
  for (var p = {
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
  }, g = "yyyy yy mm m mmm mmmm dd d ddd dddd w hh24 h24 hh12 h12 am pm mi ss".split(" "), y = 0, _; _ = g[y++]; )
    p.codes[_.toUpperCase()] = p.codes[_];
  Date.addFormat("formatSql", p), Date.create.regexes = {
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
    return n = n.replace(/_([A-Z][A-Z0-9]+)_/g, function(s, o) {
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
        var s = e(Date.getMonthByName(n[1]), 2), o = e(n[2], 2), u = Date.create(n[5] + "-" + s + "-" + o + "T" + n[3] + n[4]);
        return isNaN(u) ? !1 : u;
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
        var s;
        if (n[1]) {
          if (s = Date.create(n[1]), isNaN(s))
            return !1;
        } else
          s = Date.current(), s.setMilliseconds(0);
        return s.setHours(parseFloat(n[2]), parseFloat(n[3]), parseFloat(n[4] || 0)), n[5] && s.setMilliseconds(+String(n[5]).slice(0, 3)), n[6] && s.setUTCOffsetString(n[6]), s;
      }
    ],
    [
      "12_hour",
      Date.create.makePattern("^(?:(.+) )?(_H12_)(?:\\:(_MIN_)(?:\\:(_SEC_))?)? ?(_AMPM_)$"),
      function(n) {
        var s;
        if (n[1]) {
          if (s = Date.create(n[1]), isNaN(s))
            return !1;
        } else
          s = Date.current(), s.setMilliseconds(0);
        var o = parseFloat(n[2]);
        return o = n[5].toLowerCase() == "am" ? o == 12 ? 0 : o : o == 12 ? 12 : o + 12, s.setHours(o, parseFloat(n[3] || 0), parseFloat(n[4] || 0)), s;
      }
    ],
    [
      "weeks_months_before_after",
      Date.create.makePattern("^(\\d+) (_UNIT_)s? (before|from|after) (.+)$"),
      function(n) {
        var s = Date.create(n[4]);
        return s instanceof Date ? s.add((n[3].toLowerCase() == "before" ? -1 : 1) * n[1], n[2]) : !1;
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
        var s = n[1] == "-" ? -1 : 1;
        return Date.current().add(s * n[2], n[3]);
      }
    ],
    [
      "asp_json",
      /^\/Date\((\d+)([+-]\d{4})?\)\/$/i,
      function(n) {
        var s = new Date();
        return s.setTime(n[1]), n[2] && s.setUTCOffsetString(n[2]), s;
      }
    ],
    [
      "today_tomorrow",
      /^(today|now|tomorrow|yesterday)/i,
      function(n) {
        var s = Date.current();
        switch (n[1].toLowerCase()) {
          case "today":
          case "now":
            return s;
          case "tomorrow":
            return s.add(1, "day");
          case "yesterday":
            return s.add(-1, "day");
        }
      }
    ],
    [
      "this_next_last",
      Date.create.makePattern("^(this|next|last) (?:(_UNIT_)s?|(_MONTHNAME_)|(_DAYNAME_))$"),
      function(n) {
        var s = n[1].toLowerCase() == "last" ? -1 : 1, o = Date.current(), u, v, M;
        return n[2] ? o.add(s, n[2]) : n[3] ? (v = Date.getMonthByName(n[3]) - 1, u = 12 - (o.getMonth() - v), u = u > 12 ? u - 12 : u, o.add(s * u, "month")) : n[4] ? (M = Date.getWeekdayByName(n[4]), u = o.getDay() - M + 7, o.add(s * (u == 0 ? 7 : u), "day")) : !1;
      }
    ],
    [
      "conversational_sans_year",
      Date.create.makePattern("^(_MONTHNAME_) (?:the )?(\\d+)(?:st|nd|rd|th)?$"),
      function(n) {
        var s = Date.current();
        return n[1] && s.setMonth(Date.getMonthByName(n[1]) - 1), s.setDate(n[2]), s;
      }
    ]
  ], typeof module < "u" && module.exports ? module.exports = Date.create : typeof define == "function" && define(function() {
    return Date.create;
  }), typeof window < "u" && (window.$D = Date.create);
})();
const $a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Aa = {};
class x extends Date {
  constructor(...r) {
    super(...r);
    b(this, "__currentMonth", !1);
  }
  static fromYYYY_MM(r) {
    var a = r.replace(/_/g, "-") + "-01";
    return new Date(a);
  }
  static fromDate(r) {
    return new x(r.getTime());
  }
  static fromAny(r) {
    return this.fromDate(O(r));
  }
  diff(r, a = "day") {
    let i = this.getTime() - r.getTime();
    switch (a) {
      case "year":
        return i / 1e3 / 60 / 60 / 24 / 365;
      case "month":
        return i / 1e3 / 60 / 60 / 24 / 30;
      case "day":
        return i / 1e3 / 60 / 60 / 24;
      case "hour":
        return i / 1e3 / 60 / 60;
      case "minute":
        return i / 1e3 / 60;
      case "second":
        return i / 1e3;
      case "millisecond":
        return i;
    }
  }
  add(r, a = "day") {
    const i = this.clone();
    switch (a) {
      case "year":
        i.setFullYear(this.getFullYear() + r);
        break;
      case "month":
        this.setMonth(this.getMonth() + r);
      case "day":
        this.setDate(this.getDate() + r);
      case "hour":
        i.setHours(this.getHours() + r);
        break;
      case "minute":
        i.setMinutes(this.getMinutes() + r);
        break;
      case "second":
        i.setSeconds(this.getSeconds() + r);
        break;
      case "millisecond":
        i.setMilliseconds(this.getMilliseconds() + r);
        break;
    }
    return i;
  }
  clone() {
    return new x(this.getTime());
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
    let a;
    typeof r == "number" ? a = new x(r) : a = x.prototype.clone.call(r);
    let i = a.clone().setToDayStart(), c = this.clone().setToDayStart();
    return i.getTime() == c.getTime();
  }
  clearTime() {
    return this.setHours(0, 0, 0, 0), this;
  }
  clearDay() {
    return this.setDate(1), this;
  }
  formatToMonth(r = "-") {
    const a = this.getFullYear(), i = this.getMonth() + 1;
    return `${a}${r}${i}`;
  }
  formatToDay(r = "-") {
    const a = this.getFullYear(), i = this.getMonth() + 1, c = this.getDate();
    return `${a}${r}${i}${r}${c}`;
  }
  getCalendarDateList(r = !1) {
    var a = this;
    typeof r > "u" && (r = !0);
    var i = Aa, c = this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + (r ? "0" : "1");
    if (i[c])
      return i[c];
    let f, m;
    r ? (f = 0, m = 6) : (f = 1, m = 7);
    let p = [], g = this.clone().setToMonthStart(), y = this.clone().setToMonthEnd();
    var _ = g.getDay(), n = y.getDay();
    let s = g.clone().add(f - _ - 1, "day"), o = y.clone().add(m - n + 0, "day"), u = o.diff(s, "day"), v = 0, M = a.getMonth();
    for (; v++ < u; ) {
      let w = s.clone().add(v, "day");
      w.getMonth() == M && (w.__currentMonth = !0), p.push(w);
    }
    return i[c] = {
      list: p,
      firstDateInMonth: g,
      lastDateInMonth: y,
      firstDateInView: s,
      lastDateInView: o
    };
  }
}
const O = function(e) {
  const t = new Date();
  if (e) {
    if (e instanceof Date)
      return e;
    if (typeof e == "number") {
      const r = e + "", a = r.split(""), i = parseInt(a.splice(0, 4).join("")), c = parseInt(a.splice(0, 2).join("")) - 1, f = parseInt(a.splice(0, 2).join(""));
      return r.length == 4 ? (t.setFullYear(i), t) : r.length == 6 ? (t.setFullYear(i), t.setMonth(c), t) : r.length == 8 ? (t.setFullYear(i), t.setMonth(c), t.setDate(f), t) : new Date(e);
    } else if (typeof e == "string") {
      if (e = e.trim(), /^\d+$/.test(e))
        return O(parseInt(e));
      {
        const r = e.split(/[-:\sTZ\+年月日时分秒]/), [
          a = t.getFullYear(),
          i = t.getMonth() + 1,
          c = t.getDate(),
          f = t.getHours(),
          m = t.getMinutes(),
          p = t.getSeconds()
        ] = r, g = parseInt([
          a,
          (i + "").padStart(2, "0"),
          (c + "").padStart(2, "0")
        ].join(""));
        if (r.length <= 3)
          return O(g);
        {
          const y = O(g);
          if (!y)
            throw new Error("\u65E0\u6CD5\u89E3\u6790\u7684\u65E5\u671F\u683C\u5F0F");
          return y.setHours(f, m, p), y;
        }
      }
    }
  } else
    return new Date();
}, Sa = O;
function Va(e) {
  var t = "";
  if (typeof e == "string") {
    let r = e.split("-");
    r.length == 1 ? e = parseInt(e) : r.length == 2 ? t = e + "-01" : t = e;
    const a = $a(t);
    return ge(a);
  } else if (typeof e == "number") {
    const r = new Date();
    return r.setMonth(e - 1), ge(r);
  } else
    throw new Error("\u8BF7\u4F20\u5165\u6709\u6548\u7C7B\u578B");
}
function ge(e) {
  return e = new Date(Sa(e).getTime()), e.add(1, "month"), e.setDate(0), e.getDate();
}
const Ea = (e) => e.replace(/[^\x00-\xff]/g, "**").length, Qa = (e, t) => (r, a) => r.trim().split(`
`).map((c) => {
  const f = c.trim();
  return f.startsWith("//") ? "" : f;
}).filter((c) => !!c).map((c) => {
  const [f, m, ...p] = c.split(/\s+/), y = {
    minWidth: Ea(m) * 7 + 45,
    key: f,
    title: m,
    visible: !1,
    sum: !1
  };
  p.forEach((n) => {
    if (["center", "left"].includes(n))
      y.align = n;
    else if (/^(\+|\-)?(\d+)$/.test(n)) {
      const s = RegExp.$1, o = parseInt(RegExp.$2);
      s === "+" ? y.maxWidth = o : s === "-" ? y.minWidth = o : y.width = o;
    } else if (["show", "hide"].includes(n))
      y.visible = n == "show";
    else if (n === "__sum__")
      y.sum = !0;
    else if (n.startsWith("#"))
      n == "#" ? y.slot = y.key : y.slot = n.substring(1);
    else {
      const s = t[n];
      s ? y.render = s : console.warn("\u672A\u5B9A\u4E49\u7684render:", n);
    }
  });
  const _ = e[f];
  return _ && Object.assign(y, _), y.getValue = function(n) {
    return y.render ? y.render(null, { row: n, column: y }, !0) : n[y.key];
  }, a ? a(y, c) : y;
});
export {
  P as AError,
  ja as BPromise,
  x as Date2,
  ye as Math2,
  O as all2date,
  Ya as all2valueName,
  za as byteArrayToString,
  qa as encodeStringToGBK,
  Ga as firstLetterUppercase,
  Ra as fromGBKArrayToString,
  Ka as getByteLength,
  ge as getDayLengthInMonth,
  Va as getDayMountByMonth,
  xe as isPlainObject,
  Ha as makeTreeDataHelper,
  Sa as parse2date,
  ke as preppendZero,
  As as promiseMap,
  Ss as randomString,
  $s as safeBindToObject,
  Ba as safeJsonParser,
  Xa as safeParseNumber,
  Za as safeStringify,
  La as safeValueInList,
  Wa as safeValueInRange,
  Ja as stripAndFixNumber,
  Ta as stripNumber,
  Ua as stripString,
  fe as travelTree,
  Pa as treeEach,
  Y as tryGet,
  Qa as viewuiColumnFactory
};
