"use client";
import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import img from "@/assets/images/RegisterFormImage.jpg";
import axios from "axios"; // Necesitarás instalar axios: npm install axios
import { useRouter } from "next/navigation"; // Para redireccionar

type RegisterFormProps = {
  onCancelarClick: () => void;
  onSuccessRegister: (email: string) => void; // Nueva prop para manejar el éxito del registro
};

export const RegisterForm = ({
  onCancelarClick,
  onSuccessRegister,
}: RegisterFormProps) => {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    dni: "",
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    if (!checked) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register", // Asegúrate de que este sea el puerto de tu backend
        formData
      );
      console.log(response.data);
      // Si el registro es exitoso, llamamos a la función de éxito
      onSuccessRegister(formData.email);
    } catch (err: any) {
      console.error("Error al registrar:", err.response?.data || err.message);
      setError(err.response?.data || "Error al registrar el usuario.");
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
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
              />
              <input
                className={styles.NamesField}
                type="text"
                placeholder="Nombres"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.SecondArea}>
              <input
                className={styles.LastNamesField}
                type="text"
                placeholder="Apellidos"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                className={styles.TelephoneField}
                type="text"
                placeholder="Teléfono"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h5>Cree su usuario y su contraseña</h5>
          <div className={styles.RegisterArea}>
            <div className={styles.SubRegisterArea}></div>
            <input
              className={styles.EmailField}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className={styles.PasswordField}
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}{" "}
          {/* Mensaje de error */}
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
        <img src={img.src} alt="Register Image"></img>
      </div>
    </>
  );
};
