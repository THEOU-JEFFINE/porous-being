import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    sourcemap: false,

    // ✅ keep optimization but safe for React
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: ["log", "info"], // remove logs safely
        drop_debugger: true,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },

    // ✅ SAFE chunk splitting (NO React splitting)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only split heavy NON-React libraries
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("gsap")) return "gsap";
            if (id.includes("reactflow") || id.includes("@xyflow"))
              return "flow";
            if (id.includes("@emailjs")) return "email";
            // everything else stays together
            return "vendor";
          }
        },
      },
    },

    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },

  // ✅ safer dependency optimization
  optimizeDeps: {
    include: ["react", "react-dom"],
  },

  preview: {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },
});
