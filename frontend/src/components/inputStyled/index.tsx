import React from "react";
import styles from "./inputStyled.module.css";

interface InputSyled {
  children: string;
  ref?: string;
}

const InputStyled: React.FC<InputSyled> = ({ children, ref }) => {
  return (
    <div className={styles.containerInput}>
      <h5>{children}</h5>
      <input
        className={styles.input}
        type="text"
        placeholder={children}
        ref={ref ? ref : ""}
      />
    </div>
  );
};

export default InputStyled;
