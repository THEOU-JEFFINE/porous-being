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
                Architecture is often mistaken for the making of objects—walls,
                roofs, and facades. At its core, however, architecture is the
                design of space. Space may be enclosed or open, built or
                unbuilt, but it is never empty. It is a living field,
                continuously shaped by forces that move through it—water that
                flows, air that circulates, light that shifts, people that move,
                life that emerges, and time that transforms. To design space is
                therefore to engage these forces.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                Modern architecture proposed that form follows function, and
                climate-responsive design extended this to form follows climate.
                At Porous Being, we propose a different position: form follows
                flow. Form is not imposed as an abstract object but derived from
                the movement of forces through space. Water carves, air
                channels, light filters, and movement traces paths. Form becomes
                the residue of these flows—walls act as deflections of movement,
                openings become intensifications of passage, and structure is
                understood as the momentary stabilization of dynamic forces.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                Modern architecture proposed that form follows function, and
                climate-responsive design extended this to form follows climate.
                At Porous Being, we propose a different position: form follows
                flow. Form is not imposed as an abstract object but derived from
                the movement of forces through space. Water carves, air
                channels, light filters, and movement traces paths. Form becomes
                the residue of these flows—walls act as deflections of movement,
                openings become intensifications of passage, and structure is
                understood as the momentary stabilization of dynamic forces.
              </motion.p>
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
              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                Porous architecture emerges from this understanding. Porosity is
                not simply about openings or transparency; it is performative.
                It is the calibrated permeability of space to forces—deciding
                how, where, and to what extent water, air, light, and life are
                allowed to pass, slow, gather, or transform. In this sense,
                porosity is not the absence of boundaries but the intelligence
                of boundaries.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                When space is designed through such calibrated flows,
                architecture ceases to be a static object and becomes a living
                being. It responds to rain, breathes with air, adapts to light,
                and evolves with use over time. It absorbs and releases, slows
                and accelerates, filters and transforms. A building is not
                complete at the moment of construction; it comes alive when
                flows begin to pass through it.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                This approach operates through multiple, overlapping layers of
                porosity. Hydrological porosity engages water as a generator of
                space—receiving, storing, and guiding it as part of a larger
                cycle. Atmospheric porosity shapes air movement through
                orientation, section, and pressure, allowing space to breathe.
                Luminous porosity filters and diffuses light, making space
                responsive to time and season. Human porosity enables movement
                that is fluid, exploratory, and non-linear. Ecological porosity
                allows life to enter, grow, and coexist, transforming
                architecture into habitat rather than object.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                The spatial consequence of this approach is profound. Boundaries
                become interfaces rather than barriers, edges become zones of
                exchange, rooms dissolve into gradients rather than fixed
                enclosures, and circulation emerges as paths of flow rather than
                imposed corridors. Water, air, and light are no longer hidden
                systems but visible and experiential elements of space. Space
                itself becomes dynamic—alive, responsive, and continuously
                negotiated.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                In contrast, much of contemporary construction operates through
                exclusion—draining water, mechanically conditioning air,
                artificially regulating light, removing ecology, and sealing
                boundaries. Such buildings may be efficient, but they remain
                inert and disconnected. Porous architecture proposes an
                alternative: not resistance to forces, but participation in
                them; not sealed objects, but living systems.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans"
              >
                At Porous Being, we do not design buildings. We design living
                systems of space—where form follows flow, flow shapes porosity,
                and porosity breeds life.
              </motion.p>
            </motion.div>

            {/* Image section */}

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
