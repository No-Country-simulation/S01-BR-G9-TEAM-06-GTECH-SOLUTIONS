import { createContext, useContext, useState, type ReactNode } from "react";

export type DashboardData = {
  consumoAtual: string;
  perfil: string;
  economia: string;
  precisao: string;

  mensagem: string;

  recomendacoes: string[];
};

type DashboardContextType = {
  dashboardData: DashboardData;
  setDashboardData: React.Dispatch<React.SetStateAction<DashboardData>>;
  history: HistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
};

export type HistoryItem = {
  id: string;
  data: string;
  categoria: string;
  consumo: string;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

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

const [history, setHistory] = useState<HistoryItem[]>([
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

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard deve ser usado dentro de DashboardProvider"
    );
  }

  return context;
}