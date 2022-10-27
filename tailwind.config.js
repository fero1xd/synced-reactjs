/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        inria: ['Inria Sans', 'sans-serif'],
      },
      colors: {
        darkAccent: '#131313',
        primaryBtn: '#0077FF',
        primaryBtnHvr: '#014a9c',
        input: '#151515',
        link: '#014A9C',
        modal: '#000000e3',
      },
      fontSize: {
        heading: '33px',
      },
    },
  },
  plugins: [],
};
