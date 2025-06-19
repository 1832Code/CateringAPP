import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import img from "../../../assets/images/login image.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type LoginFormProps = {
  onRegisterClick: () => void;
};

export const LoginForm = ({ onRegisterClick }: LoginFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { login, setShowLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Iniciando autenticación...");
      await login({ email, password: contraseña });
      setShowLogin(false);
      router.refresh(); // Refresca la página
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    } finally {
    }
  };
  return (
    <>
      <div className={styles.ImageArea}>
        <img className={styles.ImageLogin} src={img.src}></img>
      </div>
      <div className={styles.LoginArea}>
        <h2>Iniciar Sesión</h2>
        <form>
          <input
            className={styles.UserField}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.PasswordField}
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <div className={styles.ButtonsArea}>
            <div className={styles.LoginButtonArea}>
              <input
                className={styles.LoginButton}
                type="submit"
                value="Iniciar Sesión"
                onClick={handleLogin}
              />
            </div>
            <div className={styles.Divider}>
              <span>o</span>
            </div>
            <div className={styles.RegisterButtonArea}>
              <input
                className={styles.RegisterButton}
                type="button"
                value="Registrarse"
                onClick={onRegisterClick}
              />
            </div>
          </div>
          <div className={styles.SocialIconsArea}>
            <FaFacebook
              size={30}
              style={{ margin: "0 10px", cursor: "pointer" }}
            />
            <FaInstagram
              size={30}
              style={{ margin: "0 10px", cursor: "pointer" }}
            />
            <FaTwitter
              size={30}
              style={{ margin: "0 10px", cursor: "pointer" }}
            />
          </div>
        </form>
      </div>
    </>
  );
};
