import type { HistoryItem } from "../../context/dashboard.types";
import type { TrendResult } from "./trends";

export type RecommendationKey =
  | "recommendationFirstAnalysis"
  | "recommendationConsumptionIncreasing"
  | "recommendationConsumptionReduced"
  | "recommendationEfficientProfile"
  | "recommendationModerateProfile"
  | "recommendationInefficientProfile"
  | "recommendationProfileImproved"
  | "recommendationProfileWorsened"
  | "recommendationPeakConsumption"
  | "recommendationPeriodicAnalysis";

export function generateRecommendations(
  history: HistoryItem[],
  trends: TrendResult
): RecommendationKey[] {
  const recommendations: RecommendationKey[] = [];

  if (history.length === 0) {
    return ["recommendationFirstAnalysis"];
  }

  // Tendência do consumo
  if (trends.tendencia === "crescente") {
    recommendations.push("recommendationConsumptionIncreasing");
  }

  if (trends.tendencia === "decrescente") {
    recommendations.push("recommendationConsumptionReduced");
  }

  // Perfil predominante
  switch (trends.perfilPredominante) {
    case "Eficiente":
      recommendations.push("recommendationEfficientProfile");
      break;

    case "Moderado":
      recommendations.push("recommendationModerateProfile");
      break;

    case "Ineficiente":
      recommendations.push("recommendationInefficientProfile");
      break;
  }

  // Evolução do perfil
  if (trends.evolucaoPerfil === "melhorou") {
    recommendations.push("recommendationProfileImproved");
  }

  if (trends.evolucaoPerfil === "piorou") {
    recommendations.push("recommendationProfileWorsened");
  }

  // Horário de pico
  const muitosPicos = history.filter(
    (item) =>
      item.observacao?.toLowerCase().includes("pico") ?? false
  ).length;

  if (muitosPicos >= 2) {
    recommendations.push("recommendationPeakConsumption");
  }

  // Recomendação fixa
  recommendations.push("recommendationPeriodicAnalysis");

  // Evita mensagens repetidas
  return [...new Set(recommendations)];
}