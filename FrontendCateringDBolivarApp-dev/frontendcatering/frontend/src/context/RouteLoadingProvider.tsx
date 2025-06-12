"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, use } from "react";
import Loader from "@/components/layouts/Loader/Loader";
import styles from "./routerloadingprovider.module.css";

const RouteLoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
  }, [pathname]); // cuando cambia la ruta

  return (
    <>
      {loading && (
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
