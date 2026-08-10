import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { MetricCardProps } from "./metric-card.types";

export function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  variant,
  trendValue,
  trendLabel,
  positive = true,
}: MetricCardProps) {
  const variantStyles = {
    energy: {
      bg: "bg-yellow-100 dark:bg-yellow-500/15",
      text: "text-yellow-500 dark:text-yellow-400",
    },

    economy: {
      bg: "bg-blue-100 dark:bg-blue-500/15",
      text: "text-blue-500 dark:text-blue-400",
    },

    efficiency: {
      bg: "bg-green-100 dark:bg-green-500/15",
      text: "text-green-500 dark:text-green-400",
    },

    ai: {
      bg: "bg-purple-100 dark:bg-purple-500/15",
      text: "text-purple-500 dark:text-purple-400",
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-7
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div
        className={`
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          transition-colors
          duration-300

          ${style.bg}
        `}
      >
        <Icon
          className={`
            h-7
            w-7
            transition-all
            duration-300
            group-hover:scale-110

            ${style.text}
          `}
        />
      </div>

      <h3
        className="
          mt-6
          text-sm
          font-medium
          text-slate-500

          dark:text-slate-400
        "
      >
        {title}
      </h3>

      <div className="mt-3 flex items-end gap-2">
        <span
          className="
            text-4xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          {value}
        </span>

        {unit && (
          <span
            className="
              mb-1
              text-lg
              text-slate-500

              dark:text-slate-400
            "
          >
            {unit}
          </span>
        )}
      </div>

      {(trendValue || trendLabel) && (
        <>
          <div
            className="
              my-5
              h-px
              bg-slate-100

              dark:bg-slate-700
            "
          />

          <div className="flex items-center gap-2">
            {positive ? (
              <ArrowDownRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            )}

            <span
              className={`text-sm font-semibold ${
                positive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {trendValue}
            </span>
          </div>

          {trendLabel && (
            <p
              className="
                mt-2
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              {trendLabel}
            </p>
          )}
        </>
      )}
    </div>
  );
}
