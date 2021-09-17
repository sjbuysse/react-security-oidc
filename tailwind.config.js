module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#E37C30',
          400: '#63b3ed',
          500: '#E7904B',
          600: '#3182ce',
          700: '#EAB285',
          800: '#2c5282',
          900: '#F7D1A7',
        },
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
