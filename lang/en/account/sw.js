if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,r,a)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return i;case"module":return c;default:return e(s)}}))).then((e=>{const s=a(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-3feae7aa"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_assets/css/fontawesome-free-5.11.2-web/css/all.min.css",revision:"08ad7a4a944e7564adf9414e9626f501"},{url:"_assets/css/fontawesome-free-5.11.2-web/LICENSE.txt",revision:"6957234f7c170c187a9e39f89181b519"},{url:"_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share-alt.svg",revision:"e1687b6439ed47f1280e6e8044a1b6fa"},{url:"_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share.svg",revision:"aaa018a562a6839cb0ab8d1bb1ace056"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.svg",revision:"3d102342391af184d5ae9e7708d8220f"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff",revision:"333bae208dc363746961b234ff6c2500"},{url:"_assets/css/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff2",revision:"44d537ab79f921fde5a28b2c1636f397"},{url:"_assets/css/materialize.min.css",revision:"f288d8c8c9ea9f4d0bb6f8f81c8ff7da"},{url:"_assets/css/style.css",revision:"a7618fa0f0c86f94b0899e41c3383183"},{url:"_assets/img/icons/x-circle.svg",revision:"a8c80531c199e5dd112270027fed112d"},{url:"_assets/js/jquery-2.1.1.min.js",revision:"9a094379d98c6458d480ad5a51c4aa27"},{url:"_assets/js/materialize.min.js",revision:"22b19b270f8f06e2f6a85f7ca2dfe3aa"},{url:"_assets/js/moment-timezone-with-data-10-year-range.min.js",revision:"037c0417be7f8ec81c89bbe26cf24fdd"},{url:"_assets/js/moment.min.js",revision:"5c158b940513c7dc2ebd901455e9b63d"},{url:"_assets/json/countries.json",revision:"da0c6fadb818cbd0da8e9501a055e9ca"},{url:"content.xml",revision:"d77921471b6cffa221c3b943caa6db60"},{url:"enforceaccess.js",revision:"e0b212d17aef00adae5a7e8e00d4aad1"},{url:"index.html",revision:"fbc7950f0a17e1b8776d7d65970d0ffe"},{url:"logic.js",revision:"9e4e41edcfbf51015b8ae46ab4c9819c"},{url:"login/content.xml",revision:"a64b58743a23829d8a40595b899a1cbb"},{url:"login/index.html",revision:"052ec7fe5ddf4eb5c25b8dbd6cc6092f"},{url:"login/logic.js",revision:"a6a6840b987e3ffcd9fdb280b3c29380"},{url:"logout/index.html",revision:"de584f68290e51764be9e7ee7bd97782"},{url:"logout/logic.js",revision:"138944bea60db621f6427c8eaf574d27"},{url:"pw-forgot/content.xml",revision:"8732fb087997d1cc948f984e9b7144a8"},{url:"pw-forgot/index.html",revision:"f0a803a471406b5d414d91375ed3f5f8"},{url:"pw-forgot/logic.js",revision:"bff38853ed841a8cbb08ac61cee2b578"},{url:"register/content.xml",revision:"cfd8c04311fb138f4a286a1df3e08652"},{url:"register/index.html",revision:"9b926f8a81f3aaf7dae7195c683989aa"},{url:"register/logic.js",revision:"d900180cf52892426906f05d632c5f37"},{url:"shared.js",revision:"c4c5dd59741fba83b2c2739ea7028ba8"},{url:"subscribe/cancel/content.xml",revision:"575b8ac60b57129f9e218e16f919e5ae"},{url:"subscribe/cancel/index.html",revision:"5a708d7e375a726261f53c22c9c72fbc"},{url:"subscribe/cancel/logic.js",revision:"170483a05b5c62fbe7e0f25faeb26d77"},{url:"subscribe/success/content.xml",revision:"0831db652523aaaa933f20b5d1b05125"},{url:"subscribe/success/index.html",revision:"507f25e6834db5aacaa91915389b9877"},{url:"subscribe/success/logic.js",revision:"cd880e80d0031c1673a07666a4b9fe18"},{url:"why/content.xml",revision:"14f1a5e8745aaffa97d42ccc9e50e25f"},{url:"why/index.html",revision:"7d7bbbcde890ea559503903f2e2fd0eb"},{url:"why/logic.js",revision:"dc58665f3c19ec15c75ca3c77ada91a9"}],{})}));
//# sourceMappingURL=sw.js.map
