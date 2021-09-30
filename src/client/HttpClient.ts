import axios, { AxiosInstance } from 'axios';

export default class HttpClient {

  private client?: AxiosInstance;

  /**
   * Return axios instance for making requests to playground api
   * 
   * @returns 
   */
  getClient(): AxiosInstance {

    if(this.client){
      return this.client;
    }

    this.client = axios.create({
      baseURL: 'http://localhost:3001/'
    });

    this.client.interceptors.response.use((response) => response, (error) => {
      // whatever you want to do with the error
      alert(error);
    });

    return this.client;
  }
}