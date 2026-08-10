import { Brain, Sparkles } from "lucide-react";

import { useDashboard } from "../../../context/useDashboard";
import { useTranslation } from "../../../i18n/useTranslation";

import type { AnalyticsPeriod } from "./AnalyticsPeriodSelector";

import { filterHistoryByPeriod } from "../../../services/analytics/filterHistoryByPeriod";
import { generateAnalytics } from "../../../services/analyticsService";

type AnalyticsInsightsProps = {
  selectedPeriod: AnalyticsPeriod;
};

export function AnalyticsInsights({
  selectedPeriod,
}: AnalyticsInsightsProps) {

  const { history } = useDashboard();

  const { t } = useTranslation();

  const filteredHistory = filterHistoryByPeriod(
    history,
    selectedPeriod
  );

  const analytics = generateAnalytics(
    filteredHistory,
    selectedPeriod
  );

  const insights: string[] = [];

  if (analytics.totalAnalises === 0) {
    insights.push(t("noAnalysisFound"));
  } else {

    insights.push(
      t("AnalysisCount")
        .replace("{count}", String(analytics.insights.analysisCount))
    );

    insights.push(
      t("averageConsumptionInsight")
        .replace(
          "{value}",
          analytics.insights.averageConsumption.toFixed(0)
        )
    );

    insights.push(
      t("highestConsumptionInsight")
        .replace(
          "{value}",
          String(analytics.insights.highestConsumption)
        )
    );

    insights.push(
      t("lowestConsumptionInsight")
        .replace(
          "{value}",
          String(analytics.insights.lowestConsumption)
        )
    );

    switch (analytics.insights.profile) {

      case "Eficiente":
        insights.push(
          t("efficientProfileInsight")
        );
        break;

      case "Moderado":
        insights.push(
          t("moderateProfileInsight")
        );
        break;

      case "Ineficiente":
        insights.push(
          t("inefficientProfileInsight")
        );
        break;
    }

    if (analytics.insights.highConsumption) {
      insights.push(
        t("highConsumptionInsight")
      );
    }
  }

  return (

    <section
      className="
        mt-10
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-colors

        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      <div className="mb-6 flex items-center gap-3">

        <Brain
          className="text-yellow-500"
          size={26}
        />

        <h2
          className="
            text-2xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          {t("aiInsights")}
        </h2>

      </div>

      <div className="space-y-4">

        {insights.map((insight, index) => (

          <div
            key={index}
            className="
              flex
              items-start
              gap-4
              rounded-2xl
              border
              border-yellow-200
              bg-yellow-50
              p-5

              dark:border-yellow-500/20
              dark:bg-yellow-500/10
            "
          >

            <Sparkles
              size={20}
              className="mt-1 text-yellow-500"
            />

            <p
              className="
                leading-7
                text-slate-700

                dark:text-slate-300
              "
            >
              {insight}
            </p>

          </div>

        ))}

      </div>

    </section>

  );

}
