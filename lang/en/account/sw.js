if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,a,c)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const n={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return i;case"module":return n;default:return e(s)}}))).then((e=>{const s=c(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-3feae7aa"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_assets/css/fontawesome-free-5.11.2-web/css/all.min.css",revision:"08ad7a4a944e7564adf9414e9626f501"},{url:"_assets/css/fontawesome-free-5.11.2-web/LICENSE.txt",revision:"6957234f7c170c187a9e39f89181b519"},{url:"_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share-alt.svg",revision:"e1687b6439ed47f1280e6e8044a1b6fa"},{url:"_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share.svg",revision:"aaa018a562a6839cb0ab8d1bb1ace056"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.svg",revision:"3d102342391af184d5ae9e7708d8220f"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff",revision:"333bae208dc363746961b234ff6c2500"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff2",revision:"44d537ab79f921fde5a28b2c1636f397"},{url:"_assets/css/materialize.min.css",revision:"f288d8c8c9ea9f4d0bb6f8f81c8ff7da"},{url:"_assets/css/style.css",revision:"949321328b14c2f36be9b3880cb1d401"},{url:"_assets/img/icons/launch/normal/apple-icon-120.png",revision:"f0ffea3c9038120066471db7821762e9"},{url:"_assets/img/icons/launch/normal/apple-icon-152.png",revision:"f5f7122d5768003cf9e94ae2dbd028fe"},{url:"_assets/img/icons/launch/normal/apple-icon-167.png",revision:"09f2998bd78f045ad8d43db004476a26"},{url:"_assets/img/icons/launch/normal/apple-icon-180.png",revision:"62ed7a98975fab23860e1149c5111456"},{url:"_assets/img/icons/launch/normal/favicon-196.png",revision:"c9ee71bd35105aabbe96dda1e8eb9ac4"},{url:"_assets/img/icons/launch/normal/manifest-icon-192.png",revision:"79fce6ab0f0cf77a57921b87e1391ffa"},{url:"_assets/img/icons/launch/normal/manifest-icon-384.png",revision:"e486f49073980f75a2b8d63b15920190"},{url:"_assets/img/icons/launch/normal/manifest-icon-512.png",revision:"b519f37bc676b109788e11c18da98477"},{url:"_assets/img/icons/launch/normal/splash-196.png",revision:"89745dde8848211bb1915a82795bd8dc"},{url:"_assets/img/icons/x-circle.svg",revision:"a8c80531c199e5dd112270027fed112d"},{url:"_assets/js/jquery-2.1.1.min.js",revision:"9a094379d98c6458d480ad5a51c4aa27"},{url:"_assets/js/materialize.min.js",revision:"22b19b270f8f06e2f6a85f7ca2dfe3aa"},{url:"_assets/js/moment-timezone-with-data-10-year-range.min.js",revision:"037c0417be7f8ec81c89bbe26cf24fdd"},{url:"_assets/js/moment.min.js",revision:"5c158b940513c7dc2ebd901455e9b63d"},{url:"_assets/json/countries.json",revision:"da0c6fadb818cbd0da8e9501a055e9ca"},{url:"admin/content.xml",revision:"da6a8ca40b190f4b657c597703e9db73"},{url:"admin/coupons/content.xml",revision:"f99662b867920052ed8082da8e25a60c"},{url:"admin/coupons/index.html",revision:"a9ec1485adf5aa1bfaaec2ba29735f6b"},{url:"admin/coupons/logic.js",revision:"e49861080dd4b3025b79bb4acac4f996"},{url:"admin/index.html",revision:"ff1f1c48f270f4434507a06adc360fa8"},{url:"admin/logic.js",revision:"426104e9a9d9a53f1814865bf6693a45"},{url:"admin/preauth/content.xml",revision:"8693ddd6e93daf2f0b76cd933e9f2fbc"},{url:"admin/preauth/index.html",revision:"a13641241f97e2e9b2f2d2d65fe22225"},{url:"admin/preauth/logic.js",revision:"9cc2ba5e3cbdbce8a58e3cfd32b4fe82"},{url:"content.xml",revision:"8da41473bd876eff3aa514d655cfc45a"},{url:"enforceaccess.js",revision:"7f8b9974a1b79186532ffa3bb08d19cf"},{url:"favicon.ico",revision:"d513a2df75cef438815eb0bfdf113188"},{url:"index.html",revision:"eef035f3f2fb6db3ccba318afae2d4ad"},{url:"logic.js",revision:"7c0816dc42cb0cb11b08fc931721fcfc"},{url:"login/content.xml",revision:"a64b58743a23829d8a40595b899a1cbb"},{url:"login/index.html",revision:"1a452d2536f01425c4d3dc40a24b7813"},{url:"login/logic.js",revision:"f12bd5aa6130fcee011abba68c1e0ae8"},{url:"logout/index.html",revision:"de584f68290e51764be9e7ee7bd97782"},{url:"logout/logic.js",revision:"97ad15fdb82cc64b66974a0e56734e61"},{url:"offline/content.xml",revision:"749a1abd3b3c1f73e7da5442b835a517"},{url:"offline/index.html",revision:"96ebe6c99c3af906ff4824ff2272298e"},{url:"offline/logic.js",revision:"1c2e7de2f37bec4d992e3068be9cae75"},{url:"profile/content.xml",revision:"3aa4d6f3c7bad593d8c4dba1d0b514b9"},{url:"profile/index.html",revision:"7c475e7db2aa60fae271872d8f0114e2"},{url:"profile/logic.js",revision:"9b2456457db03e042780e8026e96e45e"},{url:"pw-forgot/content.xml",revision:"7340432b37f5730b262bab12b47c4d2f"},{url:"pw-forgot/index.html",revision:"4cfc4901d87cd691c433e5eb99244f81"},{url:"pw-forgot/logic.js",revision:"bcd35676e06dbe3b27c68a2e1ed4f956"},{url:"register/content.xml",revision:"a544b708f54a4be3c828922019718482"},{url:"register/index.html",revision:"d6dfa28c771653b0d4fcc0de6eca88df"},{url:"register/logic.js",revision:"535caa5b90c3e7ec0a8354456d9bcafa"},{url:"shared.js",revision:"72d8d35b43c6db9a9024b18331c42654"},{url:"subscribe/cancel/content.xml",revision:"575b8ac60b57129f9e218e16f919e5ae"},{url:"subscribe/cancel/index.html",revision:"fe5330f3b4c2e81483b13562816dc8bb"},{url:"subscribe/cancel/logic.js",revision:"8ca25ce19bab5d7c6db0bdb8561a99a9"},{url:"subscribe/success/content.xml",revision:"0831db652523aaaa933f20b5d1b05125"},{url:"subscribe/success/index.html",revision:"710faafedb692c0f7b395eb313276259"},{url:"subscribe/success/logic.js",revision:"5f9a72d9e3e215ba11cc4ccefc259523"},{url:"why/content.xml",revision:"b6486ded3bf4b9800d5fa88f39c202c4"},{url:"why/index.html",revision:"8c2fc75c845176fdd21c7721d87b517f"},{url:"why/logic.js",revision:"ee9bf3e566e4bedfe7f9d78d4183f537"}],{})}));
//# sourceMappingURL=sw.js.map
