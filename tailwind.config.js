/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: '#F4F4F4',
        mint: '#A2D89E',
        pink: '#FDC5CC',
        purple: '#AD95D0',
        'mid-blue': '#3c6ca8',
        'light-brown': '#D1C49E',
        'verylight-blue': '#E4EAF2',
        'medium-grey': '#7B7B7B',
        'dark-blue': '#3C6CA8',
        'blue-light': '#5B99E7',
      },
      fontFamily: {
        sans: ['quicksand'],
        handwritten: ['Lazydog', 'cursive'],
      },
    },
  },
  plugins: [],
};
