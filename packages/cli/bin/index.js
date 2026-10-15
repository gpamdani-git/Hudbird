#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import url from "node:url";
import pc from "picocolors";
import prompts from "prompts";

const CLI_VERSION = "1.4.1";
const CONFIG_FILE = "components.json";

const cwd = process.cwd();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLI_DIR = path.resolve(__dirname, "..");
const TEMPLATES_DIR = path.resolve(CLI_DIR, "templates");

const registryPath = path.join(TEMPLATES_DIR, "registry.json");
let registry = {};
if (fs.existsSync(registryPath)) {
  try {
    registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
  } catch (e) {
    // Registry not yet generated or invalid
  }
}

// ----------------------------------------------------
// Project Configuration Helpers (components.json)
// ----------------------------------------------------
function getProjectConfig() {
  const configPath = path.join(cwd, CONFIG_FILE);
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } catch (e) {
      return null;
    }
  }
  return null;
}

function saveProjectConfig(config) {
  const configPath = path.join(cwd, CONFIG_FILE);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

function getComponentTargetDir(componentName, config = null) {
  const effectiveConfig = config || getProjectConfig();
  if (effectiveConfig?.aliases?.ui || effectiveConfig?.aliases?.components) {
    const alias = effectiveConfig.aliases.ui || effectiveConfig.aliases.components;
    let relPath = alias.replace(/^@\//, "src/").replace(/^~\//, "");
    if (!fs.existsSync(path.join(cwd, "src")) && relPath.startsWith("src/")) {
      relPath = relPath.replace(/^src\//, "");
    }
    return componentName === "utils"
      ? path.join(cwd, relPath, "utils")
      : path.join(cwd, relPath, componentName);
  }

  const base = fs.existsSync(path.join(cwd, "src"))
    ? "src/components/hudbird-ui"
    : "components/hudbird-ui";
  return componentName === "utils"
    ? path.join(cwd, base, "utils")
    : path.join(cwd, base, componentName);
}

function detectPackageManager() {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}

function isTailwindV4Project() {
  const pkgPath = path.join(cwd, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
      if (
        (deps["tailwindcss"] &&
          (deps["tailwindcss"].startsWith("^4") ||
            deps["tailwindcss"].startsWith("4.") ||
            deps["tailwindcss"].startsWith("~4"))) ||
        deps["@tailwindcss/vite"] ||
        deps["@tailwindcss/postcss"] ||
        deps["@tailwindcss/cli"]
      ) {
        return true;
      }
    } catch {
      // Ignore errors when parsing malformed or missing package.json
    }
  }
  return false;
}

// ----------------------------------------------------
// Unified Diff Engine (Zero Dependencies)
// ----------------------------------------------------
function computeLcs(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (a[i] === b[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  let i = m;
  let j = n;
  const diff = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      diff.unshift({ type: "same", line: a[i - 1], oldLine: i, newLine: j });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: "add", line: b[j - 1], newLine: j });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      diff.unshift({ type: "del", line: a[i - 1], oldLine: i });
      i--;
    }
  }
  return diff;
}

function formatUnifiedDiff(fileName, localStr, upstreamStr) {
  if (localStr === upstreamStr) {
    return { identical: true, additions: 0, deletions: 0, hunks: [] };
  }

  const localLines = localStr.split(/\r?\n/);
  const upstreamLines = upstreamStr.split(/\r?\n/);
  const diff = computeLcs(localLines, upstreamLines);

  let additions = 0;
  let deletions = 0;
  const changes = [];

  for (let idx = 0; idx < diff.length; idx++) {
    const item = diff[idx];
    if (item.type === "add") additions++;
    if (item.type === "del") deletions++;
    changes.push(item);
  }

  return {
    identical: false,
    additions,
    deletions,
    lines: changes,
  };
}

function printColoredDiff(fileName, diffResult) {
  console.log(pc.bold(pc.white(`\n--- a/${fileName} (local)`)));
  console.log(pc.bold(pc.white(`+++ b/${fileName} (registry upstream)`)));

  let inHunk = false;
  let contextBuffer = [];

  for (let idx = 0; idx < diffResult.lines.length; idx++) {
    const item = diffResult.lines[idx];
    if (item.type === "same") {
      if (inHunk) {
        console.log(pc.dim(`  ${item.line}`));
        contextBuffer.push(item.line);
        if (contextBuffer.length > 3) {
          inHunk = false;
          contextBuffer = [];
        }
      }
    } else if (item.type === "del") {
      inHunk = true;
      contextBuffer = [];
      console.log(pc.red(`- ${item.line}`));
    } else if (item.type === "add") {
      inHunk = true;
      contextBuffer = [];
      console.log(pc.green(`+ ${item.line}`));
    }
  }
  console.log();
}

// ----------------------------------------------------
// Command: list
// ----------------------------------------------------
const CATEGORY_NAMES = {
  primitives: "🧩 Primitives",
  forms: "📝 Form & Verification",
  navigation: "🪟 Overlays & Navigation",
  feedback: "⚡ Feedback & Indicators",
  charts: "📊 Data & Charts",
  marketing: "🌐 Marketing & Bento",
};

async function runList() {
  console.log(pc.cyan(pc.bold(`\n🦅 Hudbird UI Component Catalog (v${CLI_VERSION})`)));
  console.log(pc.dim("Available components from official registry:\n"));

  const config = getProjectConfig();
  const allComponents = Object.keys(registry).filter((name) => name !== "utils");

  if (allComponents.length === 0) {
    console.log(pc.yellow("⚠ Registry is empty or not yet generated. Run build-registry first."));
    return;
  }

  const grouped = {};
  let installedCount = 0;

  for (const name of allComponents) {
    const item = registry[name];
    const cat = item.category || (item.type === "registry:marketing" ? "marketing" : "primitives");
    if (!grouped[cat]) grouped[cat] = [];

    const targetDir = getComponentTargetDir(name, config);
    const isInstalled = fs.existsSync(targetDir);
    if (isInstalled) installedCount++;

    grouped[cat].push({
      name,
      installed: isInstalled,
      deps: item.registryDependencies || [],
    });
  }

  // Display each category
  const order = ["primitives", "forms", "navigation", "feedback", "charts", "marketing"];
  for (const catKey of order) {
    const items = grouped[catKey] || [];
    if (items.length === 0) continue;

    console.log(pc.bold(pc.white(CATEGORY_NAMES[catKey] || catKey.toUpperCase())));
    const lines = items.map((c) => {
      const status = c.installed ? pc.green("✔ installed") : pc.dim("○ available");
      const nameStr = c.installed ? pc.bold(pc.white(c.name)) : pc.cyan(c.name);
      const depsStr = c.deps.length > 0 ? pc.dim(` (req: ${c.deps.join(", ")})`) : "";
      return `  ${status.padEnd(20)} ${nameStr}${depsStr}`;
    });
    console.log(lines.join("\n"));
    console.log();
  }

  console.log(pc.dim("─".repeat(50)));
  console.log(
    pc.bold(
      `Summary: ${pc.green(`${installedCount} installed`)}, ${pc.cyan(
        `${allComponents.length - installedCount} available`
      )} of ${allComponents.length} total components.`
    )
  );
  console.log(
    pc.dim(`\n💡 Tip: Run ${pc.cyan("npx hudbird-ui add <component>")} to install any component.`)
  );
  console.log(
    pc.dim(`🔍 Tip: Run ${pc.cyan("npx hudbird-ui diff")} to check for component updates.\n`)
  );
}

// ----------------------------------------------------
// Command: diff
// ----------------------------------------------------
async function runDiff(componentName) {
  const config = getProjectConfig();

  if (componentName) {
    // Diff specific component
    if (!registry[componentName]) {
      const matchingKey = Object.keys(registry).find(
        (k) => k.toLowerCase() === componentName.toLowerCase()
      );
      if (matchingKey) componentName = matchingKey;
    }

    const compData = registry[componentName];
    if (!compData) {
      console.log(pc.red(`✖ Component "${componentName}" not found in registry.`));
      process.exit(1);
    }

    const targetDir = getComponentTargetDir(componentName, config);
    if (!fs.existsSync(targetDir)) {
      console.log(pc.yellow(`⚠ Component "${componentName}" is not installed locally.`));
      console.log(pc.cyan(`  Run: npx hudbird-ui add ${componentName} to install it.\n`));
      return;
    }

    console.log(pc.cyan(pc.bold(`\n🔍 Inspecting diff for "${componentName}"...`)));
    let fileDiffCount = 0;

    for (const file of compData.files) {
      const localFilePath = path.join(targetDir, file.name);
      if (!fs.existsSync(localFilePath)) {
        console.log(pc.yellow(`  ⚠ File "${file.name}" is missing locally.`));
        fileDiffCount++;
        continue;
      }

      const localContent = fs.readFileSync(localFilePath, "utf-8");
      const diffResult = formatUnifiedDiff(file.name, localContent, file.content);

      if (diffResult.identical) {
        console.log(pc.green(`  ✔ ${file.name} is identical to upstream registry.`));
      } else {
        fileDiffCount++;
        console.log(
          pc.yellow(
            `  ⚡ ${file.name}: ${pc.green(`+${diffResult.additions}`)} ${pc.red(
              `-${diffResult.deletions}`
            )} modifications found:`
          )
        );
        printColoredDiff(file.name, diffResult);
      }
    }

    if (fileDiffCount === 0) {
      console.log(
        pc.green(
          pc.bold(
            `\n✨ "${componentName}" is completely up to date with official registry v${CLI_VERSION}.\n`
          )
        )
      );
    } else {
      console.log(
        pc.dim(
          `💡 To overwrite your local changes with upstream, run: ${pc.cyan(
            `npx hudbird-ui add ${componentName} --overwrite`
          )}\n`
        )
      );
    }
  } else {
    // Scan all installed components and summarize diff status
    console.log(pc.cyan(pc.bold(`\n🔍 Scanning installed components for updates...\n`)));
    const allComponents = Object.keys(registry).filter((k) => k !== "utils");
    const modified = [];
    const upToDate = [];

    for (const name of allComponents) {
      const targetDir = getComponentTargetDir(name, config);
      if (!fs.existsSync(targetDir)) continue;

      const compData = registry[name];
      let hasDiff = false;
      let totalAdd = 0;
      let totalDel = 0;

      for (const file of compData.files) {
        const localFilePath = path.join(targetDir, file.name);
        if (!fs.existsSync(localFilePath)) {
          hasDiff = true;
          continue;
        }
        const localContent = fs.readFileSync(localFilePath, "utf-8");
        const diffResult = formatUnifiedDiff(file.name, localContent, file.content);
        if (!diffResult.identical) {
          hasDiff = true;
          totalAdd += diffResult.additions;
          totalDel += diffResult.deletions;
        }
      }

      if (hasDiff) {
        modified.push({ name, additions: totalAdd, deletions: totalDel });
      } else {
        upToDate.push(name);
      }
    }

    if (modified.length === 0 && upToDate.length === 0) {
      console.log(pc.yellow("⚠ No Hudbird UI components found in this project."));
      console.log(pc.cyan("  Run: npx hudbird-ui add <component> to get started.\n"));
      return;
    }

    if (upToDate.length > 0) {
      console.log(pc.green(pc.bold(`✔ Up to date (${upToDate.length}):`)));
      console.log(pc.dim(`  ${upToDate.join(", ")}\n`));
    }

    if (modified.length > 0) {
      console.log(
        pc.yellow(
          pc.bold(
            `⚡ Differences detected (${modified.length}) — local modifications or updates available:`
          )
        )
      );
      for (const mod of modified) {
        console.log(
          `  - ${pc.bold(pc.white(mod.name.padEnd(16)))} ${pc.green(
            `+${mod.additions}`
          )} ${pc.red(`-${mod.deletions}`)} lines`
        );
      }
      console.log(
        pc.dim(`\n💡 To view detailed code diff: ${pc.cyan("npx hudbird-ui diff <component>")}`)
      );
      console.log(
        pc.dim(`💡 To update component: ${pc.cyan("npx hudbird-ui add <component> --overwrite")}\n`)
      );
    } else {
      console.log(
        pc.green(
          pc.bold(
            `✨ All ${upToDate.length} installed components are 100% up to date with registry v${CLI_VERSION}!\n`
          )
        )
      );
    }
  }
}

// ----------------------------------------------------
// Command: init
// ----------------------------------------------------
async function runInit() {
  console.log(pc.cyan(pc.bold(`\n🦅 Welcome to Hudbird UI CLI (v${CLI_VERSION})`)));
  console.log(pc.dim("   Design-first UI ecosystem — Made with ♥ in Bali\n"));

  const pm = detectPackageManager();
  console.log(pc.gray(`ℹ Detected package manager: ${pm}`));

  const isTailwindV4 = isTailwindV4Project();
  const isTSProject = fs.existsSync(path.join(cwd, "tsconfig.json"));

  // Check existing components.json
  const existingConfig = getProjectConfig();
  if (existingConfig) {
    console.log(pc.blue(`ℹ Found existing ${CONFIG_FILE}`));
    const confirm = await prompts({
      type: "confirm",
      name: "reconfigure",
      message: "Configuration file already exists. Do you want to reconfigure?",
      initial: false,
    });
    if (!confirm.reconfigure) {
      console.log(pc.dim("Skipping initialization.\n"));
      return;
    }
  }

  // Interactive Prompts
  const answers = await prompts([
    {
      type: "select",
      name: "baseColor",
      message: "Which base color style would you like to use?",
      choices: [
        { title: "Zinc (Modern neutral)", value: "zinc" },
        { title: "Slate (Cool gray)", value: "slate" },
        { title: "Stone (Warm gray)", value: "stone" },
        { title: "Gray (Classic)", value: "gray" },
        { title: "Neutral (Pure)", value: "neutral" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "componentsAlias",
      message: "Configure the import alias for components:",
      initial: fs.existsSync(path.join(cwd, "src"))
        ? "@/components/hudbird-ui"
        : "components/hudbird-ui",
    },
    {
      type: "text",
      name: "utilsAlias",
      message: "Configure the import alias for utils/cn:",
      initial: fs.existsSync(path.join(cwd, "src"))
        ? "@/components/hudbird-ui/utils"
        : "components/hudbird-ui/utils",
    },
  ]);

  if (!answers.componentsAlias) {
    console.log(pc.red("✖ Initialization aborted."));
    return;
  }

  // Write components.json
  const newConfig = {
    $schema: "https://hudbird.vercel.app/schema.json",
    style: "default",
    rsc: false,
    tsx: isTSProject,
    tailwind: {
      version: isTailwindV4 ? 4 : 3,
      config: isTailwindV4 ? "" : "tailwind.config.ts",
      css: fs.existsSync(path.join(cwd, "src/index.css")) ? "src/index.css" : "src/globals.css",
      baseColor: answers.baseColor || "zinc",
      cssVariables: true,
    },
    aliases: {
      components: answers.componentsAlias,
      utils: answers.utilsAlias,
      ui: answers.componentsAlias,
    },
  };

  saveProjectConfig(newConfig);
  console.log(pc.green(`✔ Created ${CONFIG_FILE}`));

  // Tailwind configuration
  const possibleConfigs = [
    "tailwind.config.js",
    "tailwind.config.ts",
    "tailwind.config.cjs",
    "tailwind.config.mjs",
  ];
  let targetConfig = null;
  for (const config of possibleConfigs) {
    if (fs.existsSync(path.join(cwd, config))) {
      targetConfig = config;
      break;
    }
  }

  let isESM = false;
  if (targetConfig) {
    const configContent = fs.readFileSync(path.join(cwd, targetConfig), "utf-8");
    isESM =
      targetConfig.endsWith(".ts") ||
      targetConfig.endsWith(".mjs") ||
      configContent.includes("export default");
  }

  if (!isTailwindV4) {
    if (!targetConfig) {
      targetConfig = isTSProject ? "tailwind.config.ts" : "tailwind.config.js";
    }
    const isTS = targetConfig.endsWith(".ts");
    const finalPresetName = isTS ? "hudbirdPreset.ts" : "hudbirdPreset.js";

    const presetContentCJS = `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        hudbird: {\n          primary: '#0ea5e9',\n          secondary: '#8b5cf6',\n          accent: '#f43f5e',\n          background: '#f8fafc',\n          foreground: '#0f172a',\n          muted: '#cbd5e1'\n        }\n      }\n    }\n  }\n};\n`;
    const presetContentESM = `import type { Config } from 'tailwindcss';\n\nexport default {\n  theme: {\n    extend: {\n      colors: {\n        hudbird: {\n          primary: '#0ea5e9',\n          secondary: '#8b5cf6',\n          accent: '#f43f5e',\n          background: '#f8fafc',\n          foreground: '#0f172a',\n          muted: '#cbd5e1'\n        }\n      }\n    }\n  }\n} satisfies Config;\n`;
    const presetContentESMJS = `/** @type {import('tailwindcss').Config} */\nexport default {\n  theme: {\n    extend: {\n      colors: {\n        hudbird: {\n          primary: '#0ea5e9',\n          secondary: '#8b5cf6',\n          accent: '#f43f5e',\n          background: '#f8fafc',\n          foreground: '#0f172a',\n          muted: '#cbd5e1'\n        }\n      }\n    }\n  }\n};\n`;

    const finalContent = isTS ? presetContentESM : isESM ? presetContentESMJS : presetContentCJS;
    const presetPath = path.join(cwd, finalPresetName);

    if (!fs.existsSync(presetPath)) {
      fs.writeFileSync(presetPath, finalContent, "utf-8");
      console.log(pc.green(`✔ Created ${finalPresetName}`));
    }
  } else {
    console.log(pc.blue(`ℹ Detected Tailwind CSS v4. Using native CSS @theme injection.`));
  }

  // Inject CSS directives
  const possibleCssFiles = [
    "src/index.css",
    "src/globals.css",
    "index.css",
    "globals.css",
    "src/app/globals.css",
    "app/globals.css",
  ];
  let targetCss = null;
  for (const css of possibleCssFiles) {
    if (fs.existsSync(path.join(cwd, css))) {
      targetCss = css;
      break;
    }
  }

  const cssDirectives = isTailwindV4
    ? `@import "tailwindcss";\n\n@theme {\n  --color-hudbird-primary: #0ea5e9;\n  --color-hudbird-secondary: #8b5cf6;\n  --color-hudbird-accent: #f43f5e;\n  --color-hudbird-background: #f8fafc;\n  --color-hudbird-foreground: #0f172a;\n  --color-hudbird-muted: #cbd5e1;\n}\n\n`
    : `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n`;

  if (targetCss) {
    const content = fs.readFileSync(path.join(cwd, targetCss), "utf-8");
    if (isTailwindV4 && !content.includes("--color-hudbird-primary")) {
      const themeBlock = `\n@theme {\n  --color-hudbird-primary: #0ea5e9;\n  --color-hudbird-secondary: #8b5cf6;\n  --color-hudbird-accent: #f43f5e;\n  --color-hudbird-background: #f8fafc;\n  --color-hudbird-foreground: #0f172a;\n  --color-hudbird-muted: #cbd5e1;\n}\n`;
      let injected = content;
      if (!content.includes('@import "tailwindcss"')) {
        injected = `@import "tailwindcss";\n` + injected;
      }
      fs.writeFileSync(path.join(cwd, targetCss), injected + themeBlock, "utf-8");
      console.log(pc.green(`✔ Injected Tailwind v4 @theme variables into ${targetCss}`));
    }
  } else {
    const cssPath = path.join(cwd, "src/index.css");
    if (!fs.existsSync(path.join(cwd, "src")))
      fs.mkdirSync(path.join(cwd, "src"), { recursive: true });
    fs.writeFileSync(cssPath, cssDirectives, "utf-8");
    console.log(pc.green(`✔ Created src/index.css`));
  }

  // Install utils/cn
  const utilsDir = getComponentTargetDir("utils", newConfig);
  if (!fs.existsSync(utilsDir)) fs.mkdirSync(utilsDir, { recursive: true });
  const utilsCode = `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`;
  fs.writeFileSync(path.join(utilsDir, "cn.ts"), utilsCode, "utf-8");
  console.log(pc.green(`✔ Created utility cn.ts at ${utilsDir}/cn.ts`));

  // Install base dependencies
  const baseDeps = [
    "framer-motion",
    "lucide-react",
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
  ];
  const confirmInstall = await prompts({
    type: "confirm",
    name: "install",
    message: `Would you like to install required UI dependencies (${baseDeps.join(", ")})?`,
    initial: true,
  });

  if (confirmInstall.install) {
    console.log(pc.cyan(`\n📦 Installing dependencies using ${pm}...`));
    const installCmd =
      pm === "npm"
        ? "npm install"
        : pm === "yarn"
          ? "yarn add"
          : pm === "bun"
            ? "bun add"
            : "pnpm add";
    try {
      execSync(`${installCmd} ${baseDeps.join(" ")}`, { stdio: "inherit", cwd });
      console.log(pc.green(`✔ Base dependencies installed successfully.\n`));
    } catch (err) {
      console.log(pc.red(`✖ Failed to install dependencies automatically. Run:`));
      console.log(pc.white(`  ${installCmd} ${baseDeps.join(" ")}\n`));
    }
  }

  console.log(pc.green(pc.bold("✨ All done! Hudbird UI is ready to use.")));
  console.log(pc.dim(`\nNext steps:`));
  console.log(pc.cyan(`  1. Browse components: npx hudbird-ui list`));
  console.log(pc.cyan(`  2. Add components:    npx hudbird-ui add Button Card Dialog\n`));
}

// ----------------------------------------------------
// Component Installer Routine
// ----------------------------------------------------
let collectedNpmDeps = new Set();

async function installComponent(componentName, options = {}, installedSet = new Set()) {
  if (installedSet.has(componentName)) return;

  const compData = registry[componentName];
  if (!compData) {
    console.log(pc.red(`✖ Component "${componentName}" not found in registry.`));
    return;
  }

  // Check registry dependencies recursively
  const deps = compData.registryDependencies || [];
  for (const dep of deps) {
    if (!installedSet.has(dep)) {
      console.log(pc.blue(`ℹ "${componentName}" requires "${dep}". Installing dependency...`));
      await installComponent(dep, options, installedSet);
    }
  }

  (compData.dependencies || []).forEach((d) => collectedNpmDeps.add(d));

  const config = getProjectConfig();
  const targetDir = getComponentTargetDir(componentName, config);

  if (fs.existsSync(targetDir) && componentName !== "utils" && !options.overwrite) {
    const response = await prompts({
      type: "confirm",
      name: "overwrite",
      message: `Component "${componentName}" already exists. Overwrite?`,
      initial: false,
    });
    if (!response.overwrite) {
      console.log(pc.yellow(`⚠ Skipped ${componentName}.`));
      return;
    }
  }

  console.log(pc.cyan(`📦 Adding ${componentName}...`));
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const file of compData.files) {
    fs.writeFileSync(path.join(targetDir, file.name), file.content, "utf-8");
  }

  installedSet.add(componentName);
  if (componentName !== "utils") {
    console.log(pc.green(`✔ Added ${componentName} to ${path.relative(cwd, targetDir)}`));
  }
}

// ----------------------------------------------------
// Command: add
// ----------------------------------------------------
async function runAdd(componentNames = [], options = {}) {
  let targets = [...componentNames];

  if (options.all) {
    targets = Object.keys(registry).filter((name) => name !== "utils");
    console.log(pc.cyan(`📦 Installing all ${targets.length} components from registry...`));
  } else if (targets.length === 0) {
    // Interactive multi-select
    const allComponents = Object.keys(registry).filter((name) => name !== "utils");
    const config = getProjectConfig();

    const choices = allComponents.map((name) => {
      const targetDir = getComponentTargetDir(name, config);
      const isInstalled = fs.existsSync(targetDir);
      return {
        title: `${name}${isInstalled ? pc.green(" (installed)") : ""}`,
        value: name,
        selected: false,
      };
    });

    const response = await prompts({
      type: "multiselect",
      name: "selected",
      message: "Select components to add:",
      choices,
      hint: "- Space to select. Enter to submit",
      instructions: false,
    });

    if (!response.selected || response.selected.length === 0) {
      console.log(pc.yellow("⚠ No components selected."));
      return;
    }
    targets = response.selected;
  }

  const installedSet = new Set();
  for (let compName of targets) {
    if (!registry[compName]) {
      const match = Object.keys(registry).find((k) => k.toLowerCase() === compName.toLowerCase());
      if (match) compName = match;
    }
    await installComponent(compName, options, installedSet);
  }

  // Install collected missing NPM dependencies
  const pkgJsonPath = path.join(cwd, "package.json");
  let missingDeps = [];
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
      const allInstalled = { ...pkg.dependencies, ...pkg.devDependencies };
      missingDeps = Array.from(collectedNpmDeps).filter((dep) => !allInstalled[dep]);
    } catch {
      // Ignore errors when parsing malformed or missing package.json
    }
  } else {
    missingDeps = Array.from(collectedNpmDeps);
  }

  if (missingDeps.length > 0) {
    const pm = detectPackageManager();
    console.log(
      pc.cyan(`\n📦 Installing required NPM dependencies: ${missingDeps.join(", ")} using ${pm}...`)
    );
    const installCmd =
      pm === "npm"
        ? "npm install"
        : pm === "yarn"
          ? "yarn add"
          : pm === "bun"
            ? "bun add"
            : "pnpm add";
    try {
      execSync(`${installCmd} ${missingDeps.join(" ")}`, { stdio: "inherit", cwd });
      console.log(pc.green(`✔ Dependencies installed successfully.\n`));
    } catch (err) {
      console.log(
        pc.yellow(
          `⚠ Please install missing packages manually: ${installCmd} ${missingDeps.join(" ")}\n`
        )
      );
    }
  }

  console.log(pc.green(pc.bold("\n✨ Component installation complete!")));
}

// ----------------------------------------------------
// Command: help & version
// ----------------------------------------------------
function printVersion() {
  console.log(`hudbird-ui v${CLI_VERSION}`);
}

function printHelp() {
  console.log(pc.cyan(pc.bold(`\n🦅 Hudbird UI CLI — v${CLI_VERSION}`)));
  console.log(pc.dim("   Official developer tools for Hudbird UI component library\n"));

  console.log(pc.bold("USAGE"));
  console.log("  $ npx hudbird-ui <command> [options]\n");

  console.log(pc.bold("COMMANDS"));
  console.log(`  ${pc.cyan("init")}               Initialize project and generate ${CONFIG_FILE}`);
  console.log(
    `  ${pc.cyan("add [components]")}    Add component(s) to your project (interactive if omitted)`
  );
  console.log(
    `  ${pc.cyan("list")} (or ${pc.cyan("ls")})       List all 62 available components with category and status`
  );
  console.log(
    `  ${pc.cyan("diff [component]")}    Inspect code differences between local files and registry\n`
  );

  console.log(pc.bold("OPTIONS"));
  console.log(`  ${pc.cyan("-y, --yes")}           Skip confirmation prompts`);
  console.log(
    `  ${pc.cyan("--overwrite")}         Overwrite existing component files without prompt`
  );
  console.log(`  ${pc.cyan("--all")}               Install all available components in registry`);
  console.log(`  ${pc.cyan("-v, --version")}       Show version number`);
  console.log(`  ${pc.cyan("-h, --help")}          Show help\n`);

  console.log(pc.bold("EXAMPLES"));
  console.log(pc.dim("  # Initialize project configuration:"));
  console.log("  $ npx hudbird-ui init\n");

  console.log(pc.dim("  # List all available components:"));
  console.log("  $ npx hudbird-ui list\n");

  console.log(pc.dim("  # Add single or multiple components:"));
  console.log("  $ npx hudbird-ui add button card dialog");
  console.log("  $ npx hudbird-ui add input-otp form\n");

  console.log(pc.dim("  # Inspect code diffs for a component:"));
  console.log("  $ npx hudbird-ui diff button");
  console.log("  $ npx hudbird-ui diff\n");
}

// ----------------------------------------------------
// Main CLI Router
// ----------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "help";

  if (args.includes("-h") || args.includes("--help") || command === "help") {
    printHelp();
    return;
  }

  if (args.includes("-v") || args.includes("--version") || command === "version") {
    printVersion();
    return;
  }

  const flags = {
    overwrite: args.includes("--overwrite") || args.includes("-y") || args.includes("--yes"),
    all: args.includes("--all"),
  };

  if (command === "init") {
    await runInit();
  } else if (command === "list" || command === "ls") {
    await runList();
  } else if (command === "diff") {
    const targetComp = args[1] && !args[1].startsWith("-") ? args[1] : null;
    await runDiff(targetComp);
  } else if (command === "add") {
    const componentNames = args.slice(1).filter((arg) => !arg.startsWith("-"));
    await runAdd(componentNames, flags);
  } else {
    console.log(pc.red(`✖ Unknown command: "${command}"`));
    console.log(pc.cyan(`Run "npx hudbird-ui --help" for available commands.\n`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(pc.red("✖ An unexpected error occurred:"), err);
  process.exit(1);
});
