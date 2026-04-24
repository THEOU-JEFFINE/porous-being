/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    unoptimized: true, // Necessary when exporting static files or using custom image loader
  },

  // Compression configuration
  compress: true,

  // Header configuration for security and optimization
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "https://porousbeing.com",
  },

  // Webpack configuration for optimization
  webpack: (config, { isServer }) => {
    // Custom webpack optimizations can be added here
    return config;
  },
};

module.exports = nextConfig;
