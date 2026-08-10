import { SunMedium } from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";

export function WelcomeBanner() {
  const { t } = useTranslation();

  return (
    <section
      className="
        mb-8
        rounded-3xl
        bg-linear-to-r
        from-yellow-400
        to-yellow-500
        p-8
        text-slate-900
        shadow-lg
      "
    >
      <div className="flex items-center gap-4">
        <SunMedium size={42} />

        <div>
          <h1 className="text-3xl font-bold">
            {t("welcome")}
          </h1>

          <p className="mt-2 text-lg">
            {t("welcomeSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}