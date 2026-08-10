import {
  Cpu,
  Database,
  Server,
  Brain,
} from "lucide-react";

import { useTranslation } from "@/i18n/useTranslation";

export function SystemInfoCard() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
        {t("systemInformation")}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Front-end */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-5

            dark:bg-slate-800
          "
        >
          <Cpu className="mb-3 text-yellow-500" />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("frontend")}
          </p>

          <h3 className="font-bold text-slate-900 dark:text-white">
            React 19
          </h3>
        </div>

        {/* Back-end */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-5

            dark:bg-slate-800
          "
        >
          <Server className="mb-3 text-blue-500" />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("backend")}
          </p>

          <h3 className="font-bold text-slate-900 dark:text-white">
            Spring Boot
          </h3>
        </div>

        {/* Machine Learning */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-5

            dark:bg-slate-800
          "
        >
          <Brain className="mb-3 text-green-500" />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("machineLearning")}
          </p>

          <h3 className="font-bold text-slate-900 dark:text-white">
            Scikit-Learn
          </h3>
        </div>

        {/* Banco */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-5

            dark:bg-slate-800
          "
        >
          <Database className="mb-3 text-purple-500" />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("database")}
          </p>

          <h3 className="font-bold text-slate-900 dark:text-white">
            MySQL
          </h3>
        </div>

      </div>
    </div>
  );
}