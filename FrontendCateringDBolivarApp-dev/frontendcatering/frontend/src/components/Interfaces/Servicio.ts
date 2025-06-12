import { ServicioItem } from "./ServicioItem";
import { TipoServicio } from "./TipoServicio";

export interface Servicio {
  id?: number;
  tipoServicio: TipoServicio;
  items: ServicioItem[];
}
