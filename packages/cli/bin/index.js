#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import url from "node:url";
import pc from "picocolors";
import prompts from "prompts";

const cwd = process.cwd();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLI_DIR = path.resolve(__dirname, "..");
const TEMPLATES_DIR = path.resolve(CLI_DIR, "templates");

const args = process.argv.slice(2);
const command = args[0] || "init";

async function runInit() {
  console.log(pc.cyan(pc.bold("🦅 Welcome to Hudbird UI CLI! made with ♥ in Bali")));

  let pm = "npm";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) pm = "pnpm";
  else if (fs.existsSync(path.join(cwd, "yarn.lock"))) pm = "yarn";
  else if (fs.existsSync(path.join(cwd, "bun.lockb"))) pm = "bun";

  console.log(pc.gray(`ℹ Detected package manager: ${pm}`));

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

  let configContent = "";
  let isESM = false;
  let isTailwindV4 = false;
  const pkgPath = path.join(cwd, "package.json");

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    if (pkg.type === "module") isESM = true;
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
      isTailwindV4 = true;
    }
  }

  if (targetConfig) {
    configContent = fs.readFileSync(path.join(cwd, targetConfig), "utf-8");
    isESM =
      targetConfig.endsWith(".ts") ||
      targetConfig.endsWith(".mjs") ||
      configContent.includes("export default");
  }

  if (!isTailwindV4) {
    if (!targetConfig) {
      const isTSProject = fs.existsSync(path.join(cwd, "tsconfig.json"));
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
    } else {
      console.log(pc.yellow(`⚠ ${finalPresetName} already exists, skipping creation.`));
    }

    let configExists = false;
    for (const config of possibleConfigs) {
      if (fs.existsSync(path.join(cwd, config))) configExists = true;
    }

    if (!configExists) {
      console.log(pc.yellow(`⚠ No tailwind config found.`));
      const response = await prompts({
        type: "confirm",
        name: "createConfig",
        message: `Would you like to generate a default ${targetConfig}?`,
        initial: true,
      });

      if (response.createConfig) {
        const isESMConfig = isESM || isTS;
        const requireStr = isESMConfig
          ? `import('./${finalPresetName}')`
          : `require('./${finalPresetName}')`;

        const newConfigContent = `/** @type {import('tailwindcss').Config} */\n${isESMConfig ? "export default" : "module.exports ="} {\n  content: [\n    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",\n    "./app/**/*.{js,ts,jsx,tsx}",\n    "./components/**/*.{js,ts,jsx,tsx}"\n  ],\n  presets: [\n    ${requireStr}\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}\n`;
        fs.writeFileSync(path.join(cwd, targetConfig), newConfigContent, "utf-8");
        console.log(pc.green(`✔ Created ${targetConfig} with presets injected.`));
      }
    } else {
      console.log(pc.blue(`ℹ Found ${targetConfig}`));
      const configFilePath = path.join(cwd, targetConfig);

      if (configContent.includes("hudbirdPreset")) {
        console.log(pc.yellow(`⚠ ${targetConfig} already contains hudbirdPreset, skipping.`));
      } else {
        const response = await prompts({
          type: "confirm",
          name: "value",
          message: `Do you want to inject the preset into ${targetConfig}?`,
          initial: true,
        });

        if (response.value) {
          if (isESM) {
            const importPath = isTS ? `./hudbirdPreset` : `./${finalPresetName}`;
            const importStatement = `import hudbirdPreset from '${importPath}';\n`;
            configContent = importStatement + configContent;
            if (configContent.includes("presets: [")) {
              configContent = configContent.replace(
                /presets:\s*\[/,
                "presets: [\n    hudbirdPreset,"
              );
              modified = true;
            } else {
              configContent = configContent.replace(
                /export default (?:defineConfig\()?\{/,
                (match) => `${match}\n  presets: [hudbirdPreset],`
              );
              modified = true;
            }
          } else {
            const requireStatement = `require('./${finalPresetName}')`;
            if (configContent.includes("presets: [")) {
              configContent = configContent.replace(
                /presets:\s*\[/,
                `presets: [\n    ${requireStatement},`
              );
              modified = true;
            } else {
              configContent = configContent.replace(
                /module\.exports\s*=\s*\{/,
                (match) => `${match}\n  presets: [${requireStatement}],`
              );
              modified = true;
            }
          }

          if (modified) {
            fs.writeFileSync(configFilePath, configContent, "utf-8");
            console.log(pc.green(`✔ Successfully updated ${targetConfig}`));
          } else {
            console.log(pc.red(`✖ Failed to inject preset automatically.`));
            console.log(pc.cyan(`Please manually add it to your config:`));
            console.log(
              pc.white(
                `  presets: [${isESM ? "hudbirdPreset" : `require('./${finalPresetName}')`}]`
              )
            );
          }
        }
      }
    }
  } else {
    console.log(pc.blue(`ℹ Detected Tailwind CSS v4. Using native CSS @theme injection.`));
  }

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
    let content = fs.readFileSync(path.join(cwd, targetCss), "utf-8");

    if (isTailwindV4) {
      if (!content.includes("--color-hudbird-primary")) {
        const response = await prompts({
          type: "confirm",
          name: "injectCss",
          message: `Would you like to inject Tailwind v4 theme variables into ${targetCss}?`,
          initial: true,
        });
        if (response.injectCss) {
          let injectedContent = content;
          const themeBlock = `\n@theme {\n  --color-hudbird-primary: #0ea5e9;\n  --color-hudbird-secondary: #8b5cf6;\n  --color-hudbird-accent: #f43f5e;\n  --color-hudbird-background: #f8fafc;\n  --color-hudbird-foreground: #0f172a;\n  --color-hudbird-muted: #cbd5e1;\n}\n`;
          if (!content.includes('@import "tailwindcss"')) {
            injectedContent = `@import "tailwindcss";\n` + injectedContent;
          }
          injectedContent = injectedContent + themeBlock;
          fs.writeFileSync(path.join(cwd, targetCss), injectedContent, "utf-8");
          console.log(pc.green(`✔ Injected Tailwind v4 theme into ${targetCss}`));
        }
      }
    } else {
      if (!content.includes("@tailwind base")) {
        const response = await prompts({
          type: "confirm",
          name: "injectCss",
          message: `Would you like to inject Tailwind directives into ${targetCss}?`,
          initial: true,
        });
        if (response.injectCss) {
          fs.writeFileSync(path.join(cwd, targetCss), cssDirectives + content, "utf-8");
          console.log(pc.green(`✔ Injected Tailwind directives into ${targetCss}`));
        }
      }
    }
  } else {
    const response = await prompts({
      type: "confirm",
      name: "createCss",
      message: `No global CSS file found. Create src/index.css with Tailwind directives?`,
      initial: true,
    });
    if (response.createCss) {
      if (!fs.existsSync(path.join(cwd, "src")))
        fs.mkdirSync(path.join(cwd, "src"), { recursive: true });
      fs.writeFileSync(path.join(cwd, "src/index.css"), cssDirectives, "utf-8");
      console.log(pc.green(`✔ Created src/index.css`));
    }
  }

  const baseDeps = [
    "framer-motion",
    "lucide-react",
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
  ];
  const response = await prompts({
    type: "confirm",
    name: "install",
    message: `Would you like to install required UI dependencies (${baseDeps.join(", ")})?`,
    initial: true,
  });

  if (response.install) {
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
      console.log(pc.green(`✔ Dependencies installed successfully.\n`));
    } catch (err) {
      console.log(pc.red(`✖ Failed to install dependencies. You can install them manually:`));
      console.log(pc.white(`  ${installCmd} ${baseDeps.join(" ")}`));
      console.log();
      console.log(
        pc.dim(`💡 Need help? Visit: ${pc.cyan("https://hudbird.vercel.app/#/support")}`)
      );
      console.log(
        pc.dim(
          `🐛 Report a bug:  ${pc.cyan("https://github.com/gpamdani-git/Hudbird-UI-Discus/issues/new?assignees=&labels=bug%2C+triage&template=bug_report.yml&title=%5BBUG%5D+")}`
        )
      );
    }
  }

  console.log(pc.green(pc.bold("✨ All done! Hudbird UI is ready to use.")));
}

let collectedNpmDeps = new Set();
const registryPath = path.join(TEMPLATES_DIR, "registry.json");
let registry = {};
if (fs.existsSync(registryPath)) {
  registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
}

async function installComponent(componentName, installedSet = new Set()) {
  if (installedSet.has(componentName)) return;

  const compData = registry[componentName];

  if (!compData) {
    console.log(pc.red(`✖ Component "${componentName}" not found in Hudbird UI registry.`));
    if (installedSet.size === 0) process.exit(1);
    return;
  }

  // Check dependencies first
  const deps = compData.registryDependencies || [];
  for (const dep of deps) {
    if (!installedSet.has(dep)) {
      console.log(pc.blue(`ℹ "${componentName}" requires "${dep}". Installing...`));
      await installComponent(dep, installedSet);
    }
  }

  // Add NPM dependencies to our global collection
  (compData.dependencies || []).forEach((d) => collectedNpmDeps.add(d));

  const componentsBaseDir = fs.existsSync(path.join(cwd, "src"))
    ? "src/components/hudbird-ui"
    : "components/hudbird-ui";

  let targetDir = path.join(cwd, componentsBaseDir, componentName);
  if (componentName === "utils") {
    targetDir = path.join(cwd, componentsBaseDir, "utils");
  }

  if (fs.existsSync(targetDir) && componentName !== "utils") {
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

  console.log(pc.cyan(`📦 Installing ${componentName}...`));
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const file of compData.files) {
    fs.writeFileSync(path.join(targetDir, file.name), file.content, "utf-8");
  }

  installedSet.add(componentName);

  if (componentName !== "utils") {
    console.log(
      pc.green(`✔ Successfully added ${componentName} to ${componentsBaseDir}/${componentName}`)
    );
  }
}

async function runAdd(componentName) {
  if (!componentName) {
    console.log(pc.red("✖ Please specify a component to add. Example: npx hudbird-ui add Button"));
    process.exit(1);
  }

  const componentsBaseDir = fs.existsSync(path.join(cwd, "src"))
    ? "src/components/hudbird-ui"
    : "components/hudbird-ui";

  if (!registry[componentName]) {
    // try to find case-insensitive matching
    const matchingKey = Object.keys(registry).find(
      (k) => k.toLowerCase() === componentName.toLowerCase()
    );
    if (matchingKey) {
      componentName = matchingKey;
    }
  }

  await installComponent(componentName);

  // Install collected missing NPM dependencies
  const pkgJsonPath = path.join(cwd, "package.json");
  let missingDeps = [];
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
      const allInstalled = { ...pkg.dependencies, ...pkg.devDependencies };
      missingDeps = Array.from(collectedNpmDeps).filter((dep) => !allInstalled[dep]);
    } catch (e) {
      // Ignore if package.json cannot be parsed
    }
  } else {
    missingDeps = Array.from(collectedNpmDeps);
  }

  if (missingDeps.length > 0) {
    let pm = "npm";
    if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) pm = "pnpm";
    else if (fs.existsSync(path.join(cwd, "yarn.lock"))) pm = "yarn";
    else if (fs.existsSync(path.join(cwd, "bun.lockb"))) pm = "bun";

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
      console.log(pc.green(`✔ NPM Dependencies installed successfully.\n`));
    } catch (err) {
      const errOut = err && err.stderr ? err.stderr.toString() : err?.message?.toString() || "";
      const hasReactConflict =
        errOut.includes("ERESOLVE") ||
        errOut.includes("peer react") ||
        errOut.includes("@react-three/fiber");

      console.log(pc.red(`\n✖ Failed to install NPM dependencies.`));

      if (pm === "npm" && hasReactConflict) {
        console.log(
          pc.yellow(`\n⚠ Detected a React version conflict with one or more dependencies.`)
        );
        console.log(
          pc.white(`   This usually happens because a library (e.g. @react-three/fiber) has strict`)
        );
        console.log(
          pc.white(`   peer dependency requirements for a specific React version range.`)
        );
        console.log();
        console.log(pc.bold(`   Recommended fixes (try in order):`));
        console.log();
        console.log(
          pc.white(`   1. 🔒 Lock React to a compatible version (${pc.bold("Recommended")}):`)
        );
        console.log(pc.cyan(`      npm install react@19.2.0 react-dom@19.2.0 --save-exact`));
        console.log(
          pc.dim(`      Then re-run: npx hudbird-ui@latest add ${args[1] || "<component>"}`)
        );
        console.log();
        console.log(
          pc.white(`   2. 📦 Use a modern package manager (pnpm resolves conflicts automatically):`)
        );
        console.log(pc.cyan(`      pnpm add ${missingDeps.join(" ")}`));
        console.log();
        console.log(pc.white(`   3. 🔧 Force install (may cause instability):`));
        console.log(pc.cyan(`      npm install ${missingDeps.join(" ")} --legacy-peer-deps\n`));
      } else if (pm === "npm") {
        console.log(pc.yellow(`If you see a peer dependency error, try:`));
        console.log(
          pc.white(`  1. Use overrides in package.json or force install: `) +
            pc.cyan(`npm install ${missingDeps.join(" ")} --legacy-peer-deps`)
        );
        console.log(
          pc.white(`  2. Use a modern package manager: `) +
            pc.cyan(`pnpm add ${missingDeps.join(" ")}`)
        );
      } else {
        console.log(pc.white(`You can install them manually:`));
        console.log(pc.white(`  ${installCmd} ${missingDeps.join(" ")}`));
      }

      console.log();
      console.log(
        pc.dim(`💡 Need help? Visit: ${pc.cyan("https://hudbird.vercel.app/#/support")}`)
      );
      console.log(
        pc.dim(
          `🐛 Report a bug:  ${pc.cyan("https://github.com/gpamdani-git/Hudbird-UI-Discus/issues/new?assignees=&labels=bug%2C+triage&template=bug_report.yml&title=%5BBUG%5D+")}`
        )
      );
    }
  }
}

async function main() {
  if (command === "init") {
    await runInit();
  } else if (command === "add") {
    const componentName = args[1];
    await runAdd(componentName);
  } else {
    console.log(pc.red(`✖ Unknown command: ${command}`));
    console.log(pc.cyan(`Available commands: init, add <component>`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(pc.red("✖ An error occurred:"), err);
  process.exit(1);
});
