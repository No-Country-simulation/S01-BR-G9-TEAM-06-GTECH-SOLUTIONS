import axios from "axios";

import type {
  AnaliseEnergeticaRequest,
  AnaliseEnergeticaResponse,
  ApiErrorResponse,
} from "../types/analysis";
import { api } from "./api";

export async function analyzeConsumption(
  data: AnaliseEnergeticaRequest,
): Promise<AnaliseEnergeticaResponse> {
  const response =
    await api.post<AnaliseEnergeticaResponse>(
      "/analise-energetica",
      data,
    );

  return response.data;
}

export function getAnalysisErrorMessage(
  error: unknown,
): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.code === "ECONNABORTED") {
      return "A análise demorou mais que o esperado. Tente novamente.";
    }

    return (
      error.response?.data?.mensagem ??
      "Não foi possível acessar a API do IntelliWatts."
    );
  }

  return "Ocorreu um erro inesperado durante a análise.";
}