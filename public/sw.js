const CACHE_NAME = 'apnasahara-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Let real-time and Supabase API calls bypass cache or handle gracefully
  if (event.request.url.includes('supabase.co') || event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ 
          error: 'Offline', 
          message: 'Network offline. SOS & live data require active connection.' 
        }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache valid responses for static assets
        if (response.status === 200) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
        }
        return response;
      })
      .catch(async () => {
        // Cache fallback
        const cached = await caches.match(event.request);
        if (cached) return cached;
        // Navigation requests fallback to offline page
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        return new Response('Network error occurred', { status: 408 });
      })
  );
});
