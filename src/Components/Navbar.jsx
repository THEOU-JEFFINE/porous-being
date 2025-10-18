import React, { useState } from "react";
import Logo from "../assets/Porous_Logo.jpeg";

export default function Navbar() {
  const [showDiv, setShowDiv] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/65 backdrop-blur w-full">
      <div className="flex items-center p-2 relative">
        {/* Left Logo */}
        <div
          className="flex-[2] flex items-center cursor-pointer relative"
          onClick={() => setShowDiv(!showDiv)}
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-16 h-16 max-w-[48px] max-h-[48px] object-contain"
          />

          {/* Dropdown Pop-up */}
          {showDiv && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white  rounded-lg p-4 flex flex-col gap-2 z-50">
              <a href="#" className="text-sm font-light hover:text-blue-500">
                PROJECT
              </a>
              <a href="#" className="text-sm font-light hover:text-blue-500">
                ABOUT
              </a>
              <a href="#" className="text-sm font-light hover:text-blue-500">
                CONTACT
              </a>
            </div>
          )}
        </div>

        {/* Center Navigation Links */}
        <div className="flex-[3] flex justify-between px-4">
          <a href="#" className="text-sm font-light">
            LANDSCAPE
          </a>
          <a href="#" className="text-sm font-light">
            ENGINEERING
          </a>
          <a href="#" className="text-sm font-light">
            ARCHITECTURE
          </a>
          <a href="#" className="text-sm font-light">
            PLANNING
          </a>
          <a href="#" className="text-sm font-light">
            PRODUCTS
          </a>
        </div>

        {/* Right Side: Search Bar */}
        <div className="flex-[2] flex justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 md:w-64 pl-12 pr-4 py-2 rounded-xl bg-gray-100
                         focus:bg-white focus:ring-2 focus:ring-blue-500
                         outline-none transition-all duration-300 shadow-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2"
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
      </div>
    </header>
  );
}
