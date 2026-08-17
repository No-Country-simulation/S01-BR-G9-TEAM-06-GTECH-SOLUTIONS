import type { HistoryItem } from "../context";
import type { AnalyticsPeriod } from "../components/dashboard/analytics/AnalyticsPeriodSelector";

export type AnalyticsData = {
  totalAnalises: number;
  consumoMedio: number;
  maiorConsumo: number;
  menorConsumo: number;
  custoMedioMensal: number;
  perfilPredominante: string;
  insights: {
  analysisCount: number;
  averageConsumption: number;
  highestConsumption: number;
  lowestConsumption: number;
  highConsumption: boolean;
  profile: "Eficiente" | "Moderado" | "Ineficiente" | "Nenhum";
};
};

export function generateAnalytics(
  history: HistoryItem[],
  period: AnalyticsPeriod
): AnalyticsData {

  let filteredHistory = [...history];

  const hoje = new Date();

  switch (period) {
    case "Hoje":
      filteredHistory = history.filter((item) => {
        const data = new Date(item.createdAt);
        return data.toDateString() === hoje.toDateString();
      });
      break;

    case "Semana": {
      const semana = new Date();
      semana.setDate(hoje.getDate() - 7);

      filteredHistory = history.filter((item) => {
        const data = new Date(item.createdAt);
        return data >= semana && data <= hoje;
      });

      break;
    }

    case "Mês":
      filteredHistory = history.filter((item) => {
        const data = new Date(item.createdAt);

        return (
          data.getMonth() === hoje.getMonth() &&
          data.getFullYear() === hoje.getFullYear()
        );
      });
      break;

    case "Ano":
      filteredHistory = history.filter((item) => {
        const data = new Date(item.createdAt);

        return data.getFullYear() === hoje.getFullYear();
      });
      break;
  }

  const totalAnalises = filteredHistory.length;

  if (totalAnalises === 0) {
    return {
      totalAnalises: 0,
      consumoMedio: 0,
      maiorConsumo: 0,
      menorConsumo: 0,
      custoMedioMensal: 0,
      perfilPredominante: "Nenhum",
      insights: {
      analysisCount: 0,
      averageConsumption: 0,
      highestConsumption: 0,
      lowestConsumption: 0,
      highConsumption: false,
      profile: "Nenhum",
    },
    };
  }

  // ----------------------------
  // Consumos
  // ----------------------------

  const consumos = filteredHistory.map((item) =>
    Number(item.consumo.replace(" kWh", ""))
  );

  const maiorConsumo = Math.max(...consumos);

  const menorConsumo = Math.min(...consumos);

  const consumoMedio =
    consumos.reduce((acc, value) => acc + value, 0) /
    totalAnalises;

  // ----------------------------
  // Perfis
  // ----------------------------

  const eficientes = filteredHistory.filter(
    (item) => item.perfil === "Eficiente"
  ).length;

  const moderados = filteredHistory.filter(
    (item) => item.perfil === "Moderado"
  ).length;

  const ineficientes = filteredHistory.filter(
    (item) => item.perfil === "Ineficiente"
  ).length;

  let perfilPredominante:
  | "Eficiente"
  | "Moderado"
  | "Ineficiente" = "Moderado";

if (
  eficientes >= moderados &&
  eficientes >= ineficientes
) {
  perfilPredominante = "Eficiente";
} else if (
  ineficientes >= eficientes &&
  ineficientes >= moderados
) {
  perfilPredominante = "Ineficiente";
}

  // ----------------------------
  // Economia
  // ----------------------------

  const custoMedioMensal =
  filteredHistory.length === 0
    ? 0
    : filteredHistory.reduce(
        (acc, item) => acc + item.custoEstimadoMensal,
        0,
      ) / filteredHistory.length;

  // ----------------------------
  // Insights
  // ----------------------------

  const insights = {
  analysisCount: totalAnalises,

  averageConsumption: consumoMedio,

  highestConsumption: maiorConsumo,

  lowestConsumption: menorConsumo,

  highConsumption: consumoMedio > 600,

  profile: perfilPredominante,
};

  return {
  totalAnalises,
  consumoMedio,
  maiorConsumo,
  menorConsumo,
  custoMedioMensal,
  perfilPredominante,
  insights,
};
}