import {
  Shield,
  Trash2,
  RotateCcw,
  Download,
} from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";
import { useDashboard } from "@/context/useDashboard";

export function SecurityCard() {
  const { t } = useTranslation();

  const {
    history,
    setHistory,
  } = useDashboard();

  /*
   * Limpa todo o histórico de análises.
   *
   * O DashboardProvider já possui um useEffect
   * que salva o histórico no localStorage.
   *
   * Portanto, ao colocar [] no estado, o localStorage
   * também será atualizado automaticamente.
   */
  function handleClearHistory() {
    if (history.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      t("confirmClearHistory")
    );

    if (!confirmed) {
      return;
    }

    setHistory([]);
  }

  /*
   * Restaura as configurações padrão.
   *
   * As configurações são armazenadas em:
   * "intelliwatts-settings"
   *
   * Removemos essa configuração e recarregamos a aplicação.
   * O SettingsProvider então volta automaticamente para
   * seus valores iniciais.
   */
  function handleRestoreSettings() {
    const confirmed = window.confirm(
      t("confirmRestoreSettings")
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("intelliwatts-settings");

    window.location.reload();
  }

  /*
   * Exporta as configurações atuais em JSON.
   */
  function handleExportSettings() {
    const settings = localStorage.getItem(
      "intelliwatts-settings"
    );

    if (!settings) {
      return;
    }

    const blob = new Blob(
      [settings],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "intelliwatts-settings.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-colors
        duration-300

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* Cabeçalho */}

      <div className="mb-6 flex items-center gap-3">
        <div
          className="
            rounded-xl
            bg-slate-100
            p-3

            dark:bg-slate-800
          "
        >
          <Shield
            size={22}
            className="
              text-slate-700

              dark:text-slate-300
            "
          />
        </div>

        <h2
          className="
            text-xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          {t("security")}
        </h2>
      </div>

      {/* Ações */}

      <div className="grid gap-4 md:grid-cols-3">

        {/* Limpar histórico */}

        <button
          type="button"
          onClick={handleClearHistory}
          disabled={history.length === 0}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-red-50
            p-4
            font-semibold
            text-red-600
            transition

            hover:bg-red-100

            disabled:cursor-not-allowed
            disabled:opacity-50

            dark:bg-red-500/10
            dark:text-red-400
            dark:hover:bg-red-500/20
          "
        >
          <Trash2 size={18} />

          {t("clearHistory")}
        </button>

        {/* Restaurar configurações */}

        <button
          type="button"
          onClick={handleRestoreSettings}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-yellow-50
            p-4
            font-semibold
            text-yellow-700
            transition

            hover:bg-yellow-100

            dark:bg-yellow-500/10
            dark:text-yellow-400
            dark:hover:bg-yellow-500/20
          "
        >
          <RotateCcw size={18} />

          {t("restoreSettings")}
        </button>

        {/* Exportar configurações */}

        <button
          type="button"
          onClick={handleExportSettings}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-50
            p-4
            font-semibold
            text-blue-700
            transition

            hover:bg-blue-100

            dark:bg-blue-500/10
            dark:text-blue-400
            dark:hover:bg-blue-500/20
          "
        >
          <Download size={18} />

          {t("exportSettings")}
        </button>

      </div>
    </div>
  );
}