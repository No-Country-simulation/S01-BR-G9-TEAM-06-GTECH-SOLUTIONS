import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/theme/useTheme";
import { useTranslation } from "@/i18n/useTranslation";

export function AppearanceSettings() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {t("theme")}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("themeDescription")}
        </p>
      </div>

      <button
        onClick={toggleTheme}
        className="
          rounded-xl
          border
          border-slate-300
          bg-white
          p-3
          transition
          hover:bg-slate-100

          dark:border-slate-700
          dark:bg-slate-900
          dark:hover:bg-slate-800
        "
        aria-label={t("toggleTheme")}
        title={t("toggleTheme")}
      >
        {theme === "dark" ? (
          <Sun className="text-yellow-400" size={20} />
        ) : (
          <Moon className="text-slate-700" size={20} />
        )}
      </button>
    </div>
  );
}
