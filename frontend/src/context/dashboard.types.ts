import type { Dispatch, SetStateAction } from "react";

export type DashboardData = {
  consumoAtual: string;
  perfil: "Eficiente" | "Moderado" | "Ineficiente";
  economia: string;
  precisao: string;

  mensagem: string;

  recomendacoes: string[];
};

export type HistoryItem = {
  id: string;

  data: string;

  createdAt: string;

  perfil: "Eficiente" | "Moderado" | "Ineficiente";

  consumo: string;

  economia: string;

  precisao: string;

  observacao?: string;
};

export type DashboardContextType = {
  dashboardData: DashboardData;
  setDashboardData: Dispatch<SetStateAction<DashboardData>>;

  history: HistoryItem[];
  setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
};