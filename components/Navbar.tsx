'use client';

import React, { useState, useEffect } from "react";
import { motion, easeOut, easeIn } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

const Navbar = React.memo(() => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "PROJECT", href: "/" },
    { name: "NEWS", href: "/news" },
    { name: "TEAM", href: "/team" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  // Framer Motion variants
  const headerVariants = {
    hidden: { y: -100, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2, ease: easeOut },
    },
    hover: {
      scale: 1.15,
      transition: { duration: 0.5, ease: easeIn },
    },
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.5 + i * 0.1,
        ease: easeOut,
      },
    }),
  };

  // Check if current path matches the link
  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur"
      style={{
        contain: "layout style paint",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="flex items-center justify-between px-2 py-2 sm:px-3 md:px-5 lg:px-6 lg:py-2 relative">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mr-2 sm:mr-4">
          <Link href="/">
            <img
              src="/assets/Porous_Logo.png"
              alt="Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links - hidden on mobile */}
        <motion.nav
          className="hidden md:flex gap-3 sm:gap-5 lg:gap-8 ml-auto lg:ml-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              custom={index}
              variants={linkVariants}
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={link.href}
                className={`text-xs sm:text-xs md:text-sm transition-colors block px-0.5 sm:px-1.5 py-0 ${
                  isActive(link.href)
                    ? "font-medium text-black border-b border-black"
                    : "font-light text-gray-600 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Mobile Hamburger Menu - visible only on mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto flex flex-col gap-1 p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="flex flex-col px-2 py-1 space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs transition-colors block px-3 py-1 ${
                    isActive(link.href)
                      ? "font-medium text-black bg-gray-100 border-l-4 border-black"
                      : "font-light text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
