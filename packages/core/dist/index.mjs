var ze = Object.defineProperty;
var Ke = (e, t, r) => t in e ? ze(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var y = (e, t, r) => (Ke(e, typeof t != "symbol" ? t + "" : t, r), r);
import b from "dayjs";
import { default as $a } from "dayjs";
function be(e, t) {
  this.flags = e, this.cursor = t;
}
be.prototype = {
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
function V(e, t) {
  return new be(e, t);
}
function De(e) {
  this.xs = [e], this.top = 0;
}
De.prototype = {
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
  return new De(e);
}
function Me() {
  this.depth = 0, this.stack = B({ node: null, index: -1 });
}
Me.prototype = {
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
function we() {
  return new Me();
}
function Ce() {
  this.break = !1, this.skip = !1, this.remove = !1, this.replace = null;
}
Ce.prototype = {
  reset: function() {
    this.break = !1, this.skip = !1, this.remove = !1, this.replace = null;
  }
};
function X() {
  return new Ce();
}
function J(e) {
  return e && e.length !== 0;
}
function We(e, t, r) {
  for (var n = X(), s = we(), i = V(n, s), a = B(e), u = Object.assign({}, e); !a.isEmpty(); ) {
    var o = a.pop();
    if (o === u) {
      s.moveUp();
      continue;
    }
    if (n.reset(), t(o, i), n.break)
      break;
    if (!n.remove && (s.moveNext(), !n.skip)) {
      n.replace && (o = n.replace);
      var c = r(o);
      J(c) && (a.push(u), a.pushArrayReverse(c), s.moveDown(o));
    }
  }
}
function Ve(e, t, r) {
  for (var n = X(), s = we(), i = V(n, s), a = B(e), u = B(null); !a.isEmpty(); ) {
    var o = a.peek(), c = u.peek(), l = r(o);
    if (n.reset(), o === c || !J(l)) {
      if (o === c && (u.pop(), s.moveUp()), a.pop(), t(o, i), n.break)
        break;
      if (n.remove)
        continue;
      s.moveNext();
    } else
      u.push(o), s.moveDown(o), a.pushArrayReverse(l);
  }
}
var Xe = 32768;
function Ie(e) {
  this.xs = [e], this.top = 0, this.maxLength = 0;
}
Ie.prototype = {
  enqueue: function(t) {
    this.xs.push(t);
  },
  enqueueMultiple: function(t) {
    for (var r = 0, n = t.length; r < n; r++)
      this.enqueue(t[r]);
  },
  dequeue: function() {
    var t = this.peek();
    return this.top++, this.top === Xe && (this.xs = this.xs.slice(this.top), this.top = 0), t;
  },
  peek: function() {
    return this.xs[this.top];
  },
  isEmpty: function() {
    return this.top === this.xs.length;
  }
};
function Fe(e) {
  return new Ie(e);
}
function xe() {
  this.depth = 0, this.index = -1, this.queue = Fe({ node: null, arity: 1 }), this.levelNodes = 1, this.nextLevelNodes = 0;
}
xe.prototype = {
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
function Je() {
  return new xe();
}
function Ze(e, t, r) {
  for (var n = X(), s = Je(), i = V(n, s), a = Fe(e); !a.isEmpty(); ) {
    var u = a.dequeue();
    if (n.reset(), t(u, i), n.break)
      break;
    if (!n.remove && (s.moveNext(), n.replace && (u = n.replace), !n.skip)) {
      var o = r(u);
      J(o) && (a.enqueueMultiple(o), s.store(u, o.length));
    }
    s.moveForward();
  }
}
var Qe = function(t) {
  return t.children;
};
function et(e, t, r) {
  if (e != null) {
    r = r || {};
    var n = r.order || "pre", s = r.getChildren || Qe;
    n === "pre" ? We(e, t, s) : n === "post" ? Ve(e, t, s) : n === "bfs" && Ze(e, t, s);
  }
}
var E = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tt(e) {
  for (var t = -1, r = e == null ? 0 : e.length, n = 0, s = []; ++t < r; ) {
    var i = e[t];
    i && (s[n++] = i);
  }
  return s;
}
var rt = tt, nt = Array.isArray, Z = nt, st = typeof E == "object" && E && E.Object === Object && E, it = st, at = it, ot = typeof self == "object" && self && self.Object === Object && self, ut = at || ot || Function("return this")(), Q = ut, ct = Q, ft = ct.Symbol, ee = ft, ne = ee, Se = Object.prototype, lt = Se.hasOwnProperty, ht = Se.toString, N = ne ? ne.toStringTag : void 0;
function pt(e) {
  var t = lt.call(e, N), r = e[N];
  try {
    e[N] = void 0;
    var n = !0;
  } catch {
  }
  var s = ht.call(e);
  return n && (t ? e[N] = r : delete e[N]), s;
}
var dt = pt, gt = Object.prototype, vt = gt.toString;
function mt(e) {
  return vt.call(e);
}
var yt = mt, se = ee, _t = dt, $t = yt, bt = "[object Null]", Dt = "[object Undefined]", ie = se ? se.toStringTag : void 0;
function Mt(e) {
  return e == null ? e === void 0 ? Dt : bt : ie && ie in Object(e) ? _t(e) : $t(e);
}
var Ee = Mt;
function wt(e) {
  return e != null && typeof e == "object";
}
var Ct = wt, It = Ee, Ft = Ct, xt = "[object Symbol]";
function St(e) {
  return typeof e == "symbol" || Ft(e) && It(e) == xt;
}
var R = St, Et = Z, Tt = R, At = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Yt = /^\w*$/;
function kt(e, t) {
  if (Et(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Tt(e) ? !0 : Yt.test(e) || !At.test(e) || t != null && e in Object(t);
}
var Nt = kt;
function Ot(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var q = Ot, Lt = Ee, Pt = q, Gt = "[object AsyncFunction]", jt = "[object Function]", Bt = "[object GeneratorFunction]", Ht = "[object Proxy]";
function Rt(e) {
  if (!Pt(e))
    return !1;
  var t = Lt(e);
  return t == jt || t == Bt || t == Gt || t == Ht;
}
var Te = Rt, qt = Q, Ut = qt["__core-js_shared__"], zt = Ut, W = zt, ae = function() {
  var e = /[^.]+$/.exec(W && W.keys && W.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Kt(e) {
  return !!ae && ae in e;
}
var Wt = Kt, Vt = Function.prototype, Xt = Vt.toString;
function Jt(e) {
  if (e != null) {
    try {
      return Xt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Zt = Jt, Qt = Te, er = Wt, tr = q, rr = Zt, nr = /[\\^$.*+?()[\]{}|]/g, sr = /^\[object .+?Constructor\]$/, ir = Function.prototype, ar = Object.prototype, or = ir.toString, ur = ar.hasOwnProperty, cr = RegExp(
  "^" + or.call(ur).replace(nr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function fr(e) {
  if (!tr(e) || er(e))
    return !1;
  var t = Qt(e) ? cr : sr;
  return t.test(rr(e));
}
var lr = fr;
function hr(e, t) {
  return e == null ? void 0 : e[t];
}
var pr = hr, dr = lr, gr = pr;
function vr(e, t) {
  var r = gr(e, t);
  return dr(r) ? r : void 0;
}
var Ae = vr, mr = Ae, yr = mr(Object, "create"), U = yr, oe = U;
function _r() {
  this.__data__ = oe ? oe(null) : {}, this.size = 0;
}
var $r = _r;
function br(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Dr = br, Mr = U, wr = "__lodash_hash_undefined__", Cr = Object.prototype, Ir = Cr.hasOwnProperty;
function Fr(e) {
  var t = this.__data__;
  if (Mr) {
    var r = t[e];
    return r === wr ? void 0 : r;
  }
  return Ir.call(t, e) ? t[e] : void 0;
}
var xr = Fr, Sr = U, Er = Object.prototype, Tr = Er.hasOwnProperty;
function Ar(e) {
  var t = this.__data__;
  return Sr ? t[e] !== void 0 : Tr.call(t, e);
}
var Yr = Ar, kr = U, Nr = "__lodash_hash_undefined__";
function Or(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = kr && t === void 0 ? Nr : t, this;
}
var Lr = Or, Pr = $r, Gr = Dr, jr = xr, Br = Yr, Hr = Lr;
function T(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
T.prototype.clear = Pr;
T.prototype.delete = Gr;
T.prototype.get = jr;
T.prototype.has = Br;
T.prototype.set = Hr;
var Rr = T;
function qr() {
  this.__data__ = [], this.size = 0;
}
var Ur = qr;
function zr(e, t) {
  return e === t || e !== e && t !== t;
}
var Ye = zr, Kr = Ye;
function Wr(e, t) {
  for (var r = e.length; r--; )
    if (Kr(e[r][0], t))
      return r;
  return -1;
}
var z = Wr, Vr = z, Xr = Array.prototype, Jr = Xr.splice;
function Zr(e) {
  var t = this.__data__, r = Vr(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : Jr.call(t, r, 1), --this.size, !0;
}
var Qr = Zr, en = z;
function tn(e) {
  var t = this.__data__, r = en(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var rn = tn, nn = z;
function sn(e) {
  return nn(this.__data__, e) > -1;
}
var an = sn, on = z;
function un(e, t) {
  var r = this.__data__, n = on(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var cn = un, fn = Ur, ln = Qr, hn = rn, pn = an, dn = cn;
function A(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
A.prototype.clear = fn;
A.prototype.delete = ln;
A.prototype.get = hn;
A.prototype.has = pn;
A.prototype.set = dn;
var gn = A, vn = Ae, mn = Q, yn = vn(mn, "Map"), _n = yn, ue = Rr, $n = gn, bn = _n;
function Dn() {
  this.size = 0, this.__data__ = {
    hash: new ue(),
    map: new (bn || $n)(),
    string: new ue()
  };
}
var Mn = Dn;
function wn(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Cn = wn, In = Cn;
function Fn(e, t) {
  var r = e.__data__;
  return In(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var K = Fn, xn = K;
function Sn(e) {
  var t = xn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var En = Sn, Tn = K;
function An(e) {
  return Tn(this, e).get(e);
}
var Yn = An, kn = K;
function Nn(e) {
  return kn(this, e).has(e);
}
var On = Nn, Ln = K;
function Pn(e, t) {
  var r = Ln(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var Gn = Pn, jn = Mn, Bn = En, Hn = Yn, Rn = On, qn = Gn;
function Y(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Y.prototype.clear = jn;
Y.prototype.delete = Bn;
Y.prototype.get = Hn;
Y.prototype.has = Rn;
Y.prototype.set = qn;
var Un = Y, ke = Un, zn = "Expected a function";
function te(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(zn);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(s))
      return i.get(s);
    var a = e.apply(this, n);
    return r.cache = i.set(s, a) || i, a;
  };
  return r.cache = new (te.Cache || ke)(), r;
}
te.Cache = ke;
var Kn = te, Wn = Kn, Vn = 500;
function Xn(e) {
  var t = Wn(e, function(n) {
    return r.size === Vn && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Jn = Xn, Zn = Jn, Qn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, es = /\\(\\)?/g, ts = Zn(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Qn, function(r, n, s, i) {
    t.push(s ? i.replace(es, "$1") : n || r);
  }), t;
}), rs = ts;
function ns(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var ss = ns, ce = ee, is = ss, as = Z, os = R, us = 1 / 0, fe = ce ? ce.prototype : void 0, le = fe ? fe.toString : void 0;
function Ne(e) {
  if (typeof e == "string")
    return e;
  if (as(e))
    return is(e, Ne) + "";
  if (os(e))
    return le ? le.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -us ? "-0" : t;
}
var cs = Ne, fs = cs;
function ls(e) {
  return e == null ? "" : fs(e);
}
var hs = ls, ps = Z, ds = Nt, gs = rs, vs = hs;
function ms(e, t) {
  return ps(e) ? e : ds(e, t) ? [e] : gs(vs(e));
}
var ys = ms, _s = R, $s = 1 / 0;
function bs(e) {
  if (typeof e == "string" || _s(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -$s ? "-0" : t;
}
var Ds = bs, Ms = ys, ws = Ds;
function Cs(e, t) {
  t = Ms(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[ws(t[r++])];
  return r && r == n ? e : void 0;
}
var Is = Cs, Fs = Is;
function xs(e, t, r) {
  var n = e == null ? void 0 : Fs(e, t);
  return n === void 0 ? r : n;
}
var Ss = xs;
function Es(e) {
  return e == null;
}
var Ts = Es;
const Wi = function(e, t = {}) {
  let r = {}, n = [], s = [], i = {};
  const a = function() {
    r = {}, n = [], s = [], i = {};
  };
  a();
  let {
    childrenKey: u = "children",
    checkedKey: o = "checked",
    idKey: c = "id"
  } = t, l = 0, m = 0;
  const d = function(f = {}) {
    u = f.childrenKey || u, o = f.checkedKey || o, c = f.idKey || c;
  }, v = function(f, h) {
    f.forEach(function(p) {
      const g = p[c];
      r[g] = p, p = { ...p }, s.push(p), p.parent = h, p.index = l++;
      const $ = h ? h.deepth + 1 : 0;
      p.deepth = $, m = Math.max(m, $), p.path = h ? h.path + "." + p[c] : "0", p.parentIdList = h ? [...h.parentIdList, h[c]] : [], i[g] = p, p[u] && p[u].length > 0 && v(p[u], p);
    });
  }, D = function(f) {
    return f[u] && f[u].length > 0 ? !f[u].map((p) => _(p[c])).find((p) => !p[o]) : !1;
  }, M = function(f) {
    a(), Array.isArray(f) && v(f);
  };
  M(e);
  const F = function(f) {
    var h;
    return (h = _(f)) == null ? void 0 : h.parentIdList.map((p) => _(p));
  }, L = function(f) {
    const h = _(f);
    return s.filter(function(p) {
      return p.parent === (h == null ? void 0 : h.parent);
    });
  }, w = function(f) {
    let h;
    if (!f)
      return console.warn("id\u4E0D\u80FD\u4E3A\u7A7A"), null;
    if (f instanceof Object)
      h = f[c];
    else if (typeof f == "string" || typeof f == "number")
      h = f;
    else
      return console.warn("id\u7C7B\u578B\u975E\u6CD5:", f), null;
    return h;
  }, _ = function(f) {
    const h = w(f);
    return h ? i[h] : null;
  }, re = function(f) {
    const h = w(f);
    return h ? r[h] : null;
  }, He = function(f) {
    const h = _(f);
    return h == null ? void 0 : h.deepth;
  }, Re = function(f, h) {
    const p = _(f);
    p && Object.assign(p, h);
  }, qe = function(f, h, p = !1) {
    const g = _(f);
    g && (g[o] = h, p && (g.parentIdList.forEach(($) => {
      const k = i[$];
      k[o] = D(k);
    }), P(g, function($) {
      $[o] = h;
    })));
  }, Ue = function(f) {
    const h = {};
    f && f.forEach((p) => {
      h[p] = !0;
    }), s.forEach((p) => {
      p[o] = h[p[c]] || !1;
    });
  }, P = function(f, h, p = []) {
    const g = _(f);
    if (g)
      h(g), p.push(g), g[u] && g[u].length > 0 && g[u].forEach(function($) {
        P($, h, p);
      });
    else
      throw new Error("\u8282\u70B9\u4E0D\u5B58\u5728:" + f);
    return p;
  };
  return {
    travelNode: P,
    getNodeList: (f = !0) => f ? [...s] : [...n],
    getNodeDescendantList: (f, h = !1, p = !1) => {
      const g = [];
      return p && g.push(_(f)), P(f, function($) {
        var k;
        h && (k = $[u]) != null && k.length || g.push($);
      }), g;
    },
    getNodeListByFilter: (f) => s.filter(f),
    getMinDeepth: function() {
      let f = m;
      for (const h in s) {
        const p = s[h];
        if (p.checked && (f = Math.min(f, p.deepth)), f === 0)
          return 0;
      }
      return f;
    },
    getSublings: L,
    getParents: F,
    getDeepth: He,
    getNode: _,
    updateIndexes: M,
    setChecked: qe,
    setProps: Re,
    travelAllNode: function(f) {
      for (const h in s) {
        const p = s[h], g = re(p[c]);
        if (f(p, g) === !1)
          break;
      }
    },
    setOptions: d,
    resetCheckStatus: Ue,
    getOriginNode: re
  };
}, he = function(e, t, r = "children", n = "id", s = [], i = { flag: !1 }) {
  if (e instanceof Array)
    return he({ [r]: e }, t, r, n, s);
  const a = [], u = (e == null ? void 0 : e[r]) || [];
  for (let o = 0; o < u.length; o++) {
    const c = u[o];
    if (t && t(c, s, r, n) === !1) {
      i.flag = !0;
      break;
    }
    if (a.push(c), c[r] instanceof Array) {
      const l = he(c[r], t, r, n, [c, ...s], i);
      a.push(...l);
    }
    if (i.flag)
      break;
  }
  return a;
}, j = function(e, t, r = null, n = !1) {
  if (typeof t == "string" && (t = t.split(",")), !!Array.isArray(t)) {
    for (let s = 0; s < t.length; s++) {
      const i = t[s], a = Ss(e, i);
      if (n ? Ts(a) : !!a)
        return a;
    }
    return r;
  }
}, Oe = (e) => Object.prototype.toString.call(e) == "[object Object]", Vi = (e, t = "children", r = !1) => {
  const n = [], s = [...e];
  for (; s.length; ) {
    const i = s.shift();
    n.push(i);
    const a = i[t];
    a != null && a.length && (r && n.pop(), s.unshift(...a));
  }
  return n;
};
function As(e) {
  return e === null;
}
var pe = As;
const Ys = function(e, t, r, n = "_", s = 0) {
  e[t] ? s < 5 && Ys(e, n + t, r, n, s + 1) : e[t] = r;
}, Xi = function(e, t, r) {
  let n = !1;
  return Array.isArray(e) && (e = { [t]: e }, n = !0), et(
    e,
    r,
    {
      getChildren(s) {
        return s[t];
      }
    }
  ), n ? e[t] : e;
}, Ji = function(e, t) {
  const r = {
    valueGetField: "value",
    nameGetField: "name",
    valueSetField: "value",
    nameSetField: "name",
    spliterItemValue: ",",
    spliterBetweenItem: /\s+/,
    defaultLs: ["0, \u8BF7\u63D0\u4F9Boptions"],
    ...t || {}
  };
  let n;
  return typeof e == "function" && (n = e(r)), typeof e == "string" ? n = e.trim().split(r.spliterBetweenItem).map((i) => i.trim()) : Array.isArray(e) ? n = e : Array.isArray(r.defaultLs) ? n = r.defaultLs : typeof r.defaultLs == "function" ? n = r.defaultLs() : n = [{
    name: "\u8BF7\u901A\u8FC7optionLs\u4F20\u5165\u6570\u7EC4\u6216\u8005\u51FD\u6570",
    value: -1
  }], function(i) {
    const a = r.elFormatter;
    a && (i = i.map((o) => {
      let [c, l] = a(o, r, j);
      return { value: c, name: l };
    }));
    let u = rt(i);
    return u.length != i.length && console.warn("options\u4E2D\u5B58\u5728\u7A7A\u9009\u9879", i), i = u, i = i.map((o) => {
      typeof o == "string" ? o = (o + "").split(r.spliterItemValue).map((m) => m.trim()) : typeof o == "number" && (o = [o, o]);
      let c, l;
      if (Array.isArray(o)) {
        if ([c, l] = o, l === void 0 ? l = c : c === void 0 && (c = l), pe(c) || pe(l))
          throw "value\u548Cname\u4E0D\u80FD\u540C\u65F6\u4E3A\u7A7A";
      } else
        o ? (c = j(o, r.valueGetField), l = j(o, r.nameGetField)) : (l = "\u65E0\u6548options", c = "-");
      return {
        [r.valueSetField]: c,
        [r.nameSetField]: l
      };
    }), i.forEach((o) => {
      const c = o[r.valueSetField];
      typeof c != "number" && typeof c != "string" && (console.warn("options\u4E2D\u5B58\u5728\u975E\u6CD5\u7684value,\u9700\u8981\u662Fnumber\u6216\u8005string", o), o[r.valueSetField] = o.value + "");
    }), i;
  }(n);
}, Zi = function(e, t = null) {
  if (Oe(e) || Array.isArray(e))
    return e;
  if (typeof e != "string")
    return console.warn("safeJsonParser error", e), t;
  try {
    return JSON.parse(e);
  } catch {
    return console.log("json\u89E3\u6790\u5931\u8D25:", e), t;
  }
}, Qi = function(e, t, r = 0, n = void 0) {
  if (t.includes(e))
    return e;
  {
    let s = t[r];
    return s === void 0 && (s = n), s;
  }
};
function ea(e) {
  return new Promise(function(t, r) {
    var n = typeof e == "string" ? e : URL.createObjectURL(e);
    if (!n)
      throw new Error("Must use a valid image");
    var s = document.createElement("img");
    s.onload = () => {
      typeof e != "string" && URL.revokeObjectURL(n), t({ width: s.width, height: s.height });
    }, s.onerror = (i) => {
      typeof e != "string" && URL.revokeObjectURL(n), r(i);
    }, s.src = n;
  });
}
function ks() {
  if (typeof window > "u")
    return -1;
  const e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  if (e.indexOf("Trident/") > 0) {
    const s = e.indexOf("rv:");
    return parseInt(e.substring(s + 3, e.indexOf(".", s)), 10);
  }
  const n = e.indexOf("Edge/");
  return n > 0 ? parseInt(e.substring(n + 5, e.indexOf(".", n)), 10) : -1;
}
const ta = ks() !== -1;
function Ns(...e) {
  let t;
  Array.isArray(arguments[0]) ? t = arguments[0] : t = Array.prototype.slice.call(arguments);
  let r = [];
  return t.reduce(
    function(n, s, i, a) {
      return n.then(function() {
        if (typeof s == "function")
          try {
            s = s();
          } catch (u) {
            return a.splice(1), Promise.reject(u);
          }
        else
          console.warn("map element:" + i + " not function");
        return s.then((u) => {
          r[i] = u;
        });
      });
    },
    Promise.resolve(r)
  ).then(function() {
    return r;
  });
}
class ra extends Promise {
  constructor(r = void 0) {
    let n, s;
    super((i, a) => {
      n = i, s = a, r && r(i, a);
    });
    y(this, "__resolve");
    y(this, "__reject");
    this.__resolve = n, this.__reject = s;
  }
  static map(r) {
    return Ns(r);
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
const na = (e, t, r) => new Promise((n, s) => {
  const i = e[Symbol.iterator](), a = (u) => {
    const { value: o, done: c } = i.next();
    c ? n(u) : t(u, o, e).then(a);
  };
  a(r);
}), H = class {
  static get fastGbk() {
    if (!this._fastGbk)
      throw new Error("\u8BF7\u5148\u8C03\u7528setFaskGbk\u65B9\u6CD5\u8BBE\u7F6EfastGbk::$GBK.setFaskGbk(require('fast-gbk'))");
    return this._fastGbk;
  }
  static setFaskGbk(t) {
    this._fastGbk = t;
  }
  static encode(t) {
    return H.fastGbk.encode(t);
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
        r = H.decode(n);
      }
    return r;
  }
};
let I = H;
y(I, "_fastGbk");
const de = /* @__PURE__ */ new Map();
function sa(e) {
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
const Os = () => {
  let e = Math.random().toString(32).substr(2);
  return de.get(e) ? Os() : (de.set(e, !0), e);
};
function Ls(e) {
  return I.decode(e);
}
function ia(e) {
  return I.decode(e);
}
function aa(e, t = "utf-8", r = 16) {
  return t.toLowerCase() == "gbk" && r == 16 ? Ls(e) : new TextDecoder(t).decode(
    new Uint8Array(
      e.map((n) => Number.isFinite(n) ? n : parseInt(n, r))
    )
  );
}
function oa(e, t = "string") {
  return t == "string" ? I.encode(e) : I.encode(e).split("%").splice(1);
}
function ua(e) {
  for (var t = 0, r = 0; r < e.length; r++) {
    var n = e.charCodeAt(r);
    n >= 1 && n <= 126 || 65376 <= n && n <= 65439 ? t++ : t += 2;
  }
  return t;
}
const ca = (e, t = "") => Oe(e) || Array.isArray(e) ? JSON.stringify(e) : typeof e == "string" ? e : (console.warn("safeStringify error(\u6682\u4E0D\u652F\u6301\u7684\u6570\u636E\u7C7B\u578B)", e), t);
function fa(e, t, r = "...") {
  for (var n = "", s = 0, i = 0; i < e.length; i++) {
    var a = e[i];
    if (/[\u4e00-\u9fa5]/.test(a) ? s += 2 : s += 1, s > t * 2)
      break;
    n += a;
  }
  return e.length <= n.length ? e : n + r;
}
const Ps = /\:\:([-\d\.]+)$/, C = class {
  constructor(t, r, n = !1, s = null) {
    y(this, "_name");
    y(this, "_code");
    y(this, "_silent");
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
    let s = ge[n];
    if (!s) {
      let i, a;
      Ps.test(t) ? (i = RegExp.$1, a = t.replace(`::${i}`, "")) : (i = 0, a = t), s = new C(a, i, r), ge[n] = s;
    }
    return s;
  }
  static create(t, r = !1) {
    return this.fromObject(t, r);
  }
  static getErrorCode(t) {
    return t ? t.constructor == C ? t._code : this.fromObject(t)._code : 0;
  }
};
let G = C;
y(G, "nameFieldList", ["error", "message", "msg", "errMsg", "reason", "errorText"]), y(G, "fromObject", (t, r = !1) => {
  const n = C;
  if (!t)
    return new C("\u672A\u77E5\u9519\u8BEF", -9999);
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
    s = j(t, C.nameFieldList), r || (r = t.silence || t.silent);
  return !s && t.data ? n.fromObject(t.data) : n.fromErrorText(s, r);
});
const ge = {};
function Gs(e, t, r) {
  var n = -1, s = e.length;
  t < 0 && (t = -t > s ? 0 : s + t), r = r > s ? s : r, r < 0 && (r += s), s = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var i = Array(s); ++n < s; )
    i[n] = e[n + t];
  return i;
}
var js = Gs, Bs = 9007199254740991;
function Hs(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Bs;
}
var Rs = Hs, qs = Te, Us = Rs;
function zs(e) {
  return e != null && Us(e.length) && !qs(e);
}
var Ks = zs, Ws = 9007199254740991, Vs = /^(?:0|[1-9]\d*)$/;
function Xs(e, t) {
  var r = typeof e;
  return t = t == null ? Ws : t, !!t && (r == "number" || r != "symbol" && Vs.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Js = Xs, Zs = Ye, Qs = Ks, ei = Js, ti = q;
function ri(e, t, r) {
  if (!ti(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Qs(r) && ei(t, r.length) : n == "string" && t in r) ? Zs(r[t], e) : !1;
}
var ni = ri, si = /\s/;
function ii(e) {
  for (var t = e.length; t-- && si.test(e.charAt(t)); )
    ;
  return t;
}
var ai = ii, oi = ai, ui = /^\s+/;
function ci(e) {
  return e && e.slice(0, oi(e) + 1).replace(ui, "");
}
var fi = ci, li = fi, ve = q, hi = R, me = 0 / 0, pi = /^[-+]0x[0-9a-f]+$/i, di = /^0b[01]+$/i, gi = /^0o[0-7]+$/i, vi = parseInt;
function mi(e) {
  if (typeof e == "number")
    return e;
  if (hi(e))
    return me;
  if (ve(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ve(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = li(e);
  var r = di.test(e);
  return r || gi.test(e) ? vi(e.slice(2), r ? 2 : 8) : pi.test(e) ? me : +e;
}
var yi = mi, _i = yi, ye = 1 / 0, $i = 17976931348623157e292;
function bi(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = _i(e), e === ye || e === -ye) {
    var t = e < 0 ? -1 : 1;
    return t * $i;
  }
  return e === e ? e : 0;
}
var Di = bi, Mi = Di;
function wi(e) {
  var t = Mi(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var Ci = wi, Ii = js, Fi = ni, xi = Ci, Si = Math.ceil, Ei = Math.max;
function Ti(e, t, r) {
  (r ? Fi(e, t, r) : t === void 0) ? t = 1 : t = Ei(xi(t), 0);
  var n = e == null ? 0 : e.length;
  if (!n || t < 1)
    return [];
  for (var s = 0, i = 0, a = Array(Si(n / t)); s < n; )
    a[i++] = Ii(e, s, s += t);
  return a;
}
var Le = Ti;
class _e {
  static strip(t, r = 12) {
    return +parseFloat(t.toPrecision(r));
  }
  static hexString2DecLs(t) {
    return Le(t, 2).map((r) => parseInt(r.join(""), 16));
  }
  static preppendZero(t, r = 2) {
    return Pe(r, t);
  }
  static getDec(t) {
    return t - Math.trunc(t);
  }
  static toDEC(t, r = 16) {
    return Array.isArray(t) ? t.map((n) => parseInt(n, r)) : parseInt(t, r);
  }
  static toHEX(t, r = 2, n = 10) {
    if (Array.isArray(t))
      return t.map((s) => Array.isArray(s) ? s[0] : this.toHEX(s, length, n));
    if (/[a-zA-Z]/.test(t + ""))
      throw new Error("\u65E0\u6CD5\u8F6C\u6362\u4E3AHEX:" + t);
    return t = parseInt(t + "", n), t >= Math.pow(2, 8) && (r = 4), Ai(t, r)[0];
  }
}
function Ai(e, t = 2) {
  let r = parseInt(e + "").toString(16).toUpperCase(), n = Le(r, t).map((i) => i.join(""));
  const s = Pe(t, n[0]);
  return n.splice(0, 1, s), n;
}
function Pe(e, t) {
  let r = e - (t + "").length;
  return r <= 0 ? t + "" : Array(r).fill("0").join("") + (t + "");
}
function Yi(e, t = 12) {
  return typeof e != "number" && (e = 0), +parseFloat(e.toPrecision(t));
}
function la(e, t = 2) {
  typeof e != "number" && (e = 0);
  const r = Yi(e).toFixed(t);
  return parseFloat(r);
}
const ha = function(e, t = Number.MAX_SAFE_INTEGER, r = 0) {
  const n = typeof e == "string";
  let s = n ? _e.toDEC(e) : e;
  return typeof r == "number" && (s = Math.max(r, s)), typeof t == "number" && (s = Math.min(t, s)), n ? _e.toHEX(s) : s;
}, pa = (e, t = 0) => {
  if (typeof e == "number")
    return e;
  const s = ((e + "").includes(".") ? parseFloat : parseInt)(e);
  return isNaN(s) ? t : s;
};
function da(e, t, r) {
  function n(a, u) {
    return Math.floor(Math.random() * (u - a + 1)) + a;
  }
  function s() {
    const a = [];
    let u = e;
    for (let o = 0; o < t - 1; o++) {
      const c = n(r, u - r * (t - 1 - o));
      a.push(c), u -= c;
    }
    return a.push(u), a;
  }
  let i = 0;
  for (; i < 5; ) {
    const a = s();
    if (a.every((u) => u >= r))
      return a;
    i++;
  }
  return [];
}
var Ge = { exports: {} };
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(E, function() {
    var r = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
    return function(n, s, i) {
      var a = s.prototype, u = a.format;
      i.en.formats = r, a.format = function(o) {
        o === void 0 && (o = "YYYY-MM-DDTHH:mm:ssZ");
        var c = this.$locale().formats, l = function(m, d) {
          return m.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(v, D, M) {
            var F = M && M.toUpperCase();
            return D || d[M] || r[M] || d[F].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(L, w, _) {
              return w || _.slice(1);
            });
          });
        }(o, c === void 0 ? {} : c);
        return u.call(this, l);
      };
    };
  });
})(Ge);
const ki = Ge.exports;
var je = { exports: {} };
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(E, function() {
    var r = "week", n = "year";
    return function(s, i, a) {
      var u = i.prototype;
      u.week = function(o) {
        if (o === void 0 && (o = null), o !== null)
          return this.add(7 * (o - this.week()), "day");
        var c = this.$locale().yearStart || 1;
        if (this.month() === 11 && this.date() > 25) {
          var l = a(this).startOf(n).add(1, n).date(c), m = a(this).endOf(r);
          if (l.isBefore(m))
            return 1;
        }
        var d = a(this).startOf(n).date(c).startOf(r).subtract(1, "millisecond"), v = this.diff(d, r, !0);
        return v < 0 ? a(this).startOf("week").week() : Math.ceil(v);
      }, u.weeks = function(o) {
        return o === void 0 && (o = null), this.week(o);
      };
    };
  });
})(je);
const Ni = je.exports;
b.extend(ki);
b.extend(Ni);
const O = function(e) {
  const t = new Date();
  if (e) {
    if (e instanceof Date)
      return e;
    if (typeof e == "number") {
      const r = e + "", n = r.split(""), s = parseInt(n.splice(0, 4).join("")), i = parseInt(n.splice(0, 2).join("")) - 1, a = parseInt(n.splice(0, 2).join(""));
      return r.length == 4 ? (t.setFullYear(s), t) : r.length == 6 ? (t.setFullYear(s), t.setMonth(i - 1), t) : r.length == 8 ? (t.setFullYear(s), t.setMonth(i), t.setDate(a), t) : new Date(e);
    } else if (typeof e == "string") {
      if (e = e.trim(), /^\d+$/.test(e))
        return O(parseInt(e));
      {
        const r = e.split(/[-:\sTZ\+年月日时分秒]/), [
          n = t.getFullYear(),
          s = 0 + 1,
          i = 1,
          a = 0,
          u = 0,
          o = 0
        ] = r, c = parseInt([
          n,
          (s + "").padStart(2, "0"),
          (i + "").padStart(2, "0")
        ].join(""));
        if (r.length <= 3)
          return O(c);
        {
          const l = O(c);
          if (!l)
            throw new Error("\u65E0\u6CD5\u89E3\u6790\u7684\u65E5\u671F\u683C\u5F0F");
          return l.setHours(a, u, o), l;
        }
      }
    }
  } else
    return new Date();
}, Be = O;
function ga(e) {
  var t = "";
  if (typeof e == "string") {
    let r = e.split("-");
    r.length == 1 ? e = parseInt(e) : r.length == 2 ? t = e + "-01" : t = e;
    const n = Be(t);
    return $e(n);
  } else if (typeof e == "number") {
    const r = new Date();
    return r.setMonth(e - 1), $e(r);
  } else
    throw new Error("\u8BF7\u4F20\u5165\u6709\u6548\u7C7B\u578B");
}
function $e(e) {
  return e = new Date(Be(e).getTime()), e.add(1, "month"), e.setDate(0), e.getDate();
}
const Oi = (e, t = !0) => {
  typeof e == "string" && (e = b(e).toDate());
  const r = e.getDay(), n = new Date(e);
  n.setDate(e.getDate() - r), n.setHours(0, 0, 0, 0);
  const s = new Date(n);
  s.setDate(n.getDate() + 6), s.setHours(23, 59, 59, 999);
  const i = b(e).week(), a = b(n).format("YYYY-MM-DD");
  return t && (n.setDate(n.getDate() + 1), s.setDate(s.getDate() + 1)), {
    startYYYYMMDD: a,
    start: n,
    end: s,
    thInYear: i
  };
}, Li = (e, t, r, n = !0) => {
  const i = new Date(e, t - 1, 1).getDay(), a = 1 + (r - 1) * 7 - i, u = n ? a + 1 : a;
  return new Date(e, t - 1, u);
}, Pi = (e) => {
  typeof e == "string" && (e = b(e).toDate());
  const t = e.getDate(), r = e.getDay();
  return Math.ceil((t + 6 - r) / 7);
};
class x {
  constructor(t) {
    y(this, "_start");
    y(this, "_end");
    y(this, "_thInYear");
    y(this, "_thInMonth");
    const { start: r, end: n, thInYear: s } = Oi(t);
    this._start = r, this._end = n, this._thInYear = s, this._thInMonth = Pi(r);
  }
  get start() {
    return this._start;
  }
  get startStr() {
    return b(this.start).format("YYYY-MM-DD");
  }
  get end() {
    return this._end;
  }
  get endStr() {
    return b(this.end).format("YYYY-MM-DD");
  }
  get thInYear() {
    return this._thInYear;
  }
  get thInMonth() {
    return this._thInMonth;
  }
  get YYYYMMth() {
    return `${this.start.getFullYear()}-${this.start.getMonth() + 1}-[${this.thInMonth}]`;
  }
  get YYYYMMthStr() {
    return `${this.start.getFullYear()}-${this.start.getMonth() + 1}/\u7B2C${this.thInMonth}\u5468`;
  }
  static fromYYYYMMThStr(t) {
    const [r, n, s] = t.split(/[^\d]+/).filter((a) => a), i = Li(parseInt(r), parseInt(n), parseInt(s));
    return new x(i);
  }
  get YYYYMM() {
    return `${this.start.getFullYear()}-${this.start.getMonth() + 1}`;
  }
  get YYYY() {
    return this.start.getFullYear();
  }
  contains(t) {
    return t >= this.start && t <= this.end;
  }
  nextDateWeek() {
    const t = new Date(this.end.getFullYear(), this.end.getMonth(), this.end.getDate() + 1);
    return new x(t);
  }
  prevDateWeek() {
    const t = new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate() - 1);
    return new x(t);
  }
  static getListfromRange(t, r) {
    typeof t == "string" && (t = b(t).toDate()), typeof r == "string" && (r = b(r).toDate()), t > r && ([t, r] = [r, t]);
    const n = [];
    let s = new x(t);
    for (; !s.contains(r); )
      n.push(s), s = s.nextDateWeek();
    return n.push(s), n;
  }
  static from_yyyy_th(t, r) {
    const n = b(`${t}-01-01`).week(parseInt(r + ""));
    return new x(n.toDate());
  }
  toString() {
    return `
[${this.thInYear}] ${this.startStr} - ${this.endStr}`;
  }
}
const Gi = {};
class S extends Date {
  constructor(...r) {
    super(...r);
    y(this, "__currentMonth", !1);
  }
  static fromYYYY_MM(r) {
    var n = r.replace(/_/g, "-") + "-01";
    return new S(n);
  }
  static fromDate(r) {
    return new S(r.getTime());
  }
  static fromAny(r) {
    return this.fromDate(O(r));
  }
  diff(r, n = "day") {
    let s = this.getTime() - r.getTime();
    switch (n) {
      case "year":
        return s / 1e3 / 60 / 60 / 24 / 365;
      case "month":
        return s / 1e3 / 60 / 60 / 24 / 30;
      case "day":
        return s / 1e3 / 60 / 60 / 24;
      case "hour":
        return s / 1e3 / 60 / 60;
      case "minute":
        return s / 1e3 / 60;
      case "second":
        return s / 1e3;
      case "millisecond":
        return s;
    }
  }
  add(r, n = "day") {
    const s = this.clone();
    switch (n) {
      case "year":
        s.setFullYear(this.getFullYear() + r);
        break;
      case "month":
        this.setMonth(this.getMonth() + r);
      case "day":
        this.setDate(this.getDate() + r);
      case "hour":
        s.setHours(this.getHours() + r);
        break;
      case "minute":
        s.setMinutes(this.getMinutes() + r);
        break;
      case "second":
        s.setSeconds(this.getSeconds() + r);
        break;
      case "millisecond":
        s.setMilliseconds(this.getMilliseconds() + r);
        break;
    }
    return s;
  }
  clone() {
    return new S(this.getTime());
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
    let n;
    typeof r == "number" ? n = new S(r) : n = S.prototype.clone.call(r);
    let s = n.clone().setToDayStart(), i = this.clone().setToDayStart();
    return s.getTime() == i.getTime();
  }
  clearTime() {
    return this.setHours(0, 0, 0, 0), this;
  }
  clearDay() {
    return this.setDate(1), this;
  }
  formatToMonth(r = "-") {
    const n = this.getFullYear(), s = this.getMonth() + 1;
    return `${n}${r}${s}`;
  }
  formatToDay(r = "-") {
    const n = this.getFullYear(), s = this.getMonth() + 1, i = this.getDate();
    return `${n}${r}${s}${r}${i}`;
  }
  getCalendarDateList(r = !1) {
    var n = this;
    typeof r > "u" && (r = !0);
    var s = Gi, i = this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + (r ? "0" : "1");
    if (s[i])
      return s[i];
    let a, u;
    r ? (a = 0, u = 6) : (a = 1, u = 7);
    let o = [], c = this.clone().setToMonthStart(), l = this.clone().setToMonthEnd();
    var m = c.getDay(), d = l.getDay();
    let v = c.clone().add(a - m - 1, "day"), D = l.clone().add(u - d + 0, "day"), M = D.diff(v, "day"), F = 0, L = n.getMonth();
    for (; F++ < M; ) {
      let w = v.clone().add(F, "day");
      w.getMonth() == L && (w.__currentMonth = !0), o.push(w);
    }
    return s[i] = {
      list: o,
      firstDateInMonth: c,
      lastDateInMonth: l,
      firstDateInView: v,
      lastDateInView: D
    };
  }
}
const ji = (e) => e.replace(/[^\x00-\xff]/g, "**").length, va = (e, t) => (r, n) => r.trim().split(`
`).map((i) => {
  const a = i.trim();
  return a.startsWith("//") ? "" : a;
}).filter((i) => !!i).map((i) => {
  const [a, u, ...o] = i.split(/\s+/), l = {
    minWidth: ji(u) * 7 + 45,
    key: a,
    title: u,
    visible: !1,
    sum: !1
  };
  o.forEach((d) => {
    if (["center", "left"].includes(d))
      l.align = d;
    else if (/^(\+|\-)?(\d+)$/.test(d)) {
      const v = RegExp.$1, D = parseInt(RegExp.$2);
      v === "+" ? l.maxWidth = D : v === "-" ? l.minWidth = D : l.width = D;
    } else if (["show", "hide"].includes(d))
      l.visible = d == "show";
    else if (d === "__sum__")
      l.sum = !0;
    else if (d.startsWith("#"))
      d == "#" ? l.slot = l.key : l.slot = d.substring(1);
    else {
      const v = t[d];
      v ? l.render = v : console.warn("\u672A\u5B9A\u4E49\u7684render:", d);
    }
  });
  const m = e[a];
  return m && Object.assign(l, m), l.getValue = function(d) {
    return l.render ? l.render(null, { row: d, column: l }, !0) : d[l.key];
  }, n ? n(l, i) : l;
});
function ma(e, t, r, n, s) {
  var i = t.width, a = t.height;
  e.save(), e.translate(r, n), e.rotate(s), e.drawImage(t, -i / 2, -a / 2, i, a), e.restore();
}
export {
  G as AError,
  ra as BPromise,
  S as Date2,
  x as DateWeek,
  _e as Math2,
  O as all2date,
  Ji as all2valueName,
  na as asyncReduce,
  aa as byteArrayToString,
  $a as dayjs2,
  ma as drawRotatedImage,
  oa as encodeStringToGBK,
  sa as firstLetterUppercase,
  ia as fromGBKArrayToString,
  ua as getByteLength,
  $e as getDayLengthInMonth,
  ga as getDayMountByMonth,
  ea as getImageSize,
  Li as getWeekStartDateFromYYYYMMThInMonth,
  Pi as getWeekThInMonth,
  ta as isIE,
  Oe as isPlainObject,
  Wi as makeTreeDataHelper,
  Be as parse2date,
  Pe as preppendZero,
  Ns as promiseMap,
  da as randomSegmentation,
  Os as randomString,
  Ys as safeBindToObject,
  Zi as safeJsonParser,
  pa as safeParseNumber,
  ca as safeStringify,
  Qi as safeValueInList,
  ha as safeValueInRange,
  la as stripAndFixNumber,
  Yi as stripNumber,
  fa as stripString,
  he as travelTree,
  Xi as treeEach,
  Vi as treeListToFlatList,
  j as tryGet,
  va as viewuiColumnFactory
};
