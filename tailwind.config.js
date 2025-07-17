/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "Serif"],
      },
      colors: {
        primary: "#ff8901",
        secondary: "#fb923c",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1em",
          sm: "2em",
          lg: "4em",
          xl: "5em",
          "2xl": "6em",
        },
      },
      animation: {
        scroll: "scroll 25s linear infinite",
        "scroll-reverse": "scroll-reverse 25s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "scroll-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      
    },
  },
  plugins: [],
};
