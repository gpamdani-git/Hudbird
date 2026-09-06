import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
    "../../packages/core/src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: { 
    extend: { 
      colors: { 
        background: "hsl(var(--background))", 
        foreground: "hsl(var(--foreground))", 
        border: "hsl(var(--border))" 
      } 
    } 
  },
  plugins: [],
} satisfies Config;
