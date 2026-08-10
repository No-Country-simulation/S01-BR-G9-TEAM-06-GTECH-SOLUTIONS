import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { DashboardContext } from "./DashboardContext";

import type {
  DashboardData,
  HistoryItem,
} from "./dashboard.types";

import {
  loadDashboard,
  saveDashboard,
  loadHistory,
  saveHistory,
} from "../services/storage";

const INITIAL_DASHBOARD: DashboardData = {
  consumoAtual: "",
  perfil: "Moderado",
  economia: "",
  precisao: "",
  mensagem: "",
  recomendacoes: [],
};

const INITIAL_HISTORY: HistoryItem[] = [];

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(
      () =>
        loadDashboard() ??
        INITIAL_DASHBOARD
    );

  const [history, setHistory] =
    useState<HistoryItem[]>(
      () => {
        const loadedHistory =
          loadHistory();

        return loadedHistory.length > 0
          ? loadedHistory
          : INITIAL_HISTORY;
      }
    );

  useEffect(() => {
    saveDashboard(dashboardData);
  }, [dashboardData]);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

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