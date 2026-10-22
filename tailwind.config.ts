import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "#F8F5F0",
        ivory: "#F1EBE3",
        "ivory-light": "#FAF7F2",
        espresso: {
          DEFAULT: "#30231F",
          dark: "#221815",
          light: "#4A3934",
          muted: "#6E5B55",
        },
        rose: {
          muted: "#C7A19A",
          soft: "#D8BCB6",
          blush: "#E8D8D4",
        },
        mauve: {
          dusty: "#A88983",
          light: "#C2A8A3",
        },
        taupe: {
          DEFAULT: "#B6A69A",
          light: "#CCC0B6",
          warm: "#8C7B71",
        },
        stone: {
          hairline: "#E6DED8",
          subtle: "#DDD3CA",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.22em",
        ultra: "0.3em",
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "1.9",
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(48, 35, 31, 0.08)",
        "editorial-hover": "0 25px 50px -12px rgba(48, 35, 31, 0.15)",
        subtle: "0 4px 20px -2px rgba(48, 35, 31, 0.04)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fadeUp: "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
