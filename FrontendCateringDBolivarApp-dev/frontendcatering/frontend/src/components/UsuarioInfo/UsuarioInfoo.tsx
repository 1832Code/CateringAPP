import React, { useState, useEffect } from "react";
import "./Usuario.css";

interface UsuarioDTO {
  nombres: string;
  apellidos: string;
  telefono: string;
  dni: string;
  email: string;
}

const UsuarioInfoo: React.FC = () => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioDTO>({
    nombres: "",
    apellidos: "",
    telefono: "",
    dni: "",
    email: "",
  });

  const [originalUsuario, setOriginalUsuario] = useState<UsuarioDTO | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch("http://localhost:8084/api/usuarios/me", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Error al obtener datos del usuario");
        const data = await response.json();
        setUsuario(data);
        setOriginalUsuario(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsuario();
  }, []);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const guardarCambios = async () => {
    try {
      const response = await fetch("http://localhost:8084/api/usuarios/me", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  nombres: usuario.nombres,
  apellidos: usuario.apellidos,
  telefono: usuario.telefono,
  dni: usuario.dni, 
  email: usuario.email 
}),

      });

      if (!response.ok) throw new Error("Error al guardar cambios");

      const data = await response.json();
      setUsuario(data);
      setOriginalUsuario(data);
      setModoEdicion(false);
      alert("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert("Error al actualizar los datos");
    }
  };

  const cancelarCambios = () => {
    if (originalUsuario) {
      setUsuario(originalUsuario);
    }
    setModoEdicion(false);
  };

  return (
    <div className="usuario-tarjeta">
      <div className="fila">
        <div className="col">
          <span className="etiqueta">Nombres</span>
          {modoEdicion ? (
            <input
              className="dato"
              name="nombres"
              value={usuario.nombres}
              onChange={manejarCambio}
            />
          ) : (
            <p className="dato">{usuario.nombres}</p>
          )}
        </div>
        <div className="col">
          <span className="etiqueta">Apellidos</span>
          {modoEdicion ? (
            <input
              className="dato"
              name="apellidos"
              value={usuario.apellidos}
              onChange={manejarCambio}
            />
          ) : (
            <p className="dato">{usuario.apellidos}</p>
          )}
        </div>
      </div>

      <div className="fila">
        <div className="col">
          <span className="etiqueta">Tipo de Documento</span>
          <p className="dato">DNI</p>
        </div>
        <div className="col">
          <span className="etiqueta">Número de Documento</span>
          <p className="dato">{usuario.dni}</p>
        </div>
      </div>

      <div className="fila">
        <div className="col">
          <span className="etiqueta">Celular</span>
          {modoEdicion ? (
            <input
              className="dato"
              name="telefono"
              value={usuario.telefono}
              onChange={manejarCambio}
            />
          ) : (
            <p className="dato">{usuario.telefono}</p>
          )}
        </div>
        <div className="col">
          <span className="etiqueta">Correo electrónico</span>
          <p className="dato">{usuario.email}</p>
        </div>
      </div>

      <div className="fila">
        <div className="col">
          <span className="etiqueta">Fecha de registro</span>
          <p className="dato">29-01-2023</p>
        </div>
      </div>

      <div className="botones" style={{ marginTop: "30px", textAlign: "right" }}>
        {modoEdicion ? (
          <>
            <button className="cancelar" onClick={cancelarCambios}>
              Cancelar
            </button>
            <button onClick={guardarCambios}>Guardar</button>
          </>
        ) : (
          <button onClick={() => setModoEdicion(true)}>Modificar Datos</button>
        )}
      </div>
    </div>
  );
};

export default UsuarioInfoo;
