import type { HistoryItem } from "../../context/dashboard.types";

export function calculateStatistics(history: HistoryItem[]) {
  if (history.length === 0) {
    return {
      media: 0,
      maior: 0,
      menor: 0,
      custoMedioMensal: 0,
      quantidade: 0,
    };
  }

  const consumos = history.map(item =>
    Number(item.consumo.replace(" kWh", ""))
  );

  const custos = history.map(
    item => item.custoEstimadoMensal
  );

  return {
    media:
      consumos.reduce((a, b) => a + b, 0) /
      consumos.length,

    maior: Math.max(...consumos),

    menor: Math.min(...consumos),

    custoMedioMensal:
      custos.reduce((a, b) => a + b, 0) /
      custos.length,

    quantidade: history.length,
  };
}
