import { test, expect } from "@playwright/test";

test.describe("Hudbird UI InputOTP Component E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/input-otp");
    await page.waitForLoadState("networkidle");
  });

  test("renders InputOTP container and slot elements", async ({ page }) => {
    await expect(page.locator("h1:has-text('Input OTP')")).toBeVisible();

    // Check 2FA title in hero preview
    await expect(page.locator("h4:has-text('Two-Factor Authentication')")).toBeVisible();

    // Locate the OTP input
    const otpInput = page.locator("input[autoComplete='one-time-code']").first();
    await expect(otpInput).toBeAttached();
  });

  test("types 6 digits with auto-advance and displays completion message", async ({ page }) => {
    const heroInput = page.getByLabel("One-Time Password code").first();

    // Focus and type digits
    await heroInput.focus();
    await page.keyboard.type("482910");

    // Assert completion message appears
    const completeMessage = page
      .locator("text=Code complete (482910) - ready for verification")
      .first();
    await expect(completeMessage).toBeVisible();
    await expect(heroInput).toHaveValue("482910");
  });

  test("handles backspace to delete digits and removes completion state", async ({ page }) => {
    const heroInput = page.getByLabel("One-Time Password code").first();

    await heroInput.focus();
    await page.keyboard.type("123456");

    const completeMessage = page
      .locator("text=Code complete (123456) - ready for verification")
      .first();
    await expect(completeMessage).toBeVisible();

    // Backspace twice
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");

    // Completion message should now be hidden
    await expect(completeMessage).not.toBeVisible();
    await expect(heroInput).toHaveValue("1234");
  });

  test("filters out non-numeric characters automatically", async ({ page }) => {
    const heroInput = page.getByLabel("One-Time Password code").first();

    await heroInput.focus();
    await page.keyboard.type("ab9cd2ef");

    // Only 9 and 2 should pass the pattern filter
    await expect(heroInput).toHaveValue("92");
  });

  test("renders 4-digit PIN variant correctly", async ({ page }) => {
    const pinSection = page.locator("div#four-digit-pin");
    await expect(pinSection).toBeVisible();

    const pinInput = pinSection.getByLabel("One-Time Password code");
    await pinInput.focus();
    await page.keyboard.type("5544");

    await expect(pinInput).toHaveValue("5544");
  });
});
