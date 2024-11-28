import instances from "../instanses";
import { ENDPOINTS } from "../endpoints";
import IUser from "../../interfaces/IUser";

export const login = async (email: string) => {
  try {
    const response = await instances.post(ENDPOINTS.LOGIN, { email });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro encontrado ${error}`);
  }
};
export const create = async (data: IUser) => {
  try {
    const response = await instances.post(ENDPOINTS.CREATCUSTOMER, data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro encontrado ${error}`);
  }
};
