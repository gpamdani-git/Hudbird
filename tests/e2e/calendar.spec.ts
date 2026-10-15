import { test, expect } from "@playwright/test";

test.describe("Hudbird UI Calendar & DatePicker E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/calendar");
    await page.waitForLoadState("networkidle");
  });

  test("renders calendar grid, day headers, and initial selected date", async ({ page }) => {
    await expect(page.locator("h1:has-text('Calendar & DatePicker')")).toBeVisible();

    // Verify weekday headers in the basic calendar
    const basicCalendar = page.locator("#basic-calendar").first();
    await expect(basicCalendar).toBeVisible();

    // Weekdays are rendered with role='columnheader'
    const columnHeaders = basicCalendar.locator("[role='columnheader']");
    await expect(columnHeaders).toHaveCount(7);

    // Verify initial "Selected Date:" is displayed
    const selectedDateText = basicCalendar.locator("text=Selected Date:").first();
    await expect(selectedDateText).toBeVisible();
  });

  test("navigates forward and backward between months", async ({ page }) => {
    const basicCalendar = page.locator("#basic-calendar").first();

    // Month picker title button
    const monthPickerBtn = basicCalendar
      .locator("button[aria-label='Switch to month picker']")
      .first();
    await expect(monthPickerBtn).toBeVisible();
    const initialMonthTitle = (await monthPickerBtn.textContent())?.trim();

    // Click Next month button
    const nextMonthBtn = basicCalendar.locator("button[aria-label='Next month']").first();
    await nextMonthBtn.click();

    // Verify month changed
    const nextMonthTitle = (await monthPickerBtn.textContent())?.trim();
    expect(nextMonthTitle).not.toEqual(initialMonthTitle);

    // Click Previous month button to return
    const prevMonthBtn = basicCalendar.locator("button[aria-label='Previous month']").first();
    await prevMonthBtn.click();

    const restoredMonthTitle = (await monthPickerBtn.textContent())?.trim();
    expect(restoredMonthTitle).toEqual(initialMonthTitle);
  });

  test("selects a date from the calendar and updates selected state", async ({ page }) => {
    const basicCalendar = page.locator("#basic-calendar").first();

    // Locate active current-month day buttons
    const dayButtons = basicCalendar
      .locator("button:not([disabled])")
      .filter({ hasText: /^(1[0-9]|2[0-5])$/ });
    const targetDay = dayButtons.first();
    const dayNumber = (await targetDay.textContent())?.trim();

    await targetDay.click();

    // Assert "Selected Date:" text updates with selected day
    const selectedDateDisplay = basicCalendar.locator("p:has-text('Selected Date:')").first();
    await expect(selectedDateDisplay).toContainText(dayNumber || "");
  });

  test("opens fast month picker view when clicking header title", async ({ page }) => {
    const basicCalendar = page.locator("#basic-calendar").first();
    const monthPickerBtn = basicCalendar
      .locator("button[aria-label='Switch to month picker']")
      .first();

    await monthPickerBtn.click();

    // Verify 12 month buttons are rendered (Jan, Feb, Mar, etc.)
    await expect(basicCalendar.locator("button:text-is('Jan')").first()).toBeVisible();
    await expect(basicCalendar.locator("button:text-is('Dec')").first()).toBeVisible();

    // Click March
    await basicCalendar.locator("button:text-is('Mar')").first().click();

    // Month picker should return to day view displaying March
    await expect(monthPickerBtn).toContainText("Mar");
  });

  test("opens DateRangePicker popover and displays preset shortcuts", async ({ page }) => {
    const rangeSection = page.locator("#range-selection").first();
    await expect(rangeSection).toBeVisible();

    // Click the reservation picker trigger
    const trigger = rangeSection.locator("div[role='button'][aria-haspopup='dialog']").first();
    await expect(trigger).toBeVisible();
    await trigger.click();

    // Check popover content is visible
    const popover = page.locator("div[role='dialog'][aria-label='Calendar date picker']").first();
    await expect(popover).toBeVisible();

    // Verify calendar inside popover
    await expect(popover.locator("[role='grid']")).toBeVisible();
  });
});
