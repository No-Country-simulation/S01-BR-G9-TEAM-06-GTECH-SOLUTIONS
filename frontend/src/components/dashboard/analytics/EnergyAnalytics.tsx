import { useState } from "react";

import { AnalyticsHeader } from "./AnalyticsHeader";
import {
  AnalyticsPeriodSelector,
  type AnalyticsPeriod,
} from "./AnalyticsPeriodSelector";

import { AnalyticsSummary } from "./AnalyticsSummary";
import { AnalyticsInsights } from "./AnalyticsInsights";

import { EnergyChart } from "../EnergyChart";

export function EnergyAnalytics() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<AnalyticsPeriod>("Hoje");

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-colors
        duration-300

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <AnalyticsHeader />

      <AnalyticsPeriodSelector
        selectedPeriod={selectedPeriod}
        onChange={setSelectedPeriod}
      />

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-slate-100
          bg-white
          p-6
          shadow-inner
          transition-colors
          duration-300

          dark:border-slate-700
          dark:bg-slate-950
        "
      >
        <EnergyChart
          selectedPeriod={selectedPeriod}
        />
      </div>

      <AnalyticsSummary
        selectedPeriod={selectedPeriod}
      />

      <AnalyticsInsights
        selectedPeriod={selectedPeriod}
      />
    </section>
  );
}
