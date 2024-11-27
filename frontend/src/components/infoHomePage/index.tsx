import styles from "./infoHomePage.module.css";

const InfoHomepage = () => {
  return (
    <div className={styles.containerInfo}>
      <h2>
        Bem-vindo ao <span>Drivver</span>
      </h2>
      <p>
        Plataforma desenvolvida como um code challenge, com o objetivo de
        simular um aplicativo de táxi.
      </p>
      <p>O frontend está conectado à API do projeto e à API do Google Maps.</p>
    </div>
  );
};

export default InfoHomepage;
