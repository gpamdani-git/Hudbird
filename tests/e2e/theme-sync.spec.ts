import { test, expect } from "@playwright/test";

test.describe("Theme Builder & Token Sync E2E Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/themes");
    await page.waitForTimeout(500);

    // Minimize floating panel so it does not intercept clicks on the main canvas
    const minimizeBtn = page
      .locator("button[title='Minimize'], button[title='Collapse Theme Editor']")
      .first();
    if (await minimizeBtn.isVisible()) {
      await minimizeBtn.click();
      await page.waitForTimeout(200);
    }
  });

  test("renders theme sync bar and dashboard mockup", async ({ page }) => {
    // Check page title and sync bar
    const title = page.locator("h1:has-text('Theme Builder & Token Sync')");
    await expect(title).toBeVisible();

    const syncBar = page.locator("h3:has-text('Theme Token Sync & Exporter')");
    await expect(syncBar).toBeVisible();

    // Check presence of dashboard mockup
    const preview = page.locator("[data-theme-preview]");
    await expect(preview).toBeVisible();
    await expect(preview.locator("h2:has-text('Overview')")).toBeVisible();
  });

  test("allows selecting primary color preset and updates selection", async ({ page }) => {
    const syncBar = page.locator("[data-theme-sync-bar]");

    // Click on the Emerald preset button
    const emeraldBtn = syncBar.locator("button[title*='Emerald']");
    await expect(emeraldBtn).toBeVisible();
    await emeraldBtn.click();
    await page.waitForTimeout(200);

    // Emerald button should now have the active Check icon
    await expect(emeraldBtn.locator("svg")).toBeVisible();

    // Click on the Blue preset button
    const blueBtn = syncBar.locator("button[title*='Blue']");
    await expect(blueBtn).toBeVisible();
    await blueBtn.click();
    await page.waitForTimeout(200);

    await expect(blueBtn.locator("svg")).toBeVisible();
  });

  test("allows toggling neutral base and border radius presets", async ({ page }) => {
    const syncBar = page.locator("[data-theme-sync-bar]");

    // Click on 'Slate' base color inside the sync bar
    const slateBtn = syncBar.getByRole("button", { name: "Slate", exact: true });
    await expect(slateBtn).toBeVisible();
    await slateBtn.click();
    await page.waitForTimeout(200);
    await expect(slateBtn).toHaveClass(/font-semibold/);

    // Click on radius '0' (Sharp)
    const sharpRadiusBtn = syncBar.getByRole("button", { name: "0", exact: true });
    await expect(sharpRadiusBtn).toBeVisible();
    await sharpRadiusBtn.click();
    await page.waitForTimeout(200);
    await expect(sharpRadiusBtn).toHaveClass(/font-semibold/);
  });

  test("opens export tokens dialog and displays Tailwind v4 and Figma DTCG tokens", async ({
    page,
  }) => {
    // Click "Export Tokens" button in the sync bar
    const exportBtn = page.locator("[data-theme-sync-bar] button:has-text('Export Tokens')");
    await expect(exportBtn).toBeVisible();
    await exportBtn.click();

    // Dialog should open
    const dialogTitle = page.locator("h2:has-text('Export Theme & Design Tokens')");
    await expect(dialogTitle).toBeVisible();

    // Tailwind tab should be active by default and contain @theme code block
    const tailwindCodeBlock = page.locator("pre code").first();
    await expect(tailwindCodeBlock).toBeVisible();
    const tailwindCode = await tailwindCodeBlock.innerText();
    expect(tailwindCode).toContain("@theme");
    expect(tailwindCode).toContain("--color-primary-");

    // Click on Figma Tokens Studio tab
    const figmaTabBtn = page.locator("button:has-text('Figma Tokens Studio')");
    await expect(figmaTabBtn).toBeVisible();
    await figmaTabBtn.click();
    await page.waitForTimeout(200);

    const figmaCodeBlock = page.locator("pre code").first();
    const figmaCode = await figmaCodeBlock.innerText();
    expect(figmaCode).toContain('"hudbird"');
    expect(figmaCode).toContain('"$metadata"');

    // Click on CSS :root tab
    const cssTabBtn = page.locator("button:has-text('CSS :root Variables')");
    await expect(cssTabBtn).toBeVisible();
    await cssTabBtn.click();
    await page.waitForTimeout(200);

    const cssCodeBlock = page.locator("pre code").first();
    const cssCode = await cssCodeBlock.innerText();
    expect(cssCode).toContain(":root");
    expect(cssCode).toContain("--color-primary-500");

    // Click on components.json tab
    const compJsonTabBtn = page.locator("button:has-text('components.json')");
    await expect(compJsonTabBtn).toBeVisible();
    await compJsonTabBtn.click();
    await page.waitForTimeout(200);

    const compJsonCodeBlock = page.locator("pre code").last();
    const compJsonCode = await compJsonCodeBlock.innerText();
    expect(compJsonCode).toContain('"baseColor"');

    // Close dialog
    const closeBtn = page.locator("button:has-text('Close')").first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await page.keyboard.press("Escape");
    }
    await page.waitForTimeout(300);
  });
});
