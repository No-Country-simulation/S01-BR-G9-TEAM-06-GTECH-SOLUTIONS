import { createContext } from "react";

import type {
  SettingsState,
  Language,
  FontSize,
} from "./settings.types";

type SettingsContextType = {
  settings: SettingsState;

  updateLanguage: (
    language: Language
  ) => void;

  updateHighContrast: (
    value: boolean
  ) => void;

  updateReducedMotion: (
    value: boolean
  ) => void;

  updateFontSize: (
    size: FontSize
  ) => void;

  updateNotifications: (
    key:
      | "aiAlerts"
      | "consumptionAlerts"
      | "weeklyReports",
    value: boolean
  ) => void;
};

export const SettingsContext =
  createContext<SettingsContextType | null>(null);
