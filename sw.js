// Service Worker — Mis Recetas
// Permite que la app funcione como una PWA instalable

const VERSION_CACHE = 'mis-recetas-v1';
const ARCHIVOS_CACHE = [
  '/mis-recetas/',
  '/mis-recetas/index.html',
  '/mis-recetas/manifest.json'
];

// Al instalar el service worker, guarda los archivos en caché
self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(VERSION_CACHE).then(cache => cache.addAll(ARCHIVOS_CACHE))
  );
});

// Al activar, elimina cachés antiguas
self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys().then(claves =>
      Promise.all(claves.filter(c => c !== VERSION_CACHE).map(c => caches.delete(c)))
    )
  );
});

// Estrategia: red primero, caché como respaldo
self.addEventListener('fetch', evento => {
  evento.respondWith(
    fetch(evento.request).catch(() => caches.match(evento.request))
  );
});
