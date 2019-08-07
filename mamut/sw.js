const cacheName = "pwa-mamut-daloskony-v1";
const staticAssets = [
    "./",
    "./index.html",
    "./app.js",
    "./icon-250x250.png",
    "./favicon.ico",
];

self.addEventListener("install", async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
});

self.addEventListener("fetch", event => {
    const req = event.request;
    networkFirst(req);
    // The below code allows condidition-based caching
    // if (/.*(html)$/.test(req.url)) {
    //   event.respondWith(networkFirst(req));
    // } else {
    //   event.respondWith(cacheFirst(req));
    // }
  });

async function cacheFirst(req) {
    const cache = await caches.open(cacheName); 
    const cachedResponse = await cache.match(req); 
    return cachedResponse || fetch(req); 
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try { 
      const fresh = await fetch(req);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (e) { 
      const cachedResponse = await cache.match(req);
      return cachedResponse;
    }
}
