# Porous Being - Next.js Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Project Structure

```
porous-being/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page (/)
│   ├── providers.tsx            # React providers (HelmetProvider)
│   ├── home-wrapper.tsx         # Home page with Landing screen
│   ├── about/page.tsx          # About page (/about)
│   ├── news/page.tsx           # News page (/news)
│   ├── team/page.tsx           # Team page (/team)
│   └── contact/page.tsx        # Contact page (/contact)
│
├── components/                   # React components
│   ├── Navbar.tsx              # Navigation (updated for Next.js)
│   ├── Footer.tsx              # Footer component
│   ├── Landing.jsx             # Landing/splash screen
│   ├── Pages/                  # Page components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── News.jsx
│   │   ├── Projects.jsx
│   │   └── Team.jsx
│   ├── AdaptiveImage.jsx       # Network-aware image loader
│   ├── AdaptiveVideo.jsx       # Network-aware video loader
│   ├── HorizontalScrollGallery.jsx
│   └── ... other components
│
├── lib/                         # Utilities and hooks
│   ├── hooks/                  # React hooks
│   │   ├── useNetworkInfo.js
│   │   ├── useLazyImage.js
│   │   ├── useLenis.js
│   │   └── useServiceWorker.js
│   └── utils/                  # Utility functions
│       ├── cacheStrategy.js
│       ├── performanceMonitor.js
│       ├── scrollAnimations.js
│       └── videoCompressionHelper.js
│
├── public/                      # Static assets
│   ├── assets/                 # Image and video files
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── manifest.json           # PWA manifest
│   └── service-worker.js       # Service worker
│
├── styles/
│   └── globals.css             # Global Tailwind styles
│
├── app/layout.tsx              # Root layout
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build           # Build for production
npm start              # Start production server

# Other
npm run lint           # Run ESLint
npm run export         # Build and export static site (if needed)
```

## Routes

| Route | Component | File |
|-------|-----------|------|
| `/` | Home + Landing | `app/page.tsx` |
| `/news` | News & Events | `app/news/page.tsx` |
| `/about` | About/Philosophy | `app/about/page.tsx` |
| `/team` | Team Members | `app/team/page.tsx` |
| `/contact` | Contact Form | `app/contact/page.tsx` |

## Key Features Preserved

✅ **All original features maintained:**
- Landing animation with video
- Smooth scrolling (Lenis)
- GSAP animations
- Framer Motion transitions
- Responsive design with Tailwind
- Service worker for offline support
- Network-aware image/video loading
- SEO with structured data
- PWA capabilities

## Configuration

### Environment Variables
Create a `.env.local` file:
```bash
NEXT_PUBLIC_SITE_URL=https://porous-being.com
```

### Customization

**Change Port:**
```bash
npm run dev -- -p 3001
```

**Modify Metadata:**
Edit `app/layout.tsx` for global metadata or route-specific metadata in `app/[route]/page.tsx`

## Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Docker
```bash
# Build
docker build -t porous-being .

# Run
docker run -p 3000:3000 porous-being
```

### Option 3: Traditional Hosting
```bash
npm run build
npm start
```

Then deploy the entire folder to your Node.js hosting provider.

## Performance Tips

- Images are lazy-loaded by default
- Code splitting is automatic
- Use Next.js Image component for further optimization
- Service worker caches assets for faster load times
- Compression is handled by Next.js

## Troubleshooting

**Issue: Port 3000 already in use**
```bash
npm run dev -- -p 3001
```

**Issue: Build fails**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Issue: Styles not loading**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Run `npm run dev` again

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15.2+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [Lenis](https://lenis.darkroom.engineering/)

## Support

For detailed migration information, see [NEXTJS_MIGRATION.md](./NEXTJS_MIGRATION.md)

---

**Happy coding!** 🎨
