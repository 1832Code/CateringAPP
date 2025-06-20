"use client";
import { useState } from "react";
import { RegisterForm } from "@/components/layouts/LoginComponents/RegisterForm"; // Ajusta la ruta
import { EmailVerificationForm } from "@/components/layouts/LoginComponents/EmailVerifcationForm"; // Ajusta la ruta
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userEmailForVerification, setUserEmailForVerification] = useState("");
  const router = useRouter();

  const handleRegisterSuccess = (email: string) => {
    setUserEmailForVerification(email);
    setIsRegistered(true);
  };

  const handleVerificationSuccess = () => {
    // Después de la verificación exitosa, redirige al usuario a la página de login
    router.push("/inicio"); // Asegúrate de tener una página de login
  };

  const handleCancelarClick = () => {
    router.push("/"); // O a donde quieras redirigir al cancelar
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isRegistered ? (
        <RegisterForm
          onCancelarClick={handleCancelarClick}
          onSuccessRegister={handleRegisterSuccess}
        />
      ) : (
        <EmailVerificationForm
          userEmail={userEmailForVerification}
          onVerificationSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  );
};

export default RegisterPage;
