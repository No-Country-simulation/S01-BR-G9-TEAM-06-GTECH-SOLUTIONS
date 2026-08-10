import { Brain, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useDashboard } from "../../context";
import { useTranslation } from "@/i18n/useTranslation";

export function ConsumptionInsights() {
  const { t } = useTranslation();

  const { history } = useDashboard();

  if (history.length === 0) return null;

  const consumos = history.map(item =>
    Number(item.consumo.replace(" kWh", ""))
  );

  const media =
    consumos.reduce((a, b) => a + b, 0) / consumos.length;

  const primeiro = consumos[consumos.length - 1];
  const ultimo = consumos[0];

  const variacao =
    ((ultimo - primeiro) / primeiro) * 100;

  const eficientes = history.filter(
    item => item.perfil === "Eficiente"
  ).length;

  const moderados = history.filter(
    item => item.perfil === "Moderado"
  ).length;

  const ineficientes = history.filter(
    item => item.perfil === "Ineficiente"
  ).length;

  let perfil = "Moderado";

  if (eficientes >= moderados && eficientes >= ineficientes)
    perfil = "Eficiente";

  if (ineficientes >= eficientes && ineficientes >= moderados)
    perfil = "Ineficiente";

  const Icon =
    variacao > 5
      ? TrendingUp
      : variacao < -5
      ? TrendingDown
      : Minus;

  const color =
    variacao > 5
      ? "text-red-500"
      : variacao < -5
      ? "text-green-500"
      : "text-yellow-500";

  return (
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
      <div className="mb-6 flex items-center gap-3">

        <Brain className="text-yellow-500" />

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t("aiInsights")}
        </h2>

      </div>

      <div className="space-y-5">

        <div className="flex items-center gap-3">

          <Icon className={color} />

          <span className="text-slate-700 dark:text-slate-300">

            {variacao > 5 &&
              t("consumptionIncreased").replace(
                "{value}",
                variacao.toFixed(1)
              )}

            {variacao < -5 &&
              t("consumptionReduced").replace(
                "{value}",
                Math.abs(variacao).toFixed(1)
              )}

            {Math.abs(variacao) <= 5 &&
              t("consumptionStable")}

          </span>

        </div>

        <div className="text-slate-700 dark:text-slate-300">

          <strong>{t("averageConsumption")}:</strong>{" "}
          {media.toFixed(0)} kWh

        </div>

        <div className="text-slate-700 dark:text-slate-300">

          <strong>{t("dominantProfile")}:</strong>{" "}
          {perfil}

        </div>

        <div className="text-slate-700 dark:text-slate-300">

            <strong>{t("riskLevel")}:</strong>{" "}

            {perfil === "Eficiente" && (
                <span className="text-green-600 font-semibold">
                {t("low")}
                </span>
            )}

            {perfil === "Moderado" && (
                <span className="text-yellow-600 font-semibold">
                {t("medium")}
                </span>
            )}

            {perfil === "Ineficiente" && (
                <span className="text-red-600 font-semibold">
                {t("high")}
                </span>
            )}

        </div>

        <div className="text-slate-700 dark:text-slate-300">

          <strong>{t("recommendation")}:</strong>{" "}

          {perfil === "Eficiente" &&
            t("efficientRecommendation")}

          {perfil === "Moderado" &&
            t("moderateRecommendation")}

          {perfil === "Ineficiente" &&
            t("inefficientRecommendation")}

        </div>

        <div className="text-slate-700 dark:text-slate-300">

            <strong>{t("modelAccuracy")}:</strong>{" "}

            98,5%

        </div>

        <div className="text-slate-700 dark:text-slate-300">

            <strong>{t("totalAnalysis")}:</strong>{" "}

            {history.length}

        </div>

      </div>

    </div>
  );
}