import styles from "./confirm.module.css";
import Map from "../../components/map";
import React, { useState } from "react";
import { useGoogleMaps } from "../../providers/GoogleApiProvider";
import InputSubmitStyled from "../../components/inputSubmitStyled";
import { useLocation, useNavigate } from "react-router-dom";
import IDriver from "../../interfaces/IDriver";
import { decode } from "@googlemaps/polyline-codec";
import IRide from "../../interfaces/IRide";
import { rideConfirm } from "../../api/services/ridesServices";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { responseData, requestData } = location.state || {};
  const { isLoaded } = useGoogleMaps();
  const [optionSelected, setOptionSelected] = useState<IDriver | null>(null);

  console.log(requestData);
  console.log(responseData);
  console.log(responseData.options);

  const distance =
    responseData.distance < 1
      ? `${responseData.distance} m's`
      : `${responseData.distance / 1000} km's`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!optionSelected) {
      alert("Por favor selecione um motorista");
      return;
    }
    if (!optionSelected.id) {
      return alert("Motorista não cadastrado");
    }

    const ride: IRide = {
      customer_id: requestData.customer_id,
      origin: requestData.origin,
      destination: requestData.destination,
      distance: responseData.distance,
      duration: responseData.duration,
      driver: {
        id: optionSelected.id,
        name: optionSelected.name,
      },
      value: optionSelected.value,
    };

    try {
      const responseData = await rideConfirm(ride);
      console.log(responseData);
      navigate("/history");
    } catch (error) {
      throw new Error(`Erro${error}`);
    }

    console.log(requestData);
  };

  const route = responseData.routeData.routes[0].overview_polyline.points;
  const routeDecoded = decode(route).map(([lat, lng]) => ({ lat, lng }));

  if (!isLoaded) return <div> Carregando...</div>;
  return (
    <>
      <section className={styles.containerConfirm}>
        <form className={styles.formConfirm} onSubmit={handleSubmit}>
          <h2>Detalhes da viagem</h2>
          <div className={styles.containerDetails}>
            <h5>
              Origem:{" "}
              <span className={styles.valueSpan}>{requestData.origin}</span>
            </h5>
            <h5>
              Destino:{" "}
              <span className={styles.valueSpan}>
                {requestData.destination}
              </span>
            </h5>
            <h5>
              Distancia:<span className={styles.valueSpan}> {distance} </span>
            </h5>
            <h5>
              Tempo aproximado da corrida:
              <span className={styles.valueSpan}> {responseData.duration}</span>
            </h5>
            <h5>Selecione com qual motorista deseja seguir viagem:</h5>
            <ul>
              {responseData.options.map((option: IDriver) => (
                <li
                  className={`${styles.cardDriver} ${
                    optionSelected?.id === option.id ? styles.active : ""
                  }`}
                  key={option.id}
                  onClick={() => setOptionSelected(option)}
                >
                  <div className={styles.infoCard}>
                    <div className={styles.headerCard}>
                      <h5>{option.name}</h5>
                      <h5>Avaliação: {option.review.rating} / 5</h5>
                    </div>
                    <h6 className={styles.valueSpan}>Descrição do motorista</h6>
                    <p>{option.description}</p>
                    <h6 className={styles.valueSpan}>
                      Comentário sobre o motorista
                    </h6>
                    <p>{option.review.comment}</p>
                  </div>
                  <div className={styles.valueCard}>
                    <h5>Valor da corrida</h5>
                    <h4>R$: {option.value.toFixed(2)}</h4>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <InputSubmitStyled>Calcular corrida</InputSubmitStyled>
        </form>
        <div className={styles.mapEstimate}>
          <Map path={routeDecoded} />
        </div>
      </section>
    </>
  );
};

export default Confirm;
