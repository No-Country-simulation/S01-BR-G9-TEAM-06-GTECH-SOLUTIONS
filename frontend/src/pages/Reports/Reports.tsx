import { ReportsSummary } from "../../components/reports/ReportsSummary";
import { ExportPanel } from "../../components/reports/ExportPanel";
import { ReportsHistory } from "../../components/reports/ReportsHistory";

import { useTranslation } from "@/i18n/useTranslation";

export function Reports() {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <h1
          className="
            text-4xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          {t("reports")}
        </h1>

        <p
          className="
            mt-2
            text-slate-500
            dark:text-slate-400
          "
        >
          {t("reportsDescription")}
        </p>
      </div>

      <div className="mt-8 space-y-10">
        <ReportsSummary />

        <ExportPanel />

        <ReportsHistory />
      </div>
    </div>
  );
}