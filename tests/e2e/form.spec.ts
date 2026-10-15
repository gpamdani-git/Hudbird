import { test, expect } from "@playwright/test";

test.describe("Hudbird UI Form Component E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/form");
    await page.waitForLoadState("networkidle");
  });

  test("renders form inputs, labels, descriptions, and submit button", async ({ page }) => {
    // Check main title
    await expect(page.locator("h1:has-text('Form')")).toBeVisible();

    // Check Hero Form fields
    const usernameInput = page.locator("input[placeholder='e.g. alex_chen']").first();
    const emailInput = page.locator("input[placeholder='alex@company.com']").first();
    const submitBtn = page.locator("button:has-text('Save Account Settings')").first();

    await expect(usernameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });

  test("triggers required field validation errors upon submitting empty form", async ({ page }) => {
    const submitBtn = page.locator("button:has-text('Save Account Settings')").first();
    await submitBtn.click();

    // Verify error messages appear
    const usernameError = page.locator("text=Username is required").first();
    const emailError = page.locator("text=Email is required").first();

    await expect(usernameError).toBeVisible();
    await expect(emailError).toBeVisible();

    // Verify aria-invalid on inputs
    const usernameInput = page.locator("input[placeholder='e.g. alex_chen']").first();
    await expect(usernameInput).toHaveAttribute("aria-invalid", "true");
  });

  test("validates minLength rule on username field", async ({ page }) => {
    const usernameInput = page.locator("input[placeholder='e.g. alex_chen']").first();
    const submitBtn = page.locator("button:has-text('Save Account Settings')").first();

    // Type 2 characters (minLength is 3)
    await usernameInput.fill("al");
    await submitBtn.click();

    const minLengthError = page.locator("text=Must be at least 3 characters").first();
    await expect(minLengthError).toBeVisible();
  });

  test("validates email regex format rule", async ({ page }) => {
    const usernameInput = page.locator("input[placeholder='e.g. alex_chen']").first();
    const emailInput = page.locator("input[placeholder='alex@company.com']").first();
    const submitBtn = page.locator("button:has-text('Save Account Settings')").first();

    await usernameInput.fill("alex_chen");
    await emailInput.fill("not-an-email");
    await submitBtn.click();

    const emailFormatError = page.locator("text=Please enter a valid email address").first();
    await expect(emailFormatError).toBeVisible();
  });

  test("submits valid form data and renders success feedback", async ({ page }) => {
    const usernameInput = page.locator("input[placeholder='e.g. alex_chen']").first();
    const emailInput = page.locator("input[placeholder='alex@company.com']").first();
    const submitBtn = page.locator("button:has-text('Save Account Settings')").first();

    await usernameInput.fill("alex_chen");
    await emailInput.fill("alex@company.com");
    await submitBtn.click();

    // Verify success banner appears
    const successBanner = page.locator("text=Account settings saved:").first();
    await expect(successBanner).toBeVisible();

    // Verify submitted JSON payload preview
    const payloadPreview = page.locator("pre:has-text('alex_chen')").first();
    await expect(payloadPreview).toBeVisible();
    await expect(payloadPreview).toContainText("alex@company.com");
  });

  test("ensures preview forms are completely isolated from adjacent demos", async ({ page }) => {
    // Fill and submit Hero Form
    const usernameInput = page.locator("input[placeholder='e.g. alex_chen']").first();
    const emailInput = page.locator("input[placeholder='alex@company.com']").first();
    const submitBtn = page.locator("button:has-text('Save Account Settings')").first();

    await usernameInput.fill("isolated_user");
    await emailInput.fill("isolated@test.com");
    await submitBtn.click();

    // Verify Hero Form submitted
    await expect(page.locator("text=Account settings saved:").first()).toBeVisible();

    // Verify that the feedback form (Demo 4) remains untampered
    const feedbackTextarea = page.locator("textarea[placeholder*='tell us' i]").first();
    if (await feedbackTextarea.isVisible()) {
      await expect(feedbackTextarea).toHaveValue("");
    }
  });
});
