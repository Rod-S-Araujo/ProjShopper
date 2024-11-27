import styles from "./dashboard.module.css";
import MenuDashboar from "../../components/menuDashboad";

const Dashboard = () => {
  return (
    <>
      <section className={styles.containerDashboard}>
        <h2>O que podemos fazer por você hoje?</h2>
        <MenuDashboar />
      </section>
    </>
  );
};

export default Dashboard;
