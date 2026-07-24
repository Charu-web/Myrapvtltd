/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          red: "#C81E2A",
          "red-dark": "#7A0F17",
          "red-darker": "#4A090F",
          amber: "#F5A623",
          orange: "#E8622C",
        },
        ink: {
          900: "#141414",
          700: "#3A3A3A",
          500: "#7A7A7A",
          300: "#B7B7B7",
          100: "#EDEDED",
        },
      },
      borderRadius: {
        "4xl": "30px",
        "5xl": "36px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(20, 20, 20, 0.05)",
        panel: "0 10px 40px rgba(20, 20, 20, 0.06)",
        sidebar: "0 20px 50px rgba(122, 15, 23, 0.25)",
      },
      backgroundImage: {
        "sidebar-gradient":
          "linear-gradient(165deg, #E42C3A 0%, #B01C28 38%, #7A0F17 72%, #4A090F 100%)",
        "campaign-gradient":
          "linear-gradient(135deg, #E5303D 0%, #C41E2A 45%, #8A1119 100%)",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
