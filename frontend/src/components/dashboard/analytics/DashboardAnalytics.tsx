import {
  Activity,
  BrainCircuit,
  CircleDollarSign,
  Gauge,
} from "lucide-react";

import { DashboardSection } from "../layout/DashboardSection";
import { EnergyChart } from "../EnergyChart";

import { ProfileChart } from "../../analytics/ProfileChart";

import type { AnalyticsPeriod } from "../analytics/AnalyticsPeriodSelector";

export function DashboardAnalytics() {
  const selectedPeriod: AnalyticsPeriod = "Mês";

  return (
    <DashboardSection
      title="Dashboard Analytics"
      subtitle="Indicadores inteligentes em tempo real"
    >
      {/* KPIs Superiores */}

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-50 p-5">

          <div className="flex items-center gap-3">

            <Activity
              className="text-yellow-500"
              size={22}
            />

            <span className="text-sm font-medium text-slate-500">
              Consumo Médio
            </span>

          </div>

          <h3 className="mt-4 text-3xl font-bold">
            420
          </h3>

          <p className="text-sm text-slate-500">
            kWh / mês
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <div className="flex items-center gap-3">

            <Gauge
              className="text-blue-500"
              size={22}
            />

            <span className="text-sm font-medium text-slate-500">
              Pico de Uso
            </span>

          </div>

          <h3 className="mt-4 text-3xl font-bold">
            19h
          </h3>

          <p className="text-sm text-slate-500">
            Horário crítico
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <div className="flex items-center gap-3">

            <CircleDollarSign
              className="text-green-500"
              size={22}
            />

            <span className="text-sm font-medium text-slate-500">
              Economia
            </span>

          </div>

          <h3 className="mt-4 text-3xl font-bold">
            R$182
          </h3>

          <p className="text-sm text-slate-500">
            Estimada
          </p>

        </div>

      </div>

      {/* Gráfico */}

      <div className="mt-8 grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <EnergyChart selectedPeriod={selectedPeriod} />
        </div>

        <ProfileChart />

      </div>

      {/* IA */}

      <div className="mt-8 rounded-3xl border border-yellow-100 bg-yellow-50 p-6">

        <div className="flex items-center gap-3">

          <BrainCircuit
            size={26}
            className="text-yellow-600"
          />

          <div>

            <h3 className="font-semibold text-slate-900">
              Insights da Inteligência Artificial
            </h3>

            <p className="text-sm text-slate-500">
              Recomendações geradas automaticamente.
            </p>

          </div>

        </div>

        <div className="mt-6 space-y-4">

          <div className="rounded-2xl bg-white p-4 shadow-sm">

            Consumo 12% menor em relatório ao mês passado.

          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">

            Pico de consumo identificado entre 18h e 21h.

          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">

            Economia estimada de R$182 mantendo os hábitos atuais.

          </div>

        </div>

      </div>

    </DashboardSection>
  );
}
