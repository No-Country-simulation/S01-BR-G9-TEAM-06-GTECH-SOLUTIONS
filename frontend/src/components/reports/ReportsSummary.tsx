import { formatCurrency } from "@/utils/currency";
import { useDashboard } from "../../context";
import { generateAnalytics } from "../../services/analyticsService";

import { useTranslation } from "@/i18n/useTranslation";

export function ReportsSummary() {
  const { history } = useDashboard();

  const { t } = useTranslation();

  const analytics = generateAnalytics(
    history,
    "Ano"
  );

  const profileTranslationMap = {
    Eficiente: "efficient",
    Moderado: "moderate",
    Ineficiente: "inefficient",
    Nenhum: "none",
  } as const;

  const profileKey =
    profileTranslationMap[
      analytics.perfilPredominante as keyof typeof profileTranslationMap
    ] ?? "none";

  return (
    <div className="grid gap-6 md:grid-cols-4">

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
          duration-300

          dark:bg-slate-900
          dark:border-slate-700
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("AnalysisCounT")}
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
          duration-300

          dark:bg-slate-900
          dark:border-slate-700
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("averageConsumption")}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          {analytics.consumoMedio.toFixed(0)} kWh
        </h2>
      </div>

      {/* Economia total */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors
          duration-300

          dark:bg-slate-900
          dark:border-slate-700
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("averageMonthlyCost")}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
          {formatCurrency(analytics.custoMedioMensal)}
        </h2>
      </div>

      {/* Perfil predominante */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors
          duration-300

          dark:bg-slate-900
          dark:border-slate-700
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("predominantProfile")}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-yellow-500 dark:text-yellow-400">
          {t(profileKey)}
        </h2>
      </div>

    </div>
  );
}