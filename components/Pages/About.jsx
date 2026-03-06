"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, easeOut } from "framer-motion";

const About = React.memo(() => {
  const titleRef = useRef(null);
  const leftColumnRef = useRef(null);
  const mainImageRef = useRef(null);

  // Scroll to top on component mount
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoize SEO structured data
  const aboutStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About — Porous Being",
      description:
        "Learn about Porous Being, an architecture and design practice exploring the intersection of spatial design, ecology, and urbanism.",
      url:
        typeof window !== "undefined" ? window.location.origin + "/about" : "",
    }),
    [],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Helmet>
        <title>About — Porous Being | Architecture & Design Practice</title>
        <meta
          name="title"
          content="About — Porous Being | Architecture & Design Practice"
        />
        <meta
          name="description"
          content="Learn about Porous Being, an architecture and design practice exploring the intersection of spatial design, ecology, and urbanism."
        />
        <meta
          name="keywords"
          content="architecture firm, design studio, sustainability, urban design, ecology"
        />
        <link rel="canonical" href="/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About — Porous Being" />
        <meta
          property="og:description"
          content="Learn about our architecture and design practice."
        />
        <meta property="og:url" content="/about" />
        <script type="application/ld+json">
          {JSON.stringify(aboutStructuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen px-4 md:px-8 lg:px-16 xl:px-24">
        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <motion.h1
            ref={titleRef}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: easeOut }}
            className="mt-12 text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-8 lg:mb-12 xl:mb-16"
          >
            PHILOSOPHY
          </motion.h1>

          <div>
            {/* Philosophy Content */}
            <motion.div
              ref={leftColumnRef}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 lg:space-y-8"
            >
              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                At Porous Being, we translate the philosophy of porosity into
                built environments that live, breathe, and evolve. It is our
                commitment to create spaces that are open, responsive and
                generative.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-light"
              >
                To design porously is to resist excess and allow space for
                nature to settle - to shape not just enclosures, but invitations
                to engage with your surroundings, in all their living,
                non-living, and silent forms. It is a refusal to see
                architecture as a finished product, but rather as an emerging
                ecosystem.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                Porous Being is a process of resistance to isolation, over
                definition and sealed systems.
              </motion.p>
            </motion.div>

            {/* Image section */}
            <motion.div
              className="mt-10 sm:mt-16 lg:mt-20"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                ref={mainImageRef}
                src="/assets/pbl.jpeg"
                alt="Porous Being architectural philosophy and design principles"
                className="w-full h-48 sm:h-64 lg:h-96 rounded-lg object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Scope of Work Section */}
            <motion.div
              className="mt-12 lg:mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mb-6 lg:mb-8">
                SCOPE OF WORK
              </h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6 lg:space-y-8"
              >
                <motion.p
                  variants={itemVariants}
                  className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
                >
                  In POROUSBEING, we offer comprehensive consultancy services
                  across multiple disciplines of design and planning. Our
                  integrated approach ensures seamless coordination between
                  architecture, landscape, and urban strategy.
                </motion.p>

                <motion.ul
                  variants={containerVariants}
                  className="space-y-3 text-sm sm:text-base lg:text-lg text-gray-700"
                >
                  {[
                    "Architecture Design Consultancy Services",
                    "Urban Design and Strategy Consultancy Service",
                    "Interior Architecture Consultancy Service",
                    "Landscape Architecture Consultancy Service",
                    "Hydro Spatial Strategy and Planning",
                  ].map((service, idx) => (
                    <motion.li
                      key={idx}
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {service}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.img
                  variants={itemVariants}
                  src="/assets/Office_pic.jpg"
                  alt="Porous Being office and design studio environment"
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
});

About.displayName = "About";
export default About;
