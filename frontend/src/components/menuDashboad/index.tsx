import styles from "./menuDashboard.module.css";
import iconHistory from "/icos/history.svg";
import iconRide from "/icos/ride.svg";

const MenuDashboar = () => {
  return (
    <main className={styles.containerDashboard}>
      <button className={styles.buttonDashBoard}>
        <h2>Historico de corridas</h2>
        <img
          src={iconHistory}
          alt="Icone para visualizar o historico de corridas"
        />
      </button>
      <button className={styles.buttonDashBoard}>
        <h2>Realizar uma nova corrida</h2>
        <img src={iconRide} alt="Icone para realizar uma nova corrida" />
      </button>
    </main>
  );
};

export default MenuDashboar;
