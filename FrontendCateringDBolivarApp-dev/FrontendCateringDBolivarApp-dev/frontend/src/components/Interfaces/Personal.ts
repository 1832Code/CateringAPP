export interface Personal {
  id?: number;
  personalInfo: PersonalInfo[];
}

export interface PersonalInfo {
  id?: number;
  tipoPersonal: string;
  cantidad: number;
}
