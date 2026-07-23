import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-xl shadow-sm">
            ⚡
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              IntelliWatts
            </h1>

            <p className="text-xs text-slate-500">
              Intelligent Energy Analytics
            </p>
          </div>

        </div>

        <nav className="flex items-center gap-8">

          <a href="#tecnologias" className="text-slate-600 hover:text-yellow-500 transition">
            Tecnologias
          </a>

          <a href="#funcionalidades" className="text-slate-600 hover:text-yellow-500 transition">
            Funcionalidades
          </a>

          <Link
            to="/dashboard"
            className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold transition hover:bg-yellow-500"
          >
            Dashboard
          </Link>

        </nav>

      </div>
    </header>
  );
}