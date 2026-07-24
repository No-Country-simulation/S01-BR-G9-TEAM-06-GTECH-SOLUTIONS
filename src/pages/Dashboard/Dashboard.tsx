import { useDashboard } from "../../context/DashboardContext";
import { WelcomeBanner } from "../../components/dashboard/WelcomeBanner";
import { StatCard } from "../../components/dashboard/StatCard";
import { EnergyChart } from "../../components/dashboard/EnergyChart";
import { RecommendationPanel } from "../../components/dashboard/RecommendationPanel";
import { HistoryTable } from "../../components/dashboard/HistoryTable";

import {
  Bolt,
  CircleDollarSign,
  Gauge,
  TrendingUp,
} from "lucide-react";


export function Dashboard() {
  const { dashboardData } = useDashboard();

  return (
    <>
      <WelcomeBanner />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Consumo Atual"
          value={dashboardData.consumoAtual}
          description = "+8% em relação à semana passada"
          icon={<Bolt size={28} />}
        />

        <StatCard
          title="Perfil"
          value={dashboardData.perfil}
          description="Classificação da IA"
          icon={<Gauge size={28} />}
        />

        <StatCard
          title="Economia"
          value={dashboardData.economia}
          description = "Economia estimada mensal"
          icon={<CircleDollarSign size={28} />}
        />

        <StatCard
          title="Precisão"
          value={dashboardData.precisao}
          description = "Modelo Random Forest"
          icon={<TrendingUp size={28} />}
        />

      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">

        <EnergyChart />

        <RecommendationPanel />

      </section>

      <section className="mt-8">

        <HistoryTable limit={5}/>

      </section>
      
    </>
  );
}