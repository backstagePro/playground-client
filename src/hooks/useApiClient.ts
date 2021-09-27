import { createContext, useContext } from "react";
import ServiceLocator from "../ServiceLocator";
import { SERVICE_API_CLIENT } from "../services";

export const api = {
  getClient: async () => {
    return await ServiceLocator.get<SERVICE_API_CLIENT>(SERVICE_API_CLIENT);
  }
}

export const ApiClientContext = createContext(api);

export const useApiClient = () => {
  return useContext(ApiClientContext);
};