import { AppRoutes } from "./routes/AppRoutes";

import { AuthProvider } from "./context/auth/AuthProvider";
import { useSettings } from "./context/settings/useSettings";

import { DashboardProvider } from "./context";

import { NotificationProvider } from "./context/notifications/NotificationProvider";

function App() {
  const { settings } = useSettings();

  const accessibilityClasses = `
    min-h-screen
    ${
      settings.accessibility.highContrast
        ? "contrast-125"
        : ""
    }
    ${
      settings.accessibility.reducedMotion
        ? "motion-reduce"
        : ""
    }
    ${
      settings.accessibility.fontSize === "small"
        ? "text-sm"
        : settings.accessibility.fontSize === "large"
        ? "text-lg"
        : "text-base"
    }
  `;

  return (
    <AuthProvider>
      <DashboardProvider>
        <NotificationProvider>
        <div className={accessibilityClasses}>
          <AppRoutes />
        </div>
        </NotificationProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;