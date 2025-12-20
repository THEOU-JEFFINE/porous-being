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

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      purpose: formData.get("purpose"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
    };

    // Create mailto link with all the information
    const subject = encodeURIComponent(
      `New Contact Form Submission from ${data.name}`
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Purpose: ${data.purpose}\n` +
        `Project Type: ${data.projectType}\n\n` +
        `Message:\n${data.message}`
    );

    const mailtoLink = `mailto:udhay@porousbeing.com,suresh@porousbeing.com?subject=${subject}&body=${body}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Optional: Reset form after submission
    setTimeout(() => {
      e.target.reset();
    }, 1000);
  };

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
        "No. 2 Susila Nagar,",
        "behind NSN Matriculation School,",
        "Chromepet,",
        "Chennai-600044",
      ],
    },
    {
      title: "CONTACT",
      details: [
        "udhay@porousbeing.com",
        "suresh@porousbeing.com",
        "+91 90805 94783",
      ],
    },
    {
      title: "FOLLOW",
      details: ["Instagram"],
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
                      {detail === "Instagram" ? (
                        <a
                          href="https://www.instagram.com/porous_being?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div ref={(el) => (formFieldsRef.current[0] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  YOUR NAME <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base"
                  placeholder="John Doe"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[1] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  EMAIL ADDRESS <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[2] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  PHONE NUMBER <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[3] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  PURPOSE <span className="text-red-600">*</span>
                </label>
                <select
                  name="purpose"
                  required
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base cursor-pointer"
                >
                  <option value="">Select purpose</option>
                  <option>Student</option>
                  <option>Intern</option>
                  <option>Job</option>
                  <option>Consultant</option>
                </select>
              </div>

              <div ref={(el) => (formFieldsRef.current[4] = el)}>
                <label className="block text-xs font-bold tracking-wider text-black mb-2">
                  PROJECT TYPE <span className="text-red-600">*</span>
                </label>
                <select
                  name="projectType"
                  required
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base cursor-pointer"
                >
                  <option value="">Select project type</option>
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
                  name="message"
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
          <iframe
            src="https://maps.google.com/maps?q=POROUS+BEING+Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
