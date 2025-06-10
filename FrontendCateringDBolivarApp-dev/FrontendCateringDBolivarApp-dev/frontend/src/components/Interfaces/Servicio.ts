import { Item } from "./Item";
import { TipoServicio } from "./TipoServicio";

export interface Servicio {
  id?: number;
  tipoServicio: TipoServicio;
  items: ServicioItem[];
}

export interface ServicioItem {
  id?: number;
  item: Item;
}
