import { BrainCircuit } from "lucide-react";

type AIHeaderProps = {
  model: string;
  confidence: string;
};

export function AIHeader({
  model,
  confidence,
}: AIHeaderProps) {
  return (
    <div className="flex items-center justify-between">

      {/* Esquerda */}

      <div className="flex items-center gap-4">

        <div
          className="
            rounded-2xl
            bg-yellow-100
            p-4
            transition-colors
            duration-300

            dark:bg-yellow-500/20
          "
        >

          <BrainCircuit
            className="text-yellow-600 dark:text-yellow-400"
            size={28}
          />

        </div>

        <div>

          <h2
            className="
              text-xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            IntelliWatts AI
          </h2>

          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Assistente Inteligente de Consumo
          </p>

        </div>

      </div>

      {/* Direita */}

      <div className="text-right">

        <span
          className="
            text-xs
            uppercase
            tracking-wide
            text-slate-400

            dark:text-slate-500
          "
        >
          Modelo
        </span>

        <p
          className="
            font-semibold
            text-slate-800

            dark:text-slate-200
          "
        >
          {model}
        </p>

        <span
          className="
            mt-2
            block
            text-xs
            uppercase
            tracking-wide
            text-slate-400

            dark:text-slate-500
          "
        >
          Confiança
        </span>

        <p className="font-semibold text-green-600 dark:text-green-400">
          {confidence}
        </p>

      </div>

    </div>
  );
}
