var cacheName = 'Version0.1.0';

self.addEventListener('install', function(e) {   
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
              '/',
              'index.html',
              'home.html',
              'numeric.html',
              'gamer.html',
              'css/style.css',
              'js/main.js',
              'js/dataCommand.js',
              'img/logo.png'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(names) {
        return Promise.all(
            names.filter(function(name) {
                return name !== cacheName;
            }).map(function(name) {
                return caches.delete(name);
            })
        );
    }).then(function() {
        return self.clients.claim();
    }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Lógica para manejar actualizaciones
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});