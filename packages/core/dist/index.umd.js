(function(c,_){typeof exports=="object"&&typeof module<"u"?_(exports,require("dayjs")):typeof define=="function"&&define.amd?define(["exports","dayjs"],_):(c=typeof globalThis<"u"?globalThis:c||self,_(c.index={},c.dayjs2))})(this,function(c,_){"use strict";var hi=Object.defineProperty;var di=(c,_,T)=>_ in c?hi(c,_,{enumerable:!0,configurable:!0,writable:!0,value:T}):c[_]=T;var y=(c,_,T)=>(di(c,typeof _!="symbol"?_+"":_,T),T);const b=(e=>e&&typeof e=="object"&&"default"in e?e:{default:e})(_);function fe(e,t){this.flags=e,this.cursor=t}fe.prototype={skip:function(){this.flags.skip=!0},break:function(){this.flags.break=!0},remove:function(){this.flags.remove=!0},replace:function(t){this.flags.replace=t},get parent(){return this.cursor.parent},get depth(){return this.cursor.depth},get level(){return this.cursor.depth+1},get index(){return this.cursor.index}};function J(e,t){return new fe(e,t)}function le(e){this.xs=[e],this.top=0}le.prototype={push:function(t){this.top++,this.top<this.xs.length?this.xs[this.top]=t:this.xs.push(t)},pushArrayReverse:function(t){for(var r=t.length-1;r>=0;r--)this.push(t[r])},pop:function(){var t=this.peek();return this.top--,t},peek:function(){return this.xs[this.top]},isEmpty:function(){return this.top===-1}};function B(e){return new le(e)}function he(){this.depth=0,this.stack=B({node:null,index:-1})}he.prototype={moveDown:function(t){this.depth++,this.stack.push({node:t,index:0})},moveUp:function(){this.depth--,this.stack.pop()},moveNext:function(){this.stack.peek().index++},get parent(){return this.stack.peek().node},get index(){return this.stack.peek().index}};function de(){return new he}function pe(){this.break=!1,this.skip=!1,this.remove=!1,this.replace=null}pe.prototype={reset:function(){this.break=!1,this.skip=!1,this.remove=!1,this.replace=null}};function X(){return new pe}function Z(e){return e&&e.length!==0}function Xe(e,t,r){for(var n=X(),s=de(),a=J(n,s),i=B(e),u=Object.assign({},e);!i.isEmpty();){var o=i.pop();if(o===u){s.moveUp();continue}if(n.reset(),t(o,a),n.break)break;if(!n.remove&&(s.moveNext(),!n.skip)){n.replace&&(o=n.replace);var f=r(o);Z(f)&&(i.push(u),i.pushArrayReverse(f),s.moveDown(o))}}}function Ze(e,t,r){for(var n=X(),s=de(),a=J(n,s),i=B(e),u=B(null);!i.isEmpty();){var o=i.peek(),f=u.peek(),h=r(o);if(n.reset(),o===f||!Z(h)){if(o===f&&(u.pop(),s.moveUp()),i.pop(),t(o,a),n.break)break;if(n.remove)continue;s.moveNext()}else u.push(o),s.moveDown(o),i.pushArrayReverse(h)}}var Qe=32768;function ge(e){this.xs=[e],this.top=0,this.maxLength=0}ge.prototype={enqueue:function(t){this.xs.push(t)},enqueueMultiple:function(t){for(var r=0,n=t.length;r<n;r++)this.enqueue(t[r])},dequeue:function(){var t=this.peek();return this.top++,this.top===Qe&&(this.xs=this.xs.slice(this.top),this.top=0),t},peek:function(){return this.xs[this.top]},isEmpty:function(){return this.top===this.xs.length}};function ve(e){return new ge(e)}function me(){this.depth=0,this.index=-1,this.queue=ve({node:null,arity:1}),this.levelNodes=1,this.nextLevelNodes=0}me.prototype={store:function(t,r){this.queue.enqueue({node:t,arity:r}),this.nextLevelNodes+=r},moveNext:function(){this.index++},moveForward:function(){this.queue.peek().arity--,this.levelNodes--,this.queue.peek().arity===0&&(this.index=0,this.queue.dequeue()),this.levelNodes===0&&(this.depth++,this.levelNodes=this.nextLevelNodes,this.nextLevelNodes=0)},get parent(){return this.queue.peek().node}};function et(){return new me}function tt(e,t,r){for(var n=X(),s=et(),a=J(n,s),i=ve(e);!i.isEmpty();){var u=i.dequeue();if(n.reset(),t(u,a),n.break)break;if(!n.remove&&(s.moveNext(),n.replace&&(u=n.replace),!n.skip)){var o=r(u);Z(o)&&(i.enqueueMultiple(o),s.store(u,o.length))}s.moveForward()}}var rt=function(t){return t.children};function nt(e,t,r){if(e!=null){r=r||{};var n=r.order||"pre",s=r.getChildren||rt;n==="pre"?Xe(e,t,s):n==="post"?Ze(e,t,s):n==="bfs"&&tt(e,t,s)}}var A=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function st(e){for(var t=-1,r=e==null?0:e.length,n=0,s=[];++t<r;){var a=e[t];a&&(s[n++]=a)}return s}var at=st,it=Array.isArray,Q=it,ot=typeof A=="object"&&A&&A.Object===Object&&A,ut=ot,ct=ut,ft=typeof self=="object"&&self&&self.Object===Object&&self,lt=ct||ft||Function("return this")(),ee=lt,ht=ee,dt=ht.Symbol,te=dt,ye=te,_e=Object.prototype,pt=_e.hasOwnProperty,gt=_e.toString,P=ye?ye.toStringTag:void 0;function vt(e){var t=pt.call(e,P),r=e[P];try{e[P]=void 0;var n=!0}catch{}var s=gt.call(e);return n&&(t?e[P]=r:delete e[P]),s}var mt=vt,yt=Object.prototype,_t=yt.toString;function bt(e){return _t.call(e)}var Mt=bt,be=te,$t=mt,Dt=Mt,wt="[object Null]",It="[object Undefined]",Me=be?be.toStringTag:void 0;function St(e){return e==null?e===void 0?It:wt:Me&&Me in Object(e)?$t(e):Dt(e)}var $e=St;function Ct(e){return e!=null&&typeof e=="object"}var Ft=Ct,Et=$e,Tt=Ft,At="[object Symbol]";function Yt(e){return typeof e=="symbol"||Tt(e)&&Et(e)==At}var H=Yt,kt=Q,Nt=H,xt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Lt=/^\w*$/;function Ot(e,t){if(kt(e))return!1;var r=typeof e;return r=="number"||r=="symbol"||r=="boolean"||e==null||Nt(e)?!0:Lt.test(e)||!xt.test(e)||t!=null&&e in Object(t)}var Pt=Ot;function jt(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var R=jt,Gt=$e,Bt=R,Ht="[object AsyncFunction]",Rt="[object Function]",qt="[object GeneratorFunction]",Ut="[object Proxy]";function zt(e){if(!Bt(e))return!1;var t=Gt(e);return t==Rt||t==qt||t==Ht||t==Ut}var De=zt,Wt=ee,Kt=Wt["__core-js_shared__"],Vt=Kt,re=Vt,we=function(){var e=/[^.]+$/.exec(re&&re.keys&&re.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function Jt(e){return!!we&&we in e}var Xt=Jt,Zt=Function.prototype,Qt=Zt.toString;function er(e){if(e!=null){try{return Qt.call(e)}catch{}try{return e+""}catch{}}return""}var tr=er,rr=De,nr=Xt,sr=R,ar=tr,ir=/[\\^$.*+?()[\]{}|]/g,or=/^\[object .+?Constructor\]$/,ur=Function.prototype,cr=Object.prototype,fr=ur.toString,lr=cr.hasOwnProperty,hr=RegExp("^"+fr.call(lr).replace(ir,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function dr(e){if(!sr(e)||nr(e))return!1;var t=rr(e)?hr:or;return t.test(ar(e))}var pr=dr;function gr(e,t){return e==null?void 0:e[t]}var vr=gr,mr=pr,yr=vr;function _r(e,t){var r=yr(e,t);return mr(r)?r:void 0}var Ie=_r,br=Ie,Mr=br(Object,"create"),q=Mr,Se=q;function $r(){this.__data__=Se?Se(null):{},this.size=0}var Dr=$r;function wr(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var Ir=wr,Sr=q,Cr="__lodash_hash_undefined__",Fr=Object.prototype,Er=Fr.hasOwnProperty;function Tr(e){var t=this.__data__;if(Sr){var r=t[e];return r===Cr?void 0:r}return Er.call(t,e)?t[e]:void 0}var Ar=Tr,Yr=q,kr=Object.prototype,Nr=kr.hasOwnProperty;function xr(e){var t=this.__data__;return Yr?t[e]!==void 0:Nr.call(t,e)}var Lr=xr,Or=q,Pr="__lodash_hash_undefined__";function jr(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=Or&&t===void 0?Pr:t,this}var Gr=jr,Br=Dr,Hr=Ir,Rr=Ar,qr=Lr,Ur=Gr;function Y(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}Y.prototype.clear=Br,Y.prototype.delete=Hr,Y.prototype.get=Rr,Y.prototype.has=qr,Y.prototype.set=Ur;var zr=Y;function Wr(){this.__data__=[],this.size=0}var Kr=Wr;function Vr(e,t){return e===t||e!==e&&t!==t}var Ce=Vr,Jr=Ce;function Xr(e,t){for(var r=e.length;r--;)if(Jr(e[r][0],t))return r;return-1}var U=Xr,Zr=U,Qr=Array.prototype,en=Qr.splice;function tn(e){var t=this.__data__,r=Zr(t,e);if(r<0)return!1;var n=t.length-1;return r==n?t.pop():en.call(t,r,1),--this.size,!0}var rn=tn,nn=U;function sn(e){var t=this.__data__,r=nn(t,e);return r<0?void 0:t[r][1]}var an=sn,on=U;function un(e){return on(this.__data__,e)>-1}var cn=un,fn=U;function ln(e,t){var r=this.__data__,n=fn(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this}var hn=ln,dn=Kr,pn=rn,gn=an,vn=cn,mn=hn;function k(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}k.prototype.clear=dn,k.prototype.delete=pn,k.prototype.get=gn,k.prototype.has=vn,k.prototype.set=mn;var yn=k,_n=Ie,bn=ee,Mn=_n(bn,"Map"),$n=Mn,Fe=zr,Dn=yn,wn=$n;function In(){this.size=0,this.__data__={hash:new Fe,map:new(wn||Dn),string:new Fe}}var Sn=In;function Cn(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}var Fn=Cn,En=Fn;function Tn(e,t){var r=e.__data__;return En(t)?r[typeof t=="string"?"string":"hash"]:r.map}var z=Tn,An=z;function Yn(e){var t=An(this,e).delete(e);return this.size-=t?1:0,t}var kn=Yn,Nn=z;function xn(e){return Nn(this,e).get(e)}var Ln=xn,On=z;function Pn(e){return On(this,e).has(e)}var jn=Pn,Gn=z;function Bn(e,t){var r=Gn(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this}var Hn=Bn,Rn=Sn,qn=kn,Un=Ln,zn=jn,Wn=Hn;function N(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}N.prototype.clear=Rn,N.prototype.delete=qn,N.prototype.get=Un,N.prototype.has=zn,N.prototype.set=Wn;var Kn=N,Ee=Kn,Vn="Expected a function";function ne(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new TypeError(Vn);var r=function(){var n=arguments,s=t?t.apply(this,n):n[0],a=r.cache;if(a.has(s))return a.get(s);var i=e.apply(this,n);return r.cache=a.set(s,i)||a,i};return r.cache=new(ne.Cache||Ee),r}ne.Cache=Ee;var Jn=ne,Xn=Jn,Zn=500;function Qn(e){var t=Xn(e,function(n){return r.size===Zn&&r.clear(),n}),r=t.cache;return t}var es=Qn,ts=es,rs=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,ns=/\\(\\)?/g,ss=ts(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(rs,function(r,n,s,a){t.push(s?a.replace(ns,"$1"):n||r)}),t}),as=ss;function is(e,t){for(var r=-1,n=e==null?0:e.length,s=Array(n);++r<n;)s[r]=t(e[r],r,e);return s}var os=is,Te=te,us=os,cs=Q,fs=H,ls=1/0,Ae=Te?Te.prototype:void 0,Ye=Ae?Ae.toString:void 0;function ke(e){if(typeof e=="string")return e;if(cs(e))return us(e,ke)+"";if(fs(e))return Ye?Ye.call(e):"";var t=e+"";return t=="0"&&1/e==-ls?"-0":t}var hs=ke,ds=hs;function ps(e){return e==null?"":ds(e)}var gs=ps,vs=Q,ms=Pt,ys=as,_s=gs;function bs(e,t){return vs(e)?e:ms(e,t)?[e]:ys(_s(e))}var Ms=bs,$s=H,Ds=1/0;function ws(e){if(typeof e=="string"||$s(e))return e;var t=e+"";return t=="0"&&1/e==-Ds?"-0":t}var Is=ws,Ss=Ms,Cs=Is;function Fs(e,t){t=Ss(t,e);for(var r=0,n=t.length;e!=null&&r<n;)e=e[Cs(t[r++])];return r&&r==n?e:void 0}var Es=Fs,Ts=Es;function As(e,t,r){var n=e==null?void 0:Ts(e,t);return n===void 0?r:n}var Ys=As;function ks(e){return e==null}var Ns=ks;const xs=function(e,t={}){let r={},n=[],s=[],a={};const i=function(){r={},n=[],s=[],a={}};i();let{childrenKey:u="children",checkedKey:o="checked",idKey:f="id"}=t,h=0,m=0;const g=function(l={}){u=l.childrenKey||u,o=l.checkedKey||o,f=l.idKey||f},v=function(l,d){l.forEach(function(p){const $=p[f];r[$]=p,p={...p},s.push(p),p.parent=d,p.index=h++;const O=d?d.deepth+1:0;p.deepth=O,m=Math.max(m,O),p.path=d?d.path+"."+p[f]:"0",p.parentIdList=d?[...d.parentIdList,d[f]]:[],a[$]=p,p[u]&&p[u].length>0&&v(p[u],p)})},D=function(l){return l[u]&&l[u].length>0?!l[u].map(p=>M(p[f])).find(p=>!p[o]):!1},w=function(l){i(),Array.isArray(l)&&v(l)};w(e);const L=function(l){var d;return(d=M(l))==null?void 0:d.parentIdList.map(p=>M(p))},K=function(l){const d=M(l);return s.filter(function(p){return p.parent===(d==null?void 0:d.parent)})},I=function(l){let d;if(!l)return console.warn("id\u4E0D\u80FD\u4E3A\u7A7A"),null;if(l instanceof Object)d=l[f];else if(typeof l=="string"||typeof l=="number")d=l;else return console.warn("id\u7C7B\u578B\u975E\u6CD5:",l),null;return d},M=function(l){const d=I(l);return d?a[d]:null},Ve=function(l){const d=I(l);return d?r[d]:null},ui=function(l){const d=M(l);return d==null?void 0:d.deepth},ci=function(l,d){const p=M(l);p&&Object.assign(p,d)},fi=function(l,d,p=!1){const $=M(l);$&&($[o]=d,p&&($.parentIdList.forEach(O=>{const Je=a[O];Je[o]=D(Je)}),V($,function(O){O[o]=d})))},li=function(l){const d={};l&&l.forEach(p=>{d[p]=!0}),s.forEach(p=>{p[o]=d[p[f]]||!1})},V=function(l,d){const p=M(l);if(p)d(p),p[u]&&p[u].length>0&&p[u].forEach(function($){V($,d)});else throw new Error("\u8282\u70B9\u4E0D\u5B58\u5728:"+l)};return{travelNode:V,getNodeList:(l=!0)=>l?[...s]:[...n],getNodeDescendantList:l=>{const d=[];return V(l,function(p){d.push(p)}),d},getNodeListByFilter:l=>s.filter(l),getMinDeepth:function(){let l=m;for(const d in s){const p=s[d];if(p.checked&&(l=Math.min(l,p.deepth)),l===0)return 0}return l},getSublings:K,getParents:L,getDeepth:ui,getNode:M,updateIndexes:w,setChecked:fi,setProps:ci,travelAllNode:function(l){for(const d in s){const p=s[d],$=Ve(p[f]);if(l(p,$)===!1)break}},setOptions:g,resetCheckStatus:li,getOriginNode:Ve}},se=function(e,t,r="children",n="id",s=[],a={flag:!1}){if(e instanceof Array)return se({[r]:e},t,r,n,s);const i=[],u=(e==null?void 0:e[r])||[];for(let o=0;o<u.length;o++){const f=u[o];if(t&&t(f,s,r,n)===!1){a.flag=!0;break}if(i.push(f),f[r]instanceof Array){const h=se(f[r],t,r,n,[f,...s],a);i.push(...h)}if(a.flag)break}return i},j=function(e,t,r=null,n=!1){if(typeof t=="string"&&(t=t.split(",")),!!Array.isArray(t)){for(let s=0;s<t.length;s++){const a=t[s],i=Ys(e,a);if(n?Ns(i):!!i)return i}return r}},ae=e=>Object.prototype.toString.call(e)=="[object Object]",Ls=(e,t="children",r=!1)=>{const n=[],s=[...e];for(;s.length;){const a=s.shift();n.push(a);const i=a[t];i!=null&&i.length&&(r&&n.pop(),s.unshift(...i))}return n};function Os(e){return e===null}var Ne=Os;const xe=function(e,t,r,n="_",s=0){e[t]?s<5&&xe(e,n+t,r,n,s+1):e[t]=r},Ps=function(e,t,r){let n=!1;return Array.isArray(e)&&(e={[t]:e},n=!0),nt(e,r,{getChildren(s){return s[t]}}),n?e[t]:e},js=function(e,t){const r={valueGetField:"value",nameGetField:"name",valueSetField:"value",nameSetField:"name",spliterItemValue:",",spliterBetweenItem:/\s+/,defaultLs:["0, \u8BF7\u63D0\u4F9Boptions"],...t||{}};let n;return typeof e=="function"&&(n=e(r)),typeof e=="string"?n=e.trim().split(r.spliterBetweenItem).map(a=>a.trim()):Array.isArray(e)?n=e:Array.isArray(r.defaultLs)?n=r.defaultLs:typeof r.defaultLs=="function"?n=r.defaultLs():n=[{name:"\u8BF7\u901A\u8FC7optionLs\u4F20\u5165\u6570\u7EC4\u6216\u8005\u51FD\u6570",value:-1}],function(a){const i=r.elFormatter;i&&(a=a.map(o=>{let[f,h]=i(o,r,j);return{value:f,name:h}}));let u=at(a);return u.length!=a.length&&console.warn("options\u4E2D\u5B58\u5728\u7A7A\u9009\u9879",a),a=u,a=a.map(o=>{typeof o=="string"?o=(o+"").split(r.spliterItemValue).map(m=>m.trim()):typeof o=="number"&&(o=[o,o]);let f,h;if(Array.isArray(o)){if([f,h]=o,h===void 0?h=f:f===void 0&&(f=h),Ne(f)||Ne(h))throw"value\u548Cname\u4E0D\u80FD\u540C\u65F6\u4E3A\u7A7A"}else o?(f=j(o,r.valueGetField),h=j(o,r.nameGetField)):(h="\u65E0\u6548options",f="-");return{[r.valueSetField]:f,[r.nameSetField]:h}}),a.forEach(o=>{const f=o[r.valueSetField];typeof f!="number"&&typeof f!="string"&&(console.warn("options\u4E2D\u5B58\u5728\u975E\u6CD5\u7684value,\u9700\u8981\u662Fnumber\u6216\u8005string",o),o[r.valueSetField]=o.value+"")}),a}(n)},Gs=function(e,t=null){if(ae(e)||Array.isArray(e))return e;if(typeof e!="string")return console.warn("safeJsonParser error",e),t;try{return JSON.parse(e)}catch{return console.log("json\u89E3\u6790\u5931\u8D25:",e),t}},Bs=function(e,t,r=0,n=void 0){if(t.includes(e))return e;{let s=t[r];return s===void 0&&(s=n),s}};function Hs(e){return new Promise(function(t,r){var n=typeof e=="string"?e:URL.createObjectURL(e);if(!n)throw new Error("Must use a valid image");var s=document.createElement("img");s.onload=()=>{typeof e!="string"&&URL.revokeObjectURL(n),t({width:s.width,height:s.height})},s.onerror=a=>{typeof e!="string"&&URL.revokeObjectURL(n),r(a)},s.src=n})}function Rs(){if(typeof window>"u")return-1;const e=window.navigator.userAgent,t=e.indexOf("MSIE ");if(t>0)return parseInt(e.substring(t+5,e.indexOf(".",t)),10);if(e.indexOf("Trident/")>0){const s=e.indexOf("rv:");return parseInt(e.substring(s+3,e.indexOf(".",s)),10)}const n=e.indexOf("Edge/");return n>0?parseInt(e.substring(n+5,e.indexOf(".",n)),10):-1}const qs=Rs()!==-1;function Le(...e){let t;Array.isArray(arguments[0])?t=arguments[0]:t=Array.prototype.slice.call(arguments);let r=[];return t.reduce(function(n,s,a,i){return n.then(function(){if(typeof s=="function")try{s=s()}catch(u){return i.splice(1),Promise.reject(u)}else console.warn("map element:"+a+" not function");return s.then(u=>{r[a]=u})})},Promise.resolve(r)).then(function(){return r})}class Us extends Promise{constructor(r=void 0){let n,s;super((a,i)=>{n=a,s=i,r&&r(a,i)});y(this,"__resolve");y(this,"__reject");this.__resolve=n,this.__reject=s}static map(r){return Le(r)}static all(r){return Promise.all(r)}resolve(r){this.__resolve(r)}_resolve(r){this.__resolve(r)}reject(r){this.__reject(r)}_reject(r){this.__reject(r)}}const zs=(e,t,r)=>new Promise((n,s)=>{const a=e[Symbol.iterator](),i=u=>{const{value:o,done:f}=a.next();f?n(u):t(u,o,e).then(i)};i(r)}),W=class{static get fastGbk(){if(!this._fastGbk)throw new Error("\u8BF7\u5148\u8C03\u7528setFaskGbk\u65B9\u6CD5\u8BBE\u7F6EfastGbk::$GBK.setFaskGbk(require('fast-gbk'))");return this._fastGbk}static setFaskGbk(t){this._fastGbk=t}static encode(t){return W.fastGbk.encode(t)}static decode(t){if(!t||!t.length)return"";typeof t=="string"&&(/^\%/.test(t)?t=t.split("%").splice(1):t=t.split(","));let r="";if(Array.isArray(t))if(typeof t[0]=="number")r=this.fastGbk.decode(t);else{const n=t.map(s=>{typeof s=="number"&&(console.warn("decodeGBK\u4F20\u5165\u7684\u6570\u7EC4\u4E2D\u6709number\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u8FD9\u662F\u4E0D\u5141\u8BB8\u7684\uFF0C\u4F1A\u5BFC\u81F4\u89E3\u7801\u9519\u8BEF"),s=s+"");let a=parseInt(s,16);return isNaN(a)?0:a});r=W.decode(n)}return r}};let S=W;y(S,"_fastGbk");const Oe=new Map;function Ws(e){if(e===0)return"0";if(e===!1)return"False";if(!e)return"";if(typeof e!="string")throw new Error("\u65E0\u6548\u8F93\u5165");let[t,...r]=e;return t.toUpperCase()+r.join("")}function Ks(e,t){if(!e||!t)return"";var r=0,n=0,s="";for(n=0;n<e.length;n++){if(e.charCodeAt(n)>255?r+=2:r++,r>t)return s;s+=e.charAt(n)}return e}const Pe=()=>{let e=Math.random().toString(32).substr(2);return Oe.get(e)?Pe():(Oe.set(e,!0),e)};function Vs(e){return S.decode(e)}function Js(e){return S.decode(e)}function Xs(e,t="utf-8",r=16){return t.toLowerCase()=="gbk"&&r==16?Vs(e):new TextDecoder(t).decode(new Uint8Array(e.map(n=>Number.isFinite(n)?n:parseInt(n,r))))}function Zs(e,t="string"){return t=="string"?S.encode(e):S.encode(e).split("%").splice(1)}function Qs(e){for(var t=0,r=0;r<e.length;r++){var n=e.charCodeAt(r);n>=1&&n<=126||65376<=n&&n<=65439?t++:t+=2}return t}const ea=(e,t="")=>ae(e)||Array.isArray(e)?JSON.stringify(e):typeof e=="string"?e:(console.warn("safeStringify error(\u6682\u4E0D\u652F\u6301\u7684\u6570\u636E\u7C7B\u578B)",e),t),ta=/\:\:([-\d\.]+)$/,E=class{constructor(t,r,n=!1,s=null){y(this,"_name");y(this,"_code");y(this,"_silent");const a=this;a._name=t,a._code=r,a._silent=n}static addNameFieldList(t){this.nameFieldList.push(t)}get name(){return this._name}get message(){return this._name}get msg(){return this._name}get code(){return this._code}get cod(){return this._code}get errorCode(){return this._code}get silent(){return this._silent}get silence(){return this._silent}toString2(){const t=this;return`AError:${t.code}-${t.name}`}static fromErrorText(t,r=!1){const n=`${t}-${r?"0":"1"}`;let s=je[n];if(!s){let a,i;ta.test(t)?(a=RegExp.$1,i=t.replace(`::${a}`,"")):(a=0,i=t),s=new E(i,a,r),je[n]=s}return s}static create(t,r=!1){return this.fromObject(t,r)}static getErrorCode(t){return t?t.constructor==E?t._code:this.fromObject(t)._code:0}};let G=E;y(G,"nameFieldList",["error","message","msg","errMsg","reason","errorText"]),y(G,"fromObject",(t,r=!1)=>{const n=E;if(!t)return new E("\u672A\u77E5\u9519\u8BEF",-9999);let s;if(t instanceof Error)return n.fromErrorText(t.message,r);if(typeof t=="string")if(/^(\[|\{)/.test(t))try{t=JSON.parse(t)}catch{s=t}else s=t;else s=j(t,E.nameFieldList),r||(r=t.silence||t.silent);return!s&&t.data?n.fromObject(t.data):n.fromErrorText(s,r)});const je={};function ra(e,t,r){var n=-1,s=e.length;t<0&&(t=-t>s?0:s+t),r=r>s?s:r,r<0&&(r+=s),s=t>r?0:r-t>>>0,t>>>=0;for(var a=Array(s);++n<s;)a[n]=e[n+t];return a}var na=ra,sa=9007199254740991;function aa(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=sa}var ia=aa,oa=De,ua=ia;function ca(e){return e!=null&&ua(e.length)&&!oa(e)}var fa=ca,la=9007199254740991,ha=/^(?:0|[1-9]\d*)$/;function da(e,t){var r=typeof e;return t=t==null?la:t,!!t&&(r=="number"||r!="symbol"&&ha.test(e))&&e>-1&&e%1==0&&e<t}var pa=da,ga=Ce,va=fa,ma=pa,ya=R;function _a(e,t,r){if(!ya(r))return!1;var n=typeof t;return(n=="number"?va(r)&&ma(t,r.length):n=="string"&&t in r)?ga(r[t],e):!1}var ba=_a,Ma=/\s/;function $a(e){for(var t=e.length;t--&&Ma.test(e.charAt(t)););return t}var Da=$a,wa=Da,Ia=/^\s+/;function Sa(e){return e&&e.slice(0,wa(e)+1).replace(Ia,"")}var Ca=Sa,Fa=Ca,Ge=R,Ea=H,Be=0/0,Ta=/^[-+]0x[0-9a-f]+$/i,Aa=/^0b[01]+$/i,Ya=/^0o[0-7]+$/i,ka=parseInt;function Na(e){if(typeof e=="number")return e;if(Ea(e))return Be;if(Ge(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=Ge(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Fa(e);var r=Aa.test(e);return r||Ya.test(e)?ka(e.slice(2),r?2:8):Ta.test(e)?Be:+e}var xa=Na,La=xa,He=1/0,Oa=17976931348623157e292;function Pa(e){if(!e)return e===0?e:0;if(e=La(e),e===He||e===-He){var t=e<0?-1:1;return t*Oa}return e===e?e:0}var ja=Pa,Ga=ja;function Ba(e){var t=Ga(e),r=t%1;return t===t?r?t-r:t:0}var Ha=Ba,Ra=na,qa=ba,Ua=Ha,za=Math.ceil,Wa=Math.max;function Ka(e,t,r){(r?qa(e,t,r):t===void 0)?t=1:t=Wa(Ua(t),0);var n=e==null?0:e.length;if(!n||t<1)return[];for(var s=0,a=0,i=Array(za(n/t));s<n;)i[a++]=Ra(e,s,s+=t);return i}var Re=Ka;class ie{static strip(t,r=12){return+parseFloat(t.toPrecision(r))}static hexString2DecLs(t){return Re(t,2).map(r=>parseInt(r.join(""),16))}static preppendZero(t,r=2){return oe(r,t)}static getDec(t){return t-Math.trunc(t)}static toDEC(t,r=16){return Array.isArray(t)?t.map(n=>parseInt(n,r)):parseInt(t,r)}static toHEX(t,r=2,n=10){if(Array.isArray(t))return t.map(s=>Array.isArray(s)?s[0]:this.toHEX(s,length,n));if(/[a-zA-Z]/.test(t+""))throw new Error("\u65E0\u6CD5\u8F6C\u6362\u4E3AHEX:"+t);return t=parseInt(t+"",n),t>=Math.pow(2,8)&&(r=4),Va(t,r)[0]}}function Va(e,t=2){let r=parseInt(e+"").toString(16).toUpperCase(),n=Re(r,t).map(a=>a.join(""));const s=oe(t,n[0]);return n.splice(0,1,s),n}function oe(e,t){let r=e-(t+"").length;return r<=0?t+"":Array(r).fill("0").join("")+(t+"")}function qe(e,t=12){return typeof e!="number"&&(e=0),+parseFloat(e.toPrecision(t))}function Ja(e,t=2){typeof e!="number"&&(e=0);const r=qe(e).toFixed(t);return parseFloat(r)}const Xa=function(e,t=Number.MAX_SAFE_INTEGER,r=0){const n=typeof e=="string";let s=n?ie.toDEC(e):e;return typeof r=="number"&&(s=Math.max(r,s)),typeof t=="number"&&(s=Math.min(t,s)),n?ie.toHEX(s):s},Za=(e,t=0)=>{if(typeof e=="number")return e;const s=((e+"").includes(".")?parseFloat:parseInt)(e);return isNaN(s)?t:s};function Qa(e,t,r){function n(i,u){return Math.floor(Math.random()*(u-i+1))+i}function s(){const i=[];let u=e;for(let o=0;o<t-1;o++){const f=n(r,u-r*(t-1-o));i.push(f),u-=f}return i.push(u),i}let a=0;for(;a<5;){const i=s();if(i.every(u=>u>=r))return i;a++}return[]}var Ue={exports:{}};(function(e,t){(function(r,n){e.exports=n()})(A,function(){var r={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(n,s,a){var i=s.prototype,u=i.format;a.en.formats=r,i.format=function(o){o===void 0&&(o="YYYY-MM-DDTHH:mm:ssZ");var f=this.$locale().formats,h=function(m,g){return m.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(v,D,w){var L=w&&w.toUpperCase();return D||g[w]||r[w]||g[L].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(K,I,M){return I||M.slice(1)})})}(o,f===void 0?{}:f);return u.call(this,h)}}})})(Ue);const ei=Ue.exports;var ze={exports:{}};(function(e,t){(function(r,n){e.exports=n()})(A,function(){var r="week",n="year";return function(s,a,i){var u=a.prototype;u.week=function(o){if(o===void 0&&(o=null),o!==null)return this.add(7*(o-this.week()),"day");var f=this.$locale().yearStart||1;if(this.month()===11&&this.date()>25){var h=i(this).startOf(n).add(1,n).date(f),m=i(this).endOf(r);if(h.isBefore(m))return 1}var g=i(this).startOf(n).date(f).startOf(r).subtract(1,"millisecond"),v=this.diff(g,r,!0);return v<0?i(this).startOf("week").week():Math.ceil(v)},u.weeks=function(o){return o===void 0&&(o=null),this.week(o)}}})})(ze);const ti=ze.exports;b.default.extend(ei),b.default.extend(ti);const x=function(e){const t=new Date;if(e){if(e instanceof Date)return e;if(typeof e=="number"){const r=e+"",n=r.split(""),s=parseInt(n.splice(0,4).join("")),a=parseInt(n.splice(0,2).join(""))-1,i=parseInt(n.splice(0,2).join(""));return r.length==4?(t.setFullYear(s),t):r.length==6?(t.setFullYear(s),t.setMonth(a-1),t):r.length==8?(t.setFullYear(s),t.setMonth(a),t.setDate(i),t):new Date(e)}else if(typeof e=="string"){if(e=e.trim(),/^\d+$/.test(e))return x(parseInt(e));{const r=e.split(/[-:\sTZ\+年月日时分秒]/),[n=t.getFullYear(),s=0+1,a=1,i=0,u=0,o=0]=r,f=parseInt([n,(s+"").padStart(2,"0"),(a+"").padStart(2,"0")].join(""));if(r.length<=3)return x(f);{const h=x(f);if(!h)throw new Error("\u65E0\u6CD5\u89E3\u6790\u7684\u65E5\u671F\u683C\u5F0F");return h.setHours(i,u,o),h}}}}else return new Date},ue=x;function ri(e){var t="";if(typeof e=="string"){let r=e.split("-");r.length==1?e=parseInt(e):r.length==2?t=e+"-01":t=e;const n=ue(t);return ce(n)}else if(typeof e=="number"){const r=new Date;return r.setMonth(e-1),ce(r)}else throw new Error("\u8BF7\u4F20\u5165\u6709\u6548\u7C7B\u578B")}function ce(e){return e=new Date(ue(e).getTime()),e.add(1,"month"),e.setDate(0),e.getDate()}const ni=(e,t=!0)=>{typeof e=="string"&&(e=b.default(e).toDate());const r=e.getDay(),n=new Date(e);n.setDate(e.getDate()-r),n.setHours(0,0,0,0);const s=new Date(n);s.setDate(n.getDate()+6),s.setHours(23,59,59,999);const a=b.default(e).week(),i=b.default(n).format("YYYY-MM-DD");return t&&(n.setDate(n.getDate()+1),s.setDate(s.getDate()+1)),{startYYYYMMDD:i,start:n,end:s,thInYear:a}},We=(e,t,r,n=!0)=>{const a=new Date(e,t-1,1).getDay(),i=1+(r-1)*7-a,u=n?i+1:i;return new Date(e,t-1,u)},Ke=e=>{typeof e=="string"&&(e=b.default(e).toDate());const t=e.getDate(),r=e.getDay();return Math.ceil((t+6-r)/7)};class C{constructor(t){y(this,"_start");y(this,"_end");y(this,"_thInYear");y(this,"_thInMonth");const{start:r,end:n,thInYear:s}=ni(t);this._start=r,this._end=n,this._thInYear=s,this._thInMonth=Ke(r)}get start(){return this._start}get startStr(){return b.default(this.start).format("YYYY-MM-DD")}get end(){return this._end}get endStr(){return b.default(this.end).format("YYYY-MM-DD")}get thInYear(){return this._thInYear}get thInMonth(){return this._thInMonth}get YYYYMMth(){return`${this.start.getFullYear()}-${this.start.getMonth()+1}-[${this.thInMonth}]`}get YYYYMMthStr(){return`${this.start.getFullYear()}-${this.start.getMonth()+1}/\u7B2C${this.thInMonth}\u5468`}static fromYYYYMMThStr(t){const[r,n,s]=t.split(/[^\d]+/).filter(i=>i),a=We(parseInt(r),parseInt(n),parseInt(s));return new C(a)}get YYYYMM(){return`${this.start.getFullYear()}-${this.start.getMonth()+1}`}get YYYY(){return this.start.getFullYear()}contains(t){return t>=this.start&&t<=this.end}nextDateWeek(){const t=new Date(this.end.getFullYear(),this.end.getMonth(),this.end.getDate()+1);return new C(t)}prevDateWeek(){const t=new Date(this.start.getFullYear(),this.start.getMonth(),this.start.getDate()-1);return new C(t)}static getListfromRange(t,r){typeof t=="string"&&(t=b.default(t).toDate()),typeof r=="string"&&(r=b.default(r).toDate()),t>r&&([t,r]=[r,t]);const n=[];let s=new C(t);for(;!s.contains(r);)n.push(s),s=s.nextDateWeek();return n.push(s),n}static from_yyyy_th(t,r){const n=b.default(`${t}-01-01`).week(parseInt(r+""));return new C(n.toDate())}toString(){return`
[${this.thInYear}] ${this.startStr} - ${this.endStr}`}}const si={};class F extends Date{constructor(...r){super(...r);y(this,"__currentMonth",!1)}static fromYYYY_MM(r){var n=r.replace(/_/g,"-")+"-01";return new F(n)}static fromDate(r){return new F(r.getTime())}static fromAny(r){return this.fromDate(x(r))}diff(r,n="day"){let s=this.getTime()-r.getTime();switch(n){case"year":return s/1e3/60/60/24/365;case"month":return s/1e3/60/60/24/30;case"day":return s/1e3/60/60/24;case"hour":return s/1e3/60/60;case"minute":return s/1e3/60;case"second":return s/1e3;case"millisecond":return s}}add(r,n="day"){const s=this.clone();switch(n){case"year":s.setFullYear(this.getFullYear()+r);break;case"month":this.setMonth(this.getMonth()+r);case"day":this.setDate(this.getDate()+r);case"hour":s.setHours(this.getHours()+r);break;case"minute":s.setMinutes(this.getMinutes()+r);break;case"second":s.setSeconds(this.getSeconds()+r);break;case"millisecond":s.setMilliseconds(this.getMilliseconds()+r);break}return s}clone(){return new F(this.getTime())}setTimeByDate(r){return this.setHours(r.getHours(),r.getMinutes(),r.getSeconds(),r.getSeconds()),this}getDayMountInMonth(){let r=this.clone();return r.setMonth(r.getMonth()+1),r.setDate(0),r.getDate()}setToDayStart(){return this.clearTime()}setToDayEnd(){return this.setHours(23,59,59,999),this}setToMonthStart(){return this.setDate(1),this.setToDayStart()}setToMonthEnd(){return this.setDate(this.getDayMountInMonth()),this.setToDayEnd()}setToYearStart(){const r=this;return r.setMonth(0,1),r.setToDayStart(),r}setToYearEnd(){const r=this;return r.setMonth(12,1),r.setToDayStart(),r.setTime(r.getTime()-1),r}isSameDay(r){let n;typeof r=="number"?n=new F(r):n=F.prototype.clone.call(r);let s=n.clone().setToDayStart(),a=this.clone().setToDayStart();return s.getTime()==a.getTime()}clearTime(){return this.setHours(0,0,0,0),this}clearDay(){return this.setDate(1),this}formatToMonth(r="-"){const n=this.getFullYear(),s=this.getMonth()+1;return`${n}${r}${s}`}formatToDay(r="-"){const n=this.getFullYear(),s=this.getMonth()+1,a=this.getDate();return`${n}${r}${s}${r}${a}`}getCalendarDateList(r=!1){var n=this;typeof r>"u"&&(r=!0);var s=si,a=this.getFullYear()+"-"+(this.getMonth()+1)+"-"+(r?"0":"1");if(s[a])return s[a];let i,u;r?(i=0,u=6):(i=1,u=7);let o=[],f=this.clone().setToMonthStart(),h=this.clone().setToMonthEnd();var m=f.getDay(),g=h.getDay();let v=f.clone().add(i-m-1,"day"),D=h.clone().add(u-g+0,"day"),w=D.diff(v,"day"),L=0,K=n.getMonth();for(;L++<w;){let I=v.clone().add(L,"day");I.getMonth()==K&&(I.__currentMonth=!0),o.push(I)}return s[a]={list:o,firstDateInMonth:f,lastDateInMonth:h,firstDateInView:v,lastDateInView:D}}}const ai=e=>e.replace(/[^\x00-\xff]/g,"**").length,ii=(e,t)=>(r,n)=>r.trim().split(`
`).map(a=>{const i=a.trim();return i.startsWith("//")?"":i}).filter(a=>!!a).map(a=>{const[i,u,...o]=a.split(/\s+/),h={minWidth:ai(u)*7+45,key:i,title:u,visible:!1,sum:!1};o.forEach(g=>{if(["center","left"].includes(g))h.align=g;else if(/^(\+|\-)?(\d+)$/.test(g)){const v=RegExp.$1,D=parseInt(RegExp.$2);v==="+"?h.maxWidth=D:v==="-"?h.minWidth=D:h.width=D}else if(["show","hide"].includes(g))h.visible=g=="show";else if(g==="__sum__")h.sum=!0;else if(g.startsWith("#"))g=="#"?h.slot=h.key:h.slot=g.substring(1);else{const v=t[g];v?h.render=v:console.warn("\u672A\u5B9A\u4E49\u7684render:",g)}});const m=e[i];return m&&Object.assign(h,m),h.getValue=function(g){return h.render?h.render(null,{row:g,column:h},!0):g[h.key]},n?n(h,a):h});function oi(e,t,r,n,s){var a=t.width,i=t.height;e.save(),e.translate(r,n),e.rotate(s),e.drawImage(t,-a/2,-i/2,a,i),e.restore()}Object.defineProperty(c,"dayjs2",{enumerable:!0,get:()=>b.default}),c.AError=G,c.BPromise=Us,c.Date2=F,c.DateWeek=C,c.Math2=ie,c.all2date=x,c.all2valueName=js,c.asyncReduce=zs,c.byteArrayToString=Xs,c.drawRotatedImage=oi,c.encodeStringToGBK=Zs,c.firstLetterUppercase=Ws,c.fromGBKArrayToString=Js,c.getByteLength=Qs,c.getDayLengthInMonth=ce,c.getDayMountByMonth=ri,c.getImageSize=Hs,c.getWeekStartDateFromYYYYMMThInMonth=We,c.getWeekThInMonth=Ke,c.isIE=qs,c.isPlainObject=ae,c.makeTreeDataHelper=xs,c.parse2date=ue,c.preppendZero=oe,c.promiseMap=Le,c.randomSegmentation=Qa,c.randomString=Pe,c.safeBindToObject=xe,c.safeJsonParser=Gs,c.safeParseNumber=Za,c.safeStringify=ea,c.safeValueInList=Bs,c.safeValueInRange=Xa,c.stripAndFixNumber=Ja,c.stripNumber=qe,c.stripString=Ks,c.travelTree=se,c.treeEach=Ps,c.treeListToFlatList=Ls,c.tryGet=j,c.viewuiColumnFactory=ii,Object.defineProperties(c,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
