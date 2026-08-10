import type { HistoryItem } from "../../context/dashboard.types";

export type TrendResult = {
  variacao: number;
  tendencia: "crescente" | "decrescente" | "estavel";
  perfilPredominante: "Eficiente" | "Moderado" | "Ineficiente";
  evolucaoPerfil: "melhorou" | "piorou" | "estavel";
};

export function calculateTrends(
  history: HistoryItem[]
): TrendResult {
  if (history.length === 0) {
    return {
      variacao: 0,
      tendencia: "estavel",
      perfilPredominante: "Moderado",
      evolucaoPerfil: "estavel",
    };
  }

  const consumos = history.map(item =>
    Number(item.consumo.replace(" kWh", ""))
  );

  const primeiro = consumos[consumos.length - 1];
  const ultimo = consumos[0];

  const variacao =
    primeiro === 0
      ? 0
      : ((ultimo - primeiro) / primeiro) * 100;

  let tendencia: TrendResult["tendencia"] = "estavel";

  if (variacao > 5) {
    tendencia = "crescente";
  } else if (variacao < -5) {
    tendencia = "decrescente";
  }

  const eficientes = history.filter(
    h => h.perfil === "Eficiente"
  ).length;

  const moderados = history.filter(
    h => h.perfil === "Moderado"
  ).length;

  const ineficientes = history.filter(
    h => h.perfil === "Ineficiente"
  ).length;

  let perfilPredominante: TrendResult["perfilPredominante"] =
    "Moderado";

  if (
    eficientes >= moderados &&
    eficientes >= ineficientes
  ) {
    perfilPredominante = "Eficiente";
  }

  if (
    ineficientes >= eficientes &&
    ineficientes >= moderados
  ) {
    perfilPredominante = "Ineficiente";
  }

  // Compara a primeira e a ├║ltima an├ílise
  const primeiraAnalise = history[history.length - 1].perfil;
  const ultimaAnalise = history[0].perfil;

  const score = {
    Ineficiente: 0,
    Moderado: 1,
    Eficiente: 2,
  };

  let evolucaoPerfil: TrendResult["evolucaoPerfil"] =
    "estavel";

  if (score[ultimaAnalise] > score[primeiraAnalise]) {
    evolucaoPerfil = "melhorou";
  } else if (
    score[ultimaAnalise] < score[primeiraAnalise]
  ) {
    evolucaoPerfil = "piorou";
  }

  return {
    variacao,
    tendencia,
    perfilPredominante,
    evolucaoPerfil,
  };
}
