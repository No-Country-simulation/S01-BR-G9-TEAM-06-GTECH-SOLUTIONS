import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../context/auth/useAuth";

import { ROUTES } from "../../constants/routes";

import {
  loginSchema,
  type LoginFormData,
} from "./login.schema";


export function LoginForm() {

  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      className="space-y-5"
    >

      <div>

        <input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            p-3
            focus:border-yellow-500
            focus:outline-none
          "
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}

      </div>


      <div className="relative">

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Senha"
          {...register("password")}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            p-3
            pr-12
            focus:border-yellow-500
            focus:outline-none
          "
        />


        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-500
            hover:text-yellow-500
          "
        >

          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}

        </button>


        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

      </div>


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
          ? "Entrando..."
          : "Entrar"
        }

      </button>

    </form>
  );
}