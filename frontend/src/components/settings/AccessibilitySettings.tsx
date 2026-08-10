import { useSettings } from "@/context/settings/useSettings";
import { useTranslation } from "@/i18n/useTranslation";

export function AccessibilitySettings() {
  const {
    settings,
    updateHighContrast,
    updateReducedMotion,
    updateFontSize,
  } = useSettings();

  const { t } = useTranslation();

  return (
    <div className="space-y-6">

      {/* Alto contraste */}

      <label className="flex items-center justify-between text-slate-700 dark:text-slate-200">
        <span>{t("highContrast")}</span>

        <input
          type="checkbox"
          checked={settings.accessibility.highContrast}
          onChange={(e) =>
            updateHighContrast(e.target.checked)
          }
          className="h-5 w-5 accent-yellow-500"
        />
      </label>

      {/* Reduzir anima├º├Áes */}

      <label className="flex items-center justify-between text-slate-700 dark:text-slate-200">
        <span>{t("reducedMotion")}</span>

        <input
          type="checkbox"
          checked={settings.accessibility.reducedMotion}
          onChange={(e) =>
            updateReducedMotion(e.target.checked)
          }
          className="h-5 w-5 accent-yellow-500"
        />
      </label>

      {/* Tamanho da fonte */}

      <div>
        <p className="mb-3 font-medium text-slate-900 dark:text-white">
          {t("fontSize")}
        </p>

        <div className="flex gap-3">

          {/* Pequena */}

          <button
            type="button"
            onClick={() => updateFontSize("small")}
            className={`
              rounded-lg
              border
              px-4
              py-2
              transition

              ${
                settings.accessibility.fontSize === "small"
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }
            `}
            aria-label={t("smallFont")}
          >
            A-
          </button>

          {/* M├®dia */}

          <button
            type="button"
            onClick={() => updateFontSize("medium")}
            className={`
              rounded-lg
              border
              px-4
              py-2
              transition

              ${
                settings.accessibility.fontSize === "medium"
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }
            `}
            aria-label={t("mediumFont")}
          >
            A
          </button>

          {/* Grande */}

          <button
            type="button"
            onClick={() => updateFontSize("large")}
            className={`
              rounded-lg
              border
              px-4
              py-2
              transition

              ${
                settings.accessibility.fontSize === "large"
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }
            `}
            aria-label={t("largeFont")}
          >
            A+
          </button>

        </div>
      </div>

    </div>
  );
}
