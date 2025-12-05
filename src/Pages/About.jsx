import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const titleRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const mainImageRef = useRef(null);
  const scopeTitleRef = useRef(null);
  const scopeLeftRef = useRef(null);
  const scopeRightRef = useRef(null);
  const teamSectionRef = useRef(null);
  const principalRef = useRef(null);
  const directorRef = useRef(null);
  const galleryItemsRef = useRef([]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollContainerRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollContainerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // Left column paragraphs stagger
      gsap.from(leftColumnRef.current.children, {
        x: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      });

      // Right column content
      gsap.from(rightColumnRef.current.children, {
        x: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      });

      // Main image reveal
      gsap.from(mainImageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainImageRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Scope section title
      gsap.from(scopeTitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scopeTitleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Scope columns
      gsap.from(scopeLeftRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scopeLeftRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(scopeRightRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scopeRightRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Team section
      gsap.from(teamSectionRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Principal section
      gsap.from(principalRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: principalRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Director section
      gsap.from(directorRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: directorRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Gallery items stagger animation
      galleryItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=50",
              toggleActions: "play none none reverse"
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Main content container */}
      <div className="max-w-7xl mx-auto lg:ml-30 px-4 sm:px-10 lg:px-30 py-8 sm:py-12 lg:py-20">
        {/* Large "PHILOSOPHY" heading */}
        <h1 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-normal text-black mb-6 sm:mb-8 lg:mb-10">
          PHILOSOPHY
        </h1>

        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Left Column */}
          <div ref={leftColumnRef} className="space-y-6 lg:space-y-8">
            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
              At Porous Being, we translate the philosophy of porosity into
              built environments that live, breathe, and evolve. It is our
              commitment to create spaces that are open, responsive and
              generative.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-light">
              To design porously is to resist excess and allow space for nature
              to settle - to shape not just enclosures, but invitations to engage
              with your surroundings, in all their living, non-living, and
              silent forms. It is a refusal to see architecture as a finished
              product, but rather as an emerging ecosystem.
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightColumnRef} className="space-y-6 lg:space-y-8">
            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
              Porous Being is a process of resistance to isolation, over
              definition and sealed systems.
            </p>

            {/* Signature section */}
            <div className="pt-2">
              <p className="text-base lg:text-lg font-light text-black">
                N. Udhayarajan, B.Arch
              </p>
              <p className="text-base lg:text-lg text-gray-700 font-light">
                Founder & Principal Architect
              </p>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-10 sm:mt-16 lg:mt-20">
          <img
            ref={mainImageRef}
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
            alt="Architecture"
            className="w-full h-48 sm:h-64 lg:h-96 rounded-none object-cover"
          />
        </div>

        {/* Scope of Work Section */}
        <div>
          <h1 ref={scopeTitleRef} className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mt-8 sm:mt-10 lg:mt-12 mb-4 sm:mb-5">
            SCOPE OF WORK
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Left Column */}
            <div ref={scopeLeftRef} className="space-y-6 lg:space-y-8">
              <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
                In POROUSBEING, we offer comprehensive consultancy services across
                multiple disciplines of design and planning. Our integrated approach
                ensures seamless coordination between architecture, landscape, and
                urban strategy.
              </p>
              <ul className="space-y-3 text-sm sm:text-base lg:text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Architecture Design Consultancy Services
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Urban Design and Strategy Consultancy Service
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Interior Architecture Consultancy Service
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div ref={scopeRightRef} className="space-y-6 lg:space-y-8">
              <ul className="space-y-3 text-sm sm:text-base lg:text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Landscape Architecture Consultancy Service
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Hydro Spatial Strategy and Planning
                </li>
              </ul>
            </div>
          </div>

          {/* Scrollable image gallery */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="mt-8 sm:mt-10 lg:mt-12 overflow-x-auto cursor-grab select-none"
            style={{
              overflowX: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>
              {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
            </style>
            <div
              className="flex gap-4 sm:gap-6 lg:gap-8"
              style={{ minWidth: "fit-content" }}
            >
              {/* Architecture */}
              <div ref={(el) => (galleryItemsRef.current[0] = el)} className="flex-shrink-0 w-64 sm:w-80 lg:w-96 group">
                <div
                  className="rounded-none overflow-hidden"
                  style={{ border: "none" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Architecture"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center mt-3 sm:mt-4">
                  <div className="w-2 h-2 bg-black mr-2"></div>
                  <p className="text-base sm:text-lg font-light text-black">
                    ARCHITECTURE +
                  </p>
                </div>
              </div>

              {/* Urban Design */}
              <div ref={(el) => (galleryItemsRef.current[1] = el)} className="flex-shrink-0 w-64 sm:w-80 lg:w-96 group">
                <div
                  className="rounded-none overflow-hidden"
                  style={{ border: "none" }}
                >
                  <img
                    src="https://plus.unsplash.com/premium_photo-1732835620501-116098579418?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=464"
                    alt="Urban Design"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center mt-3 sm:mt-4">
                  <div className="w-2 h-2 bg-black mr-2"></div>
                  <p className="text-base sm:text-lg font-light text-black">
                    URBAN DESIGN +
                  </p>
                </div>
              </div>

              {/* Landscape */}
              <div ref={(el) => (galleryItemsRef.current[2] = el)} className="flex-shrink-0 w-64 sm:w-80 lg:w-96 group">
                <div
                  className="rounded-none overflow-hidden"
                  style={{ border: "none" }}
                >
                  <img
                    src="https://plus.unsplash.com/premium_photo-1739452120449-9f79dc47a62e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
                    alt="Landscape"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center mt-3 sm:mt-4">
                  <div className="w-2 h-2 bg-black mr-2"></div>
                  <p className="text-base sm:text-lg font-light text-black">
                    LANDSCAPE +
                  </p>
                </div>
              </div>

              {/* Hydro Spatial */}
              <div ref={(el) => (galleryItemsRef.current[3] = el)} className="flex-shrink-0 w-64 sm:w-80 lg:w-96 group">
                <div
                  className="rounded-none overflow-hidden"
                  style={{ border: "none" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
                    alt="Hydro Spatial"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center mt-3 sm:mt-4">
                  <div className="w-2 h-2 bg-black mr-2"></div>
                  <p className="text-base sm:text-lg font-light text-black">
                    HYDRO SPATIAL +
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamSectionRef} className="mt-16 sm:mt-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mb-6 sm:mb-8">
            TEAM
          </h1>
          <div className="space-y-2 text-sm sm:text-base lg:text-lg text-gray-700">
            <p><span className="font-semibold text-black">N. Udhayarajan, B.Arch</span> - Principal Architect</p>
            <p><span className="font-semibold text-black">Suresh Kumar J, M.Arch, MSc Project Management (NUS)</span> - Project Director</p>
          </div>
        </div>

        {/* Principal Architect Section */}
        <div ref={principalRef} className="mt-16 sm:mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-black mb-2">
            Principal Architect
          </h2>
          <p className="text-lg sm:text-xl font-semibold text-black mb-6">N. Udhayarajan, B.Arch</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p>
                Udhayarajan is an architect with over 14 years of experience in architecture and urban design. His work spans large-scale government projects, institutional buildings, community housing, and ecological urban strategies.
              </p>
              <p>
                His expertise lies in institutional buildings and community housing, with a strong emphasis on conceptualizing spatial design within the frameworks of sustainability and urban governance. His work blends ecological sensitivity with contextual clarity, reflecting a deep commitment to creating spaces that are both functional and transformative.
              </p>
              <p>
                He began his career with IL&FS EcoSmart, working on the Eco Restoration Plan for the Adyar Creek and Estuary (300 acres), and later collaborated with the Transportation Department at Anna University on bus terminal designs in Chennai.
              </p>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p>
                As co-founder of WEBE Design Lab, he led several notable urban projects, including the North Usman Road footpath design for Chennai Smart City and green strategy proposals for Ambattur Ward in partnership with Care Earth Trust.
              </p>
              <p>
                He worked with GIZ India to conceptualize a design competition on the future of Buckingham Canal, and served as one of the Project Architects for the Indian National War Memorial, New Delhi, inaugurated by the Hon. Prime Minister of India. He also led the design of the Water Matters exhibition in collaboration with the American Consulate Chennai, Care Earth Trust, and the Smithsonian Institution.
              </p>
              <p>
                Udhayarajan is currently the founder and principal of Porous Being, a design practice exploring the intersection of spatial design, ecology, and urbanism. He also leads the Uvakai Research Foundation, a think tank working on water, environment, governance, and community well-being.
              </p>
            </div>
          </div>
        </div>

        {/* Project Director Section */}
        <div ref={directorRef} className="mt-16 sm:mt-20 mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-black mb-2">
            Project Director
          </h2>
          <p className="text-lg sm:text-xl font-semibold text-black mb-6">Suresh J</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p>
                Suresh J is a seasoned project management professional with over 15 years of experience in the construction and real estate industry. His career spans both Indian and international contexts, including significant roles in Singapore and across South India, where he has managed large-scale commercial, institutional, and residential developments.
              </p>
              <p>
                His expertise lies in end-to-end project planning, site due diligence, approval drawings, and design coordination. His ability to streamline execution across various project scales has made him a reliable consultant for both private developers and corporate clients.
              </p>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p>
                Suresh has worked with firms such as MARG Ltd., Studio 7 Consultants, Chennai Engineers & Contractors, and Logistics Construction Pvt. Ltd. (Singapore). These experiences have equipped him with specialized skills in handling SEZ plotting, particularly for light engineering industries, customizing infrastructure as per diverse industrial requirements.
              </p>
              <p>
                He has also led design and build initiatives for high-density residential developments, delivering several hundred apartment units across Chennai. His in-depth understanding of construction ecosystems, regulatory processes, and interdisciplinary collaboration makes him a valuable asset in delivering projects that are efficient, compliant, and contextually grounded.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
