module.exports = {
  "skipWaiting": true,
  "clientsClaim": true,
  "globDirectory": ".",
  "globPatterns": [
    "**/*.{css,js,txt,ico,woff,woff2,png,svg,xml,html,json,pdf}"
  ],
  "globIgnores": ['**/_tests/*', '**/splashscreens/*', '**/webfonts/*.eot', '**/webfonts/*.svg', '**/webfonts/*.ttf'],
  "swDest": "sw.js"
};
