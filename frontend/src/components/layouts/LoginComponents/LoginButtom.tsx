"use client";
import React from "react";
import styles from "./LoginButtom.module.css";

export const LoginButtom = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <input
        className={styles.LoginButtom}
        type="button"
        value="Log In"
        onClick={onClick}
      ></input>
    </>
  );
};
