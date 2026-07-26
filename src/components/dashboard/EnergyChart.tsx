import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import { useDashboard } from "../../context";;


export function EnergyChart() {
  const { history } = useDashboard();

const data = [...history]
  .slice(0,7)
  .reverse()
  .map((item) => ({
    day: item.data,
    consumo: Number(item.consumo.replace(" kWh", "")),
  }));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Consumo semanal
        </h2>

        <p className="text-sm text-slate-500">
          Consumo estimado em kWh durante os últimos 7 dias.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tickFormatter={(value) => value.slice(0, 5)}
            />

            <YAxis />
            <Legend />

            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,.15)",
              }}
              formatter={(value) => [`${value} kWh`, "Consumo"]}
            />

            <Bar
              dataKey="consumo"
              fill = '#EAB308'
              radius={[10,10,0,0]}
            />

            <Line
              type="monotone"
              dataKey="consumo"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#2563EB",
              }}
              activeDot={{
                r: 7,
              }}
            />

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}