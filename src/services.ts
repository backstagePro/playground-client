import ApiService from "./ApiService";
import HttpClient from "./client/HttpClient";
import ServiceLocator from "./ServiceLocator";

/**
 * Service used for making http request to `playground-api`
 * 
 */
export let SERVICE_HTTP_CLIENT: 'SERVICE_HTTP_CLIENT' = 'SERVICE_HTTP_CLIENT';
export type SERVICE_HTTP_CLIENT = HttpClient;

ServiceLocator.set(SERVICE_HTTP_CLIENT, async () => {
    
  return new HttpClient();
});
 
/**
 * Api to `playground-api`
 * 
 */
export let SERVICE_API_CLIENT: 'SERVICE_API_CLIENT' = 'SERVICE_API_CLIENT';
export type SERVICE_API_CLIENT = ApiService;

ServiceLocator.set(SERVICE_API_CLIENT, async () => {
    
  return new ApiService(
    (await ServiceLocator.get<SERVICE_HTTP_CLIENT>(SERVICE_HTTP_CLIENT))
  );
});