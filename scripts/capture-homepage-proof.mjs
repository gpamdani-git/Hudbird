import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const base = process.env.HOMEPAGE_URL || "http://127.0.0.1:3000";
const out = path.resolve("apps/docs/src/assets/homepage");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const mode of ["light", "dark"]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    await page.addInitScript((theme) => localStorage.setItem("theme", theme), mode);
    await page.emulateMedia({ colorScheme: mode, reducedMotion: "reduce" });
    await page.goto(`${base}/#/marketing/landing-builder`, { waitUntil: "networkidle" });
    await page.waitForFunction(
      (theme) => document.documentElement.classList.contains("dark") === (theme === "dark"),
      mode
    );

    const brandTrigger = page.getByRole("button", {
      name: "Brand and preview theme",
      exact: true,
    });
    if ((await brandTrigger.getAttribute("aria-expanded")) !== "true") await brandTrigger.click();
    await page.waitForTimeout(350);
    await page.locator("#builder-brand").screenshot({
      path: path.join(out, `builder-brand-${mode}.png`),
    });
    const workspaceLocator = page.locator("#builder-workspace");
    await workspaceLocator.evaluate((node) => node.scrollIntoView({ block: "start" }));
    await page.waitForTimeout(100);
    await page.screenshot({
      path: path.join(out, `builder-sections-${mode}.png`),
      fullPage: false,
    });
    await page.locator("#builder-source-preview").screenshot({
      path: path.join(out, `builder-source-${mode}.png`),
    });
    await context.close();
  }
  console.log(`Captured current Hudbird builder proof in ${out}`);
} finally {
  await browser.close();
}
