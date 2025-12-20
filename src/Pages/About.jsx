import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pblImage from "../assets/pbl.jpeg";
import offImage from "../assets/Office_pic.jpg";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const titleRef = useRef(null);
  const leftColumnRef = useRef(null);
  const mainImageRef = useRef(null);
  const scopeTitleRef = useRef(null);
  const scopeLeftRef = useRef(null);
  const galleryItemsRef = useRef([]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Content paragraphs stagger
      gsap.from(leftColumnRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
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
          toggleActions: "play none none reverse",
        },
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
          toggleActions: "play none none reverse",
        },
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
          toggleActions: "play none none reverse",
        },
      });

      // Gallery items stagger animation
      galleryItemsRef.current.forEach((item) => {
        if (item) {
          gsap.from(item, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=50",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 xl:px-24">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="mt-12 text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-8 lg:mb-12 xl:mb-16"
        >
          PHILOSOPHY
        </h1>

        <div>
          {/* Philosophy Content */}
          <div ref={leftColumnRef} className="space-y-6 lg:space-y-8">
            <p className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
              At Porous Being, we translate the philosophy of porosity into
              built environments that live, breathe, and evolve. It is our
              commitment to create spaces that are open, responsive and
              generative.
            </p>

            <p className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-light">
              To design porously is to resist excess and allow space for nature
              to settle - to shape not just enclosures, but invitations to
              engage with your surroundings, in all their living, non-living,
              and silent forms. It is a refusal to see architecture as a
              finished product, but rather as an emerging ecosystem.
            </p>

            <p className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
              Porous Being is a process of resistance to isolation, over
              definition and sealed systems.
            </p>
          </div>

          {/* Image section */}
          <div className="mt-10 sm:mt-16 lg:mt-20">
            <img
              ref={mainImageRef}
              src={pblImage}
              alt="Architecture"
              className="w-full h-48 sm:h-64 lg:h-96 rounded-lg object-cover"
            />
          </div>

          {/* Scope of Work Section */}
          <div className="mt-12 lg:mt-16">
            <h2
              ref={scopeTitleRef}
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mb-6 lg:mb-8"
            >
              SCOPE OF WORK
            </h2>

            <div ref={scopeLeftRef} className="space-y-6 lg:space-y-8">
              <p className="text-justify text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
                In POROUSBEING, we offer comprehensive consultancy services
                across multiple disciplines of design and planning. Our
                integrated approach ensures seamless coordination between
                architecture, landscape, and urban strategy.
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
              <br></br>
              <img src={offImage} alt="Office Picture"></img>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
