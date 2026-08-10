import { useContext } from "react";

import { SettingsContext } from "./SettingsContext";

export function useSettings() {
  const context =
    useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings deve ser usado dentro do SettingsProvider."
    );
  }

  return context;
}
