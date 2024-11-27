import instances from "../instanses";
import { ENDPOINTS } from "../endpoints";
import IEstimate from "../../interfaces/IEstimate";

export const rideEstimate = async (data: IEstimate) => {
  try {
    const response = await instances.post(ENDPOINTS.ESTIMATE, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro encontrado ${error}`);
  }
};
