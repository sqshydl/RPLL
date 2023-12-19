module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'nishiki-1': '#127369',
        'nishiki-2': '#10403B',
        'nishiki-3': '#8AA6A3',
        'nishiki-4': '#4C5958',
        'nishiki-5': '#BFBFBF',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}