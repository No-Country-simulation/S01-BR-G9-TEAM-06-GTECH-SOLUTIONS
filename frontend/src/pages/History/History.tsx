import { useTranslation } from "@/i18n/useTranslation";
import { formatCurrency } from "@/utils/currency";
import { useState } from "react";
import { useDashboard } from "../../context";

import { HistoryTable } from "../../components/dashboard/HistoryTable";

export function History() {
  const { history } = useDashboard();
  const { t } = useTranslation();

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "Todos" | "Eficiente" | "Moderado" | "Ineficiente"
  >("Todos");

  const statistics = history.reduce(
    (acc, item) => {
      acc.total++;

      switch (item.perfil) {
        case "Eficiente":
          acc.eficientes++;
          break;

        case "Moderado":
          acc.moderados++;
          break;

        case "Ineficiente":
          acc.ineficientes++;
          break;
      }

      return acc;
    },
    {
      total: 0,
      eficientes: 0,
      moderados: 0,
      ineficientes: 0,
    }
  );

  const custoMedioMensal =
    history.length === 0
      ? 0
      : history.reduce(
          (acc, item) => acc + item.custoEstimadoMensal,
          0,
        ) / history.length;

  return (
    <div>
      {/* Cabeçalho */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Histórico de Análises
        </h1>

        <p className="mt-3 text-slate-500">
          Consulte todas as análises realizadas pelo IntelliWatts.
        </p>

      </div>

      {/* Cards */}

      <div className="mb-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Total de análises
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {statistics.total}
          </h2>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Perfil predominante
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-500">

            {statistics.eficientes >= statistics.moderados &&
            statistics.eficientes >= statistics.ineficientes
              ? "Eficiente"
              : statistics.moderados >= statistics.ineficientes
              ? "Moderado"
              : "Ineficiente"}

          </h2>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            {t("averageMonthlyCost")}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {formatCurrency(custoMedioMensal)}
          </h2>

        </div>

      </div>

      {/* Pesquisa */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Pesquisar por data, perfil ou consumo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            p-4
            outline-none
            transition
            focus:border-yellow-500
          "
        />

      </div>

      {/* Botões */}

      <div className="mb-8 flex flex-wrap gap-3">

        <button
          onClick={() => setFilter("Todos")}
          className={`rounded-full px-4 py-2 transition ${
            filter === "Todos"
              ? "bg-yellow-500 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          Todos ({statistics.total})
        </button>

        <button
          onClick={() => setFilter("Eficiente")}
          className={`rounded-full px-4 py-2 transition ${
            filter === "Eficiente"
              ? "bg-green-500 text-white"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          Eficiente ({statistics.eficientes})
        </button>

        <button
          onClick={() => setFilter("Moderado")}
          className={`rounded-full px-4 py-2 transition ${
            filter === "Moderado"
              ? "bg-yellow-500 text-white"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          }`}
        >
          Moderado ({statistics.moderados})
        </button>

        <button
          onClick={() => setFilter("Ineficiente")}
          className={`rounded-full px-4 py-2 transition ${
            filter === "Ineficiente"
              ? "bg-red-500 text-white"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          Ineficiente ({statistics.ineficientes})
        </button>

      </div>

      {/* Timeline */}

      <HistoryTable
        search={search}
        filter={filter}
      />

    </div>
  );
}