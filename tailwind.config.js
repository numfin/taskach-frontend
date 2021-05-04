const colors = require("tailwindcss/colors");
const theme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#e26777",
          light: "#fda0ac",
          dark: "#bb4656",
        },
      },
    },
    fontFamily: {
      sans: ["Overpass", ...theme.fontFamily.sans],
    },
    fontSize: {
      sm: ".75rem",
      DEFAULT: [".875rem", { lineHeight: "1.25rem" }],
      xl: ["1.125rem", { lineHeight: "1.75rem" }],
      xl2: ["1.5rem", { lineHeight: "2.25rem" }],
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1366px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
