import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/theme/useTheme";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { useTranslation } from "@/i18n/useTranslation";

import { ROUTES } from "@/constants/routes";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200
        bg-white/95
        backdrop-blur-md
        transition-colors
        duration-300

        dark:border-slate-700
        dark:bg-slate-900/95
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-yellow-400
              text-xl
              shadow-sm
            "
          >
            ⚡
          </div>

          <div>
            <h1
              className="
                text-lg
                font-bold
                text-slate-900

                dark:text-white
              "
            >
              IntelliWatts
            </h1>

            <p
              className="
                text-xs
                text-slate-500

                dark:text-slate-400
              "
            >
              {t("landingSubtitle")}
            </p>
          </div>
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-6">
          <a
            href="#tecnologias"
            className="
              text-slate-600
              transition
              hover:text-yellow-500

              dark:text-slate-300
              dark:hover:text-yellow-400
            "
          >
            {t("technologies")}
          </a>

          <a
            href="#funcionalidades"
            className="
              text-sm
              font-medium
              text-slate-600
              transition-colors
              hover:text-yellow-500
              dark:text-slate-300
              dark:hover:text-yellow-400
            "
          >
            {t("features")}
          </a>

          {/* Idioma */}
          <LanguageSelector />

          {/* Tema */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? t("lightTheme")
                : t("darkTheme")
            }
            className="
              rounded-xl
              p-2
              transition-all
              duration-300

              hover:bg-slate-100

              dark:hover:bg-slate-800
            "
          >
            {isDark ? (
              <Sun
                size={20}
                className="
                  text-yellow-400
                  transition-transform
                  duration-300
                  hover:rotate-180
                "
              />
            ) : (
              <Moon
                size={20}
                className="
                  text-slate-700
                  transition-transform
                  duration-300
                  hover:-rotate-12

                  dark:text-slate-300
                "
              />
            )}
          </button>

          {/* Dashboard */}
          <Link
            to={ROUTES.DASHBOARD}
            className="
              rounded-xl
              bg-yellow-400
              px-5
              py-3
              font-semibold
              text-slate-900
              transition
              hover:bg-yellow-500
            "
          >
            {t("dashboard")}
          </Link>
        </nav>
      </div>
    </header>
  );
}