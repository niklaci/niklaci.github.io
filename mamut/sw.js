const cacheName = "pwa-mamut-daloskony-v1";
const staticAssets = [
    "./",
    "./index.html",
    "./app.js",
    // "./icon-250x250.png",
];

self.addEventListener("install", async event => {
    console.log("install");
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
});

self.addEventListener("fetch", event => {
    console.log("sw.js fetch event");
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName); 
    const cachedResponse = await cache.match(req); 
    return cachedResponse || fetch(req); 
}
