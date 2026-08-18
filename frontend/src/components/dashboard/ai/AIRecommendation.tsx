import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";
import { useTranslation } from "@/i18n/useTranslation";

type AIRecommendationProps = {
  title: string;
  description: string;
  saving: string;
};

export function AIRecommendation({
  title,
  description,
  saving,
}: AIRecommendationProps) {

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="
        rounded-3xl
        border
        border-yellow-200
        bg-linear-to-br
        from-yellow-100
        to-yellow-50
        p-6
        transition-colors
        duration-300

        dark:border-yellow-700
        dark:from-slate-900
        dark:to-slate-800
      "
    >

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-yellow-500 p-3">

          <Sparkles
            size={22}
            className="text-white"
          />

        </div>

        <div>

          <span
            className="
              text-xs
              uppercase
              tracking-wide
              text-yellow-700

              dark:text-yellow-400
            "
          >
            Recomendação Principal
          </span>

          <h3
            className="
              text-lg
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            {title}
          </h3>

        </div>

      </div>

      <p
        className="
          mt-5
          leading-7
          text-slate-600

          dark:text-slate-300
        "
      >
        {description}
      </p>

      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          rounded-2xl
          bg-white
          p-4
          transition-colors
          duration-300

          dark:bg-slate-900
          dark:border
          dark:border-slate-700
        "
      >

        <div>

          <span
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            {t("averageMonthlyCost")}
          </span>

          <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">
            {saving}
          </h4>

        </div>

        <button
          onClick={() => navigate(ROUTES.ANALYTICS)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-yellow-500
            px-5
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-yellow-600
            hover:scale-105
          "
        >
          Ver detalhes

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </div>

    </div>
  );
}
