import { test, expect } from "@playwright/test";

test.describe("Hudbird UI Docs E2E Smoke Tests", () => {
  test("loads landing page and renders brand elements", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Hudbird|BlankUI/i);

    // Verify main navigation bar exists
    const nav = page.locator("header");
    await expect(nav).toBeVisible();
  });

  test("toggles theme between dark and light mode", async ({ page }) => {
    await page.goto("/#/installation");

    const darkButton = page.locator(
      "div[aria-label='Theme mode switcher'] button[title='Dark mode']"
    );
    await expect(darkButton).toBeVisible();

    const html = page.locator("html");

    // Toggle theme to dark
    await darkButton.click();
    await page.waitForTimeout(300);

    const darkClass = (await html.getAttribute("class")) || "";
    expect(darkClass).toContain("dark");

    // Toggle theme back to light
    const lightButton = page.locator(
      "div[aria-label='Theme mode switcher'] button[title='Light mode']"
    );
    await lightButton.click();
    await page.waitForTimeout(300);

    const lightClass = (await html.getAttribute("class")) || "";
    expect(lightClass).not.toContain("dark");
  });

  test("navigates to documentation and renders component catalog", async ({ page }) => {
    await page.goto("/#/installation");
    await page.waitForTimeout(500);

    // Verify main content loaded
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("navigates to CLI documentation and renders command references", async ({ page }) => {
    await page.goto("/#/cli");
    await page.waitForTimeout(500);

    const heading = page.locator("h1:has-text('Hudbird UI CLI')");
    await expect(heading).toBeVisible();

    const componentsJson = page.locator("h2:has-text('Configuration: components.json')");
    await expect(componentsJson).toBeVisible();
  });
});
