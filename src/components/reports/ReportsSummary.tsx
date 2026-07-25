import { useDashboard } from "../../context/DashboardContext";
import { generateAnalytics } from "../../services/analyticsService";

export function ReportsSummary() {

  const { history } = useDashboard();

  const analytics = generateAnalytics(history);

  return (

    <div className="grid gap-6 md:grid-cols-4">

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <p className="text-sm text-slate-500">
          Total de análises
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {analytics.totalAnalises}
        </h2>

      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <p className="text-sm text-slate-500">
          Consumo médio
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {analytics.consumoMedio.toFixed(0)} kWh
        </h2>

      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <p className="text-sm text-slate-500">
          Economia total
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          R$ {analytics.economiaTotal}
        </h2>

      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <p className="text-sm text-slate-500">
          Perfil predominante
        </p>

        <h2 className="mt-2 text-3xl font-bold text-yellow-500">
          {analytics.perfilPredominante}
        </h2>

      </div>

    </div>

  );

}