import { CircleDollarSign } from "lucide-react";

import { MetricCard } from "./MetricCard";

import { useDashboard } from "../../../context";

import { useTranslation } from "@/i18n/useTranslation";

export function EconomyCard() {

  const { dashboardData } = useDashboard();

  const custo = dashboardData.custoEstimadoMensal.toLocaleString(
    "pt-BR",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  );
  
  const { t } = useTranslation();

  return (
    <MetricCard
      title={t("estimatedCost")}
      value={custo}
      unit="R$"
      icon={CircleDollarSign}
      variant="economy"
      trendValue="--"
      trendLabel={t("waitingHistory")}
      positive={true}
    />
  );
}
