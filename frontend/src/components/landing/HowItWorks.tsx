import { BrainCircuit, Database, BarChart3 } from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";

const steps = [
  {
    icon: <Database className="h-10 w-10 text-yellow-500" />,
    title: "Coleta de Dados",
    description:
      "Informe os dados de consumo energético da residência ou estabelecimento.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-yellow-500" />,
    title: "Análise com IA",
    description:
      "O modelo de Machine Learning classifica o perfil de consumo em segundos.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-yellow-500" />,
    title: "Resultados Inteligentes",
    description:
      "Receba indicadores, recomendações e estimativas para otimizar o consumo.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">

      <SectionTitle
        badge="Como funciona"
        title="Inteligência Artificial aplicada ao consumo energético"
        subtitle="Um fluxo simples para transformar dados em decisões inteligentes."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {step.icon}

            <h3 className="mt-6 text-xl font-bold">{step.title}</h3>

            <p className="mt-4 leading-7 text-slate-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}