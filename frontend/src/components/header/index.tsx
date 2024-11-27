import { useState } from "react";
import ButtonStyled from "../buttonStyled";
import styles from "./header.module.css";
import logoDrivver from "/images/logo2.png";

const Header = () => {
  const [status, setStatus] = useState("user");
  return (
    <header className={styles.header}>
      <img
        className={styles.logoDrivver}
        src={logoDrivver}
        alt="Logo da aplicação Drivver"
      />
      <div className={styles.areaButtons}>
        <ButtonStyled
          active={status === "first" ? true : false}
          onClick={() => setStatus("first")}
        >
          Fazer Login
        </ButtonStyled>
        <ButtonStyled
          active={status === "first" ? false : true}
          onClick={() => setStatus("user")}
        >
          Criar conta
        </ButtonStyled>
      </div>
    </header>
  );
};

export default Header;
