import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
const base = process.env.PILOT_URL || "http://127.0.0.1:3010";
const out = path.resolve("output/playwright/landing-sections");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  acceptDownloads: true,
  ignoreHTTPSErrors: true,
});
const page = await context.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  await page.goto(`${base}/#/marketing/landing-builder`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "One page. Your arrangement." }).waitFor();
  await page.getByRole("button", { name: "Reset layout", exact: true }).click();
  assert.equal(await page.locator("[data-builder-section]").count(), 12);
  const pricing = page.locator('[data-builder-section="pricing"]');
  await pricing.getByRole("combobox", { name: "Pricing layout" }).click();
  await page.getByRole("option", { name: "Comparison table", exact: true }).click();
  await page
    .locator('[data-builder-section="benefits"]')
    .getByRole("button", { name: "Move Benefits up" })
    .click();
  let order = await page
    .locator("[data-builder-section]")
    .evaluateAll((nodes) => nodes.map((node) => node.dataset.builderSection));
  assert.deepEqual(order.slice(0, 4), ["navbar", "hero", "benefits", "logos"]);
  await page.getByRole("switch", { name: "Show Logo Cloud", exact: true }).focus();
  await page.keyboard.press("Space");
  assert.equal(
    await page
      .frameLocator('iframe[title="Responsive Isolated Canvas"]')
      .locator("[data-landing-page] #logos")
      .count(),
    0
  );
  await page.getByRole("button", { name: "Brand and preview theme", exact: true }).click();
  await page.getByLabel("Brand name", { exact: true }).fill("My workspace");
  await page.getByRole("button", { name: "Dark preview", exact: true }).click();
  await page.getByRole("button", { name: "Brand and preview theme", exact: true }).click();
  const jsonHref = await page
    .getByRole("link", { name: "Download JSON", exact: true })
    .getAttribute("href");
  const config = JSON.parse(decodeURIComponent(jsonHref.split(",").slice(1).join(",")));
  assert.equal(config.brand.name, "My workspace");
  assert.equal(config.themeMode, "dark");
  assert.equal(config.sections.find((section) => section.type === "logos").enabled, false);
  assert.equal(config.sections.find((section) => section.type === "pricing").variant, "comparison");
  const sourceHref = await page
    .getByRole("link", { name: "Download React", exact: true })
    .getAttribute("href");
  const source = decodeURIComponent(sourceHref.split(",").slice(1).join(","));
  assert.ok(source.includes(JSON.stringify(config, null, 2)));
  await fs.writeFile(path.join(out, "exported-App.tsx"), source);
  await fs.writeFile(path.join(out, "exported-config.json"), JSON.stringify(config, null, 2));
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download JSON", exact: true }).click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "hudbird-landing.json");
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(
    await page.getByRole("switch", { name: "Show Logo Cloud", exact: true }).isChecked(),
    false
  );
  order = await page
    .locator("[data-builder-section]")
    .evaluateAll((nodes) => nodes.map((node) => node.dataset.builderSection));
  assert.deepEqual(order.slice(0, 4), ["navbar", "hero", "benefits", "logos"]);
  assert.equal(
    await page
      .frameLocator('iframe[title="Responsive Isolated Canvas"]')
      .locator("[data-landing-page]")
      .getAttribute("data-brand-mode"),
    "dark"
  );
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForFunction(
      () =>
        document.documentElement.scrollWidth <= innerWidth + 1 &&
        getComputedStyle(document.querySelector("main.flex-1")).paddingLeft ===
          (innerWidth >= 1024 ? "280px" : "0px")
    );
    await page.screenshot({ path: path.join(out, `builder-${width}.png`), fullPage: false });
  }
  await page.getByRole("button", { name: "Reset layout", exact: true }).click();
  assert.equal(
    await page.getByRole("switch", { name: "Show Logo Cloud", exact: true }).isChecked(),
    true
  );
  await page.goto(`${base}/#/templates/saas-landing?section=features&variant=tabs&mode=dark`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("tab", { name: "Projects with a next step" }).click();
  assert.ok((await page.getByRole("tabpanel").innerText()).includes("Projects with a next step"));
  await page.goto(
    `${base}/#/templates/saas-landing?section=features&variant=accordion&mode=light`,
    { waitUntil: "networkidle" }
  );
  await page.getByRole("button", { name: "Notes in context" }).click();
  assert.ok((await page.getByRole("img").getAttribute("alt")).includes("Notes"));
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${base}/#/templates/saas-landing?section=navbar&variant=mega&mode=dark`, {
      waitUntil: "networkidle",
    });
    const trigger = page.getByRole("button", { name: "Explore product", exact: true });
    await trigger.click();
    await page.getByRole("menu", { name: "Product navigation" }).waitFor();
    assert.equal(await page.getByRole("menuitem").count(), 5);
    assert.equal(
      await page
        .getByRole("menuitem")
        .first()
        .evaluate((node) => node === document.activeElement),
      true
    );
    await page.keyboard.press("ArrowDown");
    assert.equal(
      await page
        .getByRole("menuitem")
        .nth(1)
        .evaluate((node) => node === document.activeElement),
      true
    );
    await page.keyboard.press("Escape");
    await page.getByRole("menu", { name: "Product navigation" }).waitFor({ state: "hidden" });
    assert.equal(await trigger.evaluate((node) => node === document.activeElement), true);
  }
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.goto(`${base}/#/templates/saas-landing?section=pricing&variant=comparison`, {
    waitUntil: "networkidle",
  });
  const region = page.getByRole("region", { name: "Plan comparison, horizontally scrollable" });
  await region.focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(() => document.querySelector('[role="region"]').scrollLeft > 0);
  await page.goto(`${base}/#/marketing/landing-sections/features`, { waitUntil: "networkidle" });
  await page.getByText("Built with Hudbird:", { exact: false }).waitFor();
  assert.equal(await page.getByText("Built with Hudbird:", { exact: false }).count(), 1);
  assert.deepEqual(errors, []);
  await fs.writeFile(
    path.join(out, "builder-results.json"),
    JSON.stringify(
      {
        ordering: "passed",
        visibility: "passed",
        brand: "passed",
        persistence: "passed",
        reset: "passed",
        downloads: "passed",
        exportParity: "passed",
        responsive: [375, 768, 1024, 1440],
        features: "passed",
        menuKeyboard: "passed",
        pricingScroll: "passed",
        errors,
      },
      null,
      2
    )
  );
  console.log(
    "Builder controls, storage, export parity, responsive layouts, features, menu keyboard, and pricing scroll passed."
  );
} catch (error) {
  console.error(error);
  await page.screenshot({ path: path.join(out, "builder-failure.png"), fullPage: false });
  throw error;
} finally {
  await browser.close();
}
