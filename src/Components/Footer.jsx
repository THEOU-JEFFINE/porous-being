import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentItemsRef = useRef([]);

  useEffect(() => {
    // Ensure ScrollTrigger is properly initialized
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Check if elements exist before animating
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none",
            once: true, // Only animate once
          },
        });
      }

      // Stagger animate footer content items
      const validItems = contentItemsRef.current.filter(item => item !== null);
      if (validItems.length > 0) {
        gsap.from(validItems, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none",
            once: true, // Only animate once
          },
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addItemToRef = (el, index) => {
    if (el) {
      contentItemsRef.current[index] = el;
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-white border-t border-gray-200 py-12 sm:py-16 lg:py-20 mt-auto font-sans"
      style={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* About Section */}
          <div ref={(el) => addItemToRef(el, 0)} className="space-y-4">
            <h3 className="text-sm font-bold text-black tracking-wider">
              POROUS BEING
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Translating the philosophy of porosity into built environments
              that live, breathe, and evolve.
            </p>
            {/* QR Code / Brand Image */}
            <div className="w-16 h-16 bg-black flex items-center justify-center mt-4">
              <span className="text-white text-[8px] font-bold tracking-widest">
                POROUS
              </span>
            </div>
          </div>

          {/* Contact Section */}
          <div ref={(el) => addItemToRef(el, 1)} className="space-y-4">
            <h3 className="text-sm font-bold text-black tracking-wider">
              CONTACT
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <p>No. 2 Susila Nagar,</p>
              <p>behind NSN Matriculation School,</p>
              <p>Chromepet,</p>
              <p>Chennai-600044</p>
              <p className="mt-3">
                <a
                  href="mailto:info@porousbeing.com"
                  className="hover:text-black transition-colors"
                >
                  info@porousbeing.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div ref={(el) => addItemToRef(el, 2)} className="space-y-4">
            <h3 className="text-sm font-bold text-black tracking-wider">
              LINKS
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <a href="/" className="block hover:text-black transition-colors">
                Projects
              </a>
              <a
                href="/news"
                className="block hover:text-black transition-colors"
              >
                News
              </a>
              <a
                href="/about"
                className="block hover:text-black transition-colors"
              >
                About
              </a>
              <a
                href="/team"
                className="block hover:text-black transition-colors"
              >
                Team
              </a>
            </div>
          </div>

          {/* Social & Legal Section */}
          <div ref={(el) => addItemToRef(el, 3)} className="space-y-4">
            <h3 className="text-sm font-bold text-black tracking-wider">
              CONNECT
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <a
                href="https://www.instagram.com/porous_being?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
                className="block hover:text-black transition-colors"
              >
                Instagram ↗
              </a>
            </div>
            <div className="pt-4 space-y-2 text-xs text-gray-600">
              <a href="#" className="block hover:text-black transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="block hover:text-black transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Porous Being. All rights
              reserved.
            </p>
            <p>Designed with purpose, built with passion.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
