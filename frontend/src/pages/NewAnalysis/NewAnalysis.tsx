import { useState } from "react";
import { Zap } from "lucide-react";

import { LoadingAnalysis } from "../../components/analysis/LoadingAnalysis";
import { AnalysisResult } from "../../components/analysis/AnalysisResult";
import { useDashboard } from "../../context";
import { mapAnalysisToDashboard } from "../../services/analysisMapper";
import {
  analyzeConsumption,
  getAnalysisErrorMessage,
} from "../../services/analysisService";
import type { TipoImovel } from "../../types/analysis";

import { useTranslation } from "@/i18n/useTranslation";


export function NewAnalysis() {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const [consumo, setConsumo] = useState("");
    const [equipamentos, setEquipamentos] = useState("");
    const [tipoImovel, setTipoImovel] = useState<TipoImovel>("Casa");
    const [horasAltoConsumo, setHorasAltoConsumo] = useState("");
    const [usoHorarioPico, setUsoHorarioPico] = useState(false);

    const [error, setError] = useState("");

    const {
      setDashboardData,
      setHistory,
    } = useDashboard();

    async function handleAnalysis() {
      setError("");
      setFinished(false);

      if (
        consumo.trim() === "" ||
        equipamentos.trim() === "" ||
        horasAltoConsumo.trim() === ""
      ) {
        setError(t("requiredFields"));
        return;
      }

      const consumoNumber = Number(consumo);
      const equipamentosNumber = Number(equipamentos);
      const horasNumber = Number(horasAltoConsumo);

      if (!Number.isFinite(consumoNumber) || consumoNumber <= 0 || consumoNumber > 700) {
        setError(t("invalidConsumption"));
        return;
      }

      if (!Number.isInteger(equipamentosNumber) || equipamentosNumber < 1 || equipamentosNumber > 17) {
        setError(t("invalidEquipment"));
        return;
      }

      if (!Number.isInteger(horasNumber) || horasNumber < 1 || horasNumber > 24) {
        setError(t("invalidHours"));
        return;
      }

      setLoading(true);

      try {
        const request = {
          consumo_kwh: consumoNumber,
          quantidade_equipamentos: equipamentosNumber,
          tipo_imovel: tipoImovel,
          horas_alto_consumo: horasNumber,
          uso_horario_pico: usoHorarioPico,
        };
        const response = await analyzeConsumption(request);
        const result = mapAnalysisToDashboard(request, response);

        setDashboardData(result);
        setHistory((currentHistory) => [
          {
            id: crypto.randomUUID(),
            data: new Date().toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
            createdAt: new Date().toISOString(),
            perfil: result.perfil,
            consumo: result.consumoAtual,
            custoEstimadoMensal: result.custoEstimadoMensal,
            precisao: result.precisao,
            observacao: result.mensagem,
          },
          ...currentHistory,
        ]);
        setFinished(true);
      } catch (requestError) {
        setError(getAnalysisErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          {t("NewAnalysis")}
        </h1>
    

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          {t("newAnalysisDescription")}
        </p>

      </div>

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm

          dark:bg-slate-900
          dark:border-slate-700
        "
      >

        <div className="mb-8 flex items-center gap-3">

          <Zap className="text-yellow-500" size={34} />

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {t("analysisData")}
          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              {t("consumptionLabel")}
            </label>

            <input
              type="number"
              min={1}
              placeholder="Ex.: 420"
              value={consumo}
              onChange={(e) => setConsumo(e.target.value)}
              className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  p-3
                  text-slate-900
                  outline-none
                  focus:border-yellow-500

                  dark:border-slate-600
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-slate-500
                  "
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              {t("equipmentLabel")}
            </label>

            <input
              type="number"
              placeholder="Ex.: 10"
              value={equipamentos}
              onChange={(e) => setEquipamentos(e.target.value)}
              className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    p-3
                    text-slate-900

                    dark:border-slate-600
                    dark:bg-slate-800
                    dark:text-white
                    "
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              {t("propertyType")}
            </label>

            <select
            value={tipoImovel}
            onChange={(e) =>
              setTipoImovel(
                e.target.value as TipoImovel
              )
            }
            className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  p-3
                  text-slate-900
                  transition

                  dark:border-slate-600
                  dark:bg-slate-800
                  dark:text-white
                  "
          >
            <option value="Casa" className="bg-white text-slate-900">
              {t("house")}
            </option>

            <option value="Apartamento" className="bg-white text-slate-900">
              {t("apartment")}
            </option>

            <option value="Comércio" className="bg-white text-slate-900">
              {t("commercial")}
            </option>
          </select>

          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              {t("peakHours")}
            </label>

            <input
              type="number"
              min={1}
              max={24}
              placeholder="Ex.: 8"
              value={horasAltoConsumo}
              onChange={(e) => setHorasAltoConsumo(e.target.value)}
              className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    p-3
                    text-slate-900
                    outline-none
                    transition
                    focus:border-yellow-500

                    dark:border-slate-600
                    dark:bg-slate-800
                    dark:text-white
                    dark:placeholder:text-slate-500
                    "
            />
          </div>

        </div>

        <div className="mt-8 flex items-center gap-3">

          <input
            type="checkbox"
            id="pico"
            checked={usoHorarioPico}
            onChange={(e) => setUsoHorarioPico(e.target.checked)}
          />

          <label 
          htmlFor="pico"
          className="text-slate-700 dark:text-slate-300"
          >
            {t("peakUsage")}
          </label>

        </div>

        <button
          type="button"
          onClick={handleAnalysis}
          disabled={loading}
          className="
            mt-10
            rounded-xl
            bg-yellow-500
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-yellow-600
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {t("analyzeConsumption")}
        </button>

        {error ? (
          <div
            role="alert"
            className="
              mt-8
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              text-red-700
              shadow-sm

              dark:border-red-900
              dark:bg-red-950/40
              dark:text-red-300
            "
          >
            <span className="font-semibold">{t("warning")}</span>
            <p className="mt-1">{error}</p>
          </div>
        ) : null}
        {loading && <LoadingAnalysis />}

        {finished && <AnalysisResult />}

      </div>

    </div>
  );
}