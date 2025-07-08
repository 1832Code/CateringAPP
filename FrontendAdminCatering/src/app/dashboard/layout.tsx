"use client";
import { useRouter } from "next/navigation";
import NavSlider from "./nav";
import NavSuperior from "./navSuperior";
import { useAuth } from "@/context/authcontext";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log("Sesión inválida o no autenticado, redirigiendo…");
      router.replace("/auth/login"); // para que no quede en historial
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#181c2c] text-white">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Verificando sesión…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed z-40 w-[0%] h-screen transform -translate-x-full md:translate-x-0 transition-transform duration-300">
        <NavSlider />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col md:ml-64 w-full lg:w-full min-h-screen">
        <header className="sticky top-0 z-30">
          <NavSuperior />
        </header>

        <main className="flex-1 p-2 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
