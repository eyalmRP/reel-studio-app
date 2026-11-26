// Reel Studio installed as an app (the public copy, scripts/publish-app.sh):
// the page always comes from the network, so the app is the one last
// published; the copy kept here opens it when there is no connection.
const CACHE = 'reel-studio-page';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put('./', copy));
        return r;
      })
      .catch(() => caches.match('./'))
  );
});
