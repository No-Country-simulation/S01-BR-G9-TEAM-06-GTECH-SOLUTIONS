import {
  Brain,
  Activity,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";

export function AISettingsCard() {
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
        {t("artificialIntelligence")}
      </h2>

      <div className="space-y-5">

        {/* Modelo */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Brain className="text-yellow-500" />

            <span className="text-slate-700 dark:text-slate-200">
              {t("aiModel")}
            </span>
          </div>

          <span className="font-semibold text-slate-900 dark:text-white">
            Random Forest
          </span>

        </div>

        {/* Precisão */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Activity className="text-green-500" />

            <span className="text-slate-700 dark:text-slate-200">
              {t("aiAccuracy")}
            </span>
          </div>

          <span className="font-semibold text-slate-900 dark:text-white">
            98,5%
          </span>

        </div>

        {/* Status da API */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-500" />

            <span className="text-slate-700 dark:text-slate-200">
              {t("apiStatus")}
            </span>
          </div>

          <span
            className="
              rounded-full
              bg-green-100
              px-3
              py-1
              text-sm
              font-semibold
              text-green-700

              dark:bg-green-500/20
              dark:text-green-400
            "
          >
            {t("online")}
          </span>

        </div>

        {/* Última atualização */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <CalendarClock className="text-yellow-500" />

            <span className="text-slate-700 dark:text-slate-200">
              {t("lastUpdate")}
            </span>
          </div>

          <span className="font-semibold text-slate-900 dark:text-white">
            {t("today")}
          </span>

        </div>

      </div>
    </div>
  );
}