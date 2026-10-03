import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false,
  clean: true,
  external: ["react", "react-dom", "@hudbird/marketing"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
