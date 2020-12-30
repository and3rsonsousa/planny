const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        green: colors.teal,
        pink: colors.rose,
        yellow: colors.amber,
      },
      fontSize: {
        xx: ".65em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
