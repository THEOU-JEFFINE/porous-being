// public/service-worker.js
// Service Worker for intelligent caching based on network type

const CACHE_VERSION = "v1";
const CACHE_NAMES = {
  static: `${CACHE_VERSION}-static`,
  images: `${CACHE_VERSION}-images`,
  videos: `${CACHE_VERSION}-videos`,
  api: `${CACHE_VERSION}-api`,
};

// Assets to cache on install
const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];

/**
 * Install event - cache static assets
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAMES.static).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("Failed to cache static assets:", err);
      });
    }),
  );
  self.skipWaiting();
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !Object.values(CACHE_NAMES).includes(name))
          .map((name) => caches.delete(name)),
      );
    }),
  );
  self.clients.claim();
});

/**
 * Fetch event - intelligent caching based on request type
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests (except images)
  if (url.origin !== self.location.origin) {
    if (!isImageRequest(request)) {
      return;
    }
  }

  // Route different request types to appropriate cache strategies
  if (isImageRequest(request)) {
    event.respondWith(cacheImageStrategy(request));
  } else if (isVideoRequest(request)) {
    event.respondWith(cacheVideoStrategy(request));
  } else if (isApiRequest(request)) {
    event.respondWith(cacheApiStrategy(request));
  } else {
    event.respondWith(cacheStaticStrategy(request));
  }
});

/**
 * Cache-first strategy for images (good for all networks)
 */
async function cacheImageStrategy(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(CACHE_NAMES.images);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.warn("Image fetch failed:", error);
    // Return a placeholder or offline response
    return new Response("Image not available offline", { status: 503 });
  }
}

/**
 * Cache-first strategy for videos (cache them aggressively)
 */
async function cacheVideoStrategy(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(CACHE_NAMES.videos);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.warn("Video fetch failed:", error);
    return (
      caches.match(request) ||
      new Response("Video not available", { status: 503 })
    );
  }
}

/**
 * Network-first strategy for API calls (with cache fallback)
 */
async function cacheApiStrategy(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(CACHE_NAMES.api);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    return new Response(JSON.stringify({ error: "Offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * Cache-first strategy for static assets
 */
async function cacheStaticStrategy(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(CACHE_NAMES.static);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.warn("Static asset fetch failed:", error);
    return new Response("Asset not available offline", { status: 503 });
  }
}

/**
 * Helper functions to identify request types
 */
function isImageRequest(request) {
  return (
    request.destination === "image" ||
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(request.url)
  );
}

function isVideoRequest(request) {
  return (
    request.destination === "video" ||
    /\.(mp4|webm|ogg|mov)$/i.test(request.url)
  );
}

function isApiRequest(request) {
  return (
    request.destination === "empty" &&
    (request.url.includes("/api/") || request.url.includes(".json"))
  );
}
