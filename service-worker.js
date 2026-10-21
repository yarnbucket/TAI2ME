'use strict';
// Network-first public PWA assets, with an offline fallback.
// This service worker does not transmit or store user questionnaire answers.
const CACHE_NAME = 'tai2me-v1-6-1';
const STATIC_FILES = [
  './', './index.html', './styles.css', './app.js', './manifest.webmanifest',
  './assets/icon-192.png', './assets/icon-512.png'
];
const STATIC_URLS = new Set(STATIC_FILES.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(key => key.startsWith('tai2me-') && key !== CACHE_NAME).map(key => caches.delete(key)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  if (!STATIC_URLS.has(url.href)) return;
  event.respondWith(fetch(req).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(req, copy)));
    }
    return response;
  }).catch(() => caches.match(req)));
});
