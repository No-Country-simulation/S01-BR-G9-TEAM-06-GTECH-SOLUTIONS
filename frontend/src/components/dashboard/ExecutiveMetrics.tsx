import {
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
} from "lucide-react";

import { useDashboard } from "../../context/useDashboard";

export function ExecutiveMetrics() {

  const { history } = useDashboard();

  if (history.length === 0) return null;

  const consumos = history.map(item =>
    Number(item.consumo.replace(" kWh", ""))
  );

  const maiorConsumo = Math.max(...consumos);

  const menorConsumo = Math.min(...consumos);

  const consumoMedio =
    consumos.reduce((a, b) => a + b, 0) /
    consumos.length;

  const ultimaAnalise = history[0].data;

  const cards = [
    {
      titulo: "Maior consumo",
      valor: `${maiorConsumo} kWh`,
      icon: TrendingUp,
      color: "text-red-500",
    },
    {
      titulo: "Menor consumo",
      valor: `${menorConsumo} kWh`,
      icon: TrendingDown,
      color: "text-green-500",
    },
    {
      titulo: "Consumo médio",
      valor: `${consumoMedio.toFixed(0)} kWh`,
      icon: BarChart3,
      color: "text-yellow-500",
    },
    {
      titulo: "Última análise",
      valor: ultimaAnalise,
      icon: Calendar,
      color: "text-blue-500",
    },
  ];

  return (
    <section className="mt-10">

      <h2 className="mb-6 text-2xl font-bold">
        Indicadores Gerais
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.titulo}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm min-h-42.5"
            >

              <Icon
                size={30}
                className={`mb-4 ${card.color}`}
              />

              <p className="text-sm text-slate-500 min-h-10">
                {card.titulo}
              </p>

              <h3 className="mt-2 text-2xl font-bold wrap-break-word">
                {card.valor}
              </h3>

            </div>

          );

        })}

      </div>

    </section>
  );
}