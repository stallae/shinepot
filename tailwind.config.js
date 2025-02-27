const colors = require('./src/assets/styles/colors.tsx').colors;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        roboto: ['Roboto'],
        heptaSlab: ['HeptaSlab'],
      },
      colors: colors,
    },
  },
  plugins: [],
};
