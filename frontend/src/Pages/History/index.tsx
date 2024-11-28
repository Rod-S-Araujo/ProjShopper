import { useEffect, useState } from "react";
import { getDrivers } from "../../api/services/driversSerives";
import IDriverData from "../../interfaces/IDriverData";
import styles from "./history.module.css";
import { getRides } from "../../api/services/ridesServices";
import IRideData from "../../interfaces/IRideData";
import ButtonStyled from "../../components/buttonStyled";
import { useNavigate } from "react-router-dom";
import IUser from "../../interfaces/IUser";

const History = () => {
  const [drivers, setDrivers] = useState<IDriverData[]>([]);
  const [rides, setRides] = useState<IRideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<IUser>();
  const [driverSelected, setDriverSelected] = useState<
    number | null | undefined
  >(null);

  useEffect(() => {
    const customerLogin = localStorage.getItem("authToken");
    if (customerLogin) {
      setCustomer(JSON.parse(customerLogin));
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!customer || !customer.id) return;
        const driversData = await getDrivers();
        const ridesData = driverSelected
          ? await getRides(customer?.id, driverSelected)
          : await getRides(customer?.id);
        setDrivers(driversData);
        setRides(ridesData.rides);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter os motoristas:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [driverSelected, customer]);

  console.log(drivers, rides);
  return (
    <section className={styles.containerHistory}>
      <h2 className={styles.titleHistory}>
        Vou listar as corridas que você já realizou na nossa plataforma:
      </h2>
      <div className={styles.driversHistory}>
        <h3>Deseja saber as corridas sobre algum motorista em especifico?</h3>
        <ul className={styles.containerDriver}>
          {loading ? (
            <h2>carregando...</h2>
          ) : (
            drivers.map((driver) => (
              <li
                className={`${styles.cardDriver} ${
                  driver.id == driverSelected ? styles.active : ""
                }`}
                key={driver.id}
                onClick={() =>
                  setDriverSelected((prevSelected) =>
                    prevSelected === driver.id ? null : driver.id
                  )
                }
              >
                <h4>{driver.name}</h4>
                <h4>Avaliação: {driver.rating}/5</h4>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className={styles.ridesHistory}>
        <h3>Aqui estão as corridas realizadas</h3>
        <ul className={styles.containerRide}>
          {rides.length <= 0 ? (
            <h3> Nenhuma corrida realizada até o momento</h3>
          ) : (
            rides.map((ride, index) => {
              const date = new Date(ride.date);
              const dateString = date.toLocaleDateString("pt-BR");
              const timeString = date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <li key={index} className={styles.cardRide}>
                  <div className={styles.dateContainer}>
                    <h3>{dateString}</h3>
                    <h3>{timeString}</h3>
                  </div>
                  <h4>Endereço de origem:{ride.origin}</h4>
                  <h4>Endereço de destino:{ride.destination}</h4>
                  <div>
                    <h4>Distância: {ride.distance}</h4>
                    <h4>Tempo de corrida: {ride.duration}</h4>
                  </div>
                  <h3>Seu motorista foi: {ride.driver.name}</h3>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <ButtonStyled active={false} onClick={() => navigate("/dashboard")}>
        Voltar para o dashboard
      </ButtonStyled>
    </section>
  );
};

export default History;
