"use client";
import React, { useState } from "react";
import styles from "@/components/layouts/LoginComponents/LoginForm.module.css";
import img from "@/assets/images/login image.png"; // Ensure this path is correct
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios"; // Import axios
import { useRouter } from "next/navigation"; // Import useRouter for navigation

type LoginFormProps = {
  onRegisterClick: () => void;
};

const LoginForm = ({ onRegisterClick }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State for login errors
  const router = useRouter(); // Initialize Next.js router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear any previous errors

    try {
      // Send a POST request to your Spring Boot login endpoint
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      console.log("Inicio Sesión exitosa:", response.data);

      // Store the JWT token and user details in localStorage
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("userRoles", JSON.stringify(response.data.roles)); // Store roles as a stringified array

      // Redireciona al dashboard
      router.push("/");
    } catch (err: any) {
      console.error("Error during login:", err.response?.data || err.message);
      // Display a user-friendly error message
      setError(
        err.response?.data ||
          "Credenciales incorrectas o cuenta no verificada. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <>
      <div className={styles.ImageArea}>
        <img
          className={styles.ImageLogin}
          src={img.src}
          alt="Login Image"
        ></img>
      </div>
      <div className={styles.LoginArea}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Attach handleSubmit to the form */}
          <input
            className={styles.UserField}
            type="email"
            placeholder="Email"
            value={email} // Bind value to state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            required // Make the field required
          />
          <input
            className={styles.PasswordField}
            type="password"
            placeholder="Contraseña"
            value={password} // Bind value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            required // Make the field required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}{" "}
          {/* Display error message */}
          <div className={styles.ButtonsArea}>
            <div className={styles.LoginButtonArea}>
              <input
                className={styles.LoginButton}
                type="submit" // This button will trigger the form submission
                value="Iniciar Sesión"
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
export default LoginForm;
