/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      colors: {
        brand: {
          DEFAULT: '#1C5D99',
          light: '#4A90E2',
          dark: '#0F3D6B',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
});
