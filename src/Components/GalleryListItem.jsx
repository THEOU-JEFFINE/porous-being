// src/Components/GalleryListItem.jsx

import React, { useMemo, useRef, forwardRef } from "react";

const GalleryListItem = forwardRef(
  ({ data, index, isActive, setActive, resetActive, scrollProgress }, ref) => {
    const sample = useMemo(
      () =>
        data ?? {
          title: "Default Project",
          location: "Unknown",
          year: "N/A",
          client: "N/A",
          typology: "N/A",
          size: "N/A",
          status: "N/A",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
          images: [
            {
              src: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=2000&auto=format&fit=crop",
              alt: "Default Image",
              caption: "Default image caption.",
            },
          ],
          thumbnail:
            "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=1200&auto=format&fit=crop",
        },
      [data]
    );

    const inlineRef = useRef(null);

    // --- SLIDES LOGIC ---
    const slides = [];
    const descriptionParagraphs = sample.description
      .split("\n\n")
      .filter((p) => p.trim() !== "");
    const maxSlides = Math.max(
      sample.images.length,
      descriptionParagraphs.length
    );

    for (let i = 0; i < maxSlides; i++) {
      if (sample.images[i]) {
        slides.push({ type: "image", content: sample.images[i] });
      }
      if (descriptionParagraphs[i]) {
        slides.push({ type: "text", content: descriptionParagraphs[i] });
      }
    }
    const totalSlides = slides.length;

    // --- HORIZONTAL DRAG ---
    const dragging = useRef({ down: false, startX: 0, scrollLeft: 0 });

    const onInlinePointerDown = (e) => {
      if (!isActive) return;
      const el = inlineRef.current;
      if (!el) return;

      dragging.current = {
        down: true,
        startX: e.clientX,
        scrollLeft: el.scrollLeft,
      };

      el.setPointerCapture?.(e.pointerId);
      e.stopPropagation();
    };

    const onInlinePointerMove = (e) => {
      if (!isActive) return;
      const el = inlineRef.current;
      if (!el || !dragging.current.down) return;

      const dx = e.clientX - dragging.current.startX;
      el.scrollLeft = dragging.current.scrollLeft - dx;
    };

    const onInlinePointerUp = (e) => {
      if (!isActive) return;
      const el = inlineRef.current;
      if (!el) return;

      dragging.current.down = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    // --- UI / ACTIVE PROPS ---
    const itemHeight = isActive ? "h-[70vh]" : "h-[35vh]";
    const itemWidth = "w-full";
    const marginClass = isActive ? "my-8 md:my-16" : "my-4";
    const inactiveTextWidth = "w-1/3";
    const inactiveImageWidth = "w-2/3";
    const dynamicScale = isActive
      ? Math.max(0.85, 1 - scrollProgress * 0.15)
      : 1;

    const activeWidthVW = 85;

    return (
      <div
        ref={ref}
        className={`relative flex flex-col justify-center ${itemHeight} ${itemWidth} ${marginClass}
          transition-all duration-500 ease-out
          ${isActive ? "fixed left-1/2 z-[20]" : ""}`}
          style={{
            transform: `scaleX(${dynamicScale})`,
            width: isActive ? `${activeWidthVW}vw` : undefined,
            marginLeft: isActive ? `-${activeWidthVW / 2}vw` : undefined,
          
            // 🔥 FIX TOP COLLISION WITH NAVBAR
            top: isActive ? "max(15vh, 120px)" : undefined,
          
            // 🔥 FIX BOTTOM COLLISION WITH NEXT PROJECT
            bottom: isActive ? "5vh" : undefined,
          
            paddingTop: isActive ? "20px" : undefined,
            paddingBottom: isActive ? "20px" : undefined,
          }}
          
      >
        <button
          aria-label={isActive ? `Collapse ${sample.title}` : `Expand ${sample.title}`}
          className={`relative block overflow-hidden bg-white w-full h-full
            transition-all duration-500 ease-out
            ${isActive ? "cursor-auto" : "cursor-pointer"}`}
          onClick={() => {
            if (!isActive) setActive();
          }}
        >
          {isActive ? (
            <div className="flex h-full w-full">
              {/* LEFT PANEL */}
              <aside className="w-1/4 p-8 flex flex-col justify-between text-neutral-800 bg-white">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight mb-2">
                    {sample.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{sample.location}</p>
                  <p className="text-xs text-neutral-400 mt-1">{sample.year}</p>

                  <div className="mt-12 text-xs tracking-wider space-y-2">
                    {sample.client && (
                      <p>
                        <span className="text-neutral-500">CLIENT</span>:{" "}
                        <span className="font-medium">{sample.client}</span>
                      </p>
                    )}
                    {sample.typology && (
                      <p>
                        <span className="text-neutral-500">TYPOLOGY</span>:{" "}
                        <span className="font-medium">{sample.typology}</span>
                      </p>
                    )}
                    {sample.size && (
                      <p>
                        <span className="text-neutral-500">SIZE</span>:{" "}
                        <span className="font-medium">{sample.size}</span>
                      </p>
                    )}
                    {sample.status && (
                      <p>
                        <span className="text-neutral-500">STATUS</span>:{" "}
                        <span className="font-medium">{sample.status}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 text-neutral-500 text-sm">
                  <span>SHARE:</span>
                  <span className="hover:text-neutral-900 transition">FB</span>
                  <span className="hover:text-neutral-900 transition">LI</span>
                  <span className="hover:text-neutral-900 transition">TW</span>
                </div>
              </aside>

              {/* RIGHT: HORIZONTAL SLIDES */}
              <div
                ref={inlineRef}
                className="hide-scrollbar h-full flex-grow snap-x snap-mandatory overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
                onPointerDown={onInlinePointerDown}
                onPointerMove={onInlinePointerMove}
                onPointerUp={onInlinePointerUp}
                onPointerCancel={onInlinePointerUp}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="flex h-full items-stretch"
                  style={{ width: `${totalSlides * 100}%` }}
                >
                  {slides.map((slide, i) => (
                    <div
                      key={i}
                      className="flex-none snap-start h-full"
                      style={{ width: `calc(100% / ${totalSlides})` }}
                    >
                      {slide.type === "image" ? (
                        <figure className="relative h-full w-full flex flex-col justify-end">
                          <img
                            src={slide.content.src}
                            alt={slide.content.alt}
                            className="size-full object-cover"
                            loading="lazy"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                          {slide.content.caption && (
                            <figcaption className="absolute bottom-0 left-0 p-4 text-white text-xs z-10">
                              {slide.content.caption}
                            </figcaption>
                          )}
                        </figure>
                      ) : (
                        <div className="flex h-full items-center justify-center p-12 bg-white text-neutral-800">
                          <p className="text-lg md:text-xl leading-relaxed font-light">
                            {slide.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // --- INACTIVE STATE ---
            <div className="flex h-full w-full justify-between items-stretch overflow-x-hidden">
              <div
                className={`${inactiveTextWidth} flex flex-col justify-center p-4 text-neutral-800`}
              >
                <div className="ml-auto flex flex-col items-end">
                  <div className="w-4 h-4 bg-black mb-2"></div>
                  <h3 className="text-base font-medium tracking-tighter text-right">
                    {sample.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 text-right">
                    {sample.location}
                  </p>
                </div>
              </div>

              <div className={`${inactiveImageWidth} h-full`}>
                <img
                  src={sample.thumbnail || sample.images[0]?.src}
                  alt={sample.title}
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* CLOSE BUTTON */}
          {isActive && (
            <button
              aria-label="Collapse"
              onClick={(e) => {
                e.stopPropagation();
                resetActive();
              }}
              className="absolute right-4 top-4 z-[1000] rounded-full bg-white/80 px-3 py-1 text-sm text-neutral-900 shadow-md hover:bg-white transition-colors"
            >
              ✕
            </button>
            
          
          )}
        </button>
        {isActive && <div className="h-[30vh] w-full"></div>}

      </div>
    );
  }
);

export default GalleryListItem;
