import { useDashboard } from "../../../context/useDashboard";
import { useTranslation } from "../../../i18n/useTranslation";

import { generateAnalytics } from "../../../services/analyticsService";

import type { AnalyticsPeriod } from "../../../services/analytics/filterHistoryByPeriod";

type AnalyticsSummaryProps = {
  selectedPeriod: AnalyticsPeriod;
};

export function AnalyticsSummary({
  selectedPeriod,
}: AnalyticsSummaryProps) {

  const { history } = useDashboard();
  const { t } = useTranslation();

  const analytics = generateAnalytics(
    history,
    selectedPeriod
  );

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-4">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("AverageConsumption")}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {analytics.consumoMedio.toFixed(0)} kWh
        </h3>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("highestConsumption")}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {analytics.maiorConsumo} kWh
        </h3>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("lowestConsumption")}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {analytics.menorConsumo} kWh
        </h3>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("estimatedSavings")}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-green-600">
          R$ {analytics.economiaTotal}
        </h3>

      </div>

    </div>
  );
}
