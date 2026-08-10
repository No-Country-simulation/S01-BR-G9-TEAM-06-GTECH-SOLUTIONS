import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useDashboard } from "../../context";

import type { AnalyticsPeriod } from "../dashboard/analytics/AnalyticsPeriodSelector";

import { filterHistoryByPeriod } from "../../services/analytics/filterHistoryByPeriod";

import { useTranslation } from "../../i18n/useTranslation";

type ConsumptionChartProps = {
  selectedPeriod: AnalyticsPeriod;
};

export function ConsumptionChart({
  selectedPeriod,
}: ConsumptionChartProps) {

  const { history } = useDashboard();
  const { t } = useTranslation();

  const filteredHistory = [
    ...filterHistoryByPeriod(history, selectedPeriod),
  ].reverse();

  const data = filteredHistory.map((item, index) => ({
    name: `${index + 1}`,
    consumo: Number(item.consumo.replace(" kWh", "")),
  }));

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
        {t("consumptionEvolution")}
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#475569"
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "#94A3B8" }}
              axisLine={{ stroke: "#475569" }}
              tickLine={{ stroke: "#475569" }}
            />

            <YAxis
              tick={{ fill: "#94A3B8" }}
              axisLine={{ stroke: "#475569" }}
              tickLine={{ stroke: "#475569" }}
            />

            <Tooltip
              formatter={(value) => [
                `${value ?? 0} kWh`,
                t("consumption"),
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

            <Line
              type="monotone"
              dataKey="consumo"
              stroke="#facc15"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}