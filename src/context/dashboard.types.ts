import type { Dispatch, SetStateAction } from "react";

export type DashboardData = {
  consumoAtual: string;
  perfil: string;
  economia: string;
  precisao: string;

  mensagem: string;

  recomendacoes: string[];
};

export type HistoryItem = {
  id: string;
  data: string;
  categoria: string;
  consumo: string;
};

export type DashboardContextType = {
  dashboardData: DashboardData;
  setDashboardData: Dispatch<SetStateAction<DashboardData>>;

  history: HistoryItem[];
  setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
};