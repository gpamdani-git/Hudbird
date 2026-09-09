---
name: blankui-vite-tsup-bundling
description: Rules for configuring the build steps, tsup, vite, package exports, and tree-shaking optimizations in the BlankUI project.
---

# BlankUI Build, Bundling & Tree Shaking

This skill oversees how BlankUI code is packaged, compiled, and optimized for final consumption by end-users. We use `tsup` to build the internal library packages and `vite` for the documentation application.

## 1. Tsup Configuration (Library Builds)
All UI packages (e.g., `@hudbird/core`, `@hudbird/marketing`) must be compiled using `tsup`.
- **Formats**: Always target both `cjs` (CommonJS) and `esm` (ECMAScript Modules) formats.
- **Type Definitions**: Always generate `.d.ts` declaration files using the `dts: true` flag in `tsup.config.ts`.
- **"use client" Directive**: UI components inherently utilize React hooks (`useState`, `useContext`) and browser APIs. `tsup.config.ts` must inject the `"use client";` banner into output bundles so the library works flawlessly in modern SSR frameworks like Next.js App Router.
  ```typescript
  // Example tsup.config.ts
  export default defineConfig({
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      };
    },
  });
  ```

## 2. Strict Package Exports
The `package.json` of each internal package MUST utilize strict ES Module `exports` maps.
- This prevents users from doing deep, broken imports and allows build tools to accurately resolve module variants.
  ```json
  "exports": {
    ".": {
      "types": "./dist/index.d.mts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }
  ```

## 3. Vite Configuration (Applications)
Applications consuming the monorepo packages (like `apps/docs`) must resolve internal dependencies via path aliases.
- Ensure that `vite.config.ts` has proper alias configurations mapping to the internal package `src` directories for fast Hot Module Replacement (HMR) during local development.
- Always check that new packages are added to the alias array.

## Workflow Rules
1. If you create a new package or modify cross-package imports, immediately check if `package.json` exports and `vite.config.ts` aliases need updating.
2. If `pnpm build` fails, investigate circular dependencies or missing `exports` mappings.
