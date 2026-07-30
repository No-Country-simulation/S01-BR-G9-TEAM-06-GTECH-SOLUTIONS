import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useDashboard } from "../../context";

const COLORS = [
  "#22c55e", // Verde
  "#facc15", // Amarelo
  "#ef4444", // Vermelho
];

export function ProfileChart() {

  const { history } = useDashboard();

  const eficientes = history.filter(
    item => item.categoria === "Eficiente"
  ).length;

  const moderados = history.filter(
    item => item.categoria === "Moderado"
  ).length;

  const ineficientes = history.filter(
    item => item.categoria === "Ineficiente"
  ).length;

  const data = [
    {
      name: "Eficiente",
      value: eficientes,
    },
    {
      name: "Moderado",
      value: moderados,
    },
    {
      name: "Ineficiente",
      value: ineficientes,
    },
  ].filter(item => item.value > 0);

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Distribuição dos Perfis
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}