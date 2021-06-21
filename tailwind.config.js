module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

      //add bg-<class-name> to class
      colors: {
        'main-color': "#4118EA",
        'warning-color': '#FF6565',
        'basic-font-color:': '#343434',
        'seperator-color': "#e5e5e5",
      },
      fontSize: {
        'base': '18px',
        'large': '20px',
        'xl': '48px'

      }, fontFamily: {
        'sans': ['Ubuntu', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
