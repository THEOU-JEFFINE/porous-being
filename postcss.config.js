module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

// Alternative if @tailwindcss/postcss is not available:
// module.exports = {
//   plugins: {
//     'postcss-import': {},
//     'tailwindcss/nesting': {},
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };
