// DecodedToken.ts
export interface DecodedToken {
  roles: string[];
  email: string;
  id: number;
  exp: number; // Expiration timestamp (in seconds)
  iat: number; // Issued at timestamp (in seconds)
}
