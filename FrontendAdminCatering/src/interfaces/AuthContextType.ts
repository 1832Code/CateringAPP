import { DecodedToken } from "./DecodedToken";
import { LoginData } from "./LoginData";

export interface AuthContextType {
  token: string | null;
  email: string | null;
  roles: string[];
  login: (data: LoginData) => Promise<DecodedToken | null>;
  logout: () => Promise<void>;
  isAuthenticating: boolean;
  setIsAuthenticating: (val: boolean) => void;
}
