import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const base = process.env.PILOT_URL || "http://127.0.0.1:3010";
const out = path.resolve("output/playwright/startup-pilot");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const results = [];
try {
  for (const brand of ["clear-blue", "studio-green"]) {
    for (const mode of ["light", "dark"]) {
      for (const hero of ["centered", "split", "slideshow", "video", "interactive"]) {
        for (const width of process.argv.includes("--workbench-only")
          ? []
          : [375, 768, 1024, 1440]) {
          await page.setViewportSize({ width, height: 1000 });
          await page.goto(
            `${base}/#/templates/startup-pilot?brand=${brand}&mode=${mode}&hero=${hero}`,
            { waitUntil: "networkidle" }
          );
          await page.getByRole("heading", { level: 1 }).waitFor();
          assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
          const measurements = await page.evaluate(() => ({
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            accent: getComputedStyle(document.querySelector("[data-brand]"))
              .getPropertyValue("--hb-accent")
              .trim(),
            overflow: [...document.querySelectorAll("main h1, main h2, main button, header nav")]
              .filter((node) => {
                const r = node.getBoundingClientRect();
                return r.width && (r.right > innerWidth + 1 || r.left < -1);
              })
              .map((node) => node.textContent),
          }));
          assert.ok(
            measurements.scrollWidth <= width + 1,
            JSON.stringify({ brand, mode, hero, width, measurements })
          );
          assert.deepEqual(
            measurements.overflow,
            [],
            JSON.stringify({ brand, mode, hero, width, measurements })
          );
          assert.equal(measurements.accent, brand === "clear-blue" ? "#2457d6" : "#237459");
          results.push({ brand, mode, hero, width, ...measurements });
          if (brand === "clear-blue" && mode === "light" && (width === 375 || width === 1440)) {
            await page.screenshot({ path: path.join(out, `${hero}-${width}.png`), fullPage: true });
          }
          if (brand === "studio-green" && mode === "dark" && hero === "split" && width === 1440) {
            await page.screenshot({ path: path.join(out, "green-dark-1440.png"), fullPage: true });
          }
        }
      }
    }
  }
  await page.goto(`${base}/#/templates/startup-pilot?hero=slideshow`);
  const originalUrl = page.url();
  await page.getByRole("link", { name: "See the product demo" }).click();
  assert.equal(page.url(), originalUrl);
  assert.equal(await page.evaluate(() => document.activeElement.id), "product-demo");
  await page.getByRole("button", { name: "Next slide" }).click();
  assert.match(await page.getByRole("status").textContent(), /Slide 2 of 2/);
  await page.getByRole("button", { name: "Previous slide" }).click();
  assert.match(await page.getByRole("status").textContent(), /Slide 1 of 2/);
  await page.goto(`${base}/#/templates/startup-pilot?hero=interactive`);
  const tabs = page.getByRole("tablist").first();
  await tabs.getByRole("tab", { name: "Overview" }).focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(
    await tabs.getByRole("tab", { name: "Projects" }).getAttribute("aria-selected"),
    "true"
  );
  await page.getByRole("button", { name: "Is this a working product?" }).click();
  assert.ok(
    await page
      .getByText("It does not include a backend, accounts, or a connected product service.", {
        exact: false,
      })
      .isVisible()
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${base}/#/templates/startup-pilot?hero=video`);
  assert.equal(await page.locator("video").evaluate((video) => video.paused), true);
  await page.getByRole("button", { name: "Play background video" }).click();
  await page.getByRole("button", { name: "Pause background video" }).waitFor();
  assert.equal(await page.locator("video").evaluate((video) => video.paused), false);
  await page.getByRole("button", { name: "Pause background video" }).click();
  assert.equal(await page.locator("video").evaluate((video) => video.paused), true);
  await page.goto(`${base}/#/marketing/hero-pilot`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Choose story first" }).click();
  await page
    .getByRole("group", { name: "Hero layout" })
    .getByRole("button", { name: "Slideshow", exact: true })
    .click();
  assert.ok(await page.getByRole("link", { name: "Download brand and composition" }).isVisible());
  await page.getByLabel("Brand name", { exact: true }).fill("My startup");
  await page.getByLabel("Primary color (six-digit hex)", { exact: true }).fill("#ffd400");
  assert.equal(
    await page
      .locator(".hb-pilot")
      .first()
      .evaluate((node) => getComputedStyle(node).getPropertyValue("--hb-on-accent").trim()),
    "#000000"
  );
  await page.screenshot({ path: path.join(out, "workbench.png"), fullPage: true });
  await page.setViewportSize({ width: 375, height: 900 });
  await page.waitForFunction(() => document.documentElement.scrollWidth <= innerWidth + 1);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  await page.screenshot({ path: path.join(out, "workbench-mobile.png"), fullPage: true });
  assert.deepEqual(errors, []);
  await fs.writeFile(
    path.join(out, results.length ? "results.json" : "workbench-check.json"),
    JSON.stringify({ checks: results.length, results, errors, interactions: "passed" }, null, 2)
  );
  console.log(
    `Passed ${results.length} viewport/brand/mode/hero checks plus slideshow, keyboard tabs, FAQ, video, and workbench interactions.`
  );
} catch (error) {
  console.error(
    JSON.stringify(
      {
        url: page.url(),
        errors,
        layout: await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
          overflow: [...document.querySelectorAll("body *")]
            .filter((n) => n.getBoundingClientRect().right > innerWidth + 1)
            .slice(0, 15)
            .map((n) => ({
              tag: n.tagName,
              class: n.className,
              width: n.getBoundingClientRect().width,
              height: n.getBoundingClientRect().height,
              text: n.textContent.slice(0, 60),
            })),
        })),
      },
      null,
      2
    )
  );
  await page.screenshot({ path: path.join(out, "failure.png"), fullPage: false });
  throw error;
} finally {
  await browser.close();
}
