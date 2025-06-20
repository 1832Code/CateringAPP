import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  // Proteger solo rutas del dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// Opcional: Define las rutas donde aplica el middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};
