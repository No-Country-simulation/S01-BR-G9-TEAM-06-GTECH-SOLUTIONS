import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/auth/useAuth";
import { ROUTES } from "../constants/routes";

type GuestRouteProps = {
  children: ReactNode;
};

export function GuestRoute({
  children,
}: GuestRouteProps) {

  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  return <>{children}</>;
}