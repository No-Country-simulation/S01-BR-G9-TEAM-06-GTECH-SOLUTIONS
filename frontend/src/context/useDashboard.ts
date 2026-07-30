import { useContext } from "react";

import { DashboardContext } from "./DashboardContext";

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard deve ser usado dentro de DashboardProvider"
    );
  }

  return context;
}