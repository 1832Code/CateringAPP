import React, { useEffect, useState } from "react";
import "./Usuario.css";

interface UsuarioInfoP {
  nombres: string;
  apellidos: string;
  telefono: string;
  dni: string;
  direccion?: string;
  email: string;
}

const UsuarioInfoo: React.FC<UsuarioInfoP> = (props) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioInfoP | null>(null);
  const [originalUsuario, setOriginalUsuario] = useState<UsuarioInfoP | null>(
    null
  );

  // Obtener usuario autenticado al cargar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8084/api/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener usuario");

        const data = await response.json();
        console.log(data);
        setUsuario(data);
        setOriginalUsuario(data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUsuario();
  }, []);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!usuario) return;
    setUsuario({ ...usuario, [name]: value });
  };

  const guardarCambios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8084/api/usuarios/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      const data = await response.json();
      setUsuario(data);
      setOriginalUsuario(data);
      setModoEdicion(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const cancelarCambios = () => {
    setUsuario(originalUsuario);
    setModoEdicion(false);
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="usuario-tarjeta">
      {/*1*/}
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

      {/*2*/}
      <div className="fila">
        <div className="col">
          <span className="etiqueta">Tipo de Documento</span>
          <p className="dato">DNI</p>
        </div>
        <div className="col">
          <span className="etiqueta">Número de Documento</span>
          <p className="dato">{usuario.dni}</p> {/* DNI no editable */}
        </div>
      </div>

      {/*3*/}
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
          {modoEdicion ? (
            <input
              className="dato"
              name="email"
              value={usuario.email}
              onChange={manejarCambio}
            />
          ) : (
            <p className="dato">{usuario.email}</p>
          )}
        </div>
      </div>

      {/* BOTONES */}
      <div
        className="botones"
        style={{ marginTop: "30px", textAlign: "right" }}
      >
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
