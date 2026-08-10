import {
  Moon,
  Bell,
  Sparkles,
  RefreshCcw,
} from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";

export function PreferencesCard() {
  const { t } = useTranslation();

  return (
    <div>
      <h2
        className="
          mb-6
          text-xl
          font-bold
          text-slate-900
          dark:text-white
        "
      >
        {t("preferences")}
      </h2>

      <div className="space-y-5">

        {/* Tema escuro */}

        <label className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Moon className="text-yellow-500" />

            <span className="text-slate-700 dark:text-slate-200">
              {t("darkTheme")}
            </span>

          </div>

          <input
            type="checkbox"
            className="h-5 w-5 accent-yellow-500"
          />

        </label>

        {/* Notificações */}

        <label className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Bell className="text-yellow-500" />

            <span className="text-slate-700 dark:text-slate-200">
              {t("notifications")}
            </span>

          </div>

          <input
            type="checkbox"
            defaultChecked
            className="h-5 w-5 accent-yellow-500"
          />

        </label>

        {/* Animações */}

        <label className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Sparkles className="text-yellow-500" />

            <span className="text-slate-700 dark:text-slate-200">
              {t("showAnimations")}
            </span>

          </div>

          <input
            type="checkbox"
            defaultChecked
            className="h-5 w-5 accent-yellow-500"
          />

        </label>

        {/* Atualização automática */}

        <label className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCcw className="text-yellow-500" />

            <span className="text-slate-700 dark:text-slate-200">
              {t("automaticUpdate")}
            </span>

          </div>

          <input
            type="checkbox"
            defaultChecked
            className="h-5 w-5 accent-yellow-500"
          />

        </label>

      </div>
    </div>
  );
}