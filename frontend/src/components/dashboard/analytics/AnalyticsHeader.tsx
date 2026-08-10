import {
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";
import { useDashboard } from "@/context/useDashboard";

export function AnalyticsHeader() {
  const { t } = useTranslation();
  const { history } = useDashboard();

  /*
   * A lista de histórico já é salva na ordem:
   * análise mais recente -> análise mais antiga.
   */
  const latestAnalysis = history[0];
  const previousAnalysis = history[1];

  /*
   * Consumo da análise mais recente.
   */
  const latestConsumption = latestAnalysis
    ? Number(latestAnalysis.consumo.replace(" kWh", ""))
    : 0;

  /*
   * Calcula a variação percentual em relação
   * à análise anterior.
   */
  let percentageChange: number | null = null;

  if (latestAnalysis && previousAnalysis) {
    const previousConsumption = Number(
      previousAnalysis.consumo.replace(" kWh", "")
    );

    if (previousConsumption > 0) {
      percentageChange =
        ((latestConsumption - previousConsumption) /
          previousConsumption) *
        100;
    }
  }

  const hasIncrease =
    percentageChange !== null && percentageChange > 0;

  const hasDecrease =
    percentageChange !== null && percentageChange < 0;

  return (
    <div
      className="
        flex
        flex-col
        gap-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Título */}
      <div className="flex items-center gap-4">
        <div
          className="
            rounded-2xl
            bg-blue-100
            p-4

            dark:bg-blue-500/20
          "
        >
          <Activity
            className="text-blue-600 dark:text-blue-400"
            size={28}
          />
        </div>

        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            {t("energyAnalytics")}
          </h2>

          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            {t("energyAnalyticsSubtitle")}
          </p>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Última atualização */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            px-5
            py-4

            dark:bg-slate-800
          "
        >
          <span
            className="
              text-xs
              uppercase
              tracking-wide
              text-slate-400

              dark:text-slate-500
            "
          >
            {t("lastUpdate")}
          </span>

          <h3
            className="
              mt-2
              font-semibold
              text-slate-900

              dark:text-white
            "
          >
            {latestAnalysis
              ? latestAnalysis.data
              : "—"}
          </h3>
        </div>

        {/* Consumo total */}
        <div
          className="
            rounded-2xl
            bg-linear-to-r
            from-blue-600
            to-blue-500
            px-6
            py-4
            text-white
          "
        >
          <span className="text-xs uppercase tracking-wide opacity-80">
            {t("totalConsumption")}
          </span>

          <h2 className="mt-2 text-3xl font-bold">
            {latestConsumption.toFixed(0)}

            <span className="text-base font-medium">
              {" "}kWh
            </span>
          </h2>

          {/* Variação */}
          <div className="mt-2 flex items-center gap-2 text-sm">
            {percentageChange === null ? (
              <span className="opacity-80">
                —
              </span>
            ) : (
              <>
                {hasIncrease && (
                  <TrendingUp size={16} />
                )}

                {hasDecrease && (
                  <TrendingDown size={16} />
                )}

                <span>
                  {percentageChange > 0 ? "+" : ""}
                  {percentageChange.toFixed(1)}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}