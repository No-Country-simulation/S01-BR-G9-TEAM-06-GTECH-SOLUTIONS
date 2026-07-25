import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing } from "../pages/Landing/Landing";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { NewAnalysis } from "../pages/NewAnalysis/NewAnalysis";
import { History } from "../pages/History/History";
import { Analytics } from "../pages/Analytics/Analytics";

import { MainLayout } from "../layouts/MainLayout";

import { Reports } from "../pages/Reports/Reports";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Área pública */}
        <Route path="/" element={<Landing />} />

        {/* Área da aplicação */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/nova-analise"
          element={
            <MainLayout>
              <NewAnalysis />
            </MainLayout>
          }
        />

        <Route
          path="/history"
          element={
            <MainLayout>
              <History />
            </MainLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <MainLayout>
              <Analytics />
            </MainLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <MainLayout>
              <Reports />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}