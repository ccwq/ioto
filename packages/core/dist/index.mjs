var fe = Object.defineProperty;
var le = (t, e, r) => e in t ? fe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var E = (t, e, r) => (le(t, typeof e != "symbol" ? e + "" : e, r), r);
function Bt(t, e) {
  this.flags = t, this.cursor = e;
}
Bt.prototype = {
  skip: function() {
    this.flags.skip = !0;
  },
  break: function() {
    this.flags.break = !0;
  },
  remove: function() {
    this.flags.remove = !0;
  },
  replace: function(e) {
    this.flags.replace = e;
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
function mt(t, e) {
  return new Bt(t, e);
}
function Rt(t) {
  this.xs = [t], this.top = 0;
}
Rt.prototype = {
  push: function(e) {
    this.top++, this.top < this.xs.length ? this.xs[this.top] = e : this.xs.push(e);
  },
  pushArrayReverse: function(e) {
    for (var r = e.length - 1; r >= 0; r--)
      this.push(e[r]);
  },
  pop: function() {
    var e = this.peek();
    return this.top--, e;
  },
  peek: function() {
    return this.xs[this.top];
  },
  isEmpty: function() {
    return this.top === -1;
  }
};
function ot(t) {
  return new Rt(t);
}
function Ut() {
  this.depth = 0, this.stack = ot({ node: null, index: -1 });
}
Ut.prototype = {
  moveDown: function(e) {
    this.depth++, this.stack.push({ node: e, index: 0 });
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
function qt() {
  return new Ut();
}
function zt() {
  this.break = !1, this.skip = !1, this.remove = !1, this.replace = null;
}
zt.prototype = {
  reset: function() {
    this.break = !1, this.skip = !1, this.remove = !1, this.replace = null;
  }
};
function yt() {
  return new zt();
}
function $t(t) {
  return t && t.length !== 0;
}
function he(t, e, r) {
  for (var n = yt(), s = qt(), o = mt(n, s), c = ot(t), h = Object.assign({}, t); !c.isEmpty(); ) {
    var f = c.pop();
    if (f === h) {
      s.moveUp();
      continue;
    }
    if (n.reset(), e(f, o), n.break)
      break;
    if (!n.remove && (s.moveNext(), !n.skip)) {
      n.replace && (f = n.replace);
      var d = r(f);
      $t(d) && (c.push(h), c.pushArrayReverse(d), s.moveDown(f));
    }
  }
}
function de(t, e, r) {
  for (var n = yt(), s = qt(), o = mt(n, s), c = ot(t), h = ot(null); !c.isEmpty(); ) {
    var f = c.peek(), d = h.peek(), g = r(f);
    if (n.reset(), f === d || !$t(g)) {
      if (f === d && (h.pop(), s.moveUp()), c.pop(), e(f, o), n.break)
        break;
      if (n.remove)
        continue;
      s.moveNext();
    } else
      h.push(f), s.moveDown(f), c.pushArrayReverse(g);
  }
}
var pe = 32768;
function Wt(t) {
  this.xs = [t], this.top = 0, this.maxLength = 0;
}
Wt.prototype = {
  enqueue: function(e) {
    this.xs.push(e);
  },
  enqueueMultiple: function(e) {
    for (var r = 0, n = e.length; r < n; r++)
      this.enqueue(e[r]);
  },
  dequeue: function() {
    var e = this.peek();
    return this.top++, this.top === pe && (this.xs = this.xs.slice(this.top), this.top = 0), e;
  },
  peek: function() {
    return this.xs[this.top];
  },
  isEmpty: function() {
    return this.top === this.xs.length;
  }
};
function Jt(t) {
  return new Wt(t);
}
function Vt() {
  this.depth = 0, this.index = -1, this.queue = Jt({ node: null, arity: 1 }), this.levelNodes = 1, this.nextLevelNodes = 0;
}
Vt.prototype = {
  store: function(e, r) {
    this.queue.enqueue({ node: e, arity: r }), this.nextLevelNodes += r;
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
function ge() {
  return new Vt();
}
function ve(t, e, r) {
  for (var n = yt(), s = ge(), o = mt(n, s), c = Jt(t); !c.isEmpty(); ) {
    var h = c.dequeue();
    if (n.reset(), e(h, o), n.break)
      break;
    if (!n.remove && (s.moveNext(), n.replace && (h = n.replace), !n.skip)) {
      var f = r(h);
      $t(f) && (c.enqueueMultiple(f), s.store(h, f.length));
    }
    s.moveForward();
  }
}
var me = function(e) {
  return e.children;
};
function ye(t, e, r) {
  if (t != null) {
    r = r || {};
    var n = r.order || "pre", s = r.getChildren || me;
    n === "pre" ? he(t, e, s) : n === "post" ? de(t, e, s) : n === "bfs" && ve(t, e, s);
  }
}
var j = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $e(t) {
  for (var e = -1, r = t == null ? 0 : t.length, n = 0, s = []; ++e < r; ) {
    var o = t[e];
    o && (s[n++] = o);
  }
  return s;
}
var _e = $e, Me = Array.isArray, _t = Me, De = typeof j == "object" && j && j.Object === Object && j, be = De, we = be, Se = typeof self == "object" && self && self.Object === Object && self, Ce = we || Se || Function("return this")(), Mt = Ce, xe = Mt, Ie = xe.Symbol, Dt = Ie, wt = Dt, Kt = Object.prototype, Fe = Kt.hasOwnProperty, Ee = Kt.toString, tt = wt ? wt.toStringTag : void 0;
function Te(t) {
  var e = Fe.call(t, tt), r = t[tt];
  try {
    t[tt] = void 0;
    var n = !0;
  } catch {
  }
  var s = Ee.call(t);
  return n && (e ? t[tt] = r : delete t[tt]), s;
}
var Ye = Te, Ae = Object.prototype, ke = Ae.toString;
function Ne(t) {
  return ke.call(t);
}
var Oe = Ne, St = Dt, Le = Ye, He = Oe, Pe = "[object Null]", Ge = "[object Undefined]", Ct = St ? St.toStringTag : void 0;
function je(t) {
  return t == null ? t === void 0 ? Ge : Pe : Ct && Ct in Object(t) ? Le(t) : He(t);
}
var Zt = je;
function Be(t) {
  return t != null && typeof t == "object";
}
var Re = Be, Ue = Zt, qe = Re, ze = "[object Symbol]";
function We(t) {
  return typeof t == "symbol" || qe(t) && Ue(t) == ze;
}
var ct = We, Je = _t, Ve = ct, Ke = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ze = /^\w*$/;
function Xe(t, e) {
  if (Je(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || Ve(t) ? !0 : Ze.test(t) || !Ke.test(t) || e != null && t in Object(e);
}
var Qe = Xe;
function tr(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ft = tr, er = Zt, rr = ft, nr = "[object AsyncFunction]", sr = "[object Function]", ir = "[object GeneratorFunction]", ar = "[object Proxy]";
function or(t) {
  if (!rr(t))
    return !1;
  var e = er(t);
  return e == sr || e == ir || e == nr || e == ar;
}
var Xt = or, ur = Mt, cr = ur["__core-js_shared__"], fr = cr, vt = fr, xt = function() {
  var t = /[^.]+$/.exec(vt && vt.keys && vt.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function lr(t) {
  return !!xt && xt in t;
}
var hr = lr, dr = Function.prototype, pr = dr.toString;
function gr(t) {
  if (t != null) {
    try {
      return pr.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var vr = gr, mr = Xt, yr = hr, $r = ft, _r = vr, Mr = /[\\^$.*+?()[\]{}|]/g, Dr = /^\[object .+?Constructor\]$/, br = Function.prototype, wr = Object.prototype, Sr = br.toString, Cr = wr.hasOwnProperty, xr = RegExp(
  "^" + Sr.call(Cr).replace(Mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ir(t) {
  if (!$r(t) || yr(t))
    return !1;
  var e = mr(t) ? xr : Dr;
  return e.test(_r(t));
}
var Fr = Ir;
function Er(t, e) {
  return t == null ? void 0 : t[e];
}
var Tr = Er, Yr = Fr, Ar = Tr;
function kr(t, e) {
  var r = Ar(t, e);
  return Yr(r) ? r : void 0;
}
var Qt = kr, Nr = Qt, Or = Nr(Object, "create"), lt = Or, It = lt;
function Lr() {
  this.__data__ = It ? It(null) : {}, this.size = 0;
}
var Hr = Lr;
function Pr(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Gr = Pr, jr = lt, Br = "__lodash_hash_undefined__", Rr = Object.prototype, Ur = Rr.hasOwnProperty;
function qr(t) {
  var e = this.__data__;
  if (jr) {
    var r = e[t];
    return r === Br ? void 0 : r;
  }
  return Ur.call(e, t) ? e[t] : void 0;
}
var zr = qr, Wr = lt, Jr = Object.prototype, Vr = Jr.hasOwnProperty;
function Kr(t) {
  var e = this.__data__;
  return Wr ? e[t] !== void 0 : Vr.call(e, t);
}
var Zr = Kr, Xr = lt, Qr = "__lodash_hash_undefined__";
function tn(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Xr && e === void 0 ? Qr : e, this;
}
var en = tn, rn = Hr, nn = Gr, sn = zr, an = Zr, on = en;
function W(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
W.prototype.clear = rn;
W.prototype.delete = nn;
W.prototype.get = sn;
W.prototype.has = an;
W.prototype.set = on;
var un = W;
function cn() {
  this.__data__ = [], this.size = 0;
}
var fn = cn;
function ln(t, e) {
  return t === e || t !== t && e !== e;
}
var te = ln, hn = te;
function dn(t, e) {
  for (var r = t.length; r--; )
    if (hn(t[r][0], e))
      return r;
  return -1;
}
var ht = dn, pn = ht, gn = Array.prototype, vn = gn.splice;
function mn(t) {
  var e = this.__data__, r = pn(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : vn.call(e, r, 1), --this.size, !0;
}
var yn = mn, $n = ht;
function _n(t) {
  var e = this.__data__, r = $n(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var Mn = _n, Dn = ht;
function bn(t) {
  return Dn(this.__data__, t) > -1;
}
var wn = bn, Sn = ht;
function Cn(t, e) {
  var r = this.__data__, n = Sn(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
var xn = Cn, In = fn, Fn = yn, En = Mn, Tn = wn, Yn = xn;
function J(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
J.prototype.clear = In;
J.prototype.delete = Fn;
J.prototype.get = En;
J.prototype.has = Tn;
J.prototype.set = Yn;
var An = J, kn = Qt, Nn = Mt, On = kn(Nn, "Map"), Ln = On, Ft = un, Hn = An, Pn = Ln;
function Gn() {
  this.size = 0, this.__data__ = {
    hash: new Ft(),
    map: new (Pn || Hn)(),
    string: new Ft()
  };
}
var jn = Gn;
function Bn(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
var Rn = Bn, Un = Rn;
function qn(t, e) {
  var r = t.__data__;
  return Un(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var dt = qn, zn = dt;
function Wn(t) {
  var e = zn(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var Jn = Wn, Vn = dt;
function Kn(t) {
  return Vn(this, t).get(t);
}
var Zn = Kn, Xn = dt;
function Qn(t) {
  return Xn(this, t).has(t);
}
var ts = Qn, es = dt;
function rs(t, e) {
  var r = es(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
var ns = rs, ss = jn, is = Jn, as = Zn, os = ts, us = ns;
function V(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
V.prototype.clear = ss;
V.prototype.delete = is;
V.prototype.get = as;
V.prototype.has = os;
V.prototype.set = us;
var cs = V, ee = cs, fs = "Expected a function";
function bt(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(fs);
  var r = function() {
    var n = arguments, s = e ? e.apply(this, n) : n[0], o = r.cache;
    if (o.has(s))
      return o.get(s);
    var c = t.apply(this, n);
    return r.cache = o.set(s, c) || o, c;
  };
  return r.cache = new (bt.Cache || ee)(), r;
}
bt.Cache = ee;
var ls = bt, hs = ls, ds = 500;
function ps(t) {
  var e = hs(t, function(n) {
    return r.size === ds && r.clear(), n;
  }), r = e.cache;
  return e;
}
var gs = ps, vs = gs, ms = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ys = /\\(\\)?/g, $s = vs(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(ms, function(r, n, s, o) {
    e.push(s ? o.replace(ys, "$1") : n || r);
  }), e;
}), _s = $s;
function Ms(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, s = Array(n); ++r < n; )
    s[r] = e(t[r], r, t);
  return s;
}
var Ds = Ms, Et = Dt, bs = Ds, ws = _t, Ss = ct, Cs = 1 / 0, Tt = Et ? Et.prototype : void 0, Yt = Tt ? Tt.toString : void 0;
function re(t) {
  if (typeof t == "string")
    return t;
  if (ws(t))
    return bs(t, re) + "";
  if (Ss(t))
    return Yt ? Yt.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Cs ? "-0" : e;
}
var xs = re, Is = xs;
function Fs(t) {
  return t == null ? "" : Is(t);
}
var Es = Fs, Ts = _t, Ys = Qe, As = _s, ks = Es;
function Ns(t, e) {
  return Ts(t) ? t : Ys(t, e) ? [t] : As(ks(t));
}
var Os = Ns, Ls = ct, Hs = 1 / 0;
function Ps(t) {
  if (typeof t == "string" || Ls(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Hs ? "-0" : e;
}
var Gs = Ps, js = Os, Bs = Gs;
function Rs(t, e) {
  e = js(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[Bs(e[r++])];
  return r && r == n ? t : void 0;
}
var Us = Rs, qs = Us;
function zs(t, e, r) {
  var n = t == null ? void 0 : qs(t, e);
  return n === void 0 ? r : n;
}
var Ws = zs;
function Js(t) {
  return t == null;
}
var Vs = Js;
const aa = function(t, e = {}) {
  let r = {}, n = [], s = [], o = {};
  const c = function() {
    r = {}, n = [], s = [], o = {};
  };
  c();
  let {
    childrenKey: h = "children",
    checkedKey: f = "checked",
    idKey: d = "id"
  } = e, g = 0, _ = 0;
  const M = function(i = {}) {
    h = i.childrenKey || h, f = i.checkedKey || f, d = i.idKey || d;
  }, D = function(i, u) {
    i.forEach(function(a) {
      const p = a[d];
      r[p] = a, a = { ...a }, s.push(a), a.parent = u, a.index = g++;
      const v = u ? u.deepth + 1 : 0;
      a.deepth = v, _ = Math.max(_, v), a.path = u ? u.path + "." + a[d] : "0", a.parentIdList = u ? [...u.parentIdList, u[d]] : [], o[p] = a, a[h] && a[h].length > 0 && D(a[h], a);
    });
  }, C = function(i) {
    return i[h] && i[h].length > 0 ? !i[h].map((a) => I(a[d])).find((a) => !a[f]) : !1;
  }, T = function(i) {
    c(), Array.isArray(i) && D(i);
  };
  T(t);
  const O = function(i) {
    var u;
    return (u = I(i)) == null ? void 0 : u.parentIdList.map((a) => I(a));
  }, R = function(i) {
    const u = I(i);
    return s.filter(function(a) {
      return a.parent === (u == null ? void 0 : u.parent);
    });
  }, A = function(i) {
    let u;
    if (!i)
      return console.warn("id\u4E0D\u80FD\u4E3A\u7A7A"), null;
    if (i instanceof Object)
      u = i[d];
    else if (typeof i == "string" || typeof i == "number")
      u = i;
    else
      return console.warn("id\u7C7B\u578B\u975E\u6CD5:", i), null;
    return u;
  }, I = function(i) {
    const u = A(i);
    return u ? o[u] : null;
  }, nt = function(i) {
    const u = A(i);
    return u ? r[u] : null;
  }, P = function(i) {
    const u = I(i);
    return u == null ? void 0 : u.deepth;
  }, k = function(i, u) {
    const a = I(i);
    a && Object.assign(a, u);
  }, K = function(i, u, a = !1) {
    const p = I(i);
    p && (p[f] = u, a && (p.parentIdList.forEach((v) => {
      const y = o[v];
      y[f] = C(y);
    }), b(p, function(v) {
      v[f] = u;
    })));
  }, U = function(i) {
    const u = {};
    i && i.forEach((a) => {
      u[a] = !0;
    }), s.forEach((a) => {
      a[f] = u[a[d]] || !1;
    });
  }, b = function(i, u) {
    const a = I(i);
    if (a)
      u(a), a[h] && a[h].length > 0 && a[h].forEach(function(p) {
        b(p, u);
      });
    else
      throw new Error("\u8282\u70B9\u4E0D\u5B58\u5728:" + i);
  };
  return {
    travelNode: b,
    getNodeList: (i = !0) => i ? [...s] : [...n],
    getNodeDescendantList: (i) => {
      const u = [];
      return b(i, function(a) {
        u.push(a);
      }), u;
    },
    getNodeListByFilter: (i) => s.filter(i),
    getMinDeepth: function() {
      let i = _;
      for (const u in s) {
        const a = s[u];
        if (a.checked && (i = Math.min(i, a.deepth)), i === 0)
          return 0;
      }
      return i;
    },
    getSublings: R,
    getParents: O,
    getDeepth: P,
    getNode: I,
    updateIndexes: T,
    setChecked: K,
    setProps: k,
    travelAllNode: function(i) {
      for (const u in s) {
        const a = s[u], p = nt(a[d]);
        if (i(a, p) === !1)
          break;
      }
    },
    setOptions: M,
    resetCheckStatus: U,
    getOriginNode: nt
  };
}, At = function(t, e, r = "children", n = "id", s = [], o = { flag: !1 }) {
  if (t instanceof Array) {
    At({ [r]: t }, e, r, n, s);
    return;
  }
  const c = (t == null ? void 0 : t[r]) || [];
  for (let h = 0; h < c.length; h++) {
    const f = c[h];
    if (!e(f, s, r, n)) {
      o.flag = !0;
      break;
    }
    if (f[r] instanceof Array && At(f[r], e, r, n, [f, ...s], o), o.flag)
      break;
  }
}, at = function(t, e, r = null, n = !1) {
  if (typeof e == "string" && (e = e.split(",")), !!Array.isArray(e)) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s], c = Ws(t, o);
      if (n ? Vs(c) : !!c)
        return c;
    }
    return r;
  }
}, ne = (t) => Object.prototype.toString.call(t) == "[object Object]";
function Ks(t) {
  return t === null;
}
var kt = Ks;
const Zs = function(t, e, r, n = "_", s = 0) {
  t[e] ? s < 5 && Zs(t, n + e, r, n, s + 1) : t[e] = r;
}, oa = function(t, e, r) {
  let n = !1;
  return Array.isArray(t) && (t = { [e]: t }, n = !0), ye(
    t,
    r,
    {
      getChildren(s) {
        return s[e];
      }
    }
  ), n ? t[e] : t;
}, ua = function(t, e) {
  const r = {
    valueGetField: "value",
    nameGetField: "name",
    valueSetField: "value",
    nameSetField: "name",
    spliterItemValue: ",",
    spliterBetweenItem: /\s+/,
    defaultLs: ["0, \u8BF7\u63D0\u4F9Boptions"],
    ...e || {}
  };
  let n;
  return typeof t == "function" && (n = t(r)), typeof t == "string" ? n = t.trim().split(r.spliterBetweenItem).map((o) => o.trim()) : Array.isArray(t) ? n = t : Array.isArray(r.defaultLs) ? n = r.defaultLs : typeof r.defaultLs == "function" ? n = r.defaultLs() : n = [{
    name: "\u8BF7\u901A\u8FC7optionLs\u4F20\u5165\u6570\u7EC4\u6216\u8005\u51FD\u6570",
    value: -1
  }], function(o) {
    const c = r.elFormatter;
    c && (o = o.map((f) => {
      let [d, g] = c(f, r, at);
      return { value: d, name: g };
    }));
    let h = _e(o);
    return h.length != o.length && console.warn("options\u4E2D\u5B58\u5728\u7A7A\u9009\u9879", o), o = h, o = o.map((f) => {
      typeof f == "string" ? f = (f + "").split(r.spliterItemValue).map((_) => _.trim()) : typeof f == "number" && (f = [f, f]);
      let d, g;
      if (Array.isArray(f)) {
        if ([d, g] = f, g === void 0 ? g = d : d === void 0 && (d = g), kt(d) || kt(g))
          throw "value\u548Cname\u4E0D\u80FD\u540C\u65F6\u4E3A\u7A7A";
      } else
        f ? (d = at(f, r.valueGetField), g = at(f, r.nameGetField)) : (g = "\u65E0\u6548options", d = "-");
      return {
        [r.valueSetField]: d,
        [r.nameSetField]: g
      };
    }), o.forEach((f) => {
      const d = f[r.valueSetField];
      typeof d != "number" && typeof d != "string" && (console.warn("options\u4E2D\u5B58\u5728\u975E\u6CD5\u7684value,\u9700\u8981\u662Fnumber\u6216\u8005string", f), f[r.valueSetField] = f.value + "");
    }), o;
  }(n);
}, ca = function(t, e = null) {
  if (ne(t) || Array.isArray(t))
    return t;
  if (typeof t != "string")
    return console.warn("safeJsonParser error", t), e;
  try {
    return JSON.parse(t);
  } catch {
    return console.log("json\u89E3\u6790\u5931\u8D25:", t), e;
  }
}, fa = function(t, e, r = 0, n = void 0) {
  if (e.includes(t))
    return t;
  {
    let s = e[r];
    return s === void 0 && (s = n), s;
  }
};
function la(t) {
  return new Promise(function(e, r) {
    var n = typeof t == "string" ? t : URL.createObjectURL(t);
    if (!n)
      throw new Error("Must use a valid image");
    var s = document.createElement("img");
    s.onload = () => {
      typeof t != "string" && URL.revokeObjectURL(n), e({ width: s.width, height: s.height });
    }, s.onerror = (o) => {
      typeof t != "string" && URL.revokeObjectURL(n), r(o);
    }, s.src = n;
  });
}
function Xs() {
  const t = window.navigator.userAgent, e = t.indexOf("MSIE ");
  if (e > 0)
    return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
  if (t.indexOf("Trident/") > 0) {
    const s = t.indexOf("rv:");
    return parseInt(t.substring(s + 3, t.indexOf(".", s)), 10);
  }
  const n = t.indexOf("Edge/");
  return n > 0 ? parseInt(t.substring(n + 5, t.indexOf(".", n)), 10) : -1;
}
const ha = Xs() !== -1;
function Qs(...t) {
  let e;
  Array.isArray(arguments[0]) ? e = arguments[0] : e = Array.prototype.slice.call(arguments);
  let r = [];
  return e.reduce(
    function(n, s, o, c) {
      return n.then(function() {
        if (typeof s == "function")
          try {
            s = s();
          } catch (h) {
            return c.splice(1), Promise.reject(h);
          }
        else
          console.warn("map element:" + o + " not function");
        return s.then((h) => {
          r[o] = h;
        });
      });
    },
    Promise.resolve(r)
  ).then(function() {
    return r;
  });
}
class da extends Promise {
  constructor(r = void 0) {
    let n, s;
    super((o, c) => {
      n = o, s = c, r && r(o, c);
    });
    E(this, "__resolve");
    E(this, "__reject");
    this.__resolve = n, this.__reject = s;
  }
  static map(r) {
    return Qs(r);
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
const ut = class {
  static get fastGbk() {
    if (!this._fastGbk)
      throw new Error("\u8BF7\u5148\u8C03\u7528setFaskGbk\u65B9\u6CD5\u8BBE\u7F6EfastGbk::$GBK.setFaskGbk(require('fast-gbk'))");
    return this._fastGbk;
  }
  static setFaskGbk(e) {
    this._fastGbk = e;
  }
  static encode(e) {
    return ut.fastGbk.encode(e);
  }
  static decode(e) {
    if (!e || !e.length)
      return "";
    typeof e == "string" && (/^\%/.test(e) ? e = e.split("%").splice(1) : e = e.split(","));
    let r = "";
    if (Array.isArray(e))
      if (typeof e[0] == "number")
        r = this.fastGbk.decode(e);
      else {
        const n = e.map((s) => {
          typeof s == "number" && (console.warn("decodeGBK\u4F20\u5165\u7684\u6570\u7EC4\u4E2D\u6709number\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u8FD9\u662F\u4E0D\u5141\u8BB8\u7684\uFF0C\u4F1A\u5BFC\u81F4\u89E3\u7801\u9519\u8BEF"), s = s + "");
          let o = parseInt(s, 16);
          return isNaN(o) ? 0 : o;
        });
        r = ut.decode(n);
      }
    return r;
  }
};
let B = ut;
E(B, "_fastGbk");
const Nt = /* @__PURE__ */ new Map();
function pa(t) {
  if (t === 0)
    return "0";
  if (t === !1)
    return "False";
  if (!t)
    return "";
  if (typeof t != "string")
    throw new Error("\u65E0\u6548\u8F93\u5165");
  let [e, ...r] = t;
  return e.toUpperCase() + r.join("");
}
function ga(t, e) {
  if (!t || !e)
    return "";
  var r = 0, n = 0, s = "";
  for (n = 0; n < t.length; n++) {
    if (t.charCodeAt(n) > 255 ? r += 2 : r++, r > e)
      return s;
    s += t.charAt(n);
  }
  return t;
}
const ti = () => {
  let t = Math.random().toString(32).substr(2);
  return Nt.get(t) ? ti() : (Nt.set(t, !0), t);
};
function ei(t) {
  return B.decode(t);
}
function va(t) {
  return B.decode(t);
}
function ma(t, e = "utf-8", r = 16) {
  return e.toLowerCase() == "gbk" && r == 16 ? ei(t) : new TextDecoder(e).decode(
    new Uint8Array(
      t.map((n) => Number.isFinite(n) ? n : parseInt(n, r))
    )
  );
}
function ya(t, e = "string") {
  return e == "string" ? B.encode(t) : B.encode(t).split("%").splice(1);
}
function $a(t) {
  for (var e = 0, r = 0; r < t.length; r++) {
    var n = t.charCodeAt(r);
    n >= 1 && n <= 126 || 65376 <= n && n <= 65439 ? e++ : e += 2;
  }
  return e;
}
const _a = (t, e = "") => ne(t) || Array.isArray(t) ? JSON.stringify(t) : typeof t == "string" ? t : (console.warn("safeStringify error(\u6682\u4E0D\u652F\u6301\u7684\u6570\u636E\u7C7B\u578B)", t), e), ri = /\:\:([-\d\.]+)$/, G = class {
  constructor(e, r, n = !1, s = null) {
    E(this, "_name");
    E(this, "_code");
    E(this, "_silent");
    const o = this;
    o._name = e, o._code = r, o._silent = n;
  }
  static addNameFieldList(e) {
    this.nameFieldList.push(e);
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
    const e = this;
    return `AError:${e.code}-${e.name}`;
  }
  static fromErrorText(e, r = !1) {
    const n = `${e}-${r ? "0" : "1"}`;
    let s = Ot[n];
    if (!s) {
      let o, c;
      ri.test(e) ? (o = RegExp.$1, c = e.replace(`::${o}`, "")) : (o = 0, c = e), s = new G(c, o, r), Ot[n] = s;
    }
    return s;
  }
  static create(e, r = !1) {
    return this.fromObject(e, r);
  }
  static getErrorCode(e) {
    return e ? e.constructor == G ? e._code : this.fromObject(e)._code : 0;
  }
};
let it = G;
E(it, "nameFieldList", ["error", "message", "msg", "errMsg", "reason", "errorText"]), E(it, "fromObject", (e, r = !1) => {
  const n = G;
  if (!e)
    return new G("\u672A\u77E5\u9519\u8BEF", -9999);
  let s;
  if (e instanceof Error)
    return n.fromErrorText(e.message, r);
  if (typeof e == "string")
    if (/^(\[|\{)/.test(e))
      try {
        e = JSON.parse(e);
      } catch {
        s = e;
      }
    else
      s = e;
  else
    s = at(e, G.nameFieldList), r || (r = e.silence || e.silent);
  return !s && e.data ? n.fromObject(e.data) : n.fromErrorText(s, r);
});
const Ot = {};
function ni(t, e, r) {
  var n = -1, s = t.length;
  e < 0 && (e = -e > s ? 0 : s + e), r = r > s ? s : r, r < 0 && (r += s), s = e > r ? 0 : r - e >>> 0, e >>>= 0;
  for (var o = Array(s); ++n < s; )
    o[n] = t[n + e];
  return o;
}
var si = ni, ii = 9007199254740991;
function ai(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ii;
}
var oi = ai, ui = Xt, ci = oi;
function fi(t) {
  return t != null && ci(t.length) && !ui(t);
}
var li = fi, hi = 9007199254740991, di = /^(?:0|[1-9]\d*)$/;
function pi(t, e) {
  var r = typeof t;
  return e = e == null ? hi : e, !!e && (r == "number" || r != "symbol" && di.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var gi = pi, vi = te, mi = li, yi = gi, $i = ft;
function _i(t, e, r) {
  if (!$i(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? mi(r) && yi(e, r.length) : n == "string" && e in r) ? vi(r[e], t) : !1;
}
var Mi = _i, Di = /\s/;
function bi(t) {
  for (var e = t.length; e-- && Di.test(t.charAt(e)); )
    ;
  return e;
}
var wi = bi, Si = wi, Ci = /^\s+/;
function xi(t) {
  return t && t.slice(0, Si(t) + 1).replace(Ci, "");
}
var Ii = xi, Fi = Ii, Lt = ft, Ei = ct, Ht = 0 / 0, Ti = /^[-+]0x[0-9a-f]+$/i, Yi = /^0b[01]+$/i, Ai = /^0o[0-7]+$/i, ki = parseInt;
function Ni(t) {
  if (typeof t == "number")
    return t;
  if (Ei(t))
    return Ht;
  if (Lt(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Lt(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Fi(t);
  var r = Yi.test(t);
  return r || Ai.test(t) ? ki(t.slice(2), r ? 2 : 8) : Ti.test(t) ? Ht : +t;
}
var Oi = Ni, Li = Oi, Pt = 1 / 0, Hi = 17976931348623157e292;
function Pi(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = Li(t), t === Pt || t === -Pt) {
    var e = t < 0 ? -1 : 1;
    return e * Hi;
  }
  return t === t ? t : 0;
}
var Gi = Pi, ji = Gi;
function Bi(t) {
  var e = ji(t), r = e % 1;
  return e === e ? r ? e - r : e : 0;
}
var Ri = Bi, Ui = si, qi = Mi, zi = Ri, Wi = Math.ceil, Ji = Math.max;
function Vi(t, e, r) {
  (r ? qi(t, e, r) : e === void 0) ? e = 1 : e = Ji(zi(e), 0);
  var n = t == null ? 0 : t.length;
  if (!n || e < 1)
    return [];
  for (var s = 0, o = 0, c = Array(Wi(n / e)); s < n; )
    c[o++] = Ui(t, s, s += e);
  return c;
}
var se = Vi;
class Gt {
  static strip(e, r = 12) {
    return +parseFloat(e.toPrecision(r));
  }
  static hexString2DecLs(e) {
    return se(e, 2).map((r) => parseInt(r.join(""), 16));
  }
  static preppendZero(e, r = 2) {
    return ie(r, e);
  }
  static getDec(e) {
    return e - Math.trunc(e);
  }
  static toDEC(e, r = 16) {
    return Array.isArray(e) ? e.map((n) => parseInt(n, r)) : parseInt(e, r);
  }
  static toHEX(e, r = 2, n = 10) {
    if (Array.isArray(e))
      return e.map((s) => Array.isArray(s) ? s[0] : this.toHEX(s, length, n));
    if (/[a-zA-Z]/.test(e + ""))
      throw new Error("\u65E0\u6CD5\u8F6C\u6362\u4E3AHEX:" + e);
    return e = parseInt(e + "", n), e >= Math.pow(2, 8) && (r = 4), Ki(e, r)[0];
  }
}
function Ki(t, e = 2) {
  let r = parseInt(t + "").toString(16).toUpperCase(), n = se(r, e).map((o) => o.join(""));
  const s = ie(e, n[0]);
  return n.splice(0, 1, s), n;
}
function ie(t, e) {
  let r = t - (e + "").length;
  return r <= 0 ? e + "" : Array(r).fill("0").join("") + (e + "");
}
function Zi(t, e = 12) {
  return typeof t != "number" && (t = 0), +parseFloat(t.toPrecision(e));
}
function Ma(t, e = 2) {
  typeof t != "number" && (t = 0);
  const r = Zi(t).toFixed(e);
  return parseFloat(r);
}
const Da = function(t, e = Number.MAX_SAFE_INTEGER, r = 0) {
  const n = typeof t == "string";
  let s = n ? Gt.toDEC(t) : t;
  return typeof r == "number" && (s = Math.max(r, s)), typeof e == "number" && (s = Math.min(e, s)), n ? Gt.toHEX(s) : s;
}, ba = (t, e = 0) => {
  if (typeof t == "number")
    return t;
  const s = ((t + "").includes(".") ? parseFloat : parseInt)(t);
  return isNaN(s) ? e : s;
};
var ae = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(j, function() {
    var r = 1e3, n = 6e4, s = 36e5, o = "millisecond", c = "second", h = "minute", f = "hour", d = "day", g = "week", _ = "month", M = "quarter", D = "year", C = "date", T = "Invalid Date", O = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, R = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, A = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(m) {
      var l = ["th", "st", "nd", "rd"], i = m % 100;
      return "[" + m + (l[(i - 20) % 10] || l[i] || l[0]) + "]";
    } }, I = function(m, l, i) {
      var u = String(m);
      return !u || u.length >= l ? m : "" + Array(l + 1 - u.length).join(i) + m;
    }, nt = { s: I, z: function(m) {
      var l = -m.utcOffset(), i = Math.abs(l), u = Math.floor(i / 60), a = i % 60;
      return (l <= 0 ? "+" : "-") + I(u, 2, "0") + ":" + I(a, 2, "0");
    }, m: function m(l, i) {
      if (l.date() < i.date())
        return -m(i, l);
      var u = 12 * (i.year() - l.year()) + (i.month() - l.month()), a = l.clone().add(u, _), p = i - a < 0, v = l.clone().add(u + (p ? -1 : 1), _);
      return +(-(u + (i - a) / (p ? a - v : v - a)) || 0);
    }, a: function(m) {
      return m < 0 ? Math.ceil(m) || 0 : Math.floor(m);
    }, p: function(m) {
      return { M: _, y: D, w: g, d, D: C, h: f, m: h, s: c, ms: o, Q: M }[m] || String(m || "").toLowerCase().replace(/s$/, "");
    }, u: function(m) {
      return m === void 0;
    } }, P = "en", k = {};
    k[P] = A;
    var K = function(m) {
      return m instanceof Z;
    }, U = function m(l, i, u) {
      var a;
      if (!l)
        return P;
      if (typeof l == "string") {
        var p = l.toLowerCase();
        k[p] && (a = p), i && (k[p] = i, a = p);
        var v = l.split("-");
        if (!a && v.length > 1)
          return m(v[0]);
      } else {
        var y = l.name;
        k[y] = l, a = y;
      }
      return !u && a && (P = a), a || !u && P;
    }, b = function(m, l) {
      if (K(m))
        return m.clone();
      var i = typeof l == "object" ? l : {};
      return i.date = m, i.args = arguments, new Z(i);
    }, $ = nt;
    $.l = U, $.i = K, $.w = function(m, l) {
      return b(m, { locale: l.$L, utc: l.$u, x: l.$x, $offset: l.$offset });
    };
    var Z = function() {
      function m(i) {
        this.$L = U(i.locale, null, !0), this.parse(i);
      }
      var l = m.prototype;
      return l.parse = function(i) {
        this.$d = function(u) {
          var a = u.date, p = u.utc;
          if (a === null)
            return new Date(NaN);
          if ($.u(a))
            return new Date();
          if (a instanceof Date)
            return new Date(a);
          if (typeof a == "string" && !/Z$/i.test(a)) {
            var v = a.match(O);
            if (v) {
              var y = v[2] - 1 || 0, S = (v[7] || "0").substring(0, 3);
              return p ? new Date(Date.UTC(v[1], y, v[3] || 1, v[4] || 0, v[5] || 0, v[6] || 0, S)) : new Date(v[1], y, v[3] || 1, v[4] || 0, v[5] || 0, v[6] || 0, S);
            }
          }
          return new Date(a);
        }(i), this.$x = i.x || {}, this.init();
      }, l.init = function() {
        var i = this.$d;
        this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
      }, l.$utils = function() {
        return $;
      }, l.isValid = function() {
        return this.$d.toString() !== T;
      }, l.isSame = function(i, u) {
        var a = b(i);
        return this.startOf(u) <= a && a <= this.endOf(u);
      }, l.isAfter = function(i, u) {
        return b(i) < this.startOf(u);
      }, l.isBefore = function(i, u) {
        return this.endOf(u) < b(i);
      }, l.$g = function(i, u, a) {
        return $.u(i) ? this[u] : this.set(a, i);
      }, l.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, l.valueOf = function() {
        return this.$d.getTime();
      }, l.startOf = function(i, u) {
        var a = this, p = !!$.u(u) || u, v = $.p(i), y = function(q, F) {
          var H = $.w(a.$u ? Date.UTC(a.$y, F, q) : new Date(a.$y, F, q), a);
          return p ? H : H.endOf(d);
        }, S = function(q, F) {
          return $.w(a.toDate()[q].apply(a.toDate("s"), (p ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(F)), a);
        }, w = this.$W, x = this.$M, L = this.$D, N = "set" + (this.$u ? "UTC" : "");
        switch (v) {
          case D:
            return p ? y(1, 0) : y(31, 11);
          case _:
            return p ? y(1, x) : y(0, x + 1);
          case g:
            var X = this.$locale().weekStart || 0, Q = (w < X ? w + 7 : w) - X;
            return y(p ? L - Q : L + (6 - Q), x);
          case d:
          case C:
            return S(N + "Hours", 0);
          case f:
            return S(N + "Minutes", 1);
          case h:
            return S(N + "Seconds", 2);
          case c:
            return S(N + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, l.endOf = function(i) {
        return this.startOf(i, !1);
      }, l.$set = function(i, u) {
        var a, p = $.p(i), v = "set" + (this.$u ? "UTC" : ""), y = (a = {}, a[d] = v + "Date", a[C] = v + "Date", a[_] = v + "Month", a[D] = v + "FullYear", a[f] = v + "Hours", a[h] = v + "Minutes", a[c] = v + "Seconds", a[o] = v + "Milliseconds", a)[p], S = p === d ? this.$D + (u - this.$W) : u;
        if (p === _ || p === D) {
          var w = this.clone().set(C, 1);
          w.$d[y](S), w.init(), this.$d = w.set(C, Math.min(this.$D, w.daysInMonth())).$d;
        } else
          y && this.$d[y](S);
        return this.init(), this;
      }, l.set = function(i, u) {
        return this.clone().$set(i, u);
      }, l.get = function(i) {
        return this[$.p(i)]();
      }, l.add = function(i, u) {
        var a, p = this;
        i = Number(i);
        var v = $.p(u), y = function(x) {
          var L = b(p);
          return $.w(L.date(L.date() + Math.round(x * i)), p);
        };
        if (v === _)
          return this.set(_, this.$M + i);
        if (v === D)
          return this.set(D, this.$y + i);
        if (v === d)
          return y(1);
        if (v === g)
          return y(7);
        var S = (a = {}, a[h] = n, a[f] = s, a[c] = r, a)[v] || 1, w = this.$d.getTime() + i * S;
        return $.w(w, this);
      }, l.subtract = function(i, u) {
        return this.add(-1 * i, u);
      }, l.format = function(i) {
        var u = this, a = this.$locale();
        if (!this.isValid())
          return a.invalidDate || T;
        var p = i || "YYYY-MM-DDTHH:mm:ssZ", v = $.z(this), y = this.$H, S = this.$m, w = this.$M, x = a.weekdays, L = a.months, N = function(F, H, gt, st) {
          return F && (F[H] || F(u, p)) || gt[H].slice(0, st);
        }, X = function(F) {
          return $.s(y % 12 || 12, F, "0");
        }, Q = a.meridiem || function(F, H, gt) {
          var st = F < 12 ? "AM" : "PM";
          return gt ? st.toLowerCase() : st;
        }, q = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: w + 1, MM: $.s(w + 1, 2, "0"), MMM: N(a.monthsShort, w, L, 3), MMMM: N(L, w), D: this.$D, DD: $.s(this.$D, 2, "0"), d: String(this.$W), dd: N(a.weekdaysMin, this.$W, x, 2), ddd: N(a.weekdaysShort, this.$W, x, 3), dddd: x[this.$W], H: String(y), HH: $.s(y, 2, "0"), h: X(1), hh: X(2), a: Q(y, S, !0), A: Q(y, S, !1), m: String(S), mm: $.s(S, 2, "0"), s: String(this.$s), ss: $.s(this.$s, 2, "0"), SSS: $.s(this.$ms, 3, "0"), Z: v };
        return p.replace(R, function(F, H) {
          return H || q[F] || v.replace(":", "");
        });
      }, l.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, l.diff = function(i, u, a) {
        var p, v = $.p(u), y = b(i), S = (y.utcOffset() - this.utcOffset()) * n, w = this - y, x = $.m(this, y);
        return x = (p = {}, p[D] = x / 12, p[_] = x, p[M] = x / 3, p[g] = (w - S) / 6048e5, p[d] = (w - S) / 864e5, p[f] = w / s, p[h] = w / n, p[c] = w / r, p)[v] || w, a ? x : $.a(x);
      }, l.daysInMonth = function() {
        return this.endOf(_).$D;
      }, l.$locale = function() {
        return k[this.$L];
      }, l.locale = function(i, u) {
        if (!i)
          return this.$L;
        var a = this.clone(), p = U(i, u, !0);
        return p && (a.$L = p), a;
      }, l.clone = function() {
        return $.w(this.$d, this);
      }, l.toDate = function() {
        return new Date(this.valueOf());
      }, l.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, l.toISOString = function() {
        return this.$d.toISOString();
      }, l.toString = function() {
        return this.$d.toUTCString();
      }, m;
    }(), pt = Z.prototype;
    return b.prototype = pt, [["$ms", o], ["$s", c], ["$m", h], ["$H", f], ["$W", d], ["$M", _], ["$y", D], ["$D", C]].forEach(function(m) {
      pt[m[1]] = function(l) {
        return this.$g(l, m[0], m[1]);
      };
    }), b.extend = function(m, l) {
      return m.$i || (m(l, Z, b), m.$i = !0), b;
    }, b.locale = U, b.isDayjs = K, b.unix = function(m) {
      return b(1e3 * m);
    }, b.en = k[P], b.Ls = k, b.p = {}, b;
  });
})(ae);
const Y = ae.exports;
var oe = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(j, function() {
    var r = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
    return function(n, s, o) {
      var c = s.prototype, h = c.format;
      o.en.formats = r, c.format = function(f) {
        f === void 0 && (f = "YYYY-MM-DDTHH:mm:ssZ");
        var d = this.$locale().formats, g = function(_, M) {
          return _.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(D, C, T) {
            var O = T && T.toUpperCase();
            return C || M[T] || r[T] || M[O].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(R, A, I) {
              return A || I.slice(1);
            });
          });
        }(f, d === void 0 ? {} : d);
        return h.call(this, g);
      };
    };
  });
})(oe);
const Xi = oe.exports;
var ue = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(j, function() {
    var r = "week", n = "year";
    return function(s, o, c) {
      var h = o.prototype;
      h.week = function(f) {
        if (f === void 0 && (f = null), f !== null)
          return this.add(7 * (f - this.week()), "day");
        var d = this.$locale().yearStart || 1;
        if (this.month() === 11 && this.date() > 25) {
          var g = c(this).startOf(n).add(1, n).date(d), _ = c(this).endOf(r);
          if (g.isBefore(_))
            return 1;
        }
        var M = c(this).startOf(n).date(d).startOf(r).subtract(1, "millisecond"), D = this.diff(M, r, !0);
        return D < 0 ? c(this).startOf("week").week() : Math.ceil(D);
      }, h.weeks = function(f) {
        return f === void 0 && (f = null), this.week(f);
      };
    };
  });
})(ue);
const Qi = ue.exports;
Y.extend(Xi);
Y.extend(Qi);
const rt = function(t) {
  const e = new Date();
  if (t) {
    if (t instanceof Date)
      return t;
    if (typeof t == "number") {
      const r = t + "", n = r.split(""), s = parseInt(n.splice(0, 4).join("")), o = parseInt(n.splice(0, 2).join("")) - 1, c = parseInt(n.splice(0, 2).join(""));
      return r.length == 4 ? (e.setFullYear(s), e) : r.length == 6 ? (e.setFullYear(s), e.setMonth(o), e) : r.length == 8 ? (e.setFullYear(s), e.setMonth(o), e.setDate(c), e) : new Date(t);
    } else if (typeof t == "string") {
      if (t = t.trim(), /^\d+$/.test(t))
        return rt(parseInt(t));
      {
        const r = t.split(/[-:\sTZ\+年月日时分秒]/), [
          n = e.getFullYear(),
          s = e.getMonth() + 1,
          o = e.getDate(),
          c = e.getHours(),
          h = e.getMinutes(),
          f = e.getSeconds()
        ] = r, d = parseInt([
          n,
          (s + "").padStart(2, "0"),
          (o + "").padStart(2, "0")
        ].join(""));
        if (r.length <= 3)
          return rt(d);
        {
          const g = rt(d);
          if (!g)
            throw new Error("\u65E0\u6CD5\u89E3\u6790\u7684\u65E5\u671F\u683C\u5F0F");
          return g.setHours(c, h, f), g;
        }
      }
    }
  } else
    return new Date();
}, ce = rt;
function wa(t) {
  var e = "";
  if (typeof t == "string") {
    let r = t.split("-");
    r.length == 1 ? t = parseInt(t) : r.length == 2 ? e = t + "-01" : e = t;
    const n = ce(e);
    return jt(n);
  } else if (typeof t == "number") {
    const r = new Date();
    return r.setMonth(t - 1), jt(r);
  } else
    throw new Error("\u8BF7\u4F20\u5165\u6709\u6548\u7C7B\u578B");
}
function jt(t) {
  return t = new Date(ce(t).getTime()), t.add(1, "month"), t.setDate(0), t.getDate();
}
const ta = (t, e = !0) => {
  typeof t == "string" && (t = Y(t).toDate());
  const r = t.getDay(), n = new Date(t);
  n.setDate(t.getDate() - r), n.setHours(0, 0, 0, 0);
  const s = new Date(n);
  s.setDate(n.getDate() + 6), s.setHours(23, 59, 59, 999);
  const o = Y(t).week(), c = Y(n).format("YYYY-MM-DD");
  return e && (n.setDate(n.getDate() + 1), s.setDate(s.getDate() + 1)), {
    startYYYYMMDD: c,
    start: n,
    end: s,
    thInYear: o
  };
}, ea = (t, e, r, n = !0) => {
  const o = new Date(t, e - 1, 1).getDay(), c = 1 + (r - 1) * 7 - o, h = n ? c + 1 : c;
  return new Date(t, e - 1, h);
}, ra = (t) => {
  typeof t == "string" && (t = Y(t).toDate());
  const e = t.getDate(), r = t.getDay();
  return Math.ceil((e + 6 - r) / 7);
};
class z {
  constructor(e) {
    E(this, "_start");
    E(this, "_end");
    E(this, "_thInYear");
    E(this, "_thInMonth");
    const { start: r, end: n, thInYear: s } = ta(e);
    this._start = r, this._end = n, this._thInYear = s, this._thInMonth = ra(r);
  }
  get start() {
    return this._start;
  }
  get startStr() {
    return Y(this.start).format("YYYY-MM-DD");
  }
  get end() {
    return this._end;
  }
  get endStr() {
    return Y(this.end).format("YYYY-MM-DD");
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
  static fromYYYYMMThStr(e) {
    const [r, n, s] = e.split(/[^\d]+/).filter((c) => c), o = ea(parseInt(r), parseInt(n), parseInt(s));
    return new z(o);
  }
  get YYYYMM() {
    return `${this.start.getFullYear()}-${this.start.getMonth() + 1}`;
  }
  get YYYY() {
    return this.start.getFullYear();
  }
  contains(e) {
    return e >= this.start && e <= this.end;
  }
  nextDateWeek() {
    const e = new Date(this.end.getFullYear(), this.end.getMonth(), this.end.getDate() + 1);
    return new z(e);
  }
  prevDateWeek() {
    const e = new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate() - 1);
    return new z(e);
  }
  static getListfromRange(e, r) {
    typeof e == "string" && (e = Y(e).toDate()), typeof r == "string" && (r = Y(r).toDate()), e > r && ([e, r] = [r, e]);
    const n = [];
    let s = new z(e);
    for (; !s.contains(r); )
      n.push(s), s = s.nextDateWeek();
    return n.push(s), n;
  }
  static from_yyyy_th(e, r) {
    const n = Y(`${e}-01-01`).week(parseInt(r + ""));
    return new z(n.toDate());
  }
  toString() {
    return `
[${this.thInYear}] ${this.startStr} - ${this.endStr}`;
  }
}
const na = {};
class et extends Date {
  constructor(...r) {
    super(...r);
    E(this, "__currentMonth", !1);
  }
  static fromYYYY_MM(r) {
    var n = r.replace(/_/g, "-") + "-01";
    return new Date(n);
  }
  static fromDate(r) {
    return new et(r.getTime());
  }
  static fromAny(r) {
    return this.fromDate(rt(r));
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
    return new et(this.getTime());
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
    typeof r == "number" ? n = new et(r) : n = et.prototype.clone.call(r);
    let s = n.clone().setToDayStart(), o = this.clone().setToDayStart();
    return s.getTime() == o.getTime();
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
    const n = this.getFullYear(), s = this.getMonth() + 1, o = this.getDate();
    return `${n}${r}${s}${r}${o}`;
  }
  getCalendarDateList(r = !1) {
    var n = this;
    typeof r > "u" && (r = !0);
    var s = na, o = this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + (r ? "0" : "1");
    if (s[o])
      return s[o];
    let c, h;
    r ? (c = 0, h = 6) : (c = 1, h = 7);
    let f = [], d = this.clone().setToMonthStart(), g = this.clone().setToMonthEnd();
    var _ = d.getDay(), M = g.getDay();
    let D = d.clone().add(c - _ - 1, "day"), C = g.clone().add(h - M + 0, "day"), T = C.diff(D, "day"), O = 0, R = n.getMonth();
    for (; O++ < T; ) {
      let A = D.clone().add(O, "day");
      A.getMonth() == R && (A.__currentMonth = !0), f.push(A);
    }
    return s[o] = {
      list: f,
      firstDateInMonth: d,
      lastDateInMonth: g,
      firstDateInView: D,
      lastDateInView: C
    };
  }
}
const sa = (t) => t.replace(/[^\x00-\xff]/g, "**").length, Sa = (t, e) => (r, n) => r.trim().split(`
`).map((o) => {
  const c = o.trim();
  return c.startsWith("//") ? "" : c;
}).filter((o) => !!o).map((o) => {
  const [c, h, ...f] = o.split(/\s+/), g = {
    minWidth: sa(h) * 7 + 45,
    key: c,
    title: h,
    visible: !1,
    sum: !1
  };
  f.forEach((M) => {
    if (["center", "left"].includes(M))
      g.align = M;
    else if (/^(\+|\-)?(\d+)$/.test(M)) {
      const D = RegExp.$1, C = parseInt(RegExp.$2);
      D === "+" ? g.maxWidth = C : D === "-" ? g.minWidth = C : g.width = C;
    } else if (["show", "hide"].includes(M))
      g.visible = M == "show";
    else if (M === "__sum__")
      g.sum = !0;
    else if (M.startsWith("#"))
      M == "#" ? g.slot = g.key : g.slot = M.substring(1);
    else {
      const D = e[M];
      D ? g.render = D : console.warn("\u672A\u5B9A\u4E49\u7684render:", M);
    }
  });
  const _ = t[c];
  return _ && Object.assign(g, _), g.getValue = function(M) {
    return g.render ? g.render(null, { row: M, column: g }, !0) : M[g.key];
  }, n ? n(g, o) : g;
});
export {
  it as AError,
  da as BPromise,
  et as Date2,
  z as DateWeek,
  Gt as Math2,
  rt as all2date,
  ua as all2valueName,
  ma as byteArrayToString,
  Y as dayjs2,
  ya as encodeStringToGBK,
  pa as firstLetterUppercase,
  va as fromGBKArrayToString,
  $a as getByteLength,
  jt as getDayLengthInMonth,
  wa as getDayMountByMonth,
  la as getImageSize,
  ea as getWeekStartDateFromYYYYMMThInMonth,
  ra as getWeekThInMonth,
  ha as isIE,
  ne as isPlainObject,
  aa as makeTreeDataHelper,
  ce as parse2date,
  ie as preppendZero,
  Qs as promiseMap,
  ti as randomString,
  Zs as safeBindToObject,
  ca as safeJsonParser,
  ba as safeParseNumber,
  _a as safeStringify,
  fa as safeValueInList,
  Da as safeValueInRange,
  Ma as stripAndFixNumber,
  Zi as stripNumber,
  ga as stripString,
  At as travelTree,
  oa as treeEach,
  at as tryGet,
  Sa as viewuiColumnFactory
};
