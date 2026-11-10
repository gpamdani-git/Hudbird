import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLI_DIR = path.resolve(__dirname, "..");
const ROOT_DIR = path.resolve(CLI_DIR, "../..");
const TEMPLATES_DIR = path.resolve(CLI_DIR, "templates");

const CORE_COMPONENTS_DIR = path.resolve(ROOT_DIR, "packages/core/src/components");
const CORE_UTILS_DIR = path.resolve(ROOT_DIR, "packages/core/src/utils");
const MARKETING_COMPONENTS_DIR = path.resolve(ROOT_DIR, "packages/marketing/src/components");
const MARKETING_BLOCKS_DIR = path.resolve(ROOT_DIR, "packages/marketing/src/blocks");
const DOCS_TEMPLATES_DIR = path.resolve(ROOT_DIR, "apps/docs/src/components/templates");

const registry = {};
const CORE_DEPS = ["react", "react-dom"];

const CATEGORIES = {
  // Primitives & Layout
  Button: "primitives",
  Badge: "primitives",
  Card: "primitives",
  DoubleBezelCard: "primitives",
  LiquidGlass: "primitives",
  GoldenGateGlass: "primitives",
  Text: "primitives",
  Heading: "primitives",
  Divider: "primitives",
  Avatar: "primitives",
  Skeleton: "primitives",
  Slot: "primitives",
  KineticButton: "primitives",
  EditorialImage: "primitives",
  HudbirdIcon: "primitives",
  IconBox: "primitives",
  Section: "primitives",
  Container: "primitives",
  Grid: "primitives",

  // Form & Inputs
  Input: "forms",
  InputOTP: "forms",
  Form: "forms",
  Textarea: "forms",
  Checkbox: "forms",
  Select: "forms",
  ComboBox: "forms",
  RadioGroup: "forms",
  Switch: "forms",
  Slider: "forms",
  Fieldset: "forms",

  // Overlays & Navigation
  Dialog: "navigation",
  Sheet: "navigation",
  Popover: "navigation",
  Dropdown: "navigation",
  Command: "navigation",
  Breadcrumbs: "navigation",
  Navbar: "navigation",
  NavigationMenu: "navigation",
  Sidebar: "navigation",
  Pagination: "navigation",
  Tabs: "navigation",
  Accordion: "navigation",

  // Feedback & Motion
  Alert: "feedback",
  Toast: "feedback",
  Progress: "feedback",
  Tooltip: "feedback",
  InfiniteScroll: "feedback",
  Motion: "feedback",
  SplitTextReveal: "feedback",
  StickyStack: "feedback",
  CustomCursor: "feedback",
  Magnetic: "feedback",
  MouseGlow: "feedback",
  SmoothStackingWrapper: "feedback",
  StackingWrapper: "feedback",

  // Data & Charts
  Table: "data",
  DescriptionList: "data",
  Calendar: "data",
  LineChart: "charts",
  BarChart: "charts",
  AreaChart: "charts",
  PieChart: "charts",
  RadialChart: "charts",
  RadarChart: "charts",
  ComposedChart: "charts",
  ChartTooltip: "charts",

  // Marketing & Sections
  Hero: "marketing",
  HeroSection: "marketing",
  LandingNavbar: "marketing",
  LandingLogoCloud: "marketing",
  LandingBenefits: "marketing",
  LandingFeatureShowcase: "marketing",
  LandingHowItWorks: "marketing",
  LandingIntegrations: "marketing",
  LandingTestimonials: "marketing",
  LandingPricing: "marketing",
  LandingFaq: "marketing",
  LandingCta: "marketing",
  LandingFooter: "marketing",
  LandingHeroShowcase: "marketing",
  LandingBuilderShowcase: "marketing",
  LandingShared: "marketing",
  FullscreenVideoPlayer: "marketing",
  BentoGrid: "marketing",
  FeatureSection: "marketing",
  Pricing: "marketing",
  Testimonials: "marketing",
  Faq: "marketing",
  Footer: "marketing",
  Cta: "marketing",
  LogoCloud: "marketing",
  Globe: "marketing",
  ParticleSphere: "marketing",
  BlurRevealText: "marketing",
  BlueprintStudio: "marketing",

  // Signature Blocks
  SignatureBlocks: "marketing",
  MorphingIsland: "marketing",
  AgentArtifactCanvas: "marketing",
  InteractiveBentoShowcase: "marketing",

  // Complete Templates & Pages
  StartupPilot: "marketing",
  StartupPage: "marketing",
  LandingPage: "marketing",
  SaaSTemplate: "marketing",
  FintechTemplate: "marketing",
  EcommerceTemplate: "marketing",
  AiStartupTemplate: "marketing",
  DigitalAgencyTemplate: "marketing",
  HospitalityTemplate: "marketing",
  AdminCmsTemplate: "marketing",
  ModernAppTemplate: "marketing",
};

const KNOWN_CORE_COMPONENTS = [
  "Accordion",
  "Alert",
  "AreaChart",
  "Avatar",
  "Badge",
  "BarChart",
  "Breadcrumbs",
  "Button",
  "Calendar",
  "Card",
  "ChartTooltip",
  "Checkbox",
  "ComboBox",
  "Command",
  "ComposedChart",
  "Container",
  "DescriptionList",
  "Dialog",
  "Divider",
  "DoubleBezelCard",
  "Dropdown",
  "EditorialImage",
  "Fieldset",
  "Form",
  "GoldenGateGlass",
  "Grid",
  "Heading",
  "HudbirdIcon",
  "IconBox",
  "InfiniteScroll",
  "Input",
  "InputOTP",
  "KineticButton",
  "LineChart",
  "LiquidGlass",
  "Motion",
  "Navbar",
  "NavigationMenu",
  "Pagination",
  "PieChart",
  "Popover",
  "Progress",
  "Provider",
  "RadarChart",
  "RadialChart",
  "RadioGroup",
  "Section",
  "Select",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Slider",
  "Slot",
  "SplitTextReveal",
  "StickyStack",
  "Switch",
  "Table",
  "Tabs",
  "Text",
  "Textarea",
  "Toast",
  "Tooltip",
].sort((a, b) => b.length - a.length);

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

// Recursively collect all matching code files in a folder
function getFilesRecursively(dir, baseDir = dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getFilesRecursively(fullPath, baseDir));
    } else if (
      (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts") || entry.name.endsWith(".css")) &&
      !entry.name.endsWith(".test.tsx") &&
      !entry.name.endsWith(".test.ts")
    ) {
      files.push({
        name: path.relative(baseDir, fullPath).split(path.sep).join("/"),
        fullPath,
      });
    }
  }
  return files;
}

function transformHudbirdImports(content, depth, regDeps, localFiles = new Set(), compName = "") {
  const parentRel = "../".repeat(depth + 1);

  // Transform utils imports
  content = content.replace(/(\.\.\/)+utils\//g, `${parentRel}utils/`);
  if (content.includes("utils/")) regDeps.add("utils");

  // Rewrite @hudbird/ui imports to direct sibling imports
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
        const name = parts[0].replace(/^type\s+/, "");
        const aliases = {
          Tab: "Tabs",
          TabList: "Tabs",
          TabPanel: "Tabs",
          Lead: "Text",
          Code: "Text",
          Kbd: "Text",
          Strong: "Text",
          Eyebrow: "Text",
          Blockquote: "Text",
          Mark: "Text",
          CircularProgress: "Progress",
          MotionReveal: "Motion",
          MotionStagger: "Motion",
          MotionSlideshow: "Motion",
          MotionProgress: "Motion",
          GridItem: "Grid",
          AccordionItem: "Accordion",
        };
        const parent =
          aliases[name] || KNOWN_CORE_COMPONENTS.find((core) => name.startsWith(core)) || name;
        regDeps.add(parent);
        if (!groups[parent]) groups[parent] = [];
        groups[parent].push(imp);
      });

      return Object.entries(groups)
        .map(([parent, imps]) => {
          return `import { ${imps.join(", ")} } from "${parentRel}${parent}";`;
        })
        .join("\n");
    }
  );

  // Rewrite @hudbird/schemas imports
  content = content.replace(/(["'])@hudbird\/schemas\1/g, `"${parentRel}CompositionSchema"`);
  if (content.includes("CompositionSchema")) regDeps.add("CompositionSchema");

  // Rewrite @hudbird/marketing imports
  content = content.replace(
    /from\s+["']@hudbird\/marketing(?:\/[^"']*)?["']/g,
    `from "${parentRel}LandingShared"`
  );

  // Extract relative imports to sibling components (ignoring local internal files)
  for (const match of content.matchAll(/from\s+["'](?:\.\.\/)+([^/"']+)(?:\/[^"']*)?["']/g)) {
    const target = match[1];
    if (
      target &&
      target !== compName &&
      target !== "." &&
      target !== ".." &&
      !target.startsWith("utils") &&
      !localFiles.has(target)
    ) {
      regDeps.add(target);
    }
  }

  return content;
}

function processDirectory(srcDir, type) {
  if (!fs.existsSync(srcDir)) return;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    // 1. Process directory component
    if (entry.isDirectory()) {
      const compName = entry.name;
      const compDir = path.join(srcDir, compName);
      const files = getFilesRecursively(compDir);

      if (files.length === 0) continue;

      const item = {
        name: compName,
        type,
        category:
          CATEGORIES[compName] || (type === "registry:marketing" ? "marketing" : "primitives"),
        dependencies: [],
        registryDependencies: [],
        files: [],
      };

      const deps = new Set();
      const regDeps = new Set();
      const localFiles = new Set(files.map((f) => path.basename(f.name, path.extname(f.name))));

      for (const file of files) {
        let content = fs.readFileSync(file.fullPath, "utf-8");
        const depth = file.name.split("/").length - 1;

        content = transformHudbirdImports(content, depth, regDeps, localFiles, compName);

        // Extract NPM deps
        const fileDeps = extractNpmDependencies(content);
        fileDeps.forEach((d) => deps.add(d));

        item.files.push({
          name: file.name,
          content,
        });
      }

      item.dependencies = Array.from(deps);

      // Known standard registry dependencies
      if (compName === "Form" || compName === "Button" || compName === "KineticButton") {
        regDeps.add("Slot");
      }
      if (compName === "Testimonials" || compName === "LandingTestimonials") {
        regDeps.add("Card");
        regDeps.add("Avatar");
        regDeps.add("LandingShared");
      }
      if (compName === "Faq" || compName === "LandingFaq") regDeps.add("Accordion");
      if (compName === "BentoGrid") regDeps.add("Card");
      if (compName === "Hero" || compName === "HeroSection") {
        regDeps.add("Button");
        regDeps.add("Dropdown");
        regDeps.add("Section");
        regDeps.add("Container");
      }

      item.registryDependencies = Array.from(regDeps).filter(
        (dep) => dep && dep !== ".." && dep !== "." && dep !== compName && !localFiles.has(dep)
      );
      registry[compName] = item;
    }
    // 2. Process standalone files (e.g. Magnetic.tsx, MouseGlow.tsx, StackingWrapper.tsx)
    else if (
      entry.isFile() &&
      (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
      !entry.name.endsWith(".test.tsx") &&
      !entry.name.endsWith(".test.ts")
    ) {
      const compName = entry.name.replace(/\.(tsx|ts)$/, "");
      const fullPath = path.join(srcDir, entry.name);
      let content = fs.readFileSync(fullPath, "utf-8");

      const deps = new Set();
      const regDeps = new Set();
      const localFiles = new Set([compName]);

      content = transformHudbirdImports(content, 0, regDeps, localFiles, compName);

      const fileDeps = extractNpmDependencies(content);
      fileDeps.forEach((d) => deps.add(d));

      registry[compName] = {
        name: compName,
        type,
        category: CATEGORIES[compName] || "feedback",
        dependencies: Array.from(deps),
        registryDependencies: Array.from(regDeps).filter(
          (dep) => dep && dep !== ".." && dep !== "." && dep !== compName && !localFiles.has(dep)
        ),
        files: [
          {
            name: `${compName}.tsx`,
            content,
          },
        ],
      };
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
    category: "primitives",
    files: [],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
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

// Register standalone signature blocks
function processSignatureBlocks() {
  const sigDir = path.join(MARKETING_COMPONENTS_DIR, "SignatureBlocks");
  if (!fs.existsSync(sigDir)) return;

  const blocks = [
    {
      name: "MorphingIsland",
      file: "MorphingIsland.tsx",
      deps: ["framer-motion", "lucide-react"],
      regDeps: ["utils", "Button", "Badge", "Card"],
    },
    {
      name: "AgentArtifactCanvas",
      file: "AgentArtifactCanvas.tsx",
      deps: ["framer-motion", "lucide-react"],
      regDeps: ["utils", "Button", "Badge", "Card"],
    },
    {
      name: "InteractiveBentoShowcase",
      file: "InteractiveBentoShowcase.tsx",
      deps: ["framer-motion", "lucide-react"],
      regDeps: ["utils", "Button", "Card"],
    },
  ];

  for (const b of blocks) {
    const fullPath = path.join(sigDir, b.file);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, "utf-8");
      const regDeps = new Set(b.regDeps);
      const localFiles = new Set([b.name, b.file.replace(/\.tsx$/, "")]);
      content = transformHudbirdImports(content, 0, regDeps, localFiles, b.name);

      const fileDeps = extractNpmDependencies(content);
      fileDeps.forEach((d) => {
        if (!b.deps.includes(d)) b.deps.push(d);
      });

      registry[b.name] = {
        name: b.name,
        type: "registry:marketing",
        category: "marketing",
        dependencies: b.deps,
        registryDependencies: Array.from(regDeps).filter(
          (dep) => dep && dep !== ".." && dep !== "." && dep !== b.name
        ),
        files: [{ name: b.file, content }],
      };
    }
  }
}

// Register FullscreenVideoPlayer individually
function processFullscreenVideoPlayer() {
  const sharedDir = path.join(MARKETING_COMPONENTS_DIR, "LandingShared");
  const playerFile = path.join(sharedDir, "FullscreenVideoPlayer.tsx");
  const cssFile = path.join(sharedDir, "landing.css");

  if (fs.existsSync(playerFile)) {
    let content = fs.readFileSync(playerFile, "utf-8");
    const regDeps = new Set(["utils"]);
    const localFiles = new Set(["FullscreenVideoPlayer"]);
    content = transformHudbirdImports(content, 0, regDeps, localFiles, "FullscreenVideoPlayer");

    const files = [{ name: "FullscreenVideoPlayer.tsx", content }];
    if (fs.existsSync(cssFile)) {
      files.push({ name: "landing.css", content: fs.readFileSync(cssFile, "utf-8") });
    }

    registry["FullscreenVideoPlayer"] = {
      name: "FullscreenVideoPlayer",
      type: "registry:marketing",
      category: "marketing",
      dependencies: ["framer-motion", "lucide-react"],
      registryDependencies: Array.from(regDeps),
      files,
    };
  }
}

// Register Complete Niche Templates from packages/marketing/src/blocks
function processTemplates() {
  if (!fs.existsSync(MARKETING_BLOCKS_DIR)) return;

  const themeTogglePath = path.join(DOCS_TEMPLATES_DIR, "TemplateThemeToggle.tsx");
  const themeToggleContent = fs.existsSync(themeTogglePath)
    ? fs.readFileSync(themeTogglePath, "utf-8")
    : null;

  const templateMap = [
    { dir: "SaaS", name: "SaaSTemplate", alias: "template-saas", docFile: "SaaSTemplate.tsx" },
    {
      dir: "Fintech",
      name: "FintechTemplate",
      alias: "template-fintech",
      docFile: "FintechTemplate.tsx",
    },
    {
      dir: "Ecommerce",
      name: "EcommerceTemplate",
      alias: "template-ecommerce",
      docFile: "EcommerceTemplate.tsx",
    },
    {
      dir: "AiStartup",
      name: "AiStartupTemplate",
      alias: "template-ai",
      docFile: "AiStartupTemplate.tsx",
    },
    {
      dir: "Agency",
      name: "DigitalAgencyTemplate",
      alias: "template-agency",
      docFile: "DigitalAgencyTemplate.tsx",
    },
    {
      dir: "Hospitality",
      name: "HospitalityTemplate",
      alias: "template-hospitality",
      docFile: "HospitalityTemplate.tsx",
    },
    {
      dir: "AdminCms",
      name: "AdminCmsTemplate",
      alias: "template-admin",
      docFile: "AdminCmsTemplate.tsx",
    },
    {
      dir: "ModernApp",
      name: "ModernAppTemplate",
      alias: "template-modern",
      docFile: "ModernAppTemplate.tsx",
    },
  ];

  for (const t of templateMap) {
    const blockDir = path.join(MARKETING_BLOCKS_DIR, t.dir);
    if (!fs.existsSync(blockDir)) continue;

    const files = getFilesRecursively(blockDir);
    const processedFiles = [];
    const deps = new Set(["framer-motion", "lucide-react"]);
    const regDeps = new Set(["utils", "Button", "Card"]);
    const localFiles = new Set(
      files.map((file) => path.basename(file.name, path.extname(file.name)))
    );

    for (const f of files) {
      let content = fs.readFileSync(f.fullPath, "utf-8");
      const depth = f.name.split("/").length - 1;
      content = transformHudbirdImports(content, depth, regDeps, localFiles, t.name);

      const fileDeps = extractNpmDependencies(content);
      fileDeps.forEach((d) => deps.add(d));

      processedFiles.push({
        name: f.name,
        content,
      });
    }

    // Add Docs page template wrapper if exists
    if (t.docFile) {
      const docPath = path.join(DOCS_TEMPLATES_DIR, t.docFile);
      if (fs.existsSync(docPath)) {
        let docContent = fs.readFileSync(docPath, "utf-8");
        // Rewrite import from @hudbird/marketing/... to relative ./index
        docContent = docContent.replace(/@hudbird\/marketing\/[a-z0-9_-]+/gi, "./index");
        docContent = transformHudbirdImports(docContent, 0, regDeps, localFiles, t.name);
        processedFiles.push({
          name: t.docFile,
          content: docContent,
        });
      }
    }

    if (themeToggleContent) {
      let cleanToggle = transformHudbirdImports(
        themeToggleContent,
        0,
        regDeps,
        new Set(),
        "TemplateThemeToggle"
      );
      processedFiles.push({
        name: "TemplateThemeToggle.tsx",
        content: cleanToggle,
      });
    }

    const templateItem = {
      name: t.name,
      type: "registry:template",
      category: "marketing",
      dependencies: Array.from(deps),
      registryDependencies: Array.from(regDeps).filter(
        (dep) => dep && dep !== ".." && dep !== "." && dep !== t.name && !localFiles.has(dep)
      ),
      files: processedFiles,
    };

    registry[t.name] = templateItem;
    registry[t.alias] = {
      ...templateItem,
      name: t.alias,
    };
  }

  // Aliases for LandingPage and StartupPilot
  if (registry["LandingPage"]) {
    registry["template-landing-page"] = {
      ...registry["LandingPage"],
      name: "template-landing-page",
      category: "marketing",
    };
  }

  if (registry["StartupPilot"]) {
    registry["template-startup-pilot"] = {
      ...registry["StartupPilot"],
      name: "template-startup-pilot",
      category: "marketing",
    };
    registry["StartupPage"] = {
      ...registry["StartupPilot"],
      name: "StartupPage",
      category: "marketing",
    };
  }
}

function build() {
  console.log("Building Component Registry...");
  if (fs.existsSync(TEMPLATES_DIR)) {
    fs.rmSync(TEMPLATES_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });

  processDirectory(CORE_COMPONENTS_DIR, "registry:ui");
  processDirectory(MARKETING_COMPONENTS_DIR, "registry:marketing");
  processUtils(CORE_UTILS_DIR);
  processSignatureBlocks();
  processFullscreenVideoPlayer();
  processTemplates();

  registry.CompositionSchema = {
    name: "CompositionSchema",
    type: "registry:ui",
    category: "components",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        name: "index.ts",
        content: fs.readFileSync(
          path.join(ROOT_DIR, "packages/schemas/src/composition.ts"),
          "utf-8"
        ),
      },
    ],
  };

  if (registry.StartupPilot) {
    registry.StartupPilot.skill = fs.readFileSync(
      path.join(ROOT_DIR, "public/skills/startup-pilot.md"),
      "utf-8"
    );
  }
  const landingSkillPath = path.join(ROOT_DIR, "public/skills/landing-sections.md");
  if (fs.existsSync(landingSkillPath)) {
    const landingSkill = fs.readFileSync(landingSkillPath, "utf-8");
    for (const name of ["LandingShared", "LandingPage", "template-landing-page"]) {
      if (registry[name]) {
        registry[name].skill = landingSkill;
        registry[name].skillName = "hudbird-landing-sections";
      }
    }
  }

  const registryPath = path.join(TEMPLATES_DIR, "registry.json");
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), "utf-8");
  console.log(
    `Registry built successfully! Total items registered: ${Object.keys(registry).length}`
  );
  console.log(`Saved at ${registryPath}`);
}

build();
