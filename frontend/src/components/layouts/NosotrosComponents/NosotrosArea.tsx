import React from "react";
import styles from "./NosotrosArea.module.css";

export const NosotrosArea = ({
  title,
  text,
  image,
  reverse,
}: {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}) => {
  return (
    //Prop to reverse the elements
    <div className={`${styles.MainArea} ${reverse ? styles.Reverse : ""}`}>
      <div className={styles.SubAreaLeft}>
        <img className={styles.Image} src={image}></img>
      </div>

      <div className={styles.TextArea}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};
export default NosotrosArea;
