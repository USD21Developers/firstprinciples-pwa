module.exports = {
  "skipWaiting": true,
  "clientsClaim": true,
  "globDirectory": ".",
  "globPatterns": [
    "**/*.{css,js,json,svg,woff,woff2,png,ico,html}",
  ],
  "globIgnores": [
    "**/lang/**",
    "**/fontawesome-free-5.11.2-web/**",
    "**/high-res.png",
    "**/img/body.png",
    "**/icons/**",
    "**/splashscreens/**",
    "**/scripture.js",
    "**/localforage.**",
    "**/browser-sync.js",
    "**/node_modules/**",
    "**/composer.json",
    "**/package*",
    "**/workbox-config.js",
    "**/light-darkness.css",
    "**/the-church.css",
    "**/body.png",
    "**/icons/**",
    "**/scripture.js",
    "**/localforage*"
  ],
  "swDest": "sw.js"
};