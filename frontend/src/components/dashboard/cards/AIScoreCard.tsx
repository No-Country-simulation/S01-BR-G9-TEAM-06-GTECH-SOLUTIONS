import { BrainCircuit } from "lucide-react";

import { MetricCard } from "./MetricCard";

import { useDashboard } from "../../../context";

import { useTranslation } from "@/i18n/useTranslation";

export function AIScoreCard() {

  const { dashboardData } = useDashboard();

  const score = dashboardData.precisao.replace("%", "");

  const { t } = useTranslation();

  return (
    <MetricCard
      title={t("aiScore")}

      value={score}

      unit="%"

      icon={BrainCircuit}

      variant="ai"

      trendValue="--"

      trendLabel={t("aiAccuracy")}

      positive={true}
    />
  );
}
