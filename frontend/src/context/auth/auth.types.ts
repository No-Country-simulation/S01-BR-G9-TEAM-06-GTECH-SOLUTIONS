export interface User {
  id: string;
  nome: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}