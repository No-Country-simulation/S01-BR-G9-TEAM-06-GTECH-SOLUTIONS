import type { HistoryItem } from "../../context/dashboard.types";

export function calculateStatistics(history: HistoryItem[]) {
  if (history.length === 0) {
    return {
      media: 0,
      maior: 0,
      menor: 0,
      totalEconomia: 0,
      quantidade: 0,
    };
  }

  const consumos = history.map(item =>
    Number(item.consumo.replace(" kWh", ""))
  );

  const economias = history.map(item =>
    Number(
      item.economia
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
        .trim()
    )
  );

  return {
    media:
      consumos.reduce((a, b) => a + b, 0) /
      consumos.length,

    maior: Math.max(...consumos),

    menor: Math.min(...consumos),

    totalEconomia: economias.reduce(
      (a, b) => a + b,
      0
    ),

    quantidade: history.length,
  };
}
