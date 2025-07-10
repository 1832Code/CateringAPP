import { DecodedToken } from "./DecodedToken";
import { LoginData } from "./LoginData";

export interface AuthContextType {
<<<<<<< HEAD
=======
  token: string | null;
>>>>>>> origin/auth
  email: string | null;
  roles: string[];
  login: (data: LoginData) => Promise<DecodedToken | null>;
  logout: () => Promise<void>;
<<<<<<< HEAD
  isAuthenticated: boolean;
  loading: boolean;
  refreshAuth: () => Promise<void>;
=======
>>>>>>> origin/auth
  isAuthenticating: boolean;
  setIsAuthenticating: (val: boolean) => void;
}
