import { defineComponent as j, computed as S, resolveComponent as C, openBlock as _, createBlock as P, mergeProps as L, withCtx as m, renderSlot as R, useSlots as tt, normalizeClass as ae, resolveDynamicComponent as Ce, createCommentVNode as z, createTextVNode as F, toDisplayString as U, watchEffect as Le, useAttrs as J, ref as T, provide as at, createElementBlock as A, unref as y, Fragment as K, createVNode as b, nextTick as le, reactive as Ye, resolveDirective as lt, withDirectives as rt, createElementVNode as O, renderList as Ge, pushScopeId as nt, popScopeId as st, onMounted as ot, watch as q, normalizeProps as ve, guardReactiveProps as he, isRef as ut, shallowRef as He, markRaw as fe } from "vue";
import it from "@sipec/vue3-tags-input";
import { ElMessageBox as ct, ElMessage as me } from "element-plus";
import { safeJsonParser as dt, dayjs2 as k, all2valueName as ft, BPromise as mt } from "@ioto/core";
import { merge as pt, set as E, get as pe, debounce as _t } from "lodash";
import ye from "@form-create/element-ui";
import { default as js, maker as zs } from "@form-create/element-ui";
const vt = j(
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
        vBind: S(() => ({
          title: "\u6807\u9898",
          closeOnClickModal: !1,
          ...t.attrs
        }))
      };
    }
  }
);
function ht(e, t, a, l, o, n) {
  const u = C("index-dialog");
  return _(), P(u, L({ class: "a-dialog" }, e.vBind), {
    header: m(() => [
      R(e.$slots, "header")
    ]),
    default: m(() => [
      R(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const re = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [l, o] of t)
    a[l] = o;
  return a;
}, Ss = /* @__PURE__ */ re(vt, [["render", ht]]), yt = j({
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
    const a = S(() => ({
      ...t.attrs
    })), l = tt(), o = S(() => {
      const u = {};
      return l.default && (u.mr025 = !0), u;
    }), n = S(() => {
      const u = {};
      return l.default && (u.ml025 = !0), u;
    });
    return {
      iconPrevClasses: o,
      iconSuffixClasses: n,
      vBind: a
    };
  }
});
function bt(e, t, a, l, o, n) {
  const u = C("index-icon"), i = C("ElButton");
  return _(), P(i, L({
    class: "a-button",
    type: "primary"
  }, e.vBind, {
    class: { lite: e.lite }
  }), {
    tip: m(() => [
      R(e.$slots, "tip")
    ]),
    default: m(() => [
      R(e.$slots, "icon", {}, () => [
        e.icon ? (_(), P(u, {
          key: 0,
          class: ae(e.iconPrevClasses)
        }, {
          default: m(() => [
            (_(), P(Ce(e.icon)))
          ]),
          _: 1
        }, 8, ["class"])) : z("", !0)
      ]),
      R(e.$slots, "default", {}, () => [
        F(U(e.label), 1)
      ]),
      R(e.$slots, "suffix", {}, () => [
        e.suffix ? (_(), P(u, {
          key: 0,
          class: ae({ iconSuffixClasses: e.iconSuffixClasses })
        }, {
          default: m(() => [
            (_(), P(Ce(e.suffix)))
          ]),
          _: 1
        }, 8, ["class"])) : z("", !0)
      ])
    ]),
    _: 3
  }, 16, ["class"]);
}
const N = /* @__PURE__ */ re(yt, [["render", bt]]), gt = j(
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
        vBind: S(() => ({
          pagerCount: 5,
          pageSizes: [10, 20, 30],
          background: !0,
          layout: "total, sizes, prev, pager, next, jumper",
          ...t.attrs,
          ...e,
          "onUpdate:currentPage": (o) => {
            a("update:currentPage", o);
          },
          "onUpdate:pageSize": (o) => {
            a("update:pageSize", o);
          },
          "onSize-change": (o) => {
            a("size-change", o);
          },
          "onCurrent-change": (o) => {
            a("current-change", o);
          }
        }))
      };
    }
  }
);
function $t(e, t, a, l, o, n) {
  const u = C("index-pagination");
  return _(), P(u, L({ class: "a-page" }, e.vBind), null, 16);
}
const ws = /* @__PURE__ */ re(gt, [["render", $t]]);
var se = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, St = typeof se == "object" && se && se.Object === Object && se, wt = St, Dt = wt, xt = typeof self == "object" && self && self.Object === Object && self, Vt = Dt || xt || Function("return this")(), be = Vt, Ct = be, Et = Ct.Symbol, ge = Et, Ee = ge, We = Object.prototype, At = We.hasOwnProperty, Ft = We.toString, te = Ee ? Ee.toStringTag : void 0;
function Bt(e) {
  var t = At.call(e, te), a = e[te];
  try {
    e[te] = void 0;
    var l = !0;
  } catch {
  }
  var o = Ft.call(e);
  return l && (t ? e[te] = a : delete e[te]), o;
}
var Tt = Bt, Pt = Object.prototype, Ot = Pt.toString;
function Rt(e) {
  return Ot.call(e);
}
var kt = Rt, Ae = ge, jt = Tt, zt = kt, It = "[object Null]", Mt = "[object Undefined]", Fe = Ae ? Ae.toStringTag : void 0;
function Nt(e) {
  return e == null ? e === void 0 ? Mt : It : Fe && Fe in Object(e) ? jt(e) : zt(e);
}
var Ue = Nt;
function Lt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var $e = Lt, Yt = Ue, Gt = $e, Ht = "[object AsyncFunction]", Wt = "[object Function]", Ut = "[object GeneratorFunction]", Kt = "[object Proxy]";
function qt(e) {
  if (!Gt(e))
    return !1;
  var t = Yt(e);
  return t == Wt || t == Ut || t == Ht || t == Kt;
}
var Jt = qt, Xt = be, Zt = Xt["__core-js_shared__"], Qt = Zt, _e = Qt, Be = function() {
  var e = /[^.]+$/.exec(_e && _e.keys && _e.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function ea(e) {
  return !!Be && Be in e;
}
var ta = ea, aa = Function.prototype, la = aa.toString;
function ra(e) {
  if (e != null) {
    try {
      return la.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var na = ra, sa = Jt, oa = ta, ua = $e, ia = na, ca = /[\\^$.*+?()[\]{}|]/g, da = /^\[object .+?Constructor\]$/, fa = Function.prototype, ma = Object.prototype, pa = fa.toString, _a = ma.hasOwnProperty, va = RegExp(
  "^" + pa.call(_a).replace(ca, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ha(e) {
  if (!ua(e) || oa(e))
    return !1;
  var t = sa(e) ? va : da;
  return t.test(ia(e));
}
var ya = ha;
function ba(e, t) {
  return e == null ? void 0 : e[t];
}
var ga = ba, $a = ya, Sa = ga;
function wa(e, t) {
  var a = Sa(e, t);
  return $a(a) ? a : void 0;
}
var Se = wa, Da = Se, xa = function() {
  try {
    var e = Da(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Va = xa, Te = Va;
function Ca(e, t, a) {
  t == "__proto__" && Te ? Te(e, t, {
    configurable: !0,
    enumerable: !0,
    value: a,
    writable: !0
  }) : e[t] = a;
}
var Ea = Ca;
function Aa(e, t) {
  return e === t || e !== e && t !== t;
}
var Ke = Aa, Fa = Ea, Ba = Ke, Ta = Object.prototype, Pa = Ta.hasOwnProperty;
function Oa(e, t, a) {
  var l = e[t];
  (!(Pa.call(e, t) && Ba(l, a)) || a === void 0 && !(t in e)) && Fa(e, t, a);
}
var Ra = Oa, ka = Array.isArray, we = ka;
function ja(e) {
  return e != null && typeof e == "object";
}
var za = ja, Ia = Ue, Ma = za, Na = "[object Symbol]";
function La(e) {
  return typeof e == "symbol" || Ma(e) && Ia(e) == Na;
}
var De = La, Ya = we, Ga = De, Ha = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Wa = /^\w*$/;
function Ua(e, t) {
  if (Ya(e))
    return !1;
  var a = typeof e;
  return a == "number" || a == "symbol" || a == "boolean" || e == null || Ga(e) ? !0 : Wa.test(e) || !Ha.test(e) || t != null && e in Object(t);
}
var Ka = Ua, qa = Se, Ja = qa(Object, "create"), ie = Ja, Pe = ie;
function Xa() {
  this.__data__ = Pe ? Pe(null) : {}, this.size = 0;
}
var Za = Xa;
function Qa(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var el = Qa, tl = ie, al = "__lodash_hash_undefined__", ll = Object.prototype, rl = ll.hasOwnProperty;
function nl(e) {
  var t = this.__data__;
  if (tl) {
    var a = t[e];
    return a === al ? void 0 : a;
  }
  return rl.call(t, e) ? t[e] : void 0;
}
var sl = nl, ol = ie, ul = Object.prototype, il = ul.hasOwnProperty;
function cl(e) {
  var t = this.__data__;
  return ol ? t[e] !== void 0 : il.call(t, e);
}
var dl = cl, fl = ie, ml = "__lodash_hash_undefined__";
function pl(e, t) {
  var a = this.__data__;
  return this.size += this.has(e) ? 0 : 1, a[e] = fl && t === void 0 ? ml : t, this;
}
var _l = pl, vl = Za, hl = el, yl = sl, bl = dl, gl = _l;
function X(e) {
  var t = -1, a = e == null ? 0 : e.length;
  for (this.clear(); ++t < a; ) {
    var l = e[t];
    this.set(l[0], l[1]);
  }
}
X.prototype.clear = vl;
X.prototype.delete = hl;
X.prototype.get = yl;
X.prototype.has = bl;
X.prototype.set = gl;
var $l = X;
function Sl() {
  this.__data__ = [], this.size = 0;
}
var wl = Sl, Dl = Ke;
function xl(e, t) {
  for (var a = e.length; a--; )
    if (Dl(e[a][0], t))
      return a;
  return -1;
}
var ce = xl, Vl = ce, Cl = Array.prototype, El = Cl.splice;
function Al(e) {
  var t = this.__data__, a = Vl(t, e);
  if (a < 0)
    return !1;
  var l = t.length - 1;
  return a == l ? t.pop() : El.call(t, a, 1), --this.size, !0;
}
var Fl = Al, Bl = ce;
function Tl(e) {
  var t = this.__data__, a = Bl(t, e);
  return a < 0 ? void 0 : t[a][1];
}
var Pl = Tl, Ol = ce;
function Rl(e) {
  return Ol(this.__data__, e) > -1;
}
var kl = Rl, jl = ce;
function zl(e, t) {
  var a = this.__data__, l = jl(a, e);
  return l < 0 ? (++this.size, a.push([e, t])) : a[l][1] = t, this;
}
var Il = zl, Ml = wl, Nl = Fl, Ll = Pl, Yl = kl, Gl = Il;
function Z(e) {
  var t = -1, a = e == null ? 0 : e.length;
  for (this.clear(); ++t < a; ) {
    var l = e[t];
    this.set(l[0], l[1]);
  }
}
Z.prototype.clear = Ml;
Z.prototype.delete = Nl;
Z.prototype.get = Ll;
Z.prototype.has = Yl;
Z.prototype.set = Gl;
var Hl = Z, Wl = Se, Ul = be, Kl = Wl(Ul, "Map"), ql = Kl, Oe = $l, Jl = Hl, Xl = ql;
function Zl() {
  this.size = 0, this.__data__ = {
    hash: new Oe(),
    map: new (Xl || Jl)(),
    string: new Oe()
  };
}
var Ql = Zl;
function er(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var tr = er, ar = tr;
function lr(e, t) {
  var a = e.__data__;
  return ar(t) ? a[typeof t == "string" ? "string" : "hash"] : a.map;
}
var de = lr, rr = de;
function nr(e) {
  var t = rr(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var sr = nr, or = de;
function ur(e) {
  return or(this, e).get(e);
}
var ir = ur, cr = de;
function dr(e) {
  return cr(this, e).has(e);
}
var fr = dr, mr = de;
function pr(e, t) {
  var a = mr(this, e), l = a.size;
  return a.set(e, t), this.size += a.size == l ? 0 : 1, this;
}
var _r = pr, vr = Ql, hr = sr, yr = ir, br = fr, gr = _r;
function Q(e) {
  var t = -1, a = e == null ? 0 : e.length;
  for (this.clear(); ++t < a; ) {
    var l = e[t];
    this.set(l[0], l[1]);
  }
}
Q.prototype.clear = vr;
Q.prototype.delete = hr;
Q.prototype.get = yr;
Q.prototype.has = br;
Q.prototype.set = gr;
var $r = Q, qe = $r, Sr = "Expected a function";
function xe(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Sr);
  var a = function() {
    var l = arguments, o = t ? t.apply(this, l) : l[0], n = a.cache;
    if (n.has(o))
      return n.get(o);
    var u = e.apply(this, l);
    return a.cache = n.set(o, u) || n, u;
  };
  return a.cache = new (xe.Cache || qe)(), a;
}
xe.Cache = qe;
var wr = xe, Dr = wr, xr = 500;
function Vr(e) {
  var t = Dr(e, function(l) {
    return a.size === xr && a.clear(), l;
  }), a = t.cache;
  return t;
}
var Cr = Vr, Er = Cr, Ar = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Fr = /\\(\\)?/g, Br = Er(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Ar, function(a, l, o, n) {
    t.push(o ? n.replace(Fr, "$1") : l || a);
  }), t;
}), Tr = Br;
function Pr(e, t) {
  for (var a = -1, l = e == null ? 0 : e.length, o = Array(l); ++a < l; )
    o[a] = t(e[a], a, e);
  return o;
}
var Or = Pr, Re = ge, Rr = Or, kr = we, jr = De, zr = 1 / 0, ke = Re ? Re.prototype : void 0, je = ke ? ke.toString : void 0;
function Je(e) {
  if (typeof e == "string")
    return e;
  if (kr(e))
    return Rr(e, Je) + "";
  if (jr(e))
    return je ? je.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -zr ? "-0" : t;
}
var Ir = Je, Mr = Ir;
function Nr(e) {
  return e == null ? "" : Mr(e);
}
var Lr = Nr, Yr = we, Gr = Ka, Hr = Tr, Wr = Lr;
function Ur(e, t) {
  return Yr(e) ? e : Gr(e, t) ? [e] : Hr(Wr(e));
}
var Xe = Ur, Kr = 9007199254740991, qr = /^(?:0|[1-9]\d*)$/;
function Jr(e, t) {
  var a = typeof e;
  return t = t == null ? Kr : t, !!t && (a == "number" || a != "symbol" && qr.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Xr = Jr, Zr = De, Qr = 1 / 0;
function en(e) {
  if (typeof e == "string" || Zr(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Qr ? "-0" : t;
}
var Ze = en, tn = Ra, an = Xe, ln = Xr, ze = $e, rn = Ze;
function nn(e, t, a, l) {
  if (!ze(e))
    return e;
  t = an(t, e);
  for (var o = -1, n = t.length, u = n - 1, i = e; i != null && ++o < n; ) {
    var f = rn(t[o]), g = a;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return e;
    if (o != u) {
      var V = i[f];
      g = l ? l(V, f, i) : void 0, g === void 0 && (g = ze(V) ? V : ln(t[o + 1]) ? [] : {});
    }
    tn(i, f, g), i = i[f];
  }
  return e;
}
var sn = nn, on = sn;
function un(e, t, a) {
  return e == null ? e : on(e, t, a);
}
var oe = un, cn = Xe, dn = Ze;
function fn(e, t) {
  t = cn(t, e);
  for (var a = 0, l = t.length; e != null && a < l; )
    e = e[dn(t[a++])];
  return a && a == l ? e : void 0;
}
var mn = fn, pn = mn;
function _n(e, t, a) {
  var l = e == null ? void 0 : pn(e, t);
  return l === void 0 ? a : l;
}
var ue = _n;
const vn = {
  key: 1,
  class: "footer"
}, hn = /* @__PURE__ */ F("\u63D0\u4EA4"), yn = /* @__PURE__ */ F("\u91CD\u7F6E"), Ds = /* @__PURE__ */ j({
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
    let l = {};
    Le(() => {
      l = {
        ...a.mergedValue,
        ...a.modelValue
      };
    });
    const o = J(), n = T(0);
    at("a-form-create", {
      beforeButmitSeed: n
    });
    const u = S(() => {
      const v = a.option || {};
      return a.labelWidth && oe(v, "form.labelWidth", a.labelWidth), a.noSubmitBtn && oe(v, "submitBtn.show", !1), ue(v, "submitBtn.size"), ue(v, "form.size"), ue(v, "resetBtn") || oe(v, "resetBtn.show", !1), a.disabled && oe(v, "form.disabled", !0), v;
    }), i = S(() => {
      var v, s;
      return (s = (v = u.value) == null ? void 0 : v.form) == null ? void 0 : s.disabled;
    });
    let f = null;
    const g = async (...v) => {
      let s;
      if (n.value++, !f)
        return console.warn("fc is null");
      if (await le(), a.beforeSubmit) {
        const c = await a.beforeSubmit({ ...f.formData() }, ...v);
        if (c === !1)
          return;
        c ? s = c : s = {};
      } else
        s = {};
      const r = { ...f.formData(), ...s };
      a.autoValidate && await f.validate().catch((c) => {
        throw "";
      }), t("submit", r, f, ...v);
    }, V = (...v) => {
      if (!f)
        return console.warn("fc is null");
      f.resetFields(), t("reset", f, ...v);
    }, w = S(() => {
      const v = Object.assign({}, a.modelValue, a.mergedValue);
      let s = a.rule || a.rules || [];
      return s = s.map((r) => Array.isArray(r) ? aMaker.rawText(...r) : r), {
        ...o,
        rule: s,
        modelValue: v,
        "onUpdate:modelValue"(r) {
          t("update:modelValue", r), l = { ...l, ...r }, t("update:mergedValue", l);
        },
        "onUpdate:api"(r) {
          f = r, t("update:api", r), t("ready", r);
        }
      };
    });
    return T(!1), (v, s) => {
      const r = C("form-create");
      return _(), A("div", {
        class: ae(["a-form-create", [`compact-${e.compact}`]])
      }, [
        y(u) ? (_(), P(r, L({ key: 0 }, y(w), { option: y(u) }), null, 16, ["option"])) : z("", !0),
        y(i) ? z("", !0) : (_(), A("div", vn, [
          R(v.$slots, "footer", {
            submit: g,
            reset: V
          }, () => [
            a.noFooter ? z("", !0) : (_(), A(K, { key: 0 }, [
              R(v.$slots, "before-footer"),
              b(N, {
                class: "ph20",
                onClick: s[0] || (s[0] = (c) => g()),
                type: "success",
                icon: "elementCircleCheckFilled"
              }, {
                default: m(() => [
                  hn
                ]),
                _: 1
              }),
              b(N, {
                type: "warning",
                onClick: s[1] || (s[1] = (c) => V()),
                icon: "elementRefreshLeft"
              }, {
                default: m(() => [
                  yn
                ]),
                _: 1
              }),
              R(v.$slots, "after-footer")
            ], 64))
          ])
        ]))
      ], 2);
    };
  }
});
const xs = /* @__PURE__ */ j({
  props: {
    modelValue: { default: "" },
    placeholder: { default: "\u589E\u52A0\u6807\u7B7E" },
    disabled: { type: Boolean, default: !1 },
    spliters: { default: () => [";"] }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, l = J(), o = S(() => {
      const i = [];
      if (a.modelValue) {
        const f = a.spliters, g = new RegExp(f.join("|"), "g"), V = a.modelValue.split(g);
        for (const w of V)
          w.trim() && i.push({ text: w });
      }
      return i;
    }), n = S(() => a.disabled), u = S(() => ({
      addOnKey: [13, ...a.spliters],
      ...l,
      tags: o.value,
      modelValue: "",
      placeholder: a.placeholder,
      disabled: n.value,
      "onTags-changed"(i) {
        const f = i.map((g) => g.text).join(a.spliters[0] + "");
        t("update:modelValue", f);
      }
    }));
    return (i, f) => (_(), P(y(it), L({ class: "aVueTagsInput" }, y(u), {
      class: { aDisabled: y(n) }
    }), null, 16, ["class"]));
  }
});
const bn = (e, t = "warning", a) => {
  const l = {
    confirmButtonText: "\u786E\u5B9A",
    cancelButtonText: "\u53D6\u6D88"
  };
  return ct.confirm(e, (a == null ? void 0 : a.title) || "\u63D0\u793A", {
    ...l,
    ...a || {}
  }).then(() => !0).catch(() => !1);
}, gn = (e) => (nt("data-v-b86115dd"), e = e(), st(), e), $n = {
  key: 0,
  class: "file-thumb"
}, Sn = {
  key: 1,
  class: "file-thumb-image"
}, wn = ["src"], Dn = {
  key: 2,
  class: "file-thumb-file"
}, xn = ["href"], Vn = {
  key: 0,
  class: "flex ai-center"
}, Cn = /* @__PURE__ */ gn(() => /* @__PURE__ */ O("p", { class: "cl-grey600 pl025" }, "\u70B9\u51FB\u4E0A\u4F20\u6587\u4EF6", -1)), En = /* @__PURE__ */ F("\u91CD\u9009\u6587\u4EF6"), An = {
  key: 2,
  class: "file-list"
}, Fn = { class: "file-list-item" }, Bn = ["href"], Tn = /* @__PURE__ */ F("\u5220\u9664"), Pn = /* @__PURE__ */ j({
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
    const a = e, l = S(() => {
      const s = a.modelValue;
      if (a.singleFile) {
        if (Array.isArray(s))
          throw new Error("singleFile\u4E3Atrue\u65F6, modelValue\u53EA\u80FD\u4E3A\u5355\u4E2A\u6587\u4EF6");
        return a.modelValue;
      } else {
        if (!Array.isArray(s))
          throw new Error("singleFile\u4E3Afalse\u65F6, modelValue\u53EA\u80FD\u4E3A\u6587\u4EF6\u5217\u8868");
        return s || [];
      }
    }), o = (s) => s === "all" ? "*" : s === "image" ? "image/*" : s === "file" ? ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.zip,.rar,.7z" : Array.isArray(s) ? s.map(o).join(",") : "*", n = S(() => o(a.fileType)), u = ["pdf", "png", "jpg", "jpeg", "gif"], i = T(!1), f = Ye({
      accept: n,
      "show-file-list": !1,
      "before-upload"(s) {
        i.value = !0;
      },
      "on-success": (s, r, c) => {
        const $ = s == null ? void 0 : s.data;
        if (i.value = !1, !$) {
          console.error("\u4E0A\u4F20\u5931\u8D25");
          return;
        }
        if (a.singleFile)
          t("update:modelValue", $);
        else {
          const D = l.value;
          t("update:modelValue", [...D, $]);
        }
      },
      "on-error"(s, r, c) {
        const $ = dt(s.message);
        i.value = !1;
        const D = $ == null ? void 0 : $.message;
        D ? me.error(D) : me.error("\u4E0A\u4F20\u5931\u8D25");
      }
    }), g = (s, r) => {
      me.warning(
        `The limit is 3, you selected ${s.length} files this time, add up to ${s.length + r.length} totally`
      );
    }, V = async (s) => {
      const r = s.id;
      if (!await bn("\u786E\u5B9A\u5220\u9664\u9644\u4EF6\u5417\uFF1F"))
        return !1;
      if (a.singleFile)
        t("update:modelValue", null);
      else {
        const c = l.value;
        t("update:modelValue", c.filter(($) => $.id !== r));
      }
      return !0;
    }, w = (s) => {
      const r = s.filePath;
      if (u.includes(s.fileType))
        window.open(r);
      else {
        const c = document.createElement("a");
        c.href = r, c.download = s.fileName, c.click();
      }
    }, v = (s) => {
      const r = ["jpg", "jpeg", "png", "gif", "bmp"], c = s.fileType;
      if (c)
        return r.includes(c.toLowerCase());
      const $ = s.filePath;
      if ($) {
        const I = $.split(".").pop();
        return r.includes((I == null ? void 0 : I.toLowerCase()) || "");
      }
      const D = s.fileName;
      if (D) {
        const I = D.split(".").pop();
        return r.includes((I == null ? void 0 : I.toLowerCase()) || "");
      }
    };
    return (s, r) => {
      var H;
      const c = C("elementUploadFilled"), $ = C("index-icon"), D = C("index-upload"), I = C("elementSelect"), d = C("ElIcon"), B = lt("loading");
      return rt((_(), A("div", {
        class: ae(["AFileMgr", { singleFile: e.singleFile }])
      }, [
        e.singleFile ? (_(), A("div", $n, [
          (H = y(l)) != null && H.filePath ? v(y(l)) ? (_(), A("div", Sn, [
            O("img", {
              src: y(l).filePath,
              alt: "\u56FE\u7247\u9884\u89C8"
            }, null, 8, wn)
          ])) : (_(), A("div", Dn, [
            O("span", {
              href: y(l).url
            }, U(y(l).fileName), 9, xn)
          ])) : (_(), A(K, { key: 0 }, [], 64))
        ])) : z("", !0),
        e.readonly ? z("", !0) : (_(), P(D, L({
          key: 1,
          headers: a.headers,
          action: a.action,
          limit: 10,
          "on-exceed": g
        }, y(f)), {
          default: m(() => [
            a.singleFile ? (_(), A(K, { key: 0 }, [
              a.modelValue ? (_(), P(N, {
                key: 1,
                class: "lite no-ml"
              }, {
                default: m(() => [
                  En
                ]),
                _: 1
              })) : (_(), A("div", Vn, [
                b($, {
                  size: "24px",
                  color: "#b8b8b8",
                  class: "index-icon--upload"
                }, {
                  default: m(() => [
                    b(c)
                  ]),
                  _: 1
                }),
                Cn
              ]))
            ], 64)) : (_(), P(N, {
              key: 1,
              class: "lite",
              type: "primary"
            }, {
              default: m(() => [
                F(U(e.label), 1)
              ]),
              _: 1
            }))
          ]),
          _: 1
        }, 16, ["headers", "action"])),
        e.singleFile ? z("", !0) : (_(), A("ul", An, [
          (_(!0), A(K, null, Ge(y(l), (p, h) => (_(), A("li", Fn, [
            b(d, {
              class: "mr05",
              color: "#00dd00"
            }, {
              default: m(() => [
                b(I)
              ]),
              _: 1
            }),
            O("span", {
              class: "item-name",
              href: p.url
            }, U(p.fileName), 9, Bn),
            b(N, {
              class: "lite ml-auto-i",
              type: "default",
              onClick: (x) => w(p)
            }, {
              default: m(() => [
                F(U(u.includes(p.fileType) ? "\u9884\u89C8" : "\u4E0B\u8F7D"), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            e.readonly ? z("", !0) : (_(), P(N, {
              key: 0,
              class: "lite item-delete",
              type: "danger",
              onClick: (x) => V(p)
            }, {
              default: m(() => [
                Tn
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ]))), 256))
        ]))
      ], 2)), [
        [B, i.value]
      ]);
    };
  }
});
const Vs = /* @__PURE__ */ re(Pn, [["__scopeId", "data-v-b86115dd"]]), Cs = /* @__PURE__ */ j({
  props: {
    positionAbs: { type: Boolean }
  },
  setup(e, { emit: t }) {
    const a = e, l = J(), o = S(() => ({
      ...l
    })), n = "a-drawer-position-absolute", u = T();
    return ot(() => {
      q(() => a.positionAbs, (i) => {
        var V, w;
        const f = (w = (V = u == null ? void 0 : u.value) == null ? void 0 : V.$refs) == null ? void 0 : w.drawerRef, g = f == null ? void 0 : f.parentElement;
        g && (a.positionAbs ? g.classList.add(n) : g.classList.remove(n));
      }, { immediate: !0 });
    }), (i, f) => {
      const g = C("ElDrawer");
      return _(), P(g, L(y(o), {
        "custom-class": "ADrawer",
        ref_key: "drawerEl",
        ref: u
      }), {
        default: m(() => [
          R(i.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const On = /* @__PURE__ */ j({
  props: {
    renderWhenReady: { type: Boolean, default: !0 },
    virtual: { type: Boolean, default: !1 }
  },
  setup(e, { emit: t }) {
    const a = e, l = J(), o = S(() => a.renderWhenReady ? n.value : !0), n = T(!1), u = S(() => ({
      ...l,
      onShow() {
        var i;
        n.value = !0, (i = l == null ? void 0 : l.onShow) == null || i.call(l);
      }
    }));
    return (i, f) => {
      const g = C("ElPopover");
      return a.virtual ? R(i.$slots, "content", { key: 1 }, void 0, !0) : (_(), P(g, L({
        key: 0,
        class: "APopover"
      }, y(u)), {
        reference: m(() => [
          R(i.$slots, "reference", { hasReady: n.value }, void 0, !0)
        ]),
        default: m(() => [
          y(o) ? R(i.$slots, "default", { key: 0 }, void 0, !0) : z("", !0)
        ]),
        _: 3
      }, 16));
    };
  }
});
const Rn = /* @__PURE__ */ re(On, [["__scopeId", "data-v-04992717"]]), kn = { class: "ADateRange" }, jn = {
  key: 0,
  class: "pr10"
}, zn = /* @__PURE__ */ O("span", { class: "label" }, "\u4ECE", -1), In = /* @__PURE__ */ O("span", { class: "label inner" }, "\u5230", -1), Mn = { class: "label" }, Nn = /* @__PURE__ */ F("\u5E38\u7528\u65E5\u671F\u8303\u56F4"), Ln = { class: "list flex wrap jc-center" }, Yn = { class: "list-item" }, Gn = /* @__PURE__ */ F("1\u5468\u5185"), Hn = { class: "list-item" }, Wn = /* @__PURE__ */ F("2\u5468\u5185"), Un = { class: "list-item" }, Kn = /* @__PURE__ */ F("1\u4E2A\u6708\u5185"), qn = { class: "list-item" }, Jn = /* @__PURE__ */ F("3\u4E2A\u6708\u5185"), Xn = { class: "list-item" }, Zn = /* @__PURE__ */ F("6\u4E2A\u6708\u5185"), Qn = { class: "list-item" }, es = /* @__PURE__ */ F("\u4E00\u5E74\u5185"), ts = /* @__PURE__ */ F("\u65E5\u671F\u7C7B\u578B"), as = { class: "flex jc-center" }, ls = /* @__PURE__ */ F("\u81EA\u5B9A\u4E49\u8303\u56F4"), rs = /* @__PURE__ */ F("\u661F\u671F"), ns = /* @__PURE__ */ F("\u6708\u4EFD"), ss = /* @__PURE__ */ F("\u5E74\u4EFD"), os = /* @__PURE__ */ O("div", { class: "h15" }, null, -1), Es = /* @__PURE__ */ j({
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
    const a = e, l = new Date(), o = new Date(l.getTime() - 7 * 24 * 60 * 60 * 1e3), n = Ye({
      visible: !1,
      ref: null
    }), u = T(null), i = T(a.defaultMode), f = S(() => i.value != "date"), g = () => {
      i.value = "date";
    }, V = S(() => i.value == "week" ? "\u661F\u671F" : i.value == "month" ? "\u6708\u4EFD" : "\u5E74\u4EFD");
    q(i, async (p) => {
      var h, x;
      n.visible = !1, p != "date" && (await le(), (x = (h = u == null ? void 0 : u.value) == null ? void 0 : h.handleOpen) == null || x.call(h));
    });
    const w = (p, h = 1) => {
      const x = k();
      if (p == "week")
        r.value = x.toDate(), s.value = x.subtract(h, "week").toDate();
      else if (p == "month")
        r.value = x.toDate(), s.value = x.subtract(h, "month").toDate();
      else if (p == "year")
        r.value = x.toDate(), s.value = x.subtract(h, "year").toDate();
      else {
        w("week", h | 1);
        return;
      }
      n.visible = !1, c();
    }, v = [], s = T(), r = T();
    q(() => a.modelValue, (p, h) => {
      if (p && h) {
        const x = p.map((G) => k(G).format("YYYY-MM-DD")), Y = h.map((G) => k(G).format("YYYY-MM-DD"));
        if (x[0] === Y[0] && x[1] === Y[1])
          return;
      }
      p ? (s.value = p[0] ? k(p[0]).toDate() : null, r.value = p[1] ? k(p[1]).toDate() : null) : a.defaultValue ? (s.value = a.defaultValue[0] ? k(a.defaultValue[0]).toDate() : null, r.value = a.defaultValue[1] ? k(a.defaultValue[1]).toDate() : null) : (s.value = o, r.value = l), v[0] = new Date(s.value), v[1] = new Date(r.value);
    }, { immediate: !0 });
    const c = () => {
      var G, ne;
      const p = s.value, h = r.value;
      let x = !0;
      if (x = x && p && p.getTime() == ((G = v[0]) == null ? void 0 : G.getTime()), x = x && h && h.getTime() == ((ne = v[1]) == null ? void 0 : ne.getTime()), x)
        return;
      v[0] = new Date(p), v[1] = new Date(h);
      debugger;
      p && h && p.getTime() > h.getTime() && (s.value = h, r.value = p);
      let Y;
      if (a.outputFormat) {
        let W = a.outputFormat;
        W == "Y-M-D" ? W = "YYYY-MM-DD" : W == "Y-M" ? W = "YYYY-MM" : W == "Y" && (W = "YYYY"), Y = [s.value, r.value].map((ee) => ee ? k(ee).format(W) : null);
      } else
        Y = [s.value, r.value];
      t("update:modelValue", Y), t("update:start", Y[0]), t("update:end", Y[1]);
    }, $ = S(() => ({
      editable: !1,
      clearable: !1,
      size: a.size,
      type: i.value,
      "onVisible-change"(p) {
        le(() => {
          if (!p) {
            debugger;
            c();
          }
        });
      }
    })), D = async (p) => {
      s.value = p;
    }, I = async (p) => {
      r.value = p;
    }, d = S(() => ({
      ...$.value,
      "onUpdate:modelValue": D,
      modelValue: s.value
    })), B = S(() => ({
      ...$.value,
      "onUpdate:modelValue": I,
      modelValue: r.value
    })), H = S(() => ({
      ...$.value,
      "onUpdate:modelValue"(p) {
        i.value == "month" ? (s.value = k(p).startOf("month").toDate(), r.value = k(p).endOf("month").toDate()) : i.value == "year" ? (s.value = k(p).startOf("year").toDate(), r.value = k(p).endOf("year").toDate()) : i.value == "week" && (s.value = k(p).startOf("week").toDate(), r.value = k(p).endOf("week").toDate()), c(), g();
      },
      modelValue: s.value
    }));
    return (p, h) => {
      const x = C("ElDatePicker"), Y = C("index-divider"), G = C("index-radio-button"), ne = C("index-radio-group"), W = C("elementOperation"), ee = C("index-icon"), Ve = C("index-button"), et = C("elementClose");
      return _(), A("div", kn, [
        e.label ? (_(), A("span", jn, U(e.label), 1)) : z("", !0),
        y(f) ? (_(), A(K, { key: 2 }, [
          O("span", Mn, U(y(V)) + "\u9009\u62E9", 1),
          b(x, L(y(H), {
            ref_key: "singleViewDatePickerRef",
            ref: u
          }), null, 16)
        ], 64)) : (_(), A(K, { key: 1 }, [
          zn,
          b(x, ve(he(y(d))), null, 16),
          In,
          b(x, ve(he(y(B))), null, 16)
        ], 64)),
        b(Rn, {
          width: "360px",
          "popper-class": "ADateRange",
          trigger: "click",
          ref: (M) => y(n).ref = M,
          visible: y(n).visible,
          "onUpdate:visible": h[7] || (h[7] = (M) => y(n).visible = M)
        }, {
          reference: m(() => [
            b(Ve, {
              class: "more-btn",
              plain: "",
              circle: "",
              size: "small"
            }, {
              default: m(() => [
                b(ee, null, {
                  default: m(() => [
                    b(W)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          default: m(() => [
            b(Y, null, {
              default: m(() => [
                Nn
              ]),
              _: 1
            }),
            O("div", Ln, [
              O("div", Yn, [
                b(N, {
                  class: "lite",
                  onClick: h[0] || (h[0] = (M) => w("week", 1))
                }, {
                  default: m(() => [
                    Gn
                  ]),
                  _: 1
                })
              ]),
              O("div", Hn, [
                b(N, {
                  class: "lite",
                  onClick: h[1] || (h[1] = (M) => w("week", 2))
                }, {
                  default: m(() => [
                    Wn
                  ]),
                  _: 1
                })
              ]),
              O("div", Un, [
                b(N, {
                  class: "lite",
                  onClick: h[2] || (h[2] = (M) => w("month", 1))
                }, {
                  default: m(() => [
                    Kn
                  ]),
                  _: 1
                })
              ]),
              O("div", qn, [
                b(N, {
                  class: "lite",
                  onClick: h[3] || (h[3] = (M) => w("month", 3))
                }, {
                  default: m(() => [
                    Jn
                  ]),
                  _: 1
                })
              ]),
              O("div", Xn, [
                b(N, {
                  class: "lite",
                  onClick: h[4] || (h[4] = (M) => w("month", 6))
                }, {
                  default: m(() => [
                    Zn
                  ]),
                  _: 1
                })
              ]),
              O("div", Qn, [
                b(N, {
                  class: "lite",
                  onClick: h[5] || (h[5] = (M) => w("year", 1))
                }, {
                  default: m(() => [
                    es
                  ]),
                  _: 1
                })
              ])
            ]),
            b(Y, null, {
              default: m(() => [
                ts
              ]),
              _: 1
            }),
            O("div", as, [
              b(ne, {
                class: "m-auto",
                modelValue: y(i),
                "onUpdate:modelValue": h[6] || (h[6] = (M) => ut(i) ? i.value = M : null)
              }, {
                default: m(() => [
                  b(G, {
                    size: "small",
                    label: "date"
                  }, {
                    default: m(() => [
                      ls
                    ]),
                    _: 1
                  }),
                  b(G, {
                    size: "small",
                    label: "week"
                  }, {
                    default: m(() => [
                      rs
                    ]),
                    _: 1
                  }),
                  b(G, {
                    size: "small",
                    label: "month"
                  }, {
                    default: m(() => [
                      ns
                    ]),
                    _: 1
                  }),
                  b(G, {
                    size: "small",
                    label: "year"
                  }, {
                    default: m(() => [
                      ss
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            os
          ]),
          _: 1
        }, 8, ["visible"]),
        s.value || r.value ? (_(), P(Ve, {
          key: 3,
          class: "more-btn",
          plain: "",
          circle: "",
          size: "small",
          type: "info",
          onClick: h[8] || (h[8] = (M) => (s.value = null, r.value = null, c(), g()))
        }, {
          default: m(() => [
            b(ee, null, {
              default: m(() => [
                b(et)
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : z("", !0)
      ]);
    };
  }
});
const us = { class: "label-content" }, is = ["innerHTML"], Ie = /* @__PURE__ */ j({
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
  emits: ["update:modelValue", "data-ready", "update:modelLabel"],
  setup(e, { emit: t }) {
    const a = e, l = J();
    if (Array.isArray(a.modelValue) && !a.justLabel)
      throw new Error("modelValue must be string or number when justLabel is false");
    const o = T([]);
    q(() => a.options, async (s) => {
      let r = await Promise.resolve(s).catch((D) => (console.error("ASelect options error", D), []));
      r || (r = []);
      const c = ft(r, {
        valueGetField: a.keyField,
        nameGetField: a.labelField,
        valueSetField: "value",
        nameSetField: "label"
      });
      let $ = c.find((D) => D.value == a.modelValue);
      t("data-ready", $, c), o.value = c;
    }, { immediate: !0 }), q(() => [
      o,
      a.modelValue
    ], async ([s, r]) => {
      const c = s.value.find(($) => $.value == r);
      t("update:modelLabel", c == null ? void 0 : c.label);
    });
    const n = S(() => {
      let s = {};
      return o.value.forEach((r) => {
        s[r.value + ""] = r;
      }), s;
    }), u = S(() => n.value[a.modelValue + ""]), i = S(() => {
      var s;
      return ((s = u.value) == null ? void 0 : s.label) || a.placeholder;
    }), f = S(() => Array.isArray(a.modelValue) ? a.modelValue.length > 1 : !1), g = S(() => {
      var r;
      const s = a.modelValue;
      return Array.isArray(s) ? s.length ? s.map((c) => {
        var $;
        return (($ = n.value[c + ""]) == null ? void 0 : $.label) || c;
      }).join("<br/>") : a.blankTextPlaceholder : ((r = u.value) == null ? void 0 : r.label) || a.blankTextPlaceholder;
    }), V = S(() => !u), w = S(() => !u.value), v = S(() => ({
      placeholder: a.placeholder,
      ...l,
      modelValue: a.modelValue + "",
      "onUpdate:modelValue"(s) {
        const r = n.value[s];
        r ? t("update:modelValue", r.value) : t("update:modelValue", s);
      }
    }));
    return (s, r) => {
      const c = C("ElOption"), $ = C("ElSelect");
      return a.justLabel ? (_(), A("span", {
        key: 1,
        class: ae(["aSelect text-mode", { isEmpty: y(w), noMatched: y(V), multipleValueMode: y(f) }]),
        innerHTML: y(g)
      }, null, 10, is)) : (_(), P($, L({
        key: 0,
        class: "aSelect"
      }, y(v), {
        class: { aDisabled: e.disabled, isEmpty: y(w), isSelected: !y(w), disableAutoWidth: e.disableAutoWidth }
      }), {
        prefix: m(() => [
          O("p", us, U(y(i)), 1)
        ]),
        default: m(() => [
          R(s.$slots, "default"),
          (_(!0), A(K, null, Ge(o.value, (D) => (_(), P(c, {
            key: D.value,
            label: D.label,
            value: D.value + ""
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 3
      }, 16, ["class"]));
    };
  }
});
const Me = /* @__PURE__ */ j({
  components: {
    ASelect: Ie
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
    const a = T([]);
    return q(() => e.apiParams, async (l) => {
      !l && !e.requestWhenApiParamsBlank ? a.value = [] : a.value = e.api(l).then((o) => ue(o, e.listPath, []));
    }, {
      immediate: !0
    }), () => b(Ie, L(t.attrs, {
      options: a.value
    }), null);
  }
}), As = (e, t = "data.list", a = "name", l = "id") => /* @__PURE__ */ j({
  components: {
    SelectFromRequest: Me
  },
  setup(o, n) {
    return () => b(Me, L({
      api: e,
      listPath: t,
      labelField: a,
      idField: l
    }, n.attrs), null);
  }
}), cs = ["form-options"], ds = {
  key: 0,
  class: "footer"
}, fs = /* @__PURE__ */ F("\u63D0\u4EA4"), ms = /* @__PURE__ */ F("\u91CD\u7F6E"), Fs = /* @__PURE__ */ j({
  props: {
    disabled: { type: Boolean, default: !1 },
    compact: { default: "normal" },
    labelWidth: null,
    noSubmitBtn: { type: Boolean, default: !0 },
    autoValidate: { type: Boolean, default: !0 },
    noFooter: { type: Boolean, default: !1 },
    beforeSubmit: null,
    mergedValue: { default: () => ({}) },
    formBinder: null,
    modelValue: { default: () => ({}) }
  },
  emits: ["update:api", "ready", "submit", "reset", "update:modelValue", "update:mergedValue"],
  setup(e, { expose: t, emit: a }) {
    const l = e, o = ye.$form(), n = S(() => {
      const r = pt({}, l.formBinder.option.value) || {};
      return l.labelWidth && E(r, "form.labelWidth", l.labelWidth), l.noSubmitBtn && E(r, "submitBtn.show", !1), pe(r, "submitBtn.size"), pe(r, "form.size"), pe(r, "resetBtn") || E(r, "resetBtn.show", !1), l.disabled && E(r, "form.disabled", !0), r;
    });
    Le(() => {
      ({
        ...l.mergedValue,
        ...l.modelValue
      });
    });
    const u = He(), i = (r) => {
      u.value = r, l.formBinder.onMounted(r);
    }, f = J(), g = S(() => {
      const r = l.formBinder;
      return {
        ...f,
        ...l.formBinder,
        disabled: r.disabled.value,
        rule: r.rule.value,
        option: n.value,
        onMounted: i
      };
    }), V = T(0), w = async (...r) => {
      let c;
      if (V.value++, await le(), l.beforeSubmit) {
        const D = await l.beforeSubmit({ ...u.value.formData() }, ...r);
        if (D === !1)
          return;
        D ? c = D : c = {};
      } else
        c = {};
      const $ = { ...u.value.formData(), ...c };
      l.autoValidate && await u.value.validate().catch((D) => {
        throw "";
      }), g.value.onSubmit($, u, ...r), a("submit", $, u, ...r);
    }, v = (...r) => {
      u.value.resetFields(), a("reset", u.value, ...r);
    };
    t({
      handlerSubmit: w,
      handlerReset: v
    });
    const s = crypto.randomUUID();
    return console.log(s, "\u591A\u4E2A\u8868\u5355"), (r, c) => {
      const $ = C("ElButton");
      return _(), A("div", {
        class: "FormCreateVue",
        "form-options": y(g)
      }, [
        b(y(o), ve(he(y(g))), null, 16),
        e.disabled ? z("", !0) : (_(), A("div", ds, [
          R(r.$slots, "footer", {
            submit: w,
            reset: v
          }, () => [
            e.noFooter ? z("", !0) : (_(), A(K, { key: 0 }, [
              R(r.$slots, "before-footer"),
              b($, {
                class: "ph20",
                onClick: c[0] || (c[0] = (D) => w()),
                type: "success"
              }, {
                default: m(() => [
                  fs
                ]),
                _: 1
              }),
              b($, {
                type: "warning",
                onClick: c[1] || (c[1] = (D) => v())
              }, {
                default: m(() => [
                  ms
                ]),
                _: 1
              }),
              R(r.$slots, "after-footer")
            ], 64))
          ])
        ]))
      ], 8, cs);
    };
  }
});
const Qe = /* @__PURE__ */ j({
  props: {
    modelValue: [String, Number],
    multi: Boolean
  },
  setup(e) {
    return e.multi, () => b("div", {
      class: "{classes.join(' ')}"
    }, [e.modelValue || "-"]);
  }
}), ps = /* @__PURE__ */ j({
  props: {
    text: String,
    classList: [Array, String]
  },
  setup(e) {
    const t = Array.isArray(e.classList) ? e.classList.join(" ") : e.classList;
    return () => b("div", {
      class: "fx1 ph05 cl-grey500 lh12 text-node " + t,
      innerHTML: e.text
    }, null);
  }
}), Bs = (e, t, a) => (a || (a = {}), a.field || (a.field = new Date().getTime() + ""), {
  native: !1,
  ...a || {},
  component: He(Qe),
  title: e,
  value: t
}), _s = {
  default: "",
  small: "6em",
  medium: "8em",
  large: "10em",
  exLarge: "14em"
};
var Ne;
((e) => {
  const t = (l, o = "") => {
    if (l != null && l.size) {
      const n = _s[l.size || "medium"] || l.size;
      E(l, "style.width", n), delete l.size;
    }
    l != null && l.required && (E(l, "effect.required", !0), delete l.required), l != null && l.colSpan && (E(l, "col.span", l.colSpan), E(l, "col.xs", 24), delete l.colSpan), o == "switch" && (l != null && l.values && (E(l, "props.activeValue", l.values[0]), E(l, "props.inactiveValue", l.values[1]), delete l.values), l != null && l.labels && (E(l, "props.activeText", l.labels[0]), E(l, "props.inactiveText", l.labels[1]), delete l.labels));
  };
  e.number = (l, o, n = 0, u = {}) => (t(u), u != null && u.unit && (E(u, "suffix", u.unit), E(u, "style.marginRight", "0.25em")), {
    type: "number",
    field: l,
    title: o,
    value: n,
    ...u
  }), e.date = (l, o, n = {}) => (t(n), n != null && n.offsetDate && (n.value = k().add(...n.offsetDate).format("YYYY-MM-DD")), {
    type: "DatePicker",
    field: l,
    title: o,
    ...n
  }), e.input = (l, o, n = {}) => (t(n), {
    type: "input",
    field: l,
    title: o,
    ...n
  }), e.textarea = (l, o, n = {}) => (E(n, "props.type", "textarea"), e.input(l, o, n)), e.component = (l, o, n, u = {}, i = {}) => (t(i), u && !(i != null && i.props) && E(i, "props", u), l = fe(l), {
    component: l,
    field: o,
    title: n,
    native: !1,
    ...i
  }), e.rawText = (l, o, n = {}) => (t(n), {
    component: fe(Qe),
    field: l,
    title: o,
    native: !1,
    ...n
  }), e.mutilpRawText = (l, o, n = {}) => (E(n, "props.multi", !0), e.rawText(l, o, n)), e.checkbox = (l, o, n, u = {}) => {
    t(u);
    const i = n.map(([f, g, V]) => ({
      value: f,
      label: g,
      disabled: V
    }));
    return {
      type: "checkbox",
      field: l,
      title: o,
      options: i,
      ...u
    };
  }, e.radio = (l, o, n, u = {}) => e.checkbox(l, o, n, { type: "radio", ...u }), e.aSwitch = (l, o, n = {}) => (t(n, "switch"), {
    type: "switch",
    field: l,
    title: o,
    ...n
  }), e.switcher = e.aSwitch, e.hidden = (l, o, n = {}) => (t(n), {
    type: "hidden",
    field: l,
    value: o,
    ...n
  });
  const a = fe(ps);
  ye.component("TextNode", a), e.textNode = (l, o = [], n = {}) => (t(n), E(n, "props.text", l), E(n, "props.classList", o), {
    type: "text-node",
    ...n
  }), e.getTextSuffix = (l, o = "", n = "") => ({
    type: "span",
    style: n,
    class: "fch-item-fix " + o,
    children: [l]
  });
})(Ne || (Ne = {}));
const Ts = (e) => {
  e.use(ye);
}, Ps = (e) => {
  const t = new mt(), a = T(), l = T(), o = T(), n = T(!1), u = T({}), i = () => {
    let d = { ...e };
    return d || (d = {}), d.labelWidth && (E(d, "form.labelWidth", d.labelWidth), delete d.labelWidth), delete d.onSubmit, d;
  };
  u.value = i();
  const f = (d) => {
    var B;
    t._resolve(d), a.value = d, (B = e == null ? void 0 : e.onReady) == null || B.call(e, d);
  }, g = async () => {
    const d = await t;
    d.resetFields(), await le(), d.clearValidateState();
  }, V = async (d = !0) => {
    await t, n.value = d, E(u.value, "form.disabled", d);
  }, w = async (d) => {
    const B = await t;
    l.value = d, E(u.value, "form.labelWidth", d), B.fields().forEach((H) => {
      B.updateRule(H, {
        wrap: {
          labelWidth: d
        }
      });
    });
  }, v = async (d) => {
    const B = await t;
    o.value = d, B.setValue(d);
  }, s = _t((d, B, ...H) => {
    e == null || e.onSubmit(d, B, ...H);
  }, (e == null ? void 0 : e.submitDebounceDelay) || 300), r = {
    onMounted: f,
    disabled: n,
    option: u,
    onSubmit: s,
    beforeSubmit: e == null ? void 0 : e.beforeSubmit,
    onReset: e == null ? void 0 : e.onReset,
    rule: T([]),
    "onUpdate:api": (d) => {
      t.resolve(d);
    }
  };
  return q(
    () => e.rule.value,
    (d) => {
      d != null && d.length ? r.rule.value = d : r.rule.value = [];
    },
    { immediate: !0 }
  ), {
    updateRule: async (d, B) => {
      (await t).updateRule(d, B);
    },
    mergeRule: async (d, B) => {
      (await t).mergeRule(d, B);
    },
    updateRules: async (d) => {
      (await t).updateRules(d);
    },
    mergeRules: async (d) => {
      (await t).mergeRules(d);
    },
    setFormData: v,
    fcOptionRef: u,
    disabledForm: V,
    fullReset: g,
    fcPromise: t,
    fcRef: a,
    handlerFcReady: f,
    formDataRef: o,
    setLabelWidth: w,
    labelWidthRef: l,
    formCreateAllBind: r
  };
}, Os = Symbol();
export {
  N as AButton,
  Es as ADateRange,
  Ss as ADialog,
  Cs as ADrawer,
  Vs as AFileMgr,
  Ds as AFormCreate,
  ws as APage,
  Rn as APopover,
  Ie as ASelect,
  xs as ATagInput,
  Fs as FormCreateHelper,
  Me as SelectFromRequest,
  Ne as aFCMaker,
  Os as aFormCreateKey,
  js as createForm,
  As as generateSelect,
  bn as globalConfirm,
  zs as maker,
  Qe as rowTextComponent,
  ps as textNodeComponent,
  Bs as textRule,
  Ps as useFormCreate,
  Ts as vueUseFormCreate
};
