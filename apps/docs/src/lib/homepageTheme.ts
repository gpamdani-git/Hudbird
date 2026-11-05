export type HomepageThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export function readHomepageTheme(storage: Pick<Storage, "getItem">): HomepageThemePreference {
  try {
    const stored = storage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

export function resolveHomepageTheme(
  preference: HomepageThemePreference,
  systemDark: boolean
): ResolvedTheme {
  return preference === "system" ? (systemDark ? "dark" : "light") : preference;
}

export function applyHomepageTheme(root: HTMLElement, theme: ResolvedTheme) {
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}
