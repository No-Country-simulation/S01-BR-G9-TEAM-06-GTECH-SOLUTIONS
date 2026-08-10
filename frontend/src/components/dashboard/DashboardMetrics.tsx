import { ConsumptionCard } from "./cards/ConsumptionCard";
import { EconomyCard } from "./cards/EconomyCard";
import { EfficiencyCard } from "./cards/EfficiencyCard";
import { AIScoreCard } from "./cards/AIScoreCard";

export function DashboardMetrics() {
  return (
    <section
      className="
        mt-8
        grid
        gap-6
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <ConsumptionCard />

      <EconomyCard />

      <EfficiencyCard />

      <AIScoreCard />
    </section>
  );
}
