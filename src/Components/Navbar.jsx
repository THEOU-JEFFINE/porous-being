import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "../assets/Porous_Logo.png";

const Navbar = React.memo(() => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "PROJECT", to: "/" },
    { name: "NEWS", to: "/news" },
    { name: "TEAM", to: "/team" },
    { name: "ABOUT", to: "/about" },
    { name: "CONTACT", to: "/contact" },
  ];

  // Framer Motion variants
  const headerVariants = {
    hidden: { y: -100, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
    },
    hover: {
      scale: 1.15,
      transition: { duration: 0.5, ease: "easeIn" },
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
        ease: "easeOut",
      },
    }),
  };

  // Check if current path matches the link
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur shadow-sm"
      style={{
        contain: "layout style paint",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="flex items-center justify-between px-3 py-3 sm:px-4 md:px-6 lg:px-8 lg:py-4 relative">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mr-2 sm:mr-4">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links - hidden on mobile */}
        <motion.nav
          className="hidden md:flex gap-2.5 sm:gap-4 lg:gap-6 ml-auto lg:ml-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
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
                to={link.to}
                className={`text-xs sm:text-sm md:text-base transition-colors block px-1.5 sm:px-2.5 py-1.5 sm:py-2 rounded ${
                  isActive(link.to)
                    ? "font-medium text-black border-b-2 border-black pb-0.5"
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
          className="md:hidden ml-auto flex flex-col gap-1.5 p-2"
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
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="flex flex-col px-3 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm transition-colors block px-3 py-2.5 rounded ${
                    isActive(link.to)
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
