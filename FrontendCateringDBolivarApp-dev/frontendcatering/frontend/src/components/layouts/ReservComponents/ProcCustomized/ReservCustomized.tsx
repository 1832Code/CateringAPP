import React, { useEffect } from "react";
import { FirstForm } from "./FirstForm/FirstForm";
import { useState } from "react";
import SelectionType from "./SelectionType/SelectionType";
import { Pedido } from "@/components/Interfaces/Pedido";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { TipoServicio } from "@/components/Interfaces/TipoServicio";
import { DetailServicio } from "./DetailServicio/DetailServicio";
import { DetailPersonal } from "./DetailPersonal/DetailPersonal";
import { DetailExtra } from "./DetailExtra/DetailExtra";
import { ReservDetailCustomized } from "./ReservDetailCustomized/ReservDetailCustomized";
import { ReservConfirmationCustomized } from "./ReservConfirmationCustomized/ConfirmationCustomized";

interface ReservCustomProps {
  items: InfoMenu[];
  onBack: () => void;
}

export const ReservCustomized: React.FC<ReservCustomProps> = ({
  onBack,
  items,
}) => {
  const [step, setStep] = useState(1);
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
      tipoInfoMenu: "Personalizado",
    },
    estado: "Nuevo",
  });
  //Function to reset Pedido
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
        tipoInfoMenu: "Personalizado",
      },
      estado: "Nuevo",
    });
  };

  const handleDatosEvento = (datosEvento: Pedido["datosEvento"]) => {
    setPedido((prev) => ({
      ...prev,
      datosEvento,
    }));
    setStep(3);
  };

  const handleTipoServicio = (
    tipoServicio: InfoMenu["servicio"]["tipoServicio"]
  ) => {
    setPedido((prev) => ({
      ...prev,
      infoMenu: {
        ...prev.infoMenu,
        servicio: {
          ...prev.infoMenu.servicio,
          tipoServicio,
        },
      },
    }));
    setStep(2);
  };
  const handleDetailServicio = (items: InfoMenu["servicio"]["items"]) => {
    setPedido((prev) => ({
      ...prev,
      infoMenu: {
        ...prev.infoMenu,
        servicio: {
          ...prev.infoMenu.servicio,
          items,
        },
      },
    }));
    setStep(4);
  };
  const handleDetailPersonal = (personal: InfoMenu["personal"]) => {
    setPedido((prev) => ({
      ...prev,
      infoMenu: {
        ...prev.infoMenu,
        personal,
      },
    }));
    setStep(5);
  };
  const handleDetailExtra = (extra: InfoMenu["extra"]) => {
    setPedido((prev) => ({
      ...prev,
      infoMenu: {
        ...prev.infoMenu,
        extra,
      },
    }));
    setStep(6);
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
        infoMenu: pedido.infoMenu,
        estado: pedido.estado,
      };
      // POST to send pedido
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
        const errorText = await response.text(); // <-- aquí obtenemos la respuesta como texto
        throw new Error(
          `Error al enviar el pedido: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Pedido creado con éxito:", data);

      // cambiar al paso final (confirmación)
      setStep(7);
      resetPedido();
    } catch (error) {
      console.error("Error en el submit final:", error);
      alert("Ocurrió un error al procesar la reserva. Intenta nuevamente.");
    }
  };

  const retroceder = () => setStep((p) => p - 1);

  return (
    <>
      {step === 1 && (
        <SelectionType
          onBack={onBack}
          onSeleccionar={handleTipoServicio}
        ></SelectionType>
      )}
      {step === 2 && pedido.infoMenu.servicio.tipoServicio.id !== 0 && (
        <FirstForm
          onBack={retroceder}
          onNext={handleDatosEvento}
          pedido={pedido}
        ></FirstForm>
      )}
      {step === 3 && (
        <DetailServicio
          pedido={pedido}
          onBack={retroceder}
          onNext={handleDetailServicio}
        ></DetailServicio>
      )}
      {step == 4 && (
        <DetailPersonal
          personal={pedido.infoMenu.personal}
          onBack={retroceder}
          onNext={handleDetailPersonal}
        ></DetailPersonal>
      )}
      {step == 5 && (
        <DetailExtra
          extra={pedido.infoMenu.extra}
          onBack={retroceder}
          onNext={handleDetailExtra}
        ></DetailExtra>
      )}
      {step == 6 && (
        <ReservDetailCustomized
          pedido={pedido}
          onBack={retroceder}
          onNext={handleSubmitFinal}
        ></ReservDetailCustomized>
      )}
      {step == 7 && (
        <ReservConfirmationCustomized></ReservConfirmationCustomized>
      )}
    </>
  );
};
