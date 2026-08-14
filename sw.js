const CACHE_NAME = 'hinos-app-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './harpa_crista_640_hinos.json' // Garanta que este arquivo esteja na raiz ou ajuste o caminho
];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercepta as requisições para entregar o conteúdo offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache se existir, caso contrário busca na rede
                return response || fetch(event.request);
            })
    );
});