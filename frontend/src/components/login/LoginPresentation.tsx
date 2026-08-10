import {
  Brain,
  Leaf,
  BarChart3,
} from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";

const benefits = [
  {
    icon: Brain,
    titleKey: "loginAiTitle",
    descriptionKey: "loginAiDescription",
  },
  {
    icon: Leaf,
    titleKey: "loginSustainabilityTitle",
    descriptionKey: "loginSustainabilityDescription",
  },
  {
    icon: BarChart3,
    titleKey: "loginAnalyticsTitle",
    descriptionKey: "loginAnalyticsDescription",
  },
] as const ;

export function LoginPresentation() {
  const { t } = useTranslation();

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-slate-900
        p-8
        text-white
        transition-colors
        duration-300

        dark:bg-slate-950

        lg:p-12
      "
    >
      {/* Elementos decorativos */}
      <div
        className="
          absolute
          -right-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-yellow-400/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -left-32
          h-96
          w-96
          rounded-full
          bg-yellow-500/10
          blur-3xl
        "
      />

      <div className="relative z-10 flex min-h-162.5 flex-col justify-between">
        {/* Introdução */}
        <div className="mb-12">
          <h1
            className="
              text-5xl
              font-extrabold
              tracking-tight
            "
          >
            IntelliWatts
          </h1>

          <p
            className="
              mt-6
              text-3xl
              font-bold
              leading-tight
            "
          >
            {t("loginHeroTitle")}
          </p>

          <p
            className="
              mt-8
              max-w-xl
              text-lg
              leading-8
              text-white/90
            "
          >
            {t("loginHeroDescription")}
          </p>
        </div>

        {/* Benefícios */}
        <div className="space-y-6">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.titleKey}
                className="
                  flex
                  items-start
                  gap-5
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/10
                  p-5
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/15
                "
              >
                <div
                  className="
                    rounded-xl
                    bg-white/15
                    p-3
                  "
                >
                  <Icon
                    size={26}
                    className="text-yellow-300"
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-xl
                      font-semibold
                    "
                    >
                    {t(item.titleKey)}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-base
                      leading-7
                      text-white/85
                    "
                    >
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé */}
        <div
          className="
            mt-12
            border-t
            border-white/20
            pt-6
            text-sm
            text-white/70
          "
        >
          {t("loginFooter")}
        </div>
      </div>
    </div>
  );
}