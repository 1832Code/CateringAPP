"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, use } from "react";
import Loader from "@/components/layouts/Loader/Loader";
import styles from "./routerloadingprovider.module.css";
import { useAuth } from "./AuthContext";

const RouteLoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { isAuthenticating } = useAuth();

  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    console.log("Loader activado - pathname o autenticación");
  }, [pathname, isAuthenticating]);

  useEffect(() => {
    // Mostrar loader en el cambio de ruta
    setLoading(true);
    setFadeOut(false);

    // Esperar mínimo 500 ms y luego hacer fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 400); // luego quitar loader
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, isAuthenticating]); // cuando cambia la ruta
  console.log("Render loader", { loading, isAuthenticating });
  return (
    <>
      {(loading || isAuthenticating) && (
        <div
          className={`${styles.loaderWrapper} ${fadeOut ? styles.fadeOut : ""}`}
        >
          <Loader />
        </div>
      )}
      {children}
    </>
  );
};
export default RouteLoadingProvider;
