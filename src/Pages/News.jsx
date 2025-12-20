import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../assets/45.png";

gsap.registerPlugin(ScrollTrigger);

export default function News() {
  const titleRef = useRef(null);
  const categoriesRef = useRef([]);
  const mobileCategoriesRef = useRef([]);
  const newsItemsRef = useRef([]);

  const categories = ["NEWS", "EVENTS", "AWARDS", "LECTURES"];
  const newsItems = [];

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { y: 100, opacity: 0 });
      gsap.set(categoriesRef.current, { x: -30, opacity: 0 });
      gsap.set(mobileCategoriesRef.current, { y: -20, opacity: 0 });

      // Title animation - split and reveal
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      });

      // Categories stagger animation (desktop)
      gsap.to(categoriesRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });

      // Mobile categories stagger animation
      gsap.to(mobileCategoriesRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });

      // News items scroll-triggered animations
      newsItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          });

          // Animate children elements
          const image = item.querySelector("img");
          const textContent = item.querySelector(".news-text-content");

          if (image) {
            gsap.from(image, {
              scale: 0.8,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                toggleActions: "play none none reverse",
              },
            });
          }

          if (textContent) {
            gsap.from(textContent.children, {
              y: 20,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                toggleActions: "play none none reverse",
              },
            });
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleCategoryHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      x: isEnter ? 5 : 0,
      color: isEnter ? "#000000" : "",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen px-4 md:px-6 lg:px-12 xl:px-24">
      {/* Sidebar - Desktop (lg only) */}
      {/* <div className="hidden lg:flex w-1/6 flex-col gap-4 text-gray-600 fixed left-6 xl:left-8 top-1/2 -translate-y-1/2">
        {categories.map((cat, idx) => (
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
        ))}
      </div> */}

      {/* Mobile + Tablet Categories (Top) */}

      {/* Main Content */}
      <div className="flex-1 lg:ml-24 xl:ml-32 max-w-6xl">
        <h1
          ref={titleRef}
          className="mt-12 text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-8 lg:mb-12 xl:mb-16"
        >
          NEWS
        </h1>
        {!newsItems.length && (
          <div lassName="flex-1 lg:ml-24 xl:ml-32 max-w-6xl">
            <h3
              ref={titleRef}
              className="text-gray-600 mt-12 text-3xl md:text-2xl lg:text-4xl xl:text-5xl font-light mb-8 lg:mb-12 xl:mb-16"
            >
              Coming Soon...
            </h3>
          </div>
        )}
        {/* Mobile + Tablet Categories (Top) */}
        {/* <div className="flex lg:hidden overflow-x-auto gap-4 text-gray-600 mb-6">
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
        </div> */}

        <div className="flex flex-col gap-12 lg:gap-14 xl:gap-16 pr-4 lg:pr-8">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (newsItemsRef.current[idx] = el)}
              className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8"
            >
              {/* Date */}
              <div className="text-gray-500 text-xs lg:text-sm mt-2 lg:min-w-[80px]">
                {item.date}
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full lg:w-2/5 xl:w-1/2 h-48 lg:h-64 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />

              {/* Text */}
              <div className="flex-1 news-text-content">
                <h2 className="text-justify text-lg lg:text-xl xl:text-2xl font-normal mb-3 lg:mb-4 leading-tight">
                  {item.title}
                </h2>
                <p className="text-justify text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-4 lg:line-clamp-5 mb-3">
                  {item.description}
                </p>

                <button className="text-sm font-medium text-gray-800 hover:underline transition-all duration-300 hover:translate-x-2">
                  READ MORE +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
