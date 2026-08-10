import {
  BadgeCheck,
  CircleDollarSign,
  Gauge,
} from "lucide-react";

import { useDashboard } from "../../context";

import { useTranslation } from "../../i18n/useTranslation";

export function AnalysisResult() {

  const { dashboardData } = useDashboard();

  const { t } = useTranslation();

  const badgeColor =
    dashboardData.perfil === "Eficiente"
      ? "text-green-500"
      : dashboardData.perfil === "Moderado"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div
      className="
        mt-8
        rounded-3xl
        border
        border-slate-100
        bg-white
        p-8
        shadow-sm
        transition-colors

        dark:bg-slate-900
        dark:border-slate-700
      "
    >

      <div className="mb-6 flex items-center gap-3">

        <BadgeCheck
          size={34}
          className={badgeColor}
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t("aiResult")}
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            {t("aiResultDescription")}
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div
          className="
            rounded-2xl
            bg-slate-50
            p-6

            dark:bg-slate-800
          "
        >

          <Gauge
            className="mb-4 text-yellow-500"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("Profile")}
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {dashboardData.perfil}
          </h3>

        </div>

        <div
          className="
            rounded-2xl
            bg-slate-50
            p-6

            dark:bg-slate-800
          "
        >

          <BadgeCheck
            className="mb-4 text-green-500"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("confidence")}
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {dashboardData.precisao}
          </h3>

        </div>

        <div
          className="
            rounded-2xl
            bg-slate-50
            p-6

            dark:bg-slate-800
          "
        >

          <CircleDollarSign
            className="mb-4 text-yellow-500"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("estimatedsavings")}
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {dashboardData.economia}
          </h3>

        </div>

      </div>

      <div
        className="
          mt-8
          rounded-2xl
          bg-yellow-50
          p-6

          dark:bg-yellow-500/10
          dark:border
          dark:border-yellow-500/20
        "
      >

        <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
          {t("aiMessage")}
        </h3>

        <p className="leading-7 text-slate-700 dark:text-slate-300">
          {dashboardData.mensagem}
        </p>

      </div>

    </div>
  );
}