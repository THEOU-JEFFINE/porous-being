import { useEffect } from "react";

let lenis;

export const useLenis = () => {
  useEffect(() => {
    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);
};
