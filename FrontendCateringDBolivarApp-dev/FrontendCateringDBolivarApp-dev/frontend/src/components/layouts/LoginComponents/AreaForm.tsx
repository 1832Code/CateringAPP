import React, { useState } from "react";
import styles from "./AreaForm.module.css";
import img from "../../../assets/images/login image.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
type LoginViewProps = {
  onClose: () => void;
};

export const AreaForm = ({ onClose }: LoginViewProps) => {
  //State to control views
  const [view, setView] = useState<"login" | "register">("login");
  return (
    <div className={styles.MainAreaLogin}>
      <div className={styles.ModalLogin}>
        <button className={styles.CloseBtn} onClick={onClose}>
          x
        </button>
        <div className={styles.ContainerArea}>
          {view === "login" ? (
            <LoginForm onRegisterClick={() => setView("register")} />
          ) : (
            <RegisterForm onCancelarClick={() => setView("login")} />
          )}
        </div>
      </div>
    </div>
  );
};
