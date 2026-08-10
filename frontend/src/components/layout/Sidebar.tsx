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
import { useTranslation } from "@/i18n/useTranslation";

export function Sidebar() {
  const { user, logout } = useAuth();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const menuItems = [
    {
      label: t("dashboard"),
      path: ROUTES.DASHBOARD,
      icon: House,
    },
    {
      label: t("newAnalysis"),
      path: ROUTES.NEW_ANALYSIS,
      icon: Bolt,
    },
    {
      label: t("analytics"),
      path: ROUTES.ANALYTICS,
      icon: ChartColumn,
    },
    {
      label: t("reports"),
      path: ROUTES.REPORTS,
      icon: FileText,
    },
    {
      label: t("settings"),
      path: ROUTES.SETTINGS,
      icon: Settings,
    },
  ];

  function handleLogout() {
    logout();
    navigate(ROUTES.LANDING);
  }

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-slate-200
        bg-white

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* Logo */}

      <div
        className="
          border-b
          border-slate-200
          p-8

          dark:border-slate-700
        "
      >
        <h1 className="text-3xl font-bold text-yellow-500">
          ⚡ IntelliWatts
        </h1>
      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    p-3
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-yellow-400 text-white shadow-lg"
                        : `
                          text-slate-600
                          hover:bg-yellow-100

                          dark:text-slate-300
                          dark:hover:bg-slate-800
                        `
                    }
                  `}
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

      <div
        className="
          border-t
          border-slate-200
          p-6

          dark:border-slate-700
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-yellow-500
              text-lg
              font-bold
              text-white
            "
          >
            {user?.nome.charAt(0) ?? "U"}
          </div>

          <div className="flex-1">
            <p
              className="
                font-semibold
                text-slate-800

                dark:text-white
              "
            >
              {user?.nome ?? "Usuário"}
            </p>

            <p
              className="
                text-xs
                text-slate-500

                dark:text-slate-400
              "
            >
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

            dark:border-red-800
            dark:hover:bg-red-950
          "
        >
          <LogOut size={18} />

          {t("logout")}
        </button>
      </div>
    </aside>
  );
}