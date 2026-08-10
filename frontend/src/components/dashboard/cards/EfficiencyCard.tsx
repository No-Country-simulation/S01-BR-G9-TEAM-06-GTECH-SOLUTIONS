import { Gauge } from "lucide-react";

import { MetricCard } from "./MetricCard";

import { useDashboard } from "../../../context";

import { useTranslation } from "@/i18n/useTranslation";

export function EfficiencyCard() {

  const { dashboardData } = useDashboard();

  const positive =
    dashboardData.perfil === "Eficiente";

    const { t } = useTranslation();

  return (
    <MetricCard
      title={t("efficiency")}

      value={
        dashboardData.perfil === "Eficiente"
          ? t("efficient")
          : dashboardData.perfil === "Moderado"
          ? t("moderate")
          : t("inefficient")
      }

      unit=""

      icon={Gauge}

      variant="efficiency"

      trendValue="--"

      trendLabel={t("lastClassification")}

      positive={positive}
    />
  );
}
