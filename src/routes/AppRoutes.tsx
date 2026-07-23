import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing } from "../pages/Landing/Landing";
import { Dashboard } from "../pages/Dashboard/Dashboard";

import { MainLayout } from "../layouts/MainLayout";

import { NewAnalysis } from "../pages/NewAnalysis/NewAnalysis";

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

      </Routes>

    </BrowserRouter>
  );
}