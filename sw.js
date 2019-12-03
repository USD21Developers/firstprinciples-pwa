/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "_assets/css/materialize.min.css",
    "revision": "3c3ee463702a1f1a74a8d7ba36f16f3e"
  },
  {
    "url": "_assets/css/style.css",
    "revision": "1a7079331c79ca4b9dc72c563ba18c93"
  },
  {
    "url": "_assets/font/home.svg",
    "revision": "667fe04cb807eb3cc02e099a11cb4e60"
  },
  {
    "url": "_assets/font/home.woff",
    "revision": "926a17462a873cb754c8319040459acf"
  },
  {
    "url": "_assets/font/home.woff2",
    "revision": "d8521629f0d22adc1dbcc314b724c245"
  },
  {
    "url": "_assets/js/fp/base.js",
    "revision": "a9e87c2dc785f5a51869ae79db9065af"
  },
  {
    "url": "_assets/js/fp/language.js",
    "revision": "cb2173bfb15bc550498663d8355f7acd"
  },
  {
    "url": "_assets/js/jquery-2.1.1.min.js",
    "revision": "e40ec2161fe7993196f23c8a07346306"
  },
  {
    "url": "_assets/js/materialize.min.js",
    "revision": "4be20daf389876e76af72bbcf4e11fd0"
  },
  {
    "url": "favicon.ico",
    "revision": "ffa5354402894a525414eebd9bf3b719"
  },
  {
    "url": "index.html",
    "revision": "127ca287fe57e2c3e748460d61837f9e"
  },
  {
    "url": "languages.json",
    "revision": "a4fd5b337ab0292136bc7bd7d3887a5e"
  },
  {
    "url": "manifest.json",
    "revision": "1e2cc4edd707326bd1fdfab0579cf0d7"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
