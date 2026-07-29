import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../context/auth/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LANDING}
        replace
      />
    );
  }

  return <>{children}</>;
}