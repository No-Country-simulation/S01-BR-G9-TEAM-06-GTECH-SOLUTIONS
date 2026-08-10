import { History } from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";

type HistoryHeaderProps = {
  total: number;
};

export function HistoryHeader({
  total,
}: HistoryHeaderProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 p-4">

          <History
            className="text-yellow-600 dark:text-yellow-400"
            size={24}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t("historyTitle")}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("historySubtitle")}
          </p>

        </div>

      </div>

      <div
        className="
          rounded-full
          bg-slate-100
          px-4
          py-2
          text-sm
          font-semibold
          text-slate-600

          dark:bg-slate-800
          dark:text-slate-300
        "
      >
        {t("analysisCount").replace("{count}", String(total))}
      </div>

    </div>
  );
}
