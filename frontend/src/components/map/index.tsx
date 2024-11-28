import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import React from "react";
import { useGoogleMaps } from "../../providers/GoogleApiProvider";

interface Map {
  center?: google.maps.LatLngLiteral;
  path?: google.maps.LatLngLiteral[];
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
};

const Map: React.FC<Map> = ({
  center = { lat: -25.4268985, lng: -49.2651984 },
  path = [],
}) => {
  const { isLoaded } = useGoogleMaps();

  if (!isLoaded) return <div>Carregando...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      <Marker position={center} />
      {path ? <Polyline path={path} /> : null}
    </GoogleMap>
  );
};

export default Map;
