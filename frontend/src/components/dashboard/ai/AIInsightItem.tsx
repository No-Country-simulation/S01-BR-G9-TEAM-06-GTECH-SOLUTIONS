import type { ReactNode } from "react";

type AIInsightItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function AIInsightItem({
  icon,
  title,
  description,
}: AIInsightItemProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-4
        rounded-2xl
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md

        dark:bg-slate-900
        dark:border
        dark:border-slate-700
      "
    >

      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-yellow-100
          text-yellow-600

          dark:bg-yellow-500/20
          dark:text-yellow-400
        "
      >
        {icon}
      </div>

      <div className="flex-1">

        <h4
          className="
            font-semibold
            text-slate-900

            dark:text-white
          "
        >
          {title}
        </h4>

        <p
          className="
            mt-1
            text-sm
            leading-6
            text-slate-500

            dark:text-slate-400
          "
        >
          {description}
        </p>

      </div>

    </div>
  );
}
