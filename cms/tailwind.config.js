/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**{.js}', './pages/**/*{.js}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cmyk'],
  },
};
