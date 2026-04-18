/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        hash: {
          black: "#050505",
          onyx: "#0a0a0a",
          dark: "#111111",
          gray: "#1a1a1a",
          gold: "#d4af37",
          goldLight: "#f5d77a",
          goldDeep: "#b8860b",
          champagne: "#e7c97a",
          ivory: "#f5ecd2"
        }
      },
      fontFamily: {
        display: ['"Cinzel"', "serif"],
        serif: ['"Cormorant Garamond"', "serif"],
        script: ['"Great Vibes"', "cursive"],
        tangerine: ['"Tangerine"', "cursive"],
        body: ['"Inter"', "sans-serif"]
      },
      boxShadow: {
        gold: "0 0 40px rgba(212,175,55,0.35)",
        goldSoft: "0 0 20px rgba(212,175,55,0.25)",
        goldStrong: "0 0 60px rgba(212,175,55,0.55)",
        inner1: "inset 0 1px 0 rgba(255,255,255,0.08)"
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #b8860b 0%, #d4af37 35%, #f5d77a 60%, #d4af37 85%, #8a6a10 100%)",
        "radial-gold":
          "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(circle at 70% 80%, rgba(212,175,55,0.1), transparent 60%)"
      }
    }
  },
  plugins: []
};
