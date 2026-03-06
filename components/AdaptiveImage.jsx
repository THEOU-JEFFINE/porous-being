// src/Components/AdaptiveImage.jsx
"use client";
// Serves images in appropriate resolution based on network and viewport

import React, { useEffect, useRef, useState } from "react";
import { useNetworkInfo, getImageQuality } from "@/lib/hooks/useNetworkInfo";

export function AdaptiveImage({
  src,
  alt = "",
  lowQualitySrc = null,
  mediumQualitySrc = null,
  highQualitySrc = null,
  className = "",
  quality = null, // Override network-detected quality
  ...props
}) {
  const imgRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const networkInfo = useNetworkInfo();

  useEffect(() => {
    const detectedQuality = quality || getImageQuality(networkInfo);

    // Select image source based on quality tier
    let selectedSrc = src;
    switch (detectedQuality) {
      case "low":
        selectedSrc = lowQualitySrc || src;
        break;
      case "medium":
        selectedSrc = mediumQualitySrc || src;
        break;
      case "high":
      default:
        selectedSrc = highQualitySrc || src;
    }

    setImageSrc(selectedSrc);
  }, [
    networkInfo,
    src,
    lowQualitySrc,
    mediumQualitySrc,
    highQualitySrc,
    quality,
  ]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gray-400 flex items-center justify-center">
          <span className="text-gray-700 text-xs">Failed to load image</span>
        </div>
      )}

      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
}

// Responsive srcset helper for use with standard img tags
export function generateSrcSet(
  basename,
  extension = "jpg",
  sizes = { low: "480x320", medium: "800x600", high: "1200x900" },
) {
  return `
    ${basename}-${sizes.low}.${extension} 480w,
    ${basename}-${sizes.medium}.${extension} 800w,
    ${basename}-${sizes.high}.${extension} 1200w
  `.trim();
}
