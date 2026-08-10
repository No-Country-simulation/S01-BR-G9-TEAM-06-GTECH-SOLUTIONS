import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useTranslation } from "@/i18n/useTranslation";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      className="
        flex
        flex-1
        flex-col
        items-center
        gap-12
        bg-white
        px-6
        py-20
        transition-colors
        duration-300

        dark:bg-slate-950

        lg:flex-row
      "
    >
      {/* Conteúdo */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
        <span
          className="
            w-fit
            rounded-full
            bg-yellow-100
            px-4
            py-2
            text-sm
            font-semibold
            text-yellow-700
            transition-colors
            duration-300

            dark:bg-yellow-500/10
            dark:text-yellow-400
          "
        >
          ⚡ {t("aiPlatform")}
        </span>

        <h1
          className="
            mt-8
            max-w-3xl
            text-5xl
            font-extrabold
            leading-tight
            text-slate-900
            transition-colors
            duration-300

            dark:text-white

            lg:text-6xl
          "
        >
          {t("heroTitle")}
        </h1>

        <p
          className="
            mt-8
            max-w-xl
            text-lg
            leading-8
            text-slate-600
            transition-colors
            duration-300

            dark:text-slate-300
          "
        >
          {t("heroDescription")}
        </p>

        <div className="mt-10 flex flex-wrap gap-5">
          {/* Conhecer plataforma */}
          <Link
            to={ROUTES.LOGIN}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-yellow-400
              px-8
              py-4
              font-semibold
              text-slate-900
              shadow-sm
              transition-all
              duration-300

              hover:bg-yellow-500
              hover:shadow-lg
            "
          >
            {t("knowPlatform")}

            <ArrowRight size={20} />
          </Link>

          {/* Ver tecnologias */}
          <a
            href="#tecnologias"
            className="
              rounded-xl
              border
              border-slate-300
              px-8
              py-4
              font-semibold
              text-slate-700
              transition-all
              duration-300

              hover:bg-slate-100

              dark:border-slate-600
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            {t("viewTechnologies")}
          </a>
        </div>
      </div>

      {/* Ilustração */}
      <div
        className="
          flex
          w-full
          flex-1
          justify-center
        "
      >
        <div
          className="
            flex
            h-80
            w-80
            items-center
            justify-center
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-xl
            transition-all
            duration-300

            dark:border-slate-700
            dark:bg-slate-900
            dark:shadow-black/30

            lg:h-105
            lg:w-105
          "
        >
          <span
            className="
              text-[120px]
              transition-transform
              duration-500

              lg:text-[150px]
            "
          >
            ⚡
          </span>
        </div>
      </div>
    </section>
  );
}