import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Lista de rutas protegidas
  const protectedPaths = ["/reservar"];

  const currentPath = req.nextUrl.pathname;
  const isProtected = protectedPaths.includes(currentPath);

  // Si es una ruta protegida y no hay token, redirige al login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/reservar"],
};
