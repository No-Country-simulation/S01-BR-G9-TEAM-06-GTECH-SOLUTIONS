import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  description: string;

  icon: ReactNode;

  trend: string;

  positive?: boolean;

  variant?: "energy" | "economy" | "efficiency" | "ai";
};

const variants = {
  energy: {
    bg: "bg-yellow-100",
    text: "text-yellow-500",
  },

  economy: {
    bg: "bg-blue-100",
    text: "text-blue-500",
  },

  efficiency: {
    bg: "bg-green-100",
    text: "text-green-500",
  },

  ai: {
    bg: "bg-purple-100",
    text: "text-purple-500",
  },
};

export function DashboardCard({
  title,
  value,
  unit,
  description,
  icon,
  trend,
  positive = true,
  variant = "energy",
}: DashboardCardProps) {
  const colors = variants[variant];

  return (
    <article
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-7
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      "
    >
      {/* brilho superior */}

      <div
        className="
        absolute
        left-0
        top-0
        h-1
        w-full
        bg-linear-to-r
        from-yellow-400
        to-yellow-200
        opacity-0
        transition-all
        duration-300
        group-hover:opacity-100
        "
      />

      {/* topo */}

      <div className="flex items-center justify-between">

        <div
          className={`
            ${colors.bg}
            rounded-2xl
            p-4
            transition-transform
            duration-300
            group-hover:scale-110
          `}
        >
          <div className={colors.text}>{icon}</div>
        </div>

        <div
          className={`
          flex
          items-center
          gap-1
          rounded-full
          px-3
          py-1
          text-sm
          font-semibold
          ${
            positive
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }
          `}
        >
          {positive ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}

          {trend}
        </div>

      </div>

      {/* conteúdo */}

      <div className="mt-7">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="mt-2 flex items-end gap-2">

          <h2 className="text-5xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

          {unit && (
            <span className="mb-2 text-lg text-slate-500">
              {unit}
            </span>
          )}

        </div>

      </div>

      {/* mini gráfico fake */}

      <div className="mt-7 flex h-10 items-end gap-1">

        {[8, 14, 10, 18, 15, 22, 17, 26].map((bar, index) => (
          <div
            key={index}
            style={{ height: `${bar}px` }}
            className="
            flex-1
            rounded-full
            bg-linear-to-t
            from-yellow-500
            to-yellow-300
            opacity-80
            transition-all
            duration-300
            group-hover:opacity-100
            "
          />
        ))}

      </div>

      {/* rodapé */}

      <div className="mt-6 border-t border-slate-100 pt-5">

        <p className="text-sm leading-6 text-slate-500">
          {description}
        </p>

      </div>

    </article>
  );
}
