import { useState } from "react";
import { Zap } from "lucide-react";

import { LoadingAnalysis } from "../../components/analysis/LoadingAnalysis";
import { AnalysisResult } from "../../components/analysis/AnalysisResult";
import { useDashboard } from "../../context/DashboardContext";
import { simulateAnalysis } from "../../services/analysisSimulator";


export function NewAnalysis() {
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const [consumo, setConsumo] = useState("");
    const [equipamentos, setEquipamentos] = useState("");
    const [tipoImovel, setTipoImovel] = useState<
    "Casa" | "Apartamento" | "Comercial" >("Casa");
    const [horasAltoConsumo, setHorasAltoConsumo] = useState("");
    const [usoHorarioPico, setUsoHorarioPico] = useState(false);

    const { setDashboardData } = useDashboard();

    function handleAnalysis() {
  setFinished(false);
  setLoading(true);

  setTimeout(() => {
    const resultado = simulateAnalysis({
      consumo_kwh: Number(consumo),
      quantidade_equipamentos: Number(equipamentos),
      tipo_imovel: tipoImovel as "Casa" | "Apartamento" | "Comercial",
      horas_alto_consumo: Number(horasAltoConsumo),
      uso_horario_pico: usoHorarioPico,
    });

    setDashboardData(resultado);

    setLoading(false);
    setFinished(true);
  }, 2000);
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

          <h2 className="text-2xl font-semibold">
            Dados da Análise
          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Consumo (kWh)
            </label>

            <input
              type="number"
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
            <label className="mb-2 block font-medium">
              Tipo do Imóvel
            </label>

            <select
            value={tipoImovel}
            onChange={(e) =>
              setTipoImovel(
                e.target.value as "Casa" | "Apartamento" | "Comercial"
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          >
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Comercial">Comercial</option>
          </select>

          </div>

          <div>
            <label className="mb-2 block font-medium">
              Horas de Alto Consumo
            </label>

            <input
              type="number"
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

          <label htmlFor="pico">
            Utiliza equipamentos em horário de pico
          </label>

        </div>

        <button
            onClick={handleAnalysis}
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
          "
        >
          Analisar Consumo
        </button>

        {loading && <LoadingAnalysis />}

        {finished && <AnalysisResult />}

      </div>

    </div>
  );
}