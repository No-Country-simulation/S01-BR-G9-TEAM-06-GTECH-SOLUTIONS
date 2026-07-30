import { SunMedium } from "lucide-react";

export function WelcomeBanner() {
  return (
    <section className="mb-8 rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-slate-900 shadow-lg">

      <div className="flex items-center gap-4">

        <SunMedium size={42} />

        <div>

          <h1 className="text-3xl font-bold">
            Bem-vindo ao IntelliWatts
          </h1>

          <p className="mt-2 text-lg">
            Acompanhe seus indicadores de consumo energético em tempo real.
          </p>

        </div>

      </div>

    </section>
  );
}