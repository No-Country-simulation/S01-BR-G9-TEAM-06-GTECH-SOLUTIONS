import { useState } from "react";

import { AnalyticsCards } from "../../components/analytics/AnalyticsCards";
import { ConsumptionChart } from "../../components/analytics/ConsumptionChart";
import { ProfileChart } from "../../components/analytics/ProfileChart";
import { AnalyticsInsights } from "../../components/dashboard/analytics/AnalyticsInsights";
import { AnalyticsPeriodSelector } from "../../components/dashboard/analytics/AnalyticsPeriodSelector";
import { useTranslation } from "@/i18n/useTranslation";
export type AnalyticsPeriod =
  | "Hoje"
  | "Semana"
  | "Mês"
  | "Ano";

export function Analytics() {

  const { t } = useTranslation();

  const [selectedPeriod, setSelectedPeriod] =
    useState<AnalyticsPeriod>("Semana");

  return (
    <div className="space-y-8">

      {/* Cabeçalho */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          {t("analyticsTitle")}
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          {t("analyticsDescription")}
        </p>

      </div>

      {/* Seletor de período */}

      <AnalyticsPeriodSelector
        selectedPeriod={selectedPeriod}
        onChange={setSelectedPeriod}
      />

      {/* Cards */}

      <AnalyticsCards
        
      />

      {/* Gráficos */}

      <div className="grid gap-8 lg:grid-cols-2">

        <ConsumptionChart
          selectedPeriod={selectedPeriod}
        />

        <ProfileChart
          
        />

      </div>

      {/* Insights */}

      <AnalyticsInsights
        selectedPeriod={selectedPeriod}
      />

    </div>
  );
}