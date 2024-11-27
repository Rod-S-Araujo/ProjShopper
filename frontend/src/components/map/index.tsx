import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import { useGoogleMaps } from "../../providers/GoogleApiProvider";

interface Map {
  center?: google.maps.LatLngLiteral;
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -23.4209995,
  lng: -51.9330558,
};

const Map: React.FC<Map> = ({ center }) => {
  const { isLoaded } = useGoogleMaps();

  if (!isLoaded) return <div>Carregando...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      <Marker position={center ? center : defaultCenter} />
    </GoogleMap>
  );
};

export default Map;
