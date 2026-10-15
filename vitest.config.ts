import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "tests/setup.ts")],
    testTimeout: 15000,
    include: ["packages/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@hudbird/ui": path.resolve(__dirname, "packages/core/src/index.ts"),
      "@hudbird/marketing": path.resolve(__dirname, "packages/marketing/src/index.ts"),
      "@": path.resolve(__dirname, "starter-kits/pro-templates/src"),
    },
  },
});
