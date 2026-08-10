import { Outlet } from "react-router-dom";

import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";

export function MainLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        transition-colors
        duration-300

        dark:bg-slate-950
      "
    >
      <Sidebar />

      <div
        className="
          ml-72
          transition-colors
          duration-300
        "
      >
        <Header />

        <main
          className="
            pt-20
            transition-colors
            duration-300
          "
        >
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}