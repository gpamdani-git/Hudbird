import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "./",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./apps/docs/src"),
        "@hudbird/ui": path.resolve(import.meta.dirname, "./packages/core/src"),
        "@hudbird/theme": path.resolve(import.meta.dirname, "./packages/theme/src"),
        "@hudbird/marketing": path.resolve(import.meta.dirname, "./packages/marketing/src"),
        "@hudbird/schemas": path.resolve(import.meta.dirname, "./packages/schemas/src"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      strictPort: true,
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "lucide-react",
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
      ],
    },
  };
});
