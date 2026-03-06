// src/Components/HorizontalScrollGallery.jsx
"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, easeOut } from "framer-motion";
// Lazy load images with Intersection Observer
const LazyImage = React.memo(
  ({ src, alt, loading, fetchPriority, className }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const imgRef = useRef(null);

    useEffect(() => {
      if (loading === "eager") {
        setImageSrc(src);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        },
        { rootMargin: "50px" },
      );

      if (imgRef.current) observer.observe(imgRef.current);
      return () => observer.disconnect();
    }, [src, loading]);

    return (
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    );
  },
);

/**
 * HorizontalScrollGallery - Optimized for smooth scroll with Framer Motion
 */
const HorizontalScrollGallery = React.memo(
  ({
    items = [],
    height = "h-[60vh] sm:h-[70vh] md:h-[80vh]",
    className = "",
    intro = null,
    isActive = false,
  }) => {
    const scrollRef = useRef(null);
    const containerRef = useRef(null);
    const dragging = useRef({ down: false, startX: 0, scrollLeft: 0 });
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const rafId = useRef(null);
    const [_isLoaded, setIsLoaded] = useState(false);

    // Memoize gallery items
    const galleryItems = useMemo(
      () => (intro ? [intro, ...items] : items),
      [intro, items],
    );

    // Velocity tracking for smooth momentum
    const velocity = useRef(0);
    const lastX = useRef(0);
    const lastTime = useRef(0);

    // Ultra-smooth scroll animation with GPU acceleration
    const smoothScroll = useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;

      const ease = dragging.current.down ? 0.18 : 0.08; // Faster easing for responsiveness
      const diff = targetScroll.current - currentScroll.current;

      if (Math.abs(diff) < 1) {
        currentScroll.current = targetScroll.current;
        el.scrollLeft = Math.round(targetScroll.current);
        rafId.current = null;
        // Remove will-change when scroll completes
        if (el.style.willChange) el.style.willChange = "";
        return;
      }

      // Add GPU acceleration during scroll
      if (!el.style.willChange) el.style.willChange = "scroll-position";

      currentScroll.current += diff * ease;
      el.scrollLeft = Math.round(currentScroll.current);

      rafId.current = requestAnimationFrame(smoothScroll);
    }, []);

    const onPointerDown = useCallback((e) => {
      const el = scrollRef.current;
      if (!el) return;

      dragging.current = {
        down: true,
        startX: e.clientX,
        scrollLeft: el.scrollLeft,
      };

      currentScroll.current = el.scrollLeft;
      targetScroll.current = el.scrollLeft;

      lastX.current = e.clientX;
      lastTime.current = Date.now();
      velocity.current = 0;

      el.setPointerCapture?.(e.pointerId);
      e.stopPropagation();
    }, []);

    const onPointerMove = useCallback(
      (e) => {
        const el = scrollRef.current;
        if (!el || !dragging.current.down) return;

        const dx = e.clientX - dragging.current.startX;
        const newScrollLeft = dragging.current.scrollLeft - dx;
        const isMobileDevice = window.innerWidth <= 768;

        if (isMobileDevice) {
          el.scrollLeft = Math.max(
            0,
            Math.min(el.scrollWidth - el.clientWidth, newScrollLeft),
          );
          currentScroll.current = el.scrollLeft;
          targetScroll.current = el.scrollLeft;
        } else {
          targetScroll.current = Math.max(
            0,
            Math.min(el.scrollWidth - el.clientWidth, newScrollLeft),
          );

          if (!rafId.current) {
            rafId.current = requestAnimationFrame(smoothScroll);
          }
        }

        const now = Date.now();
        const dt = now - lastTime.current;
        if (dt > 0) {
          velocity.current = (lastX.current - e.clientX) / dt;
        }
        lastX.current = e.clientX;
        lastTime.current = now;
      },
      [smoothScroll],
    );

    const onPointerUp = useCallback(
      (e) => {
        const el = scrollRef.current;
        if (!el) return;

        dragging.current.down = false;
        el.releasePointerCapture?.(e.pointerId);

        const isMobileDevice = window.innerWidth <= 768;

        if (!isMobileDevice && Math.abs(velocity.current) > 0.1) {
          const momentum = velocity.current * 180; // Slightly reduced for smoothness
          const maxScroll = el.scrollWidth - el.clientWidth;
          targetScroll.current = Math.max(
            0,
            Math.min(maxScroll, currentScroll.current + momentum),
          );

          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = requestAnimationFrame(smoothScroll);
        }
      },
      [smoothScroll],
    );

    // Initialize scroll
    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      currentScroll.current = el.scrollLeft;
      targetScroll.current = el.scrollLeft;

      return () => {
        if (rafId.current) cancelAnimationFrame(rafId.current);
      };
    }, []);

    // Wheel scroll with smooth easing
    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      const handleWheel = (e) => {
        const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
        const isMobileDevice = window.innerWidth <= 768;

        if (hasHorizontalScroll && !isMobileDevice) {
          e.preventDefault();
          e.stopPropagation();

          const scrollSpeed = 0.5; // Smooth scroll speed
          const scrollAmount = e.deltaY * scrollSpeed;

          targetScroll.current = Math.max(
            0,
            Math.min(
              el.scrollWidth - el.clientWidth,
              targetScroll.current + scrollAmount,
            ),
          );

          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = requestAnimationFrame(smoothScroll);
        }
      };

      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        el.removeEventListener("wheel", handleWheel);
      };
    }, [smoothScroll]);

    // Initialize
    useEffect(() => {
      setIsLoaded(true);
    }, []);

    return (
      <div
        ref={containerRef}
        className={`relative ${height} w-full overflow-hidden ${className}`}
      >
        <motion.div
          ref={scrollRef}
          className={`hide-scrollbar h-full w-full overflow-y-hidden ${
            isActive
              ? "overflow-x-auto cursor-grab active:cursor-grabbing"
              : "overflow-x-hidden"
          }`}
          style={{ scrollBehavior: "auto" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: easeOut }}
        >
          <div
            className={`flex h-full items-stretch ${
              isActive ? "gap-2" : "gap-0"
            }`}
            style={{ width: "auto" }}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                className="gallery-item flex-none h-full m-0 p-0"
                style={{ width: "auto" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {item.type === "intro" ? (
                  <div className="flex h-full w-[85vw] sm:w-[350px] md:w-[400px] lg:w-full flex-col items-center justify-between py-8 sm:py-12 px-4 sm:px-6 bg-white text-neutral-800 text-[0.95rem]">
                    {item.logo && (
                      <motion.img
                        src={item.logo}
                        alt="Logo"
                        className="w-20 h-20 mt-2 object-contain flex-shrink-0"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}

                    <div className="flex flex-col items-end gap-4 w-full">
                      <h1 className="text-lg md:text-[1.3rem] font-normal text-end tracking-tight leading-tight max-w-[220px] md:max-w-[300px]">
                        {item.title}
                      </h1>
                      <div className="text-sm md:text-base text-gray-400 text-end tracking-wide uppercase leading-tight">
                        {item.location}
                      </div>
                      <div className="text-sm md:text-base text-gray-400 text-end tracking-wide leading-tight">
                        {item.year}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-8 w-full pr-2">
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wide">
                          TYPOLOGY
                        </div>
                        <div className="text-xs md:text-sm font-normal text-right">
                          {item.typology}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wide">
                          STATUS
                        </div>
                        <div className="text-xs md:text-sm font-normal text-right">
                          {item.status}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0" />
                  </div>
                ) : item.type === "image" ? (
                  <figure className="relative h-full w-[90vw] sm:w-[75vw] md:w-auto overflow-hidden">
                    <LazyImage
                      src={item.src}
                      alt={item.alt || `Image ${index + 1}`}
                      className="h-full w-full sm:w-auto object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : undefined}
                    />
                  </figure>
                ) : item.type === "text" ? (
                  <div className="flex h-full w-full items-center justify-center bg-white text-neutral-800">
                    <div className="w-full h-full flex flex-col items-center justify-center px-4">
                      {item.title && (
                        <h3 className="text-lg md:text-xl font-light tracking-tight text-center mb-2">
                          {item.title}
                        </h3>
                      )}
                      {item.content && (
                        <div className="text-xs md:text-sm font-light leading-relaxed text-center">
                          {item.content.split("\n\n").map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  },
);

HorizontalScrollGallery.displayName = "HorizontalScrollGallery";

export default HorizontalScrollGallery;
