import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Porous_Logo.jpeg";

export default function Navbar() {
  const navLinks = [
    { name: "PROJECT", to: "/" },
    { name: "NEWS", to: "/news" },
    { name: "TEAM", to: "/team" },
    { name: "ABOUT", to: "/about" },
    { name: "CONTACT", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur shadow-sm">
      <div className="flex items-center justify-between p-2 lg:p-3">

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="w-12 h-12 md:w-14 md:h-14 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="flex gap-3 lg:gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className="text-xs md:text-sm font-light hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="relative">
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
      </div>
    </header>
  );
}
