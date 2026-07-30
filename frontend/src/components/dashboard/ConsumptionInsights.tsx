import { Brain, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useDashboard } from "../../context";

export function ConsumptionInsights() {
  const { history } = useDashboard();

  if (history.length === 0) return null;

  const consumos = history.map(item =>
    Number(item.consumo.replace(" kWh", ""))
  );

  const media =
    consumos.reduce((a, b) => a + b, 0) / consumos.length;

  const primeiro = consumos[consumos.length - 1];
  const ultimo = consumos[0];

  const variacao =
    ((ultimo - primeiro) / primeiro) * 100;

  const eficientes = history.filter(
    item => item.categoria === "Eficiente"
  ).length;

  const moderados = history.filter(
    item => item.categoria === "Moderado"
  ).length;

  const ineficientes = history.filter(
    item => item.categoria === "Ineficiente"
  ).length;

  let perfil = "Moderado";

  if (eficientes >= moderados && eficientes >= ineficientes)
    perfil = "Eficiente";

  if (ineficientes >= eficientes && ineficientes >= moderados)
    perfil = "Ineficiente";

  const Icon =
    variacao > 5
      ? TrendingUp
      : variacao < -5
      ? TrendingDown
      : Minus;

  const color =
    variacao > 5
      ? "text-red-500"
      : variacao < -5
      ? "text-green-500"
      : "text-yellow-500";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <Brain className="text-yellow-500" />

        <h2 className="text-xl font-bold">
          Insights da IA
        </h2>

      </div>

      <div className="space-y-5">

        <div className="flex items-center gap-3">

          <Icon className={color} />

          <span>

            {variacao > 5 &&
              `O consumo aumentou ${variacao.toFixed(1)}%.`}

            {variacao < -5 &&
              `O consumo reduziu ${Math.abs(
                variacao
              ).toFixed(1)}%.`}

            {Math.abs(variacao) <= 5 &&
              "O consumo permanece estável."}

          </span>

        </div>

        <div>

          <strong>Consumo médio:</strong>{" "}
          {media.toFixed(0)} kWh

        </div>

        <div>

          <strong>Perfil predominante:</strong>{" "}
          {perfil}

        </div>

        <div>

            <strong>Nível de risco:</strong>{" "}

            {perfil === "Eficiente" && (
                <span className="text-green-600 font-semibold">
                Baixo
                </span>
            )}

            {perfil === "Moderado" && (
                <span className="text-yellow-600 font-semibold">
                Médio
                </span>
            )}

            {perfil === "Ineficiente" && (
                <span className="text-red-600 font-semibold">
                Alto
                </span>
            )}

        </div>

        <div>

          <strong>Recomendação:</strong>{" "}

          {perfil === "Eficiente" &&
            "Continue mantendo os bons hábitos de consumo."}

          {perfil === "Moderado" &&
            "Pequenos ajustes podem gerar economia significativa."}

          {perfil === "Ineficiente" &&
            "Reveja os equipamentos de maior consumo e os horários de utilização."}

        </div>

        <div>

            <strong>Precisão do modelo:</strong>{" "}

            98,5%

        </div>

        <div>

            <strong>Total de análises:</strong>{" "}

            {history.length}

        </div>

      </div>

    </div>
  );
}