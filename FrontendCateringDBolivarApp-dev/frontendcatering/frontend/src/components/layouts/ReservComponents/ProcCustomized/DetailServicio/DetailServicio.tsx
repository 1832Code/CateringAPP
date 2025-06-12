import React, { useState, useEffect } from "react";
import styles from "./DetailServicio.module.css";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import ButtonNext from "@/components/features/ButtonNext";
import { Item } from "@/components/Interfaces/Item";
import { Categoria } from "@/components/Interfaces/Categoria";
import { Pedido } from "@/components/Interfaces/Pedido";

interface DetailServicioProps {
  onBack: () => void;
  onNext: (items: InfoMenu["servicio"]["items"]) => void;
  pedido: Pedido;
}

interface FormBlock {
  categoriaId?: number;
  itemId?: number;
}

export const DetailServicio: React.FC<DetailServicioProps> = ({
  pedido,
  onBack,
  onNext,
}) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [formBlocks, setFormBlocks] = useState<FormBlock[]>([
    { categoriaId: undefined, itemId: undefined },
  ]);

  //Function that returns the list of items according to the category
  const categoriasFiltradas = categorias.filter((cat) => {
    if (!pedido.infoMenu.servicio.tipoServicio) return false;

    const nombre = cat.nombre.toLowerCase();

    if (pedido.infoMenu.servicio.tipoServicio.id === 1) {
      return nombre === "postres" || nombre === "bebidas alcohólicas";
    }

    if (pedido.infoMenu.servicio.tipoServicio.id === 2) {
      return (
        nombre === "entradas" ||
        nombre === "platos principales" ||
        nombre === "postres" ||
        nombre === "bebidas"
      );
    }

    if (pedido.infoMenu.servicio.tipoServicio.id === 3) {
      return nombre !== "bebidas alcohólicas";
    }

    return true;
  });
  // Rules according to the type of service
  const reglas = () => {
    switch (pedido.infoMenu.servicio.tipoServicio.id) {
      case 1: // GOURMET
        return (
          <>
            <p>
              <strong>1. Servicio GOURMET</strong>
            </p>
            <p>
              - Cada "Ítem" representa un tiempo de comida (Máximo 6 tiempos)
              <br />
              - Los platos serán presentados según la planeación post-reserva
              (nuestro equipo se comunicará para ajustar detalles como horarios
              y secuencia).
              <br />- Cada tiempo constituirá el plato para todos los
              comensales.
            </p>
          </>
        );
      case 2: // BUFFET
        return (
          <>
            <p>
              <strong>2. Servicio BUFFET</strong>
            </p>
            <p>
              - Cada "Ítem" corresponde a una estación temática (ej: platos de
              fondo, bebidas, entradas, postres).
              <br />
              - Dispondrá de acceso libre a todas las estaciones durante el
              evento (Máximo 6 estaciones).
              <br />- Cada estación será proporcional a la cantidad de personas.
            </p>
          </>
        );
      case 3: // PLATO SERVIDO
        return (
          <>
            <p>
              <strong>3. Servicio PLATO SERVIDO</strong>
            </p>
            <p>
              - Podrá seleccionar hasta 1 ítem por categoría (entrada,
              principal, bebida, postre).
              <br />- Cada elección constituirá el menú definitivo para todos
              los comensales.
            </p>
          </>
        );
      default:
        return (
          <p>Seleccione un tipo de servicio válido para ver las reglas.</p>
        );
    }
  };
  // Function to check the form
  const validarSeleccion = () => {
    if (pedido.infoMenu.servicio.tipoServicio.id === 1 && items.length > 5) {
      alert("Para Buffet máximo 5 ítems.");
      return false;
    }
    if (pedido.infoMenu.servicio.tipoServicio.id === 2 && items.length < 3) {
      alert("Para Plato servido debes seleccionar al menos 3 platos.");
      return false;
    }
    if (pedido.infoMenu.servicio.tipoServicio.id === 3 && items.length > 4) {
      alert("Máximo 4 ítems por este servicio");
      return false;
    }

    return true;
  };
  //We bring items and categories from the database
  useEffect(() => {
    fetch("http://localhost:8084/api/categorias")
      .then((res) => res.json())
      .then(setCategorias)
      .catch((err) => console.error(err));

    fetch("http://localhost:8084/api/items")
      .then((res) => res.json())
      .then(setItems)
      .catch((err) => console.error(err));
  }, []);

  //Function that controls the state of the category in the form
  const handleCategoriaChange = (index: number, categoriaId: number) => {
    const updated = [...formBlocks];
    updated[index].categoriaId = categoriaId;
    updated[index].itemId = undefined;
    setFormBlocks(updated);
  };
  //Function that controls the state of the item in the form
  const handleItemChange = (index: number, itemId: number) => {
    const updated = [...formBlocks];
    updated[index].itemId = itemId;
    setFormBlocks(updated);
  };

  //Function to add new row
  const addFormBlock = () => {
    setFormBlocks([
      ...formBlocks,
      { categoriaId: undefined, itemId: undefined },
    ]);
  };

  //Function to delete the row selected
  const removeFormBlock = (index: number) => {
    const updated = [...formBlocks];
    updated.splice(index, 1);
    setFormBlocks(updated);
  };

  //Function to control the submit
  const handleSubmit = () => {
    // Validación de selects
    const camposIncompletos = formBlocks.some(
      (block) => !block.categoriaId || !block.itemId
    );
    if (camposIncompletos) {
      alert("Debes seleccionar una categoría e ítem en todos los bloques.");
      return;
    }

    const dataMapped: InfoMenu["servicio"]["items"] = formBlocks.map(
      (block) => {
        const selectedItem = items.find((item) => item.id === block.itemId);
        if (!selectedItem) {
          throw new Error("Item no encontrado");
        }
        return { item: selectedItem };
      }
    );

    if (dataMapped.length === 0) {
      alert("Debes seleccionar al menos un ítem.");
      return;
    }
    console.log(dataMapped);
    onNext(dataMapped);
  };

  useEffect(() => {
    console.log(
      "Tipo de servicio recibido:",
      pedido.infoMenu.servicio.tipoServicio
    );
  }, [pedido.infoMenu.servicio.tipoServicio]);

  return (
    <div className={styles.InteractionArea}>
      <h3>
        Detalle del Servicio - Tipo:{" "}
        {pedido.infoMenu.servicio.tipoServicio.nombre}
      </h3>
      <div className={styles.RulesCustomization}>
        <p>Estimado(a) cliente,</p>
        <p>
          Antes de completar el formulario, lea atentamente las siguientes
          indicaciones según el servicio seleccionado:
        </p>
        <div>{reglas()}</div>
      </div>
      <div className={styles.ListArea}>
        {formBlocks.map((block, index) => {
          const filteredItems = items.filter(
            (item) => item.categoria?.id === block.categoriaId
          );

          return (
            <div key={index} className={styles.FormBlock}>
              {/*Select to Category */}
              <div className={styles.SelectArea}>
                <select
                  value={block.categoriaId ?? ""}
                  onChange={(e) =>
                    handleCategoriaChange(index, parseInt(e.target.value))
                  }
                >
                  <option value="">Categoría</option>
                  {categoriasFiltradas.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                {/*Select to Item */}
                <select
                  value={block.itemId ?? ""}
                  onChange={(e) =>
                    handleItemChange(index, parseInt(e.target.value))
                  }
                  disabled={!block.categoriaId}
                >
                  <option value="">Ítem</option>
                  {filteredItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.OptionsArea}>
                {formBlocks.length > 1 && (
                  <button type="button" onClick={() => removeFormBlock(index)}>
                    -
                  </button>
                )}

                <button type="button" onClick={addFormBlock}>
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.ButtonArea}>
        <ButtonPrevious onClick={onBack} texto="Anterior"></ButtonPrevious>
        <ButtonNext onClick={handleSubmit} texto="Siguiente"></ButtonNext>
      </div>
    </div>
  );
};

export default DetailServicio;
