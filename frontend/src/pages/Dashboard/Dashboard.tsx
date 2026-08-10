import { useNavigate } from "react-router-dom";

import { useDashboard } from "../../context";

import { DashboardEmpty } from "../../components/dashboard/empty/DashboardEmpty";

import { DashboardHero } from "../../components/dashboard/hero/DashboardHero";
import { DashboardMetrics } from "../../components/dashboard/DashboardMetrics";

import { EnergyAnalytics } from "../../components/dashboard/analytics/EnergyAnalytics";

import { RecommendationPanel } from "../../components/dashboard/recommendation/RecommendationPanel";

import { ConsumptionInsights } from "../../components/dashboard/ConsumptionInsights";

import { HistoryTable } from "../../components/dashboard/HistoryTable";

import { ROUTES } from "../../constants/routes";

export function Dashboard() {

  const { history } = useDashboard();

const navigate = useNavigate();

const handleNewAnalysis = () => {
  navigate(ROUTES.NEW_ANALYSIS);
};

  // Dashboard vazio
  if (history.length === 0) {
    return (
      <DashboardEmpty
        onNewAnalysis={handleNewAnalysis}
      />
    );
  }

  // Dashboard Premium
  return (
    <>
      <DashboardHero />

      <DashboardMetrics />

      <section className="mt-12">
        <EnergyAnalytics />
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RecommendationPanel />
        </div>

        <ConsumptionInsights />

      </section>

      <section className="mt-8">
        <HistoryTable limit={5} />
      </section>

    </>
  );
}