import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      className="bg-white border-t border-gray-200 py-12 sm:py-16 lg:py-20 mt-auto font-sans"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* About Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
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
          </motion.div>

          {/* Contact Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
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
                  <span>udhay@porousbeing.com</span>
                  <br></br>
                  <span>suresh@porousbeing.com</span>
                </a>
              </p>
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
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
          </motion.div>

          {/* Social & Legal Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
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
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Porous Being. All rights
              reserved.
            </p>
            <p>Designed with purpose, built with passion.</p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
