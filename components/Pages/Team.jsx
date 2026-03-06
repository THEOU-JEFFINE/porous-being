"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion, easeOut } from "framer-motion";
const Team = React.memo(() => {
  const people = useMemo(
    () => [
      {
        name: "N. Udhayarajan, B.Arch",
        role: "Principal Architect",
        location: "Chennai",
        image: "/assets/Udhay_pic.png",
        bio: "Udhayarajan is an architect with over 14 years of experience in architecture and urban design. His work spans large-scale government projects, institutional buildings, community housing, and ecological urban strategies.\n\nHis expertise lies in institutional buildings and community housing, with a strong emphasis on conceptualizing spatial design within the frameworks of sustainability and urban governance. His work blends ecological sensitivity with contextual clarity, reflecting a deep commitment to creating spaces that are both functional and transformative.\n\nHe began his career with IL&FS EcoSmart, working on the Eco Restoration Plan for the Adyar Creek and Estuary (300 acres), and later collaborated with the Transportation Department at Anna University on bus terminal designs in Chennai.\n\nAs co-founder of WEBE Design Lab, he led several notable urban projects, including the North Usman Road footpath design for Chennai Smart City and green strategy proposals for Ambattur Ward in partnership with Care Earth Trust.\n\nHe worked with GIZ India to conceptualize a design competition on the future of Buckingham Canal, and served as one of the Project Architects for the Indian National War Memorial, New Delhi, inaugurated by the Hon. Prime Minister of India. He also led the design of the Water Matters exhibition in collaboration with the American Consulate Chennai, Care Earth Trust, and the Smithsonian Institution.\n\nUdhayarajan is currently the founder and principal of Porous Being, a design practice exploring the intersection of spatial design, ecology, and urbanism. He also leads the Uvakai Research Foundation, a think tank working on water, environment, governance, and community well-being.",
      },
      {
        name: "Suresh Kumar J, M.Arch, MSc Project Management (NUS)",
        role: "Project Director",
        location: "Chennai",
        image: "/assets/Suresh_pic.jpeg",
        bio: "Suresh J is a seasoned project management professional with over 15 years of experience in the construction and real estate industry. His career spans both Indian and international contexts, including significant roles in Singapore and across South India, where he has managed large-scale commercial, institutional, and residential developments.\n\nHis expertise lies in end-to-end project planning, site due diligence, approval drawings, and design coordination. His ability to streamline execution across various project scales has made him a reliable consultant for both private developers and corporate clients.\n\nSuresh has worked with firms such as MARG Ltd., Studio 7 Consultants, Chennai Engineers & Contractors, and Logistics Construction Pvt. Ltd. (Singapore). These experiences have equipped him with specialized skills in handling SEZ plotting, particularly for light engineering industries, customizing infrastructure as per diverse industrial requirements.\n\nHe has also led design and build initiatives for high-density residential developments, delivering several hundred apartment units across Chennai. His in-depth understanding of construction ecosystems, regulatory processes, and interdisciplinary collaboration makes him a valuable asset in delivering projects that are efficient, compliant, and contextually grounded.",
      },
    ],
    [],
  );

  const [activePerson, setActivePerson] = useState(0);
  const titleRef = useRef(null);

  // Scroll to top on component mount
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoize SEO structured data
  const teamStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "TeamPage",
      name: "Team — Porous Being",
      description:
        "Meet the talented team behind Porous Being architecture and design practice.",
      url:
        typeof window !== "undefined" ? window.location.origin + "/team" : "",
      hasTeamMember: people.map((p) => ({
        "@type": "Person",
        name: p.name,
        jobTitle: p.role,
        workLocation: p.location,
      })),
    }),
    [people],
  );

  return (
    <>
      <Helmet>
        <title>Team — Porous Being | Architecture Professionals</title>
        <meta
          name="title"
          content="Team — Porous Being | Architecture Professionals"
        />
        <meta
          name="description"
          content="Meet the talented team behind Porous Being architecture and design practice, including architects and project managers."
        />
        <meta
          name="keywords"
          content="architects, design team, project management, architecture professionals"
        />
        <link rel="canonical" href="/team" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Team — Porous Being" />
        <meta
          property="og:description"
          content="Meet our team of architecture and design professionals."
        />
        <meta property="og:url" content="/team" />
        <script type="application/ld+json">
          {JSON.stringify(teamStructuredData)}
        </script>
      </Helmet>

      <div className="flex flex-col lg:flex-row min-h-screen px-4 sm:px-6 lg:px-12 xl:px-24 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
        {/* Main Content */}
        <div className="flex-1 max-w-6xl">
          <motion.h1
            ref={titleRef}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: easeOut }}
            className="mt-8 sm:mt-12 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal mb-8 sm:mb-10 lg:mb-12 xl:mb-16"
          >
            PEOPLE
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 xl:gap-20 pr-0 sm:pr-4 lg:pr-8">
            {/* CENTER PEOPLE LIST */}
            <div className="flex-1 w-full lg:max-w-md">
              <div
                className="lg:h-[65vh] overflow-y-auto pr-2 sm:pr-4"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db transparent",
                }}
              >
                {people.map((p, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="border-b border-gray-200"
                  >
                    <div
                      onClick={() => setActivePerson(idx)}
                      className={`py-4 sm:py-3 cursor-pointer transition-all duration-200 ${
                        activePerson === idx
                          ? "text-black font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      <div className="text-base sm:text-lg font-normal">
                        {p.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 mt-1">
                        {p.role}, {p.location}
                      </div>
                    </div>

                    {/* Mobile Accordion Content */}
                    <AnimatePresence>
                      {activePerson === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="lg:hidden overflow-hidden pb-6"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full sm:w-4/5 mx-auto h-auto object-cover rounded-lg shadow-lg mb-5 mt-3"
                            loading="lazy"
                          />
                          <h3 className="text-lg sm:text-xl font-semibold mb-2">
                            {p.name}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm mb-4">
                            {p.role}, {p.location}
                          </p>
                          <div className="text-gray-700 text-xs sm:text-sm leading-relaxed space-y-3 text-justify">
                            {p.bio.split("\n\n").map((paragraph, i) => (
                              <p key={i}>{paragraph}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE PREVIEW - Desktop Only */}
            <motion.div
              className="hidden lg:block flex-[3]"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePerson}
                    src={people[activePerson].image}
                    alt={people[activePerson].name}
                    className="w-full max-w-md mx-auto h-auto object-cover rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                  />
                </AnimatePresence>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl lg:text-3xl font-semibold mb-3">
                    {people[activePerson].name}
                  </h2>
                  <p className="text-gray-600 text-base mb-6">
                    {people[activePerson].role}, {people[activePerson].location}
                  </p>
                  <div className="text-justify text-gray-700 text-sm leading-relaxed space-y-4">
                    {people[activePerson].bio
                      .split("\n\n")
                      .map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
});

Team.displayName = "Team";
export default Team;
