import {
  ArrowRight,
  Bolt,
  BrainCircuit,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";
import { useDashboard } from "../../../context/useDashboard";
import { useAuth } from "../../../context/auth/useAuth";

import { useTranslation } from "../../../i18n/useTranslation";

export function DashboardHero() {
const navigate = useNavigate();

const { t } = useTranslation();

const { user } = useAuth();

const {
  dashboardData,
  history,
} = useDashboard();

const hour = new Date().getHours();

const greeting =
  hour < 12
    ? t("goodMorning")
    : hour < 18
    ? t("goodAfternoon")
    : t("goodEvening");

const ultimaAnalise =
  history.length > 0
    ? history[0].data
    : t("noAnalysis");

const perfil =
  dashboardData?.perfil ?? t("unclassified");

const economia =
  dashboardData?.economia ?? "R$ 0";

const score =
  dashboardData?.precisao ?? "--";
  
  return (
    <section
  className="
    relative
    overflow-hidden
    rounded-3xl
    bg-linear-to-br
    from-slate-900
    via-slate-800
    to-slate-900
    p-8
    text-white
    shadow-2xl
    transition-colors
    duration-300

    dark:from-slate-950
    dark:via-slate-900
    dark:to-black
  "
>
      {/* Fundo decorativo */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-yellow-300/5 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1.6fr_0.9fr]">

        {/* Lado esquerdo */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2">

            <Sparkles size={16} className="text-yellow-400" />

            <span className="text-sm font-medium text-yellow-300">
              {t("intelliwattsAI")}
            </span>

          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">

            {greeting},
            <br />

            <span className="text-yellow-400">
              {user?.nome ?? "Usuário"} ­👋
            </span>

          </h1>

          <p className="
                  mt-6
                  max-w-2xl
                  text-lg
                  leading-8
                  text-slate-300

                  dark:text-slate-400
                  ">

            {t("dashboardHeroDescription")}

          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">

            <button
            className=" group flex items-center gap-3 rounded-2xl
             bg-yellow-400 px-7 py-4 font-semibold
              text-slate-900 transition-all duration-300 hover:scale-[1.02]
               hover:bg-yellow-300 "
            onClick={() => navigate(ROUTES.REPORTS)}
              
            >
              {t("viewReport")}

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </button>

            <div>

              <p className="
                    text-sm
                    text-slate-400

                    dark:text-slate-500
                    ">
                {t("lastAnalysis")}
              </p>

              <p className="font-medium">
                {ultimaAnalise}
              </p>

            </div>

          </div>

        </div>

        {/* Painel direito */}

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-7
            backdrop-blur-xl
            transition-colors
            duration-300

            dark:border-slate-700
            dark:bg-slate-900/40
          "
        >
          <h3 className="text-lg font-semibold">
            {t("executiveSummary")}
          </h3>

          <div className="mt-8 space-y-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-yellow-400/20 p-3">

                  <Bolt
                    className="text-yellow-400"
                    size={22}
                  />

                </div>

                <div>

                  <p
                      className="
                        text-sm
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                    {t("energyHealth")}
                  </p>

                  <p className="font-semibold">
                    {perfil}
                  </p>

                </div>

              </div>

              <span className="text-3xl font-bold text-yellow-400">
                {score}
              </span>

            </div>

            <div
              className="
                h-px
                bg-white/10

                dark:bg-slate-700
              "
            />

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-500/20 p-3">

                  <CircleDollarSign
                    className="text-blue-400"
                    size={22}
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-400">
                    {t("EstimatedSavings")}
                  </p>

                  <p className="font-semibold">
                    {t("monthly")}
                  </p>

                </div>

              </div>

              <span className="text-2xl font-bold">
                {economia}
              </span>

            </div>

            <div
              className="
                h-px
                bg-white/10

                dark:bg-slate-700
              "
            />

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-purple-500/20 p-3">

                  <BrainCircuit
                    className="text-purple-400"
                    size={22}
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-400">
                    {t("AiScore")}
                  </p>

                  <p className="font-semibold">
                    Random Forest
                  </p>

                </div>

              </div>

              <span className="text-2xl font-bold">
                99,4%
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
