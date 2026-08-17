import { formatCurrency } from "@/utils/currency";
import {
  History,
  Bolt,
  CircleDollarSign,
  Gauge,
} from "lucide-react";

import { useState } from "react";

import { useDashboard } from "../../context";

import { useTranslation } from "../../i18n/useTranslation";

import { generateAnalytics } from "../../services/analyticsService";

import type { AnalyticsPeriod } from "../dashboard/analytics/AnalyticsPeriodSelector";

export function AnalyticsCards() {

  const { history } = useDashboard();

  const { t } = useTranslation();

  const [selectedPeriod] =
    useState<AnalyticsPeriod>("Semana");

  const analytics = generateAnalytics(
    history,
    selectedPeriod
  );

  function translateProfile(profile: string) {
  switch (profile) {
    case "Eficiente":
      return t("efficient");

    case "Moderado":
      return t("moderate");

    case "Ineficiente":
      return t("inefficient");

    default:
      return t("none");
  }
}

  return (

    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* Total de análises */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors

          dark:bg-slate-900
          dark:border-slate-700
        "
      >

        <History
          className="mb-4 text-yellow-500"
          size={30}
        />

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("analysiscount")}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          {analytics.totalAnalises}
        </h2>

      </div>

      {/* Consumo médio */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors

          dark:bg-slate-900
          dark:border-slate-700
        "
      >

        <Bolt
          className="mb-4 text-yellow-500"
          size={30}
        />

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("averageConsumption")}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          {analytics.consumoMedio.toFixed(0)} kWh
        </h2>

      </div>

      {/* Economia */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors

          dark:bg-slate-900
          dark:border-slate-700
        "
      >

        <CircleDollarSign
          className="mb-4 text-green-500"
          size={30}
        />

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("averageMonthlyCost")}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          {formatCurrency(analytics.custoMedioMensal)}
        </h2>

      </div>

      {/* Perfil */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors

          dark:bg-slate-900
          dark:border-slate-700
        "
      >

        <Gauge
          className="mb-4 text-blue-500"
          size={30}
        />

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("predominantProfile")}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          {translateProfile(analytics.perfilPredominante)}
        </h2>

      </div>

    </section>

  );

}