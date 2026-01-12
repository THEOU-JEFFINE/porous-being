// src/Components/HorizontalScrollGallery.jsx
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalScrollGallery - A reusable component for displaying images and text sections
 * in a horizontally scrollable container with drag support.
 *
 * @param {Object} props
 * @param {Array} props.items - Array of items to display. Each item should have:
 *   - type: 'image' or 'text'
 *   - src: image URL (for image type)
 *   - alt: alt text (for image type)
 *   - title: heading text (for text type)
 *   - content: paragraph text (for text type)
 * @param {string} props.height - Height of the gallery (default: 'h-[80vh]')
 * @param {boolean} props.showCounter - Show slide counter (default: false)
 * @param {string} props.className - Additional CSS classes
 *
 * @example
 * const items = [
 *   { type: 'image', src: '/path/to/image1.jpg', alt: 'Image 1' },
 *   { type: 'text', title: 'About This Project', content: 'Lorem ipsum...' },
 *   { type: 'image', src: '/path/to/image2.jpg', alt: 'Image 2' },
 * ];
 * <HorizontalScrollGallery items={items} height="h-[70vh]" showCounter={true} />
 */
export default function HorizontalScrollGallery({
  items = [],
  height = "h-[80vh]",
  className = "",
  intro = null,
  isActive = false,
  isMobile = false,
}) {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const dragging = useRef({ down: false, startX: 0, scrollLeft: 0 });
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafId = useRef(null);
  const [_isLoaded, setIsLoaded] = useState(false);

  // Drag-to-scroll functionality with smooth momentum
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  // Optimized smooth scroll animation loop
  const smoothScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Faster lerp for snappier response
    const ease = 0.12;
    const diff = targetScroll.current - currentScroll.current;

    // Only update if there's a significant difference
    if (Math.abs(diff) < 0.5) {
      currentScroll.current = targetScroll.current;
      el.scrollLeft = targetScroll.current;
      return;
    }

    currentScroll.current += diff * ease;
    el.scrollLeft = currentScroll.current;

    // Continue animation
    rafId.current = requestAnimationFrame(smoothScroll);
  }, []);

  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;

    // Stop any ongoing smooth scroll
    if (rafId.current) cancelAnimationFrame(rafId.current);

    dragging.current = {
      down: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };

    // Sync target scroll with current position
    currentScroll.current = el.scrollLeft;
    targetScroll.current = el.scrollLeft;

    lastX.current = e.clientX;
    lastTime.current = Date.now();
    velocity.current = 0;

    el.setPointerCapture?.(e.pointerId);
    e.stopPropagation();
  };

  const onPointerMove = (e) => {
    const el = scrollRef.current;
    if (!el || !dragging.current.down) return;

    const dx = e.clientX - dragging.current.startX;
    const newScrollLeft = dragging.current.scrollLeft - dx;
    el.scrollLeft = newScrollLeft;

    // Calculate velocity for momentum
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (lastX.current - e.clientX) / dt;
    }
    lastX.current = e.clientX;
    lastTime.current = now;

    // Sync scroll refs
    currentScroll.current = newScrollLeft;
    targetScroll.current = newScrollLeft;
  };

  const onPointerUp = (e) => {
    const el = scrollRef.current;
    if (!el) return;

    dragging.current.down = false;
    el.releasePointerCapture?.(e.pointerId);

    // Apply momentum scrolling
    if (Math.abs(velocity.current) > 0.1) {
      const momentum = velocity.current * 300; // Momentum multiplier
      const maxScroll = el.scrollWidth - el.clientWidth;
      targetScroll.current = Math.max(
        0,
        Math.min(maxScroll, currentScroll.current + momentum)
      );

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(smoothScroll);
    }
  };

  // Initialize scroll values only
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    currentScroll.current = el.scrollLeft;
    targetScroll.current = el.scrollLeft;

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Enable horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Check if there's horizontal scroll space
      const hasHorizontalScroll = el.scrollWidth > el.clientWidth;

      if (hasHorizontalScroll) {
        // Prevent default vertical scroll
        e.preventDefault();
        e.stopPropagation();
        // Convert vertical scroll to horizontal
        el.scrollLeft += e.deltaY;

        // Update scroll refs
        currentScroll.current = el.scrollLeft;
        targetScroll.current = el.scrollLeft;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Initialize with full opacity - no fade animations
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Set full opacity immediately
    gsap.set(el, { opacity: 1 });

    const items = el.querySelectorAll(".gallery-item");
    gsap.set(items, { opacity: 1, scale: 1 });

    setIsLoaded(true);
  }, []);

  // Add smooth scroll-based scaling animation - DISABLED
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".gallery-item");
    if (!items.length) return;

    // Set all items to scale 1 (no scaling effect)
    gsap.set(items, { scale: 1 });

    // No scroll handler needed - scaling effect removed
  }, []);

  // If intro is provided, add it as the first item
  const galleryItems = intro ? [intro, ...items] : items;

  return (
    <div
      ref={containerRef}
      className={`relative ${height} w-full overflow-hidden ${className}`}
    >
      {/* Horizontally scrollable container */}
      <div
        ref={scrollRef}
        className="hide-scrollbar h-full w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className={`flex h-full items-stretch ${
            isActive ? "gap-2" : "gap-0"
          }`}
          style={{ width: "auto" }}
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="gallery-item flex-none h-full m-0 p-0"
              style={{ width: `auto` }}
            >
              {item.type === "intro" ? (
                <div className="flex h-full w-[85vw] sm:w-[350px] md:w-[400px] lg:w-full flex-col items-center justify-between py-8 sm:py-12 px-4 sm:px-6 bg-white text-neutral-800 text-[0.95rem]">
                  {/* Logo */}
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt="Logo"
                      className="w-20 h-20 mt-2 object-contain flex-shrink-0"
                    />
                  )}

                  {/* Title, location, year */}
                  <div className="flex flex-col items-end gap-6 w-full">
                    <h1 className="text-[1.3rem] font-normal text-end tracking-tight leading-tight max-w-[300px]">
                      {item.title}
                    </h1>
                    <div className="text-base text-gray-400 text-end tracking-wide uppercase leading-tight">
                      {item.location}
                    </div>
                    <div className="text-base text-gray-400 text-end tracking-wide leading-tight">
                      {item.year}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col items-end gap-8 w-full pr-2">
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-gray-400 text-xs uppercase tracking-wide">
                        TYPOLOGY
                      </div>
                      <div className="text-sm font-normal text-right">
                        {item.typology}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-gray-400 text-xs uppercase tracking-wide">
                        STATUS
                      </div>
                      <div className="text-sm font-normal text-right">
                        {item.status}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for bottom alignment */}
                  <div className="flex-shrink-0" />
                </div>
              ) : item.type === "image" ? (
                // Image section
                <figure className="relative h-full w-[85vw] sm:w-[70vw] md:w-auto overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt || `Image ${index + 1}`}
                    className="h-full w-full sm:w-auto object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchpriority={index === 0 ? "high" : undefined}
                  />
                </figure>
              ) : item.type === "text" ? (
                // Text section
                <div className="flex h-full w-full items-center justify-center bg-white text-neutral-800">
                  <div className="w-full h-full flex flex-col items-center justify-center px-4">
                    {item.title && (
                      <h3 className="text-xl font-light tracking-tight text-center mb-2">
                        {item.title}
                      </h3>
                    )}
                    {item.content && (
                      <div className="text-xs font-light leading-relaxed text-center">
                        {item.content.split("\n\n").map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
