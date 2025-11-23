import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../assets/45.png";

gsap.registerPlugin(ScrollTrigger);

export default function Teams() {
  const people = [
    { name: "Bjarke Ingels", role: "Founder", location: "CPH", image: img1 },
    { name: "Sheela Maini Søgaard", role: "CEO & Partner", location: "CPH", image: img1 },
    { name: "Agustin Perez-Torres", role: "Partner", location: "BCN", image: img1 },
    { name: "Alexandru Malaescu", role: "Partner", location: "LON", image: img1 },
    { name: "Andreas Klok Pedersen", role: "Partner", location: "LON", image: img1 },
  ];

  const categories = ["PARTNERS", "ASSOCIATES", "DIRECTORS"];
  const [activePerson, setActivePerson] = React.useState(0);

  const titleRef = useRef(null);
  const categoriesRef = useRef([]);
  const peopleItemsRef = useRef([]);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set(titleRef.current, { y: 100, opacity: 0 });
    gsap.set(categoriesRef.current, { x: -30, opacity: 0 });
    gsap.set(peopleItemsRef.current, { x: -50, opacity: 0 });
    if (imageContainerRef.current) {
      gsap.set(imageContainerRef.current, { x: 100, opacity: 0 });
    }

    // Animate to visible state
    gsap.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out"
    });

    gsap.to(categoriesRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.3
    });

    gsap.to(peopleItemsRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5
    });

    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      });
    }
  }, []);

  const handlePersonHover = (idx) => {
    setActivePerson(idx);

    // Animate image transition
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current.querySelector("img"),
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  const handleCategoryHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      x: isEnter ? 8 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div className="flex min-h-screen px-4 md:px-8 lg:px-24 relative">
      {/* LEFT CATEGORY SIDEBAR */}
      <div className="hidden lg:flex w-1/6 flex-col gap-4 text-gray-600 fixed left-8 top-1/2 -translate-y-1/2 justify-center">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            ref={(el) => (categoriesRef.current[idx] = el)}
            onMouseEnter={(e) => handleCategoryHover(e, true)}
            onMouseLeave={(e) => handleCategoryHover(e, false)}
            className={`cursor-pointer text-sm ${idx === 0 ? "font-bold text-black" : ""}`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* CENTER PEOPLE LIST */}
      <div className="flex-1 lg:ml-48 pt-16 max-w-xl">
        <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-normal mb-12">PEOPLE</h1>

        <div className="h-[65vh] overflow-y-auto pr-4">
          {people.map((p, idx) => (
            <div
              key={idx}
              ref={(el) => (peopleItemsRef.current[idx] = el)}
              onMouseEnter={() => handlePersonHover(idx)}
              className={`py-3 cursor-pointer border-b border-gray-200 transition-all duration-200 ${
                activePerson === idx ? "text-black font-semibold" : "text-gray-600"
              }`}
            >
              <div className="text-lg">{p.name}</div>
              <div className="text-sm text-gray-500">{p.role}, {p.location}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FIXED IMAGE PREVIEW */}
      <div ref={imageContainerRef} className="hidden lg:block fixed right-12 top-1/2 -translate-y-1/2 w-96">
        <img
          src={people[activePerson].image}
          alt={people[activePerson].name}
          className="w-full h-auto object-cover rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
        />

        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold">{people[activePerson].name}</h2>
          <p className="text-gray-600 text-sm">
            {people[activePerson].role}, {people[activePerson].location}
          </p>
        </div>
      </div>
    </div>
  );
}
