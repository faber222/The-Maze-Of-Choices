const version = "0.1.0";
const cacheName = "labirinto-das-escolhas";
const precacheResources = [
  "./assets/baixo.png",
  "./assets/cima.png",
  "./assets/direita.png",
  "./assets/esquerda.png",
  "./assets/fullscreen.png",
  "./assets/logo-128.png",
  "./assets/logo-192.png",
  "./assets/logo-256.png",
  "./assets/logo-384.png",
  "./assets/logo-512.png",
  "./assets/map.json",
  "./assets/mapPeck.png",
  "./assets/player2.png",
  "./assets/player.png",
  "./assets/gameover.png",
  "./assets/objectCollider.json",
  "./assets/start.png",
  "./assets/victory.png",
  "./sounds/abertura.mp3",
  "./sounds/ambient.mp3",
  "./sounds/explode1.mp3",
  "./sounds/hit1.mp3",
  "./sounds/stone1.mp3",
  "./sounds/stone4.mp3",
  "./sounds/wait.mp3",
  "./index.html",
  "./scripts/cena0.js",
  "./scripts/cena1.js",
  "./scripts/cena2.js",
  "./scripts/index.js",
  "./scripts/app.js",
  "./index.css",
  "./manifest.json",
  "./sw.js",
];

self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precacheResources).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch intercepted for: ", event.request.url);
  event.respondWith(
    caches
      .open(cacheName)
      .then((cache) => cache.match(event.request, { ignoreSearch: true }))
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
