import { Cliente } from "./Cliente";
import { DatosEvento } from "./DatosEvento";
import { InfoMenu } from "./InfoMenu";
import { Usuario } from "./Usuario";

export interface Pedido {
  idPedido?: number;
  usuario: Usuario;
  datosEvento: DatosEvento;
  infoMenu: InfoMenu;
  estado: string;
}
