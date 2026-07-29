import { useState, type ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import type { User } from "./auth.types";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("iw_user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("iw_token");
  });

  const loading = false;

  async function login(
    email: string,
    senha: string
  ) {
    console.log(email, senha);

    // Temporário.
    // Será substituído pela integração com o backend.

    const fakeUser: User = {
      id: "1",
      nome: "Matheus Cunha",
      email,
    };

    const fakeToken = "TOKEN_TEMPORARIO";

    setUser(fakeUser);
    setToken(fakeToken);

    localStorage.setItem(
      "iw_user",
      JSON.stringify(fakeUser)
    );

    localStorage.setItem(
      "iw_token",
      fakeToken
    );
  }

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("iw_user");
    localStorage.removeItem("iw_token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}