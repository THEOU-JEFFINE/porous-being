// src/Components/AdaptiveVideo.jsx
"use client";
// Loads video in appropriate format/bitrate based on network

import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useNetworkInfo, getVideoQuality } from "@/lib/hooks/useNetworkInfo";

export const AdaptiveVideo = forwardRef(function AdaptiveVideo(
  {
    videoSrc,
    poster = null,
    className = "",
    autoPlay = false,
    muted = false,
    loop = false,
    controls = false,
    ...props
  },
  ref,
) {
  const videoRef = useRef(null);
  const [selectedFormat, setSelectedFormat] = useState("mp4");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const networkInfo = useNetworkInfo();

  useEffect(() => {
    // Determine best format based on network and browser support
    const video = document.createElement("video");

    // Prefer WebM on slow networks (smaller file size)
    // Fallback to MP4 for compatibility
    if (networkInfo.isSlow && video.canPlayType("video/webm;codecs=vp9")) {
      setSelectedFormat("webm");
    } else if (video.canPlayType("video/mp4")) {
      setSelectedFormat("mp4");
    }
  }, [networkInfo]);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Get appropriate video source based on network
  const getVideoSource = () => {
    // For now, just return the video src directly
    // The video path should be a complete valid path like /assets/final-pb-animation.mp4
    if (!videoSrc) return "";

    // If it's already a full path with extension, return it
    if (videoSrc.includes(".")) {
      return videoSrc;
    }

    // Otherwise try to add .mp4 extension
    return `${videoSrc}.mp4`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
          <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <p className="text-white text-sm">Video unavailable</p>
        </div>
      )}

      {/* Video element */}
      <video
        ref={(el) => {
          videoRef.current = el;
          if (ref) {
            if (typeof ref === "function") ref(el);
            else ref.current = el;
          }
        }}
        className={`w-full h-full ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        onCanPlay={handleCanPlay}
        onError={handleError}
        {...props}
      >
        <source src={getVideoSource()} type="video/mp4" />
        Your browser doesn't support HTML5 video.
      </video>
    </div>
  );
});
