import { LoginData } from "./LoginData";

export interface AuthContextType {
  token: string | null;
  email: string | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  isAuthenticating: boolean;
  setIsAuthenticating: (authenticating: boolean) => void;
}
