/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', "sans-serif"],
        condensed: ['"IBM Plex Sans Condensed"', "sans-serif"],
      },
      colors: {
        amber: {
          50: "#fcf9e9",
          100: "#f6ecc3",
          200: "#edda95",
          300: "#e3c262",
          400: "#daa737",
          500: "#ae7b00",
          600: "#8c6300",
          700: "#704f00",
          800: "#563d00",
          900: "#3d2b00",
          950: "#241900",
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-surface": "pulseSurface 8s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseSurface: {
          "0%":   { opacity: "0" },
          "15%":  { opacity: "1" },
          "40%":  { opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
