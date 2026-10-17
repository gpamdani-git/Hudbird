#!/usr/bin/env node

/**
 * pack-monorepo.js
 *
 * Packages the entire Hudbird UI Pro monorepo into a clean, standalone,
 * lightweight ZIP distribution archive ready for Gumroad / LemonSqueezy.
 *
 * Automatically excludes node_modules, git histories, local caches, logs,
 * and build artifacts.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const RELEASES_DIR = path.resolve(ROOT_DIR, "dist-releases");

function packMonorepo() {
  console.log("🦅 Packaging Hudbird UI Pro Monorepo for Gumroad distribution...\n");

  // 1. Ensure dist-releases directory exists
  if (!fs.existsSync(RELEASES_DIR)) {
    fs.mkdirSync(RELEASES_DIR, { recursive: true });
  }

  const version = "1.5.0";
  const dateStr = new Date().toISOString().split("T")[0];
  const zipName = `hudbird-ui-pro-monorepo-v${version}-${dateStr}.zip`;
  const latestZipName = "hudbird-ui-pro-monorepo-latest.zip";

  const zipPath = path.join(RELEASES_DIR, zipName);
  const latestZipPath = path.join(RELEASES_DIR, latestZipName);

  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  if (fs.existsSync(latestZipPath)) fs.unlinkSync(latestZipPath);

  // 2. Define strict exclusion rules
  const excludePatterns = [
    // Build artifacts (root, apps, packages, starter-kits)
    "dist/*",
    "*/dist/*",
    "*/*/dist/*",
    "*/*/*/dist/*",
    "build/*",
    "*/build/*",

    // Internal AI tools & graph outputs
    "graphify-out/*",
    "*/graphify-out/*",

    // Dependencies & caches
    "node_modules",
    "node_modules/*",
    "*/node_modules/*",
    "*/*/node_modules/*",
    "*/*/*/node_modules/*",
    ".pnpm-store/*",
    "*/.pnpm-store/*",
    ".turbo/*",
    "*/.turbo/*",
    "*/*/turbo/*",
    ".cache/*",
    "*/.cache/*",

    // Git & CI
    ".git/*",
    "*/.git/*",
    ".github/*",
    ".husky/_/*",

    // Releases & archives
    "dist-releases/*",
    "*.zip",
    "*.tar.gz",
    "*.tgz",
    "packages/*/*.tgz",

    // Logs & OS files
    "*.log",
    "*/*.log",
    "*.DS_Store",
    "*/*.DS_Store",
    "*/*/*.DS_Store",
    "*/*/*/*.DS_Store",
    "Thumbs.db",

    // Test coverage & reports
    "coverage/*",
    "test-results/*",
    "playwright-report/*",
    ".eslintcache",
    "*.tsbuildinfo",

    // Environment & credentials
    ".env.local",
    "*.local",
    ".npmrc",
  ];

  const excludeFlags = excludePatterns.map((p) => `-x "${p}"`).join(" ");

  console.log("📦 Creating clean zip archive...");
  console.log("⏳ Compressing monorepo files (this may take a few seconds)...");

  try {
    execSync(`zip -r -q "${zipPath}" . ${excludeFlags}`, {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });

    // Create a copy as latest
    fs.copyFileSync(zipPath, latestZipPath);

    const stats = fs.statSync(zipPath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`\n======================================================`);
    console.log(`🎉 MONOREPO PACKAGE CREATED SUCCESSFULLY!`);
    console.log(`======================================================`);
    console.log(`📁 File Name   : ${zipName}`);
    console.log(`📍 Full Path   : ${zipPath}`);
    console.log(`⭐ Latest Copy : ${latestZipPath}`);
    console.log(`📊 Archive Size: ${sizeMb} MB`);
    console.log(`✨ Status      : Ready to upload to Gumroad / LemonSqueezy!`);
    console.log(`======================================================\n`);
  } catch (err) {
    console.error("✖ Failed to package monorepo:", err);
    process.exit(1);
  }
}

packMonorepo();
