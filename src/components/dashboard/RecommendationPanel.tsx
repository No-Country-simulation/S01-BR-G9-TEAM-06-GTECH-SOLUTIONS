import { Lightbulb } from "lucide-react";
import { useDashboard } from "../../context";

export function RecommendationPanel() {

  const { dashboardData } = useDashboard();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">
        <Lightbulb className="text-yellow-500" />

        <h2 className="text-xl font-bold">
          Recomendações da IA
        </h2>
      </div>

      <ul className="space-y-4">
        {dashboardData.recomendacoes.map((item) => (
          <li
            key={item}
            className="rounded-xl bg-yellow-50 p-4 text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
}