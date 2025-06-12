import React from "react";
import styles from "./HeaderComponent.module.css";
import "font-awesome/css/font-awesome.min.css";

export const HeaderComponent = () => {
  return (
    <>
      <header className={styles.Header}>
        <ul>
          <li>
            <a>
              <span>
                Llamenos hoy! al <i className="fa fa-phone"></i> 924343195
              </span>
            </a>
            <a className={styles.SpamEmail}>
              <i className="fa fa-envelope-o"></i>
              <span>DBolivarGourmet@gmail.com</span>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="https://www.facebook.com/DbolivarGourmet">
              <i className="fa fa-facebook"></i>
            </a>
            <a>
              <i className="fa fa-twitter"></i>
            </a>
            <a>
              <i className="fa fa-instagram"></i>
            </a>
          </li>
          <li></li>
          <li></li>
        </ul>
      </header>
    </>
  );
};
