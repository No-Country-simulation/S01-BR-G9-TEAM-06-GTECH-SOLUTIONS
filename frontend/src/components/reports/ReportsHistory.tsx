import { HistoryTable } from "../dashboard/HistoryTable";

import { useTranslation } from "@/i18n/useTranslation";

export function ReportsHistory() {
  const { t } = useTranslation();

  return (
    <div>
      <h2
        className="
          mb-4
          text-2xl
          font-bold
          text-slate-900
          dark:text-white
        "
      >
        {t("completeHistory")}
      </h2>

      <HistoryTable />
    </div>
  );
}