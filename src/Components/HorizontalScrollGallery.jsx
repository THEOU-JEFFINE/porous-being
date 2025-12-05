// src/Components/HorizontalScrollGallery.jsx
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

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
}) {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const dragging = useRef({ down: false, startX: 0, scrollLeft: 0 });
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafId = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Drag-to-scroll functionality with smooth momentum
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

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
      targetScroll.current = Math.max(0, Math.min(maxScroll, currentScroll.current + momentum));

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(smoothScroll);
    }
  };

  // Smooth scroll animation loop
  const smoothScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // Lerp (linear interpolation) for smooth scrolling
    const ease = 0.08;
    currentScroll.current += (targetScroll.current - currentScroll.current) * ease;

    // Apply scroll position
    el.scrollLeft = currentScroll.current;

    // Update progress
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, (currentScroll.current / maxScroll) * 100));
    }

    // Continue animation if not close enough to target
    if (Math.abs(targetScroll.current - currentScroll.current) > 0.5) {
      rafId.current = requestAnimationFrame(smoothScroll);
    }
  };

  // Mouse wheel to horizontal scroll - using native event for proper preventDefault
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Initialize scroll values
    currentScroll.current = el.scrollLeft;
    targetScroll.current = el.scrollLeft;

    const handleWheel = (e) => {
      // Prevent default vertical scroll
      e.preventDefault();
      e.stopPropagation();

      // Update target scroll position
      const maxScroll = el.scrollWidth - el.clientWidth;
      targetScroll.current = Math.max(0, Math.min(maxScroll, targetScroll.current + e.deltaY * 1.5));

      // Start smooth scroll animation
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(smoothScroll);
    };

    // Add with passive: false to allow preventDefault
    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Entry animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Set initial state
    gsap.set(el, { opacity: 0 });

    // Animate in
    const tl = gsap.timeline();
    tl.to(el, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => setIsLoaded(true)
    });

    // Animate individual items
    const items = el.querySelectorAll('.gallery-item');
    gsap.fromTo(items,
      {
        opacity: 0,
        x: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      }
    );

    return () => tl.kill();
  }, []);

  // If intro is provided, add it as the first item
  const galleryItems = intro ? [intro, ...items] : items;

  return (
    <div ref={containerRef} className={`relative ${height} w-full overflow-hidden ${className}`}>
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
          className="flex h-full items-stretch gap-0"
          style={{ width: "auto" }}
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="gallery-item flex-none h-full m-0 p-0"
              style={{ width: `auto` }}
            >
              {item.type === "intro" ? (
                <div className="flex h-full w-full flex-col items-center justify-between py-10 px-6 bg-white text-neutral-800 text-[0.95rem]">
                  {/* Top logo */}
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt="Logo"
                      className="w-20 h-20 mt-2 mb-8 object-contain"
                    />
                  )}
                  {/* Title, location, year */}
                  <div className="flex flex-col items-center mt-2">
                    <h1 className="text-[1.3rem] font-normal text-center mb-2 tracking-tight leading-tight">
                      {item.title}
                    </h1>
                    <div className="text-base text-gray-400 text-center tracking-wide uppercase leading-tight mb-1">
                      {item.location}
                    </div>
                    <div className="text-base text-gray-400 text-center tracking-wide leading-tight mb-6">
                      {item.year}
                    </div>
                  </div>
                  {/* Details */}
                  <div className="flex flex-col items-end gap-6 mt-8 w-full pr-2">
                    <div className="flex flex-col items-end">
                      <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                        TYPOLOGY
                      </div>
                      <div className="text-sm font-normal text-right">
                        {item.typology}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                        SIZE M2/FT2
                      </div>
                      <div className="text-sm font-normal text-right">
                        {item.size}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                        STATUS
                      </div>
                      <div className="text-sm font-normal text-right">
                        {item.status}
                      </div>
                    </div>
                  </div>
                  {/* Share icons */}
                  <div className="flex flex-col items-end w-full pr-2 mt-auto mb-2">
                    <span className="text-gray-400 text-xs mb-2 tracking-wide">
                      SHARE
                    </span>
                    <div className="flex gap-2 justify-end">
                      {item.shareIcons &&
                        item.shareIcons.map((icon, i) => (
                          <a
                            key={i}
                            href={icon.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-black text-white flex items-center justify-center"
                          >
                            {icon.icon}
                          </a>
                        ))}
                    </div>
                  </div>
                  {/* Top logo */}
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt="Logo"
                      className="w-16 h-16 mb-8 object-contain"
                    />
                  )}
                  {/* Title, location, year */}
                  <div className="flex flex-col items-center gap-2 mt-2">
                    <h1 className="text-3xl font-light text-center mb-2 tracking-tight">
                      {item.title}
                    </h1>
                    <div className="text-lg text-gray-400 text-center tracking-wide uppercase">
                      {item.location}
                    </div>
                    <div className="text-lg text-gray-400 text-center tracking-wide mt-1">
                      {item.year}
                    </div>
                  </div>
                  {/* Details */}
                  <div className="flex flex-col items-center gap-6 mt-12">
                    <div className="flex flex-col items-center">
                      <div className="text-gray-400 text-sm uppercase tracking-wide mb-1">
                        TYPOLOGY
                      </div>
                      <div className="text-base mb-2 font-normal">
                        {item.typology}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-gray-400 text-sm uppercase tracking-wide mb-1">
                        SIZE M2/FT2
                      </div>
                      <div className="text-base mb-2 font-normal">
                        {item.size}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-gray-400 text-sm uppercase tracking-wide mb-1">
                        STATUS
                      </div>
                      <div className="text-base mb-2 font-normal">
                        {item.status}
                      </div>
                    </div>
                  </div>
                  {/* Share icons */}
                  <div className="flex flex-col items-center gap-2 mt-auto mb-2">
                    <span className="text-gray-400 text-sm mb-2 tracking-wide">
                      SHARE
                    </span>
                    <div className="flex gap-2">
                      {item.shareIcons &&
                        item.shareIcons.map((icon, i) => (
                          <a
                            key={i}
                            href={icon.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-black text-white flex items-center justify-center"
                          >
                            {icon.icon}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              ) : item.type === "image" ? (
                // Image section with hover effect
                <figure className="relative h-full w-full overflow-hidden group/img">
                  <img
                    src={item.src}
                    alt={item.alt || `Image ${index + 1}`}
                    className="h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchpriority={index === 0 ? "high" : undefined}
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors duration-500" />
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

      {/* Scroll progress indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-60">
        <div className="w-20 h-[2px] bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-800 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">scroll</span>
      </div>
    </div>
  );
}
