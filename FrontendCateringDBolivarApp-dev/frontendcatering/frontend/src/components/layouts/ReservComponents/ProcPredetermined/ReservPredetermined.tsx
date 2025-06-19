"use client";
import React, { useEffect, useState } from "react";
import { SelectionService } from "./SelectionService/SelectionService";
import { InformationForm } from "./InformationForm/InformationForm";
import { ReservDetails } from "./ReservDetails/ReservDetails";
import { ReservConfirmation } from "./ReservConfirmation/ReservConfirmation";
import { IconHttpOptions } from "@tabler/icons-react";
import { SelectOptionForm } from "../SelectOptionForm";
import { Pedido } from "@/components/Interfaces/Pedido";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";

interface ReservDefaultProps {
  items: InfoMenu[];
  onBack: () => void;
}

export const ReservPredetermined: React.FC<ReservDefaultProps> = ({
  items,
  onBack,
}) => {
  //State to control the steps
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  //State to control the Data
  const [pedido, setPedido] = useState<Pedido>({
    usuario: {
      id: 0,
      nombres: "",
      apellidos: "",
      email: "",
      telefono: "",
    },
    datosEvento: {
      tipoEvento: "",
      direccion: "",
      distrito: "",
      horaInicio: "",
      cantHoras: "",
      fechaEvento: "",
    },
    infoMenu: {
      id: 0,
      servicio: {
        tipoServicio: {
          id: 0,
        },
        items: [],
      },
      extra: {
        extraInfo: [],
      },
      personal: {
        personalInfo: [],
      },
      titulo: "",
      descripcion: "",
      precio: 0,
      imageURL: "",
      activo: true,
      cantPersonas: 0,
      tipoInfoMenu: "",
    },
    estado: "Nuevo",
  });

  // 1) Cuando se selecciona un servicio/paquete, actualizamos solo el infoMenu.tipoServicio
  const handleInfoMenuSelected = (infoMenu: InfoMenu) => {
    setPedido((prev) => ({
      ...prev,
      infoMenu,
    }));
    setStep(2);
  };

  // 2) Cuando se llenan datos del evento, actualizamos solo datosEvento
  const handleDatosEvento = (datosEvento: Pedido["datosEvento"]) => {
    setPedido((prev) => ({
      ...prev,
      datosEvento,
    }));
    setStep(3);
  };

  const handleBackToStep1 = () => setStep(1);
  const handleBackToStep2 = () => setStep(2);
  //function to handle the submit final
  const resetPedido = () => {
    setPedido({
      usuario: {
        id: 0,
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
      },
      datosEvento: {
        tipoEvento: "",
        direccion: "",
        distrito: "",
        horaInicio: "",
        cantHoras: "",
        fechaEvento: "",
      },
      infoMenu: {
        id: 0,
        servicio: {
          tipoServicio: {
            id: 0,
          },
          items: [],
        },
        extra: {
          extraInfo: [],
        },
        personal: {
          personalInfo: [],
        },
        titulo: "",
        descripcion: "",
        precio: 0,
        imageURL: "",
        activo: true,
        cantPersonas: 0,
        tipoInfoMenu: "",
      },
      estado: "Nuevo",
    });
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch("http://localhost:8084/api/usuarios/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("No se pudo obtener el usuario");

        const data = await res.json();

        // Actualiza el estado `pedido.usuario` con los datos reales
        setPedido((prev) => ({
          ...prev,
          usuario: {
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
          },
        }));
      } catch (err) {
        console.error("Error al obtener el usuario:", err);
      }
    };

    fetchUsuario();
  }, []);
  const handleSubmitFinal = async () => {
    try {
      const payload = {
        usuarioId: pedido.usuario.id,
        datosEvento: {
          ...pedido.datosEvento,
          cantHoras: Number(pedido.datosEvento.cantHoras),
        },
        infoMenuId: pedido.infoMenu.id,
        estado: pedido.estado,
      };

      const response = await fetch("http://localhost:8084/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Payload a enviar:", payload);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al enviar el pedido: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Pedido creado con éxito:", data);

      setStep(4);
      resetPedido();
    } catch (error) {
      console.error("Error en el submit final:", error);
      alert("Ocurrió un error al procesar la reserva. Intenta nuevamente.");
    }
  };
  return (
    <>
      {/*According to the step, a view is shown*/}
      {step === 1 && (
        <SelectionService
          //When the first form is finished, it goes to the second
          items={items}
          onSeleccionar={handleInfoMenuSelected}
          onBack={onBack}
        />
      )}
      {step === 2 && pedido.infoMenu.id !== 0 && (
        <InformationForm
          /*We pass the service to the following component */
          pedido={pedido}
          onNext={handleDatosEvento}
          onBack={handleBackToStep1}
        />
      )}
      {step === 3 && pedido.infoMenu.id !== 0 && (
        <ReservDetails
          /*We pass the service to the following component */
          pedido={pedido}
          onBack={handleBackToStep2}
          onSubmitFinal={handleSubmitFinal}
        ></ReservDetails>
      )}
      {step === 4 && (
        <ReservConfirmation menu={pedido.infoMenu}></ReservConfirmation>
      )}
    </>
  );
};
