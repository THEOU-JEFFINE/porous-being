import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "../assets/Porous_Logo.jpeg";

export default function Landing({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait a moment then fade out and call onComplete
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        }, 500);
      }
    });

    // Animate logo: rotate clockwise with scale and fade
    tl.fromTo(
      logoRef.current,
      {
        scale: 0.5,
        opacity: 0,
        rotation: 0
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 360,
        duration: 2,
        ease: "power2.inOut"
      }
    )
    // Hold for a moment
    .to(logoRef.current, {
      duration: 0.5
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
    >
      <img
        ref={logoRef}
        src={Logo}
        alt="Porous Being"
        className="w-64 h-64 md:w-96 md:h-96 object-contain"
      />
    </div>
  );
}
