export interface DecodedToken {
  roles: string[];
  email: string;
  id: number;
  exp: number;
  iat: number;
}
