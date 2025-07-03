"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type UserData = {
  fullName: string;
  email: string;
  bio: string;
  phoneNumber: string;
  username: string;
  setUserData: (data: Partial<UserData>) => void;
};

const defaultValues: UserData = {
  fullName: "Anthony David",
  email: "example@gmail.com",
  bio: "Lorem ipsum...",
  phoneNumber: "123-456-789",
  username: "Rei ADMIN",
  setUserData: () => {},
};

const UserContext = createContext<UserData>(defaultValues);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserDataState] = useState<Omit<UserData, "setUserData">>({
    fullName: defaultValues.fullName,
    email: defaultValues.email,
    bio: defaultValues.bio,
    phoneNumber: defaultValues.phoneNumber,
    username: defaultValues.username,
  });

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ ...userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
