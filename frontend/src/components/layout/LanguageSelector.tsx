import { Languages } from "lucide-react";

import { useSettings } from "@/context/settings/useSettings";

export function LanguageSelector() {
  const {
    settings,
    updateLanguage,
  } = useSettings();

  return (
    <div className="flex items-center gap-3">

      <Languages
        size={18}
        className="text-yellow-500"
      />

      <select
        value={settings.language}
        onChange={(e) =>
          updateLanguage(
            e.target.value as
              | "pt"
              | "en"
              | "es"
          )
        }
        className="
          rounded-lg
          border
          border-slate-300
          bg-white
          px-3
          py-2
          text-sm
          transition

          dark:border-slate-600
          dark:bg-slate-800
          dark:text-white
        "
      >
        <option value="pt">
          🇧🇷 Português
        </option>

        <option value="en">
          🇺🇸 English
        </option>

        <option value="es">
          🇪🇸 Español
        </option>

      </select>

    </div>
  );
}
