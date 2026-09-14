import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000; // Default Vite port, change if different
const BASE_URL = `http://localhost:${PORT}/#`;

const TEMPLATES = [
  { id: "saas-launchpad", name: "saas-launchpad.png" },
  { id: "fintech", name: "fintech.png" },
  { id: "ai-startup", name: "ai-startup.png" },
  { id: "ecommerce", name: "ecommerce.png" },
  { id: "modern-app", name: "modern-app.png" },
  { id: "enterprise", name: "digital-agency.png" },
];

const ASSETS_DIR = path.join(__dirname, "../../../public/assets/templates");

// CLI usage:
//   node capture-templates.js                        → all templates, dark + light
//   node capture-templates.js --themes=light         → light only
//   node capture-templates.js --only=ai-startup      → single template (dark + light)
//   node capture-templates.js --only=fintech --themes=dark
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  })
);

const THEMES = (args.themes || "dark,light")
  .split(",")
  .map((t) => t.trim().toLowerCase())
  .filter((t) => ["dark", "light"].includes(t));

const ONLY = (args.only || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Dark keeps the legacy filename (non-breaking for existing consumers).
// Light gets a `-light` suffix: e.g. `ai-startup.png` → `ai-startup-light.png`.
const themeFileName = (base, theme) =>
  theme === "dark" ? base : base.replace(/\.png$/, "-light.png");

async function applyTheme(page, theme) {
  // Match the OS-level scheme too (docs Header listens to prefers-color-scheme),
  // then flip the class-based Tailwind v4 dark variant that templates use
  // (`@custom-variant dark (&:is(.dark *))`). Templates force `.dark` on mount
  // via useTemplateTheme, so this must run AFTER load + settle on every pass.
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
  await page.evaluate((t) => {
    const root = window.document.documentElement;
    if (t === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, theme);
  // Wait for the dark↔light CSS transition to finish
  await new Promise((r) => setTimeout(r, 1000));
}

async function capture() {
  if (THEMES.length === 0) {
    console.error("No valid themes. Use --themes=dark,light");
    process.exit(1);
  }

  const templates = ONLY.length > 0 ? TEMPLATES.filter((t) => ONLY.includes(t.id)) : TEMPLATES;

  if (templates.length === 0) {
    console.error(`No templates match --only=${ONLY.join(",")}`);
    process.exit(1);
  }

  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  console.log(`Themes: ${THEMES.join(", ")} | Templates: ${templates.map((t) => t.id).join(", ")}`);
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      width: 1440,
      height: 900,
    },
  });

  const page = await browser.newPage();

  // We will click the dark mode toggle on the page itself instead

  for (const template of templates) {
    const url = `${BASE_URL}/templates/${template.id}`;
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      // Wait a bit for framer motion animations to settle
      await new Promise((r) => setTimeout(r, 2000));

      for (const theme of THEMES) {
        await applyTheme(page, theme);

        const outPath = path.join(ASSETS_DIR, themeFileName(template.name, theme));
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`Saved [${theme}] screenshot to ${outPath}`);
      }
    } catch (e) {
      console.error(`Failed to capture ${template.id}:`, e.message);
    }
  }

  await browser.close();
  console.log("Done.");
}

capture();
