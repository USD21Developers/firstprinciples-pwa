if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,a,c)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const r={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return i;case"module":return r;default:return e(s)}}))).then((e=>{const s=c(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-3feae7aa"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_assets/css/fontawesome-free-5.11.2-web/css/all.min.css",revision:"08ad7a4a944e7564adf9414e9626f501"},{url:"_assets/css/fontawesome-free-5.11.2-web/LICENSE.txt",revision:"6957234f7c170c187a9e39f89181b519"},{url:"_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share-alt.svg",revision:"e1687b6439ed47f1280e6e8044a1b6fa"},{url:"_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share.svg",revision:"aaa018a562a6839cb0ab8d1bb1ace056"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.svg",revision:"3d102342391af184d5ae9e7708d8220f"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff",revision:"333bae208dc363746961b234ff6c2500"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff2",revision:"44d537ab79f921fde5a28b2c1636f397"},{url:"_assets/css/materialize.min.css",revision:"f288d8c8c9ea9f4d0bb6f8f81c8ff7da"},{url:"_assets/css/style.css",revision:"9e2fb6d03d3644a284237787a9a9b673"},{url:"_assets/img/icons/launch/normal/apple-icon-120.png",revision:"f0ffea3c9038120066471db7821762e9"},{url:"_assets/img/icons/launch/normal/apple-icon-152.png",revision:"f5f7122d5768003cf9e94ae2dbd028fe"},{url:"_assets/img/icons/launch/normal/apple-icon-167.png",revision:"09f2998bd78f045ad8d43db004476a26"},{url:"_assets/img/icons/launch/normal/apple-icon-180.png",revision:"62ed7a98975fab23860e1149c5111456"},{url:"_assets/img/icons/launch/normal/favicon-196.png",revision:"c9ee71bd35105aabbe96dda1e8eb9ac4"},{url:"_assets/img/icons/launch/normal/manifest-icon-192.png",revision:"79fce6ab0f0cf77a57921b87e1391ffa"},{url:"_assets/img/icons/launch/normal/manifest-icon-384.png",revision:"e486f49073980f75a2b8d63b15920190"},{url:"_assets/img/icons/launch/normal/manifest-icon-512.png",revision:"b519f37bc676b109788e11c18da98477"},{url:"_assets/img/icons/launch/normal/splash-196.png",revision:"89745dde8848211bb1915a82795bd8dc"},{url:"_assets/img/icons/x-circle.svg",revision:"a8c80531c199e5dd112270027fed112d"},{url:"_assets/js/jquery-2.1.1.min.js",revision:"9a094379d98c6458d480ad5a51c4aa27"},{url:"_assets/js/materialize.min.js",revision:"22b19b270f8f06e2f6a85f7ca2dfe3aa"},{url:"_assets/js/moment-timezone-with-data-10-year-range.min.js",revision:"037c0417be7f8ec81c89bbe26cf24fdd"},{url:"_assets/js/moment.min.js",revision:"5c158b940513c7dc2ebd901455e9b63d"},{url:"_assets/json/countries.json",revision:"da0c6fadb818cbd0da8e9501a055e9ca"},{url:"admin/content.xml",revision:"da6a8ca40b190f4b657c597703e9db73"},{url:"admin/index.html",revision:"37fb45c46c061d9e547a06b92915e91c"},{url:"admin/logic.js",revision:"92f26799d4e8f8e98cb2f94debd5a377"},{url:"admin/preauth/content.xml",revision:"8693ddd6e93daf2f0b76cd933e9f2fbc"},{url:"admin/preauth/index.html",revision:"e352219c50700115a5abc5c86a28612e"},{url:"admin/preauth/logic.js",revision:"9cc2ba5e3cbdbce8a58e3cfd32b4fe82"},{url:"content.xml",revision:"9fc73ac0be72d3c9c0e5695bce4cc68d"},{url:"enforceaccess.js",revision:"fcb4d42ac9487c6717af1125ca794cbe"},{url:"favicon.ico",revision:"d513a2df75cef438815eb0bfdf113188"},{url:"index.html",revision:"c129b6f9ff9ab4d8118ff38bd2f02820"},{url:"logic.js",revision:"70c93b547949b52554a29a3f8ef15531"},{url:"login/content.xml",revision:"a64b58743a23829d8a40595b899a1cbb"},{url:"login/index.html",revision:"d4cc877a0a7ab2ceec793dfd3bf12b72"},{url:"login/logic.js",revision:"36decc7928c29f144d76035990e0b1c9"},{url:"logout/index.html",revision:"de584f68290e51764be9e7ee7bd97782"},{url:"logout/logic.js",revision:"138944bea60db621f6427c8eaf574d27"},{url:"offline/content.xml",revision:"749a1abd3b3c1f73e7da5442b835a517"},{url:"offline/index.html",revision:"392e96fc0f7a732fafd256baf32620c2"},{url:"offline/logic.js",revision:"5682229bd0ea0c336bf4b11d6e05cddc"},{url:"profile/content.xml",revision:"3aa4d6f3c7bad593d8c4dba1d0b514b9"},{url:"profile/index.html",revision:"5adba46ec60faa3fc20e8349670c7039"},{url:"profile/logic.js",revision:"feba87b1bd96651cde251d65b1113473"},{url:"pw-forgot/content.xml",revision:"7340432b37f5730b262bab12b47c4d2f"},{url:"pw-forgot/index.html",revision:"628752f660a502c70fe4fa8595059658"},{url:"pw-forgot/logic.js",revision:"bcd35676e06dbe3b27c68a2e1ed4f956"},{url:"register/content.xml",revision:"841fd53c408fbbdc2a910094ffa93233"},{url:"register/index.html",revision:"c3fde1221538e92baf63b573f1540aa3"},{url:"register/logic.js",revision:"348988d09ed9efdfb580b63f12f6f574"},{url:"shared.js",revision:"309bdf000668bbaf7549e265a5c7dd2e"},{url:"subscribe/cancel/content.xml",revision:"575b8ac60b57129f9e218e16f919e5ae"},{url:"subscribe/cancel/index.html",revision:"337949e197883ce1e2546f495b99a396"},{url:"subscribe/cancel/logic.js",revision:"8ca25ce19bab5d7c6db0bdb8561a99a9"},{url:"subscribe/success/content.xml",revision:"0831db652523aaaa933f20b5d1b05125"},{url:"subscribe/success/index.html",revision:"9b92243e029171d84e5dec983a4c1fce"},{url:"subscribe/success/logic.js",revision:"5f9a72d9e3e215ba11cc4ccefc259523"},{url:"why/content.xml",revision:"14f1a5e8745aaffa97d42ccc9e50e25f"},{url:"why/index.html",revision:"70cf0a3ba0e95a864c92242ca984fe49"},{url:"why/logic.js",revision:"dc58665f3c19ec15c75ca3c77ada91a9"}],{})}));
//# sourceMappingURL=sw.js.map
