import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Lista de rutas protegidas
  const protectedPaths = ["/reservar", "/gestionarusuario", "/historial"];

  const currentPath = req.nextUrl.pathname;
  const isProtected = protectedPaths.includes(currentPath);

  // Si es una ruta protegida y no hay token, redirige al login
  if (isProtected && !token) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("showLogin", "true");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/reservar", "/gestionarusuario", "/historial"],
};
