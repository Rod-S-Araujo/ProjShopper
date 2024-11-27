import styles from "./estimate.module.css";
import Map from "../../components/map";
import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMaps } from "../../providers/GoogleApiProvider";
import InputSubmitStyled from "../../components/inputSubmitStyled";
import { rideEstimate } from "../../api/services/ridesServices";
import { useNavigate } from "react-router-dom";

const Estimate = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const originAutoCompleteRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const destinationAutoCompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded } = useGoogleMaps();

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: -23.4209995,
    lng: -51.9330558,
  });

  const placeChanger = (
    autoCompleteRef: React.MutableRefObject<google.maps.places.Autocomplete | null>,
    setAddress: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (autoCompleteRef.current) {
      const place = autoCompleteRef.current.getPlace();
      const location = place.geometry?.location;
      const adress = place.formatted_address;

      if (location) {
        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
      }

      if (adress) {
        setAddress(adress);
      }
    }
  };

  const autoCompleteLoad =
    (
      autoCompleteRef: React.MutableRefObject<google.maps.places.Autocomplete | null>
    ) =>
    (autoComplete: google.maps.places.Autocomplete) => {
      autoCompleteRef.current = autoComplete;
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const customerId = "1";

    const requestData = {
      customer_id: customerId,
      origin,
      destination,
    };

    try {
      const responseData = await rideEstimate(requestData);
      navigate("/confirm", { state: { responseData, requestData } });
    } catch (error) {
      throw new Error(`Erro${error}`);
    }
  };
  if (!isLoaded) return <div> Carregando...</div>;
  return (
    <>
      <section className={styles.containerEstimate}>
        <form className={styles.formEstimate} onSubmit={handleSubmit}>
          <h3>Vamos começar:</h3>
          <h3>Informe o endereço de origem:</h3>
          <Autocomplete
            onLoad={autoCompleteLoad(originAutoCompleteRef)}
            onPlaceChanged={() =>
              placeChanger(originAutoCompleteRef, setOrigin)
            }
          >
            <input className={styles.inputPlace} type="text" ref={inputRef} />
          </Autocomplete>
          <h3>informe o endereço de destino:</h3>
          <Autocomplete
            onLoad={autoCompleteLoad(destinationAutoCompleteRef)}
            onPlaceChanged={() =>
              placeChanger(destinationAutoCompleteRef, setDestination)
            }
          >
            <input type="text" className={styles.inputPlace} />
          </Autocomplete>
          <InputSubmitStyled>Calcular corrida</InputSubmitStyled>
        </form>
        <div className={styles.mapEstimate}>
          <Map center={center} />
        </div>
      </section>
    </>
  );
};

export default Estimate;
