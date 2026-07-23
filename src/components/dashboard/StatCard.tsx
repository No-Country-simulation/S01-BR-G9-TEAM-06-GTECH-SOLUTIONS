import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  description?: string;
};

export function StatCard({
  title,
  value,
  icon,
  description,
}: StatCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-slate-200
        p-6
        transition
        hover:shadow-lg
        hover:-translate-y-1
        duration-300
      "
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-slate-500">
          {title}
        </h3>

        <div className="text-yellow-500">
          {icon}
        </div>
      </div>

      <h2 className="mt-6 text-3xl font-bold">
        {value}
      </h2>

      {description && (
        <p className="mt-3 text-sm text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}