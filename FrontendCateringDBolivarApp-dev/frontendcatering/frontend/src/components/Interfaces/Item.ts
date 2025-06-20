import { Categoria } from "./Categoria";

export interface Item {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio?: number;
  imageURL?: string;
  categoria?: Categoria;
}