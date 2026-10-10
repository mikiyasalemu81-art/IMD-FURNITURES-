import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0B",
        surface: "#141414",
        "surface-elevated": "#1C1C1C",
        gold: {
          DEFAULT: "#C9A24B",
          hover: "#E0BB63",
          light: "#F0D78C",
          dark: "#997528",
        },
        cream: {
          DEFAULT: "#F5F1E8",
          muted: "#9A9588",
          dark: "#68645C",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        ethiopic: ["var(--font-noto-ethiopic)", "Noto Sans Ethiopic", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(201, 162, 75, 0.18)",
        "gold-glow-lg": "0 0 45px rgba(201, 162, 75, 0.28)",
      },
      borderColor: {
        "gold-subtle": "rgba(201, 162, 75, 0.22)",
        "gold-strong": "rgba(201, 162, 75, 0.55)",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
