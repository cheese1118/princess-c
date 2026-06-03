/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f0d0b",
        ivory: "#f3ede2",
        porcelain: "#fffaf1",
        champagne: "#c7a976",
        blush: "#c98f82",
        wine: "#6b3432",
        smoke: "#9aa1a0",
        glass: "rgba(255,255,255,.18)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Didot",
          "Bodoni 72",
          "Bodoni Moda",
          "Times New Roman",
          "serif",
        ],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 28px 80px rgba(10, 8, 6, .22)",
        soft: "0 18px 52px rgba(31, 24, 18, .14)",
      },
    },
  },
  plugins: [],
};
