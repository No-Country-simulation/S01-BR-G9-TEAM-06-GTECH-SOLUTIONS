import { Brain } from "lucide-react";
import { useDashboard } from "../../context";
import { generateAnalytics } from "../../services/analyticsService";

export function InsightsPanel() {

  const { history } = useDashboard();

  const analytics = generateAnalytics(history);

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <Brain className="text-yellow-500" />

        <h2 className="text-xl font-bold">
          Insights da IA
        </h2>

      </div>

      <div className="space-y-4">

        {analytics.insights.map((insight, index) => (

          <div
            key={index}
            className="rounded-2xl bg-yellow-50 p-4 text-slate-700"
          >

            💡 {insight}

          </div>

        ))}

      </div>

    </div>

  );
}