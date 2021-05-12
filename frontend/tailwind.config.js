module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkBlue: '#272634',
        fintocBlue: '#475FF1',
        fintocLight: '#6A8DF9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
