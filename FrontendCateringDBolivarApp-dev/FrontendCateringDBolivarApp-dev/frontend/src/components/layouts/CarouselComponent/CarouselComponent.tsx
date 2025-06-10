import React from "react";

import styles from "./CarouselComponent.module.css";
import NavComponent from "../NavComponents/NavComponent";

interface CarouselComponentProps {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}

export const CarouselComponent: React.FC<CarouselComponentProps> = ({
  image1,
  image2,
  image3,
  image4,
  image5,
}) => {
  return (
    <div className={styles.sliderBox}>
      <ul>
        <li>
          <img className={styles.Image} src={image1}></img>
        </li>
        <li>
          <img className={styles.Image} src={image2}></img>
        </li>
        <li>
          <img className={styles.Image} src={image3}></img>
        </li>
        <li>
          <img className={styles.Image} src={image4}></img>
        </li>
        <li>
          <img className={styles.Image} src={image5}></img>
        </li>
      </ul>
    </div>
  );
};
