import { useTranslation } from "@/i18n/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="
        border-t
        border-slate-200
        bg-white
        py-10
        text-center
        text-sm
        text-slate-500
        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-slate-950
        dark:text-slate-400
      "
    >
      <p>
        © 2026 IntelliWatts • {t("footerDescription")}
      </p>
    </footer>
  );
}