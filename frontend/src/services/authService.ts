import axios from "axios";

import type { User } from "../context/auth/auth.types";
import type { ApiErrorResponse } from "../types/analysis";
import { api } from "./api";

type CsrfTokenResponse = {
  token: string;
  header_name: string;
  parameter_name: string;
};

type LoginRequest = {
  email: string;
  senha: string;
};

type RegisterRequest = LoginRequest & {
  nome: string;
};

async function getCsrfHeaders() {
  const { data } =
    await api.get<CsrfTokenResponse>("/auth/csrf");

  return {
    [data.header_name]: data.token,
  };
}

export async function getCurrentUser() {
  const { data } = await api.get<User>("/auth/me");
  return data;
}

export async function loginUser(request: LoginRequest) {
  const headers = await getCsrfHeaders();

  const { data } = await api.post<User>(
    "/auth/login",
    request,
    { headers },
  );

  return data;
}

export async function registerUser(
  request: RegisterRequest,
) {
  const headers = await getCsrfHeaders();

  const { data } = await api.post<User>(
    "/auth/cadastro",
    request,
    { headers },
  );

  return data;
}

export async function logoutUser() {
  const headers = await getCsrfHeaders();

  await api.post(
    "/auth/logout",
    undefined,
    { headers },
  );
}

export function getAuthErrorMessage(
  error: unknown,
) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.mensagem ??
      "Não foi possível concluir a autenticação."
    );
  }

  return "Ocorreu um erro inesperado. Tente novamente.";
}