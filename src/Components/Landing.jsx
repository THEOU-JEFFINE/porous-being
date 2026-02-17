import React, { useEffect, useRef } from "react";
import {motion} from "framer-motion";
import loadingVideo from "../assets/final-pb-animation.mp4";

const Landing = React.memo(({ onComplete }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // When video ends, fade out and complete
    const handleVideoEnd = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.transition =
          "opacity 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)";
        setTimeout(onComplete, 600);
      }
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      video.play().catch(() => {
        // If autoplay fails, still proceed after a delay
        setTimeout(handleVideoEnd, 2000);
      });
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <video
        ref={videoRef}
        src={loadingVideo}
        className="w-auto h-auto max-w-[50%] max-h-[50%] object-contain"
        muted
        playsInline
        preload="auto"
      />
    </motion.div>
  );
});

Landing.displayName = "Landing";
export default Landing;
