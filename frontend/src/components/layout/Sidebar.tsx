import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import {
  House,
  Bolt,
  ChartColumn,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/auth/useAuth";

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

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {

    logout();

    navigate(ROUTES.LANDING);

  }

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

            {user?.nome.charAt(0) ?? "U"}

          </div>

          <div className="flex-1">

            <p className="font-semibold text-slate-800">

              {user?.nome ?? "Usuário"}

            </p>

            <p className="text-xs text-slate-500">

              IntelliWatts v1.0

            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-200
            py-3
            text-red-600
            transition
            hover:bg-red-50
          "
        >

          <LogOut size={18} />

          Sair

        </button>

      </div>

    </aside>
  );
}