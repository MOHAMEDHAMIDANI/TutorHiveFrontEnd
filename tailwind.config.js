/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary1: '#69CBF7',
        primary2: '#69CBF7',
        secondary1: '#1E1E1E',
        secondary2: '#F2F2F2',
        secondary3: '#939393',
        nutaral: '#FFFFFF',
      },
      rotate : {
        7 : '5deg',
      }

    },
  },
  plugins: [],
}

