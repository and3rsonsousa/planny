module.exports = {
  purge: [
    {
      content: ["./pages/**/*.js"],
      safelist: [/purple\-100/, /purple\-600/],
    },
  ],
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
