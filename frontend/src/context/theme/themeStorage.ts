import type { Theme } from "./theme.types";

const THEME_KEY = "intelliwatts-theme";

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);

  if (stored === "dark") {
    return "dark";
  }

  return "light";
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
}
