import InputStyled from "../inputStyled";
import InputSubmitStyled from "../inputSubmitStyled";
import styles from "./containerlogin.module.css";

const ContainerLogin = () => {
  return (
    <>
      <section className={styles.containerLogin}>
        <form className={styles.containerAcess}>
          <h3>Faça o cadastro para seu 1º Acesso</h3>
          <InputStyled>Nome</InputStyled>
          <InputStyled>Email</InputStyled>
          <InputSubmitStyled>Cadastrar usuario</InputSubmitStyled>
        </form>
      </section>
    </>
  );
};

export default ContainerLogin;
