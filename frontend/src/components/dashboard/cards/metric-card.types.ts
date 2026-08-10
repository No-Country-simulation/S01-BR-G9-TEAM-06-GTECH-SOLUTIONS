import type { LucideIcon } from "lucide-react";

export type MetricCardVariant =
  | "energy"
  | "economy"
  | "efficiency"
  | "ai";

export interface MetricCardProps {
  title: string;

  value: string | number;

  unit?: string;

  icon: LucideIcon;

  variant: MetricCardVariant;

  trendValue?: string;

  trendLabel?: string;

  positive?: boolean;
}
