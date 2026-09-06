cat << 'LAYOUT' > apps/docs/app/layout.tsx
import "./globals.css";

export const metadata = { title: "My UI Library", description: "UI Component Library Docs" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
LAYOUT

cat << 'GLOBALS' > apps/docs/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --primary: 99 102 241;
  }
}
GLOBALS

cat << 'POSTCSS' > apps/docs/postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = { plugins: { tailwindcss: {}, autoprefixer: {} } };
export default config;
POSTCSS

cat << 'TAILWIND' > apps/docs/tailwind.config.ts
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "../../packages/core/src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { background: "hsl(var(--background))", foreground: "hsl(var(--foreground))", border: "hsl(var(--border))" } } },
  plugins: [],
} satisfies Config;
TAILWIND
