'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface LandingProps {
  onComplete: () => void;
}

const Landing = React.memo(function Landing({ onComplete }: LandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTransition = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    
    console.log("[Landing] Transitioning to content");
    
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transition = "opacity 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)";
      setTimeout(onComplete, 600);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log("[Landing] Video element not found");
      return;
    }

    console.log("[Landing] Component mounted, setting up video");

    const handlePlay = () => {
      console.log("[Landing] Video playback started");
      setShowPlayButton(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleEnded = () => {
      console.log("[Landing] Video ended");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      handleTransition();
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      const error = target.error;
      console.error("[Landing] Video error:", error?.message || "Unknown error");
      
      // Show play button if autoplay fails
      setShowPlayButton(true);
      
      // Still transition after timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        console.log("[Landing] Error fallback timeout triggered");
        handleTransition();
      }, 8000);
    };

    const handleLoadedMetadata = () => {
      console.log("[Landing] Video metadata loaded", {
        duration: video.duration,
        readyState: video.readyState,
      });
      
      // Try to play after metadata loads
      const play = video.play();
      if (play !== undefined) {
        play
          .then(() => {
            console.log("[Landing] Autoplay successful");
            setShowPlayButton(false);
          })
          .catch((err) => {
            console.warn("[Landing] Autoplay prevented by browser:", err.name);
            setShowPlayButton(true);
            
            // Set fallback timeout
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              console.log("[Landing] Autoplay fallback timeout triggered");
              handleTransition();
            }, 10000);
          });
      }
    };

    const handleCanPlay = () => {
      console.log("[Landing] Video can play");
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);

    // Initial play attempt
    console.log("[Landing] Attempting initial autoplay");
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("[Landing] Initial autoplay successful");
        })
        .catch((err) => {
          console.warn("[Landing] Initial autoplay prevented:", err.name);
          setShowPlayButton(true);
        });
    }

    // Set absolute fallback timeout
    timeoutRef.current = setTimeout(() => {
      if (!completedRef.current) {
        console.log("[Landing] Absolute timeout triggered");
        handleTransition();
      }
    }, 12000);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full h-full flex items-center justify-center p-4 bg-white relative">
        <div className="w-full h-full max-w-4xl flex items-center justify-center relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full max-h-screen object-contain"
            controlsList="nodownload"
            style={{ display: 'block' }}
          >
            <source src="/assets/final-pb-animation.mp4" type="video/mp4" />
            Your browser doesn't support HTML5 video.
          </video>
          
          {showPlayButton && (
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch(err => 
                    console.error("[Landing] Manual play failed:", err)
                  );
                }
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors rounded group"
              aria-label="Play video"
            >
              <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors">
                <svg
                  className="w-10 h-10 text-black ml-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
});

Landing.displayName = "Landing";
export default Landing;
