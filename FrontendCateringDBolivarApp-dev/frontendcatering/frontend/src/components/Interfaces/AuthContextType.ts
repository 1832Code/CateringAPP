import { LoginData } from "./LoginData";

export interface AuthContextType {
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  roles: string[];

  login: (data: LoginData) => Promise<void>;
  logout: () => void;

  showLogin: boolean;
  setShowLogin: (value: boolean) => void;

  isAuthenticating: boolean;
  setIsAuthenticating: (value: boolean) => void;

  loadingAuth: boolean;
  authError: string | null;
  setAuthError: React.Dispatch<React.SetStateAction<string | null>>;
}
