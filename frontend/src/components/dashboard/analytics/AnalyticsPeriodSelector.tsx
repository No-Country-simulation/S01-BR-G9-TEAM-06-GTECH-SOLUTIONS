import { CalendarDays } from "lucide-react";

import { useTranslation } from "../../../i18n/useTranslation";

export type AnalyticsPeriod =
  | "Hoje"
  | "Semana"
  | "Mês"
  | "Ano";

type AnalyticsPeriodSelectorProps = {
  selectedPeriod: AnalyticsPeriod;
  onChange: (period: AnalyticsPeriod) => void;
};

const periods: AnalyticsPeriod[] = [
  "Hoje",
  "Semana",
  "Mês",
  "Ano",
];

export function AnalyticsPeriodSelector({
  selectedPeriod,
  onChange,
}: AnalyticsPeriodSelectorProps) {

  const { t } = useTranslation();

  function translatePeriod(period: AnalyticsPeriod) {
    switch (period) {
      case "Hoje":
        return t("today");

      case "Semana":
        return t("week");

      case "Mês":
        return t("month");

      case "Ano":
        return t("year");

      default:
        return period;
    }
  }

  return (
    <div
      className="
        mt-8
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div className="flex items-center gap-3">

        <CalendarDays
          className="text-slate-500 dark:text-slate-400"
          size={20}
        />

        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {t("period")}
        </span>

      </div>

      <div
        className="
          inline-flex
          rounded-2xl
          bg-slate-100
          p-1

          dark:bg-slate-800
        "
      >
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => onChange(period)}
            className={`
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-300

              ${
                selectedPeriod === period
                  ? "bg-yellow-500 text-white shadow"
                  : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
              }
            `}
          >
            {translatePeriod(period)}
          </button>
        ))}
      </div>
    </div>
  );
}
