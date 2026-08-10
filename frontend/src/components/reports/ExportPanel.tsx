import { useDashboard } from "../../context";

import {
  FileDown,
  FileSpreadsheet,
} from "lucide-react";

import {
  exportToPDF,
  exportToExcel,
} from "../../services/exportService";

import { useTranslation } from "@/i18n/useTranslation";

export function ExportPanel() {
  const { history } = useDashboard();

  const { t, language } = useTranslation();

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-colors
        duration-300

        dark:bg-slate-900
        dark:border-slate-700
      "
    >
      <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
        {t("exportation")}
      </h2>

      <div className="flex flex-wrap gap-4">
        {/* PDF */}
        <button
          onClick={() => exportToPDF(history, language)}
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-red-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-600
          "
        >
          <FileDown size={20} />

          {t("exportPDF")}
        </button>

        {/* Excel */}
        <button
          onClick={() => exportToExcel(history, language)}
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-green-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-green-700
          "
        >
          <FileSpreadsheet size={20} />

          {t("exportExcel")}
        </button>
      </div>
    </div>
  );
}