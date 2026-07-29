import {
  Zap,
  BrainCircuit,
  Leaf,
  ChartColumn,
} from "lucide-react";

export function LoginHero() {
  return (
    <section
      className="
        relative
        hidden
        lg:flex
        flex-col
        justify-between
        overflow-hidden
        bg-linear-to-br
        from-yellow-400
        via-yellow-500
        to-orange-500
        p-14
      "
    >

        <div
        className="
            absolute
            -top-28
            -left-20
            h-96
            w-96
            rounded-full
            bg-yellow-200/20
            blur-3xl
        "
        />
      {/* Overlay para melhorar o contraste */}
      <div className="absolute inset-0 bg-slate-900/20" />

      {/* Conteúdo */}
      <div className="relative z-10">

        <div className="flex items-center gap-5">

          <div
            className="
              rounded-2xl
              bg-white/20
              p-4
              backdrop-blur-md
            "
          >
            <Zap
              size={46}
              className="text-white"
            />
          </div>

          <div>

            <h1
              className="
                text-6xl
                font-black
                tracking-tight
                text-white
              "
            >
              IntelliWatts
            </h1>

            <p
            className="
                mt-3
                text-2xl
                font-bold
                text-white
                leading-9
            "
>
              Inteligência Artificial para eficiência energética
            </p>

          </div>

        </div>

        <p
        className="
            mt-10
            max-w-xl
            text-lg
            font-medium
            leading-9
            text-white/95
        "
>
          Analise padrões de consumo, receba recomendações inteligentes
          e acompanhe indicadores em tempo real para economizar energia
          com o auxílio da Inteligência Artificial.
        </p>

      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 gap-6">

        <div
          className="
            rounded-3xl
            border
            border-white/20
            bg-white/20
            p-6
            backdrop-blur-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-white/25
          "
        >

          <div className="flex items-center gap-5">

            <BrainCircuit
              size={46}
              className="text-white"
            />

            <div>

              <h3
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                IA Inteligente
              </h3>

              <p
                className="
                  mt-2
                  text-lg
                  font-medium
                  leading-8
                  text-white
                "
              >
                Predições inteligentes baseadas em Machine Learning para
                identificar padrões de consumo.
              </p>

            </div>

          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-white/20
            bg-white/20
            p-6
            backdrop-blur-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-white/25
          "
        >

          <div className="flex items-center gap-5">

            <Leaf
              size={46}
              className="text-white"
            />

            <div>

              <h3
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Sustentabilidade
              </h3>

              <p
                className="
                  mt-2
                  text-base
                  font-medium
                  leading-8
                  text-white
                "
              >
                Reduza desperdícios, economize energia e diminua sua
                emissão de CO₂.
              </p>

            </div>

          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-white/20
            bg-white/20
            p-6
            backdrop-blur-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-white/25
          "
        >

          <div className="flex items-center gap-5">

            <ChartColumn
              size={46}
              className="text-white"
            />

            <div>

              <h3
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Analytics
              </h3>

              <p
                className="
                  mt-2
                  text-base
                  font-medium
                  leading-8
                  text-white
                "
              >
                Visualize indicadores, consumo, economia e desempenho
                através de um painel inteligente.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}