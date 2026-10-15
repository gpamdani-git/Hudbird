#!/usr/bin/env node

/**
 * sync-starter-kit.js
 *
 * Automatically synchronizes UI components from packages/core (Single Source of Truth)
 * into starter-kits/pro-templates/src/components/ui/.
 *
 * Ensures the Pro Starter Kit always has 100% identical, up-to-date UI components
 * without manual duplicate maintenance.
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const CORE_COMPONENTS_DIR = path.resolve(ROOT_DIR, "packages/core/src/components");
const CORE_UTILS_DIR = path.resolve(ROOT_DIR, "packages/core/src/utils");
const STARTER_UI_DIR = path.resolve(ROOT_DIR, "starter-kits/pro-templates/src/components/ui");
const STARTER_LIB_DIR = path.resolve(ROOT_DIR, "starter-kits/pro-templates/src/lib");

function transformComponentContent(content) {
  let transformed = content;

  // Transform core relative cn utility to starter-kit @/lib/cn
  transformed = transformed.replace(/from\s+["'](\.\.\/)+utils\/cn["']/g, 'from "@/lib/cn"');
  transformed = transformed.replace(/from\s+["']@hudbird\/ui\/utils\/cn["']/g, 'from "@/lib/cn"');

  return transformed;
}

function syncDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      syncDirectory(srcPath, destPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
      !entry.name.endsWith(".test.tsx") &&
      !entry.name.endsWith(".test.ts")
    ) {
      const raw = fs.readFileSync(srcPath, "utf-8");
      const transformed = transformComponentContent(raw);

      // Only write if changed or does not exist
      if (!fs.existsSync(destPath) || fs.readFileSync(destPath, "utf-8") !== transformed) {
        fs.writeFileSync(destPath, transformed, "utf-8");
      }
    }
  }
}

function syncStarterKit() {
  console.log("🦅 Synchronizing @hudbird/ui components into starter-kits/pro-templates...");

  if (!fs.existsSync(CORE_COMPONENTS_DIR)) {
    console.error(`Error: Core components directory not found at ${CORE_COMPONENTS_DIR}`);
    process.exit(1);
  }

  // 1. Sync all components
  syncDirectory(CORE_COMPONENTS_DIR, STARTER_UI_DIR);

  // 2. Ensure cn.ts exists in starter-kit lib
  if (!fs.existsSync(STARTER_LIB_DIR)) {
    fs.mkdirSync(STARTER_LIB_DIR, { recursive: true });
  }
  const coreCnPath = path.join(CORE_UTILS_DIR, "cn.ts");
  const starterCnPath = path.join(STARTER_LIB_DIR, "cn.ts");
  if (fs.existsSync(coreCnPath)) {
    fs.copyFileSync(coreCnPath, starterCnPath);
  }

  const totalComponents = fs
    .readdirSync(CORE_COMPONENTS_DIR)
    .filter((f) => fs.statSync(path.join(CORE_COMPONENTS_DIR, f)).isDirectory()).length;
  console.log(
    `✔ All ${totalComponents} core UI components and utilities synchronized successfully!`
  );
}

syncStarterKit();
