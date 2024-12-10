/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ubuntu': 'Ubuntu'
      },
      colors: {
        'lnk-dark': '#0B192C',
        'lnk-dark-gray': '#1E3E62',
        'lnk-orange': '#FF6500',
        'lnk-white': '#F5F5F7',
        'lnk-gray': '#E4E0E1'
      },
      boxShadow: {
        'bottom': '0 -37px 61px -9px #1E3E62',
      },
      screens: {
        'xs': '450px'
      }
    },
  },
  plugins: [],
}

