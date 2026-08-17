import type { HistoryItem } from "../../context/dashboard.types";

import { calculateStatistics } from "./statistics";
import { calculateTrends } from "./trends";
import { generateRecommendations } from "./recommendations";

export type AIInsightType =
  | "empty"
  | "consumptionReduced"
  | "consumptionIncreasing"
  | "consumptionStable"
  | "averageConsumption"
  | "highestConsumption"
  | "lowestConsumption"
  | "predominantProfile"
  | "averageMonthlyCost"
  | "analysisCount"
  | "recommendation";

export type AIInsight = {
  type: AIInsightType;

  value?: number;

  text?: string;

  profile?: "Eficiente" | "Moderado" | "Ineficiente" | "Nenhum";
};

export function generateAIInsights(
  history: HistoryItem[]
): AIInsight[] {

  if (history.length === 0) {
  return [
  {
    type: "empty",
  },
];
}

  const stats = calculateStatistics(history);

  const trends = calculateTrends(history);

  const recommendations =
    generateRecommendations(history, trends);

  const insights: AIInsight[] = [];

  // Tend├¬ncia do consumo

  if (trends.tendencia === "crescente") {

    insights.push({
      type: "consumptionIncreasing",
      value: Number(trends.variacao.toFixed(1)),
    });

  } else if (trends.tendencia === "decrescente") {

    insights.push({
      type: "consumptionReduced",
      value: Number(Math.abs(trends.variacao).toFixed(1)),
    });

  } else {

    insights.push({
      type: "consumptionStable",
    });

  }

  // Estat├¡sticas

    insights.push({
      type: "averageConsumption",
      value: Number(stats.media.toFixed(0)),
    });

  insights.push({
    type: "highestConsumption",
    value: stats.maior,
  });

  insights.push({
    type: "lowestConsumption",
    value: stats.menor,
  });

  insights.push({
    type: "predominantProfile",
    profile: trends.perfilPredominante,
  });

  insights.push({
    type: "averageMonthlyCost",
    value: Number(stats.custoMedioMensal.toFixed(2)),
  });

  insights.push({
    type: "analysisCount",
    value: stats.quantidade,
  });

  // Recomendações

  recommendations.forEach((recommendation) => {
  insights.push({
    type: "recommendation",
    text: recommendation,
  });
});

  return insights;
}
