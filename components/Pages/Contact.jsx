"use client";

import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, easeOut } from "framer-motion";

const Contact = React.memo(() => {
  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.1 },
    }),
  };

  // Memoized contact info
  const contactInfo = useMemo(
    () => [
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
    ],
    [],
  );

  // Memoized structured data
  const contactStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Porous Being",
      description: "Get in touch with Porous Being architecture practice.",
      url: "https://porous-being.com/contact",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "udhay@porousbeing.com",
        telephone: "+91 90805 94783",
        address: {
          "@type": "PostalAddress",
          streetAddress: "No. 2 Susila Nagar, behind NSN Matriculation School",
          addressLocality: "Chromepet",
          addressRegion: "TN",
          postalCode: "600044",
          addressCountry: "IN",
        },
      },
    }),
    [],
  );
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
      `New Contact Form Submission from ${data.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Purpose: ${data.purpose}\n` +
        `Project Type: ${data.projectType}\n\n` +
        `Message:\n${data.message}`,
    );

    const mailtoLink = `mailto:udhay@porousbeing.com,suresh@porousbeing.com?subject=${subject}&body=${body}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Optional: Reset form after submission
    setTimeout(() => {
      e.target.reset();
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Porous Being | Architecture & Design</title>
        <meta
          name="description"
          content="Get in touch with Porous Being architecture practice. We're here to discuss your vision for porous, breathable spaces. Located in Chennai, India."
        />
        <meta
          name="keywords"
          content="contact architecture, design consultation, Porous Being, Chennai"
        />
        <link rel="canonical" href="https://porous-being.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us — Porous Being" />
        <meta
          property="og:description"
          content="Get in touch with our architecture practice. Let's discuss transforming your vision into breathable spaces."
        />
        <meta property="og:url" content="https://porous-being.com/contact" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us — Porous Being" />
        <meta
          name="twitter:description"
          content="Contact Porous Being architecture practice for your project consultation."
        />
        <script type="application/ld+json">
          {JSON.stringify(contactStructuredData)}
        </script>
      </Helmet>

      <motion.div
        className="min-h-screen bg-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-12 sm:py-16 lg:py-24">
          {/* Header */}
          <motion.div className="mb-16 lg:mb-24">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal mb-6"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: easeOut }}
            >
              GET IN TOUCH
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
            >
              Let's discuss how we can transform your vision into porous,
              breathable spaces.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20"
            variants={containerVariants}
          >
            {/* Left Column - Contact Info */}
            <motion.div className="space-y-8 lg:space-y-12">
              {contactInfo.map((info, idx) => (
                <motion.div key={idx} className="group" variants={itemVariants}>
                  <h3 className="text-xs font-bold tracking-wider text-black mb-4 lg:mb-5">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIdx) => (
                      <motion.p
                        key={detailIdx}
                        className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: detailIdx * 0.05,
                        }}
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
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Business Hours */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xs font-bold tracking-wider text-black mb-4 lg:mb-5">
                  HOURS
                </h3>
                <div className="space-y-2 text-sm sm:text-base text-gray-700">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div
                  custom={0}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                >
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
                </motion.div>

                <motion.div
                  custom={1}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                >
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
                </motion.div>

                <motion.div
                  custom={2}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                >
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
                </motion.div>

                <motion.div
                  custom={3}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                >
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
                </motion.div>

                <motion.div
                  custom={4}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                >
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
                </motion.div>

                <motion.div
                  custom={5}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="block text-xs font-bold tracking-wider text-black mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent text-base resize-none"
                    placeholder="Tell us about your project..."
                  />
                </motion.div>

                <motion.div
                  custom={6}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-4"
                >
                  <button
                    type="submit"
                    className="group relative w-full sm:w-auto px-12 py-4 bg-black text-white text-sm font-medium tracking-wider overflow-hidden transition-all duration-300 hover:bg-gray-900"
                  >
                    <span className="relative z-10">SEND MESSAGE</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            className="w-full h-96 lg:h-[500px] bg-gray-200 rounded-none overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
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
          </motion.div>
        </div>
      </motion.div>
    </>
  );
});

Contact.displayName = "Contact";
export default Contact;
