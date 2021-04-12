const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/*.js"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: colors.blue,
        gray: colors.blueGray,
        yellow: colors.yellow,
        rose: colors.rose,
        orange: colors.orange,
        teal: colors.teal,
        cyan: colors.cyan,
        lime: colors.lime,
        postagem: colors.purple,
        stories: colors.orange,
        evento: colors.yellow,
        meeting: colors.lime,
      },
      fontSize: {
        xx: ".65em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
