import { describe, expect, it } from "vitest";
import {
  applyHomepageTheme,
  readHomepageTheme,
  resolveHomepageTheme,
} from "../apps/docs/src/lib/homepageTheme";

describe("homepage theme preference", () => {
  it("follows the system when there is no explicit preference", () => {
    expect(readHomepageTheme({ getItem: () => null })).toBe("system");
    expect(resolveHomepageTheme("system", true)).toBe("dark");
    expect(resolveHomepageTheme("system", false)).toBe("light");
  });

  it("restores explicit light and dark choices", () => {
    expect(readHomepageTheme({ getItem: () => "light" })).toBe("light");
    expect(readHomepageTheme({ getItem: () => "dark" })).toBe("dark");
    expect(resolveHomepageTheme("light", true)).toBe("light");
  });

  it("applies the resolved theme to the document root", () => {
    applyHomepageTheme(document.documentElement, "dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    applyHomepageTheme(document.documentElement, "light");
    expect(document.documentElement).not.toHaveClass("dark");
  });
});
