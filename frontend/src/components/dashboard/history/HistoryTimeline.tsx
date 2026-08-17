import { formatCurrency } from "@/utils/currency";
import { useDashboard } from "../../../context";

import { HistoryHeader } from "./HistoryHeader";
import { HistoryCard } from "./HistoryCard";

import { useTranslation } from "@/i18n/useTranslation";

type HistoryTimelineProps = {
  limit?: number;
  search?: string;
  filter?: "Todos" | "Eficiente" | "Moderado" | "Ineficiente";
};

export function HistoryTimeline({
  limit,
  search = "",
  filter = "Todos",
}: HistoryTimelineProps) {
  const { history } = useDashboard();

  const { t } = useTranslation();

  const filterMap = {
  All: "Todos",
  Efficient: "Eficiente",
  Moderate: "Moderado",
  Inefficient: "Ineficiente",
} as const;

  // Pesquisa
  let filteredHistory = history.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.data.toLowerCase().includes(query) ||
      item.perfil.toLowerCase().includes(query) ||
      item.consumo.toLowerCase().includes(query) ||
      formatCurrency(item.custoEstimadoMensal)
        .toLowerCase()
        .includes(query)
    );
  });

  // Filtro
  const internalFilter =
  filterMap[
    filter as keyof typeof filterMap
  ] ?? filter;

if (internalFilter !== "Todos") {
  filteredHistory = filteredHistory.filter(
    (item) => item.perfil === internalFilter
  );
}

  // Limite (Dashboard)
  const data =
    limit != null
      ? filteredHistory.slice(0, limit)
      : filteredHistory;

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-colors

        dark:bg-slate-900
        dark:border-slate-700
      "
    >
      <HistoryHeader total={filteredHistory.length} />

      <div className="mt-10 space-y-8">

        {data.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-300
              p-10
              text-center

              dark:border-slate-600
            "
          >
            <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
              {t("historyEmptyTitle")}
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {t("historyEmptyDescription")}
            </p>
          </div>

        ) : (

          data.map((item, index) => (
            <div
              key={item.id}
              className="relative"
            >
              {/* Linha vertical */}

              {index !== data.length - 1 && (
                <div
                  className="
                    absolute
                    left-5
                    top-12
                    h-full
                    w-px
                    bg-slate-200 dark:bg-slate-700
                  "
                />
              )}

              <div className="flex gap-6">

                {/* Indicador */}

                <div
                  className="
                    mt-2
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-500 dark:bg-yellow-400
                    shadow-md
                  "
                >
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>

                {/* Card */}

                <div className="flex-1">

                  <HistoryCard
                    data={item.data}
                    perfil={item.perfil}
                    consumo={item.consumo}
                    custoEstimadoMensal={item.custoEstimadoMensal}
                  />

                </div>

              </div>

            </div>
          ))

        )}

      </div>

    </section>
  );
}
