/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('SortVis')
      .then(cache =>
        cache.addAll([
          '/',
          '/index.html',
          '/app.js',
          '/app.css',
          '/manifest.json',
          '/198.js',
          '/352.js',
          '/585.js',
          '/395.js',
          '/icons/',
          '/icons/leaderboard.webp',
          '/icons/leaderboard16.png',
          '/icons/leaderboard192.png',
          '/icons/leaderboard512.png',
        ]),
      ),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) await self.registration.navigationPreload.enable();
    })(),
  );
  self.clients.claim();
});

addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      // Respond from the cache if we can
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;
      // Else, use the preloaded response, if it's there
      const response = await event.preloadResponse;
      if (response) return response;
      // Else try the network.
      return fetch(event.request);
    })(),
  );
});
