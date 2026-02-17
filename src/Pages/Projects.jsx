// src/Pages/Projects.jsx
import { useEffect, useMemo, useState, useTransition } from "react";
import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import componentData from "../assets/Data/componentData.js";

// Lazy load the gallery component for code splitting
const HorizontalScrollGalleryExample = lazy(
  () => import("../Components/HorizontalScrollGalleryExample"),
);

// Loading fallback component with improved skeleton
function GalleryLoadingFallback() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 animate-pulse">
        <div className="max-w-full px-3 sm:px-6 lg:px-12 py-3 overflow-x-auto flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-gray-200 rounded-full flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="w-full py-8 px-3 sm:px-6 lg:px-12 animate-pulse">
        <div className="h-64 w-full bg-gray-100 rounded-lg mb-8" />
        <div className="space-y-4">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Multiple skeleton cards */}
      <div className="space-y-8 px-3 sm:px-6 lg:px-12 pb-16 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-96 bg-gray-100 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [isReady, setIsReady] = useState(false);
  const [, startTransition] = useTransition();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Preload critical images in background
  useEffect(() => {
    if (componentData && componentData.length > 0) {
      // Preload first project's first image
      const firstProject = componentData[0];
      if (firstProject?.images?.[0]) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = firstProject.images[0];
        document.head.appendChild(link);
      }
    }
  }, []);

  // Defer non-critical rendering to improve initial load
  useEffect(() => {
    startTransition(() => {
      setIsReady(true);
    });
  }, []);

  // Memoize structured data to prevent recalculation
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Projects — Porous Being | Architecture & Design",
      description: "Explore our portfolio of architectural and design projects",
      url:
        typeof window !== "undefined"
          ? window.location.origin + "/projects"
          : "",
      publisher: {
        "@type": "Organization",
        name: "Porous Being",
        url: typeof window !== "undefined" ? window.location.origin : "",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: (componentData || []).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            description: p.description || "",
            url:
              (typeof window !== "undefined" ? window.location.origin : "") +
              "/projects#" +
              (p.key || p.title?.toLowerCase().replace(/\s+/g, "-")),
            image: Array.isArray(p.images) ? p.images[0] : p.images,
          },
        })),
      },
    }),
    [],
  );

  // Memoize breadcrumb structured data
  const breadcrumbData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item:
            typeof window !== "undefined" ? window.location.origin + "/" : "",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item:
            typeof window !== "undefined"
              ? window.location.origin + "/projects"
              : "",
        },
      ],
    }),
    [],
  );

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <meta
          name="title"
          content="Projects — Porous Being | Architecture & Design Portfolio"
        />
        <meta
          name="description"
          content="Discover our award-winning architectural and design projects. From sustainable residential developments to innovative infrastructure solutions."
        />
        <meta
          name="keywords"
          content="architecture, design, projects, portfolio, residential, commercial, sustainable design"
        />
        <meta name="author" content="Porous Being" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="/projects" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Projects — Porous Being | Architecture & Design"
        />
        <meta
          property="og:description"
          content="Explore our portfolio of architectural and design projects."
        />
        <meta property="og:url" content="/projects" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Projects — Porous Being | Architecture & Design"
        />
        <meta
          name="twitter:description"
          content="Explore our portfolio of architectural and design projects."
        />

        {/* Preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <main className="w-full">
        {/* Hidden H1 for SEO and accessibility */}
        <h1 className="sr-only">Projects — Porous Being Architecture</h1>

        {/* Lazy-loaded gallery with fallback - deferred rendering with useTransition */}
        <Suspense fallback={<GalleryLoadingFallback />}>
          {isReady ? <HorizontalScrollGalleryExample /> : null}
        </Suspense>
      </main>
    </>
  );
}
