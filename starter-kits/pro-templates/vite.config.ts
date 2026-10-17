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
      "@hudbird/schemas": path.resolve(import.meta.dirname, "../../packages/schemas/src"),
      "@hudbird/marketing/saas": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/SaaS"
      ),
      "@hudbird/marketing/fintech": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/Fintech"
      ),
      "@hudbird/marketing/ecommerce": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/Ecommerce"
      ),
      "@hudbird/marketing/ai": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/AiStartup"
      ),
      "@hudbird/marketing/ai-startup": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/AiStartup"
      ),
      "@hudbird/marketing/agency": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/Agency"
      ),
      "@hudbird/marketing/hospitality": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/Hospitality"
      ),
      "@hudbird/marketing/admin": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/AdminCms"
      ),
      "@hudbird/marketing/admin-cms": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/AdminCms"
      ),
      "@hudbird/marketing/modern-app": path.resolve(
        import.meta.dirname,
        "../../packages/marketing/src/blocks/ModernApp"
      ),
      "@hudbird/marketing/3d": path.resolve(import.meta.dirname, "../../packages/marketing/src/3d"),
      "@hudbird/marketing": path.resolve(import.meta.dirname, "../../packages/marketing/src"),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
  },
  optimizeDeps: {
    exclude: ["@hudbird/schemas", "@hudbird/ui"],
  },
});
