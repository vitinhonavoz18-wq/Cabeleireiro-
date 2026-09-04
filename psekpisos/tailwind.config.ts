import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        gold: {
          50: "#FFF9E0",
          100: "#FFF0B3",
          200: "#FFE07A",
          300: "#FFD24D",
          400: "#FFC72C",
          500: "#F5B301",
          600: "#D69B00",
          700: "#A97900",
          800: "#7A5800",
          900: "#4A3600",
        },
        graphite: {
          900: "#0B0B0C",
          800: "#141416",
          700: "#1C1C20",
          600: "#26262B",
          500: "#3A3A42",
          400: "#54545E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        gold: "0 20px 60px -20px rgba(245,179,1,0.35)",
        deep: "0 30px 80px -30px rgba(0,0,0,0.55)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg,#FFE07A 0%,#F5B301 45%,#A97900 100%)",
        "gold-shine":
          "linear-gradient(120deg,#FFF9E0 0%,#F5B301 40%,#7A5800 80%,#FFC72C 100%)",
        "hero-vignette":
          "radial-gradient(ellipse at center,transparent 0%,rgba(0,0,0,0.55) 65%,rgba(0,0,0,0.85) 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
