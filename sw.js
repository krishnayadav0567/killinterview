const CACHE_NAME = "developer-interview-master-v7";
const APP_SHELL = [
  "./",
  "./index.html",
  "./topics.html",
  "./topic.html",
  "./quiz.html",
  "./progress.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./css/topics.css",
  "./css/topic.css",
  "./css/quiz.css",
  "./css/progress.css",
  "./js/app.js",
  "./js/storage.js",
  "./js/topics.js",
  "./js/topic.js",
  "./js/quiz.js",
  "./js/progress.js",
  "./data/java-topics.js",
  "./data/java/index.js",
  "./data/java/theory.js",
  "./data/java/fundamentals/index.js",
  "./data/java/fundamentals/what-is.js",
  "./data/java/fundamentals/why.js",
  "./data/java/fundamentals/how-it-works.js",
  "./data/java/fundamentals/quiz-output.js",
  "./data/java/fundamentals/quiz-what.js",
  "./data/java/fundamentals/quiz-why.js",
  "./data/java/multithreading/index.js",
  "./data/java/multithreading/what-is.js",
  "./data/java/multithreading/why.js",
  "./data/java/multithreading/how-it-works.js",
  "./data/java/multithreading/quiz-output.js",
  "./data/java/multithreading/quiz-what.js",
  "./data/java/multithreading/quiz-why.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith((async () => {
    const url = new URL(event.request.url);
    const cacheRequest = new Request(url.origin + url.pathname);
    const cached = await caches.match(cacheRequest);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok && url.origin === self.location.origin) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(cacheRequest, response.clone());
      }
      return response;
    } catch (error) {
      if (event.request.mode === "navigate") return caches.match("./index.html");
      return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
    }
  })());
});