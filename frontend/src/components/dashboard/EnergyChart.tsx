import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDashboard } from "../../context/useDashboard";

import type { AnalyticsPeriod } from "./analytics/AnalyticsPeriodSelector";

import { filterHistoryByPeriod } from "../../services/analytics/filterHistoryByPeriod";

import { useTranslation } from "../../i18n/useTranslation";

type EnergyChartProps = {
  selectedPeriod: AnalyticsPeriod;
};

export function EnergyChart({
  selectedPeriod,
}: EnergyChartProps) {

  const { history } = useDashboard();

  const { t } = useTranslation();

  const filteredHistory = filterHistoryByPeriod(
    history,
    selectedPeriod
  );

  const data = filteredHistory
    .slice()
    .reverse()
    .map((item, index) => ({
      name: `${index + 1}`,
      consumo: Number(
        item.consumo.replace(" kWh", "")
      ),
    }));

  return (

    <div className="h-96">

      <ResponsiveContainer width="100%" height="100%">

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="colorConsumo"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#FACC15"
                stopOpacity={0.45}
              />

              <stop
                offset="95%"
                stopColor="#FACC15"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            opacity={0.25}
          />

          <XAxis
            dataKey="name"
            tick={{
              fill: "#94A3B8",
            }}
            axisLine={{
              stroke: "#475569",
            }}
            tickLine={{
              stroke: "#475569",
            }}
          />

          <YAxis
            tick={{
              fill: "#94A3B8",
            }}
            axisLine={{
              stroke: "#475569",
            }}
            tickLine={{
              stroke: "#475569",
            }}
          />

          <Tooltip
            formatter={(value) => [
              `${value ?? 0} ${t("kwh")}`,
              t("Consumption"),
            ]}
            labelFormatter={(label) =>
              `${t("analysis")} ${label}`
            }
            contentStyle={{
              backgroundColor: "#0F172A",
              border: "1px solid #334155",
              borderRadius: 14,
              color: "#F8FAFC",
            }}
            labelStyle={{
              color: "#F8FAFC",
            }}
          />

          <Area
            type="monotone"
            dataKey="consumo"
            stroke="#FACC15"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorConsumo)"
            activeDot={{
              r: 7,
            }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );

}