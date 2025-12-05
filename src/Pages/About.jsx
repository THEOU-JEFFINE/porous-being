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
  const mainImageRef = useRef(null);
  const scopeTitleRef = useRef(null);
  const scopeLeftRef = useRef(null);
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

      // Content paragraphs stagger
      gsap.from(leftColumnRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3
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
      gsap.from(scopeLeftRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scopeLeftRef.current,
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

        {/* Single column layout */}
        <div ref={leftColumnRef} className="space-y-6 lg:space-y-8 max-w-3xl">
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

          <div ref={scopeLeftRef} className="space-y-6 lg:space-y-8 max-w-3xl">
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

      </div>
    </div>
  );
}
