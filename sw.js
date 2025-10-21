const CACHE_NAME = 'niket-portfolio-v1';
const urlsToCache = [
  '/',
  '/assets/css/styles.css',
  '/assets/js/script.js',
  '/assets/js/data.js',
  '/assets/images/profile-pic.png',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
