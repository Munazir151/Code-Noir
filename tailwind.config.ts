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
        noir: {
          bg: "#0a0a0f",
          panel: "#0f0f1a",
          border: "#1a1a2e",
          amber: "#d4a017",
          "amber-dim": "#8a6510",
          red: "#c0392b",
          green: "#27ae60",
          blue: "#2980b9",
          muted: "#4a4a6a",
          text: "#c8c8d4",
          "text-dim": "#6a6a8a",
        },
      },
      fontFamily: {
        mono: ["'Fira Code'", "'JetBrains Mono'", "Consolas", "monospace"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      animation: {
        flicker: "flicker 3s infinite",
        scanline: "scanline 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-in": "slideIn 0.3s ease-out",
        typewriter: "typewriter 2s steps(40) forwards",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "75%": { opacity: "0.92" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { transform: "translateX(-20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
