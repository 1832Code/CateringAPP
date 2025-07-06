// interfaces/PedidoReserva.ts

import { DatosEvento } from "./DatosEvento";
import { InfoMenu } from "./InfoMenu";

export interface PedidoReserva {
  id: number;
  usuarioId: number;
  infoMenuId?: number;
  infoMenu: InfoMenu;
  datosEvento: DatosEvento;
  estado: string;
}
