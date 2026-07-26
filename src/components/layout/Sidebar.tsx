import { NavLink } from "react-router-dom";

import {
  House,
  Bolt,
  ChartColumn,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: House,
  },
  {
    label: "Nova análise",
    path: "/nova-analise",
    icon: Bolt,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: ChartColumn,
  },
  {
    label: "Relatórios",
    path: "/reports",
    icon: FileText,
  },
  {
    label: "Configurações",
    path: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 p-8">

        <h1 className="text-3xl font-bold text-yellow-500">

          ⚡ IntelliWatts

        </h1>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`relative flex items-center gap-3 rounded-xl p-3 transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-400 text-white shadow-lg"
                      : "text-slate-600 hover:bg-yellow-100"
                  }`}
                >

                  {isActive && (
                    <span className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-white" />
                  )}

                  <Icon size={20} />

                  <span className="font-medium">

                    {item.label}

                  </span>

                </div>
              )}
            </NavLink>

          );

        })}

      </nav>

      {/* Rodapé */}

      <div className="border-t border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-white">

            MC

          </div>

          <div>

            <p className="font-semibold text-slate-800">

              Matheus Cunha

            </p>

            <p className="text-xs text-slate-500">

              IntelliWatts v1.0

            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}