import {
  Brain,
  Leaf,
  BarChart3,
} from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "IA Inteligente",
    description:
      "Analisa padrões de consumo e identifica oportunidades de economia automaticamente.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description:
      "Reduza desperdícios energéticos e promova um consumo energético mais consciente.",
  },
  {
    icon: BarChart3,
    title: "Analytics em Tempo Real",
    description:
      "Visualize indicadores, tendências e relatórios para tomar decisões com segurança.",
  },
];

export function LoginPresentation() {
  return (
    <div
      className="
        flex
        h-full
        flex-col
        justify-between
        rounded-3xl
        bg-linear-to-br
        from-yellow-400
        via-orange-400
        to-yellow-500
        p-12
        text-white
        shadow-2xl
      "
    >
      <div>

        <div className="mb-12">

          <h1 className="text-5xl font-extrabold tracking-tight">
            IntelliWatts
          </h1>

          <p className="mt-6 text-3xl font-bold leading-tight">
            Energia inteligente
            <br />
            começa com
            <br />
            decisões inteligentes.
          </p>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/95">
            O IntelliWatts utiliza Inteligência Artificial para transformar
            dados de consumo em recomendações práticas, ajudando pessoas e
            empresas a reduzir custos, aumentar a eficiência energética e
            promover a sustentabilidade.
          </p>

        </div>

        <div className="space-y-6">

          {benefits.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  flex
                  items-start
                  gap-5
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/10
                  p-5
                  backdrop-blur-md
                "
              >
                <div className="rounded-xl bg-white/20 p-3">
                  <Icon size={26} />
                </div>

                <div>

                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-base leading-7 text-white/90">
                    {item.description}
                  </p>

                </div>

              </div>
            );

          })}

        </div>

      </div>

      <div className="mt-12 border-t border-white/20 pt-6 text-sm text-white/80">
        Desenvolvido para transformar dados em economia energética.
      </div>

    </div>
  );
}