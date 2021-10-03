import ApiService from "./ApiService";
import HttpClient from "./client/HttpClient";
import ServiceLocator from "./ServiceLocator";
import WebsocketClient from "./ws/WebsocketClient";

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

/**
 * Websocket client
 * 
 */
export let SERVICE_WEBSOCKET_CLIENT: 'SERVICE_WEBSOCKET_CLIENT' = 'SERVICE_WEBSOCKET_CLIENT';
export type SERVICE_WEBSOCKET_CLIENT = WebsocketClient;

ServiceLocator.set(SERVICE_WEBSOCKET_CLIENT, async () => {
    
  return new WebsocketClient();
});