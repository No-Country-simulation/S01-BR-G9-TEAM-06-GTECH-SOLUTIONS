import { SignupForm } from "../../components/signup/SignupForm";
import { LoginPresentation } from "../../components/login/LoginPresentation";
import { AuthControls } from "@/components/layout/AuthControls";
import { useTranslation } from "@/i18n/useTranslation";

export function Signup() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      <AuthControls />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl transition-colors duration-300 dark:bg-slate-900 lg:grid-cols-2">
          <LoginPresentation />

          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
                  {t("createAccount")}
                </h1>

                <p className="mt-3 text-slate-500 dark:text-slate-400">
                  {t("signupDescription")}
                </p>
              </div>

              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}