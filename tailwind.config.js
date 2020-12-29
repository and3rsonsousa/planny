module.exports = {
  purge: {
    content: ["./pages/**/*.js"],
    options: {
      safelist: ["bg-purple-100", "bg-purple-600"],
    },
  },

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
