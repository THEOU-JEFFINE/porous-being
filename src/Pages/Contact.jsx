import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const formFieldsRef = useRef([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Left column info cards stagger
      gsap.from(leftColumnRef.current.children, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4,
      });

      // Form fields stagger
      gsap.from(formFieldsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.6,
      });

      // Map animation
      gsap.from(mapRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      title: "VISIT US",
      details: [
        "123 Business Avenue",
        "Suite 456, Floor 7",
        "New York, NY 10001",
        "United States",
      ],
    },
    {
      title: "CONTACT",
      details: [
        "hello@porousbeing.com",
        "careers@porousbeing.com",
        "+1 (555) 123-4567",
      ],
    },
    {
      title: "FOLLOW",
      details: ["Instagram", "LinkedIn", "Facebook", "Vimeo"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal mb-6"
          >
            GET IN TOUCH
          </h1>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl"
          >
            Let's discuss how we can transform your vision into porous,
            breathable spaces.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left Column - Contact Info */}
          <div ref={leftColumnRef} className="space-y-8 lg:space-y-12">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="group">
                <h3 className="text-xs font-bold tracking-wider text-black mb-4 lg:mb-5">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIdx) => (
                    <p
                      key={detailIdx}
                      className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors cursor-pointer"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Business Hours */}
            <div>
              <h3 className="text-xs font-bold tracking-wider text-black mb-4 lg:mb-5">
                HOURS
              </h3>
              <div className="space-y-2 text-sm sm:text-base text-gray-700">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div ref={rightColumnRef}>
            <form className="space-y-6">
              <div ref={(el) => (formFieldsRef.current[0] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base"
                  placeholder="John Doe"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[1] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[2] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[3] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  PURPOSE
                </label>
                <select className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base cursor-pointer">
                  <option value="">Select purpose</option>
                  <option>Student</option>
                  <option>Intern</option>
                  <option>Job</option>
                  <option>Consultant</option>
                </select>
              </div>

              <div ref={(el) => (formFieldsRef.current[4] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  PROJECT TYPE
                </label>
                <select className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base cursor-pointer">
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Landscape</option>
                  <option>Urban Planning</option>
                  <option>Other</option>
                </select>
              </div>

              <div ref={(el) => (formFieldsRef.current[5] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  MESSAGE
                </label>
                <textarea
                  rows="5"
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div
                ref={(el) => (formFieldsRef.current[6] = el)}
                className="pt-4"
              >
                <button
                  type="submit"
                  className="group relative w-full sm:w-auto px-12 py-4 bg-black text-white text-sm font-medium tracking-wider overflow-hidden transition-all duration-300 hover:bg-gray-900"
                >
                  <span className="relative z-10">SEND MESSAGE</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div
          ref={mapRef}
          className="w-full h-96 lg:h-[500px] bg-gray-200 rounded-none overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-black flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">MAP LOCATION</p>
              <p className="text-xs text-gray-500 mt-1">New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
