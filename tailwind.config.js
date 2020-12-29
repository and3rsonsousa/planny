module.exports = {
  purge: {
    content: ["./pages/**/*.js"],
    options: {
      safelist: [
        "bg-purple-100",
        "bg-purple-600",
        "bg-purple-900",
        "bg-green-100",
        "bg-green-600",
        "bg-green-900",
        "bg-yellow-100",
        "bg-yellow-600",
        "bg-yellow-900",
        "bg-pink-100",
        "bg-pink-600",
        "bg-pink-900",
      ],
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
