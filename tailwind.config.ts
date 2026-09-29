import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F8F5EF",
          50: "#FFFFFF",
          100: "#FDFCF9",
          200: "#F8F5EF",
          300: "#EFE9DE",
          400: "#E3DDD3",
        },
        sand: {
          DEFAULT: "#EFE9DE",
          light: "#F5F1E9",
          dark: "#E1D7C6",
        },
        charcoal: {
          DEFAULT: "#191817",
          dark: "#151313",
          surface: "#211C1B",
          border: "#332B2A",
          muted: "#2C2725",
        },
        burgundy: {
          DEFAULT: "#651F2A",
          dark: "#4E1720",
          light: "#8B3A46",
          soft: "#F8EDEE",
        },
        maroon: {
          DEFAULT: "#8B3A46",
          dark: "#651F2A",
          light: "#A24B57",
        },
        gold: {
          DEFAULT: "#B8955A",
          light: "#D4B67D",
          dark: "#967844",
          soft: "#F9F5EC",
        },
        sage: {
          DEFAULT: "#66735D",
          light: "#829077",
          soft: "#EEF2EC",
        },
        bmBorder: {
          DEFAULT: "#E3DDD3",
          dark: "#332B2A",
        },
        bmText: {
          primary: "#1D1B1A",
          secondary: "#6E6963",
          muted: "#9E978E",
          darkPrimary: "#F8F5EF",
          darkSecondary: "#B8B2AA",
        },
        bmSuccess: "#55705B",
        bmError: "#A44747",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Manrope", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(25, 24, 23, 0.05)",
        card: "0 4px 20px -4px rgba(25, 24, 23, 0.07)",
        elevated: "0 10px 30px -6px rgba(25, 24, 23, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
