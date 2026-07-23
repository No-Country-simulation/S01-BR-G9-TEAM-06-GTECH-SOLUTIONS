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

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
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