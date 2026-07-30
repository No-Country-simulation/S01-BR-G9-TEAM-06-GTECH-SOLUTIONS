import { ReportsSummary } from "../../components/reports/ReportsSummary";
import { ExportPanel } from "../../components/reports/ExportPanel";
import { ReportsHistory } from "../../components/reports/ReportsHistory";

export function Reports() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Relatórios
        </h1>

        <p className="mt-2 text-slate-500">
          Visualize e exporte informações detalhadas das análises realizadas.
        </p>

      </div>

      <ReportsSummary />

      <ExportPanel />

      <ReportsHistory />

    </div>
  );
}