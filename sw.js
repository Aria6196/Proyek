const CACHE_NAME = 'web-app-cache-v1';
const urlsToCache = [
    '/Proyek_Web/pos.php',
    '/Proyek_Web/style.css',
    '/Proyek_Web/formstyle.css',y
    '/Proyek_Web/script.js',
    '/Proyek_Web/images/icons/icon-192x192.png',
    '/Proyek_Web/images/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

