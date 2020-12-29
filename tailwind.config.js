module.exports = {
  purge: {
    content: ["./pages/**/*.js"],
    options: {
      safelist: [
        "bg-purple-100",
        "bg-purple-500",
        "bg-purple-900",
        "bg-green-100",
        "bg-green-500",
        "bg-green-900",
        "bg-yellow-100",
        "bg-yellow-500",
        "bg-yellow-900",
        "bg-pink-100",
        "bg-pink-500",
        "bg-pink-900",
        "text-purple-100",
        "text-purple-500",
        "text-purple-900",
        "text-green-100",
        "text-green-500",
        "text-green-900",
        "text-yellow-100",
        "text-yellow-500",
        "text-yellow-900",
        "text-pink-100",
        "text-pink-500",
        "text-pink-900",
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
