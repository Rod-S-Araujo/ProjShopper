import React from "react";
import styles from "./inputSubmitStyled.module.css";

interface InputSubmitStyled {
  children: string;
}

const InputSubmitStyled: React.FC<InputSubmitStyled> = ({ children }) => {
  return (
    <input
      type="submit"
      value={children}
      className={styles.inputSubmitStyled}
    />
  );
};

export default InputSubmitStyled;
