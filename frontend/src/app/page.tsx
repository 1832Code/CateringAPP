"use client";
import React from "react";
import MainView from "../views/MainView/MainView";
import "./globals.css";
import { MyProvider } from "@/context/mycontext";

export default function App() {
  return (
    <>
      <MyProvider>
        <MainView />
      </MyProvider>
    </>
  );
}
