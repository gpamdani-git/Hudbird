import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@hudbird/ui": path.resolve(import.meta.dirname, "../../packages/core/src"),
      "@hudbird/theme": path.resolve(import.meta.dirname, "../../packages/theme/src"),
      "@hudbird/marketing": path.resolve(import.meta.dirname, "../../packages/marketing/src"),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
  },
});
