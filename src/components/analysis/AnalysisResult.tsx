import {
  BadgeCheck,
  CircleDollarSign,
  Gauge,
} from "lucide-react";

import { useDashboard } from "../../hooks/useDashboard";

export function AnalysisResult() {

  const { dashboardData } = useDashboard();

  const badgeColor =
  dashboardData.perfil === "Eficiente"
    ? "text-green-500"
    : dashboardData.perfil === "Moderado"
    ? "text-yellow-500"
    : "text-red-500";

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <BadgeCheck
          size={34}
          className={badgeColor}
        />

        <h2 className="text-2xl font-bold">
          Resultado da IA
          <p className="text-slate-500">
              A Inteligência Artificial analisou o consumo energético
              e classificou o perfil do imóvel.
          </p>
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-50 p-6">

          <Gauge
            className="mb-4 text-yellow-500"
          />

          <p className="text-sm text-slate-500">
            Perfil
          </p>

          <h3 className="text-2xl font-bold">
            {dashboardData.perfil}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-6">

          <BadgeCheck
            className="mb-4 text-green-500"
          />

          <p className="text-sm text-slate-500">
            Confiança
          </p>

          <h3 className="text-2xl font-bold">
            {dashboardData.precisao}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-6">

          <CircleDollarSign
            className="mb-4 text-yellow-500"
          />

          <p className="text-sm text-slate-500">
            Economia Estimada
          </p>

          <h3 className="text-2xl font-bold">
            {dashboardData.economia}
          </h3>

        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-yellow-50 p-6">

        <h3 className="mb-3 text-lg font-bold">
          Mensagem da IA
        </h3>

        <p className="text-slate-700 leading-7">
          {dashboardData.mensagem}
        </p>

      </div>

    </div>
  );
}