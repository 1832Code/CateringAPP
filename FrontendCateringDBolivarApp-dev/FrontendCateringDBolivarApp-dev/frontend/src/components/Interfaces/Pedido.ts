import { Cliente } from "./Cliente";
import { DatosEvento } from "./DatosEvento";
import { InfoMenu } from "./InfoMenu";

export interface Pedido {
  idPedido?: number;
  cliente: Cliente;
  datosEvento: DatosEvento;
  infoMenu: InfoMenu;
  estado: string;
}
