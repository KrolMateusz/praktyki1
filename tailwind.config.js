module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        warning: "var(--warning)",
        seperator: "var(--separator)",
        "dark-gray": "var(--dark-gray)",
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
