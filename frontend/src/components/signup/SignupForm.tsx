import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/auth/useAuth";
import { getAuthErrorMessage } from "../../services/authService";
import {
  signupSchema,
  type SignupFormData,
} from "./signup.schema";

export function SignupForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

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
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="signup-name"
          className="mb-2 block text-sm font-medium"
        >
          Nome
        </label>

        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className="w-full rounded-xl border border-slate-300 p-3 focus:border-yellow-500 focus:outline-none"
        />

        {errors.name ? (
          <p className="mt-2 text-sm text-red-500">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="signup-email"
          className="mb-2 block text-sm font-medium"
        >
          E-mail
        </label>

        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 p-3 focus:border-yellow-500 focus:outline-none"
        />

        {errors.email ? (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="signup-password"
          className="mb-2 block text-sm font-medium"
        >
          Senha
        </label>

        <div className="relative">
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("password")}
            className="w-full rounded-xl border border-slate-300 p-3 pr-12 focus:border-yellow-500 focus:outline-none"
          />

          <button
            type="button"
            aria-label={
              showPassword
                ? "Ocultar senha"
                : "Mostrar senha"
            }
            onClick={() =>
              setShowPassword((current) => !current)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
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

      <div>
        <label
          htmlFor="signup-password-confirmation"
          className="mb-2 block text-sm font-medium"
        >
          Confirmar senha
        </label>

        <input
          id="signup-password-confirmation"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          {...register("passwordConfirmation")}
          className="w-full rounded-xl border border-slate-300 p-3 focus:border-yellow-500 focus:outline-none"
        />

        {errors.passwordConfirmation ? (
          <p className="mt-2 text-sm text-red-500">
            {errors.passwordConfirmation.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {submitError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Criando conta..."
          : "Criar conta"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Já possui uma conta?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-yellow-600 hover:text-yellow-700"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}