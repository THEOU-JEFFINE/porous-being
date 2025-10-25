import React, { useRef } from "react";

export default function About() {
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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
  return (
    <div className="min-h-screen bg-white">
      {/* Main content container */}
      <div className="max-w-7xl mx-auto lg:ml-30 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        {/* Large "ABOUT" heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-black mb-6 sm:mb-8 lg:mb-10">
          ABOUT
        </h1>

        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8">
            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
              The escalating complexity of the world and the accelerating speed
              of change exceed any individual's capacity to comprehend. For
              architects operating today, the Golden Ratio is no longer the
              standard - rather, the UN's 17 Sustainable Development Goals are.
              From a single elegant equation, architects are now held to
              multidimensional success criteria with almost infinite variables.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
              Since sustainability is inherently a question of complex systems,
              circular design, and holistic thinking, no single person holds the
              solution. As architects and urbanists, we must team with
              scientists, engineers with biologists, politicians with
              entrepreneurs, to combine skill sets and perspectives, knowledge
              and sensibility, to match the complexity of the challenges we
              face. As future formgivers, we won't be defined by our individual
              talents or singular skill sets - but rather by our capacity to
              pool the skills of the many to give our future form.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">
            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
              BIG has grown organically over the last two decades from a
              founder, to a family, to a force of 700. Our latest transformation
              is the BIG LEAP: Bjarke Ingels Group of Landscape, Engineering,
              Architecture, Planning and Products. A plethora of in-house
              perspectives allows us to see what none of us would be able to see
              on our own. The sum of our individual talents becomes our
              collective creative genius. A small step for each of us becomes a
              BIG LEAP for all of us.
            </p>

            {/* Signature section */}
            <div className="pt-2">
              <p className="text-base lg:text-lg font-semibold text-black font-sans">
                Bjarke Ingels
              </p>
              <p className="text-base lg:text-lg text-gray-700 font-sans">
                Founder & Creative Director
              </p>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-10 sm:mt-16 lg:mt-20">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
            alt="Architecture"
            className="w-full h-48 sm:h-64 lg:h-96 rounded-none object-cover"
          />
        </div>

        {/*one by onw topics*/}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mt-8 sm:mt-10 lg:mt-12 mb-4 sm:mb-5">
            LANDSCAPE
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Left Column */}
            <div className="space-y-6 lg:space-y-8">
              <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
                As public space and biodiversity are subtracted in urban spaces,
                BIG Landscape works with architects and other disciplines to
                integrate the built and natural worlds, connecting people to
                people, and people to nature. With every project, we go beyond
                the brief to give the gift of public space to the communities in
                which we work, creating equitable and accessible public spaces
                for all.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6 lg:space-y-8">
              <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed font-sans">
                Our work not only responds to challenges today, it mitigates
                challenges of the future: we approach every project as an
                opportunity to use nature-based solutions for social and
                technological integration, community building, ecology
                preservation, biophilia and biodiversity enhancement to design
                sustainable, smarter and safer cities.
              </p>
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
            }}>
            <style>
              {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
            </style>
            <div
              className="flex gap-4 sm:gap-6 lg:gap-8"
              style={{ minWidth: "fit-content" }}>
              {/* PUBLIC REALM + */}
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-96">
                <div
                  className="rounded-none overflow-hidden"
                  style={{ border: "none" }}>
                  <img
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Public Realm"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-none pointer-events-none"
                  />
                </div>
                <div className="flex items-center mt-3 sm:mt-4">
                  <div className="w-2 h-2 bg-black mr-2"></div>
                  <p className="text-base sm:text-lg font-normal text-black font-sans">
                    PUBLIC REALM +
                  </p>
                </div>
              </div>

              {/* PARKS + */}
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-96">
                <div
                  className="rounded-none overflow-hidden"
                  style={{ border: "none" }}>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1732835620501-116098579418?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=464"
                    alt="Parks"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-none pointer-events-none"
                  />
                </div>
                <div className="flex items-center mt-3 sm:mt-4">
                  <div className="w-2 h-2 bg-black mr-2"></div>
                  <p className="text-base sm:text-lg font-normal text-black font-sans">
                    PARKS +
                  </p>
                </div>
              </div>

              {/* GARDENS + */}
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-96">
                <div
                  className="rounded-none overflow-hidden"
                  style={{ border: "none" }}>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1739452120449-9f79dc47a62e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
                    alt="Gardens"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-none pointer-events-none"
                  />
                </div>
                <div className="flex items-center mt-3 sm:mt-4">
                  <div className="w-2 h-2 bg-black mr-2"></div>
                  <p className="text-base sm:text-lg font-normal text-black font-sans">
                    GARDENS +
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
