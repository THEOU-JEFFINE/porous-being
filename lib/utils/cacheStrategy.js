// src/utils/cacheStrategy.js
// Smart caching strategies based on network type

/**
 * Cache duration recommendations based on network type
 */
const CACHE_DURATIONS = {
  "2g": {
    images: 7 * 24 * 60 * 60 * 1000, // 7 days
    videos: 30 * 24 * 60 * 60 * 1000, // 30 days
    api: 60 * 60 * 1000, // 1 hour
  },
  "3g": {
    images: 3 * 24 * 60 * 60 * 1000, // 3 days
    videos: 7 * 24 * 60 * 60 * 1000, // 7 days
    api: 30 * 60 * 1000, // 30 minutes
  },
  "4g": {
    images: 24 * 60 * 60 * 1000, // 1 day
    videos: 3 * 24 * 60 * 60 * 1000, // 3 days
    api: 10 * 60 * 1000, // 10 minutes
  },
};

/**
 * Prefetch strategy recommendations
 */
const PREFETCH_STRATEGY = {
  "2g": {
    enabled: false, // Don't prefetch on 2G
    maxPrefetch: 0,
  },
  "3g": {
    enabled: false, // Minimal prefetch on 3G
    maxPrefetch: 1, // Only prefetch the next image
  },
  "4g": {
    enabled: true, // Aggressive prefetch on 4G
    maxPrefetch: 5, // Prefetch 5 images ahead
  },
};

/**
 * Get cache duration for a specific asset type and network
 */
export function getCacheDuration(type, effectiveType = "4g") {
  const durations = CACHE_DURATIONS[effectiveType] || CACHE_DURATIONS["4g"];
  return durations[type] || durations.images;
}

/**
 * Determine if we should prefetch assets
 */
export function shouldPrefetch(effectiveType) {
  const strategy = PREFETCH_STRATEGY[effectiveType] || PREFETCH_STRATEGY["4g"];
  return strategy.enabled;
}

/**
 * Get number of items to prefetch
 */
export function getPrefetchCount(effectiveType) {
  const strategy = PREFETCH_STRATEGY[effectiveType] || PREFETCH_STRATEGY["4g"];
  return strategy.maxPrefetch;
}

/**
 * Simple IndexedDB cache implementation for storing downloaded assets
 */
export class AssetCache {
  constructor(dbName = "porous-asset-cache", version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  /**
   * Initialize the cache database
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores for different asset types
        if (!db.objectStoreNames.contains("images")) {
          const imageStore = db.createObjectStore("images", { keyPath: "url" });
          imageStore.createIndex("timestamp", "timestamp", { unique: false });
        }

        if (!db.objectStoreNames.contains("videos")) {
          const videoStore = db.createObjectStore("videos", { keyPath: "url" });
          videoStore.createIndex("timestamp", "timestamp", { unique: false });
        }

        if (!db.objectStoreNames.contains("metadata")) {
          db.createObjectStore("metadata", { keyPath: "key" });
        }
      };
    });
  }

  /**
   * Get an asset from cache
   */
  async get(url, type = "images") {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([type], "readonly");
      const store = transaction.objectStore(type);
      const request = store.get(url);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;

        // Check if cache entry exists and hasn't expired
        if (result && result.expiresAt > Date.now()) {
          resolve(result.blob);
        } else {
          // Cache expired or doesn't exist
          resolve(null);
        }
      };
    });
  }

  /**
   * Set an asset in cache
   */
  async set(url, blob, type = "images", duration = 24 * 60 * 60 * 1000) {
    if (!this.db) await this.init();

    const cacheEntry = {
      url,
      blob,
      timestamp: Date.now(),
      expiresAt: Date.now() + duration,
      size: blob.size,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([type], "readwrite");
      const store = transaction.objectStore(type);
      const request = store.put(cacheEntry);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(cacheEntry);
    });
  }

  /**
   * Clear old/expired cache entries
   */
  async clearExpired(type = "images") {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([type], "readwrite");
      const store = transaction.objectStore(type);
      const index = store.index("timestamp");

      // Get all entries older than 7 days
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const range = IDBKeyRange.upperBound(sevenDaysAgo);
      const request = index.openCursor(range);

      request.onerror = () => reject(request.error);
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };
    });
  }

  /**
   * Get cache statistics
   */
  async getStats(type = "images") {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([type], "readonly");
      const store = transaction.objectStore(type);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const entries = request.result;
        const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0);

        resolve({
          count: entries.length,
          totalSize,
          totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
          entries,
        });
      };
    });
  }
}

/**
 * Prefetch an image URL
 */
export function prefetchImage(url) {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  link.as = "image";
  document.head.appendChild(link);
}

/**
 * Prefetch multiple images
 */
export function prefetchImages(urls, maxCount = 5) {
  urls.slice(0, maxCount).forEach((url) => {
    prefetchImage(url);
  });
}
