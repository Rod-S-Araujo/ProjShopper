import instances from "../instanses";
import { ENDPOINTS } from "../endpoints";

export const getDrivers = async () => {
  try {
    const response = await instances.get(ENDPOINTS.GETDRIVER);
    return response.data;
  } catch (error) {
    throw new Error(`Erro encontrado ${error}`);
  }
};
