import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/auth/useAuth";
import { getAuthErrorMessage } from "../../services/authService";
import {
  createSignupSchema,
  type SignupFormData,
} from "./signup.schema";

import { useTranslation } from "@/i18n/useTranslation";

export function SignupForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const { t } = useTranslation();

  const signupSchema = createSignupSchema(t);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  async function onSubmit(
    data: SignupFormData,
  ) {
    setSubmitError("");

    try {
      await registerUser(
        data.name,
        data.email,
        data.password,
      );

      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setSubmitError(
        getAuthErrorMessage(error),
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      {/* Nome */}
      <div>
        <label
          htmlFor="signup-name"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {t("name")}
        </label>

        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          {...register("name")}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 transition placeholder:text-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />

        {errors.name ? (
          <p className="mt-2 text-sm text-red-500">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      {/* E-mail */}
      <div>
        <label
          htmlFor="signup-email"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {t("email")}
        </label>

        <input
          id="signup-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 transition placeholder:text-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />

        {errors.email ? (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      {/* Senha */}
      <div>
        <label
          htmlFor="signup-password"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {t("password")}
        </label>

        <div className="relative">
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            {...register("password")}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 transition placeholder:text-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 pr-12"
          />

          <button
            type="button"
            aria-label={
              showPassword
                ? t("hidePassword")
                : t("showPassword")
            }
            onClick={() =>
              setShowPassword((current) => !current)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-yellow-500 dark:text-slate-400 dark:hover:text-yellow-400"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.password ? (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      {/* Confirmar senha */}
      <div>
        <label
          htmlFor="signup-password-confirmation"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {t("confirmPassword")}
        </label>

        <input
          id="signup-password-confirmation"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder={t("confirmPasswordPlaceholder")}
          {...register("passwordConfirmation")}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 transition placeholder:text-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />

        {errors.passwordConfirmation ? (
          <p className="mt-2 text-sm text-red-500">
            {errors.passwordConfirmation.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
        >
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? t("creatingAccount")
          : t("createAccount")}
      </button>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        {t("alreadyHaveAccount")}{" "}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-yellow-600 hover:text-yellow-700 dark:text-yellow-400"
        >
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
}
