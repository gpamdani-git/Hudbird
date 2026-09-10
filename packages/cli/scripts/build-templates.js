import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLI_DIR = path.resolve(__dirname, "..");
const ROOT_DIR = path.resolve(CLI_DIR, "../..");
const TEMPLATES_DIR = path.resolve(CLI_DIR, "templates");

// Source paths
const CORE_COMPONENTS = path.resolve(ROOT_DIR, "packages/core/src/components");
const CORE_UTILS = path.resolve(ROOT_DIR, "packages/core/src/utils");
const MARKETING_COMPONENTS = path.resolve(ROOT_DIR, "packages/marketing/src/components");

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function cleanTemplates() {
  if (fs.existsSync(TEMPLATES_DIR)) {
    fs.rmSync(TEMPLATES_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
}

function build() {
  console.log("Building CLI templates...");
  cleanTemplates();

  console.log("Copying Core Components...");
  copyDirSync(CORE_COMPONENTS, path.join(TEMPLATES_DIR, "core"));

  console.log("Copying Core Utils...");
  copyDirSync(CORE_UTILS, path.join(TEMPLATES_DIR, "utils"));

  console.log("Copying Marketing Components...");
  copyDirSync(MARKETING_COMPONENTS, path.join(TEMPLATES_DIR, "marketing"));

  console.log("Templates built successfully!");
}

build();
