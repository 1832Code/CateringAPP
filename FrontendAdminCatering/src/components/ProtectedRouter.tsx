// components/ProtectedRoute.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("auth-token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}