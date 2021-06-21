module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: "#4118EA",
        warning: "#FF6565",
        seperator: "#e5e5e5",
        "dark-gray": "#343434",
      },
      fontSize: {
        base: "1.8rem",
        large: "2rem",
        xl: "4.8rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
