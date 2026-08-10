import { useState } from "react";
import {
  Eye,
  EyeOff,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { useAuth } from "../../context/auth/useAuth";

import { ROUTES } from "../../constants/routes";

import {
  createLoginSchema,
  type LoginFormData,
} from "./login.schema";

import { useTranslation } from "@/i18n/useTranslation";

export function LoginForm() {
  

  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const { t } = useTranslation();

  const loginSchema = createLoginSchema(t);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function onSubmit(
    data: LoginFormData
  ) {
    try {
      await login(
        data.email,
        data.password
      );

      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(
        "Erro ao realizar login:",
        error
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      {/* E-mail */}
      <div>
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700

            dark:text-slate-300
          "
        >
          {t("email")}
        </label>

        <input
          type="text"
          inputMode="email"
          placeholder={t("emailPlaceholder")}
          {...register("email")}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            p-3
            text-slate-900
            transition
            placeholder:text-slate-400
            focus:border-yellow-500
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-500/20

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
          "
        />

        {errors.email && (
          <p
            className="
              mt-2
              text-sm
              text-red-500
            "
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Senha */}
      <div>
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700

            dark:text-slate-300
          "
        >
          {t("password")}
        </label>

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder={t("passwordPlaceholder")}
            {...register("password")}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              p-3
              pr-12
              text-slate-900
              transition
              placeholder:text-slate-400
              focus:border-yellow-500
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-500/20

              dark:border-slate-600
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (prev) => !prev
              )
            }
            aria-label={
              showPassword
                ? t("hidePassword")
                : t("showPassword")
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-500
              transition
              hover:text-yellow-500

              dark:text-slate-400
              dark:hover:text-yellow-400
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.password && (
          <p
            className="
              mt-2
              text-sm
              text-red-500
            "
          >
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Entrar */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          rounded-xl
          bg-yellow-500
          py-3
          font-semibold
          text-white
          transition
          hover:bg-yellow-600
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isSubmitting
          ? t("loggingIn")
          : t("login")}
      </button>
    </form>
  );
}