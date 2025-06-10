import React from "react";
import styles from "./RegisterForm.module.css";
import { useState } from "react";
import img from "@/assets/images/RegisterFormImage.jpg";

type RegisterFormProps = {
  onCancelarClick: () => void;
};
export const RegisterForm = ({ onCancelarClick }: RegisterFormProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className={styles.ContainerArea}>
        <h1>Crear Cuenta</h1>
        <h5>Ingrese sus datos</h5>
        <form className={styles.FormArea}>
          <div className={styles.DataArea}>
            <div className={styles.FirstArea}>
              <input
                className={styles.DniField}
                type="text"
                placeholder="DNI"
              />
              <input
                className={styles.NamesField}
                type="text"
                placeholder="Nombres"
              />
            </div>
            <div className={styles.SecondArea}>
              <input
                className={styles.LastNamesField}
                type="text"
                placeholder="Apellidos"
              />
              <input
                className={styles.TelephoneField}
                type="text"
                placeholder="Teléfono"
              />
            </div>
          </div>
          <h5>Cree su usuario y su contraseña</h5>
          <div className={styles.RegisterArea}>
            <div className={styles.SubRegisterArea}>
              <input
                className={styles.UserField}
                type="text"
                placeholder="Usuario"
              />
              <input
                className={styles.PasswordField}
                type="password"
                placeholder="Contraseña"
              />
            </div>
            <input
              className={styles.EmailField}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className={styles.CheckArea}>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              Acepto los términos y condiciones
            </label>
          </div>
          <div className={styles.ButtonsArea}>
            <div className={styles.LoginButtonArea}>
              <input
                className={styles.LoginButton}
                type="submit"
                value="Registrarse"
              />
            </div>
            <div className={styles.RegisterButtonArea}>
              <input
                className={styles.RegisterButton}
                type="button"
                value="Cancelar"
                onClick={onCancelarClick}
              />
            </div>
          </div>
        </form>
      </div>
      <div className={styles.ImageArea}>
        <img src={img.src}></img>
      </div>
    </>
  );
};
