import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ProjectGallery
 * - Renders a minimal thumbnail; clicking opens a fullscreen overlay with:
 * - horizontally scrollable, snap-aligned image gallery (drag/scroll/swipe)
 * - title + description column
 * - fade-in animation, close button, optional prev/next arrows
 * - Tailwind CSS required (already present in this repo)
 */
export default function ProjectGallery({ data, mode = "modal" }) {
  const sample = useMemo(
    () =>
      data ?? {
        title: "Bloomberg Center — Student Commons",
        description:
          "An elegant, light-filled commons that invites movement and gathering. The gallery below showcases programmatic spaces, material studies, and the building's relationship with landscape.",
        images: [
          // Using Unsplash CDN images as sample content
          "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=2000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=2000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2000&auto=format&fit=crop",
        ],
        thumbnail:
          "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=1200&auto=format&fit=crop",
      },
    [data]
  );

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // inline mode toggle
  const [index, setIndex] = useState(0);
  const galleryRef = useRef(null);
  const inlineRef = useRef(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // Scroll to current index when it changes (used in modal mode)
  useEffect(() => {
    if (!open) return;
    const el = galleryRef.current;
    if (!el) return;
    const child = el.children[index];
    if (child)
      child.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
  }, [index, open]);

  // Drag-to-scroll support for mouse users (modal mode)
  const dragging = useRef({ down: false, startX: 0, scrollLeft: 0 });
  const onPointerDown = (e) => {
    const el = galleryRef.current;
    if (!el) return;
    dragging.current = {
      down: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const el = galleryRef.current;
    if (!el) return;
    if (!dragging.current.down) return;
    const dx = e.clientX - dragging.current.startX;
    el.scrollLeft = dragging.current.scrollLeft - dx;
  };
  const onPointerUp = (e) => {
    const el = galleryRef.current;
    if (!el) return;
    dragging.current.down = false;
    el.releasePointerCapture?.(e.pointerId);
  };

  // Drag-to-scroll for inline expanded view
  const inlineDragging = useRef({ down: false, startX: 0, scrollLeft: 0 });
  const onInlinePointerDown = (e) => {
    const el = inlineRef.current;
    if (!el) return;
    inlineDragging.current = {
      down: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture?.(e.pointerId);
    // Prevent collapsing when starting drag inside expanded area
    e.stopPropagation();
  };
  const onInlinePointerMove = (e) => {
    const el = inlineRef.current;
    if (!el || !inlineDragging.current.down) return;
    const dx = e.clientX - inlineDragging.current.startX;
    el.scrollLeft = inlineDragging.current.scrollLeft - dx;
  };
  const onInlinePointerUp = (e) => {
    const el = inlineRef.current;
    if (!el) return;
    inlineDragging.current.down = false;
    el.releasePointerCapture?.(e.pointerId);
  };

  // Sync active index to nearest snap after scroll settles (modal mode)
  const scrollTimeout = useRef(null);
  const onScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const el = galleryRef.current;
      if (!el) return;
      const children = Array.from(el.children);
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const rectLeft = child.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(rectLeft - center);
        if (dist < minDist) {
          minDist = dist;
          nearest = i;
        }
      });
      setIndex(nearest);
    }, 120);
  };

  const next = () => setIndex((i) => Math.min(i + 1, sample.images.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="w-full">
      {/* Thumbnail / Inline Expand Card */}
      {mode === "inline" ? (
        <button
          aria-label={expanded ? "Collapse image" : "Expand image"}
          className={`group relative block overflow-hidden bg-white transition-all duration-500 ease-out ${
            expanded
              ? "h-[80vh] w-full"
              : "h-[30vh] md:h-[40vh] w-[92%] sm:w-[85%] md:w-[70%] lg:w-[55%]"
          } mx-auto`}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? (
            <div
              ref={inlineRef}
              // The width is calculated dynamically based on the number of images + 1 text panel
              className="hide-scrollbar h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
              onPointerDown={onInlinePointerDown}
              onPointerMove={onInlinePointerMove}
              onPointerUp={onInlinePointerUp}
              onPointerCancel={onInlinePointerUp}
              onClick={(e) => e.stopPropagation()}
            >
              {/* This inner div needs to be wide enough to contain all slides */}
              <div
                // The w-max ensures it takes up the required width for all slides
                className="flex h-full w-max items-stretch"
                style={{
                  width: `calc(100% * ${sample.images.length + 1})`,
                }}
              >
                {/* Image slides */}
                {sample.images.map((src, i) => (
                  <figure
                    key={i}
                    // Each slide (image and text) should take up 100% of the parent container's visible width
                    className="relative h-full w-[100vw] flex-none snap-start"
                    style={{ width: `calc(100% / ${sample.images.length + 1})` }} // Set width to 1/N+1 of total width
                  >
                    <img
                      src={src}
                      alt={`${sample.title} — image ${i + 1}`}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </figure>
                ))}

                {/* Right panel: Text (The last snap-aligned panel) */}
                <aside
                  className="h-full w-[100vw] flex-none snap-start bg-white p-6 text-neutral-800 md:p-10"
                  style={{ width: `calc(100% / ${sample.images.length + 1})` }} // Set width to 1/N+1 of total width
                >
                  <div className="mx-auto flex h-full max-w-prose flex-col justify-center gap-4">
                    <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                      {sample.title}
                    </h3>
                    <p className="text-sm leading-relaxed md:text-base">
                      {sample.description}
                    </p>
                    <p className="text-xs text-neutral-500 mt-auto">
                      Scroll horizontally to view all images and read the text. Click '✕' to collapse.
                    </p>
                  </div>
                </aside>
              </div>

              {/* Index chip (Simplified for inline mode) */}
              <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm dark:bg-white/20 dark:text-white">
                View Gallery
              </div>
            </div>
          ) : (
            <>
              <img
                src={sample.thumbnail || sample.images[0]}
                alt={sample.title}
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-white text-lg md:text-xl font-medium tracking-tight drop-shadow-sm">
                  {sample.title}
                </h3>
              </div>
            </>
          )}

          {/* Collapse button when expanded */}
          {expanded && (
            <button
              aria-label="Collapse"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              className="absolute right-3 top-3 z-20 bg-white/80 px-2 py-1 text-xs text-neutral-900 hover:bg-white"
            >
              ✕
            </button>
          )}
        </button>
      ) : (
        <button
          aria-label="Open project gallery"
          className="group relative block w-full overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-900"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        >
          <img
            src={sample.thumbnail || sample.images[0]}
            alt={sample.title}
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 className="text-white text-lg md:text-xl font-medium tracking-tight drop-shadow-sm">
              {sample.title}
            </h3>
          </div>
        </button>
      )}

      {/* Overlay modal (No change needed here) */}
      {mode === "modal" && open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex h-[100dvh] w-screen animate-fadeIn bg-white/95 text-neutral-900 backdrop-blur-sm dark:bg-black/90 dark:text-neutral-100"
        >
          {/* Close button */}
          <button
            aria-label="Close gallery"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-full border border-neutral-300/60 bg-white/80 px-3 py-1 text-sm backdrop-blur transition hover:bg-white dark:border-neutral-700/60 dark:bg-neutral-900/80 dark:hover:bg-neutral-900"
          >
            ✕ Close
          </button>

          {/* Content layout: gallery + text column */}
          <div className="flex h-full w-full flex-col lg:flex-row">
            {/* Gallery */}
            <div className="relative order-2 h-1/2 w-full shrink-0 overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60 lg:order-1 lg:h-full lg:w-[68%] lg:border-t-0 lg:border-r">
              {/* Arrows (desktop) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-2 lg:flex">
                <button
                  aria-label="Previous image"
                  onClick={prev}
                  disabled={index === 0}
                  className="pointer-events-auto rounded-full bg-white/70 p-2 text-neutral-900 shadow-sm ring-1 ring-black/10 transition hover:bg-white disabled:opacity-30 dark:bg-neutral-900/70 dark:text-white dark:ring-white/10 dark:hover:bg-neutral-900 dark:disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  aria-label="Next image"
                  onClick={next}
                  disabled={index === sample.images.length - 1}
                  className="pointer-events-auto rounded-full bg-white/70 p-2 text-neutral-900 shadow-sm ring-1 ring-black/10 transition hover:bg-white disabled:opacity-30 dark:bg-neutral-900/70 dark:text-white dark:ring-white/10 dark:hover:bg-neutral-900 dark:disabled:opacity-30"
                >
                  →
                </button>
              </div>

              <div
                ref={galleryRef}
                className="hide-scrollbar h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onScroll={onScroll}
              >
                <div className="flex h-full w-max items-stretch">
                  {sample.images.map((src, i) => (
                    <figure
                      key={i}
                      className="relative h-full w-[100vw] flex-none snap-start lg:w-[68vw]"
                    >
                      <img
                        src={src}
                        alt={`${sample.title} — image ${i + 1}`}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              </div>

              {/* Index chip */}
              <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm dark:bg-white/20 dark:text-white">
                {index + 1} / {sample.images.length}
              </div>
            </div>

            {/* Text column */}
            <aside className="order-1 flex h-1/2 w-full flex-col justify-between gap-6 p-5 lg:order-2 lg:h-full lg:w-[32%] lg:p-8">
              <div>
                <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                  {sample.title}
                </h2>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
                  {sample.description}
                </p>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Scroll horizontally • Drag with mouse • Swipe on touch
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* Inline styles for animation and aesthetics */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fadeIn { animation: fadeIn 220ms ease-out both; }
        /* Minimal scrollbar hiding for a cleaner BIG-like aesthetic */
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}