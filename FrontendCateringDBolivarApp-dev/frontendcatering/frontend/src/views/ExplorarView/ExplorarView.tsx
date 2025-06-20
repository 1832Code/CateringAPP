"use client";
import { HeaderComponent } from "@/components/layouts/HeaderComponents/HeaderComponent";
import styles from "./ExplorarView.module.css";
import React, { useEffect, useState } from "react";
import NavComponent from "@/components/layouts/NavComponents/NavComponent";
import { CardItem } from "@/components/ui/3d-card";
import CardItemHover from "@/components/features/CardItem";
import { Item } from "@/components/Interfaces/Item";

export const ExplorarView = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/items")
      .then((res) => res.json())
      .then((data: Item[]) => {
        setItems(data);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);
  return (
    <>
      <div className={styles.MainArea}>
        <div className={styles.Header}>
          <HeaderComponent></HeaderComponent>
        </div>
        <div className={styles.NavArea}>
          <NavComponent></NavComponent>
          <h1>Nuestra Carta</h1>
        </div>
        <div className={styles.ContainerCards}>
          {items.map((item) => (
            <CardItemHover key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};
