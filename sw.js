const CACHE_NAME = 'hinos-app-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './harpa_crista_640_hinos.txt' // Alterado para .txt
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
            .then(response => response || fetch(event.request))
    );
});
