// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/@heroui/theme/dist/components/navbar.js"],
  theme: {
    extend: {
      fontFamily: {
        abel: ["Abel", "sans-serif"],
        ephesis: ["Ephesis", "cursive"],
        inter: ["Inter", "sans-serif"],
        italiana: ["Italiana", "serif"],
        jacques: ['"Jacques Francois"', "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        tienne: ["Tienne", "serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
