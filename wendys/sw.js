importScripts('cachepolyfill.js');
var CACHE_NAME = 'osg-cache-v5';
var urlsToCache = [
  '/',
  'index.html',
  'onepage.html',
  'likespike2.jpg',
  'android-chrome-36x36.png',
  'android-chrome-48x48.png',
  'android-chrome-72x72.png',
  'android-chrome-96x96.png',
  'android-chrome-144x144.png',
  'android-chrome-192x192.png',
  'apple-touch-icon-57x57.png',
  'apple-touch-icon-60x60.png',
  'apple-touch-icon-72x72.png',
  'apple-touch-icon-76x76.png',
  'apple-touch-icon-114x114.png',
  'apple-touch-icon-120x120.png',
  'apple-touch-icon-144x144.png',
  'apple-touch-icon-152x152.png',
  'apple-touch-icon-180x180.png',
  'apple-touch-icon-precomposed.png',
  'apple-touch-icon.png',
  'browserconfig.xml',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-96x96.png',
  'favicon.ico',
  'mstile-70x70.png',
  'mstile-144x144.png',
  'mstile-150x150.png',
  'mstile-310x150.png',
  'mstile-310x310.png',
  'safari-pinned-tab.svg',
  'images/action1.jpg',
  'images/award1.jpg',
  'images/banner1.jpg',
  'images/bg2.jpg',
  'images/cover1.jpg',
  'images/dragonrider1271.jpg',
  'images/lookgood.jpg',
  'images/mailmondays1.jpg',
  'images/onset1.jpg',
  'images/profile1.jpg',
  'images/realtalk1.jpg',
  'images/twitter.png',
  'images/youtube.png',
  'assets/css/ie8.css',
  'assets/css/main.css',
  'assets/css/images/overlay.png',
  'assets/js/charts.min.js',
  'assets/js/jquery.min.js',
  'assets/js/jquery.poptrox.min.js',
  'assets/js/main.js',
  'assets/js/skel.min.js',
  'assets/js/util.js',
  'assets/js/ie/html5shiv.js',
  'assets/js/ie/respond.min.js',
  'cachepolyfill.js',
  'sw.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});

/*this.addEventListener('fetch', function(evt){
    console.log('fetching data');
    evt.respondWith(
        caches.open('images').then(function(cache){
            return cache.match(evt.request).then(function (response) {
                console.log(response);
                return response || fetch(event.request.clone());
            });
        })
    );
});*/


