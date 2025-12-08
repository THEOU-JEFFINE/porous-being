import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import loadingVideo from "../assets/pa.mp4";

export default function Landing({ onComplete }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // When video ends, fade out and complete
    const handleVideoEnd = () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: onComplete,
      });
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      video.play().catch((err) => {
        console.log("Video autoplay failed:", err);
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
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src={loadingVideo}
        className="w-full h-full object-contain"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
