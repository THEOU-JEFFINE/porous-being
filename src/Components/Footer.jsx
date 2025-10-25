import React, { useState } from "react";

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({
    offices: false,
    social: true,
    legal: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-white py-6 sm:py-10 mt-auto font-sans">
      <div className="max-w-xs sm:max-w-6xl mx-auto lg:mx-50 px-4 sm:px-5">
        {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
          {/* OFFICES Section */}
          <div className="w-full sm:flex-1 text-left">
            <button
              onClick={() => toggleSection("offices")}
              className={`text-xs sm:text-xs text-gray-700 mb-3 sm:mb-2.5 tracking-wider hover:text-gray-900 transition-colors ${
                expandedSections.offices ? "font-bold" : "font-normal"
              }`}>
              OFFICES {expandedSections.offices ? "×" : "+"}
            </button>
            {expandedSections.offices && (
              <div className="text-left">
                <p className="text-[10px] sm:text-[11px] text-gray-700 mb-1.5 sm:mb-1 tracking-wide">
                  123 Business Avenue
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-700 mb-1.5 sm:mb-1 tracking-wide">
                  Suite 456, Floor 7
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-700 mb-1.5 sm:mb-1 tracking-wide">
                  New York, NY 10001
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-700 mb-1.5 sm:mb-1 tracking-wide">
                  United States
                </p>
              </div>
            )}
          </div>

          {/* SOCIAL Section */}
          <div className="w-full sm:flex-1 text-left sm:text-center">
            <button
              onClick={() => toggleSection("social")}
              className={`text-xs sm:text-xs text-gray-700 mb-4 sm:mb-4 tracking-wider hover:text-gray-900 transition-colors ${
                expandedSections.social ? "font-bold" : "font-normal"
              }`}>
              SOCIAL {expandedSections.social ? "×" : "+"}
            </button>
            {expandedSections.social && (
              <div className="text-left sm:text-center">
                <a
                  href="#"
                  className="block text-[10px] sm:text-[11px] text-gray-700 underline mb-2.5 sm:mb-2 tracking-wide hover:text-gray-900 transition-colors">
                  INSTAGRAM ↗
                </a>
                <a
                  href="#"
                  className="block text-[10px] sm:text-[11px] text-gray-700 underline mb-2.5 sm:mb-2 tracking-wide hover:text-gray-900 transition-colors">
                  X ↗
                </a>
                <a
                  href="#"
                  className="block text-[10px] sm:text-[11px] text-gray-700 underline mb-2.5 sm:mb-2 tracking-wide hover:text-gray-900 transition-colors">
                  LINKEDIN ↗
                </a>
                <a
                  href="#"
                  className="block text-[10px] sm:text-[11px] text-gray-700 underline mb-2.5 sm:mb-2 tracking-wide hover:text-gray-900 transition-colors">
                  VIMEO ↗
                </a>
                <a
                  href="#"
                  className="block text-[10px] sm:text-[11px] text-gray-700 underline mb-4 sm:mb-4 tracking-wide hover:text-gray-900 transition-colors">
                  FACEBOOK ↗
                </a>
                {/* QR Code placeholder - mobile optimized */}
                <div className="w-14 h-14 sm:w-15 sm:h-15 bg-black flex items-center justify-center mt-3 sm:mt-2.5 sm:mx-auto">
                  <span className="text-white text-[7px] sm:text-[8px] font-bold tracking-widest">
                    POROUS
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* LEGAL Section */}
          <div className="w-full sm:flex-1 text-left sm:text-right">
            <button
              onClick={() => toggleSection("legal")}
              className={`text-xs sm:text-xs text-gray-700 mb-3 sm:mb-2.5 tracking-wider hover:text-gray-900 transition-colors ${
                expandedSections.legal ? "font-bold" : "font-normal"
              }`}>
              LEGAL {expandedSections.legal ? "×" : "+"}
            </button>
            {expandedSections.legal && (
              <div className="text-left sm:text-right">
                <a
                  href="#"
                  className="block text-[10px] sm:text-[11px] text-gray-700 underline mb-2.5 sm:mb-2 tracking-wide hover:text-gray-900 transition-colors">
                  TERMS & CONDITIONS ↗
                </a>
                <a
                  href="#"
                  className="block text-[10px] sm:text-[11px] text-gray-700 underline mb-2.5 sm:mb-2 tracking-wide hover:text-gray-900 transition-colors">
                  PRIVACY POLICY ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
