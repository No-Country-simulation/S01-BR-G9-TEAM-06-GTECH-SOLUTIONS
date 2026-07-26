import { useState, type ReactNode } from "react";

import { DashboardContext } from "./DashboardContext";

import type {
  DashboardData,
  HistoryItem,
} from "./dashboard.types";

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dashboardData, setDashboardData] =
    useState<DashboardData>({
      consumoAtual: "420 kWh",
      perfil: "Moderado",
      economia: "R$315",
      precisao: "98,5%",

      mensagem:
        "Há oportunidades de economia. Confira as recomendações.",

      recomendacoes: [
        "Evite utilizar equipamentos simultaneamente.",
        "Troque lâmpadas por LED.",
        "Monitore equipamentos com maior consumo.",
      ],
    });

  const [history, setHistory] =
    useState<HistoryItem[]>([
      {
        id: crypto.randomUUID(),
        data: "20/07/2026",
        categoria: "Moderado",
        consumo: "420 kWh",
      },
    ]);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
        history,
        setHistory,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}