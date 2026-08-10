import { useSettings } from "@/context/settings/useSettings";
import { useTranslation } from "@/i18n/useTranslation";

export function NotificationSettings() {
  const {
    settings,
    updateNotifications,
  } = useSettings();

  const { t } = useTranslation();

  return (
    <div className="space-y-5">

      <label className="flex items-center justify-between">
        <span className="text-slate-700 dark:text-slate-300">
          {t("aiAlerts")}
        </span>

        <input
          type="checkbox"
          checked={settings.notifications.aiAlerts}
          onChange={(e) =>
            updateNotifications("aiAlerts", e.target.checked)
          }
          className="h-5 w-5 accent-yellow-500"
        />
      </label>

      <label className="flex items-center justify-between">
        <span className="text-slate-700 dark:text-slate-300">
          {t("consumptionAlerts")}
        </span>

        <input
          type="checkbox"
          checked={settings.notifications.consumptionAlerts}
          onChange={(e) =>
            updateNotifications(
              "consumptionAlerts",
              e.target.checked
            )
          }
          className="h-5 w-5 accent-yellow-500"
        />
      </label>

      <label className="flex items-center justify-between">
        <span className="text-slate-700 dark:text-slate-300">
          {t("weeklyReports")}
        </span>

        <input
          type="checkbox"
          checked={settings.notifications.weeklyReports}
          onChange={(e) =>
            updateNotifications(
              "weeklyReports",
              e.target.checked
            )
          }
          className="h-5 w-5 accent-yellow-500"
        />
      </label>

    </div>
  );
}
