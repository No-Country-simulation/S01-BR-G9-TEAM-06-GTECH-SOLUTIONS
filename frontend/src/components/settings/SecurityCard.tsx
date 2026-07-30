import {
  Shield,
  Trash2,
  RotateCcw,
  Download,
} from "lucide-react";

export function SecurityCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <Shield className="text-yellow-500" />

        <h2 className="text-xl font-bold">
          Segurança
        </h2>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-red-50 p-4 font-semibold text-red-600 transition hover:bg-red-100">

          <Trash2 size={18} />

          Limpar Histórico

        </button>

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-yellow-50 p-4 font-semibold text-yellow-700 transition hover:bg-yellow-100">

          <RotateCcw size={18} />

          Restaurar Configurações

        </button>

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-blue-50 p-4 font-semibold text-blue-700 transition hover:bg-blue-100">

          <Download size={18} />

          Exportar Configurações

        </button>

      </div>

    </div>
  );
}