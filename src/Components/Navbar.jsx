import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Logo from "../assets/Porous_Logo.jpeg";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "PROJECT", to: "/" },
    { name: "NEWS", to: "/news" },
    { name: "TEAM", to: "/team" },
    { name: "ABOUT", to: "/about" },
    { name: "CONTACT", to: "/contact" },
  ];

  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const headerRef = useRef(null);

  // Check if current path matches the link
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slide down animation
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Logo pulse animation
      gsap.fromTo(logoRef.current,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
          onComplete: () => {
            // Continuous pulse effect
            gsap.to(logoRef.current, {
              scale: 1.05,
              duration: 0.8,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1
            });
          }
        }
      );

      // Nav links stagger animation
      gsap.from(navLinksRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      y: isEnter ? -3 : 0,
      scale: isEnter ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLogoHover = (isEnter) => {
    if (isEnter) {
      gsap.to(logoRef.current, {
        scale: 1.15,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true
      });
    } else {
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 md:px-6 lg:px-8 lg:py-3 relative">

        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
          >
            <img
              ref={logoRef}
              src={Logo}
              alt="Logo"
              className="w-12 h-12 md:w-14 md:h-14 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links - right aligned on mobile, center on desktop */}
        <nav className="flex gap-2 sm:gap-3 lg:gap-6 ml-auto lg:ml-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.to}
              ref={(el) => (navLinksRef.current[index] = el)}
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
              className={`text-[10px] sm:text-xs md:text-sm transition-colors ${
                isActive(link.to)
                  ? "font-medium text-black border-b-2 border-black pb-0.5"
                  : "font-light text-gray-500 hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
