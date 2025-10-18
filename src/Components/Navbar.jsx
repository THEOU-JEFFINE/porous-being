import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Porous_Logo.jpeg";

export default function Navbar() {
  const [showLogoDropdown, setShowLogoDropdown] = useState(false);
  const [showHamburgerDropdown, setShowHamburgerDropdown] = useState(false);

  const navLinks = [
    { name: "LANDSCAPE", href: "#" },
    { name: "ENGINEERING", href: "#" },
    { name: "ARCHITECTURE", href: "#" },
    { name: "PLANNING", href: "#" },
    { name: "PRODUCTS", href: "#" },
  ];

  const logoDropdownLinks = [
    { name: "PROJECT", to: "/" },
    { name: "ABOUT", to: "/about" },
    { name: "NEWS", to: "/news" },
    { name: "CONTACT", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur shadow-sm">
      <div className="flex items-center justify-between p-1 md:p-0.5 lg:p-2">

        {/* Logo */}
        <div className="relative flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain cursor-pointer"
            onClick={() => setShowLogoDropdown(!showLogoDropdown)}
          />

          {/* Logo Dropdown (mobile/tablet) */}
          {showLogoDropdown && (
            <div className="absolute top-full left-0 h-screen bg-white/90  p-4 flex flex-col gap-2 shadow-md z-50">

              {logoDropdownLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.to}  
                  className="text-sm font-light hover:text-blue-500"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Center Navigation Links (desktop only) */}
        <nav className="hidden lg:flex gap-4 lg:gap-6">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs md:text-xs font-light hover:text-blue-500"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side: Search & Hamburger */}
        <div className="relative flex items-center gap-3">

          {/* Desktop Search */}
          <div className="hidden lg:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-24 md:w-32 lg:w-40 pl-8 pr-2 py-1.5 rounded-lg bg-gray-100 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0a7 7 0 111.414-1.414A7 7 0 0116.65 16.65z"
              />
            </svg>
          </div>

          {/* Hamburger Menu (mobile/tablet) */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 z-50"
            onClick={() => setShowHamburgerDropdown(!showHamburgerDropdown)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  showHamburgerDropdown
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Hamburger Dropdown */}
          {showHamburgerDropdown && (
            <div className="absolute top-full right-0 mt-2 lg:hidden h-screen bg-white/90 rounded-lg p-4 flex flex-col gap-2 shadow-md z-50">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-light hover:text-blue-500"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
