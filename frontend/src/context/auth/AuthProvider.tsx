import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../services/authService";
import { AuthContext } from "./AuthContext";
import type { User } from "./auth.types";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((currentUser) => {
        if (active) {
          setUser(currentUser);
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(
    async (
      email: string,
      senha: string,
    ) => {
      const authenticatedUser =
        await loginUser({
          email,
          senha,
        });

      setUser(authenticatedUser);
    },
    [],
  );

  const register = useCallback(
    async (
      nome: string,
      email: string,
      senha: string,
    ) => {
      await registerUser({
        nome,
        email,
        senha,
      });

      await login(email, senha);
    },
    [login],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: user !== null,
    }),
    [
      user,
      loading,
      login,
      register,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}