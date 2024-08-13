let cacheName = "notes-app"
let assets = [
  "/",
  "/index.html",
  "/main.js",
  "/push.min.js",
  "/serviceWorker.min.js",
  "/style.css",
  "/images/bg.jpg",
  "/images/delete.png",
  "/images/notes32*32.png",
  "/images/notes64*64.png",
  "/images/notes128*128.png",
  "/images/notes256*256.png",
  "/images/notes512*512.png"
  ]
self.addEventListener('install', e => {
  console.log("install")
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets)
    })
  )
})

self.addEventListener('Fetch', e => {
  e.respondWith(
    caches.match(e.Request).then(Response => {
      return Response || Fetch(e.Request)
    })
  )
})