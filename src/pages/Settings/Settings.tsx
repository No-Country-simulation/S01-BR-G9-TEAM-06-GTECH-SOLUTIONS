import { Settings as SettingsIcon } from "lucide-react";

import { PreferencesCard } from "../../components/settings/PreferencesCard";
import { AISettingsCard } from "../../components/settings/AISettingsCard";
import { SystemInfoCard } from "../../components/settings/SystemInfoCard";
import { SecurityCard } from "../../components/settings/SecurityCard";

export function Settings() {
  return (
    <div className="space-y-8">

      <div>

        <div className="flex items-center gap-3">

          <SettingsIcon
            size={34}
            className="text-yellow-500"
          />

          <h1 className="text-4xl font-bold text-slate-800">
            Configurações
          </h1>

        </div>

        <p className="mt-3 text-slate-500">
          Personalize o IntelliWatts e visualize informações do sistema.
        </p>

      </div>

      <section className="grid gap-8 lg:grid-cols-2">

        <PreferencesCard />

        <AISettingsCard />

      </section>

      <SystemInfoCard />

      <SecurityCard />

    </div>
  );
}