import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-8">

      <div className="flex-1">

        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          ⚡ Plataforma com Inteligência Artificial
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">
          Transforme dados de consumo em economia inteligente.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
          O IntelliWatts utiliza Inteligência Artificial para analisar padrões
          de consumo energético, classificar perfis e gerar recomendações que
          ajudam a reduzir custos e aumentar a eficiência.
        </p>

        <div className="mt-10 flex gap-5">

          <Link
            to={ROUTES.LOGIN}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-yellow-400
              px-8
              py-4
              font-semibold
              transition
              hover:bg-yellow-500
            "
          >
            Conhecer Plataforma

            <ArrowRight size={20} />

          </Link>

          <a
            href="#tecnologias"
            className="
              rounded-xl
              border
              border-slate-300
              px-8
              py-4
              font-semibold
              transition
              hover:bg-slate-100
            "
          >
            Ver Tecnologias
          </a>

        </div>

      </div>

      <div className="flex flex-1 justify-center">

        <div className="flex h-105 w-105 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-xl">

          <span className="text-[150px]">
            ⚡
          </span>

        </div>

      </div>

    </section>
  );
}