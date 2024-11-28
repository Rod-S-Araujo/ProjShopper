import { useState } from "react";
import ButtonStyled from "../buttonStyled";
import InputSubmitStyled from "../inputSubmitStyled";
import styles from "./containerlogin.module.css";
import { create, login } from "../../api/services/customersServices";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import IUser from "../../interfaces/IUser";

const ContainerLogin = () => {
  const [status, setStatus] = useState("user");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await login(email);
      console.log("Login bem-sucedido, token:", token);
      console.log(token);

      const decodedCustomer = jwtDecode<IUser>(token);

      localStorage.setItem("authToken", JSON.stringify(decodedCustomer));

      navigate("/dashboard");
    } catch (error) {
      throw new Error(`Erro ao realizar login. Verifique seu email.${error}`);
    }
  };
  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const customer = {
        name: name,
        email: email,
      };
      const response = await create(customer);

      localStorage.setItem("authToken", JSON.stringify(response));

      console.log(response);
    } catch (error) {
      throw new Error(`Erro ao realizar login. Verifique seu email.${error}`);
    }
  };

  return (
    <>
      <section className={styles.containerLogin}>
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
        <form
          className={styles.containerAcess}
          style={{ display: status === "first" ? "none" : "flex" }}
          onSubmit={handleSubmitCreate}
        >
          <h3>Faça o cadastro para seu 1º Acesso</h3>
          <h4>Nome</h4>
          <input
            className={styles.inputStyles}
            type="text"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
          />
          <h4>E-Mail</h4>
          <input
            className={styles.inputStyles}
            type="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputSubmitStyled>Cadastrar usuario</InputSubmitStyled>
        </form>
        <form
          style={{ display: status === "first" ? "flex" : "none" }}
          className={styles.containerAcess}
          onSubmit={handleSubmitLogin}
        >
          <h3>Faça o acesso para continuarmos</h3>

          <h4>E-Mail</h4>
          <input
            className={styles.inputStyles}
            type="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputSubmitStyled>Acessar</InputSubmitStyled>
        </form>
      </section>
    </>
  );
};

export default ContainerLogin;
