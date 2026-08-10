import { Bolt } from "lucide-react";

import { MetricCard } from "./MetricCard";

import { useDashboard } from "../../../context";

import { useTranslation } from "@/i18n/useTranslation";

export function ConsumptionCard() {

  const { dashboardData } = useDashboard();

  const consumo = dashboardData.consumoAtual.replace(" kWh", "");

  const { t } = useTranslation();

  return (
    <MetricCard
      title={t("currentConsumption")}
      value={consumo}
      unit="kWh"
      icon={Bolt}
      variant="energy"
      trendValue="-12%"
      trendLabel={t("comparedLastMonth")}
      positive={true}
    />
  );
}
