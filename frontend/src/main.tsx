import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { ThemeProvider } from "./context/theme/ThemeProvider";
import { SettingsProvider } from "./context/settings/SettingsProvider";
import { I18nProvider } from "./i18n/I18nProvider";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>
);