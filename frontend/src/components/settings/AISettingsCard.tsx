import {
  Brain,
  Activity,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";

export function AISettingsCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Inteligência Artificial
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Brain className="text-yellow-500" />
            <span>Modelo</span>
          </div>

          <span className="font-semibold">
            Random Forest
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Activity className="text-green-500" />
            <span>Precisão</span>
          </div>

          <span className="font-semibold">
            98,5%
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-500" />
            <span>Status da API</span>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Online
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <CalendarClock className="text-yellow-500" />
            <span>Última atualização</span>
          </div>

          <span className="font-semibold">
            Hoje
          </span>

        </div>

      </div>

    </div>
  );
}