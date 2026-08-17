import { formatCurrency } from "@/utils/currency";
import {
  Bolt,
  Clock3,
  TrendingUp,
  TrendingDown,
  Minus,
  BrainCircuit,
  CircleDollarSign,
  Gauge,
} from "lucide-react";

import { useDashboard } from "../../../context/useDashboard";

import { AIHeader } from "./AIHeader";
import { AIInsightItem } from "./AIInsightItem";
import { AIRecommendation } from "./AIRecommendation";

import { useTranslation } from "@/i18n/useTranslation";

import {
  generateAIInsights,
} from "../../../services/ai/generateAIInsights";



export function AIAssistant() {


  const { history } = useDashboard();

  const { t } = useTranslation();

  const profileTranslationMap = {
  Eficiente: "efficient",
  Moderado: "moderate",
  Ineficiente: "inefficient",
  Nenhum: "none",
} as const;

  //fun├º├úo do t├¡tulo
  function getInsightTitle(item: typeof insights[number]) {
  switch (item.type) {

    case "empty":
      return t("noAnalysisFound");

    case "consumptionReduced":
      return t("consumptionReduced");

    case "consumptionIncreasing":
      return t("consumptionIncreasing");

    case "consumptionStable":
      return t("ConsumptionStable");

    case "averageConsumption":
      return t("Averageconsumption");

    case "highestConsumption":
      return t("HighestConsumption");

    case "lowestConsumption":
      return t("LowestConsumption");

    case "predominantProfile":
      return t("PredominantProfile");

    case "averageMonthlyCost":
      return t("averageMonthlyCost");

    case "analysisCount":
      return t("Analysiscount");

    case "recommendation":
      return t("aiRecommendation");

    default:
      return "";
  }
}

  //Fun├º├úo da descri├º├úo
  function getInsightDescription(
  item: typeof insights[number]
) {

  switch (item.type) {

    case "empty":
      return t("performAnalysis");

    case "consumptionReduced":
      return t("consumptionReducedDescription")
        .replace("{value}", String(item.value));

    case "consumptionIncreasing":
      return t("consumptionIncreasingDescription")
        .replace("{value}", String(item.value));

    case "consumptionStable":
      return t("consumptionStableDescription");

    case "averageConsumption":
      return t("averageConsumptionDescription")
        .replace("{value}", String(item.value));

    case "highestConsumption":
      return t("highestConsumptionDescription")
        .replace("{value}", String(item.value));

    case "lowestConsumption":
      return t("lowestConsumptionDescription")
        .replace("{value}", String(item.value));

    case "predominantProfile":
      return t(
        profileTranslationMap[
          item.profile ?? "Nenhum"
        ]
      );

    case "averageMonthlyCost":
      return t("averageMonthlyCostDescription")
        .replace("{value}", `R$ ${item.value}`);

    case "analysisCount":
      return t("analysisCountDescription")
        .replace("{value}", String(item.value));

    case "recommendation":
  return item.text ? t(item.text) : "";

    default:
      return "";
  }

}

  const insights =
    generateAIInsights(history);

  const custoMedioMensal =
    history.length === 0
      ? 0
      : history.reduce(
          (acc, item) => acc + item.custoEstimadoMensal,
          0,
        ) / history.length;

  return (
    <div className="space-y-8">

      <AIHeader
        model="Random Forest"
        confidence="99,4%"
      />

      {/* Saudação */}

      <div
        className="
          rounded-2xl
          bg-slate-50
          p-5
          transition-colors
          duration-300

          dark:bg-slate-900
          dark:border
          dark:border-slate-700
        "
      >

        <h3
          className="
            text-xl
            font-semibold
            text-slate-900

            dark:text-white
          "
        >
          {t("aiGreeting")}
        </h3>

        <p
          className="
            mt-2
            text-slate-500

            dark:text-slate-400
          "
        >
          {t("aiGreetingDescription")}
        </p>

      </div>

      {/* Insights */}

      <div className="space-y-4">

        {insights.map((item, index) => {

          const Icon =
  item.type === "consumptionReduced"
    ? TrendingDown
    : item.type === "consumptionIncreasing"
    ? TrendingUp
    : item.type === "consumptionStable"
    ? Minus
    : item.type === "recommendation"
    ? BrainCircuit
    : item.type === "averageConsumption"
    ? Bolt
    : item.type === "highestConsumption"
    ? TrendingUp
    : item.type === "lowestConsumption"
    ? TrendingDown
    : item.type === "averageMonthlyCost"
    ? CircleDollarSign
    : item.type === "analysisCount"
    ? Clock3
    : item.type === "predominantProfile"
    ? Gauge
    : Bolt;

          return (

            <AIInsightItem
              key={`${item.type}-${index}`}
              icon={<Icon size={20} />}
              title={getInsightTitle(item)}
              description={getInsightDescription(item)}
            />

          );

        })}

      </div>

      {/* Recomendação */}

      <AIRecommendation
        title={t("estimatedSaving")}

        description={
          history.length === 0
            ? t("performAnalysis")
            : t("continueAnalysis").replace(
                "{value}",
                formatCurrency(custoMedioMensal)
              )
        }

        saving={formatCurrency(custoMedioMensal)}
      />

    </div>
  );
}
