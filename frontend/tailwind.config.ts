// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-montserrat)',
        chewy: 'var(--font-chewy)',
      },
    },
  },
  plugins: [],
};

export default config;
