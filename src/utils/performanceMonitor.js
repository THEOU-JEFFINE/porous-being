// src/utils/performanceMonitor.js
/**
 * Real-time Performance Monitoring
 * Helps identify what's slowing down the website
 */

export const performanceMonitor = {
  startTime: performance.now(),
  metrics: {},

  // Mark specific operations
  mark(name) {
    performance.mark(name);
  },

  // Measure time between marks
  measure(name, startMark, endMark) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      this.metrics[name] = measure.duration;

      if (measure.duration > 1000) {
        console.warn(`⚠️ SLOW: ${name} took ${measure.duration.toFixed(2)}ms`);
      } else {
        console.log(`✅ ${name}: ${measure.duration.toFixed(2)}ms`);
      }
    } catch (e) {
      console.error(`Measurement error for ${name}:`, e);
    }
  },

  // Get current FPS
  monitorFPS() {
    let lastTime = Date.now();
    let frames = 0;
    let fps = 60;

    const checkFPS = () => {
      frames++;
      const currentTime = Date.now();

      if (currentTime - lastTime >= 1000) {
        fps = frames;
        console.log(`📊 FPS: ${fps} ${fps < 45 ? "⚠️ SLOW" : "✅ SMOOTH"}`);
        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(checkFPS);
    };

    requestAnimationFrame(checkFPS);
  },

  // Check memory usage
  checkMemory() {
    if (performance.memory) {
      const usedMemory = (performance.memory.usedJSHeapSize / 1048576).toFixed(
        2,
      );
      const totalMemory = (
        performance.memory.totalJSHeapSize / 1048576
      ).toFixed(2);
      const heapLimit = (performance.memory.jsHeapSizeLimit / 1048576).toFixed(
        2,
      );

      console.log(
        `💾 Memory: ${usedMemory}MB / ${totalMemory}MB (Limit: ${heapLimit}MB)`,
      );

      if (
        performance.memory.usedJSHeapSize >
        performance.memory.jsHeapSizeLimit * 0.8
      ) {
        console.warn("⚠️ WARNING: Memory usage is high!");
      }
    }
  },

  // Log Core Web Vitals
  logCoreWebVitals() {
    if ("web-vital" in window) {
      const vitals = window["web-vital"];
      console.log("📈 Core Web Vitals:", vitals);
    }
  },

  // Get all metrics
  getMetrics() {
    return {
      totalTime: performance.now() - this.startTime,
      metrics: this.metrics,
    };
  },

  // Initialize monitoring
  init(options = {}) {
    const { logFPS = false, logMemory = true, interval = 5000 } = options;

    // Initial memory check
    if (logMemory) {
      this.checkMemory();
      setInterval(() => this.checkMemory(), interval);
    }

    // FPS monitoring
    if (logFPS) {
      this.monitorFPS();
    }

    // Log metrics on page unload
    window.addEventListener("beforeunload", () => {
      if (import.meta.env.DEV) {
        console.table(this.metrics);
      }
    });

    console.log("✅ Performance Monitor Initialized");
  },
};

// Usage in components:
// import { performanceMonitor } from './utils/performanceMonitor';
// performanceMonitor.init({ logFPS: true });
// performanceMonitor.mark('image-load-start');
// // ... do something
// performanceMonitor.mark('image-load-end');
// performanceMonitor.measure('Image Load', 'image-load-start', 'image-load-end');
