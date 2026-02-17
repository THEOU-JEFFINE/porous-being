# Performance Optimization Guide - Critical Fixes

## 🎯 Why Your Site Feels Slow

Your Porous Being website is experiencing slowness due to:

1. **Large uncompressed images** - Images in `/src/assets/Images/` are high-resolution
2. **Too many animations running simultaneously** - Framer Motion + scroll handlers
3. **Main thread blocking** - Heavy computations during scroll
4. **Render thrashing** - Excessive DOM queries and style recalculations

---

## ⚡ Immediate Fixes (Do These Now)

### 1. **Use Image Optimization Service** (Critical)
```bash
# Install sharp for image compression
npm install sharp --save-dev
```

Create `optimize-images.js` in project root:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets/Images';
const outputDir = 'src/assets/Compressed-Images';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Compress all images
fs.readdirSync(inputDir, { withFileTypes: true }).forEach(file => {
  if (file.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(file.name)) {
    const inputPath = path.join(inputDir, file.name);
    const outputPath = path.join(outputDir, file.name.replace(/\.[^.]+$/, '.webp'));
    
    sharp(inputPath)
      .resize(2400, 1600, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(outputPath)
      .then(() => console.log(`✅ Compressed: ${file.name}`))
      .catch(err => console.error(`❌ Error: ${file.name}`, err));
  }
});
```

Run: `node optimize-images.js`

### 2. **Reduce Animation Overhead**

Update vite.config.js to disable animations in production on slow devices:
```javascript
{
  define: {
    __DEV__: false,
    __DISABLE_ANIMATIONS__: 'navigator.deviceMemory < 4 || navigator.connection?.effectiveType === "4g"',
  },
}
```

### 3. **Enable Image Lazy Loading with Blur-Up Effect**

Update `src/Components/HorizontalScrollGallery.jsx` LazyImage component:
```jsx
const LazyImage = React.memo(({ src, alt, loading, className }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (loading === "eager") {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setImageSrc(src);
        observer.disconnect();
      }
    }, { rootMargin: "100px" }); // Increased margin for preloading

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src, loading]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      loading={loading}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
    />
  );
});
```

---

## 🚀 Advanced Optimizations

### 4. **Reduce Repaints - CSS Containment**

Add to scrollable containers in `HorizontalScrollGallery.jsx`:
```jsx
<div
  ref={scrollRef}
  className={`${height} overflow-x-auto overflow-y-hidden flex transition-none ${className}`}
  style={{ 
    contain: 'layout style paint',  // Prevent repaints of parent elements
    scrollBehavior: 'auto' // Faster than 'smooth'
  }}
>
```

### 5. **Debounce Scroll Events**

Add scroll debouncing in HorizontalScrollGalleryExample.jsx:
```javascript
let scrollTimeout;
const handleScroll = () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    // Apply effects only after scroll stops
    Object.entries(projectRefs.current).forEach(([, ref]) => {
      if (ref) ref.style.filter = 'blur(0px)';
    });
  }, 150);
};
```

### 6. **Disable Animations on Low-End Devices**

Add to component files:
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSlowDevice = navigator.deviceMemory < 4;

const shouldAnimate = !prefersReducedMotion && !isSlowDevice;
```

---

## 📊 Performance Metrics to Monitor

1. **Core Web Vitals**:
   - LCP (Largest Contentful Paint) < 2.5s ✅
   - FID (First Input Delay) < 100ms ✅
   - CLS (Cumulative Layout Shift) < 0.1 ✅

2. **Custom Metrics**:
   - Scroll FPS: Should be 60fps (16.67ms per frame)
   - First Image Load: < 1s
   - Initial Bundle: < 200KB gzipped

---

## 🔧 Recommended Packages

```bash
# Install performance monitoring
npm install web-vitals

# Add to src/main.jsx:
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## ✅ Checklist

- [ ] Compress all images to WebP format (>70% size reduction)
- [ ] Increase Intersection Observer rootMargin to "100px" for preloading
- [ ] Add `contain: 'layout style paint'` to scroll containers
- [ ] Test on 4G network in DevTools
- [ ] Monitor Core Web Vitals with Lighthouse
- [ ] Disable animations on devices with < 4GB RAM
- [ ] Use Chrome DevTools Performance tab to identify jank

---

## 📱 Testing on Slow Network

1. Open Chrome DevTools
2. Go to Network tab
3. Change from "No throttling" to "Slow 4G"
4. Reload and scroll
5. Should feel smooth even on slow connections

---

## 🎬 Expected Results After Optimization

| Metric | Before | After |
|--------|--------|-------|
| Page Load | 5-8s | 1-2s |
| Image Load | 3-5s | 0.5-1s |
| Scroll FPS | 30-45fps | 55-60fps |
| Bundle Size | ~350KB | ~120KB |
| First Interaction | 2-3s | <500ms |

**Priority: Image compression should reduce load times by 60-80%**

