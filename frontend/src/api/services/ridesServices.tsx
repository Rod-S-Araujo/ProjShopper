import instances from "../instanses";
import { ENDPOINTS } from "../endpoints";
import IEstimate from "../../interfaces/IEstimate";
import IRide from "../../interfaces/IRide";

export const rideEstimate = async (data: IEstimate) => {
  try {
    const response = await instances.post(ENDPOINTS.ESTIMATE, data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro encontrado ${error}`);
  }
};
export const rideConfirm = async (data: IRide) => {
  try {
    const response = await instances.patch(ENDPOINTS.CONFIRM, data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro encontrado ${error}`);
  }
};

export const getRides = async (customer_id: string, driver_id?: number) => {
  try {
    const response = await instances.get(
      ENDPOINTS.GETRIDES.replace(":customer_id", String(customer_id)),
      {
        params: {
          driver_id: driver_id,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Erro encontrado ${error}`);
  }
};
