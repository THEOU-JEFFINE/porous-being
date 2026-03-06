"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AdaptiveVideo } from "./AdaptiveVideo";
import { useNetworkInfo } from "@/lib/hooks/useNetworkInfo";

const Landing = React.memo(function Landing({ onComplete }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const networkInfo = useNetworkInfo();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // When video ends, fade out and complete
    const handleVideoEnd = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.transition =
          "opacity 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)";
        setTimeout(onComplete, 600);
      }
    };

    // Set timeout as fallback (important for very slow networks or playback issues)
    const timeoutId = setTimeout(handleVideoEnd, 5000);

    const handlePlay = () => {
      clearTimeout(timeoutId);
    };

    const handleEnded = () => {
      clearTimeout(timeoutId);
      handleVideoEnd();
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("ended", handleEnded);

    // Try to play video
    video.play().catch(() => {
      // If autoplay fails, still proceed after timeout
      console.log("Autoplay prevented, using fallback timeout");
    });

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  // Log network detection info (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Network detected:", {
        type: networkInfo.effectiveType,
        downlink: networkInfo.downlink,
        rtt: networkInfo.rtt,
        isSlow: networkInfo.isSlow,
        isVerySlow: networkInfo.isVerySlow,
      });
    }
  }, [networkInfo]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-auto h-auto max-w-[50%] max-h-[50%]">
          <AdaptiveVideo
            ref={videoRef}
            videoSrc="/assets/final-pb-animation.mp4"
            muted={true}
            playsInline={true}
            autoPlay={true}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
});

Landing.displayName = "Landing";
export default Landing;
