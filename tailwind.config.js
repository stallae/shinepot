import colors from './src/assets/styles/colors.tsx';
import nativewindPreset from 'nativewind/preset';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [nativewindPreset],
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
