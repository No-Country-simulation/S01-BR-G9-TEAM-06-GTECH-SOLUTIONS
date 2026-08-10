import {
  CalendarDays,
  CircleDollarSign,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

import { useTranslation } from "@/i18n/useTranslation";

type HistoryCardProps = {
  data: string;
  perfil: string;
  consumo: string;
  economia: string;
};

function getBadgeColor(perfil?: string) {
  switch (perfil) {
    case "Eficiente":
      return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";

    case "Moderado":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";

    case "Ineficiente":
      return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";

    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
  }
}

export function HistoryCard({
  data,
  perfil,
  consumo,
  economia,
}: HistoryCardProps) {

  const navigate = useNavigate();

  const { t } = useTranslation();

  const profileTranslationMap = {
  Eficiente: "efficient",
  Moderado: "moderate",
  Ineficiente: "inefficient",
} as const;

  return (
    <article
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg

        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <CalendarDays
            className="text-slate-400 dark:text-slate-500"
            size={20}
          />

          <span
            className="
              font-medium
              text-slate-700

              dark:text-slate-200
            "
          >
            {data}
          </span>

        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${getBadgeColor(perfil)}
          `}
        >
          {perfil
          ? t(
              profileTranslationMap[
                perfil as keyof typeof profileTranslationMap
              ] ?? "none"
            )
          : t("historyNoClassification")}
        </span>

      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div>

          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            {t("historyConsumption")}
          </p>

          <h3
            className="
              mt-1
              text-2xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            {consumo}
          </h3>

        </div>

        <div>

          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            {t("historyEstimatedSaving")}
          </p>

          <div className="mt-1 flex items-center gap-2">

            <CircleDollarSign
              className="text-green-500 dark:text-green-400"
              size={20}
            />

            <span
              className="
                text-2xl
                font-bold
                text-green-600

                dark:text-green-400
              "
            >
              {economia}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-6 flex justify-end">

        <button
          onClick={() => navigate(ROUTES.ANALYTICS)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-slate-900
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-slate-800

            dark:bg-slate-700
            dark:hover:bg-slate-600
          "
        >
          <Eye size={18} />

          {t("historyDetails")}

        </button>

      </div>

    </article>
  );
}
