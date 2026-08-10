import { LoaderCircle } from "lucide-react";

import { useTranslation } from "../../i18n/useTranslation";

export function LoadingAnalysis() {

  const { t } = useTranslation();

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

      <div className="flex flex-col items-center">

        <LoaderCircle
          size={60}
          className="animate-spin text-yellow-500"
        />

        <h2 className="mt-6 text-2xl font-bold">
          {t("loadingAnalysis")}
        </h2>

        <p className="mt-3 text-slate-500">
          {t("loadingDescription")}
        </p>

      </div>

    </div>
  );
}