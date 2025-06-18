import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import img from "../../../assets/images/login image.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

type LoginFormProps = {
  onRegisterClick: () => void;
};

export const LoginForm = ({ onRegisterClick }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8084/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: contraseña,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          nombres: data.nombres,
          apellidos: data.apellidos,
        })
      );
      window.location.reload(); // o actualizas el estado global/context
    } else {
      alert(data.error);
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
