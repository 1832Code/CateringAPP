import React, { useState } from "react";
import "./Usuario.css";

interface UsuarioInfoP {
  nombre: string;
  apellidos: string;
  telefono: string;
  dni: string;
  direccion: string;
  correo: string;
}

const UsuarioInfoo: React.FC<UsuarioInfoP> = (props) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuario, setUsuario] = useState({ ...props });

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const guardarCambios = () => {
    console.log("Datos actualizados:", usuario);
    setModoEdicion(false);
  };

  const cancelarCambios = () => {
    setUsuario({ ...props });
    setModoEdicion(false);
  };

  return (
    <div className="usuario-tarjeta">
      {/*1*/}
      <div className="fila">
        <div className="col">
          <span className="etiqueta">Nombres</span>
          {modoEdicion ? (
            <input
              className="dato"
              name="nombre"
              value={usuario.nombre}
              onChange={manejarCambio}
            />
          ) : (
            <p className="dato">{usuario.nombre}</p>
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
              name="correo"
              value={usuario.correo}
              onChange={manejarCambio}
            />
          ) : (
            <p className="dato">{usuario.correo}</p>
          )}
        </div>
      </div>

      {/*4*/}
      <div className="fila">
        <div className="col">
          <span className="etiqueta">Dirección</span>
          {modoEdicion ? (
            <input
              className="dato"
              name="direccion"
              value={usuario.direccion}
              onChange={manejarCambio}
            />
          ) : (
            <p className="dato">{usuario.direccion}</p>
          )}
        </div>
        <div className="col">
          <span className="etiqueta">Fecha de registro</span>
          <p className="dato">29-01-2023</p>
        </div>
      </div>

      {/* BOTONES */}
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
