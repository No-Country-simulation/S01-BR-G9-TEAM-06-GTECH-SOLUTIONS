import {
  Cpu,
  Database,
  Server,
  Brain,
} from "lucide-react";

export function SystemInfoCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Informações do Sistema
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl bg-slate-50 p-5">

          <Cpu className="mb-3 text-yellow-500" />

          <p className="text-sm text-slate-500">
            Front-end
          </p>

          <h3 className="font-bold">
            React 19
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <Server className="mb-3 text-blue-500" />

          <p className="text-sm text-slate-500">
            Back-end
          </p>

          <h3 className="font-bold">
            Spring Boot
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <Brain className="mb-3 text-green-500" />

          <p className="text-sm text-slate-500">
            Machine Learning
          </p>

          <h3 className="font-bold">
            Scikit-Learn
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <Database className="mb-3 text-purple-500" />

          <p className="text-sm text-slate-500">
            Banco
          </p>

          <h3 className="font-bold">
            PostgreSQL
          </h3>

        </div>

      </div>

    </div>
  );
}