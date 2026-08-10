import type { HistoryItem } from "../../context/dashboard.types";

export type AnalyticsPeriod =
  | "Hoje"
  | "Semana"
  | "Mês"
  | "Ano";

export function filterHistoryByPeriod(
  history: HistoryItem[],
  period: AnalyticsPeriod
): HistoryItem[] {

  switch (period) {

    case "Hoje":
      return history.slice(0, 5);

    case "Semana":
      return history.slice(0, 10);

    case "Mês":
      return history.slice(0, 20);

    case "Ano":
      return history;

    default:
      return history;
  }
}
