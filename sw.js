if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,i,a)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const c={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return r;case"module":return c;default:return e(s)}}))).then((e=>{const s=a(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-6acbdf4d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_assets/css/materialize.min.css",revision:"f288d8c8c9ea9f4d0bb6f8f81c8ff7da"},{url:"_assets/css/style.css",revision:"d16c30820a88ac8aa28e9c66e77d1112"},{url:"_assets/font/home.svg",revision:"747ceddbb981e32a9844ba14ced79296"},{url:"_assets/font/home.woff",revision:"926a17462a873cb754c8319040459acf"},{url:"_assets/font/home.woff2",revision:"d8521629f0d22adc1dbcc314b724c245"},{url:"_assets/js/fp/base.js",revision:"5765a8c77a4a9912e9d0be814261a35c"},{url:"_assets/js/fp/language.js",revision:"2eebea244bf0b1338884c24ee8bc708e"},{url:"_assets/js/jquery-2.1.1.min.js",revision:"9a094379d98c6458d480ad5a51c4aa27"},{url:"_assets/js/materialize.min.js",revision:"22b19b270f8f06e2f6a85f7ca2dfe3aa"},{url:"favicon.ico",revision:"ffa5354402894a525414eebd9bf3b719"},{url:"index.html",revision:"24c62e784841661a0366dcff543c0872"},{url:"languages.json",revision:"0cac0353d87927337ed0c079af853156"}],{})}));
//# sourceMappingURL=sw.js.map
