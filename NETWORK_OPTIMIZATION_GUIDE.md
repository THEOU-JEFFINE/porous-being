# Complete Network-Aware Optimization Guide

## Overview
This document outlines the complete optimization system implemented for handling slow networks with adaptive quality loading for video and images.

## Architecture Components

### 1. Network Detection Hook (`src/hooks/useNetworkInfo.js`)
Detects network speed and capacity using the Network Information API.

**Exported Functions:**
- `useNetworkInfo()` - React hook returning network detection object
- `getImageQuality(networkInfo)` - Returns 'low', 'medium', or 'high' quality tier
- `getVideoQuality(networkInfo)` - Returns 'mobile', 'medium', or 'high' quality tier

**Network Tiers:**
| Network Type | Image Quality | Video Bitrate | Use Case |
|---|---|---|---|
| 2G/3G/Slow | low (480x320) | mobile (350kbps) | Minimal bandwidth |
| LTE/Medium | medium (800x600) | medium (1200kbps) | Decent speed |
| 4G+/Fast | high (1200x900+) | high (3500kbps) | Full bandwidth |

### 2. Adaptive Video Component (`src/Components/AdaptiveVideo.jsx`)
Intelligently loads video formats based on network speed.

**Features:**
- Automatic format selection (WebM for slow networks, MP4 for fast)
- Loading state with spinner
- Error fallback
- Network indicator in development mode

**Usage:**
```jsx
import { AdaptiveVideo } from './Components/AdaptiveVideo';

<AdaptiveVideo 
  videoSrc="/videos/animation.mp4"
  poster="/posters/animation.jpg"
  className="w-full h-full"
  autoPlay={true}
  muted={true}
/>
```

### 3. Adaptive Image Component (`src/Components/AdaptiveImage.jsx`)
Serves different image resolutions based on network and device size.

**Features:**
- Network-aware quality selection
- Lazy loading with intersection observer
- Quality tier selection (low/medium/high)
- Fallback for missing variants

**Usage:**
```jsx
import { AdaptiveImage } from './Components/AdaptiveImage';

<AdaptiveImage 
  src="/images/project-high.jpg"
  lowQualitySrc="/images/project-low.jpg"
  mediumQualitySrc="/images/project-medium.jpg"
  alt="Project image"
  className="w-full h-auto"
/>
```

### 4. Video Compression Utilities (`src/utils/videoCompressionHelper.js`)
Provides compression profiles and FFmpeg command references.

**Compression Profiles:**
- **Mobile** (2G/3G): 350kbps, 430x240, ~260KB
- **Medium** (LTE): 1200kbps, 960x540, ~900KB (WebM recommended)
- **High** (4G+): 3500kbps, 1920x1080, ~2.3MB

**FFmpeg Commands for Creating Compressed Versions:**

Create mobile MP4 version (350kbps):
```bash
ffmpeg -i input.mp4 -b:v 350k -b:a 64k -vf "scale=430:240" output-low.mp4
```

Create medium WebM version (1200kbps, VP9):
```bash
ffmpeg -i input.mp4 -b:v 1200k -b:a 128k -c:v libvpx-vp9 -c:a libopus \
  -vf "scale=960:540" -crf 40 output.webm
```

Create mobile WebM version (500kbps):
```bash
ffmpeg -i input.mp4 -b:v 500k -b:a 64k -c:v libvpx-vp9 -c:a libopus \
  -vf "scale=430:240" -crf 45 output-low.webm
```

Create poster image (1920x1080):
```bash
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 -vf "scale=1920:1080" poster.jpg
```

### 5. Caching Strategy (`src/utils/cacheStrategy.js`)
Implements smart caching strategies based on network type.

**Cache Durations:**
- **2G**: Images (7 days), Videos (30 days), API (1 hour)
- **3G**: Images (3 days), Videos (7 days), API (30 min)
- **4G**: Images (1 day), Videos (3 days), API (10 min)

**AssetCache Class:**
```javascript
import { AssetCache } from './utils/cacheStrategy';

const cache = new AssetCache();
await cache.init();

// Get from cache
const cachedBlob = await cache.get(url, 'images');

// Set in cache
await cache.set(url, blob, 'images', duration);

// Clear expired entries
await cache.clearExpired('images');

// Get cache stats
const stats = await cache.getStats('images');
```

### 6. Service Worker (`public/service-worker.js`)
Intelligent caching for offline support and bandwidth optimization.

**Caching Strategies:**
- **Images**: Cache-first (aggressive caching)
- **Videos**: Cache-first with headers preservation
- **API**: Network-first with cache fallback
- **Static**: Cache-first

**Installation:**
Already registered in `App.jsx` via `useServiceWorker()` hook.

### 7. Service Worker Hook (`src/hooks/useServiceWorker.js`)
Registers and manages service worker lifecycle.

**Features:**
- Automatic registration
- Update detection
- Development mode logging
- Enable/disable via localStorage

### 8. Lazy Image Hook (`src/hooks/useLazyImage.js`)
Intersection observer-based lazy loading for images.

**Usage:**
```jsx
const { imageSrc, isLoading, imgRef } = useLazyImage(src);

<img 
  ref={imgRef} 
  src={imageSrc} 
  loading="lazy"
/>
```

## Build Optimization

### Vite Configuration (`vite.config.js`)
- **Gzip Compression**: All assets > 10KB automatically gzipped (.gz files)
- **Brotli Compression**: Better compression ratio for modern browsers (.br files)
- **Terser Minification**: Removes console logs and debug code
- **Code Splitting**: Separate chunks for framer-motion, gsap, vendors
- **CSS Code Splitting**: Separate CSS files per component

### Compression Plugin Configuration:
```javascript
compression({
  algorithm: "gzip",      // or "brotli"
  threshold: 10240,       // Only compress files > 10KB
  ext: ".gz",             // or ".br" for brotli
})
```

## Implementation Checklist

### ✅ Completed
- [x] Network detection hook created
- [x] Image quality functions implemented
- [x] Video quality functions implemented
- [x] Service Worker setup with caching strategies
- [x] Vite compression configuration
- [x] Landing component updated with AdaptiveVideo
- [x] Service worker registration in App component
- [x] Caching strategy utility created
- [x] Video compression helper with FFmpeg commands

### ⏳ In Progress / Pending
- [ ] Generate compressed video versions (see FFmpeg commands above)
- [ ] Update Projects page to use AdaptiveImage component
- [ ] Create fallback images for very slow networks
- [ ] Test on real slow networks (DevTools throttling)
- [ ] Monitor network info on production
- [ ] Implement user notification for cache updates
- [ ] Add analytics for network detection

### 🚀 Next Steps

#### Step 1: Generate Compressed Video Versions
Create three versions of your landing video using FFmpeg (install via `brew install ffmpeg`):

1. **Mobile version (260 KB):**
   ```bash
   ffmpeg -i src/assets/final-pb-animation.mp4 -b:v 350k -b:a 64k -vf "scale=430:240" public/videos/final-pb-animation-low.mp4
   ```

2. **Medium version (900 KB, WebM):**
   ```bash
   ffmpeg -i src/assets/final-pb-animation.mp4 -b:v 1200k -b:a 128k -c:v libvpx-vp9 -c:a libopus -vf "scale=960:540" -crf 40 public/videos/final-pb-animation.webm
   ```

3. **Mobile WebM version (400 KB):**
   ```bash
   ffmpeg -i src/assets/final-pb-animation.mp4 -b:v 500k -b:a 64k -c:v libvpx-vp9 -c:a libopus -vf "scale=430:240" -crf 45 public/videos/final-pb-animation-low.webm
   ```

4. **Update AdaptiveVideo component** to reference these files instead of loading from assets

#### Step 2: Update Projects Page for Adaptive Images
Modify `src/Pages/Projects.jsx` to use `AdaptiveImage` component:

```jsx
import { AdaptiveImage } from '../Components/AdaptiveImage';

// Instead of:
<img src={imagePath} alt={title} />

// Use:
<AdaptiveImage 
  src={imagePath}
  lowQualitySrc={imagePath.replace(/\.jpg$/, '-low.jpg')}
  mediumQualitySrc={imagePath.replace(/\.jpg$/, '-medium.jpg')}
  alt={title}
/>
```

#### Step 3: Create Image Variants
For each project image, create three variants:
- `image-low.jpg` (480x320)
- `image-medium.jpg` (800x600)
- `image-high.jpg` (1200x900+) - your current original

**Batch image processing:**
```bash
# Using ImageMagick (brew install imagemagick)
for image in src/assets/Images/**/*.jpg; do
  convert "$image" -resize 480x320 "${image%.jpg}-low.jpg"
  convert "$image" -resize 800x600 "${image%.jpg}-medium.jpg"
done
```

#### Step 4: Configure Vercel for Compression
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Encoding",
          "value": "gzip"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Step 5: Test on Slow Networks
1. Open Chrome DevTools → Network tab
2. Set throttle to "Slow 3G"
3. Reload page and observe network detection
4. Check that mobile video loads instead of high bitrate
5. Verify images load in lower resolution

## Monitoring and Debugging

### Enable Logging
Set in development mode to see network detection:
```javascript
localStorage.setItem('debug-network', 'true');
```

### Check Service Worker
```javascript
// In browser console
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Active Service Workers:', registrations);
});
```

### Monitor Cache Size
```javascript
import { AssetCache } from './utils/cacheStrategy';
const cache = new AssetCache();
const stats = await cache.getStats('images');
console.log('Cache stats:', stats);
```

## Performance Metrics

### Expected File Size Reductions
| Asset | Original | Low Quality | Reduction |
|---|---|---|---|
| Landing Video | 2.3 MB | 260 KB (MP4) / 400 KB (WebM) | ~82-83% |
| Project Image | 1-2 MB | 150-200 KB | ~75-85% |
| Full Page (3G) | ~15 MB | ~3 MB | ~80% |

### Expected Load Times
| Network | Original | Optimized | Improvement |
|---|---|---|---|
| 2G (0.4 Mbps) | ~300s | ~30s | 10x faster |
| 3G (1.6 Mbps) | ~75s | ~15s | 5x faster |
| LTE (10 Mbps) | ~12s | ~3s | 4x faster |
| 4G (30 Mbps) | ~4s | ~1s | 4x faster |

## Troubleshooting

### AdaptiveVideo not loading
1. Check that video files exist at referenced paths
2. Verify browser supports MP4/WebM codec
3. Check browser console for CORS errors
4. Confirm video MIME types are correct

### Service Worker not registering
1. Ensure `public/service-worker.js` exists
2. Check browser allows Service Worker registration
3. Only works on HTTPS in production
4. Use `localStorage.setItem('sw-enabled', 'false')` to debug

### Images not lazy loading
1. Verify images are below the fold initially
2. Check IntersectionObserver support (IE11+)
3. Ensure parent container has defined dimensions
4. Add `loading="lazy"` attribute as fallback

## Browser Support
- Network Information API: Chrome 61+, Edge 79+
- Service Worker: All modern browsers (IE 11 not supported)
- Intersection Observer: All modern browsers (IE 11 not supported)
- WebM/VP9: Chrome, Firefox, Edge (not Safari)
- Brotli Compression: Modern browsers and Vercel automatically decompresses
