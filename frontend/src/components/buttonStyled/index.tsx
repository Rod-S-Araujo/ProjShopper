import React from "react";
import styles from "./burttonStyled.module.css";

interface ButtonProps {
  children: string;
  active: boolean;
  onClick: () => void;
}

const ButtonStyled: React.FC<ButtonProps> = ({ children, active, onClick }) => {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <h3>{children}</h3>
    </button>
  );
};

export default ButtonStyled;
