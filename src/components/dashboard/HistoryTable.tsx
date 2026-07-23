const history = [
  {
    data: "20/07/2026",
    categoria: "Moderado",
    consumo: "420 kWh",
  },
  {
    data: "18/07/2026",
    categoria: "Eficiente",
    consumo: "350 kWh",
  },
];

export function HistoryTable() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Últimas análises
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">Data</th>

            <th className="text-left">Categoria</th>

            <th className="text-left">Consumo</th>

          </tr>

        </thead>

        <tbody>

          {history.map((item) => (
            <tr key={item.data} className="border-b">

              <td className="py-4">
                {item.data}
              </td>

              <td>{item.categoria}</td>

              <td>{item.consumo}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}