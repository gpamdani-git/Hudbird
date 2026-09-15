import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLI_DIR = path.resolve(__dirname, "..");
const ROOT_DIR = path.resolve(CLI_DIR, "../..");
const TEMPLATES_DIR = path.resolve(CLI_DIR, "templates");

const CORE_COMPONENTS = path.resolve(ROOT_DIR, "packages/core/src/components");
const CORE_UTILS = path.resolve(ROOT_DIR, "packages/core/src/utils");
const MARKETING_COMPONENTS = path.resolve(ROOT_DIR, "packages/marketing/src/components");

const registry = {};
const CORE_DEPS = ["react", "react-dom"];

function extractNpmDependencies(content) {
  const deps = new Set();
  const importRegex = /import\s+(?:[^"']+\s+from\s+)?["']([^"']+)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const pkg = match[1];
    if (
      !pkg.startsWith(".") &&
      !pkg.startsWith("/") &&
      !pkg.startsWith("@/") &&
      !pkg.startsWith("@hudbird/")
    ) {
      let basePkg = pkg;
      if (pkg.startsWith("@")) {
        const parts = pkg.split("/");
        if (parts.length >= 2) basePkg = `${parts[0]}/${parts[1]}`;
      } else {
        basePkg = pkg.split("/")[0];
      }
      if (!CORE_DEPS.includes(basePkg)) deps.add(basePkg);
    }
  }
  return Array.from(deps);
}

function processDirectory(srcDir, type) {
  if (!fs.existsSync(srcDir)) return;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const compName = entry.name;
      const compDir = path.join(srcDir, compName);
      const files = fs.readdirSync(compDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));

      if (files.length === 0) continue;

      const item = {
        name: compName,
        type,
        dependencies: [],
        registryDependencies: [],
        files: [],
      };

      const deps = new Set();
      const regDeps = new Set();

      for (const file of files) {
        let content = fs.readFileSync(path.join(compDir, file), "utf-8");

        // Transform imports from internal relative paths to user project relative paths
        content = content.replace(/(\.\.\/)+utils\//g, "../utils/");
        if (content.includes("../utils/")) {
          regDeps.add("utils");
        }
        // Map of known core components to match prefixes against
        const CORE_COMPONENTS = [
          "Accordion",
          "Alert",
          "Avatar",
          "Badge",
          "Button",
          "Card",
          "Checkbox",
          "ComboBox",
          "DescriptionList",
          "Dialog",
          "Divider",
          "Dropdown",
          "Fieldset",
          "Heading",
          "InfiniteScroll",
          "Input",
          "Navbar",
          "Pagination",
          "Provider",
          "RadioGroup",
          "Select",
          "Sidebar",
          "Skeleton",
          "Switch",
          "Table",
          "Tabs",
          "Text",
          "Textarea",
          "Tooltip",
        ].sort((a, b) => b.length - a.length);

        // For marketing components depending on core, rewrite internal imports to direct sibling imports
        content = content.replace(
          /import\s+\{([^}]+)\}\s+from\s+["']@hudbird\/ui["'];?/g,
          (match, importsStr) => {
            const imports = importsStr
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            const groups = {};

            imports.forEach((imp) => {
              const parts = imp.split(/\s+as\s+/);
              const compName = parts[0];
              const parent = CORE_COMPONENTS.find((core) => compName.startsWith(core)) || compName;
              if (!groups[parent]) groups[parent] = [];
              groups[parent].push(imp);
            });

            return Object.entries(groups)
              .map(([parent, imps]) => {
                return `import { ${imps.join(", ")} } from "../${parent}";`;
              })
              .join("\n");
          }
        );

        // Extract NPM deps
        const fileDeps = extractNpmDependencies(content);
        fileDeps.forEach((d) => deps.add(d));

        item.files.push({
          name: file,
          content,
        });
      }

      item.dependencies = Array.from(deps);

      // Hardcode some known registry dependencies for now
      if (compName === "Testimonials") {
        regDeps.add("Card");
        regDeps.add("Avatar");
      }
      if (compName === "Faq") regDeps.add("Accordion");
      if (compName === "BentoGrid") regDeps.add("Card");
      if (compName === "Hero") {
        regDeps.add("Button");
        regDeps.add("Dropdown");
      }

      item.registryDependencies = Array.from(regDeps);

      registry[compName] = item;
    }
  }
}

// Special case for utils
function processUtils(srcDir) {
  if (!fs.existsSync(srcDir)) return;
  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".ts"));

  const item = {
    name: "utils",
    type: "registry:ui",
    files: [],
    dependencies: ["clsx", "tailwind-merge"],
  };

  for (const file of files) {
    const content = fs.readFileSync(path.join(srcDir, file), "utf-8");
    item.files.push({
      name: file,
      content,
    });
  }

  registry["utils"] = item;
}

function build() {
  console.log("Building Component Registry...");
  if (fs.existsSync(TEMPLATES_DIR)) {
    fs.rmSync(TEMPLATES_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });

  processDirectory(CORE_COMPONENTS, "registry:ui");
  processDirectory(MARKETING_COMPONENTS, "registry:marketing");
  processUtils(CORE_UTILS);

  const registryPath = path.join(TEMPLATES_DIR, "registry.json");
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), "utf-8");
  console.log(`Registry built successfully at ${registryPath}!`);
}

build();
