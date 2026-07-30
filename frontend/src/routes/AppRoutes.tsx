import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing } from "../pages/Landing/Landing";
import { Login } from "../pages/Login/Login";
import { Signup } from "../pages/Signup/Signup";

import { Dashboard } from "../pages/Dashboard/Dashboard";
import { NewAnalysis } from "../pages/NewAnalysis/NewAnalysis";
import { History } from "../pages/History/History";
import { Analytics } from "../pages/Analytics/Analytics";
import { Reports } from "../pages/Reports/Reports";
import { Settings } from "../pages/Settings/Settings";

import { MainLayout } from "../layouts/MainLayout";

import { ROUTES } from "../constants/routes";

import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}

        <Route
          path={ROUTES.LANDING}
          element={<Landing />}
        />

        {/* Login */}

        <Route
          path={ROUTES.LOGIN}
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        {/* Cadastro */}

        <Route
          path={ROUTES.SIGNUP}
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        {/* Área protegida */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path={ROUTES.DASHBOARD}
            element={<Dashboard />}
          />

          <Route
            path={ROUTES.NEW_ANALYSIS}
            element={<NewAnalysis />}
          />

          <Route
            path={ROUTES.HISTORY}
            element={<History />}
          />

          <Route
            path={ROUTES.ANALYTICS}
            element={<Analytics />}
          />

          <Route
            path={ROUTES.REPORTS}
            element={<Reports />}
          />

          <Route
            path={ROUTES.SETTINGS}
            element={<Settings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}