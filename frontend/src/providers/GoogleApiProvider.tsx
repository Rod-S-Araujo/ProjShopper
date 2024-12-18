import React, { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

interface GoogleMaps {
  isLoaded: boolean;
}

const GoogleMapsContext = createContext<GoogleMaps | undefined>(undefined);

const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Carregando Google Maps...</div>;
  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);

  if (!context) throw new Error("Não foi possível acessar o provider");

  return context;
};

export default GoogleMapsProvider;
