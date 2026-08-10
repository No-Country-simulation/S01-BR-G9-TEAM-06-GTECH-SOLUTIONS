import { User, Mail, Lock } from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";

export function AccountSettings() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">

      <div className="flex items-center gap-3">
        <User className="text-yellow-500" />

        <span className="text-slate-700 dark:text-slate-200">
          {t("name")}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Mail className="text-blue-500" />

        <span className="text-slate-700 dark:text-slate-200">
          {t("email")}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Lock className="text-purple-500" />

        <span className="text-slate-700 dark:text-slate-200">
          {t("changePassword")}
        </span>
      </div>

    </div>
  );
}
