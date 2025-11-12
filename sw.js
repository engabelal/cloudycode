const CACHE_VERSION = 'v6.0';
const CACHE_NAME = `cloudycode-${CACHE_VERSION}`;
const OFFLINE_PAGE = '/offline.html';

// Critical assets to cache on install
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/main.css',
  '/css/fontawesome-subset.css',
  '/js/main.js',
  '/js/utils.js',
  '/js/ui.js',
  '/js/animations.js',
  '/js/error-handler.js',
  '/js/projects.js',
  '/js/keyboard-nav.js',
  '/images/avatar.webp',
  '/images/cloudycode-light.webp',
  '/images/loading.svg',
  '/images/favicon.svg',
  '/manifest.json'
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error('[SW] Install failed:', err))
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
      .then(() => console.log('[SW] Service worker activated'))
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip non-http(s) requests
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  
  // Skip external CDN requests (always fetch fresh)
  if (url.hostname.includes('cdn.jsdelivr.net') || 
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Strategy: Network First with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response before caching
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache))
            .catch(err => console.warn('[SW] Cache put failed:', err));
        }
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If HTML page and not in cache, show offline page
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_PAGE);
            }
            
            // For other resources, return a basic response
            return new Response('Offline - Resource not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Message event - for manual cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME)
        .then(() => console.log('[SW] Cache cleared'))
    );
  }
});
