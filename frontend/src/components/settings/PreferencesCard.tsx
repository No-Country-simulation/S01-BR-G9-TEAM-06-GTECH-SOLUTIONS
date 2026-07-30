import { Moon, Bell, Sparkles, RefreshCcw } from "lucide-react";

export function PreferencesCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Preferências
      </h2>

      <div className="space-y-5">

        <label className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Moon className="text-yellow-500" />

            <span>Tema escuro</span>

          </div>

          <input type="checkbox" />

        </label>

        <label className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Bell className="text-yellow-500" />

            <span>Notificações</span>

          </div>

          <input type="checkbox" defaultChecked />

        </label>

        <label className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Sparkles className="text-yellow-500" />

            <span>Mostrar animações</span>

          </div>

          <input type="checkbox" defaultChecked />

        </label>

        <label className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCcw className="text-yellow-500" />

            <span>Atualização automática</span>

          </div>

          <input type="checkbox" defaultChecked />

        </label>

      </div>

    </div>
  );
}