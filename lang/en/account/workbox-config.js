module.exports = {
  skipWaiting: true,
  clientsClaim: true,
  globDirectory: ".",
  globPatterns: [
    "**/*.{css,js,ico,txt,woff,woff2,png,svg,xml,html,json,pdf}"
  ],
  swDest: "sw.js"
};