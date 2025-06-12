import { Extra } from "./Extra";
import { Personal } from "./Personal";
import { Servicio } from "./Servicio";
import { TipoServicio } from "./TipoServicio";

export interface InfoMenu {
  id?: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imageURL: string;
  activo: boolean;
  cantPersonas: number;
  tipoInfoMenu: string;
  servicio: Servicio;
  personal: Personal;
  extra: Extra;
}
