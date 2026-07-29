import { Outlet } from "react-router-dom";

import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}