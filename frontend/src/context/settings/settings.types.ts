export type Language = "pt" | "en" | "es";

export type FontSize =
  | "small"
  | "medium"
  | "large";

export interface SettingsState {
  language: Language;

  appearance: {
    theme: "light" | "dark";
  };

  notifications: {
    aiAlerts: boolean;
    consumptionAlerts: boolean;
    weeklyReports: boolean;
  };

  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: FontSize;
  };
}
