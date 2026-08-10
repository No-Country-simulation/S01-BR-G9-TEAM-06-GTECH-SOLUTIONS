import { BrainCircuit, Database, Sparkles } from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";

type TranslationKey =
  | "howItWorksStep1Title"
  | "howItWorksStep1Description"
  | "howItWorksStep2Title"
  | "howItWorksStep2Description"
  | "howItWorksStep3Title"
  | "howItWorksStep3Description";

type HowItWorksStep = {
  icon: typeof Database;
  title: TranslationKey;
  description: TranslationKey;
};

export function HowItWorks() {
  const { t } = useTranslation();

  const steps: HowItWorksStep[] = [
    {
      icon: Database,
      title: "howItWorksStep1Title",
      description: "howItWorksStep1Description",
    },
    {
      icon: BrainCircuit,
      title: "howItWorksStep2Title",
      description: "howItWorksStep2Description",
    },
    {
      icon: Sparkles,
      title: "howItWorksStep3Title",
      description: "howItWorksStep3Description",
    },
  ];

  return (
    <section
      id="funcionalidades"
      className="
        scroll-mt-24
        bg-white
        py-24
        transition-colors
        duration-300

        dark:bg-slate-950
      "
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center">
          <span
            className="
              rounded-full
              bg-yellow-100
              px-4
              py-2
              text-sm
              font-semibold
              text-yellow-700

              dark:bg-yellow-500/10
              dark:text-yellow-400
            "
          >
            {t("howItWorksBadge")}
          </span>
        </div>

        {/* Título */}
        <div className="mx-auto mt-6 max-w-3xl text-center">
          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-4xl

              dark:text-white
            "
          >
            {t("howItWorksTitle")}
          </h2>

          <p
            className="
              mt-5
              text-lg
              leading-8
              text-slate-600

              dark:text-slate-300
            "
          >
            {t("howItWorksSubtitle")}
          </p>
        </div>

        {/* Etapas */}
        <div
          className="
            mx-auto
            mt-16
            grid
            max-w-6xl
            gap-8
            md:grid-cols-3
          "
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="
                  relative
                  rounded-3xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg

                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                {/* Número */}
                <div
                  className="
                    absolute
                    right-6
                    top-6
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-100
                    text-sm
                    font-bold
                    text-yellow-700

                    dark:bg-yellow-500/10
                    dark:text-yellow-400
                  "
                >
                  {index + 1}
                </div>

                {/* Ícone */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-yellow-100

                    dark:bg-yellow-500/10
                  "
                >
                  <Icon
                    size={28}
                    className="
                      text-yellow-600
                      dark:text-yellow-400
                    "
                  />
                </div>

                {/* Título */}
                <h3
                  className="
                    mt-6
                    text-xl
                    font-bold
                    text-slate-900
                    transition-colors
                    duration-300

                    dark:text-white
                  "
                >
                  {t(step.title)}
                </h3>

                {/* Descrição */}
                <p
                  className="
                    mt-4
                    leading-7
                    text-slate-600
                    transition-colors
                    duration-300

                    dark:text-slate-300
                  "
                >
                  {t(step.description)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}