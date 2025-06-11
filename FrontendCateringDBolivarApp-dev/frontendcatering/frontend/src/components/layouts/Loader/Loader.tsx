"use client";
import React from "react";
import img from "@/assets/images/Logo Blanco.png";

export const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        transition: "opacity 0.3s ease",
      }}
    >
      <img src={img.src}></img>
    </div>
  );
};

export default Loader;
