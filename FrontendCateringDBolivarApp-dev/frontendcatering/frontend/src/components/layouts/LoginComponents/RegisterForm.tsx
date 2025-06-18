import React from "react";
import styles from "./RegisterForm.module.css";
import { useState } from "react";
import img from "@/assets/images/RegisterFormImage.jpg";

type RegisterFormProps = {
  onCancelarClick: () => void;
};
export const RegisterForm = ({ onCancelarClick }: RegisterFormProps) => {
  const [checked, setChecked] = useState(false);

  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checked) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    const res = await fetch("http://localhost:8084/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dni,
        nombres,
        apellidos,
        telefono,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Guardar token y redirigir o recargar
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, nombres, apellidos })
      );
      alert("Registro exitoso");
      window.location.reload();
    } else {
      alert(data.error || "Error al registrar");
    }
  };

  return (
    <>
      <div className={styles.ContainerArea}>
        <h1>Crear Cuenta</h1>
        <h5>Ingrese sus datos</h5>
        <form className={styles.FormArea} onSubmit={handleSubmit}>
          <div className={styles.DataArea}>
            <div className={styles.FirstArea}>
              <input
                className={styles.DniField}
                type="text"
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
              <input
                className={styles.NamesField}
                type="text"
                placeholder="Nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
              />
            </div>
            <div className={styles.SecondArea}>
              <input
                className={styles.LastNamesField}
                type="text"
                placeholder="Apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
              <input
                className={styles.TelephoneField}
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
          <h5>Cree su usuario y su contraseña</h5>
          <div className={styles.RegisterArea}>
            <div className={styles.SubRegisterArea}>
              <input
                className={styles.EmailField}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={styles.PasswordField}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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
