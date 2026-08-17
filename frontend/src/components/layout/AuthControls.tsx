import { Moon, Sun } from "lucide-react";

import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { useTheme } from "@/context/theme/useTheme";
import { useTranslation } from "@/i18n/useTranslation";

export function AuthControls() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
      <div
        className="
          fixed
          right-6
          top-6
          z-50
          flex
          items-center
          gap-3
        "
      >
        <LanguageSelector />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            isDark
              ? t("lightTheme")
              : t("darkTheme")
          }
          className="
            rounded-xl
            border
            border-slate-200
            bg-white/90
            p-2
            shadow-sm
            backdrop-blur-md
            transition-all
            duration-300
            hover:bg-slate-100

            dark:border-slate-700
            dark:bg-slate-900/90
            dark:hover:bg-slate-800
          "
        >
          {isDark ? (
            <Sun
              size={20}
              className="
                text-yellow-400
                transition-transform
                duration-300
                hover:rotate-180
              "
            />
          ) : (
            <Moon
              size={20}
              className="
                text-slate-700
                transition-transform
                duration-300
                hover:-rotate-12

                dark:text-slate-300
              "
            />
          )}
        </button>
      </div>
  );
}