#!/usr/bin/env node

/**
 * pack-starter-kit.js
 *
 * Automatically builds and packages the Pro Starter Kit into a clean, standalone ZIP
 * archive ready for distribution (Gumroad / LemonSqueezy) without bloating the Git repository.
 *
 * Output is placed in `dist-releases/` (which is excluded in .gitignore).
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const STARTER_KIT_DIR = path.resolve(ROOT_DIR, "starter-kits/pro-templates");
const RELEASES_DIR = path.resolve(ROOT_DIR, "dist-releases");

function packStarterKit() {
  console.log("🦅 Building standalone Pro Starter Kit distribution package...");

  // 1. Run sync to ensure latest core components are present
  execSync("node scripts/sync-starter-kit.js", { cwd: ROOT_DIR, stdio: "inherit" });

  // 2. Prepare dist-releases directory
  if (!fs.existsSync(RELEASES_DIR)) {
    fs.mkdirSync(RELEASES_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().split("T")[0];
  const zipName = `hudbird-pro-starterkit-${timestamp}.zip`;
  const latestZipName = "hudbird-pro-starterkit-latest.zip";
  const zipPath = path.join(RELEASES_DIR, zipName);
  const latestZipPath = path.join(RELEASES_DIR, latestZipName);

  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  if (fs.existsSync(latestZipPath)) fs.unlinkSync(latestZipPath);

  // 3. Zip the starter kit, excluding node_modules, dist, .turbo, and local caches
  console.log("📦 Creating clean zip archive (excluding node_modules and build artifacts)...");

  const excludePatterns = [
    "node_modules/*",
    "*/node_modules/*",
    "dist/*",
    "*/dist/*",
    ".turbo/*",
    "*/.turbo/*",
    "*.DS_Store",
    "*/.DS_Store",
    "*.log",
    "package-lock.json",
    "scratch/*",
    "*/scratch/*",
  ];

  const excludeString = excludePatterns.map((p) => `-x "${p}"`).join(" ");

  try {
    execSync(`zip -r -q "${zipPath}" . ${excludeString}`, {
      cwd: STARTER_KIT_DIR,
      stdio: "inherit",
    });

    // Create a copy as latest
    fs.copyFileSync(zipPath, latestZipPath);

    const stats = fs.statSync(zipPath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`\n✔ Package created successfully!`);
    console.log(`📁 Destination: ${zipPath}`);
    console.log(`📦 Size: ${sizeMb} MB (Optimized & lightweight)`);
    console.log(`ℹ Ready to upload to Gumroad / LemonSqueezy.`);
  } catch (err) {
    console.error("✖ Failed to package starter kit:", err);
    process.exit(1);
  }
}

packStarterKit();
