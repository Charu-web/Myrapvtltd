import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        muted: "hsl(var(--muted))",
        brand: {
          50: "#fff1f1",
          100: "#ffe0e0",
          200: "#ffc6c6",
          300: "#ff9d9d",
          400: "#fb6a6a",
          500: "#ef3d3d",
          600: "#d81e28",
          700: "#b3121e",
          800: "#8f121e",
          900: "#5c0d15",
          950: "#3a060c"
        }
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(160deg, #8f121e 0%, #b3121e 35%, #d81e28 70%, #7a0c0c 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(216,30,40,0.12) 0%, rgba(122,12,12,0.05) 100%)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(90,10,15,0.15)",
        card: "0 2px 10px rgba(0,0,0,0.06)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out forwards"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
