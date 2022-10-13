var Ee = Object.defineProperty;
var Fe = (e, t, r) => t in e ? Ee(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _ = (e, t, r) => (Fe(e, typeof t != "symbol" ? t + "" : t, r), r);
function ue(e, t) {
  this.flags = e, this.cursor = t;
}
ue.prototype = {
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
function B(e, t) {
  return new ue(e, t);
}
function ce(e) {
  this.xs = [e], this.top = 0;
}
ce.prototype = {
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
function G(e) {
  return new ce(e);
}
function fe() {
  this.depth = 0, this.stack = G({ node: null, index: -1 });
}
fe.prototype = {
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
function le() {
  return new fe();
}
function he() {
  this.break = !1, this.skip = !1, this.remove = !1, this.replace = null;
}
he.prototype = {
  reset: function() {
    this.break = !1, this.skip = !1, this.remove = !1, this.replace = null;
  }
};
function q() {
  return new he();
}
function L(e) {
  return e && e.length !== 0;
}
function Ae(e, t, r) {
  for (var n = q(), s = le(), i = B(n, s), c = G(e), l = Object.assign({}, e); !c.isEmpty(); ) {
    var f = c.pop();
    if (f === l) {
      s.moveUp();
      continue;
    }
    if (n.reset(), t(f, i), n.break)
      break;
    if (!n.remove && (s.moveNext(), !n.skip)) {
      n.replace && (f = n.replace);
      var h = r(f);
      L(h) && (c.push(l), c.pushArrayReverse(h), s.moveDown(f));
    }
  }
}
function Te(e, t, r) {
  for (var n = q(), s = le(), i = B(n, s), c = G(e), l = G(null); !c.isEmpty(); ) {
    var f = c.peek(), h = l.peek(), b = r(f);
    if (n.reset(), f === h || !L(b)) {
      if (f === h && (l.pop(), s.moveUp()), c.pop(), t(f, i), n.break)
        break;
      if (n.remove)
        continue;
      s.moveNext();
    } else
      l.push(f), s.moveDown(f), c.pushArrayReverse(b);
  }
}
var De = 32768;
function pe(e) {
  this.xs = [e], this.top = 0, this.maxLength = 0;
}
pe.prototype = {
  enqueue: function(t) {
    this.xs.push(t);
  },
  enqueueMultiple: function(t) {
    for (var r = 0, n = t.length; r < n; r++)
      this.enqueue(t[r]);
  },
  dequeue: function() {
    var t = this.peek();
    return this.top++, this.top === De && (this.xs = this.xs.slice(this.top), this.top = 0), t;
  },
  peek: function() {
    return this.xs[this.top];
  },
  isEmpty: function() {
    return this.top === this.xs.length;
  }
};
function ve(e) {
  return new pe(e);
}
function de() {
  this.depth = 0, this.index = -1, this.queue = ve({ node: null, arity: 1 }), this.levelNodes = 1, this.nextLevelNodes = 0;
}
de.prototype = {
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
function Ge() {
  return new de();
}
function Pe(e, t, r) {
  for (var n = q(), s = Ge(), i = B(n, s), c = ve(e); !c.isEmpty(); ) {
    var l = c.dequeue();
    if (n.reset(), t(l, i), n.break)
      break;
    if (!n.remove && (s.moveNext(), n.replace && (l = n.replace), !n.skip)) {
      var f = r(l);
      L(f) && (c.enqueueMultiple(f), s.store(l, f.length));
    }
    s.moveForward();
  }
}
var Oe = function(t) {
  return t.children;
};
function Ie(e, t, r) {
  if (e != null) {
    r = r || {};
    var n = r.order || "pre", s = r.getChildren || Oe;
    n === "pre" ? Ae(e, t, s) : n === "post" ? Te(e, t, s) : n === "bfs" && Pe(e, t, s);
  }
}
var A = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function je(e) {
  for (var t = -1, r = e == null ? 0 : e.length, n = 0, s = []; ++t < r; ) {
    var i = e[t];
    i && (s[n++] = i);
  }
  return s;
}
var Me = je, Be = Array.isArray, z = Be, qe = typeof A == "object" && A && A.Object === Object && A, Le = qe, ze = Le, He = typeof self == "object" && self && self.Object === Object && self, Re = ze || He || Function("return this")(), H = Re, Ue = H, Ke = Ue.Symbol, R = Ke, X = R, ge = Object.prototype, Je = ge.hasOwnProperty, Qe = ge.toString, k = X ? X.toStringTag : void 0;
function Ve(e) {
  var t = Je.call(e, k), r = e[k];
  try {
    e[k] = void 0;
    var n = !0;
  } catch {
  }
  var s = Qe.call(e);
  return n && (t ? e[k] = r : delete e[k]), s;
}
var Xe = Ve, Ye = Object.prototype, Ze = Ye.toString;
function We(e) {
  return Ze.call(e);
}
var et = We, Y = R, tt = Xe, rt = et, nt = "[object Null]", st = "[object Undefined]", Z = Y ? Y.toStringTag : void 0;
function at(e) {
  return e == null ? e === void 0 ? st : nt : Z && Z in Object(e) ? tt(e) : rt(e);
}
var _e = at;
function it(e) {
  return e != null && typeof e == "object";
}
var ot = it, ut = _e, ct = ot, ft = "[object Symbol]";
function lt(e) {
  return typeof e == "symbol" || ct(e) && ut(e) == ft;
}
var U = lt, ht = z, pt = U, vt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, dt = /^\w*$/;
function gt(e, t) {
  if (ht(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || pt(e) ? !0 : dt.test(e) || !vt.test(e) || t != null && e in Object(t);
}
var _t = gt;
function mt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var me = mt, yt = _e, bt = me, $t = "[object AsyncFunction]", Ct = "[object Function]", xt = "[object GeneratorFunction]", wt = "[object Proxy]";
function St(e) {
  if (!bt(e))
    return !1;
  var t = yt(e);
  return t == Ct || t == xt || t == $t || t == wt;
}
var Nt = St, kt = H, Et = kt["__core-js_shared__"], Ft = Et, M = Ft, W = function() {
  var e = /[^.]+$/.exec(M && M.keys && M.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function At(e) {
  return !!W && W in e;
}
var Tt = At, Dt = Function.prototype, Gt = Dt.toString;
function Pt(e) {
  if (e != null) {
    try {
      return Gt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ot = Pt, It = Nt, jt = Tt, Mt = me, Bt = Ot, qt = /[\\^$.*+?()[\]{}|]/g, Lt = /^\[object .+?Constructor\]$/, zt = Function.prototype, Ht = Object.prototype, Rt = zt.toString, Ut = Ht.hasOwnProperty, Kt = RegExp(
  "^" + Rt.call(Ut).replace(qt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Jt(e) {
  if (!Mt(e) || jt(e))
    return !1;
  var t = It(e) ? Kt : Lt;
  return t.test(Bt(e));
}
var Qt = Jt;
function Vt(e, t) {
  return e == null ? void 0 : e[t];
}
var Xt = Vt, Yt = Qt, Zt = Xt;
function Wt(e, t) {
  var r = Zt(e, t);
  return Yt(r) ? r : void 0;
}
var ye = Wt, er = ye, tr = er(Object, "create"), O = tr, ee = O;
function rr() {
  this.__data__ = ee ? ee(null) : {}, this.size = 0;
}
var nr = rr;
function sr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ar = sr, ir = O, or = "__lodash_hash_undefined__", ur = Object.prototype, cr = ur.hasOwnProperty;
function fr(e) {
  var t = this.__data__;
  if (ir) {
    var r = t[e];
    return r === or ? void 0 : r;
  }
  return cr.call(t, e) ? t[e] : void 0;
}
var lr = fr, hr = O, pr = Object.prototype, vr = pr.hasOwnProperty;
function dr(e) {
  var t = this.__data__;
  return hr ? t[e] !== void 0 : vr.call(t, e);
}
var gr = dr, _r = O, mr = "__lodash_hash_undefined__";
function yr(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = _r && t === void 0 ? mr : t, this;
}
var br = yr, $r = nr, Cr = ar, xr = lr, wr = gr, Sr = br;
function w(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
w.prototype.clear = $r;
w.prototype.delete = Cr;
w.prototype.get = xr;
w.prototype.has = wr;
w.prototype.set = Sr;
var Nr = w;
function kr() {
  this.__data__ = [], this.size = 0;
}
var Er = kr;
function Fr(e, t) {
  return e === t || e !== e && t !== t;
}
var Ar = Fr, Tr = Ar;
function Dr(e, t) {
  for (var r = e.length; r--; )
    if (Tr(e[r][0], t))
      return r;
  return -1;
}
var I = Dr, Gr = I, Pr = Array.prototype, Or = Pr.splice;
function Ir(e) {
  var t = this.__data__, r = Gr(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : Or.call(t, r, 1), --this.size, !0;
}
var jr = Ir, Mr = I;
function Br(e) {
  var t = this.__data__, r = Mr(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var qr = Br, Lr = I;
function zr(e) {
  return Lr(this.__data__, e) > -1;
}
var Hr = zr, Rr = I;
function Ur(e, t) {
  var r = this.__data__, n = Rr(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var Kr = Ur, Jr = Er, Qr = jr, Vr = qr, Xr = Hr, Yr = Kr;
function S(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
S.prototype.clear = Jr;
S.prototype.delete = Qr;
S.prototype.get = Vr;
S.prototype.has = Xr;
S.prototype.set = Yr;
var Zr = S, Wr = ye, en = H, tn = Wr(en, "Map"), rn = tn, te = Nr, nn = Zr, sn = rn;
function an() {
  this.size = 0, this.__data__ = {
    hash: new te(),
    map: new (sn || nn)(),
    string: new te()
  };
}
var on = an;
function un(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var cn = un, fn = cn;
function ln(e, t) {
  var r = e.__data__;
  return fn(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var j = ln, hn = j;
function pn(e) {
  var t = hn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var vn = pn, dn = j;
function gn(e) {
  return dn(this, e).get(e);
}
var _n = gn, mn = j;
function yn(e) {
  return mn(this, e).has(e);
}
var bn = yn, $n = j;
function Cn(e, t) {
  var r = $n(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var xn = Cn, wn = on, Sn = vn, Nn = _n, kn = bn, En = xn;
function N(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
N.prototype.clear = wn;
N.prototype.delete = Sn;
N.prototype.get = Nn;
N.prototype.has = kn;
N.prototype.set = En;
var Fn = N, be = Fn, An = "Expected a function";
function K(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(An);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(s))
      return i.get(s);
    var c = e.apply(this, n);
    return r.cache = i.set(s, c) || i, c;
  };
  return r.cache = new (K.Cache || be)(), r;
}
K.Cache = be;
var Tn = K, Dn = Tn, Gn = 500;
function Pn(e) {
  var t = Dn(e, function(n) {
    return r.size === Gn && r.clear(), n;
  }), r = t.cache;
  return t;
}
var On = Pn, In = On, jn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Mn = /\\(\\)?/g, Bn = In(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(jn, function(r, n, s, i) {
    t.push(s ? i.replace(Mn, "$1") : n || r);
  }), t;
}), qn = Bn;
function Ln(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var zn = Ln, re = R, Hn = zn, Rn = z, Un = U, Kn = 1 / 0, ne = re ? re.prototype : void 0, se = ne ? ne.toString : void 0;
function $e(e) {
  if (typeof e == "string")
    return e;
  if (Rn(e))
    return Hn(e, $e) + "";
  if (Un(e))
    return se ? se.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Kn ? "-0" : t;
}
var Jn = $e, Qn = Jn;
function Vn(e) {
  return e == null ? "" : Qn(e);
}
var Xn = Vn, Yn = z, Zn = _t, Wn = qn, es = Xn;
function ts(e, t) {
  return Yn(e) ? e : Zn(e, t) ? [e] : Wn(es(e));
}
var rs = ts, ns = U, ss = 1 / 0;
function as(e) {
  if (typeof e == "string" || ns(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -ss ? "-0" : t;
}
var is = as, os = rs, us = is;
function cs(e, t) {
  t = os(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[us(t[r++])];
  return r && r == n ? e : void 0;
}
var fs = cs, ls = fs;
function hs(e, t, r) {
  var n = e == null ? void 0 : ls(e, t);
  return n === void 0 ? r : n;
}
var ps = hs;
function vs(e) {
  return e == null;
}
var ds = vs;
const ks = function(e, t = {}) {
  let r = {}, n = [], s = [], i = {};
  const c = function() {
    r = {}, n = [], s = [], i = {};
  };
  c();
  let {
    childrenKey: l = "children",
    checkedKey: f = "checked",
    idKey: h = "id"
  } = t, b = 0, v = 0;
  const E = function(a = {}) {
    l = a.childrenKey || l, f = a.checkedKey || f, h = a.idKey || h;
  }, p = function(a, o) {
    a.forEach(function(u) {
      const d = u[h];
      r[d] = u, u = { ...u }, s.push(u), u.parent = o, u.index = b++;
      const x = o ? o.deepth + 1 : 0;
      u.deepth = x, v = Math.max(v, x), u.path = o ? o.path + "." + u[h] : "0", u.parentIdList = o ? [...o.parentIdList, o[h]] : [], i[d] = u, u[l] && u[l].length > 0 && p(u[l], u);
    });
  }, m = function(a) {
    return a[l] && a[l].length > 0 ? !a[l].map((u) => g(u[h])).find((u) => !u[f]) : !1;
  }, y = function(a) {
    c(), Array.isArray(a) && p(a);
  };
  y(e);
  const Ce = function(a) {
    var o;
    return (o = g(a)) == null ? void 0 : o.parentIdList.map((u) => g(u));
  }, xe = function(a) {
    const o = g(a);
    return s.filter(function(u) {
      return u.parent === (o == null ? void 0 : o.parent);
    });
  }, J = function(a) {
    let o;
    if (!a)
      return console.warn("id\u4E0D\u80FD\u4E3A\u7A7A"), null;
    if (a instanceof Object)
      o = a[h];
    else if (typeof a == "string" || typeof a == "number")
      o = a;
    else
      return console.warn("id\u7C7B\u578B\u975E\u6CD5:", a), null;
    return o;
  }, g = function(a) {
    const o = J(a);
    return o ? i[o] : null;
  }, Q = function(a) {
    const o = J(a);
    return o ? r[o] : null;
  }, we = function(a) {
    const o = g(a);
    return o == null ? void 0 : o.deepth;
  }, Se = function(a, o) {
    const u = g(a);
    u && Object.assign(u, o);
  }, Ne = function(a, o, u = !1) {
    const d = g(a);
    d && (d[f] = o, u && (d.parentIdList.forEach((x) => {
      const V = i[x];
      V[f] = m(V);
    }), F(d, function(x) {
      x[f] = o;
    })));
  }, ke = function(a) {
    const o = {};
    a && a.forEach((u) => {
      o[u] = !0;
    }), s.forEach((u) => {
      u[f] = o[u[h]] || !1;
    });
  }, F = function(a, o) {
    const u = g(a);
    if (u)
      o(u), u[l] && u[l].length > 0 && u[l].forEach(function(d) {
        F(d, o);
      });
    else
      throw new Error("\u8282\u70B9\u4E0D\u5B58\u5728:" + a);
  };
  return {
    travelNode: F,
    getNodeList: (a = !0) => a ? [...s] : [...n],
    getNodeDescendantList: (a) => {
      const o = [];
      return F(a, function(u) {
        o.push(u);
      }), o;
    },
    getNodeListByFilter: (a) => s.filter(a),
    getMinDeepth: function() {
      let a = v;
      for (const o in s) {
        const u = s[o];
        if (u.checked && (a = Math.min(a, u.deepth)), a === 0)
          return 0;
      }
      return a;
    },
    getSublings: xe,
    getParents: Ce,
    getDeepth: we,
    getNode: g,
    updateIndexes: y,
    setChecked: Ne,
    setProps: Se,
    travelAllNode: function(a) {
      for (const o in s) {
        const u = s[o], d = Q(u[h]);
        if (a(u, d) === !1)
          break;
      }
    },
    setOptions: E,
    resetCheckStatus: ke,
    getOriginNode: Q
  };
}, ae = function(e, t, r = "children", n = "id", s = [], i = { flag: !1 }) {
  if (e instanceof Array) {
    ae({ [r]: e }, t, r, n, s);
    return;
  }
  const c = (e == null ? void 0 : e[r]) || [];
  for (let l = 0; l < c.length; l++) {
    const f = c[l];
    if (!t(f, s, r, n)) {
      i.flag = !0;
      break;
    }
    if (f[r] instanceof Array && ae(f[r], t, r, n, [f, ...s], i), i.flag)
      break;
  }
}, D = function(e, t, r = null, n = !1) {
  if (typeof t == "string" && (t = t.split(",")), !!Array.isArray(t)) {
    for (let s = 0; s < t.length; s++) {
      const i = t[s], c = ps(e, i);
      if (n ? ds(c) : !!c)
        return c;
    }
    return r;
  }
}, gs = function(e, t, r, n = "_", s = 0) {
  e[t] ? s < 5 && gs(e, n + t, r, n, s + 1) : e[t] = r;
}, Es = function(e, t, r) {
  let n = !1;
  return Array.isArray(e) && (e = { [t]: e }, n = !0), Ie(
    e,
    r,
    {
      getChildren(s) {
        return s[t];
      }
    }
  ), n ? e[t] : e;
}, Fs = function(e, t = /\s+/, r = ["0, \u8BF7\u63D0\u4F9Boptions"], n = null, s = ",", i = "name", c = "value", l = !1) {
  let f, h;
  typeof e == "function" && (h = e()), typeof e == "string" ? f = e.split(t).map((v) => v.trim()) : Array.isArray(e) ? f = e : Array.isArray(r) ? f = r : typeof r == "function" ? h = r() : f = [{
    name: "\u8BF7\u901A\u8FC7optionLs\u4F20\u5165\u6570\u7EC4\u6216\u8005\u5F02\u6B65\u51FD\u6570",
    value: -1
  }];
  const b = function(v) {
    typeof n == "function" && (v = v.map((p) => {
      let [m, y] = n(p, {
        valueField: c,
        nameField: i
      }, D);
      return { value: m, name: y };
    }));
    let E = Me(v);
    return E.length != v.length && console.warn("options\u4E2D\u5B58\u5728\u7A7A\u9009\u9879", v), v = E, v = v.map((p) => {
      if ((typeof p == "string" || typeof p == "number") && (p = (p + "").split(s).map((m) => m.trim())), Array.isArray(p)) {
        let [m, y] = p;
        return y === void 0 && (y = m), { value: m, name: y };
      } else
        return p ? {
          name: D(p, i),
          value: D(p, c)
        } : {
          name: "\u65E0\u6548options",
          value: "-"
        };
    }), v.forEach((p) => {
      typeof p.value != "number" && typeof p.value != "string" && (p.value = p.value + "");
    }), v;
  };
  return f ? b(f) : h.then((v) => b(v));
};
function _s(...e) {
  let t;
  Array.isArray(arguments[0]) ? t = arguments[0] : t = Array.prototype.slice.call(arguments);
  let r = [];
  return t.reduce(
    function(n, s, i, c) {
      return n.then(function() {
        if (typeof s == "function")
          try {
            s = s();
          } catch (l) {
            return c.splice(1), Promise.reject(l);
          }
        else
          console.warn("map element:" + i + " not function");
        return s.then((l) => {
          r[i] = l;
        });
      });
    },
    Promise.resolve(r)
  ).then(function() {
    return r;
  });
}
class As extends Promise {
  constructor(r = void 0) {
    let n, s;
    super((i, c) => {
      n = i, s = c, r && r(i, c);
    });
    _(this, "__resolve");
    _(this, "__reject");
    this.__resolve = n, this.__reject = s;
  }
  static map(r) {
    return _s(r);
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
const P = class {
  static get fastGbk() {
    if (!this._fastGbk)
      throw new Error("\u8BF7\u5148\u8C03\u7528setFaskGbk\u65B9\u6CD5\u8BBE\u7F6EfastGbk::$GBK.setFaskGbk(require('fast-gbk'))");
    return this._fastGbk;
  }
  static setFaskGbk(t) {
    this._fastGbk = t;
  }
  static encode(t) {
    return P.fastGbk.encode(t);
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
        const n = t.map((s) => {
          typeof s == "number" && (console.warn("decodeGBK\u4F20\u5165\u7684\u6570\u7EC4\u4E2D\u6709number\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u8FD9\u662F\u4E0D\u5141\u8BB8\u7684\uFF0C\u4F1A\u5BFC\u81F4\u89E3\u7801\u9519\u8BEF"), s = s + "");
          let i = parseInt(s, 16);
          return isNaN(i) ? 0 : i;
        });
        r = P.decode(n);
      }
    return r;
  }
};
let C = P;
_(C, "_fastGbk");
const ie = /* @__PURE__ */ new Map();
function Ts(e) {
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
function Ds(e, t) {
  if (!e || !t)
    return "";
  var r = 0, n = 0, s = "";
  for (n = 0; n < e.length; n++) {
    if (e.charCodeAt(n) > 255 ? r += 2 : r++, r > t)
      return s;
    s += e.charAt(n);
  }
  return e;
}
const ms = () => {
  let e = Math.random().toString(32).substr(2);
  return ie.get(e) ? ms() : (ie.set(e, !0), e);
};
function ys(e) {
  return C.decode(e);
}
function Gs(e) {
  return C.decode(e);
}
function Ps(e, t = "utf-8", r = 16) {
  return t.toLowerCase() == "gbk" && r == 16 ? ys(e) : new TextDecoder(t).decode(
    new Uint8Array(
      e.map((n) => Number.isFinite(n) ? n : parseInt(n, r))
    )
  );
}
function Os(e, t = "string") {
  return t == "string" ? C.encode(e) : C.encode(e).split("%").splice(1);
}
function Is(e) {
  for (var t = 0, r = 0; r < e.length; r++) {
    var n = e.charCodeAt(r);
    n >= 1 && n <= 126 || 65376 <= n && n <= 65439 ? t++ : t += 2;
  }
  return t;
}
const bs = /\:\:([-\d\.]+)$/, $ = class {
  constructor(t, r, n = !1, s = null) {
    _(this, "_name");
    _(this, "_code");
    _(this, "_silent");
    const i = this;
    i._name = t, i._code = r, i._silent = n;
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
    const n = `${t}-${r ? "0" : "1"}`;
    let s = oe[n];
    if (!s) {
      let i, c;
      bs.test(t) ? (i = RegExp.$1, c = t.replace(`::${i}`, "")) : (i = 0, c = t), s = new $(c, i, r), oe[n] = s;
    }
    return s;
  }
  static create(t, r = !1) {
    return this.fromObject(t, r);
  }
  static getErrorCode(t) {
    return t ? t.constructor == $ ? t._code : this.fromObject(t)._code : 0;
  }
};
let T = $;
_(T, "nameFieldList", ["error", "message", "msg", "errMsg", "reason", "errorText"]), _(T, "fromObject", (t, r = !1) => {
  const n = $;
  if (!t)
    return new $("\u672A\u77E5\u9519\u8BEF", -9999);
  let s;
  if (t instanceof Error)
    return n.fromErrorText(t.message, r);
  if (typeof t == "string")
    if (/^(\[|\{)/.test(t))
      try {
        t = JSON.parse(t);
      } catch {
        s = t;
      }
    else
      s = t;
  else
    s = D(t, $.nameFieldList), r || (r = t.silence || t.silent);
  return !s && t.data ? n.fromObject(t.data) : n.fromErrorText(s, r);
});
const oe = {};
export {
  T as AError,
  As as BPromise,
  Fs as all2valueName,
  Ps as byteArrayToString,
  Os as encodeStringToGBK,
  Ts as firstLetterUppercase,
  Gs as fromGBKArrayToString,
  Is as getByteLength,
  ks as makeTreeDataHelper,
  _s as promiseMap,
  ms as randomString,
  gs as safeBindToObject,
  Ds as stripString,
  ae as travelTree,
  Es as treeEach,
  D as tryGet
};
