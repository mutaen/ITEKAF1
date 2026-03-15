const CACHE_NAME = 'itekaf-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// تثبيت Service Worker وتخزين الملفات للعمل بدون نت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  console.log("Service Worker Installed");
});

// جلب الملفات من الكاش إذا لم يكن هناك إنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إرجاع النسخة المخبأة إذا وجدت، وإلا جلبها من النت
        return response || fetch(event.request);
      })
  );
});
