import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const News = React.memo(() => {
  const newsItems = [];

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Memoized structured data
  const newsStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: "Latest News, Events & Awards",
      description:
        "Stay updated with the latest news, events, awards and lectures from Porous Being architecture practice.",
      publisher: {
        "@type": "Organization",
        name: "Porous Being",
        logo: {
          "@type": "ImageObject",
          url: "/images/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://porous-being.com/news",
      },
    }),
    [],
  );

  return (
    <>
      <Helmet>
        <title>News & Events — Porous Being | Architecture & Design</title>
        <meta
          name="description"
          content="Latest news, events, awards and lectures from Porous Being architecture practice. Stay updated with our recent projects and achievements."
        />
        <meta
          name="keywords"
          content="architecture news, design events, awards, lectures, Porous Being"
        />
        <link rel="canonical" href="https://porous-being.com/news" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="News & Events — Porous Being" />
        <meta
          property="og:description"
          content="Stay updated with the latest news, events, awards and lectures from Porous Being."
        />
        <meta property="og:url" content="https://porous-being.com/news" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News & Events — Porous Being" />
        <meta
          name="twitter:description"
          content="Latest news, events, awards and lectures from Porous Being architecture practice."
        />
        <script type="application/ld+json">
          {JSON.stringify(newsStructuredData)}
        </script>
      </Helmet>

      <motion.div
        className="flex flex-col lg:flex-row min-h-screen px-4 md:px-6 lg:px-12 xl:px-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main Content */}
        <div className="flex-1 lg:ml-24 xl:ml-32 max-w-6xl">
          <motion.h1
            className="mt-12 text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-8 lg:mb-12 xl:mb-16"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            NEWS
          </motion.h1>

          {!newsItems.length && (
            <motion.div
              className="flex-1 lg:ml-24 xl:ml-32 max-w-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-gray-600 mt-12 text-3xl md:text-2xl lg:text-4xl xl:text-5xl font-light mb-8 lg:mb-12 xl:mb-16">
                Coming Soon...
              </h3>
            </motion.div>
          )}

          <motion.div
            className="flex flex-col gap-12 lg:gap-14 xl:gap-16 pr-4 lg:pr-8"
            variants={containerVariants}
          >
            {newsItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8"
                variants={itemVariants}
              >
                {/* Date */}
                <div className="text-gray-500 text-xs lg:text-sm mt-2 lg:min-w-[80px]">
                  {item.date}
                </div>

                {/* Image */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full lg:w-2/5 xl:w-1/2 h-48 lg:h-64 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                />

                {/* Text */}
                <motion.div
                  className="flex-1"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h2 className="text-justify text-lg lg:text-xl xl:text-2xl font-normal mb-3 lg:mb-4 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-justify text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-4 lg:line-clamp-5 mb-3">
                    {item.description}
                  </p>

                  <button className="text-sm font-medium text-gray-800 hover:underline transition-all duration-300 hover:translate-x-2">
                    READ MORE +
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
});

News.displayName = "News";
export default News;
