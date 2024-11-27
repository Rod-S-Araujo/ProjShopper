import styles from "./homepage.module.css";
import InfoHomepage from "../../components/infoHomePage";
import ContainerLogin from "../../components/containerLogin";

const HomePage = () => {
  return (
    <>
      <section className={styles.containerHomepage}>
        <InfoHomepage />
        <ContainerLogin />
      </section>
    </>
  );
};

export default HomePage;
