import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "../../public",
  resolve: {
    dedupe: ["three"],
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@hudbird/ui": path.resolve(import.meta.dirname, "../../packages/core/src"),
      "@hudbird/theme": path.resolve(import.meta.dirname, "../../packages/theme/src"),
      "@hudbird/marketing": path.resolve(import.meta.dirname, "../../packages/marketing/src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {},
    },
  },
});
