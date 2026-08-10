import { Sparkles, Plus } from "lucide-react";

import { useTranslation } from "../../../i18n/useTranslation";

type Props = {
  onNewAnalysis: () => void;
};

export function DashboardEmpty({
  onNewAnalysis,
}: Props) {

  const { t } = useTranslation();

  return (
    <section
      className="
        flex
        min-h-[65vh]
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-12
          text-center
          shadow-sm
        "
      >
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-yellow-100
          "
        >
          <Sparkles
            size={36}
            className="text-yellow-600"
          />
        </div>

        <h1
          className="
            mt-8
            text-4xl
            font-bold
            text-slate-900
          "
        >
          {t("dashboardEmptyTitle")}
        </h1>

        <p
          className="
            mt-6
            text-lg
            leading-8
            text-slate-500
          "
        >
          {t("dashboardEmptySubtitle")}
        </p>

        <p
          className="
            mt-2
            text-lg
            leading-8
            text-slate-500
          "
        >
          {t("dashboardEmptyDescription")}
        </p>

        <button
          onClick={onNewAnalysis}
          className="
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-2xl
            bg-yellow-500
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-yellow-600
          "
        >
          <Plus size={20} />

          {t("newAnalysis")}
        </button>
      </div>
    </section>
  );
}
