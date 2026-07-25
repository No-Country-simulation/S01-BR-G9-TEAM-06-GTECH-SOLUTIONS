import { useDashboard } from "../../context/DashboardContext";

import {
  FileDown,
  FileSpreadsheet,
} from "lucide-react";

import {
  exportToPDF,
  exportToExcel,
} from "../../services/exportService";

export function ExportPanel() {
    
    const { history } = useDashboard();

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        Exportação

      </h2>

      <div className="flex flex-wrap gap-4">

        <button
            onClick={() => exportToPDF(history)}
            className="
                flex items-center gap-3
                rounded-xl
                bg-red-500
                px-6
                py-3
                text-white
                transition
                hover:bg-red-600
            "
            >


          <FileDown size={20} />

          Exportar PDF

        </button>

        <button
            onClick={() => exportToExcel(history)}
            className="
                flex items-center gap-3
                rounded-xl
                bg-green-600
                px-6
                py-3
                text-white
                transition
                hover:bg-green-700
            "
            >

            <FileSpreadsheet size={20} />

            Exportar Excel

        </button>

      </div>

    </div>

  );

}