import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getStoredTheme,
  saveTheme,
} from "./themeStorage";

import { ThemeContext } from "./ThemeContext";

import type { Theme } from "./theme.types";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] =
    useState<Theme>(getStoredTheme);

  useEffect(() => {
    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(theme);

    saveTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current: Theme) =>
      current === "light"
        ? "dark"
        : "light"
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
