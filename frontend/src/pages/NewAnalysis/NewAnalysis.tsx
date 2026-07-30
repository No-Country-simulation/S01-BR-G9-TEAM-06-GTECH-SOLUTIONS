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
import type {
  AnaliseEnergeticaRequest,
  TipoImovel,
} from "../../types/analysis";

export function NewAnalysis() {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const [consumo, setConsumo] = useState("");
  const [equipamentos, setEquipamentos] = useState("");
  const [tipoImovel, setTipoImovel] = useState<TipoImovel>("Casa");
  const [horasAltoConsumo, setHorasAltoConsumo] = useState("");
  const [usoHorarioPico, setUsoHorarioPico] = useState(false);

  const [error, setError] = useState("");

  const { setDashboardData, setHistory } = useDashboard();

  async function handleAnalysis() {
    setError("");
    setFinished(false);

    if (
      consumo.trim() === "" ||
      equipamentos.trim() === "" ||
      horasAltoConsumo.trim() === ""
    ) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    const consumoNumber = Number(consumo);
    const equipamentosNumber = Number(equipamentos);
    const horasNumber = Number(horasAltoConsumo);

    if (
      !Number.isFinite(consumoNumber) ||
      consumoNumber <= 0 ||
      consumoNumber > 700
    ) {
      setError("O consumo deve ser maior que zero e no máximo 700 kWh.");
      return;
    }

    if (
      !Number.isInteger(equipamentosNumber) ||
      equipamentosNumber < 1 ||
      equipamentosNumber > 17
    ) {
      setError("A quantidade de equipamentos deve estar entre 1 e 17.");
      return;
    }

    if (!Number.isInteger(horasNumber) || horasNumber < 1 || horasNumber > 24) {
      setError("As horas de alto consumo devem estar entre 1 e 24.");
      return;
    }

    const request: AnaliseEnergeticaRequest = {
      consumo_kwh: consumoNumber,
      uso_horario_pico: usoHorarioPico,
      quantidade_equipamentos: equipamentosNumber,
      tipo_imovel: tipoImovel,
      horas_alto_consumo: horasNumber,
    };

    setLoading(true);

    try {
      const response = await analyzeConsumption(request);

      const dashboardData = mapAnalysisToDashboard(request, response);

      setDashboardData(dashboardData);

      setHistory((currentHistory) => [
        {
          id: crypto.randomUUID(),
          data: new Date().toLocaleDateString("pt-BR"),
          categoria: dashboardData.perfil,
          consumo: dashboardData.consumoAtual,
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
        <h1 className="text-4xl font-bold text-slate-800">
          Nova Análise Energética
        </h1>

        <p className="mt-3 text-slate-500">
          Informe os dados do imóvel para que a Inteligência Artificial
          identifique o perfil de consumo energético.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <Zap className="text-yellow-500" size={34} />

          <h2 className="text-2xl font-semibold">Dados da Análise</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Consumo (kWh)</label>

            <input
              type="number"
              min={1}
              placeholder="Ex.: 420"
              value={consumo}
              onChange={(e) => setConsumo(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Quantidade de Equipamentos
            </label>

            <input
              type="number"
              placeholder="Ex.: 10"
              value={equipamentos}
              onChange={(e) => setEquipamentos(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Tipo do Imóvel</label>

            <select
              value={tipoImovel}
              onChange={(e) => setTipoImovel(e.target.value as TipoImovel)}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Comércio">Comércio</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Horas de Alto Consumo
            </label>

            <input
              type="number"
              min={1}
              max={24}
              placeholder="Ex.: 8"
              value={horasAltoConsumo}
              onChange={(e) => setHorasAltoConsumo(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-yellow-500"
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

          <label htmlFor="pico">Utiliza equipamentos em horário de pico</label>
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
          {loading ? "Analisando..." : "Analisar Consumo"}
        </button>

        {error ? (
          <div
            role="alert"
            className="
      mt-6
      rounded-2xl
      border
      border-red-200
      bg-red-50
      p-4
      text-red-700
      shadow-sm
    "
          >
            <span className="font-semibold">Atenção</span>

            <p className="mt-1">{error}</p>
          </div>
        ) : null}

        {loading ? <LoadingAnalysis /> : null}

        {finished ? <AnalysisResult /> : null}
      </div>
    </div>
  );
}
