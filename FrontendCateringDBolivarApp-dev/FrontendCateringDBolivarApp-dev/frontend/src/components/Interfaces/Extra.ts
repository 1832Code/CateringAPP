export interface Extra {
  id?: number;
  extraInfo: ExtraInfo[];
}

export interface ExtraInfo {
  id?: number;
  tipoExtra: string;
  cantidad: number;
}
