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
 
 