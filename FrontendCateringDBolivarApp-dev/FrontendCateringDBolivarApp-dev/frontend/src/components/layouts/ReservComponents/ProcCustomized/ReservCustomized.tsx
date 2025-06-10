import React from "react";
import { FirstForm } from "./FirstForm/FirstForm";
import { useState } from "react";
import SelectionType from "./SelectionType/SelectionType";
import { Pedido } from "@/components/Interfaces/Pedido";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { TipoServicio } from "@/components/Interfaces/TipoServicio";
import { DetailServicio } from "./DetailServicio/DetailServicio";
import { DetailPersonal } from "./DetailPersonal/DetailPersonal";
import { DetailExtra } from "./DetailExtra/DetailExtra";

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
    cliente: {
      nombre: "",
      email: "",
      telefono: "",
    },
    datosEvento: {
      tipoEvento: "",
      direccion: "",
      distrito: "",
      horaInicio: "",
      cantHoras: 0,
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
  const handleDatosEvento = (datosEvento: Pedido["datosEvento"]) => {
    setPedido((prev) => ({
      ...prev,
      datosEvento,
    }));
    setStep(3);
  };
  const handleInfoMenuSelected = (infoMenu: InfoMenu) => {
    setPedido((prev) => ({ ...prev, infoMenu }));
    setStep(2);
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

  const avanzar = () => setStep((p) => p + 1);
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
          tipoServicio={pedido.infoMenu.servicio.tipoServicio}
          onBack={retroceder}
          onNext={handleDetailServicio}
        ></DetailServicio>
      )}
      {step == 4 && <DetailPersonal></DetailPersonal>}
      {step == 5 && <DetailExtra></DetailExtra>}
    </>
  );
};
