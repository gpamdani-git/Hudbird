import { test, expect } from "@playwright/test";

test.describe("Hudbird UI Command & Global Search E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/installation");
    await page.waitForLoadState("networkidle");
  });

  test("opens global search modal via trigger button and focuses search input", async ({
    page,
  }) => {
    const searchTrigger = page.locator("#global-search-bar").first();
    await expect(searchTrigger).toBeVisible();

    await searchTrigger.click();

    // Verify search results modal appears
    const searchResults = page.locator("#search-results-list");
    await expect(searchResults).toBeVisible();

    // Verify search input is focused
    const searchInput = page.locator("input[placeholder*='Search components']");
    await expect(searchInput).toBeFocused();
  });

  test("filters search results in real time as user types", async ({ page }) => {
    const searchTrigger = page.locator("#global-search-bar").first();
    await searchTrigger.click();

    const searchInput = page.locator("input[placeholder*='Search components']");

    // Search for "Button"
    await searchInput.fill("Button");
    await page.waitForTimeout(200);

    const buttonResult = page
      .locator("#search-results-list [role='option']:has-text('Button')")
      .first();
    await expect(buttonResult).toBeVisible();

    // Search for "Calendar"
    await searchInput.fill("Calendar");
    await page.waitForTimeout(200);

    const calendarResult = page
      .locator("#search-results-list [role='option']:has-text('Calendar')")
      .first();
    await expect(calendarResult).toBeVisible();
  });

  test("navigates to target component page using keyboard Enter selection", async ({ page }) => {
    const searchTrigger = page.locator("#global-search-bar").first();
    await searchTrigger.click();

    const searchInput = page.locator("input[placeholder*='Search components']");
    await searchInput.fill("Form");
    await page.waitForTimeout(200);

    // Press Enter to select first highlighted result
    await searchInput.press("Enter");

    // Verify URL navigated to /#/form
    await expect(page).toHaveURL(/.*#\/form/);

    // Verify modal is closed
    const searchResults = page.locator("#search-results-list");
    await expect(searchResults).not.toBeVisible();
  });

  test("dismisses search modal when pressing Escape key", async ({ page }) => {
    const searchTrigger = page.locator("#global-search-bar").first();
    await searchTrigger.click();

    const searchResults = page.locator("#search-results-list");
    await expect(searchResults).toBeVisible();

    // Press Escape
    await page.keyboard.press("Escape");

    // Assert dialog closed
    await expect(searchResults).not.toBeVisible();
  });

  test("renders standalone Command component demo on /#/command", async ({ page }) => {
    await page.goto("/#/command");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1:has-text('Command')")).toBeVisible();

    // Check main command input
    const commandInput = page.locator("input[placeholder='Type a command or search...']").first();
    await expect(commandInput).toBeVisible();

    // Test filter in standalone command
    await commandInput.fill("Calculator");
    await expect(page.locator("span:text-is('Calculator')").first()).toBeVisible();
  });
});
