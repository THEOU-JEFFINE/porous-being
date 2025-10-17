// In tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'ui-sans-serif', 'system-ui'],
          sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        },
      },
    },
    plugins: [],
  }