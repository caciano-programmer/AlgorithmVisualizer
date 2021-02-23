/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

importScripts('filesList.js');
const files = ['/', '/icons/', '/filesList.js', ...getFilesList()].filter(file => !/^.*serviceWorker.*$/.test(file));

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open('SortVis').then(cache => cache.addAll(files)));
});

addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;
      return fetch(event.request);
    })(),
  );
});
