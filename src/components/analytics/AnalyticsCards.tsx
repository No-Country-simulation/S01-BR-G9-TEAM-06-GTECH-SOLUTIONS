import {
  History,
  Bolt,
  CircleDollarSign,
  Gauge,
} from "lucide-react";

import { useDashboard } from "../../context";
import { generateAnalytics } from "../../services/analyticsService";

export function AnalyticsCards() {

  const { history } = useDashboard();

  const analytics = generateAnalytics(history);

 
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <History
          className="mb-4 text-yellow-500"
          size={30}
        />

        <p className="text-sm text-slate-500">
          Total de análises
        </p>

        <h2 className="mt-2 text-3xl font-bold">
            {analytics.totalAnalises}
        </h2>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <Bolt
          className="mb-4 text-yellow-500"
          size={30}
        />

        <p className="text-sm text-slate-500">
          Consumo médio
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {analytics.consumoMedio.toFixed(0)} kWh
        </h2>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <CircleDollarSign
          className="mb-4 text-green-500"
          size={30}
        />

        <p className="text-sm text-slate-500">
          Economia Total
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          R$ {analytics.economiaTotal}
        </h2>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <Gauge
          className="mb-4 text-blue-500"
          size={30}
        />

        <p className="text-sm text-slate-500">
          Perfil predominante
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {analytics.perfilPredominante}
        </h2>

      </div>

    </section>
  );
}