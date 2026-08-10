import { Moon, Sun } from "lucide-react";

import { LoginForm } from "../../components/login/LoginForm";
import { LoginPresentation } from "../../components/login/LoginPresentation";

import { useTheme } from "@/context/theme/useTheme";
import { LanguageSelector } from "@/components/layout/LanguageSelector";

import { useTranslation } from "@/i18n/useTranslation";

export function Login() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        transition-colors
        duration-300

        dark:bg-slate-950
      "
    >
      {/* Controles */}
      <div
        className="
          fixed
          right-6
          top-6
          z-50
          flex
          items-center
          gap-3
        "
      >
        <LanguageSelector />

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
            border
            border-slate-200
            bg-white/90
            p-2
            shadow-sm
            backdrop-blur-md
            transition-all
            duration-300
            hover:bg-slate-100

            dark:border-slate-700
            dark:bg-slate-900/90
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
      </div>

      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          justify-center
          px-6
          py-10
        "
      >
        <div
          className="
            grid
            w-full
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-2xl
            transition-colors
            duration-300

            dark:bg-slate-900

            lg:grid-cols-2
          "
        >
          {/* Apresentação */}
          <LoginPresentation />

          {/* Formulário */}
          <div
            className="
              flex
              items-center
              justify-center
              p-8
              lg:p-12
            "
          >
            <div className="w-full max-w-md">
              <div className="mb-10 text-center">
                <h2
                  className="
                    text-4xl
                    font-bold
                    text-slate-800

                    dark:text-white
                  "
                >
                  {t("Welcome")}
                </h2>

                <p
                  className="
                    mt-3
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  {t("loginDescription")}
                </p>
              </div>

              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}