import type { HistoryItem } from "../context/DashboardContext";

export type AnalyticsData = {
  totalAnalises: number;
  consumoMedio: number;
  economiaTotal: number;
  perfilPredominante: string;
  insights: string[];
};

export function generateAnalytics(
  history: HistoryItem[]
): AnalyticsData {

  const totalAnalises = history.length;

  if (totalAnalises === 0) {
    return {
      totalAnalises: 0,
      consumoMedio: 0,
      economiaTotal: 0,
      perfilPredominante: "Nenhum",
      insights: [
        "Nenhuma análise foi realizada ainda."
      ]
    };
  }

  const consumoMedio =
    history.reduce(
      (acc, item) =>
        acc + Number(item.consumo.replace(" kWh", "")),
      0
    ) / totalAnalises;

  const eficientes = history.filter(
    item => item.categoria === "Eficiente"
  ).length;

  const moderados = history.filter(
    item => item.categoria === "Moderado"
  ).length;

  const ineficientes = history.filter(
    item => item.categoria === "Ineficiente"
  ).length;

  let perfilPredominante = "Moderado";

  if (
    eficientes >= moderados &&
    eficientes >= ineficientes
  ) {
    perfilPredominante = "Eficiente";
  }

  if (
    ineficientes >= moderados &&
    ineficientes >= eficientes
  ) {
    perfilPredominante = "Ineficiente";
  }

  const economiaTotal = totalAnalises * 315;

  const insights: string[] = [];

  insights.push(
    `Foram realizadas ${totalAnalises} análises.`
  );

  insights.push(
    `Consumo médio de ${consumoMedio.toFixed(0)} kWh.`
  );

  if (perfilPredominante === "Eficiente") {
    insights.push(
      "A maioria das análises apresenta excelente eficiência energética."
    );
  }

  if (perfilPredominante === "Moderado") {
    insights.push(
      "A maior parte das análises está em um perfil moderado."
    );
  }

  if (perfilPredominante === "Ineficiente") {
    insights.push(
      "Grande parte das análises apresenta alto consumo energético."
    );
  }

  if (consumoMedio > 600) {
    insights.push(
      "O consumo médio está elevado. Considere reduzir o uso em horários de pico."
    );
  }

  return {
    totalAnalises,
    consumoMedio,
    economiaTotal,
    perfilPredominante,
    insights,
  };
}