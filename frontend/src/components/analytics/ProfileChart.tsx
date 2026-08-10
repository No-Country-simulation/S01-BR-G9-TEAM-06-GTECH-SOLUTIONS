import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useDashboard } from "../../context";

import { useTranslation } from "../../i18n/useTranslation";

const COLORS = [
  "#22c55e", // Verde
  "#facc15", // Amarelo
  "#ef4444", // Vermelho
];

export function ProfileChart() {

  const { history } = useDashboard();

  const { t } = useTranslation();

  const eficientes = history.filter(
    item => item.perfil === "Eficiente"
  ).length;

  const moderados = history.filter(
    item => item.perfil === "Moderado"
  ).length;

  const ineficientes = history.filter(
    item => item.perfil === "Ineficiente"
  ).length;

  const data = [
    {
      name: t("Efficient"),
      value: eficientes,
    },
    {
      name: t("Moderate"),
      value: moderados,
    },
    {
      name: t("Inefficient"),
      value: ineficientes,
    },
  ].filter((item) => item.value > 0);

  return (

    <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors

          dark:bg-slate-900
          dark:border-slate-700
        "
      >

      <h2
            className="
              mb-6
              text-xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
        {t("profileDistribution")}
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

            <Tooltip
              formatter={(value) => [
                value,
                t("analysiscount"),
              ]}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #334155",
                backgroundColor: "#0F172A",
                color: "#F8FAFC",
              }}
              labelStyle={{
                color: "#F8FAFC",
              }}
            />

            <Legend
              wrapperStyle={{
                color: "#CBD5E1",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}