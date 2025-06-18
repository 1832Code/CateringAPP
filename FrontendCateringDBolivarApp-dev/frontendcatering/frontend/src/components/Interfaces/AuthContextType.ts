import { LoginData } from "./LoginData";

export interface AuthContextType {
  token: string | null;
  email: string | null;
  nombres: string | null;
  apellidos: string | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}
