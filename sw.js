/**
 * Service Worker - MHQ Analysis PWA
 * Strategy: Cache-First for static assets, falling back to network.
 */

const CACHE_NAME = 'mhq-analysis-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './styles/index.css',
    './scripts/app.js',
    './scripts/storage.js',
    './scripts/assessment.js',
    './scripts/scoring.js',
    './scripts/ui.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Pre-caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                // Return network response directly for external/non-cached items
                return networkResponse;
            });
        })
    );
});
