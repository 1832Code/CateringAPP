import { DecodedToken } from "./DecodedToken";
import { LoginData } from "./LoginData";

export interface AuthContextType {
  email: string | null;
  roles: string[];
  login: (data: LoginData) => Promise<DecodedToken | null>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  isAuthenticating: boolean;
  setIsAuthenticating: (val: boolean) => void;
}
