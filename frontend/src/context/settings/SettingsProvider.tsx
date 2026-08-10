import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  SettingsState,
  Language,
  FontSize,
} from "./settings.types";

import {
  SettingsContext,
} from "./SettingsContext";

const DEFAULT_SETTINGS: SettingsState = {
  language: "pt",

  appearance: {
    theme: "light",
  },

  notifications: {
    aiAlerts: true,
    consumptionAlerts: true,
    weeklyReports: false,
  },

  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: "medium",
  },
};

function loadSettings(): SettingsState {
  const saved = localStorage.getItem(
    "intelliwatts-settings"
  );

  if (!saved) {
    return DEFAULT_SETTINGS;
  }

  try {
    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(saved),
    };
  } catch {
    console.warn(
      "Erro ao carregar configurações."
    );

    return DEFAULT_SETTINGS;
  }
}

type Props = {
  children: ReactNode;
};

export function SettingsProvider({
  children,
}: Props) {
  const [settings, setSettings] =
    useState<SettingsState>(loadSettings);

  useEffect(() => {
    localStorage.setItem(
      "intelliwatts-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: settings.language,
      })
    );
  }, [settings.language]);

  function updateLanguage(
    language: Language
  ) {
    setSettings((prev) => ({
      ...prev,
      language,
    }));
  }

  function updateHighContrast(
    value: boolean
  ) {
    setSettings((prev) => ({
      ...prev,

      accessibility: {
        ...prev.accessibility,
        highContrast: value,
      },
    }));
  }

  function updateReducedMotion(
    value: boolean
  ) {
    setSettings((prev) => ({
      ...prev,

      accessibility: {
        ...prev.accessibility,
        reducedMotion: value,
      },
    }));
  }

  function updateFontSize(
    size: FontSize
  ) {
    setSettings((prev) => ({
      ...prev,

      accessibility: {
        ...prev.accessibility,
        fontSize: size,
      },
    }));
  }

  function updateNotifications(
    key:
      | "aiAlerts"
      | "consumptionAlerts"
      | "weeklyReports",
    value: boolean
  ) {
    setSettings((prev) => ({
      ...prev,

      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateLanguage,
        updateHighContrast,
        updateReducedMotion,
        updateFontSize,
        updateNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
