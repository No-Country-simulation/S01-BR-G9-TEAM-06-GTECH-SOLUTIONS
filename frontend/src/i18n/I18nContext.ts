import { createContext } from "react";

import type { Language } from "./translations";

export type I18nContextType = {
  language: Language;
  t: (key: string) => string;
};

export const I18nContext =
  createContext<I18nContextType | null>(null);
