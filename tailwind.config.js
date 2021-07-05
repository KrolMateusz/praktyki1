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
        base: "1.6rem",
        large: "2rem",
        xl: "4.8rem",
      },
      spacing: {
        22: "5.5rem",
        120: "30rem",
        124: "31rem",
        128: "32rem",
        136: "34rem",
        144: "38rem",
        152: "38rem",
        160: "40rem",
        220: "50rem",
      },
      height: {
        chart: "60rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
