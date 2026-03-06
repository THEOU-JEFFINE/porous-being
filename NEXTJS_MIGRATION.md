# Next.js Migration - Porous Being

## Migration Completed ✅

This project has been successfully migrated from **Vite + React Router** to **Next.js** with the App Router and zero visual changes.

### What Was Changed

#### Framework & Build Tools
- **Vite** → **Next.js 15.1.0** (App Router)
- **React Router DOM** → **Next.js routing** with dynamic routes
- Build system updated for Next.js

#### Project Structure
```
OLD (Vite)                    →  NEW (Next.js)
─── src/
    ├── Components/          →  components/
    ├── Pages/              →  app/[route]/page.tsx
    ├── hooks/              →  lib/hooks/
    ├── utils/              →  lib/utils/
    ├── assets/             →  public/assets/
    ├── App.jsx             
    ├── main.jsx            
    └── index.css           →  styles/globals.css

─── index.html              →  app/layout.tsx (with metadata)
─── vite.config.js          →  next.config.js
─── src/index.css           →  styles/globals.css
```

#### Key Changes

1. **Routing**
   - React Router removed
   - Next.js App Router implemented
   - Routes:
     - `/` → Home (with Landing screen)
     - `/news` → News page
     - `/about` → About page
     - `/team` → Team page
     - `/contact` → Contact page

2. **SEO & Metadata**
   - Next.js `Metadata` API replaces react-helmet-async for static metadata
   - Dynamic metadata on per-route basis
   - Schema.org structured data included
   - Manifest.json for PWA support

3. **Navigation**
   - `Link` component from react-router → Next.js `Link` from 'next/link'
   - Active route detection using `usePathname()` hook

4. **Styling**
   - Tailwind CSS maintained (Next.js native support)
   - PostCSS configuration updated
   - Global CSS in `styles/globals.css`

5. **Assets & Images**
   - Static assets moved to `public/assets/`
   - Next.js Image component can be used for optimization
   - Service worker support maintained

6. **Dependencies Updated**
   - ✅ Removed: `react-router-dom`, `vite`, `@vitejs/plugin-react`, `vite-plugin-compression`
   - ✅ Added: `next`, `eslint-config-next`
   - ✅ Kept: `framer-motion`, `gsap`, `lenis`, `react-helmet-async`, etc.

### Running the Project

**Development:**
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

**Production Build:**
```bash
npm run build
npm start
```

**Deployment:**
- Deploy to Vercel with zero configuration
- Or use standard Next.js hosting (any Node.js server)

### What Stayed the Same

✅ **UI/UX** - No visual changes whatsoever
✅ **Components** - All React components work as-is
✅ **Animations** - Framer Motion, GSAP, and Lenis animations intact
✅ **Styling** - Tailwind CSS CSS styling preserved
✅ **Images** - All assets in place
✅ **Functionality** - Service workers, lazy loading, network detection all work
✅ **Performance Features** - Code splitting, image optimization, compression

### Performance Improvements

Next.js provides additional benefits:
- ✅ Automatic code splitting
- ✅ Built-in image optimization (when using Next.js Image)
- ✅ API routes for backend (if needed)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Better SEO with Server-Side Rendering (SSR) capabilities
- ✅ Automatic compression and optimization

### File Key Changes

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with metadata and providers |
| `app/page.tsx` | Home page with landing screen |
| `app/[route]/page.tsx` | Route-specific pages |
| `app/providers.tsx` | React Helmet provider setup |
| `components/Navbar.tsx` | Updated with Next.js Link |
| `components/Footer.tsx` | No changes needed |
| `next.config.js` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS config |
| `styles/globals.css` | Global styles with Tailwind |
| `public/manifest.json` | PWA manifest file |

### Import Path Changes

All imports have been automatically updated:
- `../hooks/xxx` → `@/lib/hooks/xxx`
- `../utils/xxx` → `@/lib/utils/xxx`
- `../assets/xxx` → `@/public/assets/xxx`

### Next Steps (Optional)

- Consider using Next.js Image component for additional image optimization
- Setup Vercel deployment for CI/CD
- Add API routes if backend functionality is needed
- Consider migrating to TypeScript for better type safety

### Troubleshooting

**Port conflicts:** The dev server runs on port 3000 by default. Change with `npm run dev -- -p 3001`

**Build errors:** Clear `.next` folder and reinstall dependencies if issues occur:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Support

The migration maintains 100% feature parity with the original Vite version while providing better performance, SEO, and developer experience through Next.js features.
