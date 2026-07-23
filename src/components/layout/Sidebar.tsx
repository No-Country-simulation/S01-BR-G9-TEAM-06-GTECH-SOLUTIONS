import { NavLink } from "react-router-dom";

import {
    House,
    Bolt,
    ChartColumn,
    FileText,
    Settings
} from "lucide-react";

export function Sidebar() {
    return (
        <aside className="w-72 bg-white border-r border-slate-200 h-screen">

            <div className="p-8">

                <h1 className="text-2xl font-bold text-yellow-500">

                    ⚡ IntelliWatts

                </h1>

            </div>

            <nav className="px-4 space-y-2">

                <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-xl p-3 transition ${
                    isActive
                        ? "bg-yellow-400 text-white shadow-md"
                        : "hover:bg-yellow-100"
                    }`
                }
                >
                <House size={20} />
                Dashboard
                </NavLink>

                <NavLink
                to="/nova-analise"
                className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-yellow-100"
                >
                    <Bolt size={20} />
                    Nova análise
                </NavLink>


                <button className="w-full flex items-center gap-3 rounded-xl p-3 hover:bg-yellow-100">

                    <ChartColumn size={20} />

                    Histórico

                </button>

                <button className="w-full flex items-center gap-3 rounded-xl p-3 hover:bg-yellow-100">

                    <FileText size={20} />

                    Relatórios

                </button>

                <button className="w-full flex items-center gap-3 rounded-xl p-3 hover:bg-yellow-100">

                    <Settings size={20} />

                    Configurações

                </button>

            </nav>

        </aside>
    );
}