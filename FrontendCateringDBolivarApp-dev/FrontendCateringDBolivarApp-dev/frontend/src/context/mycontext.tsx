"use client";

import { createContext, useState, ReactNode } from "react";

// Primero defines el tipo de datos que tendrá el contexto
interface MyContextType {
  state: string;
  setState: (value: string) => void;
}

// Creamos el contexto con tipo
export const MyContext = createContext<MyContextType | undefined>(undefined);

// Provider del contexto
interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider = ({ children }: MyProviderProps) => {
  const [state, setState] = useState<string>("valor inicial");

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};