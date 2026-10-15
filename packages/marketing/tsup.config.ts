import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    saas: "src/blocks/SaaS/index.ts",
    fintech: "src/blocks/Fintech/index.ts",
    ecommerce: "src/blocks/Ecommerce/index.ts",
    ai: "src/blocks/AiStartup/index.ts",
    agency: "src/blocks/Agency/index.ts",
    hospitality: "src/blocks/Hospitality/index.ts",
    admin: "src/blocks/AdminCms/index.ts",
    "modern-app": "src/blocks/ModernApp/index.ts",
    "3d": "src/3d/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "@hudbird/marketing"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
