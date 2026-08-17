import type {
  DashboardData,
  HistoryItem,
} from "../context/dashboard.types";

const DASHBOARD_KEY = "dashboardData.v2";
const HISTORY_KEY = "dashboardHistory.v2";

export function loadDashboard(): DashboardData | null {
  try {
    const dashboard =
      localStorage.getItem(DASHBOARD_KEY);

    return dashboard
      ? JSON.parse(dashboard)
      : null;
  } catch {
    return null;
  }
}

export function saveDashboard(
  data: DashboardData
) {
  localStorage.setItem(
    DASHBOARD_KEY,
    JSON.stringify(data)
  );
}

export function loadHistory(): HistoryItem[] {
  try {
    const history =
      localStorage.getItem(HISTORY_KEY);

    return history
      ? JSON.parse(history)
      : [];
  } catch {
    return [];
  }
}

export function saveHistory(
  history: HistoryItem[]
) {
  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(history)
  );
}

export function clearStorage() {
  localStorage.removeItem(DASHBOARD_KEY);
  localStorage.removeItem(HISTORY_KEY);
}
