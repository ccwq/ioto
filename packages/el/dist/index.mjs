import { defineComponent as P, computed as _, resolveComponent as S, openBlock as c, createBlock as O, mergeProps as Y, withCtx as g, renderSlot as A, useSlots as at, normalizeClass as K, resolveDynamicComponent as Ae, createCommentVNode as w, createTextVNode as k, toDisplayString as N, watchEffect as st, useAttrs as te, ref as L, provide as nt, createElementBlock as v, unref as $, Fragment as U, createVNode as y, nextTick as ye, withDirectives as ie, vModelText as rt, normalizeStyle as ge, createElementVNode as E, renderList as ue, vShow as De, withKeys as ne, reactive as He, resolveDirective as lt, pushScopeId as ot, popScopeId as it, onMounted as ut, watch as ee, normalizeProps as Fe, guardReactiveProps as ke, isRef as dt } from "vue";
import { ElMessageBox as ct, ElMessage as he } from "element-plus";
import { safeJsonParser as ft, dayjs2 as V, all2valueName as pt } from "@ioto/core";
const mt = P(
  {
    props: {
      label: {
        type: String,
        default: "\u6309\u94AE\u540D\u79F0"
      },
      icon: {
        type: String,
        default: ""
      },
      class: [Object, String, Array],
      style: [Object, String]
    },
    setup(e, t) {
      return {
        vBind: _(() => ({
          title: "\u6807\u9898",
          closeOnClickModal: !1,
          ...t.attrs
        }))
      };
    }
  }
);
function gt(e, t, a, s, r, u) {
  const i = S("index-dialog");
  return c(), O(i, Y({ class: "a-dialog" }, e.vBind), {
    header: g(() => [
      A(e.$slots, "header")
    ]),
    default: g(() => [
      A(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const H = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, r] of t)
    a[s] = r;
  return a;
}, bl = /* @__PURE__ */ H(mt, [["render", gt]]), ht = P({
  props: {
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    lite: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, t) {
    const a = _(() => ({
      ...t.attrs
    })), s = at(), r = _(() => {
      const i = {};
      return s.default && (i.mr025 = !0), i;
    }), u = _(() => {
      const i = {};
      return s.default && (i.ml025 = !0), i;
    });
    return {
      iconPrevClasses: r,
      iconSuffixClasses: u,
      vBind: a
    };
  }
});
function vt(e, t, a, s, r, u) {
  const i = S("index-icon"), n = S("ElButton");
  return c(), O(n, Y({
    class: "a-button",
    type: "primary"
  }, e.vBind, {
    class: { lite: e.lite }
  }), {
    tip: g(() => [
      A(e.$slots, "tip")
    ]),
    default: g(() => [
      A(e.$slots, "icon", {}, () => [
        e.icon ? (c(), O(i, {
          key: 0,
          class: K(e.iconPrevClasses)
        }, {
          default: g(() => [
            (c(), O(Ae(e.icon)))
          ]),
          _: 1
        }, 8, ["class"])) : w("", !0)
      ]),
      A(e.$slots, "default", {}, () => [
        k(N(e.label), 1)
      ]),
      A(e.$slots, "suffix", {}, () => [
        e.suffix ? (c(), O(i, {
          key: 0,
          class: K({ iconSuffixClasses: e.iconSuffixClasses })
        }, {
          default: g(() => [
            (c(), O(Ae(e.suffix)))
          ]),
          _: 1
        }, 8, ["class"])) : w("", !0)
      ])
    ]),
    _: 3
  }, 16, ["class"]);
}
const B = /* @__PURE__ */ H(ht, [["render", vt]]), yt = P(
  {
    props: {
      total: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    setup(e, t) {
      const a = t.emit;
      return {
        vBind: _(() => ({
          pagerCount: 5,
          pageSizes: [10, 20, 30],
          background: !0,
          layout: "total, sizes, prev, pager, next, jumper",
          ...t.attrs,
          ...e,
          "onUpdate:currentPage": (r) => {
            a("update:currentPage", r);
          },
          "onUpdate:pageSize": (r) => {
            a("update:pageSize", r);
          },
          "onSize-change": (r) => {
            a("size-change", r);
          },
          "onCurrent-change": (r) => {
            a("current-change", r);
          }
        }))
      };
    }
  }
);
function _t(e, t, a, s, r, u) {
  const i = S("index-pagination");
  return c(), O(i, Y({ class: "a-page" }, e.vBind), null, 16);
}
const $l = /* @__PURE__ */ H(yt, [["render", _t]]);
var re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, bt = typeof re == "object" && re && re.Object === Object && re, $t = bt, Tt = $t, Ct = typeof self == "object" && self && self.Object === Object && self, Et = Tt || Ct || Function("return this")(), _e = Et, St = _e, wt = St.Symbol, be = wt, Oe = be, qe = Object.prototype, At = qe.hasOwnProperty, Dt = qe.toString, Z = Oe ? Oe.toStringTag : void 0;
function Ft(e) {
  var t = At.call(e, Z), a = e[Z];
  try {
    e[Z] = void 0;
    var s = !0;
  } catch {
  }
  var r = Dt.call(e);
  return s && (t ? e[Z] = a : delete e[Z]), r;
}
var kt = Ft, Ot = Object.prototype, Vt = Ot.toString;
function It(e) {
  return Vt.call(e);
}
var Bt = It, Ve = be, Pt = kt, Mt = Bt, jt = "[object Null]", zt = "[object Undefined]", Ie = Ve ? Ve.toStringTag : void 0;
function Rt(e) {
  return e == null ? e === void 0 ? zt : jt : Ie && Ie in Object(e) ? Pt(e) : Mt(e);
}
var xe = Rt;
function Nt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var $e = Nt, Lt = xe, Yt = $e, Gt = "[object AsyncFunction]", Kt = "[object Function]", Ut = "[object GeneratorFunction]", Ht = "[object Proxy]";
function qt(e) {
  if (!Yt(e))
    return !1;
  var t = Lt(e);
  return t == Kt || t == Ut || t == Gt || t == Ht;
}
var xt = qt, Wt = _e, Jt = Wt["__core-js_shared__"], Xt = Jt, ve = Xt, Be = function() {
  var e = /[^.]+$/.exec(ve && ve.keys && ve.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Zt(e) {
  return !!Be && Be in e;
}
var Qt = Zt, ea = Function.prototype, ta = ea.toString;
function aa(e) {
  if (e != null) {
    try {
      return ta.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var sa = aa, na = xt, ra = Qt, la = $e, oa = sa, ia = /[\\^$.*+?()[\]{}|]/g, ua = /^\[object .+?Constructor\]$/, da = Function.prototype, ca = Object.prototype, fa = da.toString, pa = ca.hasOwnProperty, ma = RegExp(
  "^" + fa.call(pa).replace(ia, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ga(e) {
  if (!la(e) || ra(e))
    return !1;
  var t = na(e) ? ma : ua;
  return t.test(oa(e));
}
var ha = ga;
function va(e, t) {
  return e == null ? void 0 : e[t];
}
var ya = va, _a = ha, ba = ya;
function $a(e, t) {
  var a = ba(e, t);
  return _a(a) ? a : void 0;
}
var Te = $a, Ta = Te, Ca = function() {
  try {
    var e = Ta(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Ea = Ca, Pe = Ea;
function Sa(e, t, a) {
  t == "__proto__" && Pe ? Pe(e, t, {
    configurable: !0,
    enumerable: !0,
    value: a,
    writable: !0
  }) : e[t] = a;
}
var wa = Sa;
function Aa(e, t) {
  return e === t || e !== e && t !== t;
}
var We = Aa, Da = wa, Fa = We, ka = Object.prototype, Oa = ka.hasOwnProperty;
function Va(e, t, a) {
  var s = e[t];
  (!(Oa.call(e, t) && Fa(s, a)) || a === void 0 && !(t in e)) && Da(e, t, a);
}
var Ia = Va, Ba = Array.isArray, Ce = Ba;
function Pa(e) {
  return e != null && typeof e == "object";
}
var Ma = Pa, ja = xe, za = Ma, Ra = "[object Symbol]";
function Na(e) {
  return typeof e == "symbol" || za(e) && ja(e) == Ra;
}
var Ee = Na, La = Ce, Ya = Ee, Ga = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ka = /^\w*$/;
function Ua(e, t) {
  if (La(e))
    return !1;
  var a = typeof e;
  return a == "number" || a == "symbol" || a == "boolean" || e == null || Ya(e) ? !0 : Ka.test(e) || !Ga.test(e) || t != null && e in Object(t);
}
var Ha = Ua, qa = Te, xa = qa(Object, "create"), de = xa, Me = de;
function Wa() {
  this.__data__ = Me ? Me(null) : {}, this.size = 0;
}
var Ja = Wa;
function Xa(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Za = Xa, Qa = de, es = "__lodash_hash_undefined__", ts = Object.prototype, as = ts.hasOwnProperty;
function ss(e) {
  var t = this.__data__;
  if (Qa) {
    var a = t[e];
    return a === es ? void 0 : a;
  }
  return as.call(t, e) ? t[e] : void 0;
}
var ns = ss, rs = de, ls = Object.prototype, os = ls.hasOwnProperty;
function is(e) {
  var t = this.__data__;
  return rs ? t[e] !== void 0 : os.call(t, e);
}
var us = is, ds = de, cs = "__lodash_hash_undefined__";
function fs(e, t) {
  var a = this.__data__;
  return this.size += this.has(e) ? 0 : 1, a[e] = ds && t === void 0 ? cs : t, this;
}
var ps = fs, ms = Ja, gs = Za, hs = ns, vs = us, ys = ps;
function x(e) {
  var t = -1, a = e == null ? 0 : e.length;
  for (this.clear(); ++t < a; ) {
    var s = e[t];
    this.set(s[0], s[1]);
  }
}
x.prototype.clear = ms;
x.prototype.delete = gs;
x.prototype.get = hs;
x.prototype.has = vs;
x.prototype.set = ys;
var _s = x;
function bs() {
  this.__data__ = [], this.size = 0;
}
var $s = bs, Ts = We;
function Cs(e, t) {
  for (var a = e.length; a--; )
    if (Ts(e[a][0], t))
      return a;
  return -1;
}
var ce = Cs, Es = ce, Ss = Array.prototype, ws = Ss.splice;
function As(e) {
  var t = this.__data__, a = Es(t, e);
  if (a < 0)
    return !1;
  var s = t.length - 1;
  return a == s ? t.pop() : ws.call(t, a, 1), --this.size, !0;
}
var Ds = As, Fs = ce;
function ks(e) {
  var t = this.__data__, a = Fs(t, e);
  return a < 0 ? void 0 : t[a][1];
}
var Os = ks, Vs = ce;
function Is(e) {
  return Vs(this.__data__, e) > -1;
}
var Bs = Is, Ps = ce;
function Ms(e, t) {
  var a = this.__data__, s = Ps(a, e);
  return s < 0 ? (++this.size, a.push([e, t])) : a[s][1] = t, this;
}
var js = Ms, zs = $s, Rs = Ds, Ns = Os, Ls = Bs, Ys = js;
function W(e) {
  var t = -1, a = e == null ? 0 : e.length;
  for (this.clear(); ++t < a; ) {
    var s = e[t];
    this.set(s[0], s[1]);
  }
}
W.prototype.clear = zs;
W.prototype.delete = Rs;
W.prototype.get = Ns;
W.prototype.has = Ls;
W.prototype.set = Ys;
var Gs = W, Ks = Te, Us = _e, Hs = Ks(Us, "Map"), qs = Hs, je = _s, xs = Gs, Ws = qs;
function Js() {
  this.size = 0, this.__data__ = {
    hash: new je(),
    map: new (Ws || xs)(),
    string: new je()
  };
}
var Xs = Js;
function Zs(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Qs = Zs, en = Qs;
function tn(e, t) {
  var a = e.__data__;
  return en(t) ? a[typeof t == "string" ? "string" : "hash"] : a.map;
}
var fe = tn, an = fe;
function sn(e) {
  var t = an(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var nn = sn, rn = fe;
function ln(e) {
  return rn(this, e).get(e);
}
var on = ln, un = fe;
function dn(e) {
  return un(this, e).has(e);
}
var cn = dn, fn = fe;
function pn(e, t) {
  var a = fn(this, e), s = a.size;
  return a.set(e, t), this.size += a.size == s ? 0 : 1, this;
}
var mn = pn, gn = Xs, hn = nn, vn = on, yn = cn, _n = mn;
function J(e) {
  var t = -1, a = e == null ? 0 : e.length;
  for (this.clear(); ++t < a; ) {
    var s = e[t];
    this.set(s[0], s[1]);
  }
}
J.prototype.clear = gn;
J.prototype.delete = hn;
J.prototype.get = vn;
J.prototype.has = yn;
J.prototype.set = _n;
var bn = J, Je = bn, $n = "Expected a function";
function Se(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError($n);
  var a = function() {
    var s = arguments, r = t ? t.apply(this, s) : s[0], u = a.cache;
    if (u.has(r))
      return u.get(r);
    var i = e.apply(this, s);
    return a.cache = u.set(r, i) || u, i;
  };
  return a.cache = new (Se.Cache || Je)(), a;
}
Se.Cache = Je;
var Tn = Se, Cn = Tn, En = 500;
function Sn(e) {
  var t = Cn(e, function(s) {
    return a.size === En && a.clear(), s;
  }), a = t.cache;
  return t;
}
var wn = Sn, An = wn, Dn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Fn = /\\(\\)?/g, kn = An(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Dn, function(a, s, r, u) {
    t.push(r ? u.replace(Fn, "$1") : s || a);
  }), t;
}), On = kn;
function Vn(e, t) {
  for (var a = -1, s = e == null ? 0 : e.length, r = Array(s); ++a < s; )
    r[a] = t(e[a], a, e);
  return r;
}
var In = Vn, ze = be, Bn = In, Pn = Ce, Mn = Ee, jn = 1 / 0, Re = ze ? ze.prototype : void 0, Ne = Re ? Re.toString : void 0;
function Xe(e) {
  if (typeof e == "string")
    return e;
  if (Pn(e))
    return Bn(e, Xe) + "";
  if (Mn(e))
    return Ne ? Ne.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -jn ? "-0" : t;
}
var zn = Xe, Rn = zn;
function Nn(e) {
  return e == null ? "" : Rn(e);
}
var Ln = Nn, Yn = Ce, Gn = Ha, Kn = On, Un = Ln;
function Hn(e, t) {
  return Yn(e) ? e : Gn(e, t) ? [e] : Kn(Un(e));
}
var Ze = Hn, qn = 9007199254740991, xn = /^(?:0|[1-9]\d*)$/;
function Wn(e, t) {
  var a = typeof e;
  return t = t == null ? qn : t, !!t && (a == "number" || a != "symbol" && xn.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Jn = Wn, Xn = Ee, Zn = 1 / 0;
function Qn(e) {
  if (typeof e == "string" || Xn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Zn ? "-0" : t;
}
var Qe = Qn, er = Ia, tr = Ze, ar = Jn, Le = $e, sr = Qe;
function nr(e, t, a, s) {
  if (!Le(e))
    return e;
  t = tr(t, e);
  for (var r = -1, u = t.length, i = u - 1, n = e; n != null && ++r < u; ) {
    var o = sr(t[r]), h = a;
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return e;
    if (r != i) {
      var D = n[o];
      h = s ? s(D, o, n) : void 0, h === void 0 && (h = Le(D) ? D : ar(t[r + 1]) ? [] : {});
    }
    er(n, o, h), n = n[o];
  }
  return e;
}
var rr = nr, lr = rr;
function or(e, t, a) {
  return e == null ? e : lr(e, t, a);
}
var le = or, ir = Ze, ur = Qe;
function dr(e, t) {
  t = ir(t, e);
  for (var a = 0, s = t.length; e != null && a < s; )
    e = e[ur(t[a++])];
  return a && a == s ? e : void 0;
}
var cr = dr, fr = cr;
function pr(e, t, a) {
  var s = e == null ? void 0 : fr(e, t);
  return s === void 0 ? a : s;
}
var oe = pr;
const mr = {
  key: 1,
  class: "footer"
}, Tl = /* @__PURE__ */ P({
  __name: "AFormCreate",
  props: {
    disabled: { type: Boolean, default: !1 },
    labelWidth: null,
    noSubmitBtn: { type: Boolean, default: !0 },
    option: null,
    autoValidate: { type: Boolean, default: !0 },
    modelValue: { default: {} },
    mergedValue: { default: {} },
    compact: { default: "normal" },
    rule: null,
    rules: null,
    noFooter: { type: Boolean, default: !1 },
    beforeSubmit: null
  },
  emits: ["update:api", "ready", "submit", "reset", "update:modelValue", "update:mergedValue"],
  setup(e, { emit: t }) {
    const a = e;
    let s = {};
    st(() => {
      s = {
        ...a.mergedValue,
        ...a.modelValue
      };
    });
    const r = te(), u = L(0);
    nt("a-form-create", {
      beforeButmitSeed: u
    });
    const i = _(() => {
      const f = a.option || {};
      return a.labelWidth && le(f, "form.labelWidth", a.labelWidth), a.noSubmitBtn && le(f, "submitBtn.show", !1), oe(f, "submitBtn.size"), oe(f, "form.size"), oe(f, "resetBtn") || le(f, "resetBtn.show", !1), a.disabled && le(f, "form.disabled", !0), f;
    }), n = _(() => {
      var f, l;
      return (l = (f = i.value) == null ? void 0 : f.form) == null ? void 0 : l.disabled;
    });
    let o = null;
    const h = async (...f) => {
      let l;
      if (u.value++, !o)
        return console.warn("fc is null");
      if (await ye(), a.beforeSubmit) {
        const b = await a.beforeSubmit({ ...o.formData() }, ...f);
        if (b === !1)
          return;
        b ? l = b : l = {};
      } else
        l = {};
      const d = { ...o.formData(), ...l };
      a.autoValidate && await o.validate().catch((b) => {
        throw "";
      }), t("submit", d, o, ...f);
    }, D = (...f) => {
      if (!o)
        return console.warn("fc is null");
      o.resetFields(), t("reset", o, ...f);
    }, F = _(() => {
      const f = Object.assign({}, a.modelValue, a.mergedValue);
      let l = a.rule || a.rules || [];
      return l = l.map((d) => Array.isArray(d) ? aMaker.rawText(...d) : d), {
        ...r,
        rule: l,
        modelValue: f,
        "onUpdate:modelValue"(d) {
          t("update:modelValue", d), s = { ...s, ...d }, t("update:mergedValue", s);
        },
        "onUpdate:api"(d) {
          o = d, t("update:api", d), t("ready", d);
        }
      };
    });
    return L(!1), (f, l) => {
      const d = S("form-create");
      return c(), v("div", {
        class: K(["a-form-create", [`compact-${e.compact}`]])
      }, [
        $(i) ? (c(), O(d, Y({ key: 0 }, $(F), { option: $(i) }), null, 16, ["option"])) : w("", !0),
        $(n) ? w("", !0) : (c(), v("div", mr, [
          A(f.$slots, "footer", {
            submit: h,
            reset: D
          }, () => [
            a.noFooter ? w("", !0) : (c(), v(U, { key: 0 }, [
              A(f.$slots, "before-footer"),
              y(B, {
                class: "ph20",
                onClick: l[0] || (l[0] = (b) => h()),
                type: "success",
                icon: "elementCircleCheckFilled"
              }, {
                default: g(() => [
                  k("\u63D0\u4EA4")
                ]),
                _: 1
              }),
              y(B, {
                type: "warning",
                onClick: l[1] || (l[1] = (b) => D()),
                icon: "elementRefreshLeft"
              }, {
                default: g(() => [
                  k("\u91CD\u7F6E")
                ]),
                _: 1
              }),
              A(f.$slots, "after-footer")
            ], 64))
          ])
        ]))
      ], 2);
    };
  }
});
var gr = function e(t, a) {
  if (t === a)
    return !0;
  if (t && a && typeof t == "object" && typeof a == "object") {
    if (t.constructor !== a.constructor)
      return !1;
    var s, r, u;
    if (Array.isArray(t)) {
      if (s = t.length, s != a.length)
        return !1;
      for (r = s; r-- !== 0; )
        if (!e(t[r], a[r]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === a.source && t.flags === a.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === a.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === a.toString();
    if (u = Object.keys(t), s = u.length, s !== Object.keys(a).length)
      return !1;
    for (r = s; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(a, u[r]))
        return !1;
    for (r = s; r-- !== 0; ) {
      var i = u[r];
      if (!e(t[i], a[i]))
        return !1;
    }
    return !0;
  }
  return t !== t && a !== a;
};
const hr = (e, t) => t.filter((a) => {
  const { text: s } = e;
  if (typeof a.rule == "string")
    return !new RegExp(a.rule).test(s);
  if (a.rule instanceof RegExp)
    return !a.rule.test(s);
  if ({}.toString.call(a.rule) === "[object Function]")
    return a.rule(e);
}).map((a) => a.classes), q = (e) => JSON.parse(JSON.stringify(e)), vr = (e, t) => {
  let a = 0;
  for (; a < e.length; ) {
    if (t(e[a], a, e))
      return a;
    a++;
  }
  return -1;
}, et = (e, t, a = [], s) => {
  e.text === void 0 && (e = { text: e });
  const r = hr(e, a), u = vr(t, (h) => h === e), i = q(t), n = u !== -1 ? i.splice(u, 1)[0] : q(e);
  return (s ? s(i, n) : i.map((h) => h.text).indexOf(n.text) !== -1) && r.push("ti-duplicate"), r.length === 0 ? r.push("ti-valid") : r.push("ti-invalid"), r;
}, Q = (e, ...t) => {
  e.text === void 0 && (e = { text: e });
  const a = q(e);
  return a.tiClasses = et(e, ...t), a;
}, yr = (e, ...t) => e.map((a) => Q(a, e, ...t));
const _r = {
  name: "TagInput",
  props: {
    scope: {
      type: Object
    }
  }
}, br = ["maxlength"];
function $r(e, t, a, s, r, u) {
  return a.scope.edit ? ie((c(), v("input", {
    key: 0,
    "onUpdate:modelValue": t[0] || (t[0] = (i) => a.scope.tag.text = i),
    maxlength: a.scope.maxlength,
    type: "text",
    class: "ti-tag-input",
    size: "1",
    onInput: t[1] || (t[1] = (i) => a.scope.validateTag(a.scope.index, i)),
    onBlur: t[2] || (t[2] = (i) => a.scope.performCancelEdit(a.scope.index)),
    onKeydown: t[3] || (t[3] = (i) => a.scope.performSaveEdit(a.scope.index, i))
  }, null, 40, br)), [
    [rt, a.scope.tag.text]
  ]) : w("", !0);
}
const Tr = /* @__PURE__ */ H(_r, [["render", $r], ["__scopeId", "data-v-d369d79e"]]), Ye = (e) => !e.some((t) => {
  const a = !t.text;
  a && console.warn('Missing property "text"', t);
  let s = !1;
  return t.classes && (s = typeof t.classes != "string"), s && console.warn('Property "classes" must be type of string', t), a || s;
}), Ge = (e) => !e.some((t) => {
  if (typeof t == "number") {
    const a = isFinite(t) && Math.floor(t) === t;
    return a || console.warn("Only numerics are allowed for this prop. Found:", t), !a;
  } else if (typeof t == "string") {
    const a = /\W|[a-z]|!\d/i.test(t);
    return a || console.warn("Only alpha strings are allowed for this prop. Found:", t), !a;
  } else
    return console.warn("Only numeric and string values are allowed. Found:", t), !1;
}), Cr = {
  modelValue: {
    type: String,
    default: "",
    required: !0
  },
  tags: {
    type: Array,
    default: () => [],
    validator: Ye
  },
  autocompleteItems: {
    type: Array,
    default: () => [],
    validator: Ye
  },
  allowEditTags: {
    type: Boolean,
    default: !1
  },
  autocompleteFilterDuplicates: {
    default: !0,
    type: Boolean
  },
  addOnlyFromAutocomplete: {
    type: Boolean,
    default: !1
  },
  autocompleteMinLength: {
    type: Number,
    default: 1
  },
  autocompleteAlwaysOpen: {
    type: Boolean,
    default: !1
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  placeholder: {
    type: String,
    default: "Add Tag"
  },
  addOnKey: {
    type: Array,
    default: () => [13],
    validator: Ge
  },
  saveOnKey: {
    type: Array,
    default: () => [13],
    validator: Ge
  },
  maxTags: {
    type: Number
  },
  maxlength: {
    type: Number
  },
  validation: {
    type: Array,
    default: () => [],
    validator(e) {
      return !e.some((t) => {
        const a = !t.rule;
        a && console.warn('Property "rule" is missing', t);
        const s = t.rule && (typeof t.rule == "string" || t.rule instanceof RegExp || {}.toString.call(t.rule) === "[object Function]");
        s || console.warn(
          "A rule must be type of string, RegExp or function. Found:",
          JSON.stringify(t.rule)
        );
        const r = !t.classes;
        r && console.warn('Property "classes" is missing', t);
        const u = t.type && typeof t.type != "string";
        return u && console.warn('Property "type" must be type of string. Found:', t), !s || a || r || u;
      });
    }
  },
  separators: {
    type: Array,
    default: () => [";"],
    validator(e) {
      return !e.some((t) => {
        const a = typeof t != "string";
        return a && console.warn("Separators must be type of string. Found:", t), a;
      });
    }
  },
  avoidAddingDuplicates: {
    type: Boolean,
    default: !0
  },
  addOnBlur: {
    type: Boolean,
    default: !0
  },
  isDuplicate: {
    type: Function,
    default: null
  },
  addFromPaste: {
    type: Boolean,
    default: !0
  },
  deleteOnBackspace: {
    default: !0,
    type: Boolean
  },
  onBeforeAddingTag: Function,
  onBeforeDeletingTag: Function,
  onBeforeEditingTag: Function,
  onBeforeSavingTag: Function
}, Er = {
  name: "VueTagsInput",
  components: { TagInput: Tr },
  props: Cr,
  emits: [
    "adding-duplicate",
    "before-adding-tag",
    "before-deleting-tag",
    "before-editing-tag",
    "before-saving-tag",
    "max-tags-reached",
    "saving-duplicate",
    "tags-changed",
    "tag-clicked",
    "update:modelValue",
    "update:tags"
  ],
  inheritAttrs: !1,
  data() {
    return {
      tagCenter: [],
      newTag: null,
      tagsCopy: [],
      tagsEditStatus: null,
      deletionMark: null,
      deletionMarkTime: null,
      selectedItem: null,
      focused: null
    };
  },
  computed: {
    autocompleteOpen() {
      return this.autocompleteAlwaysOpen ? !0 : this.newTag !== null && this.newTag.length >= this.autocompleteMinLength && this.filteredAutocompleteItems.length > 0 && this.focused;
    },
    filteredAutocompleteItems() {
      const e = this.autocompleteItems.map((t) => Q(t, this.tags, this.validation, this.isDuplicate));
      return this.autocompleteFilterDuplicates ? e.filter(this.duplicateFilter) : e;
    }
  },
  methods: {
    createClasses: et,
    getSelectedIndex(e) {
      const t = this.filteredAutocompleteItems, a = this.selectedItem, s = t.length - 1;
      if (t.length !== 0)
        return a === null ? 0 : e === "before" && a === 0 ? s : e === "after" && a === s ? 0 : e === "after" ? a + 1 : a - 1;
    },
    selectDefaultItem() {
      this.addOnlyFromAutocomplete && this.filteredAutocompleteItems.length > 0 ? this.selectedItem = 0 : this.selectedItem = null;
    },
    selectItem(e, t) {
      e.preventDefault(), this.selectedItem = this.getSelectedIndex(t);
    },
    isSelected(e) {
      return this.selectedItem === e;
    },
    isMarked(e) {
      return this.deletionMark === e;
    },
    setTagCenter(e) {
      e && this.tagCenter.push(e);
    },
    invokeDelete() {
      if (!this.deleteOnBackspace || this.newTag.length > 0)
        return;
      const e = this.tagsCopy.length - 1;
      this.deletionMark === null ? (this.deletionMarkTime = setTimeout(() => this.deletionMark = null, 1e3), this.deletionMark = e) : this.performDeleteTag(e);
    },
    addTagsFromPaste() {
      !this.addFromPaste || setTimeout(() => this.performAddTags(this.newTag), 10);
    },
    performEditTag(e) {
      !this.allowEditTags || (this.onBeforeAddingTag || this.editTag(e), this.$emit("before-editing-tag", {
        index: e,
        tag: this.tagsCopy[e],
        editTag: () => this.editTag(e)
      }));
    },
    editTag(e) {
      !this.allowEditTags || (this.toggleEditMode(e), this.focus(e));
    },
    toggleEditMode(e) {
      !this.allowEditTags || this.disabled || (this.tagsEditStatus[e] = !this.tagsEditStatus[e]);
    },
    createChangedTag(e, t) {
      const a = this.tagsCopy[e];
      a.text = t ? t.target.value : this.tagsCopy[e].text, this.tagsCopy[e] = Q(a, this.tagsCopy, this.validation, this.isDuplicate);
    },
    focus(e) {
      this.$nextTick(() => {
        const t = this.tagCenter[e].querySelector("input.ti-tag-input");
        t && t.focus();
      });
    },
    quote(e) {
      return e.replace(/([()[{*+.$^\\|?])/g, "\\$1");
    },
    cancelEdit(e) {
      !this.tags[e] || (this.tagsCopy[e] = q(
        Q(this.tags[e], this.tags, this.validation, this.isDuplicate)
      ), this.tagsEditStatus[e] = !1);
    },
    hasForbiddingAddRule(e) {
      return e.some((t) => {
        const a = this.validation.find((s) => t === s.classes);
        return a ? a.disableAdd : !1;
      });
    },
    createTagTexts(e) {
      const t = new RegExp(this.separators.map((a) => this.quote(a)).join("|"));
      return e.split(t).map((a) => ({ text: a }));
    },
    performDeleteTag(e) {
      this.onBeforeDeletingTag || this.deleteTag(e), this.$emit("before-deleting-tag", {
        index: e,
        tag: this.tagsCopy[e],
        deleteTag: () => this.deleteTag(e)
      });
    },
    deleteTag(e) {
      this.disabled || (this.deletionMark = null, clearTimeout(this.deletionMarkTime), this.tagsCopy.splice(e, 1), this.$emit("update:tags", this.tagsCopy), this.$emit("tags-changed", this.tagsCopy));
    },
    noTriggerKey(e, t) {
      const a = this[t].indexOf(e.keyCode) !== -1 || this[t].indexOf(e.key) !== -1;
      return a && e.preventDefault(), !a;
    },
    performAddTags(e, t, a) {
      if (this.disabled || t && this.noTriggerKey(t, "addOnKey"))
        return;
      let s = [];
      typeof e == "object" && (s = [e]), typeof e == "string" && (s = this.createTagTexts(e)), s = s.filter((r) => r.text.trim().length > 0), s.forEach((r) => {
        r = Q(r, this.tags, this.validation, this.isDuplicate), this.onBeforeAddingTag || this.addTag(r, a), this.$emit("before-adding-tag", {
          tag: r,
          addTag: () => this.addTag(r, a)
        });
      });
    },
    duplicateFilter(e) {
      return this.isDuplicate ? !this.isDuplicate(this.tagsCopy, e) : !this.tagsCopy.find((t) => t.text === e.text);
    },
    addTag(e, t = "new-tag-input") {
      const a = this.filteredAutocompleteItems.map((s) => s.text);
      this.addOnlyFromAutocomplete && a.indexOf(e.text) === -1 || this.$nextTick(() => {
        if (this.maxTags && this.maxTags <= this.tagsCopy.length)
          return this.$emit("max-tags-reached", e);
        if (this.avoidAddingDuplicates && !this.duplicateFilter(e))
          return this.$emit("adding-duplicate", e);
        this.hasForbiddingAddRule(e.tiClasses) || (this.newTag = "", this.tagsCopy.push(e), this.$emit("update:tags", this.tagsCopy), t === "autocomplete" && this.$refs.newTagInput.focus(), this.$emit("tags-changed", this.tagsCopy));
      });
    },
    performSaveTag(e, t) {
      const a = this.tagsCopy[e];
      this.disabled || t && this.noTriggerKey(t, "addOnKey") || a.text.trim().length !== 0 && (this["on-before-saving-tag"] || this.saveTag(e, a), this.$emit("before-saving-tag", {
        index: e,
        tag: a,
        saveTag: () => this.saveTag(e, a)
      }));
    },
    saveTag(e, t) {
      if (this.avoidAddingDuplicates) {
        const a = q(this.tagsCopy), s = a.splice(e, 1)[0];
        if (this.isDuplicate ? this.isDuplicate(a, s) : a.map((u) => u.text).indexOf(s.text) !== -1)
          return this.$emit("saving-duplicate", t);
      }
      this.hasForbiddingAddRule(t.tiClasses) || (this.tagsCopy[e] = t, this.toggleEditMode(e), this.$emit("update:tags", this.tagsCopy), this.$emit("tags-changed", this.tagsCopy));
    },
    tagsEqual() {
      return !this.tagsCopy.some((e, t) => !gr(e, this.tags[t]));
    },
    updateNewTag(e) {
      const t = e.target.value;
      this.newTag = t, this.$emit("update:modelValue", t);
    },
    initTags() {
      this.tagsCopy = yr(this.tags, this.validation, this.isDuplicate), this.tagsEditStatus = q(this.tags).map(() => !1), this.tagsEqual() || this.$emit("update:tags", this.tagsCopy);
    },
    blurredOnClick(e) {
      this.$el.contains(e.target) || this.$el.contains(document.activeElement) || this.performBlur(e);
    },
    performBlur() {
      this.addOnBlur && this.focused && this.performAddTags(this.newTag), this.focused = !1;
    }
  },
  watch: {
    modelValue(e) {
      this.addOnlyFromAutocomplete || (this.selectedItem = null), this.newTag = e;
    },
    tags: {
      handler() {
        this.initTags();
      },
      deep: !0
    },
    autocompleteOpen: "selectDefaultItem"
  },
  created() {
    this.newTag = this.modelValue, this.initTags();
  },
  mounted() {
    this.selectDefaultItem(), document.addEventListener("click", this.blurredOnClick);
  },
  beforeUpdate() {
    this.tagCenter = [];
  },
  unmounted() {
    document.removeEventListener("click", this.blurredOnClick);
  }
};
const Sr = { class: "ti-input" }, wr = {
  key: 0,
  class: "ti-tags"
}, Ar = ["onClick"], Dr = { class: "ti-content" }, Fr = {
  key: 0,
  class: "ti-tag-left"
}, kr = ["onClick"], Or = {
  key: 1,
  class: "ti-tag-right"
}, Vr = { class: "ti-actions" }, Ir = ["onClick"], Br = ["onClick"], Pr = { class: "ti-new-tag-input-wrapper" }, Mr = ["placeholder", "value", "maxlength", "disabled"], jr = ["onMouseover"], zr = ["onClick"];
function Rr(e, t, a, s, r, u) {
  const i = S("tag-input");
  return c(), v("div", {
    class: K(["vue-tags-input", [{ "ti-disabled": e.disabled }, { "ti-focus": e.focused }, e.$attrs.class]]),
    style: ge(e.$attrs.style)
  }, [
    E("div", Sr, [
      e.tagsCopy ? (c(), v("ul", wr, [
        (c(!0), v(U, null, ue(e.tagsCopy, (n, o) => (c(), v("li", {
          key: o,
          style: ge(n.style),
          class: K([[
            { "ti-editing": e.tagsEditStatus[o] },
            n.tiClasses,
            n.classes,
            { "ti-deletion-mark": e.isMarked(o) }
          ], "ti-tag"]),
          tabindex: "0",
          onClick: (h) => e.$emit("tag-clicked", { tag: n, index: o })
        }, [
          E("div", Dr, [
            e.$slots["tag-left"] ? (c(), v("div", Fr, [
              A(e.$slots, "tag-left", {
                tag: n,
                index: o,
                edit: e.tagsEditStatus[o],
                performSaveEdit: e.performSaveTag,
                performDelete: e.performDeleteTag,
                performCancelEdit: e.cancelEdit,
                performOpenEdit: e.performEditTag,
                deletionMark: e.isMarked(o)
              }, void 0, !0)
            ])) : w("", !0),
            E("div", {
              ref_for: !0,
              ref: e.setTagCenter,
              class: "ti-tag-center"
            }, [
              e.$slots["tag-center"] ? w("", !0) : (c(), v("span", {
                key: 0,
                class: K({ "ti-hidden": e.tagsEditStatus[o] }),
                onClick: (h) => e.performEditTag(o)
              }, N(n.text), 11, kr)),
              e.$slots["tag-center"] ? w("", !0) : (c(), O(i, {
                key: 1,
                scope: {
                  edit: e.tagsEditStatus[o],
                  maxlength: e.maxlength,
                  tag: n,
                  index: o,
                  validateTag: e.createChangedTag,
                  performCancelEdit: e.cancelEdit,
                  performSaveEdit: e.performSaveTag
                }
              }, null, 8, ["scope"])),
              A(e.$slots, "tag-center", {
                tag: n,
                index: o,
                maxlength: e.maxlength,
                edit: e.tagsEditStatus[o],
                performSaveEdit: e.performSaveTag,
                performDelete: e.performDeleteTag,
                performCancelEdit: e.cancelEdit,
                validateTag: e.createChangedTag,
                performOpenEdit: e.performEditTag,
                deletionMark: e.isMarked(o)
              }, void 0, !0)
            ], 512),
            e.$slots["tag-right"] ? (c(), v("div", Or, [
              A(e.$slots, "tag-right", {
                tag: n,
                index: o,
                edit: e.tagsEditStatus[o],
                performSaveEdit: e.performSaveTag,
                performDelete: e.performDeleteTag,
                performCancelEdit: e.cancelEdit,
                performOpenEdit: e.performEditTag,
                deletionMark: e.isMarked(o)
              }, void 0, !0)
            ])) : w("", !0)
          ]),
          E("div", Vr, [
            e.$slots["tag-actions"] ? w("", !0) : ie((c(), v("i", {
              key: 0,
              class: "ti-icon-undo",
              onClick: (h) => e.cancelEdit(o)
            }, null, 8, Ir)), [
              [De, e.tagsEditStatus[o]]
            ]),
            e.$slots["tag-actions"] ? w("", !0) : ie((c(), v("i", {
              key: 1,
              class: "ti-icon-close",
              onClick: (h) => e.performDeleteTag(o)
            }, null, 8, Br)), [
              [De, !e.tagsEditStatus[o]]
            ]),
            e.$slots["tag-actions"] ? A(e.$slots, "tag-actions", {
              key: 2,
              tag: n,
              index: o,
              edit: e.tagsEditStatus[o],
              performSaveEdit: e.performSaveTag,
              performDelete: e.performDeleteTag,
              performCancelEdit: e.cancelEdit,
              performOpenEdit: e.performEditTag,
              deletionMark: e.isMarked(o)
            }, void 0, !0) : w("", !0)
          ])
        ], 14, Ar))), 128)),
        E("li", Pr, [
          E("input", Y({ ref: "newTagInput" }, e.$attrs, {
            class: [[e.createClasses(e.newTag, e.tags, e.validation, e.isDuplicate)], "ti-new-tag-input"],
            placeholder: e.placeholder,
            value: e.newTag,
            maxlength: e.maxlength,
            disabled: e.disabled,
            type: "text",
            size: "1",
            onKeydown: [
              t[0] || (t[0] = (n) => e.performAddTags(
                e.filteredAutocompleteItems[e.selectedItem] || e.newTag,
                n
              )),
              t[2] || (t[2] = ne((...n) => e.invokeDelete && e.invokeDelete(...n), ["delete"])),
              t[3] || (t[3] = ne((...n) => e.performBlur && e.performBlur(...n), ["tab"])),
              t[4] || (t[4] = ne((n) => e.selectItem(n, "before"), ["up"])),
              t[5] || (t[5] = ne((n) => e.selectItem(n, "after"), ["down"]))
            ],
            onPaste: t[1] || (t[1] = (...n) => e.addTagsFromPaste && e.addTagsFromPaste(...n)),
            onInput: t[6] || (t[6] = (...n) => e.updateNewTag && e.updateNewTag(...n)),
            onFocus: t[7] || (t[7] = (n) => e.focused = !0),
            onClick: t[8] || (t[8] = (n) => e.addOnlyFromAutocomplete ? !1 : e.selectedItem = null)
          }), null, 16, Mr)
        ])
      ])) : w("", !0)
    ]),
    A(e.$slots, "between-elements", {}, void 0, !0),
    e.autocompleteOpen ? (c(), v("div", {
      key: 0,
      class: "ti-autocomplete",
      onMouseout: t[9] || (t[9] = (n) => e.selectedItem = null)
    }, [
      A(e.$slots, "autocomplete-header", {}, void 0, !0),
      E("ul", null, [
        (c(!0), v(U, null, ue(e.filteredAutocompleteItems, (n, o) => (c(), v("li", {
          key: o,
          style: ge(n.style),
          class: K([[
            n.tiClasses,
            n.classes,
            { "ti-selected-item": e.isSelected(o) }
          ], "ti-item"]),
          onMouseover: (h) => e.disabled ? !1 : e.selectedItem = o
        }, [
          e.$slots["autocomplete-item"] ? A(e.$slots, "autocomplete-item", {
            key: 1,
            item: n,
            index: o,
            performAdd: (h) => e.performAddTags(h, void 0, "autocomplete"),
            selected: e.isSelected(o)
          }, void 0, !0) : (c(), v("div", {
            key: 0,
            onClick: (h) => e.performAddTags(n, void 0, "autocomplete")
          }, N(n.text), 9, zr))
        ], 46, jr))), 128))
      ]),
      A(e.$slots, "autocomplete-footer", {}, void 0, !0)
    ], 32)) : w("", !0)
  ], 6);
}
const Nr = /* @__PURE__ */ H(Er, [["render", Rr], ["__scopeId", "data-v-b8badbc7"]]), Cl = /* @__PURE__ */ P({
  __name: "ATagInput",
  props: {
    modelValue: { default: "" },
    placeholder: { default: "\u589E\u52A0\u6807\u7B7E" },
    disabled: { type: Boolean, default: !1 },
    spliters: { default: () => [";"] }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = te(), r = _(() => {
      const n = [];
      if (a.modelValue) {
        const o = a.spliters, h = new RegExp(o.join("|"), "g"), D = a.modelValue.split(h);
        for (const F of D)
          F.trim() && n.push({ text: F });
      }
      return n;
    }), u = _(() => a.disabled), i = _(() => ({
      addOnKey: [13, ...a.spliters],
      ...s,
      tags: r.value,
      modelValue: "",
      placeholder: a.placeholder,
      disabled: u.value,
      "onTags-changed"(n) {
        const o = n.map((h) => h.text).join(a.spliters[0] + "");
        t("update:modelValue", o);
      }
    }));
    return (n, o) => (c(), O(Nr, Y({ class: "aVueTagsInput" }, $(i), {
      class: { aDisabled: $(u) }
    }), null, 16, ["class"]));
  }
});
const Lr = (e, t = "warning", a) => {
  const s = {
    confirmButtonText: "\u786E\u5B9A",
    cancelButtonText: "\u53D6\u6D88"
  };
  return ct.confirm(e, (a == null ? void 0 : a.title) || "\u63D0\u793A", {
    ...s,
    ...a || {}
  }).then(() => !0).catch(() => !1);
}, Yr = (e) => (ot("data-v-baebffa9"), e = e(), it(), e), Gr = {
  key: 0,
  class: "file-thumb"
}, Kr = {
  key: 1,
  class: "file-thumb-image"
}, Ur = ["src"], Hr = {
  key: 2,
  class: "file-thumb-file"
}, qr = ["href"], xr = {
  key: 0,
  class: "flex ai-center"
}, Wr = /* @__PURE__ */ Yr(() => /* @__PURE__ */ E("p", { class: "cl-grey600 pl025" }, "\u70B9\u51FB\u4E0A\u4F20\u6587\u4EF6", -1)), Jr = {
  key: 2,
  class: "file-list"
}, Xr = { class: "file-list-item" }, Zr = ["href"], Qr = /* @__PURE__ */ P({
  __name: "AFileMgr",
  props: {
    label: { default: "\u9009\u62E9\u6587\u4EF6" },
    action: null,
    headers: null,
    modelValue: null,
    readonly: { type: Boolean, default: !1 },
    singleFile: { type: Boolean, default: !1 },
    fileType: { default: "all" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = _(() => {
      const l = a.modelValue;
      if (a.singleFile) {
        if (Array.isArray(l))
          throw new Error("singleFile\u4E3Atrue\u65F6, modelValue\u53EA\u80FD\u4E3A\u5355\u4E2A\u6587\u4EF6");
        return a.modelValue;
      } else {
        if (!Array.isArray(l))
          throw new Error("singleFile\u4E3Afalse\u65F6, modelValue\u53EA\u80FD\u4E3A\u6587\u4EF6\u5217\u8868");
        return l || [];
      }
    }), r = (l) => l === "all" ? "*" : l === "image" ? "image/*" : l === "file" ? ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.zip,.rar,.7z" : Array.isArray(l) ? l.map(r).join(",") : "*", u = _(() => r(a.fileType)), i = ["pdf", "png", "jpg", "jpeg", "gif"], n = L(!1), o = He({
      accept: u,
      "show-file-list": !1,
      "before-upload"(l) {
        n.value = !0;
      },
      "on-success": (l, d, b) => {
        const T = l == null ? void 0 : l.data;
        if (n.value = !1, !T) {
          console.error("\u4E0A\u4F20\u5931\u8D25");
          return;
        }
        if (a.singleFile)
          t("update:modelValue", T);
        else {
          const M = s.value;
          t("update:modelValue", [...M, T]);
        }
      },
      "on-error"(l, d, b) {
        const T = ft(l.message);
        n.value = !1;
        const M = T == null ? void 0 : T.message;
        M ? he.error(M) : he.error("\u4E0A\u4F20\u5931\u8D25");
      }
    }), h = (l, d) => {
      he.warning(
        `The limit is 3, you selected ${l.length} files this time, add up to ${l.length + d.length} totally`
      );
    }, D = async (l) => {
      const d = l.id;
      if (!await Lr("\u786E\u5B9A\u5220\u9664\u9644\u4EF6\u5417\uFF1F"))
        return !1;
      if (a.singleFile)
        t("update:modelValue", null);
      else {
        const b = s.value;
        t("update:modelValue", b.filter((T) => T.id !== d));
      }
      return !0;
    }, F = (l) => {
      const d = l.filePath;
      if (i.includes(l.fileType))
        window.open(d);
      else {
        const b = document.createElement("a");
        b.href = d, b.download = l.fileName, b.click();
      }
    }, f = (l) => {
      const d = ["jpg", "jpeg", "png", "gif", "bmp"], b = l.fileType;
      if (b)
        return d.includes(b.toLowerCase());
      const T = l.filePath;
      if (T) {
        const j = T.split(".").pop();
        return d.includes((j == null ? void 0 : j.toLowerCase()) || "");
      }
      const M = l.fileName;
      if (M) {
        const j = M.split(".").pop();
        return d.includes((j == null ? void 0 : j.toLowerCase()) || "");
      }
    };
    return (l, d) => {
      var ae;
      const b = S("elementUploadFilled"), T = S("index-icon"), M = S("index-upload"), j = S("elementSelect"), pe = S("ElIcon"), me = lt("loading");
      return ie((c(), v("div", {
        class: K(["AFileMgr", { singleFile: e.singleFile }])
      }, [
        e.singleFile ? (c(), v("div", Gr, [
          (ae = $(s)) != null && ae.filePath ? f($(s)) ? (c(), v("div", Kr, [
            E("img", {
              src: $(s).filePath,
              alt: "\u56FE\u7247\u9884\u89C8"
            }, null, 8, Ur)
          ])) : (c(), v("div", Hr, [
            E("span", {
              href: $(s).url
            }, N($(s).fileName), 9, qr)
          ])) : (c(), v(U, { key: 0 }, [], 64))
        ])) : w("", !0),
        e.readonly ? w("", !0) : (c(), O(M, Y({
          key: 1,
          headers: a.headers,
          action: a.action,
          limit: 10,
          "on-exceed": h
        }, o), {
          default: g(() => [
            a.singleFile ? (c(), v(U, { key: 0 }, [
              a.modelValue ? (c(), O(B, {
                key: 1,
                class: "lite no-ml"
              }, {
                default: g(() => [
                  k("\u91CD\u9009\u6587\u4EF6")
                ]),
                _: 1
              })) : (c(), v("div", xr, [
                y(T, {
                  size: "24px",
                  color: "#b8b8b8",
                  class: "index-icon--upload"
                }, {
                  default: g(() => [
                    y(b)
                  ]),
                  _: 1
                }),
                Wr
              ]))
            ], 64)) : (c(), O(B, {
              key: 1,
              class: "lite",
              type: "primary"
            }, {
              default: g(() => [
                k(N(e.label), 1)
              ]),
              _: 1
            }))
          ]),
          _: 1
        }, 16, ["headers", "action"])),
        e.singleFile ? w("", !0) : (c(), v("ul", Jr, [
          (c(!0), v(U, null, ue($(s), (p, m) => (c(), v("li", Xr, [
            y(pe, {
              class: "mr05",
              color: "#00dd00"
            }, {
              default: g(() => [
                y(j)
              ]),
              _: 1
            }),
            E("span", {
              class: "item-name",
              href: p.url
            }, N(p.fileName), 9, Zr),
            y(B, {
              class: "lite ml-auto-i",
              type: "default",
              onClick: (C) => F(p)
            }, {
              default: g(() => [
                k(N(i.includes(p.fileType) ? "\u9884\u89C8" : "\u4E0B\u8F7D"), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            e.readonly ? w("", !0) : (c(), O(B, {
              key: 0,
              class: "lite item-delete",
              type: "danger",
              onClick: (C) => D(p)
            }, {
              default: g(() => [
                k("\u5220\u9664")
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ]))), 256))
        ]))
      ], 2)), [
        [me, n.value]
      ]);
    };
  }
});
const El = /* @__PURE__ */ H(Qr, [["__scopeId", "data-v-baebffa9"]]), Sl = /* @__PURE__ */ P({
  __name: "ADrawer",
  props: {
    positionAbs: { type: Boolean }
  },
  setup(e, { emit: t }) {
    const a = e, s = te(), r = _(() => ({
      ...s
    })), u = "a-drawer-position-absolute", i = L();
    return ut(() => {
      ee(() => a.positionAbs, (n) => {
        var D, F;
        const o = (F = (D = i == null ? void 0 : i.value) == null ? void 0 : D.$refs) == null ? void 0 : F.drawerRef, h = o == null ? void 0 : o.parentElement;
        h && (a.positionAbs ? h.classList.add(u) : h.classList.remove(u));
      }, { immediate: !0 });
    }), (n, o) => {
      const h = S("ElDrawer");
      return c(), O(h, Y($(r), {
        "custom-class": "ADrawer",
        ref_key: "drawerEl",
        ref: i
      }), {
        default: g(() => [
          A(n.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const el = /* @__PURE__ */ P({
  __name: "APopover",
  props: {
    renderWhenReady: { type: Boolean, default: !0 },
    virtual: { type: Boolean, default: !1 }
  },
  setup(e, { emit: t }) {
    const a = e, s = te(), r = _(() => a.renderWhenReady ? u.value : !0), u = L(!1), i = _(() => ({
      ...s,
      onShow() {
        var n;
        u.value = !0, (n = s == null ? void 0 : s.onShow) == null || n.call(s);
      }
    }));
    return (n, o) => {
      const h = S("ElPopover");
      return a.virtual ? A(n.$slots, "content", { key: 1 }, void 0, !0) : (c(), O(h, Y({
        key: 0,
        class: "APopover"
      }, $(i)), {
        reference: g(() => [
          A(n.$slots, "reference", { hasReady: u.value }, void 0, !0)
        ]),
        default: g(() => [
          $(r) ? A(n.$slots, "default", { key: 0 }, void 0, !0) : w("", !0)
        ]),
        _: 3
      }, 16));
    };
  }
});
const tl = /* @__PURE__ */ H(el, [["__scopeId", "data-v-dc81d742"]]), al = { class: "ADateRange" }, sl = {
  key: 0,
  class: "pr10"
}, nl = /* @__PURE__ */ E("span", { class: "label" }, "\u4ECE", -1), rl = /* @__PURE__ */ E("span", { class: "label inner" }, "\u5230", -1), ll = { class: "label" }, ol = { class: "list flex wrap jc-center" }, il = { class: "list-item" }, ul = { class: "list-item" }, dl = { class: "list-item" }, cl = { class: "list-item" }, fl = { class: "list-item" }, pl = { class: "list-item" }, ml = { class: "flex jc-center" }, gl = /* @__PURE__ */ E("div", { class: "h15" }, null, -1), wl = /* @__PURE__ */ P({
  __name: "ADateRange",
  props: {
    size: { default: "" },
    modelValue: null,
    outputFormat: { default: "" },
    defaultMode: { default: "date" },
    label: null,
    defaultValue: null
  },
  emits: ["update:modelValue", "update:start", "update:end"],
  setup(e, { emit: t }) {
    const a = e, s = new Date(), r = new Date(s.getTime() - 7 * 24 * 60 * 60 * 1e3), u = He({
      visible: !1,
      ref: null
    }), i = L(null), n = L(a.defaultMode), o = _(() => n.value != "date"), h = () => {
      n.value = "date";
    }, D = _(() => n.value == "week" ? "\u661F\u671F" : n.value == "month" ? "\u6708\u4EFD" : "\u5E74\u4EFD");
    ee(n, async (p) => {
      var m, C;
      u.visible = !1, p != "date" && (await ye(), (C = (m = i == null ? void 0 : i.value) == null ? void 0 : m.handleOpen) == null || C.call(m));
    });
    const F = (p, m = 1) => {
      const C = V();
      if (p == "week")
        d.value = C.toDate(), l.value = C.subtract(m, "week").toDate();
      else if (p == "month")
        d.value = C.toDate(), l.value = C.subtract(m, "month").toDate();
      else if (p == "year")
        d.value = C.toDate(), l.value = C.subtract(m, "year").toDate();
      else {
        F("week", m | 1);
        return;
      }
      u.visible = !1, b();
    }, f = [], l = L(), d = L();
    ee(() => a.modelValue, (p, m) => {
      if (p && m) {
        const C = p.map((R) => V(R).format("YYYY-MM-DD")), z = m.map((R) => V(R).format("YYYY-MM-DD"));
        if (C[0] === z[0] && C[1] === z[1])
          return;
      }
      p ? (l.value = p[0] ? V(p[0]).toDate() : null, d.value = p[1] ? V(p[1]).toDate() : null) : a.defaultValue ? (l.value = a.defaultValue[0] ? V(a.defaultValue[0]).toDate() : null, d.value = a.defaultValue[1] ? V(a.defaultValue[1]).toDate() : null) : (l.value = r, d.value = s), f[0] = new Date(l.value), f[1] = new Date(d.value);
    }, { immediate: !0 });
    const b = () => {
      var R, se;
      const p = l.value, m = d.value;
      let C = !0;
      if (C = C && p && p.getTime() == ((R = f[0]) == null ? void 0 : R.getTime()), C = C && m && m.getTime() == ((se = f[1]) == null ? void 0 : se.getTime()), C)
        return;
      f[0] = new Date(p), f[1] = new Date(m);
      debugger;
      p && m && p.getTime() > m.getTime() && (l.value = m, d.value = p);
      let z;
      if (a.outputFormat) {
        let G = a.outputFormat;
        G == "Y-M-D" ? G = "YYYY-MM-DD" : G == "Y-M" ? G = "YYYY-MM" : G == "Y" && (G = "YYYY"), z = [l.value, d.value].map((X) => X ? V(X).format(G) : null);
      } else
        z = [l.value, d.value];
      t("update:modelValue", z), t("update:start", z[0]), t("update:end", z[1]);
    }, T = _(() => ({
      editable: !1,
      clearable: !1,
      size: a.size,
      type: n.value,
      "onVisible-change"(p) {
        ye(() => {
          if (!p) {
            debugger;
            b();
          }
        });
      }
    })), M = async (p) => {
      l.value = p;
    }, j = async (p) => {
      d.value = p;
    }, pe = _(() => ({
      ...T.value,
      "onUpdate:modelValue": M,
      modelValue: l.value
    })), me = _(() => ({
      ...T.value,
      "onUpdate:modelValue": j,
      modelValue: d.value
    })), ae = _(() => ({
      ...T.value,
      "onUpdate:modelValue"(p) {
        n.value == "month" ? (l.value = V(p).startOf("month").toDate(), d.value = V(p).endOf("month").toDate()) : n.value == "year" ? (l.value = V(p).startOf("year").toDate(), d.value = V(p).endOf("year").toDate()) : n.value == "week" && (l.value = V(p).startOf("week").toDate(), d.value = V(p).endOf("week").toDate()), b(), h();
      },
      modelValue: l.value
    }));
    return (p, m) => {
      const C = S("ElDatePicker"), z = S("index-divider"), R = S("index-radio-button"), se = S("index-radio-group"), G = S("elementOperation"), X = S("index-icon"), we = S("index-button"), tt = S("elementClose");
      return c(), v("div", al, [
        e.label ? (c(), v("span", sl, N(e.label), 1)) : w("", !0),
        $(o) ? (c(), v(U, { key: 2 }, [
          E("span", ll, N($(D)) + "\u9009\u62E9", 1),
          y(C, Y($(ae), {
            ref_key: "singleViewDatePickerRef",
            ref: i
          }), null, 16)
        ], 64)) : (c(), v(U, { key: 1 }, [
          nl,
          y(C, Fe(ke($(pe))), null, 16),
          rl,
          y(C, Fe(ke($(me))), null, 16)
        ], 64)),
        y(tl, {
          width: "360px",
          "popper-class": "ADateRange",
          trigger: "click",
          ref: (I) => u.ref = I,
          visible: u.visible,
          "onUpdate:visible": m[7] || (m[7] = (I) => u.visible = I)
        }, {
          reference: g(() => [
            y(we, {
              class: "more-btn",
              plain: "",
              circle: "",
              size: "small"
            }, {
              default: g(() => [
                y(X, null, {
                  default: g(() => [
                    y(G)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          default: g(() => [
            y(z, null, {
              default: g(() => [
                k("\u5E38\u7528\u65E5\u671F\u8303\u56F4")
              ]),
              _: 1
            }),
            E("div", ol, [
              E("div", il, [
                y(B, {
                  class: "lite",
                  onClick: m[0] || (m[0] = (I) => F("week", 1))
                }, {
                  default: g(() => [
                    k("1\u5468\u5185")
                  ]),
                  _: 1
                })
              ]),
              E("div", ul, [
                y(B, {
                  class: "lite",
                  onClick: m[1] || (m[1] = (I) => F("week", 2))
                }, {
                  default: g(() => [
                    k("2\u5468\u5185")
                  ]),
                  _: 1
                })
              ]),
              E("div", dl, [
                y(B, {
                  class: "lite",
                  onClick: m[2] || (m[2] = (I) => F("month", 1))
                }, {
                  default: g(() => [
                    k("1\u4E2A\u6708\u5185")
                  ]),
                  _: 1
                })
              ]),
              E("div", cl, [
                y(B, {
                  class: "lite",
                  onClick: m[3] || (m[3] = (I) => F("month", 3))
                }, {
                  default: g(() => [
                    k("3\u4E2A\u6708\u5185")
                  ]),
                  _: 1
                })
              ]),
              E("div", fl, [
                y(B, {
                  class: "lite",
                  onClick: m[4] || (m[4] = (I) => F("month", 6))
                }, {
                  default: g(() => [
                    k("6\u4E2A\u6708\u5185")
                  ]),
                  _: 1
                })
              ]),
              E("div", pl, [
                y(B, {
                  class: "lite",
                  onClick: m[5] || (m[5] = (I) => F("year", 1))
                }, {
                  default: g(() => [
                    k("\u4E00\u5E74\u5185")
                  ]),
                  _: 1
                })
              ])
            ]),
            y(z, null, {
              default: g(() => [
                k("\u65E5\u671F\u7C7B\u578B")
              ]),
              _: 1
            }),
            E("div", ml, [
              y(se, {
                class: "m-auto",
                modelValue: $(n),
                "onUpdate:modelValue": m[6] || (m[6] = (I) => dt(n) ? n.value = I : null)
              }, {
                default: g(() => [
                  y(R, {
                    size: "small",
                    label: "date"
                  }, {
                    default: g(() => [
                      k("\u81EA\u5B9A\u4E49\u8303\u56F4")
                    ]),
                    _: 1
                  }),
                  y(R, {
                    size: "small",
                    label: "week"
                  }, {
                    default: g(() => [
                      k("\u661F\u671F")
                    ]),
                    _: 1
                  }),
                  y(R, {
                    size: "small",
                    label: "month"
                  }, {
                    default: g(() => [
                      k("\u6708\u4EFD")
                    ]),
                    _: 1
                  }),
                  y(R, {
                    size: "small",
                    label: "year"
                  }, {
                    default: g(() => [
                      k("\u5E74\u4EFD")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            gl
          ]),
          _: 1
        }, 8, ["visible"]),
        l.value || d.value ? (c(), O(we, {
          key: 3,
          class: "more-btn",
          plain: "",
          circle: "",
          size: "small",
          type: "info",
          onClick: m[8] || (m[8] = (I) => (l.value = null, d.value = null, b(), h()))
        }, {
          default: g(() => [
            y(X, null, {
              default: g(() => [
                y(tt)
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : w("", !0)
      ]);
    };
  }
});
const hl = { class: "label-content" }, Ke = /* @__PURE__ */ P({
  __name: "ASelect",
  props: {
    modelValue: { default: "" },
    disabled: { type: Boolean, default: !1 },
    options: { default: () => [] },
    keyField: { default: "id" },
    labelField: { default: "name" },
    justLabel: { type: Boolean, default: !1 },
    placeholder: { default: "\u8BF7\u9009\u62E9" },
    disableAutoWidth: { type: Boolean, default: !1 },
    blankTextPlaceholder: { default: "-" }
  },
  emits: ["update:modelValue", "data-ready"],
  setup(e, { emit: t }) {
    const a = e, s = te(), r = L([]);
    ee(() => a.options, async (f) => {
      let l = await Promise.resolve(f).catch((T) => (console.error("ASelect options error", T), []));
      l || (l = []);
      const d = pt(l, {
        valueGetField: a.keyField,
        nameGetField: a.labelField,
        valueSetField: "value",
        nameSetField: "label"
      });
      let b = d.find((T) => T.value == a.modelValue);
      t("data-ready", b, d), r.value = d;
    }, { immediate: !0 });
    const u = _(() => {
      let f = {};
      return r.value.forEach((l) => {
        f[l.value + ""] = l;
      }), f;
    }), i = _(() => u.value[a.modelValue + ""]), n = _(() => {
      var f;
      return ((f = i.value) == null ? void 0 : f.label) || a.placeholder;
    }), o = _(() => {
      var f;
      return ((f = i.value) == null ? void 0 : f.label) || a.blankTextPlaceholder;
    }), h = _(() => !i), D = _(() => !i.value), F = _(() => ({
      placeholder: a.placeholder,
      ...s,
      modelValue: a.modelValue + "",
      "onUpdate:modelValue"(f) {
        const l = u.value[f];
        l ? t("update:modelValue", l.value) : t("update:modelValue", f);
      }
    }));
    return (f, l) => {
      const d = S("ElOption"), b = S("ElSelect");
      return a.justLabel ? (c(), v("span", {
        key: 1,
        class: K(["aSelect text-mode", { isEmpty: $(D), noMatched: $(h) }])
      }, N($(o)), 3)) : (c(), O(b, Y({
        key: 0,
        class: "aSelect"
      }, $(F), {
        class: { aDisabled: e.disabled, isEmpty: $(D), isSelected: !$(D), disableAutoWidth: e.disableAutoWidth }
      }), {
        prefix: g(() => [
          E("p", hl, N($(n)), 1)
        ]),
        default: g(() => [
          A(f.$slots, "default"),
          (c(!0), v(U, null, ue(r.value, (T) => (c(), O(d, {
            key: T.value,
            label: T.label,
            value: T.value + ""
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 3
      }, 16, ["class"]));
    };
  }
});
const Ue = P({
  components: {
    ASelect: Ke
  },
  props: {
    apiParams: {
      default: ""
    },
    requestWhenApiParamsBlank: {
      type: Boolean,
      default: !0
    },
    api: {
      required: !0,
      type: Function
    },
    listPath: {
      type: String,
      default: "data"
    }
  },
  setup(e, t) {
    const a = L([]);
    return ee(() => e.apiParams, async (s) => {
      !s && !e.requestWhenApiParamsBlank ? a.value = [] : a.value = e.api(s).then((r) => oe(r, e.listPath, []));
    }, { immediate: !0 }), () => /* @__PURE__ */ React.createElement(Ke, {
      ...t.attrs,
      options: a.value
    });
  }
}), Al = (e, t = "data.list", a = "name", s = "id") => P({
  components: {
    SelectFromRequest: Ue
  },
  setup(r, u) {
    return () => /* @__PURE__ */ React.createElement(Ue, {
      api: e,
      listPath: t,
      labelField: a,
      idField: s,
      ...u.attrs
    });
  }
});
export {
  B as AButton,
  wl as ADateRange,
  bl as ADialog,
  Sl as ADrawer,
  El as AFileMgr,
  Tl as AFormCreate,
  $l as APage,
  tl as APopover,
  Ke as ASelect,
  Cl as ATagInput,
  Ue as SelectFromRequest,
  Al as generateSelect,
  Lr as globalConfirm
};
