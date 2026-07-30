import { createContext } from "react";

import type { DashboardContextType } from "./dashboard.types";

export const DashboardContext =
  createContext<DashboardContextType | null>(null);