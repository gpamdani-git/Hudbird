import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "../../packages/core/src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { background: "hsl(var(--background))", foreground: "hsl(var(--foreground))", border: "hsl(var(--border))" } } },
  plugins: [],
} satisfies Config;
