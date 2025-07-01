import { NextRequest, NextResponse } from "next/server";

function decodeJwt(token: string): any | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decodificando token:", e);
    return null;
  }
}
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  console.log("⚡ Middleware ejecutado en:", url.pathname);
  console.log("🔐 Token recibido:", token);

  if (url.pathname.startsWith("/dashboard")) {
    if (!token) {
      console.warn("❌ No hay token");
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    const decoded = decodeJwt(token);
    console.log("🧾 Token decodificado:", decoded);

    const roles: string[] = decoded?.roles || [];
    const isAdmin = roles.includes("ROLE_ADMIN");

    if (!isAdmin) {
      console.warn("🚫 No tienes el rol adecuado:", roles);
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // ✅ aplica solo a rutas protegidas
};
