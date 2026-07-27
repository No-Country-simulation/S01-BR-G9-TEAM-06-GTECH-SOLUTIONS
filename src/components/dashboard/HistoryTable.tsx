import { useDashboard } from "../../hooks/useDashboard";

type HistoryTableProps = {
  limit?: number;
  search?: string;
  filter?: "Todos" | "Eficiente" | "Moderado" | "Ineficiente";
};

export function HistoryTable({
  limit,
  search = "",
  filter = "Todos"
}: HistoryTableProps) {
  const { history } = useDashboard();
  /*console.log("Histórico:", history);*/

  function getBadge(item: string) {
    switch (item) {
      case "Eficiente":
        return "bg-green-100 text-green-700";

      case "Moderado":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-red-100 text-red-700";
    }
  }

  const filteredHistory = history.filter((item) => {
  const text = search.toLowerCase();

  const matchSearch =
    item.data.toLowerCase().includes(text) ||
    item.categoria.toLowerCase().includes(text) ||
    item.consumo.toLowerCase().includes(text);

  const matchCategory =
    filter === "Todos" ||
    item.categoria === filter;

  return matchSearch && matchCategory;
});

  /*console.log("Pesquisa:", search);
  console.log("Resultado:", filteredHistory);*/

  const displayedHistory = limit
    ? filteredHistory.slice(0, limit)
    : filteredHistory;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Histórico de Análises
        </h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {displayedHistory.length} análises
        </span>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">Data</th>

            <th className="text-left">Categoria</th>

            <th className="text-left">Consumo</th>

          </tr>

        </thead>

        <tbody>

          {displayedHistory.map((item) => (

            <tr
              key={`${item.data}-${item.consumo}`}
              className="border-b hover:bg-slate-50 transition"
            >

              <td className="py-4">
                {item.data}
              </td>

              <td>

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    ${getBadge(item.categoria)}
                  `}
                >
                  {item.categoria}
                </span>

              </td>

              <td>
                {item.consumo}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {displayedHistory.length === 0 && (

        <div className="py-10 text-center text-slate-500">

          Nenhuma análise encontrada.

        </div>

      )}

    </div>
  );
}