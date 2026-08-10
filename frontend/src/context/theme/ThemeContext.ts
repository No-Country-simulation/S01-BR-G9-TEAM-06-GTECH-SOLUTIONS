import { createContext } from "react";

import type { Theme } from "./theme.types";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext =
  createContext<ThemeContextType | null>(null);
