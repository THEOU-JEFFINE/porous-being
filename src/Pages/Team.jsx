import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../assets/Udhay_pic.png";
import img2 from "../assets/Suresh_pic.jpeg";
gsap.registerPlugin(ScrollTrigger);

export default function Teams() {
  const people = [
    {
      name: "N. Udhayarajan, B.Arch",
      role: "Principal Architect",
      location: "Chennai",
      image: img1,
      bio: "Udhayarajan is an architect with over 14 years of experience in architecture and urban design. His work spans large-scale government projects, institutional buildings, community housing, and ecological urban strategies.\n\nHis expertise lies in institutional buildings and community housing, with a strong emphasis on conceptualizing spatial design within the frameworks of sustainability and urban governance. His work blends ecological sensitivity with contextual clarity, reflecting a deep commitment to creating spaces that are both functional and transformative.\n\nHe began his career with IL&FS EcoSmart, working on the Eco Restoration Plan for the Adyar Creek and Estuary (300 acres), and later collaborated with the Transportation Department at Anna University on bus terminal designs in Chennai.\n\nAs co-founder of WEBE Design Lab, he led several notable urban projects, including the North Usman Road footpath design for Chennai Smart City and green strategy proposals for Ambattur Ward in partnership with Care Earth Trust.\n\nHe worked with GIZ India to conceptualize a design competition on the future of Buckingham Canal, and served as one of the Project Architects for the Indian National War Memorial, New Delhi, inaugurated by the Hon. Prime Minister of India. He also led the design of the Water Matters exhibition in collaboration with the American Consulate Chennai, Care Earth Trust, and the Smithsonian Institution.\n\nUdhayarajan is currently the founder and principal of Porous Being, a design practice exploring the intersection of spatial design, ecology, and urbanism. He also leads the Uvakai Research Foundation, a think tank working on water, environment, governance, and community well-being.",
    },
    {
      name: "Suresh Kumar J, M.Arch, MSc Project Management (NUS)",
      role: "Project Director",
      location: "Chennai",
      image: img2,
      bio: "Suresh J is a seasoned project management professional with over 15 years of experience in the construction and real estate industry. His career spans both Indian and international contexts, including significant roles in Singapore and across South India, where he has managed large-scale commercial, institutional, and residential developments.\n\nHis expertise lies in end-to-end project planning, site due diligence, approval drawings, and design coordination. His ability to streamline execution across various project scales has made him a reliable consultant for both private developers and corporate clients.\n\nSuresh has worked with firms such as MARG Ltd., Studio 7 Consultants, Chennai Engineers & Contractors, and Logistics Construction Pvt. Ltd. (Singapore). These experiences have equipped him with specialized skills in handling SEZ plotting, particularly for light engineering industries, customizing infrastructure as per diverse industrial requirements.\n\nHe has also led design and build initiatives for high-density residential developments, delivering several hundred apartment units across Chennai. His in-depth understanding of construction ecosystems, regulatory processes, and interdisciplinary collaboration makes him a valuable asset in delivering projects that are efficient, compliant, and contextually grounded.",
    },
  ];

  const categories = ["PARTNERS", "ASSOCIATES", "DIRECTORS"];
  const [activePerson, setActivePerson] = React.useState(0);

  const titleRef = useRef(null);
  const categoriesRef = useRef([]);
  const mobileCategoriesRef = useRef([]);
  const peopleItemsRef = useRef([]);
  const imageContainerRef = useRef(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Set initial states
    gsap.set(titleRef.current, { y: 100, opacity: 0 });
    gsap.set(categoriesRef.current, { x: -30, opacity: 0 });
    gsap.set(mobileCategoriesRef.current, { y: -20, opacity: 0 });
    gsap.set(peopleItemsRef.current, { x: -50, opacity: 0 });
    if (imageContainerRef.current) {
      gsap.set(imageContainerRef.current, { x: 100, opacity: 0 });
    }

    // Animate to visible state
    gsap.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
    });

    gsap.to(categoriesRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.3,
    });

    gsap.to(mobileCategoriesRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3,
    });

    gsap.to(peopleItemsRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5,
    });

    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });
    }
  }, []);

  const handlePersonClick = (idx) => {
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
      ease: "power2.out",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen px-4 md:px-6 lg:px-12 xl:px-24">
      {/* Sidebar - Desktop (lg only) */}
      <div className="hidden lg:flex w-1/6 flex-col gap-4 text-gray-600 fixed left-6 xl:left-8 top-1/2 -translate-y-1/2">
        {/* {categories.map((cat, idx) => (
          <div
            key={idx}
            ref={(el) => (categoriesRef.current[idx] = el)}
            onMouseEnter={(e) => handleCategoryHover(e, true)}
            onMouseLeave={(e) => handleCategoryHover(e, false)}
            className={`cursor-pointer text-xs xl:text-sm ${
              idx === 0 ? "font-bold" : ""
            } hover:text-black`}
          >
            {cat}
          </div>
        ))} */}
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-24 xl:ml-32 max-w-6xl">
        <h1
          ref={titleRef}
          className="mt-12 text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-8 lg:mb-12 xl:mb-16"
        >
          PEOPLE
        </h1>

        {/* Mobile + Tablet Categories (Top) */}
        <div className="flex lg:hidden overflow-x-auto gap-4 text-gray-600 mb-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              ref={(el) => (mobileCategoriesRef.current[idx] = el)}
              className={`cursor-pointer whitespace-nowrap ${
                idx === 0 ? "font-bold" : ""
              }`}
            >
              {cat}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20 pr-4 lg:pr-8">
          {/* CENTER PEOPLE LIST */}
          <div className="flex-1 max-w-sm lg:max-w-md">
            <div
              className="lg:h-[65vh] overflow-y-auto pr-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db transparent",
              }}
            >
              {people.map((p, idx) => (
                <div
                  key={idx}
                  ref={(el) => (peopleItemsRef.current[idx] = el)}
                  className="border-b border-gray-200"
                  style={{ opacity: 0, transform: "translateX(-50px)" }}
                >
                  <div
                    onClick={() => handlePersonClick(idx)}
                    className={`py-3 cursor-pointer transition-all duration-200 ${
                      activePerson === idx
                        ? "text-black font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    <div className="text-lg">{p.name}</div>
                    <div className="text-sm text-gray-500">
                      {p.role}, {p.location}
                    </div>
                  </div>

                  {/* Mobile Accordion Content */}
                  <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${
                      activePerson === idx ? "max-h-[1000px] pb-4" : "max-h-0"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {p.role}, {p.location}
                    </p>
                    <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                      {p.bio.split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE PREVIEW - Desktop Only */}
          <div
            ref={imageContainerRef}
            className="hidden lg:block flex-[3]"
            style={{ opacity: 0, transform: "translateX(100px)" }}
          >
            <img
              src={people[activePerson].image}
              alt={people[activePerson].name}
              className="w-full max-w-2xl h-auto object-cover rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
            />

            <div className="mt-6 max-w-2xl">
              <h2 className="text-2xl font-semibold mb-2">
                {people[activePerson].name}
              </h2>
              <p className="text-gray-600 text-base mb-4">
                {people[activePerson].role}, {people[activePerson].location}
              </p>
              <div className=" text-justify text-gray-700 text-sm leading-relaxed space-y-3">
                {people[activePerson].bio.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
