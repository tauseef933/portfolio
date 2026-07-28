import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080B12",
        panel: "#10141F",
        panel2: "#141928",
        border: "#1E2536",
        ink: "#E7EAF2",
        muted: "#8A93A8",
        faint: "#5B6377",
        signal: "#4FD9C7",
        signalDim: "#2E9E92",
        highlight: "#F0B429",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        grain: "url('/noise.svg')",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
