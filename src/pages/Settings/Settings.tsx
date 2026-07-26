import {
  Moon,
  Bell,
  User,
  Info,
  ChevronRight,
} from "lucide-react";

export function Settings() {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Configurações
        </h1>

        <p className="mt-3 text-slate-500">
          Personalize sua experiência no IntelliWatts.
        </p>

      </div>

      <div className="grid gap-6">

        {/* Aparência */}

        <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <Moon
              size={28}
              className="text-yellow-500"
            />

            <div>

              <h2 className="font-semibold text-lg">
                Aparência
              </h2>

              <p className="text-sm text-slate-500">
                Altere entre modo claro e escuro.
              </p>

            </div>

          </div>

          <ChevronRight />

        </div>

        {/* Notificações */}

        <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <Bell
              size={28}
              className="text-yellow-500"
            />

            <div>

              <h2 className="font-semibold text-lg">
                Notificações
              </h2>

              <p className="text-sm text-slate-500">
                Gerencie os alertas do sistema.
              </p>

            </div>

          </div>

          <ChevronRight />

        </div>

        {/* Perfil */}

        <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <User
              size={28}
              className="text-yellow-500"
            />

            <div>

              <h2 className="font-semibold text-lg">
                Perfil
              </h2>

              <p className="text-sm text-slate-500">
                Atualize suas informações.
              </p>

            </div>

          </div>

          <ChevronRight />

        </div>

        {/* Sobre */}

        <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <Info
              size={28}
              className="text-yellow-500"
            />

            <div>

              <h2 className="font-semibold text-lg">
                Sobre
              </h2>

              <p className="text-sm text-slate-500">
                IntelliWatts • versão 1.0
              </p>

            </div>

          </div>

          <ChevronRight />

        </div>

      </div>

    </div>
  );
}