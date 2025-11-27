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
  plugins: [
    function ({addUtilities, theme}) {
      addUtilities({
        '.text-heading-lg': {
          fontFamily: theme('fontFamily.inter'),
          fontSize: theme('fontSize.3xl[0]'),
          fontWeight: theme('fontWeight.bold'),
        },
        '.text-body-primary': {
          fontFamily: theme('fontFamily.inter'),
          fontSize: theme('fontSize.xl[0]'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.text-heading-sm': {
          fontFamily: theme('fontFamily.inter'),
          fontSize: theme('fontSize.base[0]'),
          fontWeight: theme('fontWeight.bold'),
        },
        '.text-body-secondary': {
          fontFamily: theme('fontFamily.inter'),
          fontSize: theme('fontSize.base[0]'),
          fontWeight: theme('fontWeight.medium'),
        },
      });
    },
  ],
};
