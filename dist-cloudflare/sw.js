self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches
            .keys()
            .then(keys => Promise.all(keys.map(key => caches.delete(key))))
            .catch(() => undefined)
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            caches
                .keys()
                .then(keys => Promise.all(keys.map(key => caches.delete(key))))
                .catch(() => undefined),
            self.registration.unregister(),
            self.clients.claim()
        ])
    );
});

self.addEventListener('fetch', () => {
    return;
});
