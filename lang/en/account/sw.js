if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,a,n)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return i;case"module":return c;default:return e(s)}}))).then((e=>{const s=n(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-3feae7aa"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_assets/css/fontawesome-free-5.11.2-web/css/all.min.css",revision:"08ad7a4a944e7564adf9414e9626f501"},{url:"_assets/css/fontawesome-free-5.11.2-web/LICENSE.txt",revision:"6957234f7c170c187a9e39f89181b519"},{url:"_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share-alt.svg",revision:"e1687b6439ed47f1280e6e8044a1b6fa"},{url:"_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share.svg",revision:"aaa018a562a6839cb0ab8d1bb1ace056"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.svg",revision:"3d102342391af184d5ae9e7708d8220f"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff",revision:"333bae208dc363746961b234ff6c2500"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff2",revision:"44d537ab79f921fde5a28b2c1636f397"},{url:"_assets/css/materialize.min.css",revision:"f288d8c8c9ea9f4d0bb6f8f81c8ff7da"},{url:"_assets/css/style.css",revision:"be4e72f01594e0fc220837427c05cb5f"},{url:"_assets/img/icons/launch/normal/apple-icon-120.png",revision:"c92abe5639b2da3bc801ac92d133670b"},{url:"_assets/img/icons/launch/normal/apple-icon-152.png",revision:"9747d90ea02abb36a5aa334afd245488"},{url:"_assets/img/icons/launch/normal/apple-icon-167.png",revision:"5bb631070482a754849e6ccaa1257a36"},{url:"_assets/img/icons/launch/normal/apple-icon-180.png",revision:"4e70a2a6ee1b6240f19dcbc6f200251d"},{url:"_assets/img/icons/launch/normal/favicon-196.png",revision:"48b02572fa3fad64514aac09b7fb00ca"},{url:"_assets/img/icons/launch/normal/manifest-icon-128.png",revision:"75bcb57306aa6d542ab3a8f6e34a50cb"},{url:"_assets/img/icons/launch/normal/manifest-icon-144.png",revision:"dacfa609218f4f44ba4583d44d2070a9"},{url:"_assets/img/icons/launch/normal/manifest-icon-152.png",revision:"9747d90ea02abb36a5aa334afd245488"},{url:"_assets/img/icons/launch/normal/manifest-icon-192.png",revision:"41d6b1e6e95e8a979e866a72b8762fbc"},{url:"_assets/img/icons/launch/normal/manifest-icon-360.png",revision:"e6190958cb14196e40a459f3c81512da"},{url:"_assets/img/icons/launch/normal/manifest-icon-384.png",revision:"c02d4bad63e558cd9e3efcd8f309a179"},{url:"_assets/img/icons/launch/normal/manifest-icon-512.png",revision:"f2a820bd5889c65a7fd2f7b741a80e40"},{url:"_assets/img/icons/launch/normal/manifest-icon-72.png",revision:"908f5a2826c4fdb2e226d68c82d6ee15"},{url:"_assets/img/icons/launch/normal/manifest-icon-96.png",revision:"29eae51a87f9d8057b2b21c8124a6179"},{url:"_assets/img/icons/launch/normal/splash-196.png",revision:"35815b1f28713ad06b5ce4cb7d181da7"},{url:"_assets/img/icons/x-circle.svg",revision:"a8c80531c199e5dd112270027fed112d"},{url:"_assets/js/jquery-2.1.1.min.js",revision:"9a094379d98c6458d480ad5a51c4aa27"},{url:"_assets/js/materialize.min.js",revision:"22b19b270f8f06e2f6a85f7ca2dfe3aa"},{url:"_assets/js/moment-timezone-with-data-10-year-range.min.js",revision:"037c0417be7f8ec81c89bbe26cf24fdd"},{url:"_assets/js/moment.min.js",revision:"d3863afb7f43b369e3a9e42f14dbd267"},{url:"_assets/json/countries.json",revision:"da0c6fadb818cbd0da8e9501a055e9ca"},{url:"admin/content.xml",revision:"d3addf4ad8647586b9245a328333875b"},{url:"admin/coupons/content.xml",revision:"90b053c08dd73ef2c8e4d57c53fe9c47"},{url:"admin/coupons/index.html",revision:"ca446d11b444c03cb0e909d9be62d2ac"},{url:"admin/coupons/logic.js",revision:"d03c83962b73f5e445d20349c9e0c4a8"},{url:"admin/index.html",revision:"18448a890ce06d3c8c32e97877cb285f"},{url:"admin/logic.js",revision:"25d3c452c66f8b02f5cae2d994476ced"},{url:"admin/preauth/content.xml",revision:"6fce85969ce9fde3d7101169d3b4b826"},{url:"admin/preauth/index.html",revision:"a13641241f97e2e9b2f2d2d65fe22225"},{url:"admin/preauth/logic.js",revision:"9cc2ba5e3cbdbce8a58e3cfd32b4fe82"},{url:"admin/users/content.xml",revision:"cfc8e471f3a065371d7e6086254603ba"},{url:"admin/users/index.html",revision:"e0b33c34120c9dde25a013c68339686a"},{url:"admin/users/logic.js",revision:"5aa33baff63031c051de4f5f35592d2b"},{url:"content.xml",revision:"8da41473bd876eff3aa514d655cfc45a"},{url:"enforceaccess.js",revision:"9886037f89a56e2b25cfe2b73e7f2612"},{url:"favicon.ico",revision:"ad4c186031ff559655cddce21483b5bc"},{url:"index.html",revision:"5eab2433775562f601020ed9cccf8e1c"},{url:"logic.js",revision:"f6698fa9eb0f9540422e186041a52942"},{url:"login/content.xml",revision:"a64b58743a23829d8a40595b899a1cbb"},{url:"login/index.html",revision:"1a452d2536f01425c4d3dc40a24b7813"},{url:"login/logic.js",revision:"f12bd5aa6130fcee011abba68c1e0ae8"},{url:"logout/index.html",revision:"de584f68290e51764be9e7ee7bd97782"},{url:"logout/logic.js",revision:"97ad15fdb82cc64b66974a0e56734e61"},{url:"offline/content.xml",revision:"749a1abd3b3c1f73e7da5442b835a517"},{url:"offline/index.html",revision:"96ebe6c99c3af906ff4824ff2272298e"},{url:"offline/logic.js",revision:"1c2e7de2f37bec4d992e3068be9cae75"},{url:"profile/content.xml",revision:"99696011037a15b6128d9f64bbda0908"},{url:"profile/index.html",revision:"9dffbd9a51877103a3e814741062e6e7"},{url:"profile/logic.js",revision:"9b2456457db03e042780e8026e96e45e"},{url:"pw-forgot/content.xml",revision:"7340432b37f5730b262bab12b47c4d2f"},{url:"pw-forgot/index.html",revision:"4cfc4901d87cd691c433e5eb99244f81"},{url:"pw-forgot/logic.js",revision:"bcd35676e06dbe3b27c68a2e1ed4f956"},{url:"register/content.xml",revision:"a544b708f54a4be3c828922019718482"},{url:"register/index.html",revision:"d6dfa28c771653b0d4fcc0de6eca88df"},{url:"register/logic.js",revision:"4f9b22685fc74446ede7f0df385ba562"},{url:"shared.js",revision:"72d8d35b43c6db9a9024b18331c42654"},{url:"subscribe/cancel/content.xml",revision:"3e1f05719109c6e23e12067dc9c6e79c"},{url:"subscribe/cancel/index.html",revision:"8321f26c6295fa8eed1a6edf57bd0a2e"},{url:"subscribe/cancel/logic.js",revision:"40e10be5f1f1376c5aa9241df7633f2a"},{url:"subscribe/success/content.xml",revision:"615a5df36dbe7b7817af8248ce08282a"},{url:"subscribe/success/index.html",revision:"710faafedb692c0f7b395eb313276259"},{url:"subscribe/success/logic.js",revision:"ac85100e0a847a97383789faa0a2cb4b"},{url:"why/content.xml",revision:"d3849f1fc8f42b98f818c4d019cee63a"},{url:"why/index.html",revision:"8c2fc75c845176fdd21c7721d87b517f"},{url:"why/logic.js",revision:"ee9bf3e566e4bedfe7f9d78d4183f537"}],{})}));
//# sourceMappingURL=sw.js.map
