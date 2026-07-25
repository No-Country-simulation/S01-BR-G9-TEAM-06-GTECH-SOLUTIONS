import { AnalyticsCards } from "../../components/analytics/AnalyticsCards";
import { ConsumptionChart } from "../../components/analytics/ConsumptionChart";
import { ProfileChart } from "../../components/analytics/ProfileChart";
import { InsightsPanel } from "../../components/analytics/InsightsPanel";

export function Analytics() {
  return (
    <div className="space-y-8">

      {/* Cabeçalho */}

      <div>

        <h1 className="text-4xl font-bold">
          Analytics Energético
        </h1>

        <p className="mt-3 text-slate-500">
          Acompanhe indicadores inteligentes gerados pelas análises do IntelliWatts.
        </p>

      </div>

      {/* Cards */}

      <AnalyticsCards />

      {/* Gráficos */}

      <div className="grid gap-8 lg:grid-cols-2">

        <ConsumptionChart />

        <ProfileChart />

      </div>

      {/* Insights */}

      <InsightsPanel />

    </div>
  );
}