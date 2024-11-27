import styles from "./confirm.module.css";
import Map from "../../components/map";
import React, { useState } from "react";
import { useGoogleMaps } from "../../providers/GoogleApiProvider";
import InputSubmitStyled from "../../components/inputSubmitStyled";
import { useLocation } from "react-router-dom";

const Confirm = () => {
  const location = useLocation();
  const { responseData, requestData } = location.state || {};
  const { isLoaded } = useGoogleMaps();

  console.log(requestData);
  console.log(responseData);

  const distance =
    responseData.distance < 1
      ? `${responseData.distance} m's`
      : `${responseData.distance / 1000} km's`;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  if (!isLoaded) return <div> Carregando...</div>;
  return (
    <>
      <section className={styles.containerEstimate}>
        <form className={styles.formEstimate} onSubmit={handleSubmit}>
          <div>
            <h5>Origem: {requestData.origin}</h5>
            <h5>Destino: {requestData.destination}</h5>
            <h5>Distancia: {distance}</h5>
            <h5>Tempo estimado de viagem: {requestData.duration}</h5>
          </div>
          <InputSubmitStyled>Calcular corrida</InputSubmitStyled>
        </form>
        <div className={styles.mapEstimate}>
          <Map />
        </div>
      </section>
    </>
  );
};

export default Confirm;
