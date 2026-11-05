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
        ...Object.fromEntries(
          Object.entries({
            saas: "SaaS",
            fintech: "Fintech",
            ecommerce: "Ecommerce",
            ai: "AiStartup",
            "ai-startup": "AiStartup",
            agency: "Agency",
            hospitality: "Hospitality",
            admin: "AdminCms",
            "admin-cms": "AdminCms",
            "modern-app": "ModernApp",
          }).map(([name, directory]) => [
            `@hudbird/marketing/${name}`,
            path.resolve(
              import.meta.dirname,
              `./packages/marketing/src/blocks/${directory}/index.ts`
            ),
          ])
        ),
        "@hudbird/marketing/3d": path.resolve(
          import.meta.dirname,
          "./packages/marketing/src/3d/index.ts"
        ),
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
